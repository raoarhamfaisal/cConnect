<template>
  <section>
    <Review
      :review="review"
      :nonEditableReview="false"
      :profileId="profileId"
      :show-appeal="true"
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
              class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
              required
              v-model="response_text"
              ref="textRef"
              @keydown="insertTab"
              @input="adjustHeight"
              @paste="adjustHeight"
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

    <!-- Turn off appeal -->
    <!-- <div
      v-if="review.is_under_appeal && !review.off_appeal_reason"
      class="py-4 border-y-2 border-gray-300"
    >
      <Button
        @onSelect="handleAppeal"
        :style="{
          boxShadow:
            '0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
          padding: '5px 10px',
        }"
        class="w-full text-lg text-gray-600 font-semibold text-left rounded-lg"
        >Turn off Your Appeal</Button
      >
      <transition name="accordion">
        <div v-if="showAppealArea">
          <div class="mb-4 mt-3">
            <textarea
              id="appealReason"
              type="text"
              :rows="3"
              v-if="review.is_under_appeal"
              class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
              required
              v-model="turnOffReason"
              placeholder="Type your reason for the removal of appeal"
            />
            <InputError
              v-if="turnOffReasonError"
              class="mt-2"
              :message="turnOffReasonError"
            />

            <div class="flex items-center gap-4 mt-6 w-full">
              <PrimaryButton
                :style="{
                  height: '42px',
                }"
                @click="handleAppealSubmit"
                :disabled="disabled"
                class="w-full flex justify-center gap-2"
              >
                <div>Send</div>
                <img
                  v-show="loading"
                  src="/images/avatars/Spinner.gif"
                  alt="spinner"
                  width="30"
              /></PrimaryButton>
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

import Response from "@/Components/Ratings/Contractor/PartialsVisiting/Response.vue";
import Review from "@/Components/Ratings/Contractor/PartialsVisiting/Review.vue";
import Button from "@/Components/Ratings/Button.vue";
import { ref, watch, computed, nextTick } from "vue";
import { useStore } from "vuex";
import { filterBadWords } from "@/helpers/utilities";

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

const turnOffReason = ref("");

const responseError = ref("");
const turnOffReasonError = ref("");

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

watch(
  () => turnOffReason.value,
  () => {
    turnOffReasonError.value = "";
  }
);
//Methods

const validateTurnOffReason = () => {
  let isValid = true;
  // Reset the error messages before validating
  turnOffReasonError.value = "";

  // Validate rating_text
  if (!turnOffReason.value || turnOffReason.value.trim() === "") {
    turnOffReasonError.value = "Turn off Reason should not be empty.";
    isValid = false;
  }

  return isValid;
};

const validateResponse = () => {
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
  if (validateResponse()) {
    const responseData = {
      response_text: filterBadWords(response_text),
      review_id: review.id,
    };

    await store.dispatch("ratings/createResponse", { responseData });
    response_text.value = "";
    handleResponse();
  }
};
const handleAppealSubmit = async () => {
  if (review.is_under_appeal) {
    if (validateTurnOffReason()) {
      const appealTurnOffData = {
        off_appeal_reason: filterBadWords(turnOffReason),
        reviewId: review.id,
      };
      await store.dispatch("ratings/sendTurnOffApeal", appealTurnOffData);
    }
  }
};

const handleResponse = () => {
  showResponseArea.value = !showResponseArea.value;
};
const handleAppeal = () => {
  showAppealArea.value = !showAppealArea.value;
};
const textRef = ref();
const insertTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Set the value to: text before caret + four spaces + text after caret
    response_text.value =
      response_text.value.substring(0, start) +
      "      " +
      response_text.value.substring(end);

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
</script>
