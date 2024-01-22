<template>
  <div class="pl-2 text-md font-bold text-gray-600 mt-3 mb-3">
    Feedback from Contractor &nbsp;
    <span
      v-if="!showQuestions"
      @click="showQuestions = true"
      class="cursor-pointer text-sky-700 font-semibold text-sm"
    >
      {{ "Show Questions" }}
    </span>
    <span
      v-if="showQuestions"
      @click="showQuestions = false"
      class="cursor-pointer text-sky-700 font-semibold text-sm"
    >
      Hide Questions
    </span>
  </div>
  <Card
    v-if="showQuestions"
    :shadowLevel="0"
    :isInside="true"
    bgColor="#f1f3f5"
    padding="10px"
  >
    <div
      class="grid grid-cols-1 xs:grid-cols-2 gap-x-2 items-center mt-2 gap-y-2 xs:gap-x-4 px-2 xs:px-0 sm:px-2 xl:px-8"
    >
      <div
        class="flex justify-between items-center gap-8"
        v-for="(question, index) in questionsSwitch"
        :key="index"
      >
        <div class="pl-2 text-sm xs:text-md font-bold text-gray-600 mt-3 mb-2">
          {{ question.question }}
        </div>
        <div class="switch">
          <div
            :class="[
              question.questionAnswer === 1
                ? 'switch-bg-on opacity-30'
                : 'switch-bg-off',
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
    </div>
    <div
      class="px-2 xs:px-0 sm:px-2 xl:px-8"
      v-for="(question, index) in questionsText"
      :key="index"
    >
      <div class="pl-2 text-sm xs:text-md font-bold text-gray-600 mt-3 mb-2">
        {{ question.question }}
      </div>
      <div class="pl-2 text-sm xs:text-md text-gray-500 mb-2">
        {{
          showAnswer
            ? question.questionAnswer
            : question.questionAnswer.substring(0, 400) +
              (question.questionAnswer.length > 400 ? "..." : "")
        }}
        <span
          v-if="!showAnswer && question.questionAnswer.length > 400"
          @click="showAnswer = true"
          class="cursor-pointer text-sky-700"
        >
          See more
        </span>
        <span
          v-if="showAnswer && question.questionAnswer.length > 400"
          @click="showAnswer = false"
          class="cursor-pointer text-sky-700"
        >
          See less
        </span>
      </div>
    </div>
  </Card>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import { ref } from "vue";

const { questionsSwitch, questionsText } = defineProps([
  "questionsSwitch",
  "questionsText",
]);
const showQuestions = ref(false);
const showAnswer = ref(false);
</script>
<style scoped></style>
