<template>
  <!-- ConfirmDialog -->

  <CustomDialog
    submitText="Delete"
    @submit="handleSubmit"
    ref="deleteDialogRef"
    :loading="loading"
    :disabled="disabled"
    errorIcon
    title="Are you sure? You want to Delete this Rating?"
  >
    <!-- review reason -->
    <div class="mb-4">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        Reason for Deleting this Rating
      </div>
      <textarea
        id="deleting_reason"
        type="text"
        :rows="5"
        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        required
        v-model="editing_reason"
        placeholder="Type your reason for Deleting this rating"
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
const { reviewId: reviewId } = defineProps({
  reviewId: {
    type: Number,
  },
});
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
    console.log(filterBadWords(editing_reason));
    await store.dispatch("ratings/deleteReviewAdmin", {
      reviewId: reviewId,
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
