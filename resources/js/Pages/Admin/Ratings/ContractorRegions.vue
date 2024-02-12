<template>
  <Head title="Regions" />

  <Header
    v-if="isAdminUrl"
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <AllRegions isAllContractorPage />
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import AllRegions from "@/Pages/Admin/Ratings/partials/AllContractors/AllRegions.vue";

import { Head, usePage } from "@inertiajs/inertia-vue3";

import { onBeforeMount } from "vue";
import { Inertia } from "@inertiajs/inertia";
// States
defineProps({
  profile: Object,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
const isAdminUrl = usePage().props.value.auth.user.reviews_privileges === 1;

onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});
</script>