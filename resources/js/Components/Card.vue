<!-- src/components/Card.vue -->

<template>
  <div
    :class="{
      'w-full mx-auto px-1 sm:px-6 md:px-6 sm:px-2 lg:px-8 space-y-6':
        !isInside,
    }"
  >
    <div :class="`card p-3 xs:p-5 ${cardInnerClasses}`" :style="cardStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    cardInnerClasses: {
      type: String,
      default: "",
    },
    shadowLevel: {
      type: [Number, String],
      default: 5,
    },
    bgColor: {
      type: String,
      default: "white",
    },
    padding: {
      type: String,
      default: "0px",
    },
    isInside: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const shadows = [
      "none", // Level 0 (No shadow)
      "0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.24)", // Level 1
      "0px 0px 4px rgba(0, 0, 0, 0.12), 0px 0px 3px rgba(0, 0, 0, 0.24)", // Level 2
      "0px 0px 5px rgba(0, 0, 0, 0.12), 0px 0px 5px rgba(0, 0, 0, 0.24)", // Level 3
      "0px 0px 6px rgba(0, 0, 0, 0.12), 0px 0px 6px rgba(0, 0, 0, 0.24)", // Level 4
      "5px 5px 10px rgba(0, 0, 0, 0.12), 5px 5px 8px rgba(0, 0, 0, 0.24)", // Level 5
      "6px 6px 12px rgba(0, 0, 0, 0.12), 6px 6px 10px rgba(0, 0, 0, 0.24)", // Level 6
      "7px 7px 14px rgba(0, 0, 0, 0.12), 7px 7px 12px rgba(0, 0, 0, 0.24)", // Level 7
      "8px 8px 16px rgba(0, 0, 0, 0.12), 8px 8px 14px rgba(0, 0, 0, 0.24)", // Level 8
      "9px 9px 18px rgba(0, 0, 0, 0.12), 9px 9px 16px rgba(0, 0, 0, 0.24)", // Level 9
      "10px 10px 20px rgba(0, 0, 0, 0.12), 10px 10px 18px rgba(0, 0, 0, 0.24)", // Level 10
    ];

    const cardStyles = computed(() => ({
      boxShadow: shadows[props.shadowLevel],
      backgroundColor: props.bgColor,
      ...(props.padding !== "0px" ? { padding: props.padding } : {}),
    }));

    return { cardStyles };
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  transition: all 0.3s;
}
</style>
