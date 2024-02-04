<template>
  <section>
    <Review
      :review="review"
      :nonEditableReview="false"
      :profileId="profileId"
      :contractorId="contractorId"
    />

    <div
      v-if="
        review.review_response && Object.keys(review.review_response).length > 1
      "
    >
      <Response
        :response="review.review_response"
        :contractorId="contractorId"
        :profileId="profileId"
      />
    </div>
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
