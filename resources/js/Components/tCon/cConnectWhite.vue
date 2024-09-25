<template>
  <div class="flex items-center justify-start">
    <img
      style="border: 1px solid #ccc"
      class="h-8 w-8 sm:h-10 translate-y-1 sm:w-10 rounded-full block object-contain"
      src="/images/logo.png"
    />
    <span class="text-white font-extrabold font-sans">C</span>
    <span class="text-white font-bold font-sans">onnect</span>
  </div>
</template>

<script setup>
const props = defineProps({
  isOrange: {
    type: Boolean,
    default: false,
  },
});
</script>
