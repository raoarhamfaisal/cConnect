<template>
  <!-- edit dialog -->
  <CustomDialog
    submitText="Save Changes"
    @submit="handleSubmit"
    ref="dialogRef"
    :loading="loadingSending"
    :disabled="disabledSending"
    title="Edit Response"
  >
    <form @submit.prevent="handleSubmit">
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
        <InputError
          v-if="responseError"
          class="mt-2"
          :message="responseError"
        />
      </div>
    </form>
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

const dialogRef = ref();
const responseError = ref("");
//Computed
const loadingSending = computed(() => store.state.ratings.loadingSending);
const disabledSending = computed(() => store.state.ratings.disabledSending);

//Watch

watch(
  () => response_text.value,
  () => {
    responseError.value = "";
  }
);

//Methods
const validate = () => {
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
const handleSubmit = async () => {
  if (validate()) {
    const updateResponse = {
      response_text: filterBadWords(response_text),
      response_id: responseId,
    };
    await store.dispatch("ratings/updateResponse", updateResponse);
    dialogRef.value.closeDialog();
  }
};

const openDialogEdit = () => {
  return dialogRef.value.openDialog();
};

defineExpose({ openDialogEdit });
</script>

<style></style>
