<template>
  <div
    class="inline-flex items-center justify-center px-3 py-2 text-xs font-bold leading-none uppercase text-white rounded-full text-center bg-indigo-700"
    v-if="isJobPosting"
  >
    {{ isJobCompleted ? "Hiring Complete" : "Job Opportunity" }}
  </div>
</template>

<script setup>
defineProps({
  isJobPosting: {
    type: Boolean,
    default: false,
  },
  isJobCompleted: {
    type: Boolean,
    default: false,
  },
});
</script>
