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
const translations = computed(() => store.getters.translations);

store.commit("profile/setActiveTab", 0);
onMounted(async () => {
  await store.dispatch("getToken");
  localStorage.setItem("prevUrl", "/profile-setup");
});
</script>

<template>
  <Head :title="translations && translations.profile_setup" />

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
