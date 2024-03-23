<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import MoveToTop from "@/Components/MoveToTop.vue";
import { ref } from "vue";
import SelectProfile from "@/Components/SelectProfile.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import { options } from "@/helpers/selectListsHelpters";
import SubFinderContractor from "@/Pages/SubFinder/partials/SubFinderContractor.vue";

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

const searchTerm = ref("");
const isFocused = ref(false);
const atButtonClickSearchTerm = ref("");
const region_id = ref("");
const foundContractors = ref([props.profile]);

const referenceList = props.regions.map((item) => item.name);
const tradesList = options.map((item) => item.name);
const selectedObj = props.regions.find(
  (item) => item.id === (props.profile && props.profile.region_id)
);
const selectedName = selectedObj ? selectedObj.name : undefined;

const selectedReferal = ref(selectedName ?? "");

// selecting first trade
const tradeKeys = Object.keys(props.profile).filter(
  (key) => props.profile[key] === 1 && key.startsWith("trade")
);

// 2. Match these keys with tradesList and return the index
let userFirstTrade;
options.forEach((item) => {
  if (item.id === tradeKeys[0]) {
    userFirstTrade = item.name;
  }
});

const selectedTrade = ref(userFirstTrade);

const store = useStore();

const submitSearchTerm = () => {
  atButtonClickSearchTerm.value = searchTerm.value;
  console.log("search term", searchTerm.value);
};
const changeReferal = (value) => {
  selectedReferal.value = value;
  props.regions.forEach((item) => {
    if (value === item.name) {
      region_id.value = item.id.toString();
    }
  });
};
const changeTrade = (value) => {
  selectedTrade.value = value;
};
const onFindASub = () => {};

// Display contractor logic

const buttonData = [
  { value: "all", label: "All" },
  { value: "preferred", label: "Preferred" },
  { value: "backup", label: "Back-Up" },
  { value: "possible", label: "Possible" },
  { value: "rejected", label: "Rejected" },
];

const selectedDisplayContractorButton = ref("all"); // Use the value from buttonData as default

const selectButton = (value) => {
  selectedDisplayContractorButton.value = value;
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
  value === selectedDisplayContractorButton.value
    ? "bg-indigo-800 text-white"
    : "",
];

// Define the button data for sort options
const sortButtonData = [
  { value: "highRated", label: "High Rated" },
  { value: "lowRated", label: "Low Rated" },
  { value: "newlyRegistered", label: "Newly Registered" },
  { value: "oldestRegistered", label: "Oldest Registered" },
];

const selectedSort = ref("newlyRegistered"); // Default selected value

const selectSort = (value) => {
  selectedSort.value = value;
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
</script>

<template>
  <Head title="Sub Finder" />

  <Header
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
            Sub Finder
          </div>
        </div>
      </div>
      <!-- search -->
      <div class="w-full sm:grid sm:grid-cols-2 sm:gap-4">
        <div class="">
          <label class="block font-bold text-base text-gray-700" for="search"
            >Search:</label
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
              placeholder="Search Contractor"
            />

            <button
              @click="submitSearchTerm"
              class="absolute right-0 top-0 h-[42px] z-10 flex items-center px-4 py-1.5 text-xs font-medium uppercase leading-tight rounded-r-md border-l border-solid border-gray-600 text-white bg-blue-600 transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-lg"
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
            </button>
          </div>
        </div>
      </div>
      <div class="my-4 border-2 border-gray-400 rounded"></div>

      <!-- seelct region -->
      <div class="w-full sm:grid sm:grid-cols-2 sm:gap-4">
        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold text-base" value="Select Region:" />
          <SelectProfile
            class="bg-white rounded"
            :options="referenceList"
            :modelValue="selectedReferal"
            @update:modelValue="changeReferal"
          />
        </div>

        <!-- select trade -->
        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold text-base" value="Select Trade:" />
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
        <InputLabel class="font-bold text-base" value="Display Contractor:" />
        <div class="flex mt-2 gap-2 flex-wrap justify-center sm:justify-start">
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
        <InputLabel class="font-bold text-base" value="Sort Contractors By:" />
        <div class="flex mt-2 gap-2 flex-wrap justify-center sm:justify-start">
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
        class="border-2 mt-5 w-full sm:w-40 flex items-center justify-center border-2 border-teal-green bg-teal-green text-white font-semibold text-xl py-2 px-4 rounded transition transform duration-300 hover:shadow-lg active:scale-95"
      >
        Find a Sub
      </button>
      <div class="mt-6" v-if="!atButtonClickSearchTerm">
        <div class="font-extrabold text-2xl leading-tight">
          Showing results for term
          <span class="text-[#021d91]">"{{ atButtonClickSearchTerm }}"</span>
        </div>
      </div>
      <SubFinderContractor
        v-for="contractor in foundContractors"
        :key="contractor.id"
        :contractor="contractor"
      />
    </div>
    <!-- search results -->
    <MoveToTop />
  </Header>
</template>
