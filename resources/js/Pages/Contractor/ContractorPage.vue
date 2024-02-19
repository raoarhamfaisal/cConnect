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
      :profile="profile"
      :average_rating="average_rating"
      :starPercentages="starPercentages"
      :total_reviews="total_reviews"
      :region_name="region_name"
    />
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import ContractorLayout from "@/Components/ContractorPage/ContractorLayout.vue";
import { ref, watchEffect } from "vue";

// State
const {
  contractorDetails,
  five_stars_count,
  four_stars_count,
  three_stars_count,
  two_stars_count,
  one_star_count,
} = defineProps({
  profile: Object,
  region_name: String,
  showit: Boolean,
  total_reviews: [Number, String],
  average_rating: [Number, String],
  five_stars_count: [Number, String],
  four_stars_count: [Number, String],
  three_stars_count: [Number, String],
  two_stars_count: [Number, String],
  one_star_count: [Number, String],
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
const starPercentages = ref([]);
watchEffect(() => {
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
});
</script>
