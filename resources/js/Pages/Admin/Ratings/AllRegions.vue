<template>
  <Head title="Regions" />

  <Header
    v-if="isAdminUrl"
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div class="bg-gray-200 mt-10">
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <PageTitle linkUrl="/post" pageTitle="All Regions" />
        <heading-card
          heading="Select Your Region"
          class="ml-4 mb-12"
          style="color: #555"
        />

        <div
          class="flex flex-col pl-4"
          v-if="allRegions && !loading && allRegions.length > 0"
        >
          <Link
            v-for="(region, index) in allRegions"
            :key="index"
            :href="`/admin/regions/${region.id}/contractors`"
            class="hover:bg-[#f8f9fa] hover:rounded flex gap-2 items-center px-2 py-4"
          >
            <Icon icon="mdi:location" color="#241e6d" class="w-8 h-8" />
            {{ region.name }}
          </Link>
        </div>
        <div v-if="allRegions.length === 0">
          <div
            class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
          >
            No Regions Available
          </div>
        </div>
      </Card>
    </div>
    <Loader :loading="loading" background="white" height="100vh"></Loader>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import Loader from "@/Components/Ratings/Loader.vue";

import Card from "@/Components/Card.vue";
import { Link } from "@inertiajs/inertia-vue3";
import { computed, onMounted, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import PageTitle from "@/Components/PageTitle.vue";
import { Icon } from "@iconify/vue";
// States
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
const isAdminUrl = usePage().props.value.auth.user.reviews_privileges === 1;
const store = useStore();

//Computed

const loading = computed(() => store.state.ratings.loading);
const screenWidth = computed(() => store.getters.screenWidth);
const allRegions = computed(() => store.state.ratings.allRegions);
//on Mounted
onMounted(() => {
  fetchContractors();
});

onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});
//Methods
const fetchContractors = async (page = 1) => {
  await store.dispatch("ratings/getRegions");
};
</script>
