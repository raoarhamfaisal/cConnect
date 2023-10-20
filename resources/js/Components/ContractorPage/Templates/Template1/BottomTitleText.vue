<template>
  <!-- Display Saved Text -->
  <div
    v-if="processedBottomText"
    v-intersect="{
      handler: showAnimcation,
      options: {
        threshold: [0, 0.5, 1.0],
      },
    }"
    :class="`mt-1 flex gap-1  flex-col rounded-lg closing w-full max-w-[1400px] px-3 sm:px-10 mx-auto`"
  >
    <div
      class="default ck-content duration-1000 transition-all"
      v-html="processedBottomText"
      :class="{
        'translate-y-0': screenWidth > 768 && isSectionVisible,
        'translate-y-[200px]': screenWidth > 768 && !isSectionVisible,
      }"
    ></div>
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
const bottomText = ref(decodeHtml(props.bottom_text));

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
const isSectionVisible = ref(false);
const showAnimcation = () => {
  if (window.scrollY > 100) {
    console.log("in animation");
    isSectionVisible.value = true;
  }
};
</script>
