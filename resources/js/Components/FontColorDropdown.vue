<template>
  <div class="relative fontColorDropdownRelateive">
    <!-- Button to toggle the dropdown -->
    <v-tooltip text="Font Color" location="top">
      <template v-slot:activator="{ props }">
        <button
          type="button"
          @click="isOpen = !isOpen"
          v-bind="props"
          :class="{ 'bg-gray-100 border-gray-400': isOpen }"
          class="rounded border border-transparent flex items-center"
        >
          <Icon icon="ri:font-color" class="w-6 h-6" />
          <Icon icon="gridicons:dropdown" />
        </button>
      </template>
    </v-tooltip>

    <!-- Dropdown content -->
    <div
      v-if="isOpen"
      class="absolute w-full flex flex-col flex-wrap w-40 mt-2 bg-white border border-gray-200 p-2 rounded z-10"
    >
      <button
        type="button"
        @click="clearColor"
        class="mb-2 flex gap-2 items-center border-2 broder-gray-200 px-2 py-1 rounded"
      >
        <Icon icon="ph:eraser-fill" class="w-5 h-5" />
        <div class="text-sm font-semibold translate-y-[1px]">Remove Color</div>
      </button>
      <div class="grid grid-cols-4 items-center justify-items-center gap-2">
        <div
          v-for="(color, index) in colors"
          :key="index"
          :style="{ backgroundColor: color }"
          @click="setColor(color)"
          :class="{ 'ring-2 ring-blue-500': color === selectedColor }"
          class="w-6 h-6 rounded cursor-pointer"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedColor = ref(props.modelValue);
const colors = [
  "#000000",
  "#2C3E50",
  "#34495E",
  "#7F8C8D",
  "#27AE60",
  "#2980B9",
  "#8E44AD",
  "#F39C12",
];

watch(selectedColor, (newValue) => {
  emit("update:modelValue", newValue);
});

const setColor = (color) => {
  selectedColor.value = color;
};

const clearColor = () => {
  selectedColor.value = "inherit";
};

// Click outside logic
const handler = (e) => {
  if (!e.target.closest(".fontColorDropdownRelateive")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handler);
});

onUnmounted(() => {
  document.removeEventListener("click", handler);
});
</script>

<style scoped>
/* Optional styles for better visualization */
</style>
