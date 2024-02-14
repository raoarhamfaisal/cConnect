<template>
  <div
    :style="{
      borderRadius: '5px',
    }"
    :class="[
      'inline-flex',
      'items-center',
      'justify-center',
      'px-3',
      'py-2',
      'w-20',
      'text-xs',
      'xs:text-xs',
      'font-bold',
      'leading-none',
      'transition',
      'transform',
      'duration-300',
      'hover:shadow-lg',
      'gap-3',
      'active:scale-95',
      'uppercase',
      'text-white',
      'cursor-pointer',
      bgColorClass,
    ]"
  >
    <!-- Icon from iconify -->
    <Icon v-if="icon" :icon="icon" :color="iconColor" class="h-3 w-3"></Icon>
    <div class="flex justify-center items-center"><slot></slot></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue"; // Assuming you have @iconify/vue installed

const props = defineProps({
  bgColor: {
    type: String,
    default: "bg-lime-700",
  },
  icon: {
    type: String,
    required: false, // or default to some icon if you don't want it to be mandatory
  },
  iconColor: {
    type: String,
    default: "#FFF", // default white color
  },
});

const bgColorClass = computed(() => props.bgColor);
</script>
