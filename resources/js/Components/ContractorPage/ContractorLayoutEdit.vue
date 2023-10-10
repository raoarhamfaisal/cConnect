<template>
  <EditMode
    :screenWidth="screenWidth"
    :templateList="templateList"
    :profile="profile"
    :average_rating="average_rating"
    :starPercentages="starPercentages"
    :total_reviews="total_reviews"
    :region_name="region_name"
  />

  <MoveToTopEdit />
</template>

<script setup>
import MoveToTopEdit from "@/Components/MoveToTopEdit.vue";
import EditMode from "@/Components/ContractorPage/EditMode.vue";
import Template1 from "@/Components/ContractorPage/Templates/Template1.vue";

import Loader from "@/Components/Ratings/Loader.vue";

import { computed, ref } from "vue";
import { useStore } from "vuex";

// State
const props = defineProps({
  profile: Object,
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
</script>

<style></style>
