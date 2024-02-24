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
    :class="`pt-10 sm:pt-36 pb-2 sm:pb-20 flex sm:justify-center items-center   bg-gray-100 `"
  >
    <div
      class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
    >
      <slot />
    </div>
  </div>
</template>
