<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="fixed m-0 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
      :style="{
        '--tw-space-x-reverse': 'inherit',
      }"
      @click="closeDialog"
    >
      <div
        class="bg-white md:w-2/3 w-full max-h-[90vh] max-md:max-h-full rounded-lg max-sm:rounded-none shadow-lg flex flex-col z-10"
        :style="{
          width: dialogWidth ? dialogWidth : '',
        }"
        @click.stop
      >
        <div
          class="flex justify-between max-md:rounded-none rounded-lg items-center p-4 bg-gray-100"
        >
          <h3 class="text-xl font-bold">{{ title }}</h3>
          <button
            @click="closeDialog"
            class="p-2 hover:bg-gray-200 rounded-full"
          >
            X
          </button>
        </div>

        <!-- Slot Content - Scrollable -->
        <div class="flex-1 overflow-y-auto p-4">
          <slot></slot>
        </div>

        <div class="flex justify-between p-4">
          <button
            @click="closeDialog"
            class="px-4 py-2 rounded bg-red-500 text-white"
          >
            Cancel
          </button>
          <button
            @click="submit"
            type="submit"
            class="px-4 py-2 rounded bg-blue-500 text-white"
          >
            {{ submitText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  submitText: {
    type: String,
    default: "Submit",
  },
  dialogWidth: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["submit"]);
const submit = () => {
  emit("submit");
};

const isVisible = ref(false);

const closeDialog = () => {
  isVisible.value = false;
};

const openDialog = () => {
  isVisible.value = true;
};
defineExpose({ openDialog, closeDialog });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
