<template>
  <!-- Display Saved Text -->
  <div
    v-if="closingText"
    :class="`mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3 rounded-lg closing`"
  >
    <div class="flex justify-between">
      <div class="text-blue-rgba flex items-center font-bold text-2xl">
        Closing Text
      </div>
    </div>
    <div v-html="closingText"></div>
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
