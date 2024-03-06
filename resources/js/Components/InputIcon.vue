<script setup>
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue"; // Make sure to import the Iconify Vue component

defineProps(["modelValue", "placeholder", "icon", "type", "id", "color"]); // added "icon" prop

defineEmits(["update:modelValue", "iconClick", "blur", "keyup"]);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute("autofocus")) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
  <div class="relative">
    <input
      :type="type"
      :id="id"
      class="border-gray-300 focus:ring-indigo-500 rounded-md shadow-sm pr-10 mt-1 block w-full"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      ref="input"
      @blur="$emit('blur')"
      @keyup="$emit('keyup')"
      :placeholder="placeholder"
    />
    <Icon
      v-if="icon"
      :icon="icon"
      :color="color"
      width="24"
      @click="$emit('iconClick')"
      height="24"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
    />
  </div>
</template>
