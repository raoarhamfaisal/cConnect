<!-- IconButton.vue -->

<template>
  <button
    class="xs:text-md hover:bg-[#f8f9fa] hover:rounded-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center active:scale-95"
  >
    <Icon
      class="w-[24px] h-[24px] xs:w-[28px] xs:h-[28px] focus:outline-none"
      :icon="icon"
      :color="color"
    />
  </button>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";

// Props definition
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#1864ab",
  },
});

const computedBoxShadow = computed(() => ({
  boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)",
}));
</script>

<style scoped>
/* You can add additional styles here if needed */
</style>
