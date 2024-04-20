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
import Loader from "@/Components/Ratings/Loader.vue";
import TableHead from "@/Pages/RedFlag/partials/TableHead.vue";
import RedFlag from "@/Pages/RedFlag/partials/RedFlag.vue";

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
const isSearchByCustomer = ref(true);
const atButtonClickSearchTerm = ref("");
const region_id = ref("");
const redFlags = ref([
  {
    id: 1,
    flagAddedBy: {
      name: "John Doe",
      city: "Dallasman",
      state: "Texas",
    },

    customerName: "George SuperIdolSmithy",
    complaintSummary:
      "I thought they did sub-par work work.  asked told her that I need to file a lien on the house. Lien is filed but she still hasn't paid. asked told her that I need to file a lien on the house. Lien is filed but she still hasn't paid.",
    region: "1001 Dallas Ft Worth",
    dateReported: "12/30/23",
    isCustomer: true,
  },
  {
    id: 2,
    flagAddedBy: {
      name: "John Doe",
      city: "Dallasman",
      state: "Texas",
    },

    customerName: "Rosealina Smithwhateverlast",
    complaintSummary:
      "Never paid the final insurance check. She told me that her insurance adjuster said that was her money so she took her family on a cruise. I asked told her that I need to file a lien on the house. Lien is filed but she still hasn't paid. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus reprehenderit sit quaerat, veritatis facilis sapiente ab? Culpa deleniti voluptatibus ea nisi quibusdam eligendi, beatae, magnam reiciendis, sed omnis vel. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus reprehenderit sit quaerat, veritatis facilis sapiente ab? Culpa deleniti voluptatibus ea nisi quibusdam eligendi, beatae, magnam reiciendis, sed omnis vel. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus reprehenderit sit quaerat, veritatis facilis sapiente ab? Culpa deleniti voluptatibus ea nisi quibusdam eligendi, beatae, magnam reiciendis, sed omnis vel.",
    region: "1001 Dallas Ft Worth",
    dateReported: "12/30/23",
    isCustomer: true,
  },
  {
    id: 3,
    flagAddedBy: {
      name: "John Doe",
      city: "Dallasman",
      state: "Texas",
    },

    customerName: "George SuperIdolSmithy",
    complaintSummary:
      "I thought they did sub-par work work.  asked told her that I need to file a lien on the house. Lien is filed but she still hasn't paid. asked told her that I need to file a lien on the house. Lien is filed but she still hasn't paid.",
    region: "1001 Dallas Ft Worth",
    dateReported: "12/30/23",
    isCustomer: true,
  },
  {
    id: 4,
    flagAddedBy: {
      name: "John Doe",
      city: "Dallasman",
      state: "Texas",
    },

    customerName: "Rosealina Smithwhateverlast",
    complaintSummary:
      "Never paid the final insurance check. She told me that her insurance adjuster said that was her money so she took her family on a cruise. I asked told her that I need to file a lien on the house. Lien is filed but she still hasn't paid. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus reprehenderit sit quaerat, veritatis facilis sapiente ab? Culpa deleniti voluptatibus ea nisi quibusdam eligendi, beatae, magnam reiciendis, sed omnis vel. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus reprehenderit sit quaerat, veritatis facilis sapiente ab? Culpa deleniti voluptatibus ea nisi quibusdam eligendi, beatae, magnam reiciendis, sed omnis vel. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus reprehenderit sit quaerat, veritatis facilis sapiente ab? Culpa deleniti voluptatibus ea nisi quibusdam eligendi, beatae, magnam reiciendis, sed omnis vel.",
    region: "1001 Dallas Ft Worth",
    dateReported: "12/30/23",
    isCustomer: true,
  },
  {
    id: 5,
    flagAddedBy: {
      name: "John Doe",
      city: "Dallasman",
      state: "Texas",
    },

    customerName: "George SuperIdolSmithy",
    complaintSummary:
      "I thought they did sub-par work work.  asked told her that I need to file a lien on the house. Lien is filed but she still hasn't paid. asked told her that I need to file a lien on the house. Lien is filed but she still hasn't paid.",
    region: "1001 Dallas Ft Worth",
    dateReported: "12/30/23",
    isCustomer: true,
  },
  {
    id: 6,
    flagAddedBy: {
      name: "John Doe",
      city: "Dallasman",
      state: "Texas",
    },

    customerName: "Rosealina Smithwhateverlast",
    complaintSummary:
      "Never paid the final insurance check. She told me that her insurance adjuster said that was her money so she took her family on a cruise. I asked told her that I need to file a lien on the house. Lien is filed but she still hasn't paid. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus reprehenderit sit quaerat, veritatis facilis sapiente ab? Culpa deleniti voluptatibus ea nisi quibusdam eligendi, beatae, magnam reiciendis, sed omnis vel. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus reprehenderit sit quaerat, veritatis facilis sapiente ab? Culpa deleniti voluptatibus ea nisi quibusdam eligendi, beatae, magnam reiciendis, sed omnis vel. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus reprehenderit sit quaerat, veritatis facilis sapiente ab? Culpa deleniti voluptatibus ea nisi quibusdam eligendi, beatae, magnam reiciendis, sed omnis vel.",
    region: "1001 Dallas Ft Worth",
    dateReported: "12/30/23",
    isCustomer: true,
  },
]);

const referenceList = props.regions.map((item) => item.name);
const selectedObj = props.regions.find((item) => {
  return item.id === (props.profile && props.profile.region_id);
});
region_id.value = selectedObj ? selectedObj.id : undefined;
const selectedName = selectedObj ? selectedObj.name : undefined;
const selectedReferal = ref(selectedName ?? "");

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

//Mounted
onMounted(async () => {
  localStorage.setItem("prevUrl", "/sub-finder");
});

// watch

//
watch(redFlags, (newVal) => {
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
  atButtonClickSearchTerm.value = searchTerm.value;
  basedOnSearch.value = true;
  if (screenWidth.value < 640) {
    showAdvanceFiltersButton.value = true;
    showAdvanceFilters.value = false;
  }
  fetchSearchedContractorsWithLoading();
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
        `/api/sub-finder/find-contractors?region_id=${region_id.value}&per_page=${per_page}&page=${page}&search_term=${searchTerm.value}&sort_by=high_rated&preference_status=&trade_id=`,
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

const openAccordions = ref([]);

const handleAccordionToggle = ({ index, isOpen }) => {
  if (isOpen) {
    openAccordions.value.push(index);
  } else {
    openAccordions.value = openAccordions.value.filter((i) => i !== index);
  }
};

const determineBorderVisibility = (index) => {
  // Check if the current accordion is open and the next one is not
  const isCurrentOpen = openAccordions.value.includes(index);
  const isNextOpen = openAccordions.value.includes(index + 1);
  return isCurrentOpen && !isNextOpen;
};
</script>

<template>
  <Head title="Red Flags" />

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
      <div class="flex relative gap-4 mb-4 sm:mb-8 items-center">
        <Link href="/post">
          <Icon class="w-7 h-7" icon="icomoon-free:arrow-left" color="black" />
        </Link>
        <div
          class="flex sm:absolute sm:transform sm:-translate-x-1/2 sm:left-1/2 items-center gap-2"
        >
          <img src="/images/icons/redflag.png" width="30" height="30" />
          <div class="font-extrabold text-2xl text-[#021d91] leading-tight">
            Red Flags
          </div>
        </div>
      </div>
      <div class="w-full sm:grid sm:grid-cols-2 sm:gap-4">
        <!-- serach with buttons -->
        <div class="flex flex-col gap-1">
          <!-- search -->
          <div
            class="relative mb-2 flex w-full flex-wrap items-stretch transition duration-300 ease-in-out focus-within:border-sky-500 focus-within:ring-sky-500 focus-within:ring-1 focus-within:rounded"
          >
            <input
              type="text"
              id="search"
              v-model="searchTerm"
              @keypress.prevent.enter="submitSearchTerm"
              class="relative m-0 flex-grow block w-full h-[45px] px-3 py-1.5 text-base font-normal text-gray-700 outline-none rounded-md border-solid border-gray-600 placeholder:italic placeholder:text-slate-500 pr-12"
              placeholder="Search Name..."
            />
          </div>
          <!-- buttons -->
          <div class="flex gap-2">
            <button
              type="button"
              class="w-4/5 px-1 py-1 h-[48px] rounded-lg transition transform duration-300 hover:shadow-lg active:scale-95 font-extrabold bg-[#e80000] text-white text-md sm:text-xl font-sans"
            >
              Add New Red Flag
            </button>
            <button
              type="button"
              class="w-1/5 px-1 py-1 h-[48px] rounded-lg transition transform duration-300 hover:shadow-lg active:scale-95 font-extrabold bg-[#8a0000] text-white text-sm leading-5 font-sans"
            >
              My Red Flags
            </button>
          </div>
        </div>
        <!-- search by  and region-->
        <div class="flex flex-col gap-1">
          <!-- search by -->

          <div class="w-full">
            <div class="mb-2 max-sm:mt-2">
              <InputLabel class="font-bold text-base mb-2" value="Search By:" />
              <div class="w-full flex flex-col gap-1 ml-3">
                <div class="flex gap-2 items-center h-8">
                  <v-checkbox
                    v-model="isSearchByCustomer"
                    color="error"
                    id="isSearchByCustomer"
                    :value="true"
                    style="font-size: 1.5rem"
                    hide-details
                  >
                  </v-checkbox>
                  <div
                    for="isSearchByCustomer"
                    @click="isSearchByCustomer = true"
                    class="w-full cursor-pointer text-sm sm:text-xl translate-y-[0px]"
                  >
                    Customer
                  </div>
                </div>
                <div class="flex gap-2 items-center h-8">
                  <v-checkbox
                    v-model="isSearchByCustomer"
                    color="error"
                    id="notSearchByCustomer"
                    style="font-size: 1.5rem"
                    :value="false"
                    hide-details
                  >
                  </v-checkbox>
                  <div
                    for="notSearchByCustomer"
                    @click="isSearchByCustomer = false"
                    class="w-full cursor-pointer text-sm sm:text-xl translate-y-[0px]"
                  >
                    Contractor(non-member)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- seelct region -->
          <div class="w-full">
            <div class="mb-4 sm:mb-0">
              <InputLabel
                class="font-bold text-base mb-1"
                value="Select Region:"
              />
              <SelectProfile
                class="bg-white rounded"
                :options="referenceList"
                :modelValue="selectedReferal"
                @update:modelValue="changeReferal"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-3 sm:mt-6"
        v-if="atButtonClickSearchTerm && atButtonClickSearchTerm !== 'true'"
      >
        <div class="font-extrabold text-2xl leading-tight">
          Showing results for term
          <span class="text-[#021d91]">"{{ atButtonClickSearchTerm }}"</span>
        </div>
      </div>
      <!-- v-if="!loading && atButtonClickSearchTerm" -->
      <div class="mt-4">
        <div class="bg-white border-2 border-black table-container">
          <TableHead />

          <template v-if="!loading && redFlags && redFlags.length > 0">
            <RedFlag
              v-for="(redFlag, index) in redFlags"
              :key="redFlag.id"
              :redFlag="redFlag"
              :index="index"
              @accordion-toggled="handleAccordionToggle"
              :shouldShowBorder="determineBorderVisibility(index)"
            />
          </template>
          <!-- searching -->
          <div
            v-if="loading && atButtonClickSearchTerm"
            class="h-full h-[30vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
          >
            <div class="text-center text-xl">Searching...</div>
            <v-progress-linear
              color="#241e6d"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </div>
          <div class="" v-if="redFlags && redFlags.length === 0">
            <div
              class="p-2 text-xl text-grey-600 font-bold h-72 flex items-center justify-center"
            >
              Nothing Found
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
            No More Red Flags to Load
          </div>
          <Loader
            classes="flex gap-2"
            :loading="loadingNextPage"
            circleClasses="small-circle"
            textClasses="small-text"
            background=""
            height="70px"
          ></Loader>
          <!-- <SubFinderContractor
            v-for="contractor in redFlags"
            :key="contractor.id"
            :contractor="contractor"
            :region_name="selectedName"
          /> -->
        </div>
      </div>
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
