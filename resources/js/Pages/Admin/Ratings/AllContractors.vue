<template>
  <Head title="All Contractors" />

  <Header
    v-if="isAdminUrl"
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div class="bg-gray-200 mt-1">
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <PageTitle
          :linkUrl="`/admin/regions/contractors`"
          pageTitle="All Contractors"
        />

        <SearchInput
          class="mb-8"
          :barWidth="screenWidth < 640 ? 50 : 35"
          icon="iconamoon:search"
          @search-clicked="onSearch"
        />

        <div class="mb-6">
          <div class="flex gap-3">
            <button
              class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2"
              :class="{ selected: !isReviewers }"
              :disabled="disabled"
              @click="handleTabs(false)"
            >
              <div class="flex items-center justify-center">Contractors</div>
            </button>
            <button
              class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2"
              :disabled="disabled"
              :class="{ selected: isReviewers }"
              @click="handleTabs(true)"
            >
              <div class="flex items-center justify-center">Reviewers</div>
            </button>
          </div>
        </div>

        <div
          class="flex flex-col"
          v-if="allContractors && !loading && allContractors.length > 0"
        >
          <Link
            v-for="(contractor, index) in allContractors"
            :key="index"
            :href="`/admin/regions/${region_id}/contractors/${contractor.id}${
              isReviewers ? '/reviews' : ''
            }`"
            class="hover:bg-[#f8f9fa] hover:rounded"
          >
            <contractor
              class="border-b-2 py-2 border-gray-200 cursor-pointer"
              :contractor="contractor"
            />
            <v-lazy
              :min-height="5"
              :options="{ threshold: 0.5 }"
              v-if="
                +currentPage !== +pagination.last_page &&
                index === allContractors.length - 1
              "
              @update:model-value="loadMoreContractors"
              transition="fade-transition"
            ></v-lazy>
          </Link>
          <div
            v-if="
              currentPage > 1 &&
              !loading &&
              !loadingNextPage &&
              +currentPage === +pagination.last_page
            "
            class="text-center font-bold mt-4"
          >
            No More Contractors to Load
          </div>
          <Loader
            classes="flex gap-2 mt-4"
            :loading="loadingNextPage"
            circleClasses="small-circle"
            textClasses="small-text"
            background=""
            height="70px"
          ></Loader>
        </div>
        <div v-if="allContractors.length === 0 && !loading">
          <div
            class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
          >
            No Contractors Available
          </div>
        </div>

        <Loader
          :loading="loading && !loadingNextPage"
          background="white"
          height="60vh"
        ></Loader>
      </Card>
    </div>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import Loader from "@/Components/Ratings/Loader.vue";
import Card from "@/Components/Card.vue";
import { Link } from "@inertiajs/inertia-vue3";
import Contractor from "./partials/AllContractors/Contractor.vue";
import { computed, ref, onMounted, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import SearchInput from "@/Components/Ratings/SearchInput.vue";
import PageTitle from "@/Components/PageTitle.vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
// States
const { region_id } = defineProps({
  profile: Object,
  region_id: [String, Number],
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
const isAdminUrl = usePage().props.value.auth.user.appeals_privileges === 1;
const store = useStore();
const currentPage = ref(1);
const perPage = ref(10);
const disabled = ref(false);
const searchTerm = ref("");
const isReviewers = ref(false);
const loadingNextPage = ref(false);
const loading = ref(false);
const pagination = ref({});
const allContractors = ref([]);

//Computed

const screenWidth = computed(() => store.getters.screenWidth);
//on Mounted
onMounted(async () => {
  loading.value = true;
  await fetchContractors();
  loading.value = false;
});

onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});
//Methods
const loadMoreContractors = async () => {
  console.log("Loading more");
  loadingNextPage.value = true;
  let pageToLoad = currentPage.value + 1;
  await fetchContractors(pageToLoad);

  loadingNextPage.value = false;
  currentPage.value = pageToLoad;
};
const fetchContractors = async (page = 1, append = true) => {
  try {
    const response = await axios.get(
      `/api/admin/${region_id}/search-contractor?search=${searchTerm.value}&per_page=${perPage.value}&page=${page}`,
      getAxiosConfig()
    );
    if (response.data) {
      if (append) {
        allContractors.value = [
          ...allContractors.value, // Accessing allContractors from the state
          ...response.data.profiles,
        ];
      } else {
        allContractors.value = [...response.data.profiles];
      }
      pagination.value = response.data.pagination;
    }
  } catch (err) {
    somethingWentWrong();
  }
};

const onSearch = async (term) => {
  searchTerm.value = term;
  currentPage.value = 1;
  loading.value = true;

  await fetchContractors(1, false);
  loading.value = false;
};

const handleTabs = (isReviewer) => {
  isReviewers.value = isReviewer;

  store.commit("ratings/setLoading", true);
  setTimeout(() => {
    store.commit("ratings/setLoading", false);
  }, 200);
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
