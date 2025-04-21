<template>
  <Head
    :title="`${translations && translations.edit} ${
      translations && translations.contractor_page
    }
    `"
  />

  <Header
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div
      class="pt-1 sm:pt-8"
      v-if="
        !loading &&
        contractorProfile &&
        Object.keys(contractorProfile).length > 0 &&
        templateList &&
        templateList.length > 0 &&
        colorSchemeArray &&
        colorSchemeArray.length > 0
      "
    >
      <ContractorLayoutEdit
        :profile="contractorProfile"
        :templateList="templateList"
        :average_rating="average_rating"
        :starPercentages="starPercentages"
        :total_reviews="total_reviews"
        :region_name="region_name"
      />
    </div>
    <Loader
      :loading="
        loading ||
        (contractorProfile && Object.keys(contractorProfile).length === 0) ||
        (templateList && templateList.length === 0) ||
        (colorSchemeArray && colorSchemeArray.length === 0)
      "
      background="transparent"
      height="70vh"
    ></Loader>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import ContractorLayoutEdit from "@/Components/ContractorPage/ContractorLayoutEdit.vue";
import { onMounted, computed, ref, watchEffect } from "vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong, startOptionToArray } from "@/helpers/utilities";

import { useStore } from "vuex";
import { usePage } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";

// Province
const { profile, contractor_id } = defineProps({
  profile: Object,
  region_name: String,
  showit: Boolean,
  contractor_id: [String, Number],

  mode: String,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
const loading = ref(false);
const templateList = ref([]);

const store = useStore();
const firstTime = ref(true);
const starPercentages = ref([]);
const average_rating = ref(null);
const contractorProfile = ref({});
const total_reviews = ref(0);
const colorSchemeArray = ref([]);

const userVersion = computed(() => store.getters.userVersion);
const translations = computed(() => store.getters.translations);

onMounted(() => {
  localStorage.setItem("prevUrl", "/edit");
  fetchContractorDetails();
  const url = usePage().url.value;
  let extractedNumber;
  console.log(url, "url");

  const match = url.match(/\/contractor\/(\d+)\/edit/);

  if (match) {
    extractedNumber = parseInt(match[1], 10);
  }
  if (extractedNumber !== profile.user_id) {
    Inertia.visit(`/contractor/${profile.user_id}/edit`);
  }
});

//Computed
const fetchContractorDetails = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `/api/contractor/get-contractor-info/${contractor_id}`,
      getAxiosConfig()
    );
    if (response.data) {
      contractorProfile.value = response.data.contractorProfile;
      store.commit(
        "contractor/setSelectedTemplate",
        contractorProfile.value.template_id
      );

      average_rating.value = response.data.average_rating;

      total_reviews.value = response.data.total_reviews;
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
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
  }
};

const fetchColors = async () => {
  try {
    const responseColor = await axios.get(
      `/api/contractor/all-color-schemes`,
      getAxiosConfig()
    );
    if (responseColor.data) {
      const colorSchemes =
        userVersion.value === 1
          ? responseColor.data.allColorSchemes.slice(0, 1)
          : userVersion.value === 2
          ? responseColor.data.allColorSchemes.slice(0, 3)
          : responseColor.data.allColorSchemes;
      const colorSchemeList = [...colorSchemes];
      store.commit("contractor/setColorSchemeList", colorSchemeList);
      const selectedOption = colorSchemeList.find((item) => {
        return item.id === contractorProfile.value.color_scheme_id;
      });
      const selectedScheme = startOptionToArray(selectedOption);

      store.commit("contractor/setSelectedColorScheme", selectedScheme);
      colorSchemeArray.value = colorSchemeList;
    }
  } catch (err) {
    somethingWentWrong();
  }
};
const fetchTemplates = async () => {
  try {
    const response = await axios.get(
      `/api/contractor/all-templates`,
      getAxiosConfig()
    );
    if (response.data) {
      templateList.value =
        userVersion.value === 1
          ? response.data.allTemplates.slice(0, 1)
          : userVersion.value === 2
          ? response.data.allTemplates.slice(0, 3)
          : response.data.allTemplates;
    }
  } catch (err) {
    somethingWentWrong();
  }
};
//watchEffect
watchEffect(async () => {
  if (firstTime.value) {
    console.log("watchEffect");
    loading.value = true;

    await fetchTemplates();
    await fetchColors();
    loading.value = false;
    firstTime.value = false;
  }
});
</script>
<!-- :href="`/contractor/${profile.id}`" -->
