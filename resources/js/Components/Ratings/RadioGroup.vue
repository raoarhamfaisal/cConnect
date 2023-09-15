<template>
  <div class="flex w-8/12 max-xl:w-full justify-between mb-3">
    <label
      :for="options[0].id"
      class="text-lg font-bold text-gray-600 block mb-2"
    >
      {{ labelText }}
    </label>
    <div class="flex">
      <div class="flex" v-for="option in options" :key="option.id">
        <input
          type="radio"
          class="ml-3 mr-3 w-5 h-5"
          :id="option.id"
          :value="option.value"
          :checked="modelValue === option.value"
          @input="$emit('update:modelValue', option.value)"
        />
        <div>{{ option.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const { labelText, options, modelValue } = defineProps({
  labelText: String,
  options: Array,
  modelValue: [String, Number, Boolean],
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
/* You can add your component-specific styles here */
</style>
