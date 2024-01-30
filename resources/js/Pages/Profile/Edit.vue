<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";

import AllTabs from "@/Pages/Profile/Partials/main/AllTabs.vue";
import { useStore } from "vuex";
import { computed } from "vue";

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
const translations = computed(() => store.getters.translations);
</script>

<template>
  <Head :title="translations && translations.profile" />

  <Header
    :profile="profile"
    :show-post-buttons="false"
    :post-search-filters="postSearchFilters"
    :showit="showit"
  >
    <AllTabs
      :status="status"
      :mustVerifyEmail="mustVerifyEmail"
      :profile="profile"
      :regions="regions"
    />
  </Header>
</template>
