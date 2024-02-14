<template>
  <div class="flex gap-4 mb-8 items-center">
    <Link :href="linkUrl">
      <Icon class="w-8 h-8" icon="ion:arrow-back" color="#241e6d" />
    </Link>
    <div class="font-bold text-2xl text-blue-rgba leading-tight">
      {{ pageTitle }}
    </div>
  </div>
</template>
  
  <script setup>
import { Icon } from "@iconify/vue";
import { Link } from "@inertiajs/inertia-vue3";

const props = defineProps({
  linkUrl: {
    type: String,
    required: true,
  },
  pageTitle: {
    type: String,
    required: true,
  },
});
</script>
  
  <style scoped>
/* any styles if needed */
</style>
  