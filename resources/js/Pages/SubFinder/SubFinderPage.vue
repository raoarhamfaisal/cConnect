<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import MoveToTop from "@/Components/MoveToTop.vue";

import { computed, nextTick, onMounted, ref, watch } from "vue";
import SelectProfile from "@/Components/SelectProfile.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import { subFinderOptions as options } from "@/helpers/selectListsHelpters";
import Loader from "@/Components/Ratings/Loader.vue";
import SubFinderContractor from "@/Pages/SubFinder/partials/SubFinderContractor.vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";

const props = defineProps({
  profile: Object,
  showit: Boolean,
  regions: Array,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
// const optionsList = options.unshift({
//   id: "trade",
//   name: "All",
// });
const searchTerm = ref("");
const isFocused = ref(false);
const atButtonClickSearchTerm = ref("");
const region_id = ref("");
const foundContractors = ref([]);

const referenceList = props.regions.map((item) => item.name);
const tradesList = options.map((item) => item.name);
const selectedObj = props.regions.find((item) => {
  return item.id === (props.profile && props.profile.region_id);
});
region_id.value = selectedObj ? selectedObj.id : undefined;
const selectedName = selectedObj ? selectedObj.name : undefined;
const selectedReferal = ref(selectedName ?? "");
const trade_id = ref("");

// selecting first trade
const tradeKeys = Object.keys(props.profile).filter(
  (key) => props.profile[key] === 1 && key.startsWith("trade")
);
// 2. Match these keys with tradesList and return the index
let userFirstTrade;
options.forEach((item) => {
  if (item.id === tradeKeys[0]) {
    userFirstTrade = item.name;
    trade_id.value = item.id;
    trade_id.value = trade_id.value.replace(/^trade/, "");
  }
});
const selectedTrade = ref(userFirstTrade);
const loading = ref(false);
const currentPage = ref(1);
const pagination = ref(0);
const perPage = ref(15);
const loadingNextPage = ref(false);
const loadMoreIntersect = ref();
const basedOnSearch = ref(false);
const showAdvanceFiltersButton = ref(false);
const showAdvanceFilters = ref(true);

const store = useStore();

//Computed
const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);
const userVersion = computed(() => store.getters.userVersion);
const userDetails = computed(() => store.getters.userDetails);

//Mounted
onMounted(async () => {
  localStorage.setItem("prevUrl", "/sub-finder");
});

// watch

//
watch(foundContractors, (newVal) => {
  if (newVal.length > 0) {
    setTimeout(() => {
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreContractors();
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
      });

      observer.observe(loadMoreIntersect.value);
    }, 300);
  }
});

//Methods

const handleSelect = async () => {
  showAdvanceFilters.value = !showAdvanceFilters.value;
};

const submitSearchTerm = () => {
  if (searchCounterNotZero()) {
    atButtonClickSearchTerm.value = searchTerm.value;
    basedOnSearch.value = true;
    if (screenWidth.value < 640) {
      showAdvanceFiltersButton.value = true;
      showAdvanceFilters.value = false;
    }
    fetchSearchedContractorsWithLoading();
  }
};
const changeReferal = (value) => {
  selectedReferal.value = value;
  console.log("changeREfereatl");
  props.regions.forEach((item) => {
    if (value === item.name) {
      region_id.value = item.id.toString();
    }
  });
};
const changeTrade = (value) => {
  selectedTrade.value = value;
  options.forEach((item) => {
    if (item.name === selectedTrade.value) {
      trade_id.value = item.id;

      trade_id.value = trade_id.value.replace(/^trade/, "");
    }
  });
  console.log(tradeKeys[0], "tradeKeys[0]", trade_id.value);
};
const onFindASub = () => {
  if (searchCounterNotZero()) {
    atButtonClickSearchTerm.value = "true";
    if (screenWidth.value < 640) {
      showAdvanceFiltersButton.value = true;
      showAdvanceFilters.value = false;
    }
    basedOnSearch.value = false;
    fetchSearchedContractorsWithLoading();
  }
};

// Display contractor logic

// const buttonData = [
//   { value: "", label: "All" },
//   { value: "Preferred", label: "Preferred" },
//   { value: "Back-Up", label: "Back-Up" },
//   { value: "Possible", label: "Possible" },
//   { value: "Rejected", label: "Rejected" },
// ];

const buttonData = computed(() => [
  { value: "", label: translations.value && translations.value.all },
  {
    value: "Preferred",
    label: translations.value && translations.value.preferred,
  },
  { value: "Back-Up", label: translations.value && translations.value.back_up },
  {
    value: "Possible",
    label: translations.value && translations.value.possible,
  },
  {
    value: "Rejected",
    label: translations.value && translations.value.back_up,
  },
]);

const preference_status = ref(""); // Use the value from buttonData as default

const selectButton = (value) => {
  if (searchCounterNotZero()) {
    preference_status.value = value;
  }
};

const buttonClass = (value) => [
  "w-28",
  "py-2",
  "bg-white",
  "transition",
  "transform",
  "duration-300",
  "hover:shadow-lg",
  "active:scale-95",
  "border-2",
  "border-gray-700",
  "font-medium",
  "rounded",
  "sm:text-lg",
  "text-base",
  value === preference_status.value ? "bg-indigo-800 text-white" : "",
];

// Define the button data for sort options
// const sortButtonData = [
//   { value: "high_rated", label: "High Rated" },
//   { value: "low_rated", label: "Low Rated" },
//   { value: "newly_registered", label: "Newly Registered" },
//   { value: "oldest_registered", label: "Oldest Registered" },
// ];

const sortButtonData = computed(() => [
  {
    value: "high_rated",
    label: translations.value && translations.value.high_rated,
  },
  {
    value: "low_rated",
    label: translations.value && translations.value.low_rated,
  },
  {
    value: "newly_registered",
    label: translations.value && translations.value.newly_registered,
  },
  {
    value: "oldest_registered",
    label: translations.value && translations.value.oldest_registered,
  },
]);

const selectedSort = ref("high_rated"); // Default selected value

const selectSort = (value) => {
  if (searchCounterNotZero()) {
    selectedSort.value = value;
  }
};

const sortButtonClass = (value) => [
  "px-4",
  "py-2",
  "bg-white",
  "transition",
  "transform",
  "duration-300",
  "hover:shadow-lg",
  "active:scale-95",
  "border-2",
  "border-gray-700",
  "font-medium",
  "rounded",
  "sm:text-lg",
  "text-base",
  value === selectedSort.value ? "bg-indigo-800 text-white" : "",
];

// apis

const loadMoreContractors = async () => {
  loadingNextPage.value = true;
  currentPage.value = currentPage.value + 1;
  await fetchSearchedContractors(perPage.value, currentPage.value, true);
  loadingNextPage.value = false;
};

// Fetch REviews
const fetchSearchedContractors = async (
  per_page = perPage.value,
  page = 1,
  append = false
) => {
  let response;
  try {
    if (basedOnSearch.value) {
      response = await axios.get(
        `/api/sub-finder/find-contractors?region_id=${region_id.value}&per_page=${per_page}&page=${page}&search_term=${searchTerm.value}&sort_by=high_rated&preference_status=&trade_id=${trade_id.value}`,
        getAxiosConfig()
      );
    } else {
      response = await axios.get(
        `/api/sub-finder/find-contractors?region_id=${region_id.value}&per_page=${per_page}&page=${page}&search_term=&sort_by=${selectedSort.value}&preference_status=${preference_status.value}&trade_id=${trade_id.value}`,
        getAxiosConfig()
      );
    }
    if (append) {
      foundContractors.value = [
        ...foundContractors.value,
        ...response.data.contractors,
      ];
    } else {
      foundContractors.value = [...response.data.contractors];
    }
    pagination.value = response.data.pagination;
    store.dispatch("fetchUserDetails");

    // Extracting the star counts
  } catch (err) {
    somethingWentWrong();
  }
};

const fetchSearchedContractorsWithLoading = async () => {
  loading.value = true;
  await fetchSearchedContractors();
  loading.value = false;
};

const searchCounterNotZero = () => {
  let isValid = true;
  if (userDetails.value.sf_search === 0) {
    if (userVersion.value === 1) {
      opneUpgradeToGoldPlatinumDialog();
      isValid = false;
    }
  }
  return isValid;
};

const opneUpgradeToGoldPlatinumDialog = () => {
  store.commit("setIsUpgradeToGoldPlatinumDialogOpen", true);
};
</script>

<template>
  <Head :title="translations && translations.sub_finder" />

  <Header
    shouldFetchUserDetails
    :profile="profile"
    :show-post-buttons="false"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    color="#f9fafb"
  >
    <!-- color="#edecea" -->
    <div class="mt-4 sm:mt-4 p-2 sm:p-4">
      <!-- back page -->
      <div class="flex relative gap-4 mb-8 items-center">
        <Link href="/post">
          <Icon class="w-7 h-7" icon="icomoon-free:arrow-left" color="black" />
        </Link>
        <div
          class="flex sm:absolute sm:transform sm:-translate-x-1/2 sm:left-1/2 items-center gap-2"
        >
          <img src="/images/icons/contractor.png" width="30" height="30" />
          <div class="font-extrabold text-2xl text-[#021d91] leading-tight">
            {{ translations && translations.sub_finder }}
          </div>
        </div>
      </div>
      <!-- search -->
      <div class="w-full sm:grid sm:grid-cols-2 sm:gap-4">
        <div class="">
          <label class="block font-bold text-base text-gray-700" for="search"
            >{{ translations && translations.search }}:</label
          >
          <div
            class="relative mb-2 flex w-full flex-wrap items-stretch transition duration-300 ease-in-out focus-within:border-sky-500 focus-within:ring-sky-500 focus-within:ring-1 focus-within:rounded"
          >
            <input
              type="text"
              id="search"
              v-model="searchTerm"
              @keypress.prevent.enter="submitSearchTerm"
              class="relative m-0 flex-grow block w-full h-[42px] px-3 py-1.5 text-base font-normal text-gray-700 outline-none rounded-md border-solid border-gray-600 placeholder:italic placeholder:text-slate-500 pr-12"
              :placeholder="translations && translations.search_contractor"
            />

            <button
              @click="submitSearchTerm"
              class="absolute right-0 top-0 h-[42px] z-[2] flex items-center px-3 py-1.5 text-xs font-medium uppercase leading-tight rounded-r-md border-l border-solid border-gray-600 text-white bg-blue-600 transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-7 w-7"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
              <div
                v-if="
                  userDetails.sf_search !== 99 &&
                  userVersion === 1 &&
                  userDetails &&
                  Object.keys(userDetails).length > 0
                "
                class="flex justify-center xs:ml-[2px] items-center px-2 py-[6px] text-[10px] xs:text-[12px] rounded-full bg-gray-600 text-white leading-[1] font-bold"
              >
                {{ userDetails.sf_search }}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="!showAdvanceFiltersButton"
        class="my-4 border-2 border-gray-400 rounded"
      ></div>

      <button
        class="advance-filter-button rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm bg-white w-full text-base text-left rounded-lg"
        :class="{ selected: showAdvanceFilters }"
        v-if="showAdvanceFiltersButton && screenWidth < 640"
        @click="handleSelect"
        :style="{
          boxShadow:
            '0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
        }"
      >
        {{ translations && translations.advance_filters }}
      </button>
      <transition name="accordion">
        <div v-if="showAdvanceFilters" class="mt-2">
          <!-- seelct region -->
          <div class="w-full sm:grid sm:grid-cols-2 sm:gap-4">
            <div class="mb-4 sm:mb-0">
              <InputLabel
                class="font-bold text-base"
                :value="translations && translations.select_region"
              />
              <SelectProfile
                class="bg-white rounded"
                :options="referenceList"
                :modelValue="selectedReferal"
                @update:modelValue="changeReferal"
              />
            </div>

            <!-- select trade -->
            <div class="mb-4 sm:mb-0">
              <InputLabel
                class="font-bold text-base"
                :value="translations && translations.select_trade"
              />
              <SelectProfile
                class="bg-white rounded"
                :options="tradesList"
                :modelValue="selectedTrade"
                @update:modelValue="changeTrade"
              />
            </div>
          </div>
          <!-- Display Contractors  -->
          <div class="mt-4">
            <InputLabel
              class="font-bold text-base"
              :value="translations && translations.display_contractor"
            />
            <div
              class="flex mt-2 gap-2 flex-wrap justify-center sm:justify-start"
            >
              <button
                v-for="btn in buttonData"
                :key="btn.value"
                @click="selectButton(btn.value)"
                :class="buttonClass(btn.value)"
              >
                {{ btn.label }}
              </button>
            </div>
          </div>
          <!-- Sort Contractors BY -->
          <div class="mt-4">
            <InputLabel
              class="font-bold text-base"
              :value="translations && translations.sort_contractors_by"
            />
            <div
              class="flex mt-2 gap-2 flex-wrap justify-center sm:justify-start"
            >
              <button
                v-for="btn in sortButtonData"
                :key="btn.value"
                @click="selectSort(btn.value)"
                :class="sortButtonClass(btn.value)"
              >
                {{ btn.label }}
              </button>
            </div>
          </div>

          <!-- Find A Sub -->
          <button
            @click="onFindASub"
            class="border-2 mt-5 w-full sm:w-auto flex items-center justify-center border-2 border-teal-green bg-teal-green text-white font-semibold text-xl py-2 px-4 rounded transition transform duration-300 hover:shadow-lg active:scale-95"
          >
            {{ translations && translations.find_a_sub }}
            <div
              v-if="
                userDetails.sf_search !== 99 &&
                userVersion === 1 &&
                userDetails &&
                Object.keys(userDetails).length > 0
              "
              class="flex justify-center ml-2 items-center px-[8px] py-[5px] text-[12px] xs:text-[14px] rounded-full bg-white text-black leading-[0.95] font-bold"
            >
              {{ userDetails.sf_search }}
            </div>
          </button>
        </div>
      </transition>

      <div
        class="mt-3 sm:mt-6"
        v-if="atButtonClickSearchTerm && atButtonClickSearchTerm !== 'true'"
      >
        <div class="font-extrabold text-2xl leading-tight">
          {{ translations && translations.showing_results_for_term }}
          <span class="text-[#021d91]">"{{ atButtonClickSearchTerm }}"</span>
        </div>
      </div>
      <div class="mt-6" v-if="atButtonClickSearchTerm === 'true'">
        <div class="font-extrabold text-2xl leading-tight">
          {{
            translations &&
            translations.showing_contractors_based_on_your_selected_criteria
          }}
        </div>
      </div>
      <div class="mt-4" v-if="!loading && atButtonClickSearchTerm">
        <div
          v-if="foundContractors && foundContractors.length > 0"
          class="flex flex-col gap-2 sm:gap-4"
        >
          <SubFinderContractor
            v-for="contractor in foundContractors"
            :key="contractor.id"
            :contractor="contractor"
            :region_name="selectedName"
            @opneUpgradeToGoldPlatinumDialog="opneUpgradeToGoldPlatinumDialog"
          />
        </div>
        <div v-if="foundContractors && foundContractors.length === 0">
          <div
            class="p-2 text-xl text-grey-600 font-bold h-72 flex items-center justify-center"
          >
            {{ translations && translations.no_contractor_found }}
          </div>
        </div>

        <!-- lazy loading -->
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
          class="text-center my-5 font-bold"
        >
          {{ translations && translations.no_more_contractors_to_load }}
        </div>
        <Loader
          classes="flex gap-2"
          :loading="loadingNextPage"
          circleClasses="small-circle"
          textClasses="small-text"
          background=""
          height="70px"
        ></Loader>
      </div>
    </div>

    <div
      v-if="loading && atButtonClickSearchTerm"
      class="h-full h-[30vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
    >
      <div class="text-center text-xl">
        {{ translations && translations.searching }}...
      </div>
      <v-progress-linear
        color="#241e6d"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </div>
    <!-- search results -->
    <MoveToTop />
  </Header>
</template>

<style scoped>
.advance-filter-button {
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
}

.advance-filter-button.selected {
  background-color: #3a357c;
  color: #fff;
}
</style>
