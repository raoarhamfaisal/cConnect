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
          id="rating_text"
          type="text"
          :rows="5"
          class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="form.rating_text"
          placeholder="Type reason for your rating"
        />
        <!-- <InputError class="mt-2" :message="form.errors.rating_text" /> -->
      </div>
      <!-- QuestionsSwitch -->
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
</template>

<script setup>
import InputError from "@/Components/InputError.vue";
import { useForm } from "@inertiajs/inertia-vue3";
import CustomSelect from "@/Components/CustomSelect.vue";
import StarRatingEditable from "@/Components/Ratings/StarRatingEditable.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { ref } from "vue";
const { review, questionsSwitch } = defineProps({
  review: {
    type: Object,
  },
  questionsSwitch: {
    type: Array,
  },
});

const form = useForm({
  rating: Number(parseFloat(review.rating).toFixed(1)),
  questionsSwitch: questionsSwitch,
  how_did_you_meet_this_contractor: review?.how_did_you_meet_this_contractor,
  rating_text: review?.rating_text,
  onApealGranted: null,
  offAppealGranted: null,
  editing_reason: null,
});
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
  // form.patch(route('profile.updateGeneralInfo'))
};

const openDialogEdit = () => {
  return dialogRef.value.openDialog();
};
const referenceList = [
  "Contractor Referral",
  review.how_did_you_meet_this_contractor,
  "Friend Referral",
  "Other Contractor",
  "Job Site",
  "Store/Gas Station",
  "Other",
];
const selectedReferal = ref(review.how_did_you_meet_this_contractor);

defineExpose({ openDialogEdit });
</script>

<style></style>
