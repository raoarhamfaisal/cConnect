<template>
  <section>
    <Review
      :review="review"
      :nonEditableReview="false"
      :profileId="profileId"
      :contractorId="contractorId"
    />

    <!-- <div v-if="review.response">
      <Response :response="review.response" :contractor="contractor" />
    </div> -->
  </section>
</template>

<script setup>
import Response from "./Response.vue";
import Review from "./Review.vue";
defineProps({
  review: {
    type: Object,
  },
  profileId: {
    type: Number,
  },
  contractorId: {
    type: Number,
  },
});
</script>

<style scoped></style>
