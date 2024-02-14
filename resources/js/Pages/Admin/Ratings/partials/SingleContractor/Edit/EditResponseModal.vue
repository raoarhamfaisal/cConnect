<template>
  <!-- edit dialog -->
  <CustomDialog
    submitText="Save Changes"
    @submit="handleSubmit"
    ref="dialogRef"
    title="Edit Response"
  >
    <!-- response -->
    <div class="mb-4">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        Contractors Response
      </div>
      <textarea
        id="responseText"
        type="text"
        :rows="5"
        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        required
        v-model="response_text"
        placeholder="Type your response text"
      />
      <InputError v-if="responseError" class="mt-2" :message="responseError" />
    </div>
  </CustomDialog>
  <!-- ConfirmDialog -->

  <CustomDialog
    submitText="Save Changes"
    :loading="loading"
    :disabled="disabled"
    @submit="handleConfirm"
    dialogWidth=" max-h-[70vh] width50"
    ref="submitRef"
    title="Are you sure? You want to change this Response?"
  >
    <!-- review reason -->
    <div class="mb-4">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        Reason for Editing the Response
      </div>
      <textarea
        id="editing_reason"
        type="text"
        :rows="5"
        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        required
        v-model="editing_reason"
        placeholder="Type reason for Editing the response"
      />
      <InputError
        v-if="editingReasonError"
        class="mt-2"
        :message="editingReasonError"
      />
    </div>
  </CustomDialog>
</template>

<script setup>
import InputError from "@/Components/InputError.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { filterBadWords } from "@/helpers/utilities";
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";

//States
const { responseText, responseId } = defineProps([
  "responseText",
  "responseId",
]);
const store = useStore();

const response_text = ref(responseText);
const editing_reason = ref("");

const dialogRef = ref();
const submitRef = ref();

const responseError = ref("");
const editingReasonError = ref("");

//Computed
const loading = computed(() => store.state.ratings.loading);
const disabled = computed(() => store.state.ratings.disabled);

//Watch

watch(
  () => response_text.value,
  () => {
    responseError.value = "";
  }
);

watch(
  () => editing_reason.value,
  () => {
    editingReasonError.value = "";
  }
);

//Methods
const validateEdit = () => {
  let isValid = true;
  // Reset the error messages before validating
  responseError.value = "";

  // Validate rating_text
  if (!response_text.value || response_text.value.trim() === "") {
    responseError.value = "Response should not be empty.";
    isValid = false;
  }

  return isValid;
};
const validateConfirm = () => {
  let isValid = true;
  // Reset the error messages before validating
  editingReasonError.value = "";

  // Validate rating_text
  if (!editing_reason.value || editing_reason.value.trim() === "") {
    editingReasonError.value = "Editing reason should not be empty.";
    isValid = false;
  }

  return isValid;
};
const handleSubmit = async () => {
  //   open edit confirmDialog
  if (validateEdit()) {
    submitRef.value.openDialog();
  }
};
const handleConfirm = async () => {
  if (validateConfirm()) {
    const updateResponse = {
      response_text: filterBadWords(response_text),
      response_id: responseId,
      reason: filterBadWords(editing_reason),
    };
    await store.dispatch("ratings/updateResponseAdmin", updateResponse);
    submitRef.value.closeDialog();
    dialogRef.value.closeDialog();
  }
};

const openDialogEdit = () => {
  return dialogRef.value.openDialog();
};

defineExpose({ openDialogEdit });
</script>

<style></style>
