<template>
  <!-- Display Saved Text -->
  <div v-if="closingText" :class="`flex gap-1 flex-colrounded-lg`">
    <div class="flex justify-between">
      <div class="flex items-center font-bold text-lg">Closing Text</div>
    </div>
    <div class="flex-1 flex sm:items-center">{{ closingText }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  screenWidth: {
    type: [String, Number],
  },
  closing_text: {
    type: String,
  },
});

const closingText = ref(props.closing_text);
</script>
