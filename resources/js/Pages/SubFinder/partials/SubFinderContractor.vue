<template>
  <ContractorHeader :contractor="contractor" />
</template>

<script setup>
import ContractorHeader from "@/Pages/SubFinder/partials/ContractorHeader.vue";

defineProps({
  contractor: Object,
});
</script>

<style></style>
