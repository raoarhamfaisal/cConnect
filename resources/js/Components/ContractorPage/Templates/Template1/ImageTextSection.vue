<template>
  <!-- Display Saved Sections -->
  <div v-if="sections && sections.length > 0" class="flex gap-4 flex-col">
    <div
      v-for="(section, index) in sections"
      :key="section.id"
      class="rounded-md border relative border-gray-300 p-2"
    >
      <!-- For even items -->
      <div v-if="index % 2 !== 0" class="flex gap-4 items-center">
        <div class="w-2/5 text-3xl font-extrabold uppercase text-center">
          {{ section.section_text }}
        </div>
        <div
          class="relative w-3/5 h-3/5 p-1 rounded-md border-2 border-gray-300"
        >
          <img
            @click="openImage(section.section_image)"
            :src="section.section_image"
            alt="Section Image"
            class="object-cover h-full w-full"
          />
        </div>
      </div>

      <!-- For odd items -->
      <div v-else class="relative" @click="openImage(section.section_image)">
        <img
          :src="section.section_image"
          alt="Section Image"
          class="object-cover h-[400px] w-full"
        />
        <div class="absolute inset-0 flex justify-center items-center">
          <span
            class="text-white text-center bg-black text-3xl font-extrabold uppercase bg-opacity-50 p-2 rounded"
          >
            {{ section.section_text }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Zoom image dialog -->
  <CustomDialog
    dialogWidth="widthAuto"
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
  console.log("infunction call");
  imageIncDialogRef.value.openDialog();
};
</script>
