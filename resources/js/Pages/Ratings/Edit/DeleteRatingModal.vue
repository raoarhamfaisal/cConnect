<template>
  <!-- ConfirmDialog -->

  <CustomDialog
    submitText="Delete"
    @submit="handleSubmit"
    ref="deleteDialogRef"
    :loading="loading"
    :disabled="disabled"
    errorIcon
    dialogWidth="max-h-[70vh] width50"
    title="Are you sure? "
  >
    <form @submit.prevent="handleSubmit">
      <!-- review reason -->
      <div class="mb-4">
        <div class="text-lg font-bold pl-6 text-gray-800 mt-3 mb-2">
          Do you want to Delete this Rating?
        </div>
      </div>
    </form>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const deleteDialogRef = ref();
const { reviewId } = defineProps({
  reviewId: {
    type: Number,
  },
});

//Computed
const loading = computed(() => store.state.ratings.loading);
const disabled = computed(() => store.state.ratings.disabled);

//Methods

const handleSubmit = async () => {
  await store.dispatch("ratings/deleteReview", reviewId);
  deleteDialogRef.value.closeDialog();
};

const openDialogDelete = () => {
  return deleteDialogRef.value.openDialog();
};

defineExpose({ openDialogDelete });
</script>

<style></style>
