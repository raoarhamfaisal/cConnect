<template>
  <section>
    <Review :review="review" :contractor="contractor" />
    <QualifyingQuestions
      v-if="review?.questions?.length > 0"
      :questions="review.questions"
    />
    <!-- response -->
    <div v-if="!review?.response">
      <div class="py-4 border-t-2 border-gray-300">
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
              id="rating_reason"
              type="text"
              :rows="3"
              class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
              required
              v-model="form.response"
              placeholder="Type your response"
            />
            <InputError class="mt-2" :message="form.errors.response" />
            <div class="flex items-center gap-4 mt-6 w-full">
              <PrimaryButton
                :disabled="form.processing"
                class="w-full flex justify-center"
                :style="{
                  backgroundColor: '#0e0c2c',
                }"
                >Submit Your Response</PrimaryButton
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
        </transition>
      </div>
    </div>
    <!-- appeal -->
    <div class="py-4 border-t-2 border-b-2 border-gray-300">
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
            <InputError class="mt-2" :message="form.errors.appealReason" />
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
            <InputError class="mt-2" :message="form.errors.turnOffReason" />
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
    </div>
    <div v-if="review?.response">
      <Response :response="review.response" :contractor="contractor" />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Response from "../PartialsVisiting/Response.vue";
import Review from "../PartialsVisiting/Review.vue";
import Button from "@/Components/Ratings/Button.vue";
import QualifyingQuestions from "./QualifyingQuestions.vue";
import { useForm } from "@inertiajs/inertia-vue3";

defineProps(["review", "contractor"]);
const showResponseArea = ref(false);
const showAppealArea = ref(false);

const handleResponse = () => {
  showResponseArea.value = !showResponseArea.value;
};
const handleAppeal = () => {
  showAppealArea.value = !showAppealArea.value;
};
const form = useForm({
  response: null,
  appealReason: null,
  turnOffReason: null,
  isAppealed: 0,
});
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
