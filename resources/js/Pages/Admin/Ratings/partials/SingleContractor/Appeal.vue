<template>
  <div
    class="pl-2 text-md font-bold text-gray-600 mt-3 mb-3"
    :style="{
      padding: noPadding ? '0px' : '',
    }"
  >
    {{ heading }} &nbsp;

    <span
      v-if="!showAppealInformation && showToogle"
      @click="showAppealInformation = true"
      class="cursor-pointer text-sky-700 font-semibold text-sm"
    >
      {{ "Show Request" }}
    </span>
    <span
      v-if="showAppealInformation && showToogle"
      @click="showAppealInformation = false"
      class="cursor-pointer text-sky-700 font-semibold text-sm"
    >
      Hide Request
    </span>
  </div>

  <Card
    v-if="showAppealInformation"
    :shadowLevel="0"
    :isInside="true"
    bgColor="#f1f3f5"
    padding="10px"
    class="mb-4"
  >
    <div class="py-2">
      <div>
        <div class="pl-2 text-md text-gray-700">
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
        </div>
        <div class="pl-2 pr-2 text-right text-md font-bold text-gray-600">
          {{ appeal.date }}
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import { ref } from "vue";

const { showDetails } = defineProps({
  appeal: Object,
  heading: String,
  noPadding: {
    default: false,
    type: Boolean,
  },
  showToogle: {
    default: true,
    type: Boolean,
  },
  showDetails: {
    default: false,
    type: Boolean,
  },
});
const showAppealInformation = ref(showDetails);
const showFullText = ref(false);
</script>
