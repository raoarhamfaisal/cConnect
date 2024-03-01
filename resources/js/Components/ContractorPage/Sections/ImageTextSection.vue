<template>
  <!-- Display Saved Sections -->
  <div v-if="sections && sections.length > 0" class="flex gap-4 flex-col">
    <div
      v-for="section in sections"
      :key="section.id"
      class="rounded-md border relative border-gray-300 p-2"
    >
      <div class="flex gap-4 relative flex-col items-center sm:flex-row">
        <div
          class="relative w-full flex justify-center object-cover sm:w-[280px] sm:h-[190px] md:w-[350px] md:h-[215px] p-1 rounded-md border-2 border-gray-300"
        >
          <img
            :src="section.section_image"
            alt="Section Image"
            class="object-cover h-full"
          />
          <Icon
            icon="fa-solid:expand"
            class="absolute top-0 right-0 m-2 section_text-white cursor-pointer bg-[#000000b3] p-1 rounded w-8 h-8"
            color="white"
            @click="openImage(section.section_image)"
          />
        </div>
        <div class="flex-1 flex sm:items-center">
          {{ section.section_text }}
        </div>
      </div>
    </div>
  </div>

  <!-- Zoom image dialog -->
  <CustomDialog
    dialogWidth="w-auto"
    :showFooter="false"
    ref="imageIncDialogRef"
    title="Your Image"
  >
    <img :src="selectedImage" />
  </CustomDialog>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

// State
const props = defineProps({
  screenWidth: {
    type: [String, Number],
  },
  image_sections: {
    type: Array,
  },
  contractorId: {
    type: Number,
  },
});
const sections = ref(props.image_sections);

const selectedImage = ref("");

const imageIncDialogRef = ref();

// Methods

const openImage = (imageSrc) => {
  selectedImage.value = imageSrc;
  imageIncDialogRef.value.openDialog();
};
</script>
