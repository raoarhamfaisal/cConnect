<script setup>
import { Link } from "@inertiajs/inertia-vue3";
defineProps({
  verifyEmailPage: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    :class="`${
      verifyEmailPage ? 'min-h-[80vh]' : 'min-h-screen'
    } flex sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 `"
  >
    <div
      class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
    >
      <slot />
    </div>
  </div>
</template>
