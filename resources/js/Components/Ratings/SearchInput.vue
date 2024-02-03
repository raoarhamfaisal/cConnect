<template>
  <div class="relative">
    <input
      v-model="searchInput"
      @input="onInput"
      @keyup.enter="onClickSearchIcon"
      :style="{
        width: barWidth ? `${barWidth}%` : '',
      }"
      class="` p-2 border rounded focus:outline-none focus:border-blue-500`"
      placeholder="Search..."
    />
    <button
      @click="onClickSearchIcon"
      :style="{
        right: barWidth ? `${100 - barWidth}%` : '',
      }"
      class="` absolute top-0 p-2 text-gray-600 hover:text-gray-800`"
    >
      <Icon :icon="icon" class="w-6 h-6"></Icon>
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const { icon = "mdi:magnify" } = defineProps(["icon", "barWidth"]);
const emit = defineEmits();

const searchInput = ref("");

const onInput = () => {
  emit("update:modelValue", searchInput.value);
};

const onClickSearchIcon = () => {
  if (searchInput.value.trim()) {
    emit("search-clicked", searchInput.value);
  }
};
</script>
