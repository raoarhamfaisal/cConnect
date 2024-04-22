<!-- BackgroundColorDropdown.vue -->

<template>
  <div class="relative bgColorDropdownRelateive">
    <!-- Button to toggle the dropdown -->
    <v-tooltip text="Background Color" location="top">
      <template v-slot:activator="{ props }">
        <button
          type="button"
          @click="isOpen = !isOpen"
          v-bind="props"
          class="rounded border border-transparent flex items-center"
          :class="{ 'bg-gray-100 border-2 border-gray-400': isOpen }"
        >
          <Icon icon="ic:round-color-lens" class="w-6 h-6" />
          <!-- Use a suitable icon here -->
          <Icon icon="gridicons:dropdown" />
        </button>
      </template>
    </v-tooltip>

    <!-- Dropdown content -->
    <div
      v-if="isOpen"
      class="absolute w-full flex flex-col items-center flex-wrap w-40 mt-2 bg-white border border-gray-200 p-2 rounded z-10"
    >
      <button
        type="button"
        @click="clearColor"
        class="mb-2 flex gap-2 items-center border-2 border-gray-200 px-2 py-1 rounded"
      >
        <Icon icon="ph:eraser-fill" class="w-5 h-5" />
        <div class="text-sm font-semibold translate-y-[1px]">Remove Color</div>
      </button>
      <v-progress-circular
        v-if="loading"
        class="self-center"
        style="height: 80px"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <div
        v-else
        class="grid grid-cols-4 items-center justify-items-center gap-2"
      >
        <div
          v-for="(color, index) in colors"
          :key="index"
          :style="{ backgroundColor: color.color }"
          @click="setColor(color)"
          :class="{
            'ring-2 ring-blue-500': color.color === selectedColor.color,
          }"
          class="w-6 h-6 border-2 border-gray-200 rounded cursor-pointer"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Icon } from "@iconify/vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedColor = ref(props.modelValue);
const colors = ref([
  // "#ffffff",
  // "#000000",
  // "#2C3E50",
  // //   "#34495E",
  // "#7F8C8D",
  // "#27AE60",
  // "#2980B9",
  // "#8E44AD",
  //   "#F39C12",
  //   "#1ABC9C", // Turquoise
  // "#E74C3C", // Red
  //   "#3498DB", // Blue
  // "#E67E22", // Orange
  //   "#95A5A6", // Concrete
  //   "#9B59B6", // Amethyst
  // "#2E4053", // Midnight Blue
  // "#16A085", // Green Sea
  // "#E84393", // Plum
  //   "#273746", // Dark Blue
  //   "#C0392B", // Pomegranate
  //   "#D35400", // Pumpkin
]);
const loading = ref(true);

watch(selectedColor, (newValue) => {
  emit("update:modelValue", newValue);
});

const setColor = (color) => {
  selectedColor.value = color;
};

const clearColor = () => {
  selectedColor.value.color = "inherit";
  selectedColor.value.id = null;
};

// Click outside logic
const handler = (e) => {
  if (!e.target.closest(".bgColorDropdownRelateive")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handler);
  fetchBgColors();
});

onUnmounted(() => {
  document.removeEventListener("click", handler);
});

const fetchBgColors = async () => {
  loading.value = true;

  try {
    const response = await axios.get(
      `/api/post/background-colors`,
      getAxiosConfig()
    );
    if (response.data) {
      colors.value = response.data.backgroundColors;
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Optional styles for better visualization */
</style>
