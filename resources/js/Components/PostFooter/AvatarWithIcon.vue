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
  icon: {
    type: String,
    default: ""
  },
  iconRotate:{
    type:Number
  },
  iconColorClass:{
    type:String
  }
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
    :class="`relative flex justify-center items-center ${
      imageClass ? imageClass : 'w-14 h-14 sm:h-20 sm:w-20'
    } inline-block  `"
  >
    <img
      v-if="imageSrc && !imageFailed"
      :class="`object-contain w-full border-2 border-gray-300  h-full rounded-full`"
      :src="imageSrc"
      alt="avatar"
      @error="handleImageError"
    />
    <div
      v-else
      class="object-contain w-full h-full rounded-full flex items-center justify-center bg-gray-400"
    >
      <Icon icon="fluent-mdl2:contact" color="white" width="24" />
    </div>
    <div v-show="icon" class="overlay-icon">
      <!-- <Icon :icon="icon" color="white" width="24" /> -->
      <div class="flex flex-row justify-between items-center">
              <div class="">
                <Icon
                  :icon="icon"
                  :class="iconColorClass"
                  :rotate="iconRotate"
                  width="25"
                />
              </div>
            </div>
    </div>
  </div>
</template>
<style scoped>
.companyLogo {
  width: 7rem;
  height: 4rem;
}
.overlay-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color:white; /* Semi-transparent background */
  border-radius: 50%;
  /* padding: 0.25rem; */
}
</style>
