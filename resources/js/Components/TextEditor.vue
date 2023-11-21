<template>
  <div>
    <div class="toolbar bg-gray-100 p-2 border-b flex items-center">
      <FontSizeDropdown v-model="fontSizeIncrement" />
      <FontColorDropdown v-model="selectedColor" />
      <BackgroundColorDropdown v-model="backgroundColor" />

      <!-- Bold Icon -->
      <button
        type="button"
        @click="toggleBold"
        :class="{ 'bg-gray-300': isBold }"
        class="p-1 rounded mr-2"
      >
        <Icon icon="fa-solid:bold" class="w-5 h-5" />
      </button>

      <!-- Align Left Icon -->
      <button
        type="button"
        @click="setAlignment('left')"
        :class="{ 'bg-gray-300': alignment === 'left' }"
        class="p-1 rounded mr-2"
      >
        <Icon icon="fa-solid:align-left" class="w-5 h-5" />
      </button>

      <!-- Align Center Icon -->
      <button
        type="button"
        @click="setAlignment('center')"
        :class="{ 'bg-gray-300': alignment === 'center' }"
        class="p-1 rounded mr-2"
      >
        <Icon icon="fa-solid:align-center" class="w-5 h-5" />
      </button>

      <!-- Align Right Icon -->
      <button
        type="button"
        @click="setAlignment('right')"
        :class="{ 'bg-gray-300': alignment === 'right' }"
        class="p-1 rounded mr-2"
      >
        <Icon icon="fa-solid:align-right" class="w-5 h-5" />
      </button>
    </div>

    <!-- <div
      ref="editor"
      contenteditable="true"
      class="editor rounded focus:outline-none focus:shadow-outline border-gray-600 mt-4 py-2 px-3 border"
      @keydown="handleKeyPress"
      :class="{
        'font-bold': isBold,
        'justify-start text-left': alignment === 'left',
        'justify-center text-center': alignment === 'center',
        'justify-end text-right': alignment === 'right',
        'items-center':
          backgroundColor !== 'inherit' && backgroundColor !== '#ffffff',
      }"
      :style="{
        display: 'flex',
        fontSize: 16 + fontSizeIncrement + 'px',
        color: selectedColor,
        backgroundColor: backgroundColor,
      }"
      placeholder="To Text..."
      @input="updateContent"
    >
      {{ content }}
    </div> -->

    <!-- @keydown="handleKeyPress" -->
    <textarea
      ref="editor"
      class="overflow-y-hidden resize-none min-h-[200px] rounded focus:border-gray-700 focus:border-2 focus:outline-none focus:ring-gray-700 border-gray-600 mt-4 py-2 px-3 border w-full resize-none"
      :class="{
        'font-bold': isBold,
        'justify-start text-left': alignment === 'left',
        'justify-center text-center': alignment === 'center',
        'justify-end text-right': alignment === 'right',
        'items-center py-[87px]':
          backgroundColor !== 'inherit' && backgroundColor !== '#ffffff',
      }"
      :style="{
        fontSize: 16 + fontSizeIncrement + 'px',
        color: selectedColor,
        backgroundColor: backgroundColor,
      }"
      @paste="updateContent"
      @input="updateContent"
      v-model="content"
    ></textarea>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import FontSizeDropdown from "@/Components/FontSizeDropdown.vue";
import BackgroundColorDropdown from "@/Components/BackgroundColorDropdown.vue";

import FontColorDropdown from "@/Components/FontColorDropdown.vue";
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const isBold = ref(false);
const alignment = ref(""); // Default to left alignment
const content = ref(props.modelValue ?? "");
const editor = ref(null);
const fontSizeIncrement = ref(0);
const selectedColor = ref("inherit");
const backgroundColor = ref("inherit");

const generateStyledContent = () => {
  let classes = "inline ";

  if (isBold.value) {
    classes += " font-bold";
  }

  if (alignment.value === "left") {
    classes += " justify-start text-left";
  }

  if (alignment.value === "center") {
    classes += " justify-center text-center";
  }

  if (alignment.value === "right") {
    classes += " justify-end text-right";
  }
  if (
    backgroundColor.value !== "inherit" &&
    backgroundColor.value !== "#ffffff"
  ) {
    classes += ` bg-[${backgroundColor.value}] items-center flex`;
  }

  const style = `font-size: ${16 + fontSizeIncrement.value}px; color: ${
    selectedColor.value
  }; `;
  console.log("style", style, classes);

  return `<span id="toTeleport" class="${classes} truncate-text" style="${style}">${content.value}</span>`;
};

watch(
  [
    content,
    alignment,
    isBold,
    fontSizeIncrement,
    selectedColor,
    backgroundColor,
  ],
  (newValue) => {
    adjustHeight();

    const styledContent = generateStyledContent();
    emit("update:modelValue", styledContent);
  }
);

watch(backgroundColor, (newValue) => {
  // only if the selected color is black or inherit
  if (
    backgroundColor.value !== "inherit" &&
    backgroundColor.value !== "#ffffff" &&
    (selectedColor.value === "inherit" || selectedColor.value === "#000000")
  ) {
    // selectedColor.value = "#ffffff";
    alignment.value = "center";
  } else if (
    backgroundColor.value !== "inherit" &&
    backgroundColor.value !== "#ffffff" &&
    (selectedColor.value !== "inherit" || selectedColor.value !== "#000000")
  ) {
    alignment.value = "center";
  }

  // if font color changed other than black then this condition and when i remove the background color

  if (
    backgroundColor.value === "inherit" ||
    backgroundColor.value === "#ffffff"
  ) {
    alignment.value = "left";
    if (selectedColor.value === "#ffffff") {
      selectedColor.value = "inherit";
    }
  }
});

// cursor position

const toggleBold = () => {
  isBold.value = !isBold.value;
};
const adjustHeight = () => {
  nextTick(() => {
    editor.value.style.height = "auto"; // Reset height first to get the correct scrollHeight
    editor.value.style.height = editor.value.scrollHeight + "px";
  });
};

const setAlignment = (align) => {
  adjustHeight();
  alignment.value = align;
};

const updateContent = () => {
  // content.value = editor.value.innerText;
  adjustHeight();
};
</script>

<style scoped>
.editor {
  min-height: 200px;
  overflow-y: hidden; /* Hide vertical scrollbar */
  resize: none; /* Disable textarea resizing */
}
</style>
