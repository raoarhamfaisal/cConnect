<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";

import PaymentStep from "@/Pages/Profile/Partials/main/PaymentStep.vue";
import { onMounted, ref } from "vue";
import PageTitle from "@/Components/PageTitle.vue";
import { VBtn, VBtnToggle } from "vuetify/components";

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
const choosedVersion = ref("gold");
onMounted(() => {
  prevUrlPricingPlan.value = localStorage.getItem("prevUrlPricingPlan");
  choosedVersion.value = localStorage.getItem("choosedVersion");
  console.log(choosedVersion.value, "choosedVersion");
  if (!choosedVersion.value) {
    choosedVersion.value = "gold";
  }
  localStorage.removeItem("choosedVersion");
  localStorage.removeItem("prevUrlPricingPlan");
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
      <div>
        <v-btn-toggle
          v-model="choosedVersion"
          rounded="0"
          color="primary"
          group
          mandatory
        >
          <v-btn
            class="bg-gray-800"
            value="gold"
            style="border: 1px solid #ccc !important; border-right: 0px"
          >
            {{ translations && translations.gold_package }}
          </v-btn>

          <v-btn
            value="platinum"
            style="border: 1px solid #ccc !important; border-left: 0px"
          >
            {{ translations && translations.platinum_package }}</v-btn
          >
        </v-btn-toggle>
      </div>
      <PaymentStep
        :region_id="profile.region_id"
        :choosedVersion="choosedVersion"
      />
    </div>
  </Header>
</template>

<style scoped></style>
