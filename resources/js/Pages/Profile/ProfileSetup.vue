<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";

import AllSteps from "@/Pages/Profile/Partials/main/AllSteps.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

defineProps({
  mustVerifyEmail: Boolean,
  status: String,
  profile: Object,
  showit: Boolean,
  regions: Array,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
const store = useStore();

store.commit("profile/setActiveTab", 0);
onMounted(async () => {
  await store.dispatch("getToken");
});
</script>

<template>
  <Head title="Profile" />

  <Header
    :profile="profile"
    :show-post-buttons="false"
    :showOnlyNewsFeed="false"
    :post-search-filters="postSearchFilters"
    :showit="showit"
  >
    <AllSteps
      :status="status"
      :mustVerifyEmail="mustVerifyEmail"
      :profile="profile"
      :regions="regions"
    />
  </Header>
</template>
