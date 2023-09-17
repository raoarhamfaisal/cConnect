<template>
  <div class="font-semibold text-[#3c3d41] ml-3 text-md mb-1 mt-2">
    Appeal Judge Decision Notes
  </div>
  <div class="flex gap-2">
    <Card
      :shadowLevel="1"
      :isInside="true"
      :padding="'5px'"
      class="ml-5 w-full self-stretch h-full"
      bgColor="#edfaff"
    >
      <p
        class="text-sm font-semibold py-1 px-3 text-grey-600"
        v-if="!editAdmitNoteText && demoText"
        style="height: 11.3rem"
      >
        {{
          showFullText
            ? demoText
            : demoText.substring(0, 400) + (demoText.length > 400 ? "..." : "")
        }}
        <span
          v-if="!showFullText && demoText.length > 400"
          @click="showFullText = true"
          class="cursor-pointer text-sky-700"
        >
          See more :disabled="disabled"
        </span>
        <span
          v-if="showFullText && demoText.length > 400"
          @click="showFullText = false"
          class="cursor-pointer text-sky-700"
        >
          See less
        </span>
      </p>
      <textarea
        v-else
        v-model="adminNote"
        @blur="editAdmitNoteText = false"
        ref="adminTextAreaRef"
        style="height: 11.3rem"
        placeholder="Type your Notes"
        class="text-sm w-full py-1 px-3 focus:shadow-none focus:ring-gray-600 focus:rounded font-semibold text-grey-600 border-none resize-none bg-transparent"
        :rows="numberOfRows"
      ></textarea>
    </Card>
    <div class="flex gap-2 flex-col items-center self-start">
      <button
        class="rounded-md border-2 w-28 px-2 py-1 py-2 text-sm text-center"
        @click="focusTextarea"
      >
        Edit Notes
      </button>
      <button
        class="rounded-md border-2 w-28 px-2 py-1 py-2 text-sm text-center"
        :class="{ selected: appealFilter === 'open' }"
        @click="handleTabs('open')"
      >
        Open Appeal
      </button>
      <button
        class="rounded-md border-2 w-28 px-2 py-1 py-2 text-sm text-center"
        :class="{ selected: appealFilter === 'hlod' }"
        @click="handleTabs('hlod')"
      >
        On Hold
      </button>
      <button
        class="rounded-md border-2 w-28 px-2 py-1 py-2 text-sm text-center"
        :class="{ selected: appealFilter === 'approved' }"
        @click="handleTabs('approved')"
      >
        Approved
      </button>
      <button
        class="rounded-md w-28 px-2 py-1 py-2 text-sm text-center"
        :class="{ selected: appealFilter === 'denied' }"
        @click="handleTabs('denied')"
      >
        Denied
      </button>
    </div>
  </div>
</template>
  
  <script setup>
import Card from "@/Components/Card.vue";

import { computed, nextTick, ref } from "vue";

defineProps({
  profileId: {
    type: Number,
  },
  contractorId: {
    type: Number,
  },
});
const showFullText = ref(false);
const appealFilter = ref("open");
const editAdmitNoteText = ref(false);
const demoText =
  "lorem isOptio sint repudiandae nisi et fugit quaerat vel. Porro labore dolores itaque. Sunt similique qui accusantium inventore ratione.Optio sint repudiandae nisi et fugit quaerat vel. Porro labore dolores itaque. Sunt similique qui accusantium inventore ratione.";
const adminTextAreaRef = ref();
const adminNote = ref(demoText);

// Computed

const numberOfRows = computed(() => {
  if (!adminNote.value) return 1; // if there's no content, return a default row number
  const charsPerLine = 90;

  return Math.ceil(adminNote.value.length / charsPerLine);
});

//Methods
const focusTextarea = async () => {
  editAdmitNoteText.value = true;
  await nextTick();
  adminTextAreaRef.value.focus();
};

const handleTabs = (apiToCall) => {
  appealFilter.value = apiToCall;
};
</script>
  
  <style scoped>
textarea {
  overflow-y: hidden; /* Hide vertical scrollbar */
  resize: none; /* Disable textarea resizing */
}
button.selected {
  background-color: #3a357c;
  border: 2px solid #3a357c;
  color: #fff;
}
button {
  border: 2px solid #ccc;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}
</style>
  