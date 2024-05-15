<template>
  <!-- edit dialog -->
  <Teleport to="body">
    <CustomDialog
      submitText="Report Now"
      @submit="handleSubmit"
      ref="dialogRef"
      @opened="onOpened"
      :loading="loadingSending"
      :disabled="disabledSending"
      :title="`Report Post`"
    >
      <form @submit.prevent="handleSubmit">
        <!-- response -->
        <div
          class="sm:p-4 p-3 bg-blue-100 border border-blue-200 rounded-lg mb-2"
        >
          <h3 class="text-lg font-semibold">Note:</h3>
          <p class="mt-1 sm:mt-2 text-blue-700">
            Your report will be confidentially sent to our admin team for
            review. We're committed to maintaining a respectful and safe
            community for everyone.
          </p>
        </div>
        <div class="">
          <textarea
            id="reportText"
            type="text"
            :rows="4"
            class="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden"
            required
            v-model="reportText"
            ref="textRef"
            @keydown="insertTab"
            @input="adjustHeight"
            @paste="adjustHeight"
            placeholder="Describe what you find objectionable in this post..."
          />
          <InputError
            v-if="reportTextError"
            class="mt-2"
            :message="reportTextError"
          />
        </div>
      </form>
    </CustomDialog>
  </Teleport>
  <v-dialog
    v-if="showDialog"
    class="dialog-modal"
    v-model="loadingComment"
    scrim="transparent"
    persistent
    width="auto"
  >
    <Card
      :shadowLevel="2"
      bgColor="#364fc7"
      :padding="screenWidth < 640 ? '7px' : '10px'"
    >
      <div class="text-white">Post Reporting...</div>
      <v-progress-linear
        indeterminate
        color="#fff"
        class="mb-0"
      ></v-progress-linear>
    </Card>
  </v-dialog>
</template>

<script setup>
import InputError from "@/Components/InputError.vue";
import Card from "@/Components/Card.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { filterBadWords } from "@/helpers/utilities";
import { ref, watch, computed, nextTick } from "vue";
import { useStore } from "vuex";

//States
const { postId } = defineProps({
  postId: [String, Number],
});
const store = useStore();

const reportText = ref("");

const dialogRef = ref();
const showDialog = ref(false);
const reportTextError = ref("");
//Computed
const loadingSending = computed(() => store.state.ratings.loadingSending);
const disabledSending = computed(() => store.state.ratings.disabledSending);
const loadingComment = computed(() => store.state.ratings.loadingComment);

//Watch

watch(
  () => reportText.value,
  () => {
    reportTextError.value = "";
  }
);

//Methods
const validate = () => {
  let isValid = true;
  // Reset the error messages before validating
  reportTextError.value = "";

  // Validate rating_text
  if (!reportText.value || reportText.value.trim() === "") {
    reportTextError.value = `Report text should not be empty.`;
    isValid = false;
  }

  return isValid;
};
const handleSubmit = async () => {
  if (validate()) {
    store.commit("ratings/setLoadingComment", true);
    let updatedComment;

    updatedComment = {
      body: filterBadWords(reportText),
      postId: postId,
    };

    store.dispatch("ratings/updateComment", {
      updatedComment: updatedComment,
    });
    dialogRef.value.closeDialog();
  }
};

const openDialog = () => {
  return dialogRef.value.openDialog();
};

defineExpose({ openDialog });
const textRef = ref();
const insertTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Set the value to: text before caret + four spaces + text after caret
    reportText.value =
      reportText.value.substring(0, start) +
      "      " +
      reportText.value.substring(end);

    // Put caret at right position again
    nextTick(() => {
      event.target.selectionStart = event.target.selectionEnd = start + 6;
    });
  }
};
const adjustHeight = () => {
  console.log("here");
  nextTick(() => {
    textRef.value.style.height = "auto"; // Reset height first to get the correct scrollHeight
    textRef.value.style.height = textRef.value.scrollHeight + "px";
  });
};
const onOpened = () => {
  showDialog.value = true;
  adjustHeight();
};
</script>

<style></style>
