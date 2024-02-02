<template>
  <!-- Display Saved Text -->
  <div
    v-if="processedClosingText"
    :class="` flex gap-1 flex-col rounded-lg closing md:border-gray-300 md:border-2 p-3`"
  >
    <!-- :class="`mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3 rounded-lg closing`" -->

    <div class="default ck-content" v-html="processedClosingText"></div>
  </div>
  <div class="flex justify-end gap-1">
    <Link
      class="rounded-full"
      v-if="userId === loggedInUserId"
      :href="`/contractor/${userId}/edit`"
    >
      <button
        :class="` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${selectedColorScheme[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`"
        :style="{
          background: selectedColorScheme[4],
          borderColor: selectedColorScheme[4],
        }"
      >
        Edit
      </button>
    </Link>
    <button
      v-bind="props"
      @click="shareLink"
      :style="{
        color: selectedColorScheme[4],
        borderColor: selectedColorScheme[4],
      }"
      :class="`bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95`"
    >
      {{ translations && translations.share }}
    </button>
    <v-snackbar
      location="bottom"
      v-model="snackbarVisible"
      :timeout="2000"
      color="success"
    >
      {{ translations && translations.link_copied_to_clipboard }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { template1Default } from "@/helpers/templateDefaults";
import { computed, ref } from "vue";
import { useStore } from "vuex";

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
const store = useStore();

const closingText = ref(decodeHtml(props.closing_text));

const snackbarVisible = ref(false);

const shareLink = () => {
  if (userVersion.value !== 3) {
    store.commit("setIsUpgradeToGoldPlatinumDialogOpen", true);
    return;
  }
  const success = copyToClipboard(window.location.href);
  if (success) {
    snackbarVisible.value = true; // Show the Snackbar on successful copy
  }
};

const translations = computed(() => store.getters.translations);
const userVersion = computed(() => store.getters.userVersion);

const processedClosingText = computed(() => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(closingText.value, "text/html");

  doc.querySelectorAll("a").forEach((anchor) => {
    const hrefValue = anchor.getAttribute("href");
    if (!hrefValue.startsWith("http://") && !hrefValue.startsWith("https://")) {
      anchor.setAttribute("href", "http://" + hrefValue);
    }
    anchor.target = "_blank";
  });

  return doc.body.innerHTML;
});

const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme || template1Default
);

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
