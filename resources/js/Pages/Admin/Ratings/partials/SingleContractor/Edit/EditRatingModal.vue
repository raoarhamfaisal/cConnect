<template>
  <!-- edit dialog -->
  <CustomDialog
    submitText="Save Change"
    @submit="handleSubmit"
    ref="dialogRef"
    title="Edit Rating"
  >
    <form @submit.prevent="handleSubmit">
      <div class="text-md font-bold mb-3 text-gray-600">
        Select your Rating:
      </div>
      <StarRatingEditable
        :ratingGlobal="form.rating"
        @update:rating="handleRatingChange"
      />
      <!-- review reason -->
      <div class="mb-4">
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">Review Text</div>
        <textarea
          id="rating_reason"
          type="text"
          :rows="5"
          class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="form.rating_reason"
          placeholder="Type reason for your rating"
        />
        <InputError class="mt-2" :message="form.errors.rating_reason" />
      </div>

      <!-- QuestionsSwitch -->
      <div class="border-t-2 border-b-2 border-gray-200 pt-4 pb-4 mb-3">
        <div class="text-xl font-bold">Feedback Qustions</div>
      </div>
      <div
        v-for="(question, index) in form.questionsSwitch"
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
        @update:modelValue="
          (val) => {
            console.log(val);
            selectedReferal = val;
          }
        "
        label="How did you meet this contractor?"
      />
    </form>
  </CustomDialog>
  <!-- ConfirmDialog -->

  <CustomDialog
    submitText="Save Change"
    @submit="handleSubmit"
    ref="submitRef"
    title="Are you sure? You want to change this Rating?"
  >
    <form @submit.prevent="handleSubmit">
      <!-- review reason -->
      <div class="mb-4">
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">
          Reason for Editing the Rating
        </div>
        <textarea
          id="editing_reason"
          type="text"
          :rows="5"
          class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="form.editing_reason"
          placeholder="Type reason for Editing the rating"
        />
        <InputError class="mt-2" :message="form.errors.editing_reason" />
      </div>
    </form>
  </CustomDialog>
</template>

<script setup>
import InputError from "@/Components/InputError.vue";
import { useForm } from "@inertiajs/inertia-vue3";
import CustomSelect from "@/Components/CustomSelect.vue";

import StarRatingEditable from "@/Components/Ratings/StarRatingEditable.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { ref } from "vue";
const { review } = defineProps(["review"]);

const form = useForm({
  rating: review?.rating,
  questionsSwitch: review?.questionsSwitch,
  questionsText: review?.questionsText,
  rating_reason: review?.rating_reason,
  onApealGranted: null,
  offAppealGranted: null,
  editing_reason: null,
});
const submitRef = ref();
const dialogRef = ref();

const toggleSwitch = (index) => {
  form.questionsSwitch[index].questionAnswer =
    form.questionsSwitch[index].questionAnswer === 1 ? 0 : 1;
};
function handleRatingChange(value) {
  form.rating = value;
}
const handleSubmit = () => {
  console.log("here", form);
  //   open edit confirmDialog
  submitRef.value.openDialog();
  // form.patch(route('profile.updateGeneralInfo'))
};

const openDialogEdit = () => {
  return dialogRef.value.openDialog();
};
const referenceList = [
  "Contractor Referral",
  "Friend Referral",
  "Other Contractor",
  "Job Site",
  "Store/Gas Station",
  "Other",
];
const selectedReferal = ref("Job Site");
defineExpose({ openDialogEdit });
</script>

<style></style>
