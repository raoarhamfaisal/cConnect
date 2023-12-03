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

  

    <!-- @keydown="handleKeyPress" -->
    <textarea
      ref="editor"
      class="overflow-y-hidden resize-none min-h-[200px] rounded focus:border-gray-700 focus:border-2 focus:outline-none focus:ring-gray-700 border-gray-600 mt-2 py-2 px-3 border w-full resize-none"
      :class="{
        'font-bold': isBold,
        'justify-start text-left': alignment === 'left',
        'justify-center text-center': alignment === 'center',
        'justify-end text-right': alignment === 'right',
        'items-center py-[87px]':
          backgroundColor.color !== 'inherit' &&
          backgroundColor.color !== '#ffffff',
      }"
      :style="{
        fontSize: 16 + fontSizeIncrement + 'px',
        height: backgroundColor.color !== 'inherit' &&
          backgroundColor.color !== '#ffffff' ? 87+ 87 + 10 + fontSizeIncrement  + 10 + 'px' : '44px',
        color: selectedColor.color,
        backgroundColor: backgroundColor.color,
      }"
      @paste="updateContent"
      @input="updateContent"
      @keydown="insertTab"
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
  fontSize: [Number,String],
  textColorId: String,
  backgroundColorId: String,
  isBold: Boolean,
  textAlignment: String,
});

const emit = defineEmits([
  "update:modelValue",
  "update:fontSize",
  "update:textColorId",
  "update:backgroundColorId",
  "update:isBold",
  "update:textAlignment",
]);
const isBold = ref(false);
const alignment = ref(""); // Default to left alignment
const content = ref(props.modelValue ?? "");
const editor = ref(null);
const fontSizeIncrement = ref(0);
const selectedColor = ref({
  color: "inherit",
});
const backgroundColor = ref({
  color: "inherit",
});

const generateStyledContent = () => {
 
  return `<span  class="truncate-text">${content.value}</span>`;
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
    backgroundColor.value.color !== "inherit" &&
    backgroundColor.value.color !== "#ffffff" &&
    (selectedColor.value.color === "inherit" ||
      selectedColor.value.color === "#000000")
  ) {
    // selectedColor.value.color = "#ffffff";
    alignment.value = "center";
  } else if (
    backgroundColor.value.color !== "inherit" &&
    backgroundColor.value.color !== "#ffffff" &&
    (selectedColor.value.color !== "inherit" ||
      selectedColor.value.color !== "#000000")
  ) {
    alignment.value = "center";
  }

  // if font color changed other than black then this condition and when i remove the background color

  if (
    backgroundColor.value.color === "inherit" ||
    backgroundColor.value.color === "#ffffff"
  ) {
    alignment.value = "left";
    if (selectedColor.value.color === "#ffffff") {
      selectedColor.value.color = "inherit";
    }
  }

  emit("update:backgroundColorId", newValue.id);
});
watch(fontSizeIncrement, (newValue) =>
  emit("update:fontSize", newValue.toString())
);
watch(selectedColor, (newValue) => {
  emit("update:textColorId", newValue.id);
});

watch(isBold, (newValue) => emit("update:isBold", newValue));
watch(alignment, (newValue) => emit("update:textAlignment", newValue));
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
const insertTab = (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
if(content.value === null){
  content.value = ''
}
    // Set the value to: text before caret + four spaces + text after caret
    content.value = content.value.substring(0, start) + '      ' + content.value.substring(end);

    // Put caret at right position again
    nextTick(() => {
      event.target.selectionStart = event.target.selectionEnd = start + 6;
    });
  }
};

</script>

<style scoped>
.editor {
  min-height: 200px;
  overflow-y: hidden; /* Hide vertical scrollbar */
  resize: none; /* Disable textarea resizing */
}
</style>
