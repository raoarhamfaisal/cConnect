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
        class="z-10 flex gap-2 justify-end items-end sm:absolute top-2 right-2 mb-2"
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
            :src="section.section_image"
            alt="Section Image"
            class="object-cover h-full"
          />
          <Icon
            icon="fa-solid:expand"
            class="absolute top-0 right-0 m-2 section_text-white cursor-pointer bg-[#000000b3] p-1 rounded w-8 h-8"
            @click="openImage(section.section_image)"
          />
        </div>
        <div class="flex-1 flex sm:items-center">
          {{ section.section_text }}
        </div>
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
    :loading="loading"
    :disabled="disabled"
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
      v-model="tempSection.section_text"
      type="section_text"
      :rows="5"
      class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
      placeholder="Type your description..."
    ></textarea>
    <div v-if="textError" class="section_text-red-500 mt-2">
      {{ textError }}
    </div>
  </CustomDialog>
  <!-- Zoom image dialog -->
  <CustomDialog :showFooter="false" ref="imageIncDialogRef" title="Your Image">
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
import { ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import IconButton from "@/Components/IconButton.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { getAxiosConfigFormData } from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";

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
  mode: {
    type: String,
    default: "",
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
const fileInput = ref();
const selectedImage = ref("");
const sectionIdToDelete = ref(null);
const imageIncDialogRef = ref();
const editingSectionId = ref(null);
const imageError = ref("");
const textError = ref("");
const loading = ref(false);
const disabled = ref(false);

//Watch
watchEffect(() => {
  if (tempSection.value.section_image) {
    imageError.value = "";
  }
  if (tempSection.value.section_text.trim()) {
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

const onImageUploadClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const onImageSelected = (event) => {
  const section_image = event.target.files[0];
  if (section_image) {
    tempSection.value.section_image = section_image;
    tempSection.value.imageTitle = section_image.name;
    reader.readAsDataURL(section_image);
  }
};

const handleSubmit = async () => {
  if (editingSectionId.value) {
    if (!tempSection.value.section_image) {
      imageError.value = "Please select an image!";
      return;
    }

    if (!tempSection.value.section_text.trim()) {
      textError.value = "Please enter the section_text!";
      return;
    }
  }
  loading.value = true;
  disabled.value = true;
  const formData = new FormData();
  if (tempSection.value.section_image && tempSection.value.section_text) {
    if (editingSectionId.value) {
      // edit case
      if (tempSection.value.section_image instanceof File) {
        formData.append("section_image", tempSection.value.section_image);
      }
      formData.append("section_text", tempSection.value.section_text);
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
            response.data.message || "Image/Text section successfully saved"
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
      formData.append("section_image", tempSection.value.section_image);
      formData.append("section_text", tempSection.value.section_text);
      console.log("inelse", tempSection.value, formData);
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
            response.data.message || "Image/Text section successfully saved"
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
          response.data.message || "Image/Text section successfully deleted"
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
</script>
