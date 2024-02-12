<template>
  <Head title="Appealed Reviews" />

  <Header
    v-if="isAdminUrl"
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <Card
      v-if="loading"
      :shadowLevel="2"
      bgColor="white"
      :padding="screenWidth < 640 ? '7px' : '20px'"
    >
      <Loader :loading="loading" background="" height="100vh"></Loader>
    </Card>

    <div v-if="!loading" class="bg-gray-200 mt-10 flex flex-col gap-10">
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <PageTitle
          linkUrl="/admin/regions/appealed"
          pageTitle="Appealed Reviews"
        />

        <!-- Filters -->
        <div class="border-gray-300">
          <heading-card class="mt-6" heading="Order Reviews By" />
          <div class="xs:mb-12 mb-6">
            <div class="flex gap-3">
              <Button
                :selected="sortByDate === 'latest'"
                @onSelect="(selected) => handleDate(selected, 'latest')"
                >Latest</Button
              >

              <Button
                :selected="sortByDate === 'oldest'"
                @onSelect="(selected) => handleDate(selected, 'oldest')"
                >Oldest</Button
              >
            </div>
          </div>
        </div>
        <!-- RAting -->
        <div class="xs:mb-12 mb-6 xs:mt-12 mt-7 border-t-2 border-gray-300">
          <heading-card heading="Ratings" class="mt-6" />
          <div class="flex gap-3">
            <div class="flex gap-3">
              <Button
                :selected="sortByRating === 'highest'"
                @onSelect="(selected) => handleRating(selected, 'highest')"
                >Highest rated</Button
              >

              <Button
                :selected="sortByRating === 'middle'"
                @onSelect="(selected) => handleRating(selected, 'middle')"
                >Middle Rated</Button
              >

              <Button
                :selected="sortByRating === 'lowest'"
                @onSelect="(selected) => handleRating(selected, 'lowest')"
                >Low Rated</Button
              >
            </div>
          </div>
        </div>
      </Card>
      <Card
        :shadowLevel="2"
        bgColor="#fff"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <v-tabs
          bg-color="transparent"
          v-model="activeTab"
          color="#241e6d"
          center-active
        >
          <v-tab :value="0">
            <span class="font-bold text-md" style="font-size: 16px">New </span
            ><v-badge color="info" content="12" inline></v-badge>
          </v-tab>
          <v-tab :value="1"
            ><span class="font-bold text-md" style="font-size: 16px"
              >Waiting</span
            ><v-badge color="info" content="12" inline></v-badge>
          </v-tab>
          <v-tab :value="2"
            ><span class="font-bold text-md" style="font-size: 16px"
              >Completed</span
            ><v-badge color="info" content="12" inline></v-badge>
          </v-tab>
        </v-tabs>

        <div v-if="activeTab === 0" class="xs:mb-12 mb-6 border-gray-300">
          <heading-card heading="Reviews" class="mt-6 mb-12" />

          <div v-if="appealedReviews?.length > 0" class="flex gap-8 flex-col">
            <ReviewResponseAdmin
              v-for="(review, index) in appealedReviews"
              :key="index"
              :review="review"
              :contractorId="review.contractor_id"
              :profileId="profile.id"
              :showContactDetails="true"
            />
          </div>
          <div v-if="appealedReviews?.length === 0">
            <div
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No reviews Available
            </div>
          </div>
        </div>
        <div v-if="activeTab === 1">waiting</div>
        <div v-if="activeTab === 2">Completed</div>

        <div
          v-if="
            pagination &&
            Object.keys(pagination).length > 0 &&
            pagination.last_page > 1 &&
            appealedReviews &&
            appealedReviews.length > 0
          "
          class="flex items-center justify-center mb-4"
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
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import Button from "@/Components/Ratings/Button.vue";
import CustomPagination from "@/Components/Ratings/CustomPagination.vue";
import axios from "axios";
import ReviewResponseAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ReviewResponseAdmin.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Card from "@/Components/Card.vue";
import Loader from "@/Components/Ratings/Loader.vue";

import { ref, onMounted, watch, computed, onBeforeMount } from "vue";
import { somethingWentWrong } from "@/helpers/utilities";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import PageTitle from "@/Components/PageTitle.vue";

// State
const { region_id } = defineProps({
  profile: Object,
  region_id: [String, Number],
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});

const store = useStore();
const isAdminUrl = usePage().props.value.auth.user.appeals_privileges === 1;
const currentPage = ref(1);
const appealedReviews = ref(null);
const loading = ref(false);
const sortByDate = ref("latest");
const sortByRating = ref("");
const perPage = ref(15);
const pagination = ref(0);
const activeTab = ref(0);

// Mounted
onMounted(() => {
  fetchReviews();
});
onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});

//Computed

const isFetchReviews = computed(() => store.state.ratings.isFetchReviews);
const screenWidth = computed(() => store.getters.screenWidth);
const isDeleted = computed(() => store.state.ratings.isDeleted);
const isInactive = computed(() => store.state.ratings.isInactive);

//Watch
watch(isFetchReviews, (newVal) => {
  if (newVal) {
    fetchReviews(perPage.value, currentPage.value);
    store.commit("ratings/setIsFetchReviews", false);
  }
});
watch(isDeleted, (newVal) => {
  if (newVal) {
    configueCurrentPage();
    store.commit("ratings/setIsDeleted", false);
  }
});
watch(isInactive, (newVal) => {
  if (newVal) {
    fetchReviews(perPage.value, currentPage.value);
    store.commit("ratings/setIsInactive", false);
  }
});

// Methods
const configueCurrentPage = () => {
  if (pagination.value.total % pagination.value.per_page === 1) {
    if (pagination.value.last_page === currentPage.value) {
      currentPage.value = currentPage.value - 1;
    }
  }
  fetchReviews(perPage.value, currentPage.value);
};
const handleDate = (selected, sortByString) => {
  if (selected) {
    sortByDate.value = sortByString;
  } else if (!selected) {
    sortByDate.value = "";
  }
  fetchReviews(perPage.value, currentPage.value);
};
const handleRating = (selected, sortByRate) => {
  if (selected) {
    sortByRating.value = sortByRate;
  } else if (!selected) {
    sortByRating.value = "";
  }
  fetchReviews(perPage.value, currentPage.value);
};

// Fetch REviews
const fetchReviews = async (per_page = perPage.value, page = 1) => {
  try {
    loading.value = true;
    const response = await axios.get(
      `/api/admin/all-appealed-reviews/${region_id}?per_page=${per_page}&page=${page}&sort_by_date=${sortByDate.value}&sort_by_rating=${sortByRating.value}`,
      getAxiosConfig()
    );
    appealedReviews.value = response.data.reviews;
    pagination.value = response.data.pagination;
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
  }
};

const onClickHandler = (page) => {
  fetchReviews(perPage.value, page);
};
</script>

<style >
</style>
