<template>
  <section>
    <Review
      :review="review"
      :nonEditableReview="false"
      :contractor="contractor"
    />
    <div v-if="review.response">
      <Response :response="review.response" :contractor="contractor" />
    </div>
  </section>
</template>

<script setup>
import Response from "./Response.vue";
import Review from "./Review.vue";
defineProps(["review", "contractor"]);
</script>

<style scoped></style>
