<template>
  <span
    :class="`${
      isOrange ? 'text-orange-accent' : 'text-green-rgba'
    } font-extrabold italic font-serif normal-case`"
    >c</span
  >
  <span class="text-white font-extrabold font-sans">C</span>
  <span class="text-white font-bold font-sans">onnect</span>
</template>

<script setup>
const props = defineProps({
  isOrange: {
    type: Boolean,
    default: false,
  },
});
</script>
