<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";

import AllTabs from "@/Pages/Profile/Partials/main/AllTabs.vue";
import { useStore } from "vuex";

defineProps({
  mustVerifyEmail: Boolean,
  status: String,
  profile: Object,
  posts: Object,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
const store = useStore();

store.commit("profile/setActiveTab", 0);
</script>

<template>
  <Head title="Profile" />

  <Header
    :profile="profile"
    :posts="posts"
    :show-post-buttons="false"
    :post-search-filters="postSearchFilters"
    :showit="showit"
  >
    <AllTabs
      :status="status"
      :mustVerifyEmail="mustVerifyEmail"
      :profile="profile"
    />
  </Header>
</template>
