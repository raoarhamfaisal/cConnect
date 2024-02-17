<template>
  <div class="font-semibold text-[#3c3d41] ml-3 text-md mb-1 mt-2">
    Contractor's Response: {{ convertDateFormat(response?.response_date) }}
  </div>
  <div class="flex gap-2">
    <Card
      :shadowLevel="1"
      :isInside="true"
      :padding="'5px'"
      class="ml-5 w-full"
      bgColor="#f0f7e7"
    >
      <p
        class="text-sm font-semibold py-1 px-3 text-grey-600"
        v-if="!editResponseText && !isTyping && response_text"
      >
        {{
          showFullReview
            ? response_text
            : response_text.substring(0, 400) +
              (response_text.length > 400 ? "..." : "")
        }}
        <span
          v-if="!showFullReview && response_text.length > 400"
          @click="showFullReview = true"
          class="cursor-pointer text-sky-700"
        >
          See more
        </span>
        <span
          v-if="showFullReview && response_text.length > 400"
          @click="showFullReview = false"
          class="cursor-pointer text-sky-700"
        >
          See less
        </span>
      </p>
      <textarea
        v-else
        v-model="response_text"
        @blur="stopTyping"
        ref="responseTextArea"
        @keydown="saveInput"
        class="text-sm w-full py-1 px-3 focus:shadow-none focus:ring-gray-600 focus:rounded font-semibold text-grey-600 border-none resize-none bg-transparent"
        :rows="numberOfRows"
      ></textarea>
    </Card>
    <ButtonRatings
      v-if="hasPostPrevillages"
      bgColor="bg-lime-700"
      icon="material-symbols:edit-sharp"
      @click="focusTextarea"
      class="self-start"
      >Edit</ButtonRatings
    >
  </div>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import ButtonRatings from "@/Components/Ratings/ButtonRatings.vue";
import { convertDateFormat, filterBadWords } from "@/helpers/utilities";

import { computed, nextTick, ref, watch } from "vue";
import { usePage } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";

const { response } = defineProps({
  response: {
    type: Object,
  },
  profileId: {
    type: Number,
  },
  contractorId: {
    type: Number,
  },
});
const showFullReview = ref(false);
const store = useStore();
const hasPostPrevillages = usePage().props.value.auth.user.posts_privileges;

const editResponseText = ref(false);
const responseTextArea = ref();
const isTyping = ref(false);
const response_text = ref(response?.response_text);

//Computed

const numberOfRows = computed(() => {
  if (!response_text.value) return 1; // if there's no content, return a default row number
  const charsPerLine = 90;
  return Math.ceil(response_text.value.length / charsPerLine);
});
//Methods

const stopTyping = () => {
  isTyping.value = false;
  editResponseText.value = false;
};

let saveTimeout = null;

const saveInput = async () => {
  isTyping.value = true;

  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Start a new timer
  saveTimeout = setTimeout(async () => {
    if (!response_text.value) {
      return;
    }
    const updatedResponse = {
      response_text: filterBadWords(response_text),
      response_id: response.id,
    };
    await store.dispatch("ratings/updateResponse", {
      responseData: updatedResponse,
      dontShowSuccessSnack: true,
    });
  }, 1000); // 1 second delay
};

const focusTextarea = async () => {
  editResponseText.value = true;
  await nextTick();
  responseTextArea.value.focus();
};
</script>

<style scoped>
textarea {
  overflow-y: hidden; /* Hide vertical scrollbar */
  resize: none; /* Disable textarea resizing */
}
</style>
