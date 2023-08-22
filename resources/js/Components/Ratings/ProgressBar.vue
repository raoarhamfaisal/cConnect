<template>
  <div :style="outerStyle">
    <div :style="innerStyle"></div>
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  filledColor: {
    type: String,
    default: "green",
  },
  unfilledColor: {
    type: String,
    default: "grey",
  },
});

const { width, filledColor, unfilledColor } = toRefs(props);

const outerStyle = computed(() => ({
  width: "100%",
  backgroundColor: unfilledColor.value,
  height: "20px", // adjust as needed
  borderRadius: "4px", // adjust as needed
  overflow: "hidden", // to ensure inner div doesn't extend out
}));

const innerStyle = computed(() => ({
  width: `${width.value}%`,
  backgroundColor: filledColor.value,
  height: "100%",
}));
</script>

<style scoped>
/* You can add additional styling or adjustments here if needed */
</style>
