<template>
  <div class="closing">
    <!-- Display Saved Text -->
    <div
      v-if="closingText"
      :class="`flex gap-1 flex-col border-gray-300 border-2 p-3  rounded-lg`"
    >
      <div class="flex justify-between">
        <div class="flex text-blue-rgba items-center font-extrabold text-2xl">
          Closing Text
        </div>
        <IconButton
          @click="openDialogEdit"
          icon="nimbus:edit"
          color="#1864ab"
        />
      </div>
      <div class="default" v-html="closingText"></div>
    </div>

    <!-- Add Bottom Text Button -->
    <button
      v-if="!closingText"
      @click="openDialogEdit"
      class="w-full flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg"
    >
      <Icon icon="mdi:plus-thick" /> Add Closing Text
    </button>

    <!-- CustomDialog for adding -->
    <CustomDialog
      submitText="Save"
      :loading="loading"
      :disabled="disabled"
      :overflowAllowed="false"
      @submit="handleSubmit"
      @closed="handleClosed"
      ref="dialogRef"
      title="Add Closing Text"
    >
      <ckeditor
        class="default"
        @ready="onReady"
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
      <!-- Textarea -->
      <!-- <textarea
      v-model="closingTextTemp"
      type="text"
      :rows="5"
      class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
      placeholder="Type your Closing title description..."
    ></textarea> -->
    </CustomDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import IconButton from "@/Components/IconButton.vue";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";

const props = defineProps({
  screenWidth: {
    type: [String, Number],
  },
  closing_text: {
    type: String,
  },
});
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const dialogRef = ref();
const closingText = ref(decodeHtml(props.closing_text));
const closingTextTemp = ref(closingText.value);
const loading = ref(false);
const disabled = ref(false);
const isChecked = ref(false);
// Use the Classic Editor build.
const editor = DecoupledEditor;

// Editor content.
const editorData = ref(closingTextTemp.value);

// Editor configuration.
const editorConfig = ref({});
const onReady = (editor) => {
  // Insert the toolbar before the editable area.
  editor.ui
    .getEditableElement()
    .parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
};

const openDialogEdit = () => {
  dialogRef.value.openDialog();
};

const handleSubmit = async () => {
  isChecked.value = true;
  loading.value = true;
  disabled.value = true;
  closingTextTemp.value = editorData.value;
  try {
    const response = await axios.patch(
      `/api/contractor/bottom-closing-text`,
      {
        closing_text: closingTextTemp.value,
      },
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved("Closing Text successfully saved");
      closingText.value = closingTextTemp.value;
      dialogRef.value.closeDialog();
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
    disabled.value = false;
  }
};

const handleClosed = () => {
  console.log("here");
  isChecked.value = false;
};
</script>
