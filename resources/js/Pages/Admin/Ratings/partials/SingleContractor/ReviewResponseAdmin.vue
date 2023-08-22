<template>
  <section>
    <ReviewAdmin :review="review" :contractor="contractor" />
    <QualifyingQuestions
      v-if="review?.questions?.length > 0"
      :questions="review.questions"
    />
    <Appeal
      v-if="review?.onAppeal && Object.keys(review?.onAppeal).length > 0"
      :appeal="review?.onAppeal"
      heading="Appeal Request from the Contractor"
    />
    <Appeal
      v-if="review?.offAppeal && Object.keys(review?.offAppeal).length > 0"
      :appeal="review?.offAppeal"
      heading="Appeal Turn Off Request from the Contractor"
    />

    <div v-if="review.response">
      <Response :response="review.response" :contractor="contractor" />
    </div>
  </section>
</template>

<script setup>
import Appeal from "@/Pages/Admin/Ratings/partials/SingleContractor/Appeal.vue";
import ReviewAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ReviewAdmin.vue";
import Response from "@/Pages/Ratings/PartialsVisiting/Response.vue";
import QualifyingQuestions from "@/Pages/Ratings/PartialsPersonal/QualifyingQuestions.vue";
defineProps(["review", "contractor"]);
</script>

<style scoped></style>
