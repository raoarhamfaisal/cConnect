<template>
  <!-- ConfirmDialog -->

  <CustomDialog
    submitText="Delete"
    @submit="handleSubmit"
    ref="deleteDialogRef"
    errorIcon
    dialogWidth="max-h-[70vh] width50"
    title="Are you sure? "
  >
    <form @submit.prevent="handleSubmit">
      <!-- review reason -->
      <div class="mb-4">
        <div class="text-lg font-bold pl-6 text-gray-800 mt-3 mb-2">
          You want to Delete this Response?
        </div>
      </div>
    </form>
  </CustomDialog>
</template>

<script setup>
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
