<template>
  <Head title="Ratings" />

  <Header
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <ContractorRating
      class="bg-gray-200 mt-10"
      :contractorDetails="contractorDetails"
      :profileId="profile.user_id"
    />
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import ContractorRating from "@/Components/Ratings/Contractor/ContractorRating.vue";

// State
const { contractorDetails } = defineProps({
  contractorDetails: Object,
  profile: Object,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
</script>
