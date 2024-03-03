<template>
  <Template1
    v-if="mode !== 'edit' && !loading"
    @change-mode="changeMode"
    :profile="profile"
    :screenWidth="screenWidth"
    :average_rating="average_rating"
    :starPercentages="starPercentages"
    :total_reviews="total_reviews"
    :region_name="region_name"
  />

  <EditMode
    v-if="mode === 'edit' && !loading"
    @change-mode="changeMode"
    :screenWidth="screenWidth"
    :profile="profile"
    :average_rating="average_rating"
    :starPercentages="starPercentages"
    :total_reviews="total_reviews"
    :region_name="region_name"
  />
  <Loader :loading="loading" background="transparent" height="70vh"></Loader>

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
  region_name: String,
  total_reviews: [Number, String],
  average_rating: [Number, String],
  starPercentages: {
    type: Array,
    default: [],
  },
});
const store = useStore();
const mode = ref("");
const loading = ref(false);

const screenWidth = computed(() => store.getters.screenWidth);

const changeMode = () => {
  mode.value = mode.value === "edit" ? "" : "edit";
  modeChanged();
};
const modeChanged = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
</script>

<style></style>
