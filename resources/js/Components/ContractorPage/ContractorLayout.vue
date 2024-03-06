<template>
  <Template1
    v-if="selectedTemplate === 1"
    :profile="profile"
    :screenWidth="screenWidth"
    :loggedInUserId="loggedInUserId"
    :average_rating="average_rating"
    :starPercentages="starPercentages"
    :total_reviews="total_reviews"
    :region_name="region_name"
  />

  <MoveToTop />
</template>

<script setup>
import MoveToTop from "@/Components/MoveToTop.vue";
import EditMode from "@/Components/ContractorPage/EditMode.vue";
import Template1 from "@/Components/ContractorPage/Templates/Template1.vue";

import Loader from "@/Components/Ratings/Loader.vue";

import { computed, ref } from "vue";
import { useStore } from "vuex";

// State
const props = defineProps({
  profile: Object,
  loggedInUserId: [String, Boolean],
  templateList: Array,
  region_name: String,
  total_reviews: [Number, String],
  average_rating: [Number, String],
  starPercentages: {
    type: Array,
    default: [],
  },
});
const store = useStore();

const screenWidth = computed(() => store.getters.screenWidth);
const selectedTemplate = computed(
  () => store.state.contractor.selectedTemplate
);
</script>

<style></style>
