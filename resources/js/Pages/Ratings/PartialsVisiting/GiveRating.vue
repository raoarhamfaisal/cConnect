<template>
  <div>
    <form
      @submit.prevent="form.patch(route('profile.updateGeneralInfo'))"
      class=""
    >
      <div class="text-sm font-bold mb-3 text-gray-600">
        Select your Rating:
      </div>
      <StarRatingEditable
        :ratingGlobal="0"
        @update:rating="handleRatingChange"
      />
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
          v-model="form.rating_reason"
          placeholder="Type reason for your rating"
        />
        <InputError class="mt-2" :message="form.errors.rating_reason" />
      </div>
      <!-- Were you hired by this contractor? -->
      <div class="mb-4">
        <label class="text-sm font-bold text-gray-600 block mb-2">
          Were you hired by this contractor?
        </label>
        <input
          type="radio"
          class="mr-3"
          id="hired_yes"
          value="yes"
          v-model="form.hired_by_contractor"
        />
        Yes
        <input
          type="radio"
          class="mr-3 ml-4"
          id="hired_no"
          value="no"
          v-model="form.hired_by_contractor"
        />
        No
        <InputError class="mt-2" :message="form.errors.hired_by_contractor" />
      </div>

      <!-- Were you paid on time? -->
      <div class="mb-4">
        <label class="text-sm font-bold text-gray-600 block mb-2">
          Were you paid on time?
        </label>
        <input
          type="radio"
          class="mr-3"
          id="paid_on_time_yes"
          value="yes"
          v-model="form.paid_on_time"
        />
        Yes
        <input
          type="radio"
          class="mr-3 ml-4"
          id="paid_on_time_no"
          value="no"
          v-model="form.paid_on_time"
        />
        No
        <InputError class="mt-2" :message="form.errors.paid_on_time" />
      </div>

      <!-- Did you hire this contractor? -->
      <div class="mb-4">
        <label class="text-sm font-bold text-gray-600 block mb-2">
          Did you hire this contractor?
        </label>
        <input
          type="radio"
          class="mr-3"
          id="hired_contractor_yes"
          value="yes"
          v-model="form.hired_contractor"
        />
        Yes
        <input
          type="radio"
          class="mr-3 ml-4"
          id="hired_contractor_no"
          value="no"
          v-model="form.hired_contractor"
        />
        No
        <InputError class="mt-2" :message="form.errors.hired_contractor" />
      </div>

      <!-- Did you pay them? -->
      <div class="mb-4">
        <label class="text-sm font-bold text-gray-600 block mb-2">
          Did you pay them?
        </label>
        <input
          type="radio"
          class="mr-3"
          id="paid_them_yes"
          value="yes"
          v-model="form.paid_them"
        />
        Yes
        <input
          type="radio"
          class="mr-3 ml-4"
          id="paid_them_no"
          value="no"
          v-model="form.paid_them"
        />
        No
        <InputError class="mt-2" :message="form.errors.paid_them" />
      </div>

      <!-- How did you meet this contractor? -->
      <div class="mb-4">
        <label class="text-sm font-bold text-gray-600 block mb-2">
          How did you meet this contractor?
        </label>
        <textarea
          id="how_met"
          :rows="3"
          class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="form.how_met_contractor"
          placeholder="Type how you met the contractor"
        ></textarea>
        <InputError class="mt-3" :message="form.errors.how_met_contractor" />
      </div>
    </form>
    <div class="flex items-center gap-4 mt-6 w-full">
      <PrimaryButton
        :disabled="form.processing"
        class="w-full flex justify-center"
        >Add</PrimaryButton
      >
      <Transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        class="transition ease-in-out"
      >
        <p
          v-if="form.recentlySuccessful"
          class="text-sm text-gray-600 dark:text-gray-400"
        >
          Saved.
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

import InputError from "@/Components/InputError.vue";

import StarRatingEditable from "../components/StarRatingEditable.vue";
const rating = ref(0);
import { useForm } from "@inertiajs/inertia-vue3";

function handleRatingChange(value) {
  rating.value = value;
}
const form = useForm({
  rating_reason: null,
  hired_by_contractor: null,
  paid_on_time: null,
  hired_contractor: null,
  paid_them: null,
  how_met_contractor: null,
});
</script>
