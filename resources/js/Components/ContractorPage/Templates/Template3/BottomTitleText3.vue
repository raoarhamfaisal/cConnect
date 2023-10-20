<template>
  <!-- Display Saved Text -->
  <div
    v-if="processedBottomText"
    :class="`mt-1 flex gap-1 flex-col rounded-lg closing`"
  >
    <!-- :class="`mt-1 flex gap-1 flex-col md:border-gray-300 md:border-2 p-3 rounded-lg closing`" -->

    <div class="default ck-content" v-html="processedBottomText"></div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  screenWidth: {
    type: [String, Number],
  },
  bottom_text: {
    type: String,
  },
});
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
const processedBottomText = computed(() => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(bottomText.value, "text/html");

  doc.querySelectorAll("a").forEach((anchor) => {
    const hrefValue = anchor.getAttribute("href");
    if (!hrefValue.startsWith("http://") && !hrefValue.startsWith("https://")) {
      anchor.setAttribute("href", "http://" + hrefValue);
    }
    anchor.target = "_blank";
  });

  return doc.body.innerHTML;
});
const bottomText = ref(decodeHtml(props.bottom_text));
</script>
