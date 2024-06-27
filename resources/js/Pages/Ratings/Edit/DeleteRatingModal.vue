<template>
  <!-- ConfirmDialog -->

  <CustomDialog
    :submitText="translations && translations.delete"
    @submit="handleSubmit"
    ref="deleteDialogRef"
    :loading="loadingSending"
    :disabled="disabledSending"
    errorIcon
    dialogWidth="max-h-[70vh] width50"
    :title="translations && translations.are_you_sure"
  >
    <!-- review reason -->
    <div class="mb-4">
      <div class="text-lg font-bold pl-6 text-gray-800 mt-3 mb-2">
        {{ translations && translations.do_you_want_to_delete_this_rating }}
      </div>
    </div>
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
const loadingSending = computed(() => store.state.ratings.loadingSending);
const disabledSending = computed(() => store.state.ratings.disabledSending);
const translations = computed(() => store.getters.translations);

//Methods

const handleSubmit = async () => {
  await store.dispatch("ratings/deleteReview", reviewId);
  store.commit("ratings/setShouldLoadPosts", false);
  store.commit("ratings/setShouldFetchPostsOnClose", true);
  deleteDialogRef.value.closeDialog();
  console.log("this executed2");
};

const openDialogDelete = () => {
  return deleteDialogRef.value.openDialog();
};

defineExpose({ openDialogDelete });
</script>

<style></style>
