<template>
  <!-- edit dialog -->
  <Teleport to="body">
    <CustomDialog
      :submitText="translations && translations.report_now"
      @submit="handleSubmit"
      ref="dialogRef"
      @opened="onOpened"
      :loading="loadingSending"
      :disabled="disabledSending"
      :title="translations && translations.report_post"
    >
      <form>
        <!-- response -->
        <div
          class="sm:p-4 p-3 bg-blue-100 border border-blue-200 rounded-lg mb-2"
        >
          <h3 class="text-lg font-semibold">
            {{ translations && translations.note }}:
          </h3>
          <p class="mt-1 sm:mt-2 text-blue-700">
            {{ translations && translations.confidential_report_to_admin }}
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
            :placeholder="
              translations && translations.describe_objectionable_content
            "
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
      <div class="text-white">
        {{ translations && translations.post_reporting }}
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
import {
  changesSaved,
  filterBadWords,
  somethingWentWrong,
} from "@/helpers/utilities";
import { ref, watch, nextTick, computed } from "vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { useStore } from "vuex";

//States
const { postId } = defineProps({
  postId: [String, Number],
});

const reportText = ref("");

const dialogRef = ref();
const showDialog = ref(false);
const reportTextError = ref("");
const loadingSending = ref(false);
const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);

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
    loadingSending.value = true;

    let report;

    report = {
      report_text: filterBadWords(reportText),
    };
    try {
      const response = await axios.post(
        `/api/posts/${postId}/report`,
        report,
        getAxiosConfig()
      );
      if (response.data) {
        changesSaved(response.data.message || "Post is Reported.");
      }
    } catch (err) {
      somethingWentWrong(err.response.data.message, "inherit");
    } finally {
      loadingSending.value = false;
      dialogRef.value.closeDialog();
    }
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
