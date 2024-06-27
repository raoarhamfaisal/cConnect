<template>
  <Card :shadowLevel="4" bgColor="#fff" :isInside="true" :padding="'10px'">
    <section>
      <Review
        :review="review"
        :nonEditableReview="false"
        :show-appeal="contractorId === profileId ? true : false"
        :profileId="profileId"
        :contractorId="contractorId"
      />
      <!-- response -->
      <div
        v-if="
          (!review?.review_response ||
            Object.keys(review.review_response).length < 1) &&
          contractorId === profileId
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
            >{{ translations && translations.write_your_response }}</Button
          >
          <transition name="accordion">
            <div class="mb-4 mt-3" v-if="showResponseArea">
              <textarea
                id="responseText"
                type="text"
                :rows="5"
                class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden"
                required
                v-model="response_text"
                ref="textRef"
                @keydown="insertTab"
                @input="adjustHeight"
                @paste="adjustHeight"
                :placeholder="
                  translations && translations.type_your_response_text
                "
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
      <div
        v-if="
          review.review_response &&
          Object.keys(review.review_response).length > 1
        "
      >
        <Response
          :response="review.review_response"
          :contractorId="contractorId"
          :profileId="profileId"
        />
      </div>
    </section>
  </Card>
</template>

<script setup>
import Response from "./Response.vue";
import Card from "@/Components/Card.vue";
import {
  filterBadWords,
  somethingWentWrong,
  changesSaved,
} from "@/helpers/utilities";
import Button from "@/Components/Ratings/Button.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputError from "@/Components/InputError.vue";

import Review from "./Review.vue";
import { computed, nextTick, ref, watch } from "vue";
import { useStore } from "vuex";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";

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

const turnOffReason = ref("");
const loading = ref(false);
const disabled = ref(false);

const responseError = ref("");
const turnOffReasonError = ref("");

const emit = defineEmits(["responseAdded"]);
//Computed

const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);

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
watch(
  () => showResponseArea.value,
  () => {}
);
//Methods

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
    loading.value = true;
    disabled.value = true;
    console.log("payload.responseData", responseData);

    try {
      const response = await axios.post(
        `/api/review-responses`,
        responseData,
        getAxiosConfig()
      );
      if (response.data) {
        changesSaved(
          response.data.message || "Review response added successfully!"
        );

        emit("responseAdded", response.data.review_response);
      }
    } catch (err) {
      somethingWentWrong();
    } finally {
      loading.value = false;
      disabled.value = false;
    }
    response_text.value = "";
    handleResponse();
  }
};

const handleResponse = () => {
  showResponseArea.value = !showResponseArea.value;
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

<style scoped></style>
