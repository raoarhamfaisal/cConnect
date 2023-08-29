<template>
  <div>
    <div class="text-sm font-bold mb-3 text-gray-600">Select your Rating:</div>
    <StarRatingEditable
      :ratingGlobal="state.rating"
      @update:rating="handleRatingChange"
    />
    <InputError v-if="ratingError" class="mt-2" :message="ratingError" />
    <!-- reason -->
    <div class="mb-4">
      <div class="text-sm font-bold text-gray-600 mt-3 mb-2">
        Please provide the basis for your rating
      </div>
      <textarea
        id="rating_reason"
        type="text"
        :rows="3"
        class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
        required
        v-model="state.rating_reason"
        placeholder="Type reason for your rating"
      />
      <InputError
        v-if="ratingReasonError"
        class="mt-2"
        :message="ratingReasonError"
      />
    </div>
    <!-- Were you hired by this contractor? -->
    <div class="flex items-center justify-between sm:w-96 mb-5">
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        Were you hired by this contractor?
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
        Were you paid on time?
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
        Did you hire this contractor?
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
        Did you give full payment
      </div>
      <div class="switch" @click="toggleSwitch('paid_them')">
        <div :class="[state.paid_them ? 'switch-bg-on' : 'switch-bg-off']">
          <div
            :class="[state.paid_them ? 'switch-knob-on' : 'switch-knob-off']"
          ></div>
        </div>
      </div>
    </div>

    <!-- How did you meet this contractor? -->
    <CustomSelect
      :options="referenceList"
      :modelValue="selectedReferal"
      @update:modelValue="changeReferal"
      label="How did you meet this contractor?"
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
import { reactive, toRefs, ref, watch } from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import CustomSelect from "@/Components/CustomSelect.vue";

import InputError from "@/Components/InputError.vue";
import StarRatingEditable from "@/Components/Ratings/StarRatingEditable.vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
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
  "Contractor Referral",
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

const form = toRefs(state);
const selectedReferal = ref("Contractor Referral");
const loading = ref(false);
const disabled = ref(false);

// Error refs to store validation messages
const ratingError = ref("");
const ratingReasonError = ref("");
const emit = defineEmits(["addReview"]);

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
    ratingError.value = "Rating should be greater than 0.";
    isValid = false;
  }

  // Validate rating_reason
  if (!form.rating_reason.value || form.rating_reason.value.trim() === "") {
    ratingReasonError.value = "Rating reason should not be empty.";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (validate()) {
    try {
      loading.value = true;
      disabled.value = true;
      const review = {
        rating_text: form.rating_reason.value,
        hired_by_contractor: form.hired_by_contractor.value,
        paid_on_time: form.paid_on_time.value,
        hired_contractor: form.hired_contractor.value,
        give_full_payment: form.paid_them.value,
        how_did_you_meet_this_contractor: selectedReferal.value,
        rating: form.rating.value,
        reviewer_id: profileId,
        contractor_id: contractorId,
        is_under_appeal: false,
      };

      const response = await axios.post(`/api/reviews`, review, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, response.data);
      if (response.data) {
        changesSaved("Review Successfully Created");
        setTimeout(() => {
          emit("addReview");
        }, 2000);
      }
    } catch (err) {
      somethingWentWrong();
    } finally {
      loading.value = false;
      disabled.value = false;
    }
  }
};
</script>

<style scoped></style>
