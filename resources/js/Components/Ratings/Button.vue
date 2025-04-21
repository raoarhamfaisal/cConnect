<template>
  <button
    class="rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm bg-white"
    :class="{ selected: isSelected }"
    @click="toggleSelect"
    @mouseover="showTooltip = true"
    @mouseout="showTooltip = false"
  >
    <slot></slot>
    <div v-if="showTooltip && tooltipText" class="tooltip">
      <span class="triangle"></span>
      {{ tooltipText }}
    </div>
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
  alwaysFalse: {
    type: Boolean,
    default: false,
  },
  tooltipText: {
    type: String,
    default: "",
  },
});
const emit = defineEmits();

// Province for the button
const isSelected = ref(props.selected);
const showTooltip = ref(false);

// Toggle the isSelected state
const toggleSelect = () => {
  if (props.alwaysFalse) {
    isSelected.value = false;
  } else if (!props.allowToggle) {
    isSelected.value = true;
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
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
}

button.selected {
  background-color: #3a357c;
  color: #fff;
}

.tooltip {
  position: absolute;

  top: 50%;
  left: -200%;
  transform: translate(-50%, -50%);
  white-space: pre;
  background-color: black;
  color: white;
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
}
.triangle {
  border-width: 0 12px 12px;
  border-color: transparent;
  border-bottom-color: black;
  position: absolute;
  right: -10px;
  top: calc(50% - 6px);
  z-index: -1;
  transform: rotate(90deg) translateY(-50%);
}
</style>
