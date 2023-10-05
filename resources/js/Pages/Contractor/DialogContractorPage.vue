<template>
  <CustomContractorPageDialog
    ref="dialogRef"
    :showFooter="false"
    dialogWidth="width-75"
    title="Contractor Page"
    contentClasses="bg-gray-200 pt-6"
  >
    <ContractorLayout
      v-if="!loading"
      :profile="contractorProfile"
      :average_rating="average_rating"
      :starPercentages="starPercentages"
      :total_reviews="total_reviews"
      :region_name="region_name"
    />
    <Loader :loading="loading" background="transparent" height="70vh"></Loader>
  </CustomContractorPageDialog>
</template>

<script setup>
import Loader from "@/Components/Ratings/Loader.vue";
import CustomContractorPageDialog from "@/Pages/Contractor/CustomContractorPageDialog.vue";
import ContractorLayout from "@/Components/ContractorPage/ContractorLayout.vue";
import { ref } from "vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";

// State
const { profile } = defineProps({
  profile: Object,
});
const loading = ref(false);
const dialogRef = ref();
const starPercentages = ref([]);
const average_rating = ref(null);
const contractorProfile = ref({});
const region_name = ref("");
const total_reviews = ref(0);

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
      region_name.value = response.data.region_name;
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

// Expose
const openDialog = () => {
  dialogRef.value.openDialog();
  fetchContractorDetails();
};
defineExpose({ openDialog });
</script>
