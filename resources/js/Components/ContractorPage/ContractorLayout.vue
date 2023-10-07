<template>
  <Template1
    v-if="mode !== 'edit' && selectedTemplate === 1"
    @change-mode="changeMode"
    :profile="profile"
    :screenWidth="screenWidth"
    :average_rating="average_rating"
    :starPercentages="starPercentages"
    :total_reviews="total_reviews"
    :region_name="region_name"
  />

  <EditMode
    v-if="mode === 'edit'"
    @change-mode="changeMode"
    :screenWidth="screenWidth"
    :templateList="templateList"
    :profile="profile"
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
  mode: String,
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
const emit = defineEmits(["changeMode"]);

const screenWidth = computed(() => store.getters.screenWidth);
const selectedTemplate = computed(
  () => store.state.contractor.selectedTemplate
);

const changeMode = () => {
  emit("changeMode");
};
</script>

<style></style>
