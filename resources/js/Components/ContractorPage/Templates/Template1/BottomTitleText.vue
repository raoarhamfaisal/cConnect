<template>
  <!-- Display Saved Text -->
  <div
    v-if="bottomText"
    :class="`mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3 rounded-lg closing`"
  >
    <!-- <div class="flex justify-between">
      <div class="text-blue-rgba flex items-center font-bold text-2xl">
        About Us - Why You Should Work For or Hire Us
      </div>
    </div> -->
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
