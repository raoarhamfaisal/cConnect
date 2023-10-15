<template>
  <!-- Display Saved Sections -->
  <div v-if="sections && sections.length > 0" class="flex gap-4 flex-col">
    <div
      v-for="section in sections"
      :key="section.id"
      class="rounded-md border relative border-gray-300 p-2"
    >
      <div
        class="z-10 flex gap-2 justify-end items-end sm:absolute top-2 right-2 mb-2"
      >
        <IconButton
          @click="() => openDialogEdit(section.id)"
          icon="nimbus:edit"
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

      <div
        class="flex gap-4 relative flex-col justify-center items-center sm:flex-row"
      >
        <div
          v-if="section.section_image"
          class="relative w-full flex justify-center object-cover sm:w-[280px] sm:h-[190px] md:w-[350px] md:h-[215px] rounded-md border-2 border-gray-300 bg-[#222]"
        >
          <img
            :src="section.section_image"
            alt="Section Image"
            class="object-cover h-full w-full"
          />

          <Icon
            icon="fa-solid:expand"
            class="absolute top-0 right-0 m-2 section_text-white cursor-pointer bg-[#555] p-1 rounded w-8 h-8"
            color="white"
            @click="openImage(section.section_image)"
          />
        </div>
        <div
          v-if="section.section_text"
          :class="`flex-1 flex text-md sm:text-xl font-bold sm:items-center ${
            !section.section_image ? 'sm:p-4 justify-center' : ''
          }`"
          style="word-break: break-word"
        >
          {{ section.section_text }}
        </div>
      </div>
    </div>
  </div>

  <!-- Add Section Button -->
  <button
    v-if="sections.length < 30"
    @click="() => openDialogEdit()"
    class="w-full flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg"
  >
    <Icon icon="mdi:plus-thick" /> Add Title/Image Section
  </button>

  <!-- CustomDialog for adding -->

  <CustomDialog
    submitText="Save"
    :loading="loading"
    :disabled="disabled"
    @submit="handleSubmit"
    ref="dialogRef"
    :title="`${editMode ? 'Edit' : 'Add'} Title/Image Section`"
  >
    <div v-if="isNotFile" class="bg-[#222]">
      <img
        :src="tempSection.section_image"
        alt="Section Image"
        onerror=""
        class="object-cover h-40 mb-2 mx-auto"
      />
    </div>
    <!-- Image Upload -->
    <FilePond
      name="section_image"
      accepted-file-types="image/jpeg, image/png, image/gif, image/webp"
      :files="files"
      allowFileSizeValidation="true"
      maxFileSize="5MB"
      labelMaxTotalFileSizeExceeded="Maximum Size Is 5MB"
      allowImageResize="true"
      credits="false"
      imageResizeMode="contain"
      imageResizeTargetWidth="1000"
      imageResizeTargetHeight="2000"
      imageResizeUpscale="true"
      :allow-multiple="false"
      @init="handlePondInit"
      @updatefiles="updateFiles"
      @addfilestart="handleProcessStart"
      @addfile="handleProcessEnd"
      @error="handleProcessEnd"
      :labelIdle="`Drag & Drop ${
        editMode ? 'to replace ' : ''
      }your image or <span class='filepond--label-action'> Browse </span>`"
    />

    <!-- Textarea -->
    <label for="text_section" class="font-bold">Title(max 70char)</label>
    <textarea
      v-model="tempSection.section_text"
      id="text_section"
      maxlength="70"
      type="text"
      :rows="screenWidth > 760 ? 1 : 2"
      class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
      placeholder="Type your description..."
    ></textarea>
    <div v-if="textError" class="text-red-500 mt-2">
      {{ textError }}
    </div>
  </CustomDialog>
  <!-- Zoom image dialog -->
  <CustomDialog
    dialogWidth="widthAuto"
    :showFooter="false"
    ref="imageIncDialogRef"
    title="Your Image"
  >
    <img :src="selectedImage" />
  </CustomDialog>
  <!-- image Delete Dialog -->
  <CustomDialog
    submitText="Delete"
    @submit="handleSubmitDelete"
    ref="deleteDialogRef"
    :loading="loading"
    :disabled="disabled"
    errorIcon
    dialogWidth="max-h-[70vh] width50"
    title="Are you sure? "
  >
    <div class="mb-4">
      <div
        class="section_text-lg font-bold pl-6 section_text-gray-800 mt-3 mb-2"
      >
        Do you want to Delete this Section?
      </div>
    </div>
  </CustomDialog>
</template>
<script setup>
import { computed, ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import IconButton from "@/Components/IconButton.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { getAxiosConfigFormData } from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import VueFilePond from "vue-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
// import filepond css
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
const FilePond = VueFilePond(
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageTransform,
  FilePondPluginImageResize,
  FilePondPluginFilePoster,
  FilePondPluginFileValidateSize
);
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
const tempSection = ref({
  section_text: "",
  imageTitle: null,
  section_image: null,
});

const dialogRef = ref();
const deleteDialogRef = ref();
// const fileInput = ref();
const editMode = ref(false);
const selectedImage = ref("");
const sectionIdToDelete = ref(null);
const imageIncDialogRef = ref();
const editingSectionId = ref(null);
const imageError = ref("");
const textError = ref("");
const loading = ref(false);
const disabled = ref(false);
const files = ref([]);
const pond = ref();

//Computed

const isNotFile = computed(
  () =>
    !(tempSection.value.section_image instanceof File) &&
    tempSection.value.section_image
);

//Watch
watchEffect(() => {
  if (tempSection.value.section_image) {
    imageError.value = "";
  }
  if (tempSection.value?.section_text?.trim()) {
    textError.value = "";
  }
});

// Methods
const openDialogEdit = (sectionId = null) => {
  if (sectionId) {
    if (files.value.length > 0) {
      files.value = [];
    }
    editMode.value = true;
    const sectionToEdit = sections.value.find((s) => s.id === sectionId);
    if (sectionToEdit) {
      tempSection.value = { ...sectionToEdit };
      editingSectionId.value = sectionId;
    }
  } else {
    editMode.value = false;
    // Clear any existing data
    tempSection.value = {
      section_text: "",
      imageTitle: null,
      section_image: null,
    };
    editingSectionId.value = null;
  }
  dialogRef.value.openDialog();
};
const openDeleteDialog = (sectionId) => {
  sectionIdToDelete.value = sectionId;
  deleteDialogRef.value.openDialog();
};

const handleSubmit = async () => {
  if (
    !tempSection?.value?.section_text?.trim() &&
    !tempSection.value.section_image
  ) {
    textError.value = "Please enter the title text or  image!";
    return;
  }

  if (tempSection.value.section_image || tempSection.value.section_text) {
    loading.value = true;
    disabled.value = true;
    const formData = new FormData();
    if (editingSectionId.value) {
      // edit case
      if (
        tempSection.value.section_image &&
        tempSection.value.section_image instanceof File
      ) {
        formData.append("section_image", tempSection.value.section_image);
      }
      // if (tempSection.value.section_text) {
      formData.append(
        "section_text",
        tempSection.value.section_text ? tempSection.value.section_text : ""
      );
      // }
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`, "key value");
      }
      try {
        const response = await axios.post(
          `/api/contractor/image-section/${editingSectionId.value}`,
          formData,
          getAxiosConfigFormData()
        );
        if (response.data) {
          changesSaved(
            response.data.message || "Title/Image section successfully saved"
          );

          const index = sections.value.findIndex(
            (s) => s.id === editingSectionId.value
          );
          if (index !== -1) {
            sections.value[index] = {
              id: editingSectionId.value,
              ...response.data.imageSection,
            };
          }
        }
      } catch (err) {
        console.log(err);
        somethingWentWrong();
      }
    } else {
      // add case
      if (
        tempSection.value.section_image &&
        tempSection.value.section_image instanceof File
      ) {
        formData.append("section_image", tempSection.value.section_image);
      }
      if (tempSection.value.section_text) {
        formData.append("section_text", tempSection.value.section_text);
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`, "key value");
      }
      try {
        const response = await axios.post(
          `/api/contractor/${props.contractorId}/image-section`,
          formData,
          getAxiosConfigFormData()
        );
        if (response.data) {
          changesSaved(
            response.data.message || "Title/Image section successfully saved"
          );

          sections.value.push({
            id: Date.now(),
            ...response.data.imageSection,
          });
        }
      } catch (err) {
        console.log(err);
        somethingWentWrong();
      }
    }
    loading.value = false;
    disabled.value = false;
    // Clear temp data
    tempSection.value = {
      section_text: "",
      imageTitle: null,
      section_image: null,
    };
    editingSectionId.value = null;
  }
  if (files.value.length > 0) {
    files.value = [];
  }
  dialogRef.value.closeDialog();
};
const handleSubmitDelete = async () => {
  if (sectionIdToDelete.value !== null) {
    loading.value = true;
    disabled.value = true;
    try {
      const response = await axios.delete(
        `/api/contractor/image-section/${sectionIdToDelete.value}`,
        getAxiosConfigFormData()
      );
      if (response.data) {
        changesSaved(
          response.data.message || "Title/Image section successfully deleted"
        );
        const index = sections.value.findIndex(
          (s) => s.id === sectionIdToDelete.value
        );
        if (index !== -1) {
          sections.value.splice(index, 1);
        }
        sectionIdToDelete.value = null;
      }
    } catch (err) {
      console.log(err);
      somethingWentWrong();
    }
    loading.value = false;
    disabled.value = false;
    deleteDialogRef.value.closeDialog();
  }
};

const openImage = (imageSrc) => {
  selectedImage.value = imageSrc;
  imageIncDialogRef.value.openDialog();
};

//FilePond Methods
const handlePondInit = (filePondInstance) => {
  pond.value = filePondInstance;
};

const updateFiles = (fileItems) => {
  files.value = fileItems.map((fileItem) => fileItem.file);
  if (files.value[0]) {
    tempSection.value.imageTitle = files.value[0].name;
    tempSection.value.section_image = files.value[0];
  }
};
const handleProcessStart = () => {
  disabled.value = true;
};

const handleProcessEnd = () => {
  disabled.value = false;
};
</script>
