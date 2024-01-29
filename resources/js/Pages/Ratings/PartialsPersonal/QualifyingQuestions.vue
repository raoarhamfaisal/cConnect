<template>
  <!-- <div class="pl-2 text-md font-bold text-gray-600 mt-3 mb-3">
    Feedback from Contractor
  </div> -->
  <Card
    :shadowLevel="0"
    :isInside="true"
    :bgColor="questionsBgColor"
    padding="2px"
    class="mt-2"
  >
    <div
      class="grid grid-cols-2 gap-x-1 items-center gap-y-2 mt-2 mb-2 xs:gap-x-2 xs:px-0 sm:px-2 xl:px-8 w-full"
    >
      <div
        class="flex items-center sx:gap-2 w-full xs:gap-4"
        v-for="question in questionsSwitch"
        :key="question.id"
      >
        <Icon
          color="#099268"
          width="24"
          height="24"
          v-if="
            question.questionAnswer === true ||
            question.questionAnswer === 'true' ||
            question.questionAnswer === 1
          "
          icon="mdi:tick-circle"
        />
        <Icon
          color="#e03131"
          width="24"
          height="24"
          v-if="
            question.questionAnswer === false ||
            question.questionAnswer === 'false' ||
            question.questionAnswer === 0
          "
          icon="clarity:remove-solid"
        />
        <div
          class="pl-2 text-xs xs:text-sm sm:text-base font-bold text-gray-600"
        >
          {{ question.question }}
        </div>
      </div>
      <div
        class="w-full flex items-center col-span-2 pl-1 text-xs xs:text-sm sm:text-base font-bold text-gray-600"
      >
        <div>
          {{ translations && translations.how_did_i_meet_contractor }} &nbsp;
        </div>
        <div
          :style="{
            transform: 'translateY(-1px)',
          }"
          class="border-b-2 border-[#495057] text-xs xs:text-sm"
        >
          {{ selectedReferal }}
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useStore } from "vuex";

defineProps({
  questionsSwitch: {
    type: Array,
  },
  selectedReferal: {
    type: [String],
  },
  questionsBgColor: {
    type: String,
    default: "#f8f9fa",
  },
});

const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
</script>
<style scoped></style>
