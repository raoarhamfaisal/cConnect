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
          {{ question.questionAnswer }}
        </div>
      </div>
    </div>
  </Card>
  <div></div>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import { ref } from "vue";
const showQuestions = ref(false);
const { questions } = defineProps(["questions"]);
console.log("questions", questions);
</script>
