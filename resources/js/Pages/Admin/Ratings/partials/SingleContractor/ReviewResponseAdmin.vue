<template>
  <section class="border-b-2 border-gray-300 pb-6">
    <ReviewAdmin :review="review" :contractor="contractor" />
    <div v-if="review.response">
      <ResponseAdmin :response="review.response" :contractor="contractor" />
    </div>
  </section>
</template>

<script setup>
import ReviewAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ReviewAdmin.vue";
import ResponseAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ResponseAdmin.vue";
defineProps(["review", "contractor"]);
</script>

<style scoped></style>
