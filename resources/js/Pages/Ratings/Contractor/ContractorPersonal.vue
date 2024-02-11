<template>
  <Head title="Your Ratings" />

  <Header
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div v-if="contractor" class="bg-gray-200 mt-10">
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <PageTitle linkUrl="/post" pageTitle="Your Ratings" />
        <ContractorInfo
          v-if="Object.keys(contractor).length > 0"
          :contractor="contractor"
        />
        <Loader :loading="loading" background="" height="60vh"></Loader>
        <div v-if="!loading">
          <heading-card
            v-if="average_rating && starPercentages"
            heading="Average Ratings"
            class="mb-12"
          />
          <AverageRating
            v-if="average_rating && starPercentages"
            :averageRating="average_rating"
            :starPercentages="starPercentages"
            :length="pagination.total"
            class="mb-12"
          />
          <!-- Filters -->
          <div class="border-t-2 border-gray-300">
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
          <div class="xs:mb-12 mb-6 xs:mt-12 mt-7 border-t-2 border-gray-300">
            <heading-card heading="Reviews" class="mt-6 mb-12" />

            <div
              v-if="contractorReviews.length > 0"
              class="flex gap-8 flex-col"
            >
              <QuestionsReview
                v-for="(review, index) in contractorReviews"
                :key="index"
                :review="review"
                :contractorId="contractor.id"
                :profileId="profile.id"
              />
            </div>
            <div v-if="contractorReviews.length === 0">
              <div
                class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
              >
                No reviews Available for this Contractor
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="+currentPage !== +pagination.last_page"
          ref="loadMoreIntersect"
          style="width: 5px; height: 5px"
        ></div>
        <div
          v-show="
            currentPage > 1 &&
            !loadingNextPage &&
            +currentPage === +pagination.last_page
          "
          class="text-center font-bold"
        >
          No More Reviews to Load
        </div>
        <Loader
          classes="flex gap-2"
          :loading="loadingNextPage"
          circleClasses="small-circle"
          textClasses="small-text"
          background=""
          height="70px"
        ></Loader>
      </Card>
    </div>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";
import PageTitle from "@/Components/PageTitle.vue";
import AverageRating from "@/Components/Ratings/Contractor/PartialsVisiting/AverageRating.vue";
import QuestionsReview from "../PartialsPersonal/QuestionsReview.vue";

import Button from "@/Components/Ratings/Button.vue";
import axios from "axios";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Card from "@/Components/Card.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import ContractorInfo from "@/Components/Ratings/Contractor/PartialsVisiting/ContractorInfo.vue";

import { ref, onMounted, watch, computed } from "vue";
import { somethingWentWrong } from "@/helpers/utilities";
import { useStore } from "vuex";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { Icon } from "@iconify/vue";

// State
const { profile, contractorDetails } = defineProps({
  contractorDetails: Object,
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
const currentPage = ref(1);
const contractorReviews = ref([]);
const loading = ref(false);
const starPercentages = ref([]);
const average_rating = ref(null);
const contractor = ref({});
const sortByDate = ref("latest");
const sortByRating = ref("");
const pagination = ref(0);
const perPage = ref(15);
const loadingNextPage = ref(false);
const loadMoreIntersect = ref();

// Mounted
onMounted(async () => {
  loading.value = true;
  await fetchReviews();
  loading.value = false;
  contractor.value = contractorDetails;
  setTimeout(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMoreReviews();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "0px 0px 0px 0px",
      threshold: 0,
    });

    observer.observe(loadMoreIntersect.value);
  }, 1000);
});

//Computed
const updatedReview = computed(() => store.state.ratings.updatedReview);
const updatedResponse = computed(() => store.state.ratings.updatedResponse);
const screenWidth = computed(() => store.getters.screenWidth);
const reviewId = computed(() => store.state.ratings.reviewId);
const responseId = computed(() => store.state.ratings.responseId);

//Watch
watch(updatedReview, (newVal) => {
  if (newVal && newVal.id) {
    const reviewIndex = contractorReviews.value.findIndex(
      (review) => review.id === newVal.id
    );

    if (reviewIndex !== -1) {
      // Update the existing review with the new data
      Object.assign(contractorReviews.value[reviewIndex], newVal);
    }
  }
});
watch(updatedResponse, (newVal) => {
  if (newVal && newVal.id) {
    console.log(newVal, "newVal", contractorReviews);
    const reviewToUpdate = contractorReviews.value.find(
      (review) => review.id === newVal.review_id
    );

    if (reviewToUpdate) {
      reviewToUpdate.review_response = newVal;
    }
  }
});
watch(reviewId, (newVal) => {
  if (newVal) {
    const index = contractorReviews.value.findIndex(
      (review) => review.id === newVal
    );

    if (index !== -1) {
      contractorReviews.value.splice(index, 1);
    }
  }
});
watch(responseId, (newVal) => {
  if (newVal) {
    const index = contractorReviews.value.findIndex(
      (review) => review.response_id === newVal
    );

    if (index !== -1) {
      delete contractorReviews.value[index].review_response;
    }
  }
});

// Methods
const loadMoreReviews = async () => {
  if (!loading.value) {
    loadingNextPage.value = true;
    currentPage.value = currentPage.value + 1;
    console.log("inloadMoreReviews");
    await fetchReviews(perPage.value, currentPage.value);
    loadingNextPage.value = false;
  }
};

const handleDate = (selected, sortByString) => {
  if (selected) {
    sortByDate.value = sortByString;
  } else if (!selected) {
    sortByDate.value = "";
  }
  fetchReveiwsWithLoading();
};
const handleRating = (selected, sortByRate) => {
  if (selected) {
    sortByRating.value = sortByRate;
  } else if (!selected) {
    sortByRating.value = "";
  }
  fetchReveiwsWithLoading();
};
const fetchReveiwsWithLoading = async () => {
  loading.value = true;
  await fetchReviews(perPage.value, currentPage.value, false);
  loading.value = false;
};
// Fetch REviews
const fetchReviews = async (
  per_page = perPage.value,
  page = 1,
  append = true
) => {
  try {
    const response = await axios.get(
      `/api/reviews/${contractorDetails.id}?per_page=${per_page}&page=${page}&sort_by_date=${sortByDate.value}&sort_by_rating=${sortByRating.value}`,
      getAxiosConfig()
    );
    if (append) {
      contractorReviews.value = [
        ...contractorReviews.value,
        ...response.data.reviews,
      ];
    } else {
      contractorReviews.value = [...response.data.reviews];
    }
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
  }
};
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.accordion-enter-from, .accordion-leave-to /* .accordion-leave-active in <2.1.8 */ {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 300px; /* This value might need to be adjusted depending on the expected max height of your content */
  opacity: 1;
}
</style>
