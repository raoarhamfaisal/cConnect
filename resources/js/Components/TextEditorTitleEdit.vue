<template>
  <div>
    <div class="toolbar bg-gray-100 p-2 border-b flex items-center">
      <FontColorDropdownEdit
        v-model="selectedColor"
        :textColorId="textColorId"
      />
      <BackgroundColorDropdownEdit
        v-model="backgroundColor"
        :backgroundColorId="backgroundColorId"
      />
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
      class="overflow-y-hidden resize-none rounded focus:border-gray-700 focus:border-2 focus:outline-none focus:ring-gray-700 border-gray-600 mt-2 py-2 px-3 border w-full"
      :class="{
        'font-bold': true,
        'justify-start text-left': alignment === 'left',
        'justify-center text-center': alignment === 'center',
        'justify-end text-right': alignment === 'right',
        'items-center py-[20px]':
          backgroundColor.color !== 'inherit' &&
          backgroundColor.color !== '#ffffff',
      }"
      @input="handleInput"
      :style="{
        height:
          backgroundColor.color !== 'inherit' &&
          backgroundColor.color !== '#ffffff'
            ? 69 + 'px'
            : '44px',
        color: selectedColor.color,
        backgroundColor: backgroundColor.color,
      }"
      v-model="content"
    ></textarea>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import BackgroundColorDropdownEdit from "@/Components/BackgroundColorDropdownEdit.vue";

import FontColorDropdownEdit from "@/Components/FontColorDropdownEdit.vue";
const props = defineProps({
  modelValue: String,
  textColorId: [String, Number],
  backgroundColorId: [String, Number],
  textAlignment: String,
});

const emit = defineEmits([
  "update:modelValue",
  "update:textColorId",
  "update:backgroundColorId",
  "update:textAlignment",
]);

const alignment = ref(props.textAlignment ?? ""); // Default to left alignment
const content = ref(props.modelValue ?? "");
const editor = ref(null);
const selectedColor = ref({
  color: "inherit",
});
const backgroundColor = ref({
  color: "inherit",
});
onMounted(() => {
  let porpContent = props.modelValue ?? "";
  // Replace <br> and <br/> tags with \n
  porpContent = porpContent.replace(/<br\s*\/?>/gi, "\n");
  // Remove other HTML tags
  porpContent = porpContent.replace(/<[^>]*>/g, "");

  content.value = porpContent;
});

const generateStyledContent = () => {
  return `<span>${content.value}</span>`;
};

watch([content, alignment, selectedColor, backgroundColor], (newValue) => {
  const styledContent = generateStyledContent();
  emit("update:modelValue", styledContent);
});

watch(backgroundColor, (newValue) => {
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

watch(selectedColor, (newValue) => {
  emit("update:textColorId", newValue.id);
});

watch(alignment, (newValue) => emit("update:textAlignment", newValue));
// cursor position

const setAlignment = (align) => {
  alignment.value = align;
};
// const updateContent = () => {
//   // content.value = editor.value.innerText;
//   adjustHeight();
// };

// const adjustHeight = () => {
//   nextTick(() => {
//     editor.value.style.height = "auto"; // Reset height first to get the correct scrollHeight
//     editor.value.style.height = editor.value.scrollHeight + "px";
//   });
// };
const handleInput = (event) => {
  // Remove carriage returns (\r) and newline (\n) characters
  let value = event.target.value.replace(/[\r\n]/g, "");
  // Trim the value to 35 characters
  value = value.substring(0, 35);
  // Update the content value
  content.value = value;
  // Emit the updated value
  emit("update:modelValue", value);
};
</script>

<style scoped></style>
