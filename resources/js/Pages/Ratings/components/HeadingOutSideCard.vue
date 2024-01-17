<template>
  <div class="bg-gray-200">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 max-lg:pt-10">
      <h2 class="font-bold text-xl text-blue-rgba leading-tight">
        {{ heading }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      default: "",
    },
  },
};
</script>
