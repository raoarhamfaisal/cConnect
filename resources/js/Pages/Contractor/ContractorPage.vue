<template>
  <Head title="Contractor Page" />

  <div
    class="pt-2 sm:pt-8 sm:pt-8 pb-8 max-w-[1280px] mx-auto"
    :style="{
      backgroundColor: selectedColorScheme[0]
        ? selectedColorScheme[0]
        : '#e5e7eb',
    }"
    v-if="!loading"
  >
    <ContractorLayout
      :profile="contractorProfile"
      :loggedInUserId="profile.user_id"
      :templateList="templateList"
      :average_rating="average_rating"
      :starPercentages="starPercentages"
      :total_reviews="total_reviews"
      :region_name="region_name"
    />
  </div>
  <Loader :loading="loading" background="transparent" height="70vh"></Loader>
</template>

<script setup>
import { Head } from "@inertiajs/inertia-vue3";

import Loader from "@/Components/Ratings/Loader.vue";
import ContractorLayout from "@/Components/ContractorPage/ContractorLayout.vue";
import { onMounted, computed, ref, watchEffect, watch } from "vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong, startOptionToArray } from "@/helpers/utilities";

import { template1Default } from "@/helpers/templateDefaults";

import { useStore } from "vuex";

// State
const { profile, contractor_id } = defineProps({
  profile: Object,
  contractor_id: [String, Number],

  region_name: String,
});
const loading = ref(false);
const templateList = ref([]);

const store = useStore();
const firstTime = ref(true);
const starPercentages = ref([]);
const average_rating = ref(null);
const contractorProfile = ref({});
const total_reviews = ref(0);

onMounted(() => {
  fetchContractorDetails();
});

//Computed
const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme || template1Default
);
const shouldLoad = computed(() => store.state.ratings.shouldFetchPostsOnClose);
watch(shouldLoad, async () => {
  if (shouldLoad) {
    try {
      const response = await axios.get(
        `/api/contractor/get-contractor-info/${contractor_id}`,
        getAxiosConfig()
      );
      if (response.data) {
        average_rating.value = response.data.average_rating;

        total_reviews.value = response.data.total_reviews;
      }
    } catch (err) {
      somethingWentWrong();
    }
  }
});

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
      const colorSchemeList = [...responseColor.data.allColorSchemes];
      store.commit("contractor/setColorSchemeList", colorSchemeList);
      const selectedOption = colorSchemeList.find((item) => {
        return item.id === contractorProfile.value.color_scheme_id;
      });
      const selectedScheme = startOptionToArray(selectedOption);
      console.log(selectedScheme, selectedOption, "optionSelected");
      store.commit("contractor/setSelectedColorScheme", selectedScheme);
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
      templateList.value = response.data.allTemplates;
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
