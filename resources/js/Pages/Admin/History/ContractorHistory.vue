<template>
  <Head title="Contractor History" />

  <Header
    v-if="isAdminUrl"
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div v-if="contractor" class="bg-gray-200 mt-10 flex flex-col gap-10">
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <!-- Contractor info -->
        <PageTitle
          :linkUrl="`/admin/regions/${contractor.region_id}/appealed`"
          pageTitle="Contractor History"
        />

        <ContractorInfo :contractor="contractor" />

        <!-- Tabs -->
        <div class="border-gray-300">
          <heading-card class="mt-6" heading="Check Contractor" />
          <div class="xs:mb-12 mb-6">
            <div class="flex gap-3">
              <button
                class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2"
                :class="{ selected: reviewResponseFilter === 'reviews' }"
                :disabled="disabled"
                @click="handleTabs('reviews')"
              >
                <div class="flex items-center justify-center">Reviews</div>
                <img
                  v-show="loading && reviewResponseFilter === 'reviews'"
                  src="/images/avatars/Spinner.gif"
                  alt="spinner"
                  width="20"
                />
              </button>
              <button
                class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2"
                :disabled="disabled"
                :class="{ selected: reviewResponseFilter === 'responses' }"
                @click="handleTabs('responses')"
              >
                <div class="flex items-center justify-center">Responses</div>
                <img
                  v-show="loading && reviewResponseFilter === 'responses'"
                  src="/images/avatars/Spinner.gif"
                  alt="spinner"
                  width="20"
                />
              </button>
            </div>
          </div>
        </div>
        <Loader :loading="loading" background="" height="50vh"></Loader>

        <div v-if="!loading">
          <heading-card heading="Average Ratings" class="mb-12" />
          <AverageRating
            v-if="average_rating && starPercentages"
            :averageRating="average_rating"
            :starPercentages="starPercentages"
            :length="pagination.total"
            class="mb-12"
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
        </div>
      </Card>
      <Card
        v-if="!loading"
        :shadowLevel="2"
        bgColor="#fff"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <div class="xs:mb-12 mb-6 border-gray-300">
          <heading-card heading="Reviews" class="mt-6 mb-12" />

          <div
            v-if="contractorReviews && contractorReviews?.length > 0"
            class="flex gap-8 flex-col"
          >
            <HistoryReviewResponse
              v-for="(review, index) in contractorReviews"
              :key="index"
              :review="review"
              :contractorId="review.contractor_id"
              :profileId="profile.id"
            />
          </div>
          <div v-if="contractorReviews && contractorReviews?.length === 0">
            <div
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No reviews Available for this Contractor
            </div>
          </div>
        </div>
        <div
          v-if="
            pagination &&
            Object.keys(pagination).length > 0 &&
            pagination.last_page > 1 &&
            contractorReviews &&
            contractorReviews.length > 0
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
import AverageRating from "@/Components/Ratings/Contractor/PartialsVisiting/AverageRating.vue";
import ContractorInfo from "@/Components/Ratings/Contractor/PartialsVisiting/ContractorInfo.vue";
import axios from "axios";
import HistoryReviewResponse from "@/Pages/Admin/History/partials/HistoryReviewResponse.vue";

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
const { contractorDetails } = defineProps({
  profile: Object,
  contractorDetails: Object,
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
const contractorId = ref(null);
const contractorReviews = ref(null);
const loading = ref(false);
const disabled = ref(false);
const starPercentages = ref([]);
const average_rating = ref(null);
const contractor = ref({});
const reviewResponseFilter = ref("reviews");
const sortByDate = ref("latest");
const sortByRating = ref("");
const pagination = ref(0);
const perPage = ref(15);

// Mounted
onMounted(() => {
  contractorId.value = contractorDetails.id;
  contractor.value = contractorDetails;
  fetchReviews();
});
onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});

//Computed
const screenWidth = computed(() => store.getters.screenWidth);
const isFetchReviews = computed(() => store.state.ratings.isFetchReviews);
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
// when we delete one last review in the page so it can be the last or only one review in the page
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

const handleTabs = (apiToCall) => {
  reviewResponseFilter.value = apiToCall;
  fetchReviews(perPage.value, currentPage.value);
};

// Fetch REviews
const fetchReviews = async (per_page = perPage.value, page = 1) => {
  try {
    loading.value = true;
    disabled.value = true;
    const response = await axios.get(
      `/api/admin/${reviewResponseFilter.value}/${contractorId.value}/history?per_page=${per_page}&page=${page}&sort_by_date=${sortByDate.value}&sort_by_rating=${sortByRating.value}`,
      getAxiosConfig()
    );
    contractorReviews.value = response.data.reviews;
    pagination.value = response.data.pagination;
    average_rating.value = response.data.average_rating;
    // Extracting the star counts
    const {
      five_stars_count,
      four_stars_count,
      three_stars_count,
      two_stars_count,
      one_star_count,
    } = response.data;

    const totalRatings =
      five_stars_count +
      four_stars_count +
      three_stars_count +
      two_stars_count +
      one_star_count;

    // Calculate percentages for each star count
    starPercentages.value = [
      (five_stars_count / totalRatings) * 100,
      (four_stars_count / totalRatings) * 100,
      (three_stars_count / totalRatings) * 100,
      (two_stars_count / totalRatings) * 100,
      (one_star_count / totalRatings) * 100,
    ];
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
    disabled.value = false;
  }
};

const onClickHandler = (page) => {
  fetchReviews(perPage.value, page);
};
</script>

<style scoped>
button.selected {
  background-color: #3a357c;
  color: #fff;
}
button {
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}
</style>
