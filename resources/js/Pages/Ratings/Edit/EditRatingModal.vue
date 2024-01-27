<template>
  <!-- edit dialog -->
  <CustomDialog
    submitText="Save Changes"
    @submit="handleSubmit"
    :loading="loading"
    :disabled="disabled"
    ref="dialogRef"
    title="Edit Rating"
  >
    <form @submit.prevent="handleSubmit">
      <div class="text-md font-bold mb-3 text-gray-600">
        Select your Rating:
      </div>
      <StarRatingEditable
        :ratingGlobal="state.rating"
        @update:rating="handleRatingChange"
      />
      <InputError v-if="ratingError" class="mt-2" :message="ratingError" />
      <!-- review reason -->
      <div class="mb-4">
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">Review Text</div>
        <textarea
          id="rating_text"
          type="text"
          :rows="5"
          class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="state.rating_text"
          placeholder="Type reason for your rating"
        />
        <InputError
          v-if="ratingReasonError"
          class="mt-2"
          :message="ratingReasonError"
        />
      </div>
      <!-- QuestionsSwitch -->
      <div
        v-for="(question, index) in state.questionsSwitch"
        :key="index"
        class="flex items-center justify-between sm:w-96 mb-5"
      >
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">
          {{ question.question }}
        </div>
        <div class="switch" @click="toggleSwitch(index)">
          <div
            :class="[
              question.questionAnswer === 1 ? 'switch-bg-on' : 'switch-bg-off',
            ]"
          >
            <div
              :class="[
                question.questionAnswer === 1
                  ? 'switch-knob-on'
                  : 'switch-knob-off',
              ]"
            ></div>
          </div>
        </div>
      </div>

      <CustomSelect
        :options="referenceList"
        :modelValue="selectedReferal"
        @update:modelValue="changeReferal"
        label="How did you meet this contractor?"
      />
    </form>
  </CustomDialog>
</template>

<script setup>
import InputError from "@/Components/InputError.vue";
import CustomSelect from "@/Components/CustomSelect.vue";
import StarRatingEditable from "@/Components/Ratings/StarRatingEditable.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { computed, reactive, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { filterBadWords } from "@/helpers/utilities";

// States
const { review, questionsSwitch, profileId, contractorId } = defineProps({
  review: {
    type: Object,
  },
  questionsSwitch: {
    type: Array,
  },
  contractorId: {
    type: Number,
  },
  profileId: {
    type: Number,
  },
});
const store = useStore();
const ratingError = ref("");
const ratingReasonError = ref("");

const state = reactive({
  rating: Number(parseFloat(review.rating).toFixed(1)),
  questionsSwitch: questionsSwitch,
  how_did_you_meet_this_contractor: review?.how_did_you_meet_this_contractor,
  rating_text: review?.rating_text,
});
const form = toRefs(state);

const dialogRef = ref();
const referenceList = [
  "Contractor Referral",
  "Friend Referral",
  "Other Contractor",
  "Job Site",
  "Store/Gas Station",
  "Other",
];
const selectedReferal = ref(review.how_did_you_meet_this_contractor);

//Computed
const loading = computed(() => store.state.ratings.loading);
const disabled = computed(() => store.state.ratings.disabled);

//Watch

watch(
  () => form.rating.value,
  () => {
    ratingError.value = "";
  }
);

watch(
  () => form.rating_text.value,
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
const toggleSwitch = (index) => {
  console.log(form.questionsSwitch.value[index].questionAnswer);
  form.questionsSwitch.value[index].questionAnswer =
    form.questionsSwitch.value[index].questionAnswer === 1 ? 0 : 1;
};
const validate = () => {
  let isValid = true;
  // Reset the error messages before validating
  ratingError.value = "";
  ratingReasonError.value = "";

  // Validate rating value
  if (form.rating.value <= 0 || form.rating.value > 5) {
    ratingError.value = "Rating should be greater than 0.";
    isValid = false;
  }

  // Validate rating_text
  if (!form.rating_text.value || form.rating_text.value.trim() === "") {
    ratingReasonError.value = "Rating reason should not be empty.";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (validate()) {
    const updateReview = {
      rating_text: filterBadWords(form.rating_text),
      hired_by_contractor:
        form.questionsSwitch.value[0].questionAnswer === 1 ? true : false,
      paid_on_time:
        form.questionsSwitch.value[1].questionAnswer === 1 ? true : false,
      hired_contractor:
        form.questionsSwitch.value[2].questionAnswer === 1 ? true : false,
      give_full_payment:
        form.questionsSwitch.value[3].questionAnswer === 1 ? true : false,
      how_did_you_meet_this_contractor: selectedReferal.value,
      rating: form.rating.value,
      reviewer_id: profileId,
      contractor_id: contractorId,
    };
    await store.dispatch("ratings/updateReview", {
      reviewId: review.id,
      review: updateReview,
    });
    console.log(updateReview);
    dialogRef.value.closeDialog();
  }
};
const openDialogEdit = () => {
  return dialogRef.value.openDialog();
};

defineExpose({ openDialogEdit });
</script>

<style></style>
