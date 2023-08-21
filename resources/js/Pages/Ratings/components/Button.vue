<template>
  <button
    class="rounded"
    :class="{ selected: isSelected }"
    @click="toggleSelect"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { ref } from "vue";

// Props for the component
const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  // You can add more props as required
});
const emit = defineEmits();

// State for the button
const isSelected = ref(props.selected);

// Toggle the isSelected state
const toggleSelect = () => {
  isSelected.value = !isSelected.value;
  emit("onSelect", isSelected.value); // For v-model compatibility
};
</script>

<style scoped>
button {
  /* Default button styles go here */
  padding: 10px 20px;
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
