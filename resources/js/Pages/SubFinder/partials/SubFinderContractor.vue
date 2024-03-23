<template>
  <Card
    :shadowLevel="2"
    :isInside="true"
    bgColor="#edecea"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <ContractorHeader :contractor="contractor" />
  </Card>
</template>

<script setup>
import Card from "@/Components/Card.vue";

import ContractorHeader from "@/Pages/SubFinder/partials/ContractorHeader.vue";
import { computed } from "vue";
import { useStore } from "vuex";

defineProps({
  contractor: Object,
});
const store = useStore();

//Computed

const screenWidth = computed(() => store.getters.screenWidth);
</script>

<style></style>
