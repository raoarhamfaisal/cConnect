<template>
  <Head title="Ratings" />

  <Header
    v-if="isAdminUrl"
    :profile="profile"
    :posts="posts"
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
        <SearchInput
          class="mb-12"
          barWidth="30"
          icon="iconamoon:search"
          @search-clicked="onSearch"
        />
        <heading-card heading="All Contractors" class="mt-3 mb-6" />
        <div
          class="flex flex-col"
          v-if="allContractors && !loading && allContractors.length > 0"
        >
          <Link
            v-for="(contractor, index) in allContractors"
            :key="index"
            :href="`/admin/ratings/${contractor.id}`"
            class="hover:bg-[#f8f9fa] hover:rounded"
          >
            <contractor
              class="border-b-2 py-2 border-gray-200 cursor-pointer"
              :contractor="contractor"
            />
          </Link>
        </div>
        <div v-if="allContractors.length === 0">
          <div
            class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
          >
            No Contractors Available
          </div>
        </div>
        <div
          v-if="
            pagination &&
            Object.keys(pagination).length > 0 &&
            allContractors &&
            allContractors.length > 0 &&
            pagination.last_page > 1
          "
          class="flex items-center justify-center mb-4 mt-5"
        >
          <CustomPagination
            :total-items="pagination.total"
            :current-page="pagination.current_page"
            :items-per-page="pagination.per_page"
            v-model="currentPage"
            :max-pages-shown="3"
            :on-click="onClickHandler"
          />
        </div>
      </Card>
    </div>
    <Loader :loading="loading" background="white" height="100vh"></Loader>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import Loader from "@/Components/Ratings/Loader.vue";
import CustomPagination from "@/Components/Ratings/CustomPagination.vue";

import Card from "@/Components/Card.vue";
import { Link } from "@inertiajs/inertia-vue3";
import Contractor from "./partials/AllContractors/Contractor.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import { computed, ref, onMounted, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import SearchInput from "@/Components/Ratings/SearchInput.vue";
// States
defineProps({
  profile: Object,
  posts: Object,
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
const currentPage = ref(1);
const perPage = ref(5);
const searchTerm = ref("");

//Computed

const loading = computed(() => store.state.ratings.loading);
const screenWidth = computed(() => store.getters.screenWidth);
const allContractors = computed(() => store.state.ratings.allContractors);
const pagination = computed(() => store.state.ratings.pagination);
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
  await store.dispatch("ratings/getAllContractors", {
    perPage: perPage.value,
    page: page,
    searchTerm: searchTerm.value,
  });
};

const onClickHandler = (page) => {
  fetchContractors(page);
};

const onSearch = (term) => {
  searchTerm.value = term;
  fetchContractors();
};
</script>
