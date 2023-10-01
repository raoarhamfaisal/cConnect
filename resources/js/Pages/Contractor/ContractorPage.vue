<template>
  <Head title="Contractor Page" />

  <Header
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <ContractorLayout
      v-if="!loading"
      :profile="contractorProfile"
      :average_rating="average_rating"
      :starPercentages="starPercentages"
      :mode="mode"
      :total_reviews="total_reviews"
      :region_name="region_name"
    />
    <Loader :loading="loading" background="transparent" height="70vh"></Loader>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import ContractorLayout from "@/Components/ContractorPage/ContractorLayout.vue";
import { onMounted, ref } from "vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";

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
const starPercentages = ref([]);
const average_rating = ref(null);
const contractorProfile = ref({});
const mode = ref("edit");

onMounted(() => {
  fetchContractorDetails();
});
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
