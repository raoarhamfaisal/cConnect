<template>
  <!-- Display Saved Text -->
  <div v-if="closingText" :class="` flex gap-1 flex-col rounded-lg closing`">
    <!-- :class="`mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3 rounded-lg closing`" -->

    <div class="default" v-html="closingText"></div>
  </div>
  <div class="flex justify-end gap-1">
    <Link
      class="rounded-full"
      v-if="userId === loggedInUserId"
      :href="`/contractor/${userId}/edit`"
    >
      <button
        class="bg-white px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[#1864ab] w-[66px] border-[1px] text-white bg-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95 w-full"
      >
        Edit
      </button>
    </Link>
    <button
      v-bind="props"
      @click="shareLink"
      class="bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-[1px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95"
    >
      Share
    </button>
    <v-snackbar
      location="bottom"
      v-model="snackbarVisible"
      :timeout="2000"
      color="success"
    >
      Link Copied to Clipboard
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  screenWidth: {
    type: [String, Number],
  },
  loggedInUserId: [String, Number],
  closing_text: {
    type: String,
  },
  userId: [String, Number],
});
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  console.log("here");
  return txt.value;
};

const closingText = ref(decodeHtml(props.closing_text));

const snackbarVisible = ref(false);

const shareLink = () => {
  const success = copyToClipboard(window.location.href);
  if (success) {
    snackbarVisible.value = true; // Show the Snackbar on successful copy
  }
};

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  let success;
  try {
    success = document.execCommand("copy");
    console;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    success = false;
  }
  document.body.removeChild(textarea);
  return success;
}
</script>
