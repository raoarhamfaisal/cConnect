<template>
  <Head title="Ratings" />

  <Header
    :profile="profile"
    :posts="posts"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div v-if="!loading && contractor" class="bg-gray-200 mt-10">
      <Card :shadowLevel="2" bgColor="white" padding="20px">
        <ContractorInfo :contractor="contractor" />

        <heading-card heading="Average Ratings" class="mb-12" />
        <AverageRating
          v-if="average_rating && starPercentages"
          :averageRating="average_rating"
          :starPercentages="starPercentages"
          :length="contractorReviews.length"
          class="mb-12"
        />
        <!-- Filters -->
        <div class="border-t-2 border-gray-300">
          <heading-card class="mt-6" heading="Order Reviews By" />
          <div class="xs:mb-12 mb-6">
            <div class="flex gap-3">
              <Button @onSelect="handleSelect">Latest</Button>
              <Button @onSelect="handleSelect">Oldest</Button>
            </div>
          </div>
        </div>
        <!-- RAting -->
        <div class="xs:mb-12 mb-6 xs:mt-12 mt-7 border-t-2 border-gray-300">
          <heading-card heading="Ratings" class="mt-6" />
          <div class="flex gap-3">
            <div class="flex gap-3">
              <Button @onSelect="handleSelect">Highest rated</Button>
              <Button @onSelect="handleSelect">Middle Rated</Button>
              <Button @onSelect="handleSelect">Low Rated</Button>
            </div>
          </div>
        </div>
        <div class="xs:mb-12 mb-6 xs:mt-12 mt-7 border-t-2 border-gray-300">
          <heading-card heading="Top Reviews" class="mt-6 mb-12" />

          <div v-if="contractorReviews.length > 0" class="flex gap-8 flex-col">
            <ReviewResponse
              v-for="(review, index) in contractorReviews"
              :key="index"
              :review="review"
              :contractorId="contractor.id"
              :profileId="profile.user_id"
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
        <div class="flex items-center justify-center mb-4">
          <CustomPagination
            :total-items="50"
            :current-page="1"
            :items-per-page="5"
            v-model="currentPage"
            :max-pages-shown="3"
            :on-click="onClickHandler"
          />
        </div>
        <div class="py-4 border-t-2 border-b-2 border-gray-300">
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
                  :profileId="profile.user_id"
                  :contractorId="contractor.id"
                  @addReview="refreshPage"
                />
              </transition>
            </Card>
          </transition>
        </div>
      </Card>
    </div>
    <Loader :loading="loading" background="white" height="100vh"></Loader>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import ReviewResponse from "./PartialsVisiting/ReviewResponse.vue";
import { Head } from "@inertiajs/inertia-vue3";
import AverageRating from "./PartialsVisiting/AverageRating.vue";
import Button from "@/Components/Ratings/Button.vue";
import CustomPagination from "@/Components/Ratings/CustomPagination.vue";
import axios from "axios";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Card from "@/Components/Card.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import ContractorInfo from "./PartialsVisiting/ContractorInfo.vue";
import GiveRating from "./PartialsVisiting/GiveRating.vue";

import { ref, nextTick, onMounted, watch, computed } from "vue";
import { somethingWentWrong } from "@/helpers/utilities";
import { useStore } from "vuex";

// State
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

const store = useStore();
const currentPage = ref(1);
const showCard = ref(false);
const cardRef = ref(null);
const contractorReviews = ref(null);
const loading = ref(false);
const starPercentages = ref([]);
const average_rating = ref(null);
const contractor = ref(null);

// Mounted
onMounted(() => {
  fetchReviews();
});

//Computed

const isFetchReviews = computed(() => store.state.ratings.isFetchReviews);

//Watch
watch(isFetchReviews, (newVal) => {
  if (newVal) {
    fetchReviews();
    console.log("inFetchReview");
    store.commit("ratings/setIsFetchReviews", false);
  }
});

// Methods

// Fetch REviews
const fetchReviews = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`/api/reviews/6`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    contractorReviews.value = response.data.reviews;
    contractor.value = response.data.contractor;
    console.log(contractor, response.data.contractor);
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
const refreshPage = () => {
  fetchReviews();
  handleSelect();
};
const onClickHandler = (page) => {
  console.log("pageClick", page);
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
