<template>
  <section>
    <Review
      :review="review"
      :nonEditableReview="false"
      :profileId="profileId"
      :contractorId="contractorId"
    />

    <!-- response -->
    <div
      v-if="
        !review?.review_response ||
        Object.keys(review.review_response).length < 1
      "
    >
      <div class="py-4 border-t-2 border-b-2 border-gray-300">
        <Button
          @onSelect="handleResponse"
          :style="{
            boxShadow:
              '0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
            padding: '5px 10px',
          }"
          class="w-full text-lg text-gray-600 font-semibold text-left rounded-lg"
          >Write Your Response</Button
        >
        <transition name="accordion">
          <div class="mb-4 mt-3" v-if="showResponseArea">
            <textarea
              id="responseText"
              type="text"
              :rows="5"
              class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
              required
              v-model="response_text"
              placeholder="Type your response text"
            />
            <InputError
              v-if="responseError"
              class="mt-2"
              :message="responseError"
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
        </transition>
      </div>
    </div>
    <!-- appeal -->
    <!-- <div class="py-4 border-t-2 border-b-2 border-gray-300">
      <Button
        @onSelect="handleAppeal"
        :style="{
          boxShadow:
            '0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
          padding: '5px 10px',
        }"
        class="w-full text-lg text-gray-600 font-semibold text-left rounded-lg"
        >{{
          form.isAppealed === 1
            ? "Turn off Your Appeal"
            : "Submit your Appeal for this Rating"
        }}</Button
      >
      <transition name="accordion">
        <div v-if="showAppealArea">
          <div class="mb-4 mt-3">
            <textarea
              id="rating_reason"
              type="text"
              :rows="3"
              v-if="form.isAppealed === 1"
              class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
              required
              v-model="form.appealReason"
              placeholder="Type your reason for the removal of appeal"
            />
            <InputError class="mt-2" :message="form.errors.turnOffReason" />

            <textarea
              id="rating_reason"
              type="text"
              :rows="3"
              v-if="form.isAppealed === 0"
              class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
              required
              v-model="form.turnOffReason"
              placeholder="Type your reason for your appeal"
            />

            <InputError class="mt-2" :message="form.errors.appealReason" />

            <div v-if="form.isAppealed === 0" class="mt-3 block">
              Send any supporting document to
              <a
                class="underline text-sky-600"
                href="mailto:appeal@tContractor.com"
                target="_blank"
              >
                appeal@tContractor.com
              </a>
            </div>
            <div class="flex items-center gap-4 mt-6 w-full">
              <PrimaryButton
                :disabled="form.processing"
                class="w-full flex justify-center"
                :style="{
                  backgroundColor: '#0e0c2c',
                }"
                >{{
                  form.isAppealed === 1 ? "Submit" : "Submit your Appeal"
                }}</PrimaryButton
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
        </div>
      </transition>
    </div> -->
    <div
      v-if="
        review.review_response && Object.keys(review.review_response).length > 1
      "
    >
      <Response
        :response="review.review_response"
        :contractorId="contractorId"
        :profileId="profileId"
      />
    </div>
  </section>
</template>

<script setup>
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputError from "@/Components/InputError.vue";

import Response from "../PartialsVisiting/Response.vue";
import Review from "../PartialsVisiting/Review.vue";
import Button from "@/Components/Ratings/Button.vue";
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";

//States

const { review } = defineProps({
  review: {
    type: Object,
  },
  profileId: {
    type: Number,
  },
  contractorId: {
    type: Number,
  },
});

const store = useStore();
const response_text = ref("");
const showResponseArea = ref(false);
const showAppealArea = ref(false);
const dialogRef = ref();
const responseError = ref("");

//Computed
const loading = computed(() => store.state.ratings.loading);
const disabled = computed(() => store.state.ratings.disabled);

//Watch

watch(
  () => response_text.value,
  () => {
    responseError.value = "";
  }
);

//Methods
const validate = () => {
  let isValid = true;
  // Reset the error messages before validating
  responseError.value = "";

  // Validate rating_text
  if (!response_text.value || response_text.value.trim() === "") {
    responseError.value = "Response should not be empty.";
    isValid = false;
  }

  return isValid;
};
const handleSubmit = async () => {
  if (validate()) {
    const responseData = {
      response_text: response_text.value,
      review_id: review.id,
    };
    await store.dispatch("ratings/createResponse", responseData);
  }
};

const handleResponse = () => {
  showResponseArea.value = !showResponseArea.value;
};
const handleAppeal = () => {
  showAppealArea.value = !showAppealArea.value;
};
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.accordion-enter-from, .accordion-leave-to /* .accordion-leave-active in <2.1.8 */ {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 300px; /* This value might need to be adjusted depending on the expected max height of your content */
  opacity: 1;
}
</style>
