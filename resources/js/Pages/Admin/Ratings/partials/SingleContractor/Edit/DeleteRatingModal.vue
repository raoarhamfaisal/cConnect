<template>
  <!-- ConfirmDialog -->

  <CustomDialog
    submitText="Save Changes"
    @submit="handleSubmit"
    ref="deleteDialogRef"
    title="Are you sure? You want to Delete this Rating?"
  >
    <form @submit.prevent="handleSubmit">
      <!-- review reason -->
      <div class="mb-4">
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">
          Reason for Deleting this Rating
        </div>
        <textarea
          id="deleting_reason"
          type="text"
          :rows="5"
          class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="form.deleting_reason"
          placeholder="Type your reason for Deleting this rating"
        />
        <InputError class="mt-2" :message="form.errors.deleting_reason" />
      </div>
    </form>
  </CustomDialog>
</template>

<script setup>
import InputError from "@/Components/InputError.vue";
import { useForm } from "@inertiajs/inertia-vue3";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { ref } from "vue";

const form = useForm({
  deleting_reason: null,
});
const deleteDialogRef = ref();

const handleSubmit = () => {
  console.log("here", form);
};

const openDialogDelete = () => {
  return deleteDialogRef.value.openDialog();
};

defineExpose({ openDialogDelete });
</script>

<style></style>
