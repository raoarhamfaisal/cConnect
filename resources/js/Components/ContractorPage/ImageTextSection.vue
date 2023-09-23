<template>
  <Card
    :shadowLevel="2"
    bgColor="white"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <!-- Display Saved Sections -->
    <div
      v-if="sections && sections.length > 0"
      class="flex gap-4 mb-4 flex-col"
    >
      <div
        v-for="section in sections"
        class="flex gap-4 flex-col items-center sm:flex-row"
        :key="section.id"
      >
        <!-- <img
          class="w-full object-cover sm:w-[280px] sm:h-[190px] md:w-[350px] md:h-[215px]"
          :src="section.displayImageSrc"
        /> -->
        <div
          class="relative w-full object-cover sm:w-[280px] sm:h-[190px] md:w-[350px] md:h-[215px]"
        >
          <img
            :src="section.displayImageSrc"
            alt="Section Image"
            class="object-cover h-full"
          />
          <Icon
            icon="fa-solid:expand"
            class="absolute top-0 right-0 m-2 text-white cursor-pointer bg-[#000000b3] p-1 rounded w-8 h-8"
            @click="openImage(section.displayImageSrc)"
          />
        </div>
        <div class="flex-1 flex sm:items-center">{{ section.text }}</div>
      </div>
    </div>

    <!-- Add Section Button -->
    <button
      @click="openDialogEdit"
      class="w-full flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg"
    >
      <Icon icon="mdi:plus-thick" /> Add Image/Text Section
    </button>

    <!-- CustomDialog for adding -->
    <CustomDialog
      submitText="Save"
      @submit="handleSubmit"
      ref="dialogRef"
      title="Add Image/Text Section"
    >
      <!-- Image Upload -->
      <div class="flex items-center mb-3 gap-2">
        <button
          class="px-3 py-2 flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg"
          @click="onImageUploadClick"
        >
          Choose an Image
        </button>
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          @change="onImageSelected"
          style="display: none"
        />
        <div v-if="tempSection.imageTitle">
          {{ tempSection.imageTitle }}
        </div>
      </div>
      <!-- Textarea -->
      <textarea
        v-model="tempSection.text"
        type="text"
        :rows="5"
        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        placeholder="Type your description..."
      ></textarea>
    </CustomDialog>
    <!-- Zoom image dialog -->
    <CustomDialog
      :showFooter="false"
      ref="imageIncDialogRef"
      title="Your Image"
    >
      <v-img :src="selectedImage" max-height="600"></v-img>
    </CustomDialog>
  </Card>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import Card from "@/Components/Card.vue";

defineProps({
  screenWidth: {
    type: [String, Number],
  },
});
const sections = ref([]);
const tempSection = ref({
  text: "",
  imageTitle: null,
  file: null,
  displayImageSrc: null,
});

const dialogRef = ref();
const fileInput = ref();
const selectedImage = ref("");
const imageIncDialogRef = ref();

const openDialogEdit = () => {
  dialogRef.value.openDialog();
};

const onImageUploadClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    tempSection.value.file = file;
    tempSection.value.imageTitle = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      tempSection.value.displayImageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = () => {
  if (tempSection.value.file && tempSection.value.text) {
    sections.value.push({
      id: Date.now(),
      ...tempSection.value,
    });
    // Clear temp data
    tempSection.value = {
      text: "",
      imageTitle: null,
      file: null,
      displayImageSrc: null,
    };
  }
  dialogRef.value.closeDialog();
};
const openImage = (imageSrc) => {
  selectedImage.value = imageSrc;
  imageIncDialogRef.value.openDialog();
};
</script>
