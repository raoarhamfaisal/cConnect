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
        :ratingGlobal="form.rating"
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
      <div class="flex items-center justify-between sm:w-96 mb-5">
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">
          Were you hired by this contractor?
        </div>
        <div class="switch" @click="toggleSwitch('hired_by_contractor')">
          <div
            :class="[
              form.hired_by_contractor === 1 ? 'switch-bg-on' : 'switch-bg-off',
            ]"
          >
            <div
              :class="[
                form.hired_by_contractor === 1
                  ? 'switch-knob-on'
                  : 'switch-knob-off',
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
          <div
            :class="[
              form.paid_on_time === 1 ? 'switch-bg-on' : 'switch-bg-off',
            ]"
          >
            <div
              :class="[
                form.paid_on_time === 1 ? 'switch-knob-on' : 'switch-knob-off',
              ]"
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
            :class="[
              form.hired_contractor === 1 ? 'switch-bg-on' : 'switch-bg-off',
            ]"
          >
            <div
              :class="[
                form.hired_contractor === 1
                  ? 'switch-knob-on'
                  : 'switch-knob-off',
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Did you give full  payment? -->
      <div class="flex items-center justify-between sm:w-96 mb-5">
        <div class="text-md font-bold text-gray-600 mt-3 mb-2">
          Did you give full payment?
        </div>
        <div class="switch" @click="toggleSwitch('paid_them')">
          <div
            :class="[form.paid_them === 1 ? 'switch-bg-on' : 'switch-bg-off']"
          >
            <div
              :class="[
                form.paid_them === 1 ? 'switch-knob-on' : 'switch-knob-off',
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- How did you meet this contractor? -->
      <div>
        <label class="text-md font-bold text-gray-600 block mb-2">
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

import StarRatingEditable from "@/Components/Ratings/StarRatingEditable.vue";
const rating = ref(0);
import { useForm } from "@inertiajs/inertia-vue3";

const form = useForm({
  rating_reason: null,
  hired_by_contractor: 0,
  paid_on_time: 0,
  hired_contractor: 0,
  paid_them: 0,
  how_met_contractor: null,
  rating: null,
});
function handleRatingChange(value) {
  form.rating = value;
}

const toggleSwitch = (field) => {
  form[field] = form[field] === 1 ? 0 : 1;
};
</script>
