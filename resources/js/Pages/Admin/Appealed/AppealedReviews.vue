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
    <div class="bg-gray-200 mt-10 flex flex-col">
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        class="mb-6"
      >
        <div class="flex justify-between">
          <PageTitle
            linkUrl="/admin/regions/appealed"
            pageTitle="Appealed Reviews"
          />
          <SearchInput
            class="mb-8 w-72"
            :barWidth="100"
            icon="iconamoon:search"
            placeholder="Search by Appeal Id..."
            @search-clicked="onSearch"
          />
        </div>
        <!-- Region -->
        <heading-card
          class="mt-2"
          style="font-weight: 800; margin-bottom: 8px; font-size: 24px"
          :heading="`Region ${region_id} : ${region_name}`"
        />
        <!-- View Appeals -->
        <div class="border-gray-300">
          <heading-card class="" heading="View Appeals" />
          <div class="mb-4 mt-2">
            <div class="flex gap-3">
              <button
                class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2"
                :class="{ selected: appealFilter === 'open' }"
                @click="handleTabs('open')"
              >
                <div class="flex items-center justify-center">Open Appeals</div>
              </button>
              <button
                class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2"
                :class="{ selected: appealFilter === 'on_hold' }"
                @click="handleTabs('on_hold')"
              >
                <div class="flex items-center justify-center">
                  On Hold Appeals
                </div>
              </button>
              <button
                class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2"
                :class="{ selected: appealFilter === 'approved' }"
                @click="handleTabs('approved')"
              >
                <div class="flex items-center justify-center">
                  Approved Appeals
                </div>
              </button>
              <button
                class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2"
                :class="{ selected: appealFilter === 'denied' }"
                @click="handleTabs('denied')"
              >
                <div class="flex items-center justify-center">
                  Denied Appeals
                </div>
              </button>
            </div>
          </div>
        </div>
        <!-- Filters -->
        <div class="border-gray-300 border-t-2">
          <heading-card class="mt-3" heading="Order Reviews By" />
          <div class="mb-4 mt-2">
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
        <div class="border-t-2 border-gray-300">
          <heading-card heading="Ratings" class="mt-3" />
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
      <div class="flex flex-col gap-4">
        <Card
          :shadowLevel="2"
          bgColor="#fff"
          :padding="screenWidth < 640 ? '7px' : '20px'"
          v-for="(review, index) in appealedReviews"
          :key="index"
        >
          <div class="border-gray-300">
            <heading-card
              v-if="index === 0"
              :heading="`View : ${
                appealFilter === 'open'
                  ? 'Open Appeals'
                  : appealFilter === 'on_hold'
                  ? 'On Hold Appeals'
                  : appealFilter === 'approved'
                  ? 'Approved Appeals'
                  : 'Denied Appeals'
              }`"
              class="mt-4 mb-6"
            />
            <Loader :loading="loading" background="" height="50vh"></Loader>

            <div class="flex gap-8 flex-col">
              <ReviewResponseAdmin
                :review="review"
                :contractorId="review.contractor_id"
                :profileId="profile.id"
                :showContactDetails="true"
              />
            </div>
          </div>
          <v-lazy
            :min-height="5"
            :options="{ threshold: 0.5 }"
            v-if="
              +currentPage !== +pagination.last_page &&
              index === appealedReviews.length - 1
            "
            @update:model-value="loadMoreReviews"
            transition="fade-transition"
          ></v-lazy>
          <div
            v-if="
              currentPage > 1 &&
              !loadingNextPage &&
              +currentPage === +pagination.last_page &&
              index === appealedReviews.length - 1
            "
            class="text-center font-bold mt-4"
          >
            No More Reviews to Load
          </div>

          <Loader
            classes="flex gap-2 mt-4"
            v-if="
              +currentPage !== +pagination.last_page &&
              index === appealedReviews.length - 1
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
        v-if="appealedReviews?.length === 0 && !loadingNextPage"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        class="mb-6"
      >
        <div class="mb-6 border-gray-300">
          <heading-card
            :heading="`View : ${
              appealFilter === 'open'
                ? 'Open Appeals'
                : appealFilter === 'on_hold'
                ? 'On Hold Appeals'
                : appealFilter === 'approved'
                ? 'Approved Appeals'
                : 'Denied Appeals'
            }`"
            class="mt-4 mb-6"
          />
          <Loader :loading="loading" background="" height="30vh"></Loader>

          <div>
            <div
              v-if="appealedReviews?.length === 0 && !loading"
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No reviews Available
            </div>
          </div>
        </div>
      </Card>
    </div>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import Button from "@/Components/Ratings/Button.vue";
import axios from "axios";
import ReviewResponseAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ReviewResponseAdmin.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Card from "@/Components/Card.vue";
import Loader from "@/Components/Ratings/Loader.vue";

import { ref, onMounted, computed, onBeforeMount } from "vue";
import SearchInput from "@/Components/Ratings/SearchInput.vue";

import { somethingWentWrong } from "@/helpers/utilities";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import PageTitle from "@/Components/PageTitle.vue";

// State
const { region_id } = defineProps({
  profile: Object,
  region_id: [String, Number],
  region_name: [String, Number],
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
const appealedReviews = ref([]);
const loading = ref(false);
const sortByDate = ref("latest");
const sortByRating = ref("");
const perPage = ref(15);
const searchTerm = ref("");
const appealFilter = ref("open");
const pagination = ref(0);
const loadingNextPage = ref(false);

// Mounted
onMounted(async () => {
  loading.value = true;
  await fetchReviews();
  loading.value = false;
});
onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});

//Computed

const screenWidth = computed(() => store.getters.screenWidth);

//Watch

// Methods
const loadMoreReviews = async () => {
  loadingNextPage.value = true;
  let pageToLoad = currentPage.value + 1;
  await fetchReviews(perPage.value, pageToLoad);

  loadingNextPage.value = false;
  currentPage.value = pageToLoad;
};
const handleDate = async (selected, sortByString) => {
  if (selected) {
    sortByDate.value = sortByString;
  } else if (!selected) {
    sortByDate.value = "";
  }
  appealedReviews.value = [];
  await fetchAppealedReviews(false);
};
const handleRating = async (selected, sortByRate) => {
  if (selected) {
    sortByRating.value = sortByRate;
  } else if (!selected) {
    sortByRating.value = "";
  }
  appealedReviews.value = [];

  await fetchAppealedReviews(false);
};

// Fetch REviews
const fetchReviews = async (
  per_page = perPage.value,
  page = 1,
  append = true
) => {
  try {
    const response = await axios.get(
      `/api/admin/reviews/${region_id}/by-appeal-status?appeal_id=${searchTerm.value}&appeal_status=${appealFilter.value}&per_page=${per_page}&page=${page}&sort_by_date=${sortByDate.value}&sort_by_rating=${sortByRating.value}`,
      getAxiosConfig()
    );
    if (append) {
      appealedReviews.value = [
        ...appealedReviews.value,
        ...response.data.reviews,
      ];
    } else {
      appealedReviews.value = [...response.data.reviews];
    }
    pagination.value = response.data.pagination;
  } catch (err) {
    somethingWentWrong();
  }
};
const fetchAppealedReviews = async (append = true) => {
  loading.value = true;
  await fetchReviews(perPage.value, 1, append);
  loading.value = false;
};

const handleTabs = async (apiToCall) => {
  appealFilter.value = apiToCall;
  appealedReviews.value = [];
  await fetchAppealedReviews(false);
};

const onSearch = async (term) => {
  searchTerm.value = term;
  await fetchAppealedReviews(false);
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
