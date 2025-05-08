<template>
  <div>
    <div class="text-sm font-bold mb-3 text-gray-600">
      {{ translations && translations.select_your_rating }}
    </div>
    <StarRatingEditable
      :ratingGlobal="state.rating"
      @update:rating="handleRatingChange"
    />
    <InputError v-if="ratingError" class="mt-2" :message="ratingError" />
    <!-- reason -->
    <div class="mb-4">
      <div class="text-sm font-bold text-gray-600 mt-3 mb-2">
        {{
          translations && translations.please_provide_the_basis_for_your_rating
        }}
      </div>

      <textarea
        id="rating_reason"
        type="text"
        :rows="3"
        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden"
        required
        v-model="state.rating_reason"
        ref="textRef"
        @keydown="insertTab"
        @input="adjustHeight"
        @paste="adjustHeight"
        :placeholder="translations && translations.type_reason_for_your_rating"
      />
      <InputError
        v-if="ratingReasonError"
        class="mt-2"
        :message="ratingReasonError"
      />
    </div>

    <!-- Supporting Document Upload -->
    <div class="mb-4">
      <label
        for="supportingDocument"
        class="block text-sm font-bold text-gray-600 mb-2"
      >
        {{
          (translations && translations.supporting_document) ||
          "Supporting Document (Optional)"
        }}
        <span class="italic lowercase font-normal text-xs">
          Upload any document that supports your rating
        </span>
      </label>

      <file-pond
        name="supportingDocument"
        ref="pond"
        allowFileTypeValidation="true"
        :allowMultiple="false"
        acceptedFileTypes="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
        labelFileTypeNotAllowed="Only PDF, DOC, DOCX, JPG, and PNG files are allowed"
        allowFileSizeValidation="true"
        maxFileSize="10MB"
        labelMaxFileSizeExceeded="Maximum file size is 10MB"
        :files="supportingDoc"
        :server="{
          url: '',
          timeout: 7000,
          process: {
            url: '/upload-supporting-document',
            method: 'POST',
            headers: {
              'X-CSRF-TOKEN': $page.props.csrf_token,
            },
            withCredentials: false,
            onload: handleDocumentLoad,
            onerror: handleDocumentError,
          },
          revert: handleDocumentRevert,
        }"
        v-on:init="handleDocumentInit"
        @processfile="handleDocumentProcessed"
        @processfilerevert="handleDocumentReverted"
        :labelIdle="`${
          (translations && translations.drag_and_drop_files_or) ||
          'Drag & Drop or'
        } <span class='filepond--label-action'> ${
          (translations && translations.browse) || 'Browse'
        } </span>`"
      />
    </div>

    <!-- Were you hired by this contractor? -->
    <div class="flex items-center justify-between sm:w-96 mb-5">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        {{ translations && translations.were_you_hired_by_this_contractor }}
      </div>
      <div class="switch" @click="toggleSwitch('hired_by_contractor')">
        <div
          :class="[
            state.hired_by_contractor ? 'switch-bg-on' : 'switch-bg-off',
          ]"
        >
          <div
            :class="[
              state.hired_by_contractor ? 'switch-knob-on' : 'switch-knob-off',
            ]"
          ></div>
        </div>
      </div>
    </div>
    <!-- Were you paid on time? -->
    <div class="flex items-center justify-between sm:w-96 mb-5">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        {{ translations && translations.were_you_paid_on_time }}
      </div>
      <div class="switch" @click="toggleSwitch('paid_on_time')">
        <div :class="[state.paid_on_time ? 'switch-bg-on' : 'switch-bg-off']">
          <div
            :class="[state.paid_on_time ? 'switch-knob-on' : 'switch-knob-off']"
          ></div>
        </div>
      </div>
    </div>

    <!-- Did you hire this contractor? -->
    <div class="flex items-center justify-between sm:w-96 mb-5">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        {{ translations && translations.did_you_hire_this_contractor }}
      </div>
      <div class="switch" @click="toggleSwitch('hired_contractor')">
        <div
          :class="[state.hired_contractor ? 'switch-bg-on' : 'switch-bg-off']"
        >
          <div
            :class="[
              state.hired_contractor ? 'switch-knob-on' : 'switch-knob-off',
            ]"
          ></div>
        </div>
      </div>
    </div>

    <!-- Did you give full  payment -->
    <div class="flex items-center justify-between sm:w-96 mb-5">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        {{ translations && translations.did_you_give_full_payment }}
      </div>
      <div class="switch" @click="toggleSwitch('paid_them')">
        <div :class="[state.paid_them ? 'switch-bg-on' : 'switch-bg-off']">
          <div
            :class="[state.paid_them ? 'switch-knob-on' : 'switch-knob-off']"
          ></div>
        </div>
      </div>
    </div>

    <!-- {{translations && translations.how_did_you_meet_this_contractor}} -->
    <CustomSelect
      :options="referenceList"
      :modelValue="selectedReferal"
      @update:modelValue="changeReferal"
      :label="translations && translations.how_did_you_meet_this_contractor"
    />

    <div class="flex items-center gap-4 mt-6 w-full">
      <PrimaryButton
        :style="{
          height: '42px',
        }"
        @click="handleSubmit"
        :disabled="disabled"
        class="w-full flex justify-center gap-2"
      >
        <div>Add</div>
        <img
          v-show="loading"
          src="/images/avatars/Spinner.gif"
          alt="spinner"
          width="30"
      /></PrimaryButton>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref, watch, nextTick, computed } from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import { filterBadWords } from "@/helpers/utilities";

import InputError from "@/Components/InputError.vue";
import StarRatingEditable from "@/Components/Ratings/StarRatingEditable.vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { useStore } from "vuex";

// Import FilePond and plugins
import VueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// Import FilePond CSS
import "filepond/dist/filepond.min.css";

// Create FilePond component with plugins
const FilePond = VueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

//Props

const { profileId, contractorId } = defineProps({
  profileId: {
    type: Number,
  },
  contractorId: {
    type: Number,
  },
});
//States
const referenceList = [
  "cConnect Referral",
  "Friend Referral",
  "Other Contractor",
  "Job Site",
  "Store/Gas Station",
  "Other",
];

const state = reactive({
  rating_reason: "",
  hired_by_contractor: false,
  paid_on_time: false,
  hired_contractor: false,
  paid_them: false,
  rating: 0,
});

const store = useStore();
const form = toRefs(state);
const selectedReferal = ref("cConnect Referral");
const loading = ref(false);
const disabled = ref(false);
const supportingDoc = ref([]);
const supportingDocPath = ref("");

// Error refs to store validation messages
const ratingError = ref("");
const ratingReasonError = ref("");
const emit = defineEmits(["addReview"]);

// Computed

const translations = computed(() => store.getters.translations);

//Watch

watch(
  () => form.rating.value,
  () => {
    ratingError.value = "";
  }
);

watch(
  () => form.rating_reason.value,
  () => {
    ratingReasonError.value = "";
  }
);

//Methods

function handleRatingChange(value) {
  form.rating.value = value;
}
const changeReferal = (value) => {
  selectedReferal.value = value;
};
const toggleSwitch = (field) => {
  form[field].value = form[field].value ? false : true;
};

const validate = () => {
  let isValid = true;
  // Reset the error messages before validating
  ratingError.value = "";
  ratingReasonError.value = "";

  // Validate rating value
  if (form.rating.value <= 0 || form.rating.value > 5) {
    ratingError.value =
      translations.value &&
      translations.value.rating_should_be_greate_than_zero;
    isValid = false;
  }

  // Validate rating_reason
  if (!form.rating_reason.value || form.rating_reason.value.trim() === "") {
    ratingReasonError.value =
      translations.value && translations.value.rating_should_not_be_empty;
    isValid = false;
  }

  return isValid;
};

// FilePond document handling methods
const handleDocumentInit = () => {
  // Initialize FilePond for supporting document
  supportingDoc.value = [];
  supportingDocPath.value = "";
};

const handleDocumentLoad = (response) => {
  console.log("Document uploaded, received path:", response);
  // Set the document path when uploaded
  supportingDocPath.value = response;
  return response;
};

const handleDocumentError = (error) => {
  console.error("Document upload error:", error);
  somethingWentWrong("Error uploading document", "error");
};

const handleDocumentRevert = (filename, load) => {
  // Clear the document path when removed
  supportingDocPath.value = "";
  load();
};

const handleDocumentProcessed = () => {
  // Document processing completed
  console.log("Document processed, path:", supportingDocPath.value);
};

const handleDocumentReverted = () => {
  // Document reverted
  supportingDocPath.value = "";
};

const handleSubmit = async () => {
  if (validate()) {
    try {
      console.log("profileId", profileId);
      loading.value = true;
      disabled.value = true;
      const review = {
        rating_text: filterBadWords(form.rating_reason),
        hired_by_contractor: form.hired_by_contractor.value,
        paid_on_time: form.paid_on_time.value,
        hired_contractor: form.hired_contractor.value,
        give_full_payment: form.paid_them.value,
        how_did_you_meet_this_contractor: selectedReferal.value,
        rating: form.rating.value,
        reviewer_id: profileId,
        contractor_id: contractorId,
        is_under_appeal: false,
        supporting_document: supportingDocPath.value,
      };

      const response = await axios.post(
        `/api/reviews`,
        review,
        getAxiosConfig()
      );
      if (response.data) {
        changesSaved("Review Successfully Created");
        setTimeout(() => {
          emit("addReview");
          console.log("this executed3");

          store.commit("ratings/setShouldLoadPosts", false);
          store.commit("ratings/setShouldFetchPostsOnClose", true);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      somethingWentWrong(err.response.data.message, 500);
    } finally {
      loading.value = false;
      disabled.value = false;
    }
  }
};

const textRef = ref();
const insertTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Set the value to: text before caret + four spaces + text after caret
    state.rating_reason =
      state.rating_reason.substring(0, start) +
      "      " +
      state.rating_reason.substring(end);

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
</script>

<style scoped></style>
