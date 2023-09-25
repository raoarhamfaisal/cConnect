<template>
  <!-- Display Saved Sections -->
  <div v-if="sections && sections.length > 0" class="flex gap-4 flex-col">
    <div
      v-for="section in sections"
      :key="section.id"
      class="rounded-md border relative border-gray-300 p-2"
    >
      <div
        v-if="mode === 'edit'"
        class="z-50 flex gap-2 justify-end items-end sm:absolute top-2 right-2 mb-2"
      >
        <IconButton
          @click="() => openDialogEdit(section.id)"
          icon="mdi:edit"
          color="#1864ab"
          class="bg-white"
        />
        <IconButton
          @click="() => openDeleteDialog(section.id)"
          icon="ic:baseline-delete"
          color="#e03131"
          class="bg-white"
        />
      </div>

      <div class="flex gap-4 relative flex-col items-center sm:flex-row">
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
  </div>

  <!-- Add Section Button -->
  <button
    v-if="mode === 'edit'"
    @click="openDialogEdit"
    class="w-full flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg"
  >
    <Icon icon="mdi:plus-thick" /> Add Image/Text Section
  </button>

  <!-- CustomDialog for adding -->
  <CustomDialog
    v-if="mode === 'edit'"
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
      <div v-if="imageError" class="text-red-500">{{ imageError }}</div>
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
    <div v-if="textError" class="text-red-500 mt-2">{{ textError }}</div>
  </CustomDialog>
  <!-- Zoom image dialog -->
  <CustomDialog :showFooter="false" ref="imageIncDialogRef" title="Your Image">
    <v-img :src="selectedImage" max-height="600"></v-img>
  </CustomDialog>
  <!-- image Delete Dialog -->
  <CustomDialog
    submitText="Delete"
    @submit="handleSubmitDelete"
    ref="deleteDialogRef"
    errorIcon
    dialogWidth="max-h-[70vh] width50"
    title="Are you sure? "
  >
    <div class="mb-4">
      <div class="text-lg font-bold pl-6 text-gray-800 mt-3 mb-2">
        Do you want to Delete this Section?
      </div>
    </div>
  </CustomDialog>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import IconButton from "@/Components/IconButton.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

// State
defineProps({
  screenWidth: {
    type: [String, Number],
  },
  mode: {
    type: String,
    default: "",
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
const deleteDialogRef = ref();
const fileInput = ref();
const selectedImage = ref("");
const sectionIdToDelete = ref(null);
const imageIncDialogRef = ref();
const editingSectionId = ref(null);
const imageError = ref("");
const textError = ref("");

//Watch
watchEffect(() => {
  if (tempSection.value.file) {
    imageError.value = "";
  }
  if (tempSection.value.text.trim()) {
    textError.value = "";
  }
});

// Methods
const openDialogEdit = (sectionId = null) => {
  if (sectionId) {
    const sectionToEdit = sections.value.find((s) => s.id === sectionId);
    if (sectionToEdit) {
      tempSection.value = { ...sectionToEdit };
      editingSectionId.value = sectionId;
    }
  } else {
    // Clear any existing data
    tempSection.value = {
      text: "",
      imageTitle: null,
      file: null,
      displayImageSrc: null,
    };
    editingSectionId.value = null;
  }
  dialogRef.value.openDialog();
};
const openDeleteDialog = (sectionId) => {
  sectionIdToDelete.value = sectionId;
  deleteDialogRef.value.openDialog();
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
  if (!tempSection.value.file) {
    imageError.value = "Please select an image!";
    return;
  }

  if (!tempSection.value.text.trim()) {
    textError.value = "Please enter the text!";
    return;
  }

  if (tempSection.value.file && tempSection.value.text) {
    if (editingSectionId.value) {
      const index = sections.value.findIndex(
        (s) => s.id === editingSectionId.value
      );
      if (index !== -1) {
        sections.value[index] = {
          id: editingSectionId.value,
          ...tempSection.value,
        };
      }
    } else {
      sections.value.push({
        id: Date.now(),
        ...tempSection.value,
      });
    }
    // Clear temp data
    tempSection.value = {
      text: "",
      imageTitle: null,
      file: null,
      displayImageSrc: null,
    };
    editingSectionId.value = null;
  }
  dialogRef.value.closeDialog();
};
const handleSubmitDelete = () => {
  if (sectionIdToDelete.value !== null) {
    const index = sections.value.findIndex(
      (s) => s.id === sectionIdToDelete.value
    );
    if (index !== -1) {
      sections.value.splice(index, 1);
    }
    sectionIdToDelete.value = null;
    deleteDialogRef.value.closeDialog();
  }
};

const openImage = (imageSrc) => {
  selectedImage.value = imageSrc;
  imageIncDialogRef.value.openDialog();
};
</script>
