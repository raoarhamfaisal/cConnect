<template>
  <div class="relative fontSizeDropdownRelateive">
    <!-- Button to toggle the dropdown -->
    <button
      type="button"
      @click="isOpen = !isOpen"
      :class="{ 'bg-gray-100 border-gray-400': isOpen }"
      class="pl-1rounded border border-transparent flex items-center"
    >
      <Icon icon="mdi:format-font-size-increase" class="w-7 h-7" />
      <Icon icon="gridicons:dropdown" />
    </button>

    <!-- Dropdown content -->
    <div
      v-if="isOpen"
      class="absolute shadow-lg bg-white border border-gray-200 p-2 rounded z-10 flex items-center"
    >
      <div class="w-40">Increase Font Size by:</div>

      <button
        type="button"
        @click="decreaseFontSize"
        class="ml-2 border border-gray-400 flex items-center justify-center rounded w-7"
      >
        -
      </button>
      <span class="mx-2 text-sm">{{ fontSizeIncrement }}</span>
      <button
        type="button"
        @click="increaseFontSize"
        class="border border-gray-400 flex items-center justify-center rounded w-7"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Icon } from "@iconify/vue";

// Using props and emit
const props = defineProps({
  modelValue: Number,
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const fontSizeIncrement = ref(props.modelValue);

watch(fontSizeIncrement, (newValue) => {
  emit("update:modelValue", newValue);
});
const increaseFontSize = () => {
  fontSizeIncrement.value++;
};

const decreaseFontSize = () => {
  if (fontSizeIncrement.value > 0) {
    fontSizeIncrement.value--;
  }
};

// Click outside logic
const handler = (e) => {
  if (!e.target.closest(".fontSizeDropdownRelateive")) {
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

<style>
/* Optional styles for better visualization */
</style>
