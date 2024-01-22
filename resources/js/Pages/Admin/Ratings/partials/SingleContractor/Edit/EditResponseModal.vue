<template>
  <!-- edit dialog -->
  <CustomDialog
    submitText="Save Changes"
    @submit="handleSubmit"
    ref="dialogRef"
    title="Edit Response"
  >
    <form @submit.prevent="handleSubmit">
      <!-- response -->
      <div v-if="form?.response_text" class="mb-4">
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">
          Contractors Response
        </div>
        <textarea
          id="responseText"
          type="text"
          :rows="5"
          class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="form.response_text"
          placeholder="Type your response text"
        />
        <InputError class="mt-2" :message="form.errors.response_text" />
      </div>
    </form>
  </CustomDialog>
  <!-- ConfirmDialog -->

  <CustomDialog
    submitText="Save Changes"
    @submit="handleSubmit"
    dialogWidth=" max-h-[70vh] width50"
    ref="submitRef"
    title="Are you sure? You want to change this Response?"
  >
    <form @submit.prevent="handleSubmit">
      <!-- review reason -->
      <div class="mb-4">
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">
          Reason for Editing the Response
        </div>
        <textarea
          id="editing_reason"
          type="text"
          :rows="5"
          class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="form.editing_reason"
          placeholder="Type reason for Editing the response"
        />
        <InputError class="mt-2" :message="form.errors.editing_reason" />
      </div>
    </form>
  </CustomDialog>
</template>

<script setup>
import InputError from "@/Components/InputError.vue";
import { useForm } from "@inertiajs/inertia-vue3";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { ref } from "vue";
const { responseText } = defineProps(["responseText"]);

const form = useForm({
  response_text: responseText,
  editing_reason: null,
});

const submitRef = ref();
const dialogRef = ref();
const handleSubmit = () => {
  console.log("here", form);
  //   open edit confirmDialog
  submitRef.value.openDialog();
  // form.patch(route('profile.updateGeneralInfo'))
};

const openDialogEdit = () => {
  return dialogRef.value.openDialog();
};

defineExpose({ openDialogEdit });
</script>

<style></style>
