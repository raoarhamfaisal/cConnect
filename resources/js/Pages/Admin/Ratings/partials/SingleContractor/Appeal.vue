<template>
  <div class="font-semibold text-[#3c3d41] ml-3 text-md mb-1">
    {{ heading }} : {{ convertDateFormat(appeal.date) }}
  </div>
  <div class="flex gap-3">
    <Card
      :shadowLevel="1"
      :isInside="true"
      :padding="'5px'"
      class="ml-5 w-full"
      bgColor="#f0f7e7"
    >
      <p class="text-sm font-semibold py-1 px-3 text-grey-600">
        {{
          showFullText
            ? appeal.reason
            : appeal.reason.substring(0, 400) +
              (appeal.reason.length > 400 ? "..." : "")
        }}
        <span
          v-if="!showFullText && appeal.reason.length > 400"
          @click="showFullText = true"
          class="cursor-pointer text-sky-700"
        >
          See more
        </span>
        <span
          v-if="showFullText && appeal.reason.length > 400"
          @click="showFullText = false"
          class="cursor-pointer text-sky-700"
        >
          See less
        </span>
      </p>
    </Card>
    <div class="w-20"></div>
  </div>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import { ref } from "vue";
import { convertDateFormat } from "@/helpers/utilities";

const { showDetails } = defineProps({
  appeal: Object,
  heading: String,
});
const showFullText = ref(false);
</script>
