<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";

import PaymentStep from "@/Pages/Profile/Partials/main/PaymentStep.vue";
import { onMounted, ref } from "vue";
import PageTitle from "@/Components/PageTitle.vue";

const props = defineProps({
  profile: Object,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});

const prevUrlPricingPlan = ref("");
const choosedPlan = ref("");
onMounted(() => {
  prevUrlPricingPlan.value = localStorage.getItem("prevUrlPricingPlan");
  choosedPlan.value = localStorage.getItem("choosedPlan");
});
</script>

<template>
  <Head title="Pricing Plan" />

  <Header
    :profile="profile"
    :show-post-buttons="false"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    color="#f9fafb"
  >
    <div class="flex mt-6 sm:mt-3 justify-between">
      <PageTitle :linkUrl="prevUrlPricingPlan" pageTitle="Prcing Plan" />
    </div>
    <div class="mt-10 ml-2 sm:mt-0 p-2 sm:p-3 md:p-0">
      <PaymentStep :region_id="profile.region_id" :choosedPlan="choosedPlan" />
    </div>
  </Header>
</template>

<style scoped></style>
