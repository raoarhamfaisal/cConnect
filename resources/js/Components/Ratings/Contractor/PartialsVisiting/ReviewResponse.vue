<template>
  <Card :shadowLevel="4" bgColor="#fff" :isInside="true" :padding="'10px'">
    <section>
      <Review
        :review="review"
        :nonEditableReview="false"
        :profileId="profileId"
        :contractorId="contractorId"
      />

      <div
        v-if="
          review.review_response &&
          Object.keys(review.review_response).length > 1
        "
      >
        <Response
          :response="review.review_response"
          :contractorId="contractorId"
          :profileId="profileId"
        />
      </div>
    </section>
  </Card>
</template>

<script setup>
import Response from "./Response.vue";
import Card from "@/Components/Card.vue";

import Review from "./Review.vue";
import { computed } from "vue";
import { useStore } from "vuex";

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
const store = useStore();

const screenWidth = computed(() => store.getters.screenWidth);
</script>

<style scoped></style>
