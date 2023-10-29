<template>
  <div>
    <div class="toolbar bg-gray-100 p-2 border-b flex items-center">
      <FontSizeDropdown v-model="fontSizeIncrement" />
      <FontColorDropdown v-model="selectedColor" />
      <BackgroundColorDropdown
        v-if="shouldShowBackground"
        v-model="backgroundColor"
      />

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

    <div
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
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import FontSizeDropdown from "@/Components/FontSizeDropdown.vue";
import BackgroundColorDropdown from "@/Components/BackgroundColorDropdown.vue";

import FontColorDropdown from "@/Components/FontColorDropdown.vue";
const props = defineProps({
  modelValue: String,
  shouldShowBackground: Boolean,
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

  return `<span id="toTeleport" class="${classes}" style="${style}">${content.value}</span>`;
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
    const styledContent = generateStyledContent();
    emit("update:modelValue", styledContent);
  }
);
watch(
  () => props.shouldShowBackground,
  (newValue) => {
    console.log(newValue, "inShowBackground");
    if (!newValue) {
      backgroundColor.value = "inherit";
      // selectedColor.value = "black";
      // alignment.value = "";
    }
  }
);
watch(backgroundColor, (newValue) => {
  if (
    backgroundColor.value !== "inherit" &&
    backgroundColor.value !== "#ffffff"
  ) {
    selectedColor.value = "#ffffff";
    alignment.value = "center";
  } else {
    selectedColor.value = "black";
    alignment.value = "left";
  }
});

const toggleBold = () => {
  isBold.value = !isBold.value;
};

const setAlignment = (align) => {
  alignment.value = align;
};

const updateContent = () => {
  content.value = editor.value.innerText;
};

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default behavior
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const br = document.createElement("br");
    range.insertNode(br);
    range.setStartAfter(br); // Set cursor after the new line
    range.setEndAfter(br);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
</script>

<style>
.editor {
  min-height: 200px;
}
</style>
