<template>
  <Head title="Contractor Page" />

  <Header
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div
      class="pt-8 sm:pt-8"
      :style="{
        backgroundColor:
          mode === '' && selectedColorScheme[0]
            ? selectedColorScheme[0]
            : '#e5e7eb',
      }"
      v-if="!loading"
    >
      <ContractorLayout
        :profile="contractorProfile"
        @change-mode="changeMode"
        :mode="mode"
        :average_rating="average_rating"
        :starPercentages="starPercentages"
        :total_reviews="total_reviews"
        :region_name="region_name"
      />
    </div>
    <Loader :loading="loading" background="transparent" height="70vh"></Loader>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import ContractorLayout from "@/Components/ContractorPage/ContractorLayout.vue";
import { onMounted, computed, ref } from "vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";

import { template1Default } from "@/helpers/templateDefaults";

import { useStore } from "vuex";

// State
const { profile } = defineProps({
  profile: Object,
  region_name: String,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
const loading = ref(false);
const store = useStore();
const mode = ref("edit");
const starPercentages = ref([]);
const average_rating = ref(null);
const contractorProfile = ref({});
const total_reviews = ref(0);

const changeMode = () => {
  mode.value = mode.value === "edit" ? "" : "edit";
  // fetchContractorDetails();
};

onMounted(() => {
  fetchContractorDetails();
});

//Computed
const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme?.colors || template1Default
);

const fetchContractorDetails = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `/api/contractor/get-contractor-info/${profile.user_id}`,
      getAxiosConfig()
    );
    if (response.data) {
      contractorProfile.value = response.data.contractorProfile;
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
</script>
<!-- :href="`/contractor/${profile.id}`" -->
