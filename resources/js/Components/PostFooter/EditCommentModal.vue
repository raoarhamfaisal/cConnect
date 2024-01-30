<template>
  <!-- edit dialog -->
  <Teleport to="body">
    <CustomDialog
      :submitText="translations && translations.update"
      @submit="handleSubmit"
      ref="dialogRef"
      @opened="onOpened"
      :loading="loadingSending"
      :disabled="disabledSending"
      :title="`${translations && translations.edit} ${
        isReply
          ? translations && translations.reply_first_cap
          : translations && translations.comment
      }`"
    >
      <form @submit.prevent="handleSubmit">
        <!-- response -->
        <div class="mb-4">
          <textarea
            id="commentText"
            type="text"
            :rows="1"
            class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden"
            required
            v-model="comment_text"
            ref="textRef"
            @keydown="insertTab"
            @input="adjustHeight"
            @paste="adjustHeight"
            :placeholder="translations && translations.type_your_response_text"
          />
          <InputError
            v-if="responseError"
            class="mt-2"
            :message="responseError"
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
      <div class="text-white">
        {{ translations && translations.updating }}
        {{
          isReply ? translations && translations.reply_first_cap : "Comment"
        }}...
      </div>
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
const { commentText, commentId, isReply } = defineProps({
  commentText: String,
  commentId: [String, Number],
  isReply: {
    default: false,
    type: Boolean,
  },
});
const store = useStore();

const comment_text = ref(commentText);

const dialogRef = ref();
const showDialog = ref(false);
const responseError = ref("");
//Computed
const loadingSending = computed(() => store.state.ratings.loadingSending);
const disabledSending = computed(() => store.state.ratings.disabledSending);
const loadingComment = computed(() => store.state.ratings.loadingComment);
const translations = computed(() => store.state.ratings.translations);

//Watch

watch(
  () => comment_text.value,
  () => {
    responseError.value = "";
  }
);
watch(
  () => commentText,
  () => {
    comment_text.value = commentText;
  }
);
watch(
  () => loadingSending.value,
  (newVal) => {
    if (!newVal) {
      console.log(newVal, "commentloadig sending");
      showDialog.value = false;
    }
  }
);

//Methods
const validate = () => {
  let isValid = true;
  // Reset the error messages before validating
  responseError.value = "";

  // Validate rating_text
  if (!comment_text.value || comment_text.value.trim() === "") {
    responseError.value = `${
      isReply ? translations && translations.reply_first_cap : "Comment"
    } should not be empty.`;
    isValid = false;
  }

  return isValid;
};
const handleSubmit = async () => {
  if (validate()) {
    store.commit("ratings/setLoadingComment", true);
    let updatedComment;

    updatedComment = {
      body: filterBadWords(comment_text),
      commentId: commentId,
      isReply: isReply,
    };

    store.dispatch("ratings/updateComment", {
      updatedComment: updatedComment,
    });
    dialogRef.value.closeDialog();
  }
};

const openDialogEdit = () => {
  return dialogRef.value.openDialog();
};

defineExpose({ openDialogEdit });
const textRef = ref();
const insertTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Set the value to: text before caret + four spaces + text after caret
    comment_text.value =
      comment_text.value.substring(0, start) +
      "      " +
      comment_text.value.substring(end);

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
  console.log("dialog opened");
  adjustHeight();
};
</script>

<style></style>
