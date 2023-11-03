<script setup>
import { onMounted, ref } from "vue";

defineProps(["modelValue", "placeholder", "min", "max", "disabled"]);

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute("autofocus")) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
  <input
    class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
    :value="modelValue"
    :min="min"
    :max="max"
    :disabled="disabled"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="input"
    :placeholder="placeholder"
  />
</template>
