<template>
  <section
    class="border-b-2 border-gray-300 pb-6"
    :style="{
      opacity: review.deleted_at ? 0.6 : 1.0,
    }"
  >
    <ReviewAdmin
      :review="review"
      :profileId="profileId"
      :contractorId="contractorId"
      :showContactDetails="showContactDetails"
    />
    <div
      v-if="
        review.review_response && Object.keys(review.review_response).length > 1
      "
    >
      <ResponseAdmin
        :response="review.review_response"
        :contractorId="contractorId"
        :deletedAt="review.deleted_at"
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
  showContactDetails: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
