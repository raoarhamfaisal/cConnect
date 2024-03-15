<template>
  <Head title="Admin" />

  <Header
    :profile="profile"
    :show-post-buttons="false"
    :post-search-filters="postSearchFilters"
    :showit="showit"
  >
    <Card
      :shadowLevel="2"
      bgColor="white"
      class="mt-1"
      :padding="screenWidth < 640 ? '7px' : '20px'"
    >
      <PageTitle :linkUrl="`/post`" pageTitle="Admin" />
      <!-- Reviews Section -->

      <details
        class="accordion-section"
        v-if="user.appeals_privileges"
        :open="isOpen"
      >
        <summary class="accordion-heading flex items-center">
          <Icon
            icon="material-symbols:reviews"
            color="#364fc7"
            width="30"
            height="30"
          />
          <span class="mx-4">Reviews</span>
        </summary>
        <div class="">
          <Link
            class="flex items-center pl-8 pr-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/admin/regions/contractors"
          >
            <Icon
              icon="ion:person-sharp"
              color="#1098ad"
              width="30"
              height="30"
            />
            <span class="mx-4 font-medium">All Contractors</span>
          </Link>

          <Link
            class="flex items-center pl-8 pr-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/admin/regions/appealed"
          >
            <Icon
              icon="fluent-mdl2:review-request-solid"
              color="#1098ad"
              width="30"
              height="30"
            />
            <span class="mx-4 font-medium">Appealed Reviews</span>
          </Link>
        </div>
      </details>

      <!-- User Functions Section -->
      <details
        class="accordion-section"
        :open="isOpen"
        v-if="user.users_privileges"
      >
        <summary class="accordion-heading flex items-center">
          <Icon
            icon="ion:person-sharp"
            color="#364fc7"
            width="30"
            height="30"
          />
          <span class="mx-4">User Functions</span>
        </summary>

        <!-- Links for User Functions go here... -->
      </details>

      <!-- Payment Info Section -->
      <details
        class="accordion-section"
        v-if="user.payments_privileges"
        :open="isOpen"
      >
        <summary class="accordion-heading flex items-center">
          <Icon icon="ion:card-sharp" color="#364fc7" width="30" height="30" />
          <span class="mx-4">Payment Info</span>
        </summary>

        <!-- Links for Payment Info go here... -->
      </details>
    </Card>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";

import { useStore } from "vuex";
import Card from "@/Components/Card.vue";
import PageTitle from "@/Components/PageTitle.vue";

import { Icon } from "@iconify/vue";
import { computed, onBeforeMount, ref } from "vue";
import { Link } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";

defineProps({
  profile: Object,
  showit: Boolean,

  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});

const store = useStore();
const isOpen = ref(true);
const user = usePage().props.value?.auth?.user;

const isAdminUrl = computed(() => {
  if (user) {
    return (
      user.appeals_privileges ||
      user.payments_privileges ||
      user.users_privileges
    );
  }
  return false;
});
onBeforeMount(() => {
  console.log(
    "onBeforeMount",
    user.appeals_privileges ||
      user.payments_privileges ||
      user.users_privileges,
    isAdminUrl
  );
  if (!isAdminUrl.value && window.location.pathname !== "/post") {
    console.log("incondition", !isAdminUrl);

    Inertia.visit("/post");
  }
});
</script>

<style scoped>
.accordion-section {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.accordion-heading {
  cursor: pointer;
  padding: 1rem;
  font-weight: bold;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  color: #364fc7;
}

.accordion-heading:hover {
  background-color: #e0e0e0;
}
</style>
