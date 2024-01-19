<script setup>
import { InertiaLink } from "@inertiajs/inertia-vue3";

const emit = defineEmits(["RefreshPostings"]);

const RefreshPostings = () => {
  emit("RefreshPostings");
};
</script>

<template>
  <Link
    @click="RefreshPostings"
    class="xs:hidden flex-none items-center justify-center mt-0 mx-auto px-2 py-1 font-bold text-lg tracking-tight sm:tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
  >
    <img src="/images/icons/refresh.png" width="30" height="30" />
  </Link>

  <Link
    @click="RefreshPostings"
    class="hidden xs:flex flex-shrink-0 items-center justify-center mt-0 mx-auto px-2 py-1 font-bold text-lg tracking-tight sm:tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
  >
    <img src="/images/icons/refresh.png" width="23" height="23" />
    <span class="mx-1">Refresh</span>
  </Link>
</template>
