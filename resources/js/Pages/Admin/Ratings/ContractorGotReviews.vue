<template>
  <Head title="Contractor Reviews" />

  <Header
    v-if="isAdminUrl"
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <ContractorDetails
      :profile="profile"
      :region_id="region_id"
      :contractorDetails="contractorDetails"
      gotReviews
    />
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Inertia } from "@inertiajs/inertia";
import ContractorDetails from "@/Pages/Admin/Ratings/partials/SingleContractor/ContractorDetails.vue";
import { onBeforeMount } from "vue";
import { usePage } from "@inertiajs/inertia-vue3";

// Province
const { contractorDetails } = defineProps({
  profile: Object,
  region_id: [String, Number],
  contractorDetails: Object,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
const isAdminUrl = usePage().props.value.auth.user.appeals_privileges === 1;
onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});
</script>

<style scoped></style>
