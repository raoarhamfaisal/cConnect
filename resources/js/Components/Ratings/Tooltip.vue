<template>
  <div
    class="relative"
    @mouseover="toggleTooltip(true)"
    @mouseout="toggleTooltip(false)"
  >
    <div :class="textClass">
      {{ effectiveDisplayName }}
    </div>
    <div v-show="isHovered && effectiveShowTooltip" class="tooltip">
      {{ fullText }}
      <div class="triangle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  text: String,
  textLengthToShow: Number,
  textClass: String,
  applyTooltipLength: Number,
});

const isHovered = ref(false);
const toggleTooltip = (value) => {
  isHovered.value = value;
};

const screenWidth = computed(() => store.getters.screenWidth);

const showTooltip = computed(() => props.text.length > props.textLengthToShow);

const shouldApplyTooltip = computed(() => {
  if (props.applyTooltipLength != null) {
    return screenWidth.value < props.applyTooltipLength;
  }
  return true;
});

const effectiveShowTooltip = computed(() => {
  return shouldApplyTooltip.value && showTooltip.value;
});

const effectiveDisplayName = computed(() => {
  if (effectiveShowTooltip.value) {
    return props.text.substring(0, props.textLengthToShow - 3) + "...";
  }
  return props.text;
});

const fullText = computed(() => props.text);
</script>

<style>
.tooltip {
  position: absolute;
  white-space: pre;
  background-color: black;
  color: white;
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
  z-index: 66666;
  top: -100%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.triangle {
  border-width: 0 12px 12px;
  border-color: transparent;
  border-bottom-color: black;
  position: absolute;
  z-index: 99999;
  right: 50%;
  top: 100%;
  transform: rotate(180deg) translateY(50%);
}
</style>
