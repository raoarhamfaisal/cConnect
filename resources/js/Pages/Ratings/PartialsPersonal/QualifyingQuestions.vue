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
    <div>
      <div v-for="(question, index) in questions" :key="index">
        <div class="pl-2 text-md font-bold text-gray-600 mt-3 mb-2">
          {{ question.question }}
        </div>
        <div class="pl-2 text-md text-gray-500 mb-2">
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
    </div>
  </Card>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import { ref } from "vue";

const { questions } = defineProps(["questions"]);
const showQuestions = ref(false);
const showAnswer = ref(false);
</script>
