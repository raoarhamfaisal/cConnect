<template>
  <!-- ConfirmDialog -->

  <CustomDialog
    submitText="Save Changes"
    @submit="handleSubmit"
    ref="inActiveDialogRef"
    title="Are you sure? You want to Inactivate this Rating?"
  >
    <form @submit.prevent="handleSubmit">
      <!-- review reason -->
      <div class="mb-4">
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">
          Reason for Inactivating this rating
        </div>
        <textarea
          id="in_active_reason"
          type="text"
          :rows="5"
          class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="form.in_active_reason"
          placeholder="Type your reason for inactivating this rating"
        />
        <InputError class="mt-2" :message="form.errors.in_active_reason" />
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
  in_active_reason: null,
});
const inActiveDialogRef = ref();

const handleSubmit = () => {
  console.log("here", form);
};

const openDialogInActivate = () => {
  return inActiveDialogRef.value.openDialog();
};

defineExpose({ openDialogInActivate });
</script>

<style></style>
