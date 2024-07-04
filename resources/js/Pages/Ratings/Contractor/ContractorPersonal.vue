<template>
  <Head :title="translations && translations.my_ratings" />

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
        <PageTitle
          linkUrl="/post"
          :pageTitle="translations && translations.my_ratings"
        />
        <ContractorInfo
          v-if="Object.keys(contractor).length > 0"
          :contractor="contractor"
        />
        <Loader :loading="loading" background="" height="60vh"></Loader>
        <div v-if="!loading">
          <heading-card
            v-if="average_rating && starPercentages"
            heading="Average Ratings"
            class="mb-6"
          />
          <AverageRating
            v-if="average_rating && starPercentages"
            :averageRating="average_rating"
            :starPercentages="starPercentages"
            :length="pagination.total"
            class="mb-6"
          />
          <!-- Filters -->
          <div class="border-t-2 border-gray-300">
            <heading-card
              class="mt-4"
              :heading="translations && translations.order_reviews_by"
            />
            <div class="mb-6">
              <div class="flex gap-3 flex-wrap">
                <Button
                  :selected="sortBy === 'latest'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'latest')
                  "
                  >{{ translations && translations.latest }}</Button
                >

                <Button
                  :selected="sortBy === 'oldest'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'oldest')
                  "
                  >{{ translations && translations.oldest }}</Button
                >
                <Button
                  :selected="sortBy === 'highest'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'highest')
                  "
                  >{{ translations && translations.highest_rated }}</Button
                >

                <Button
                  :selected="sortBy === 'middle'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'middle')
                  "
                  >{{ translations && translations.middle_rated }}</Button
                >

                <Button
                  :selected="sortBy === 'lowest'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'lowest')
                  "
                  >{{ translations && translations.low_rated }}</Button
                >
              </div>
            </div>
          </div>

          <div class="mb-4 mt-6 mt-7 border-t-2 border-gray-300">
            <heading-card
              :heading="translations && translations.reviews"
              class="mt-4 mb-6"
            />

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
                {{
                  translations &&
                  translations.no_reviews_available_for_this_contractor
                }}
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
          {{ translations && translations.no_more_reviews_to_load }}
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
const sortBy = ref("latest");
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
const translations = computed(() => store.getters.translations);

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
    fetchReviews(perPage.value, currentPage.value, false, true);
  }
});
watch(updatedResponse, (newVal) => {
  if (newVal && newVal.id) {
    const reviewToUpdate = contractorReviews.value.find(
      (review) => review.id === newVal.review_id
    );
    if (reviewToUpdate) {
      reviewToUpdate.review_response = newVal;
      const indexToUpdate = contractorReviews.value.findIndex(
        (review) => review.id === newVal.review_id
      );

      if (indexToUpdate !== -1) {
        contractorReviews.value = contractorReviews.value.map(
          (review, index) => {
            if (index === indexToUpdate) {
              return reviewToUpdate; // Replace the object at the specified index
            }
            return review; // Keep other objects unchanged
          }
        );
      }
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
    fetchReviews(perPage.value, currentPage.value, false, true);
  }
});
watch(responseId, (newVal) => {
  if (newVal) {
    const index = contractorReviews.value.findIndex(
      (review) => review.review_response.id === newVal
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

const handleFilterSelect = (selected, sortByRate) => {
  if (selected) {
    sortBy.value = sortByRate;
  }
  fetchReveiwsWithLoading();
};
const fetchReveiwsWithLoading = async (noReviewsChanges = false) => {
  loading.value = true;
  await fetchReviews(perPage.value, currentPage.value, false, noReviewsChanges);
  loading.value = false;
};
// Fetch REviews
const fetchReviews = async (
  per_page = perPage.value,
  page = 1,
  append = true,
  noReviewsChanges = false
) => {
  let sortByDate = "";
  let sortByRating = "";
  if (sortBy.value === "latest" || sortBy.value === "oldest") {
    sortByDate = sortBy.value;
  } else {
    sortByRating = sortBy.value;
  }
  try {
    const response = await axios.get(
      `/api/reviews/${contractorDetails.id}?per_page=${per_page}&page=${page}&sort_by_date=${sortByDate}&sort_by_rating=${sortByRating}`,
      getAxiosConfig()
    );
    if (append) {
      contractorReviews.value = [
        ...contractorReviews.value,
        ...response.data.reviews,
      ];
    } else {
      if (!noReviewsChanges) {
        contractorReviews.value = [...response.data.reviews];
      }
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
