<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  imageSrc: {
    type: String,
  },
  imageClass: {
    type: String,
    default: "",
  },
});
const imageFailed = ref(false);

const handleImageError = () => {
  imageFailed.value = true;
};
watch(
  () => props.imageSrc,
  (newVal) => {
    if (newVal) {
      imageFailed.value = false;
    }
  }
);
</script>

<template>
  <div
    :class="` flex justify-center items-center ${
      imageClass ? imageClass : 'w-14 h-14 sm:h-20 sm:w-20'
    } inline-block  `"
  >
    <img
      v-if="imageSrc && !imageFailed"
      :class="`object-cover w-full  h-full rounded-full`"
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
<style scoped>
.companyLogo {
  width: 7rem;
  height: 4rem;
}
</style>
