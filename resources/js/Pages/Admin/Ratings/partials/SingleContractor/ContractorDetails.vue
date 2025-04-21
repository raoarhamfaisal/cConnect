<template>
  <div v-if="contractor" class="bg-gray-200 mt-1 flex flex-col gap-10">
    <Card
      :shadowLevel="2"
      bgColor="white"
      :padding="screenWidth < 640 ? '7px' : '20px'"
    >
      <!-- Filters -->
      <PageTitle
        :linkUrl="`/admin/regions/${region_id}/contractors`"
        pageTitle="Contractor Reviews"
      />

      <ContractorInfo :contractor="contractor" />

      <div v-if="!loading">
        <heading-card heading="Average Ratings" class="mb-6" />
        <AverageRating
          v-if="average_rating && starPercentages"
          :averageRating="average_rating"
          :starPercentages="starPercentages"
          :length="pagination.total"
          class="mb-6"
        />
        <!-- Filters -->
        <div class="border-gray-300">
          <heading-card
            class=""
            :heading="translations && translations.order_reviews_by"
          />
          <div class="mb-4">
            <div class="flex gap-3 flex-wrap">
              <Button
                :selected="sortBy === 'latest'"
                @onSelect="(selected) => handleFilterSelect(selected, 'latest')"
                >Latest</Button
              >

              <Button
                :selected="sortBy === 'oldest'"
                @onSelect="(selected) => handleFilterSelect(selected, 'oldest')"
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
                @onSelect="(selected) => handleFilterSelect(selected, 'middle')"
                >Middle Rated</Button
              >

              <Button
                :selected="sortBy === 'lowest'"
                @onSelect="(selected) => handleFilterSelect(selected, 'lowest')"
                >Low Rated</Button
              >
            </div>
          </div>
        </div>
      </div>
    </Card>
    <div class="flex flex-col gap-4">
      <Card
        :shadowLevel="2"
        bgColor="#fff"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        v-for="(review, index) in contractorReviews"
        :key="index"
      >
        <div class="border-gray-300">
          <heading-card
            v-if="index === 0"
            heading="Reviews"
            class="mt-4 mb-6"
          />

          <Loader :loading="loading" background="" height="50vh"></Loader>

          <div class="flex gap-8 flex-col">
            <ReviewResponseAdmin
              :review="review"
              :key="review.review_response"
              :contractorId="review.contractor_id"
              :profileId="profile.id"
            />
          </div>
        </div>
        <v-lazy
          :min-height="5"
          :options="{ threshold: 0.5 }"
          v-if="
            +currentPage !== +pagination.last_page &&
            index === contractorReviews.length - 1
          "
          @update:model-value="loadMoreReviews"
          transition="fade-transition"
        ></v-lazy>
        <div
          v-if="
            currentPage > 1 &&
            !loadingNextPage &&
            +currentPage === +pagination.last_page &&
            index === contractorReviews.length - 1
          "
          class="text-center font-bold mt-4"
        >
          No More Reviews to Load
        </div>
        <Loader
          classes="flex gap-2 mt-4"
          v-if="
            +currentPage !== +pagination.last_page &&
            index === contractorReviews.length - 1
          "
          :loading="loadingNextPage"
          circleClasses="small-circle"
          textClasses="small-text"
          background=""
          height="70px"
        ></Loader>
      </Card>
    </div>
    <!-- for No Reviews -->
    <Card
      :shadowLevel="2"
      bgColor="#fff"
      v-if="contractorReviews?.length === 0 && !loadingNextPage"
      :padding="screenWidth < 640 ? '7px' : '20px'"
      class="mb-6"
    >
      <div class="mb-6 border-gray-300">
        <heading-card heading="Reviews" class="mt-4 mb-6" />
        <Loader :loading="loading" background="" height="30vh"></Loader>

        <div>
          <div
            v-if="contractorReviews?.length === 0 && !loading"
            class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
          >
            No reviews Available
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Button from "@/Components/Ratings/Button.vue";
import AverageRating from "@/Components/Ratings/Contractor/PartialsVisiting/AverageRating.vue";
import ContractorInfo from "@/Components/Ratings/Contractor/PartialsVisiting/ContractorInfo.vue";
import axios from "axios";
import ReviewResponseAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ReviewResponseAdmin.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Card from "@/Components/Card.vue";
import Loader from "@/Components/Ratings/Loader.vue";

import { ref, onMounted, watch, computed } from "vue";
import { somethingWentWrong } from "@/helpers/utilities";
import { useStore } from "vuex";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import PageTitle from "@/Components/PageTitle.vue";

// Province
const { contractorDetails, gotReviews, givenReviews } = defineProps({
  profile: Object,
  region_id: [String, Number],
  contractorDetails: Object,
  gotReviews: {
    type: Boolean,
    default: false,
  },
  givenReviews: {
    type: Boolean,
    default: false,
  },
});
const store = useStore();
const currentPage = ref(1);
const contractorId = ref(null);
const contractorReviews = ref([]);
const loading = ref(false);
const starPercentages = ref([]);
const average_rating = ref(null);
const contractor = ref({});
const sortBy = ref("latest");
const pagination = ref(0);
const loadingNextPage = ref(false);
const perPage = ref(15);

// Mounted
onMounted(async () => {
  contractorId.value = contractorDetails.id;
  contractor.value = contractorDetails;
  await fetchContractorReviews();
});

//Computed

const screenWidth = computed(() => store.getters.screenWidth);
const updatedReview = computed(() => store.state.ratings.updatedReview);
const updatedResponse = computed(() => store.state.ratings.updatedResponse);
const translations = computed(() => store.getters.translations);

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
watch(updatedReview, async (newVal) => {
  if (newVal && newVal.id) {
    const reviewIndex = contractorReviews.value.findIndex(
      (review) => review.id === newVal.id
    );

    if (reviewIndex !== -1) {
      // Update the existing review with the new data
      Object.assign(contractorReviews.value[reviewIndex], newVal);
    }
    loading.value = true;
    await fetchReviews(perPage.value, currentPage.value, false, true);
    loading.value = false;
  }
});
// Methods

const handleFilterSelect = async (selected, sortByRate) => {
  if (selected) {
    sortBy.value = sortByRate;
  }
  contractorReviews.value = [];
  await fetchContractorReviews(false);
};
const loadMoreReviews = async () => {
  loadingNextPage.value = true;
  let pageToLoad = currentPage.value + 1;
  await fetchReviews(perPage.value, pageToLoad);
  loadingNextPage.value = false;
  currentPage.value = pageToLoad;
};
const fetchContractorReviews = async (append = true) => {
  loading.value = true;
  await fetchReviews(perPage.value, 1, append);
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
  if (gotReviews) {
    try {
      const response = await axios.get(
        `/api/admin/reviews/${contractorId.value}?per_page=${per_page}&page=${page}&sort_by_date=${sortByDate}&sort_by_rating=${sortByRating}`,
        getAxiosConfig()
      );
      console.log(response);

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
      console.log("at end");
    } catch (err) {
      somethingWentWrong();
    }
  }
  if (givenReviews) {
    try {
      const response = await axios.get(
        `/api/admin/reviews/${contractorId.value}/history?per_page=${per_page}&page=${page}&sort_by_date=${sortByDate}&sort_by_rating=${sortByRating}`,
        getAxiosConfig()
      );
      console.log(response);
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
  }
};
</script>

<style scoped></style>
