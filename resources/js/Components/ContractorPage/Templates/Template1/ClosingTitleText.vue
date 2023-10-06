<template>
  <!-- Display Saved Text -->
  <div v-if="closingText" :class="` flex gap-1 flex-col rounded-lg closing`">
    <!-- :class="`mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3 rounded-lg closing`" -->

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
