<template>
  <Card :shadowLevel="4" bgColor="#fff" :isInside="true" :padding="'6px'">
    <section
      class="pb-6"
      :style="{
        opacity: review.deleted_at ? 0.6 : 1.0,
      }"
    >
      <ReviewAdmin
        :review="review"
        :profileId="profileId"
        :contractorId="contractorId"
        :showNotes="showNotes"
        :showContactDetails="showContactDetails"
      />
    </section>
  </Card>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import ReviewAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ReviewAdmin.vue";
defineProps({
  showNotes: {
    type: Boolean,
    default: false,
  },
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
