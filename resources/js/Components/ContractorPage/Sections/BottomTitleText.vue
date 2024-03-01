<template>
  <!-- Display Saved Text -->
  <div
    v-if="bottomText"
    :class="`mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3 rounded-lg`"
  >
    <div class="flex justify-between">
      <div class="flex items-center font-bold text-lg">
        About Us - Why You Should Work For or Hire Us
      </div>
    </div>
    <div class="flex-1 flex sm:items-center">{{ bottomText }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  screenWidth: {
    type: [String, Number],
  },
  bottom_text: {
    type: String,
  },
});

const bottomText = ref(props.bottom_text);
</script>
