<template>
  <Card :shadowLevel="4" bgColor="#fff" :isInside="true" :padding="'10px'">
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
        :showContactDetails="showContactDetails"
      />
      <div
        v-if="
          review && review.rating_reasons && review.rating_reasons.length > 0
        "
      >
        <template v-for="(note, index) in review.rating_reasons" :key="index">
          <AdminNote
            v-if="note.type === 'updated_review'"
            icon="dashicons:update"
            iconColor="#099268"
            :date="note.reason_date"
            text="You updated this review at"
            :reason="note.reason"
            iconBackgroundColor="#e6fcf5"
          />
          <AdminNote
            v-if="note.type === 'deleted_review'"
            icon="ic:baseline-delete"
            iconColor="#e03131"
            :date="note.reason_date"
            text="You deleted this review at"
            :reason="note.reason"
            iconBackgroundColor="#ffe3e3"
          />
          <AdminNote
            v-if="note.type === 'activated_review'"
            icon="mdi:show"
            iconColor="#f08c00"
            :date="note.reason_date"
            text="You activated this review at"
            :reason="note.reason"
            iconBackgroundColor="#ffe8cc"
          />
          <AdminNote
            v-if="note.type === 'deactivated_review'"
            icon="mdi:hide"
            iconColor="#9c36b5"
            :date="note.reason_date"
            text="You dectivated this review at"
            :reason="note.reason"
            iconBackgroundColor="#f3d9fa"
          />
        </template>
      </div>
      <div
        v-if="
          review.review_response &&
          Object.keys(review.review_response).length > 1
        "
      >
        <ResponseAdmin
          :response="review.review_response"
          :contractorId="contractorId"
          :deletedAt="review.deleted_at"
          :profileId="profileId"
        />
      </div>
      <div
        class="mt-2"
        v-if="
          review &&
          review.review_response &&
          review.review_response.response_reasons &&
          review.review_response.response_reasons.length > 0
        "
      >
        <template
          v-for="(note, index) in review.review_response.response_reasons"
          :key="index"
        >
          <AdminNote
            v-if="note.type === 'updated_review_response'"
            icon="dashicons:update"
            iconColor="#099268"
            :date="note.reason_date"
            text="You updated this response at"
            :reason="note.reason"
            iconBackgroundColor="#e6fcf5"
          />
          <AdminNote
            v-if="note.type === 'deleted_review_response'"
            icon="ic:baseline-delete"
            iconColor="#e03131"
            :date="note.reason_date"
            text="You deleted this response at"
            :reason="note.reason"
            iconBackgroundColor="#ffe3e3"
          />
          <AdminNote
            v-if="note.type === 'activated_review_response'"
            icon="mdi:show"
            iconColor="#f08c00"
            :date="note.reason_date"
            text="You activated this response at"
            :reason="note.reason"
            iconBackgroundColor="#ffe8cc"
          />
          <AdminNote
            v-if="note.type === 'deactivated_review_response'"
            icon="mdi:hide"
            iconColor="#9c36b5"
            :date="note.reason_date"
            text="You dectivated this response at"
            :reason="note.reason"
            iconBackgroundColor="#f3d9fa"
          />
        </template>
      </div>
    </section>
  </Card>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import AdminNote from "@/Pages/Admin/History/partials/AdminNote.vue";
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
