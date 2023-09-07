<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const { imageSrc } = defineProps(["imageSrc"]);
const imageFailed = ref(false);

const handleImageError = () => {
  imageFailed.value = true;
};
</script>

<template>
  <div
    class="w-14 h-14 flex justify-center items-center sm:h-20 sm:w-20 inline-block"
  >
    <img
      v-if="imageSrc && !imageFailed"
      class="object-cover w-full h-full rounded-full"
      :src="imageSrc"
      alt="avatar"
      @error="handleImageError"
    />
    <div
      v-else
      class="object-cover w-full h-full rounded-full flex items-center justify-center bg-gray-400"
    >
      <Icon icon="fluent-mdl2:contact" color="white" width="24" />
    </div>
  </div>
</template>
