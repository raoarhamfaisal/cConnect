<template>
  <!-- Display Saved Text -->
  <div
    v-if="bottomText"
    v-intersect="{
      handler: showAnimcation,
      options: {
        threshold: [0, 0.5, 1.0],
      },
    }"
    :class="`mt-1 flex gap-1  flex-col rounded-lg closing w-full max-w-[1400px] px-3 sm:px-10 mx-auto`"
  >
    <!-- :class="`mt-1 flex gap-1 flex-col md:border-gray-300 md:border-2 p-3 rounded-lg closing`" -->

    <div
      class="default duration-1000 transition-all"
      v-html="bottomText"
      :class="{
        'translate-y-0': screenWidth > 768 && isSectionVisible,
        'translate-y-[200px]': screenWidth > 768 && !isSectionVisible,
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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

const isSectionVisible = ref(false);
const showAnimcation = () => {
  if (window.scrollY > 100) {
    console.log("in animation");
    isSectionVisible.value = true;
  }
};
</script>
