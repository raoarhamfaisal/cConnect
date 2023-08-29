<template>
  <button
    class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm"
    :class="{ selected: isSelected }"
    @click="toggleSelect"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { ref, watch } from "vue";

// Props for the component
const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  allowToggle: {
    type: Boolean,
    default: true,
  },
  // You can add more props as required
});
const emit = defineEmits();

// State for the button
const isSelected = ref(props.selected);

// Toggle the isSelected state
const toggleSelect = () => {
  if (!props.allowToggle && !isSelected.value) {
    isSelected.value = !isSelected.value;
  } else if (props.allowToggle) {
    isSelected.value = !isSelected.value;
  }
  emit("onSelect", isSelected.value); // For v-model compatibility
};

watch(
  () => props.selected,
  () => {
    isSelected.value = props.selected;
  }
);
</script>

<style scoped>
button {
  /* Default button styles go here */
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.selected {
  /* Styles for selected button go here */
  background-color: #3a357c;
  color: #fff;
}
</style>
