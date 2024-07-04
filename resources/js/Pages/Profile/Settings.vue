<script setup>
import Header from "@/Layouts/Header.vue";
import MoveToTop from "@/Components/MoveToTop.vue";

import { Head } from "@inertiajs/inertia-vue3";

import SettingsTabs from "@/Pages/Profile/Partials/main/SettingsTabs.vue";
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

const translations = computed(() => store.getters.translations);

const activeTab = localStorage.getItem("activeTab");
if (activeTab) {
  console.log(activeTab, "activeTab");
  store.commit("profile/setActiveTab", +activeTab);
  localStorage.removeItem("activeTab");
} else {
  store.commit("profile/setActiveTab", 0);
}
</script>

<template>
  <Head :title="translations && translations.settings" />

  <Header
    :profile="profile"
    :show-post-buttons="false"
    :post-search-filters="postSearchFilters"
    :showit="showit"
  >
    <SettingsTabs
      :status="status"
      :mustVerifyEmail="mustVerifyEmail"
      :profile="profile"
      :regions="regions"
    />
    <MoveToTop />
  </Header>
</template>
