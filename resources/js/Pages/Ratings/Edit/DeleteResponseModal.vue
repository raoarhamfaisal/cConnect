<template>
  <!-- ConfirmDialog -->

  <CustomDialog
    :submitText="translations && translations.delete"
    @submit="handleSubmit"
    :loading="loadingSending"
    :disabled="disabledSending"
    ref="deleteDialogRef"
    errorIcon
    dialogWidth="max-h-[70vh] width50"
    :title="translations && translations.are_you_sure"
  >
    <form @submit.prevent="handleSubmit">
      <!-- review reason -->
      <div class="mb-4">
        <div class="text-lg font-bold pl-6 text-gray-800 mt-3 mb-2">
          {{ translations && translations.you_want_to_delete_this_response }}
        </div>
      </div>
    </form>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
//States
const { responseId } = defineProps(["responseId"]);
const deleteDialogRef = ref();
const store = useStore();

//Computed
const loadingSending = computed(() => store.state.ratings.loadingSending);
const disabledSending = computed(() => store.state.ratings.disabledSending);
const translations = computed(() => store.getters.translations);

//Methods

const handleSubmit = async () => {
  await store.dispatch("ratings/deleteResponse", responseId);
  deleteDialogRef.value.closeDialog();
};

const openDialogDelete = () => {
  return deleteDialogRef.value.openDialog();
};

defineExpose({ openDialogDelete });
</script>

<style></style>
