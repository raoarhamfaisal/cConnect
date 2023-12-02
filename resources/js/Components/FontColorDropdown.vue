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
      class="absolute w-full flex items-center flex-col flex-wrap w-40 mt-2 bg-white border border-gray-200 p-2 rounded z-10"
    >
      <button
        type="button"
        @click="clearColor"
        class="mb-2 flex gap-2 items-center border-2 broder-gray-200 px-2 py-1 rounded"
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
          class="w-6 h-6 rounded cursor-pointer border-2 border-gray-20"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Icon } from "@iconify/vue";
import { somethingWentWrong } from "@/helpers/utilities";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedColor = ref(props.modelValue);
const colors = ref([
  // "#000000",
  // "#ffffff",
  // "#2C3E50",
  // "#34495E",
  // "#7F8C8D",
  // "#27AE60",
  // "#2980B9",
  // "#8E44AD",
  // "#F39C12",
]);
const loading = ref(true);
watch(selectedColor, (newValue) => {
  emit("update:modelValue", newValue);
});

const setColor = (color) => {
  selectedColor.value = {...color};
};

const clearColor = () => {
  selectedColor.value.color = "inherit";
  selectedColor.value.id = null;
};

// Click outside logic
const handler = (e) => {
  if (!e.target.closest(".fontColorDropdownRelateive")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handler);
  fetchColors();
});

onUnmounted(() => {
  document.removeEventListener("click", handler);
});

const fetchColors = async () => {
  loading.value = true;

  try {
    const response = await axios.get(`/api/post/text-colors`, getAxiosConfig());
    if (response.data) {
      colors.value = response.data.textColors;
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
