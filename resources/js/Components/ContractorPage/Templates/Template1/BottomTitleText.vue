<template>
  <!-- Display Saved Text -->
  <div v-if="bottomText" :class="`mt-1 flex gap-1 flex-col rounded-lg closing`">
    <!-- :class="`mt-1 flex gap-1 flex-col md:border-gray-300 md:border-2 p-3 rounded-lg closing`" -->

    <div v-html="bottomText"></div>
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
