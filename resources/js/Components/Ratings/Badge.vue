<!-- Badge.vue -->
<template>
  <span
    class="inline-flex items-center justify-center px-2 py-2 sm:px-3 sm:py-2 py-1 text-xxs sm:text-xs font-bold leading-none uppercase text-white rounded-full text-center"
  >
    <slot></slot>
  </span>
</template>

<script setup>
// You can define your reactive references and methods here
</script>

<style scoped>
@media (max-width: 660px) {
  .text-xxs {
    font-size: 0.6rem;
    line-height: 0.75rem;
  }
}
@media (max-width: 460px) {
  .text-xxs {
    font-size: 0.5rem;
    line-height: 0.75rem;
  }
}
@media (max-width: 350px) {
  .text-xxs {
    font-size: 0.45rem;
    line-height: 0.75rem;
  }
}

/* Additional styles if needed, but in this case, we're using Tailwind's utility classes directly in the template. */
</style>
