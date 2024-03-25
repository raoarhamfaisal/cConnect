<template>
  <div v-if="contractor">
    <div class="flex flex-col gap-10">
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
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
            <heading-card class="mt-4" heading="Order Reviews By" />
            <div class="mb-6">
              <div class="flex gap-3 flex-wrap">
                <Button
                  :selected="sortBy === 'latest'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'latest')
                  "
                  >Latest</Button
                >

                <Button
                  :selected="sortBy === 'oldest'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'oldest')
                  "
                  >Oldest</Button
                >
                <Button
                  :selected="sortBy === 'highest'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'highest')
                  "
                  >Highest rated</Button
                >

                <Button
                  :selected="sortBy === 'middle'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'middle')
                  "
                  >Middle Rated</Button
                >

                <Button
                  :selected="sortBy === 'lowest'"
                  @onSelect="
                    (selected) => handleFilterSelect(selected, 'lowest')
                  "
                  >Low Rated</Button
                >
              </div>
            </div>
          </div>
          <div
            v-if="parseInt(user.id) !== parseInt(contractorDetails.user_id)"
            class="py-4 border-t-2 border-b-2 border-gray-300"
          >
            <Button
              ref="cardRef"
              @onSelect="handleSelect"
              :style="{
                boxShadow:
                  '0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
              }"
              class="w-full text-2xl text-left rounded-lg"
              >Write a review</Button
            >
            <!-- {{ profileId }} -->
            <transition name="accordion">
              <Card
                v-if="showCard"
                :shadowLevel="1"
                bgColor="white"
                padding="10px"
                class="mt-8"
              >
                <transition name="accordion">
                  <GiveRating
                    :profileId="profileId"
                    :contractorId="contractor.id"
                    @addReview="refreshPageOnAdd"
                  />
                </transition>
              </Card>
            </transition>
          </div>
        </div>
      </Card>
      <Card
        v-if="!loading"
        :shadowLevel="2"
        bgColor="#fff"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <div class="mb-6 border-gray-300">
          <heading-card heading="Reviews" class="mt-4 mb-6" />

          <div
            v-if="contractorReviews && contractorReviews.length > 0"
            class="flex gap-8 flex-col"
          >
            <ReviewResponse
              v-for="(review, index) in contractorReviews"
              :key="index"
              :review="review"
              :contractorId="contractor.id"
              :profileId="profileId"
            />
          </div>
          <div v-if="contractorReviews && contractorReviews.length === 0">
            <div
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No reviews Available for this Contractor
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
  </div>
</template>

<script setup>
import ReviewResponse from "./PartialsVisiting/ReviewResponse.vue";
import { usePage } from "@inertiajs/inertia-vue3";
import AverageRating from "./PartialsVisiting/AverageRating.vue";
import Button from "@/Components/Ratings/Button.vue";
import axios from "axios";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Card from "@/Components/Card.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import ContractorInfo from "./PartialsVisiting/ContractorInfo.vue";
import GiveRating from "./PartialsVisiting/GiveRating.vue";

import { ref, nextTick, onMounted, watch, computed } from "vue";
import { somethingWentWrong } from "@/helpers/utilities";
import { useStore } from "vuex";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";

// State
const { contractorDetails, profileId } = defineProps({
  contractorDetails: Object,
  profileId: [Number, String],
});

const store = useStore();
const currentPage = ref(1);
const showCard = ref(false);
const cardRef = ref(null);
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
let usePageDeatails = usePage().props.value;
const user = usePageDeatails.auth.user;
// const profile = usePageDeatails?.profile;

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

const updatedResponse = computed(() => store.state.ratings.updatedResponse);
const screenWidth = computed(() => store.getters.screenWidth);
const reviewId = computed(() => store.state.ratings.reviewId);
const responseId = computed(() => store.state.ratings.responseId);
const updatedReview = computed(() => store.state.ratings.updatedReview);

//Watch
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
watch(updatedReview, (newVal) => {
  if (newVal && newVal.id) {
    const reviewIndex = contractorReviews.value.findIndex(
      (review) => review.id === newVal.id
    );

    if (reviewIndex !== -1) {
      // Update the existing review with the new data
      Object.assign(contractorReviews.value[reviewIndex], newVal);
    }
    console.log(newVal, newVal.id, reviewIndex, "updated");
    fetchReviews(perPage.value, currentPage.value, false, true);
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
  loadingNextPage.value = true;
  currentPage.value = currentPage.value + 1;
  await fetchReviews(perPage.value, currentPage.value);
  loadingNextPage.value = false;
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

const handleSelect = async () => {
  showCard.value = !showCard.value;

  if (showCard.value) {
    // Wait for the DOM update
    await nextTick();

    setTimeout(() => {
      if (
        cardRef.value &&
        cardRef.value.$el &&
        cardRef.value.$el.scrollIntoView
      ) {
        const elementToScroll = cardRef.value.$el || cardRef.value;
        elementToScroll.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      } else {
        console.error("Unexpected issue with the ref");
      }
    }, 250);
  }
};
const refreshPageOnAdd = async () => {
  loading.value = true;

  currentPage.value = 1;
  await fetchReviews(perPage.value, currentPage.value, false);
  loading.value = false;
  handleSelect();
};
</script>
