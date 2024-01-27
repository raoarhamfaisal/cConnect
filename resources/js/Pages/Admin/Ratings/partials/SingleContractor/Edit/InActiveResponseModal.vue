<template>
  <!-- ConfirmDialog -->

  <CustomDialog
    :submitText="isActive ? 'Inactivate' : 'Activate'"
    @submit="handleSubmit"
    ref="inActiveDialogRef"
    :loading="loading"
    :disabled="disabled"
    errorIcon
    :title="`Are you sure? You want to ${
      isActive ? 'inactivate' : 'activate'
    } this response?`"
  >
    <!-- review reason -->
    <div class="mb-4">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        Reason for {{ isActive ? "inactivating" : "activiting" }} this response
      </div>
      <textarea
        id="inactivating_reason"
        type="text"
        :rows="5"
        class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
        required
        v-model="editing_reason"
        :placeholder="`Type your reason for ${
          isActive ? 'inactivating' : 'activiting'
        } this response`"
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
const inActiveDialogRef = ref();
const { responseId, isActive } = defineProps({
  responseId: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    required: true,
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
    editingReasonError.value = `${
      isActive ? "Inactivating" : "Activiting"
    } reason should not be empty.`;
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (validateConfirm()) {
    console.log(filterBadWords(editing_reason));
    if (isActive) {
      await store.dispatch("ratings/deactivateResponse", responseId);
    } else if (!isActive) {
      await store.dispatch("ratings/activateResponse", responseId);
    }
    inActiveDialogRef.value.closeDialog();
  }
};

const openDialogInActivate = () => {
  return inActiveDialogRef.value.openDialog();
};

defineExpose({ openDialogInActivate });
</script>

<style></style>
