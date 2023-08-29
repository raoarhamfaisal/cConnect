<template>
  <section class="border-b-2 border-gray-300 pb-6">
    <ReviewAdmin
      :review="review"
      :profileId="profileId"
      :contractorId="contractorId"
    />
    <div
      v-if="
        review.review_response && Object.keys(review.review_response).length > 1
      "
    >
      <ResponseAdmin
        :response="review.review_response"
        :contractorId="contractorId"
        :profileId="profileId"
      />
    </div>
  </section>
</template>

<script setup>
import ReviewAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ReviewAdmin.vue";
import ResponseAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ResponseAdmin.vue";
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
