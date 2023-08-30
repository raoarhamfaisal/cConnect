<template>
  <!-- ConfirmDialog -->

  <CustomDialog
    submitText="Delete"
    @submit="handleSubmit"
    ref="deleteDialogRef"
    :loading="loading"
    :disabled="disabled"
    errorIcon
    title="Are you sure? You want to Delete this Response?"
  >
    <!-- review reason -->
    <div class="mb-4">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        Reason for Deleting this Response
      </div>
      <textarea
        id="deleting_reason"
        type="text"
        :rows="5"
        class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
        required
        v-model="editing_reason"
        placeholder="Type your reason for Deleting this Response"
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
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

// States
const store = useStore();
const deleteDialogRef = ref();
const { responseId } = defineProps(["responseId"]);

const editing_reason = ref("");
const editingReasonError = ref("");

//Computed
const loading = computed(() => store.state.ratings.loading);
const disabled = computed(() => store.state.ratings.disabled);

//Watch
watch(
  () => editing_reason.value,
  () => {
    editingReasonError.value = "";
  }
);
//Methods
const validateConfirm = () => {
  let isValid = true;
  // Reset the error messages before validating
  editingReasonError.value = "";

  // Validate rating_text
  if (!editing_reason.value || editing_reason.value.trim() === "") {
    editingReasonError.value = "Deleting reason should not be empty.";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (validateConfirm()) {
    await store.dispatch("ratings/deleteResponseAdmin", {
      responseId: responseId,
      reason: filterBadWords(editing_reason),
    });
    deleteDialogRef.value.closeDialog();
  }
};

const openDialogDelete = () => {
  return deleteDialogRef.value.openDialog();
};

defineExpose({ openDialogDelete });
</script>

<style></style>
