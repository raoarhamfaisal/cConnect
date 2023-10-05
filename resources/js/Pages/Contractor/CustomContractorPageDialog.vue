<template>
  <div
    v-if="isVisible"
    class="fixed m-0 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
    :style="{
      '--tw-space-x-reverse': 'inherit',
    }"
  >
    <transition name="fade">
      <div
        :class="[dialogWidth]"
        class="bg-white lg:w-2/3 w-full max-h-[90vh] max-lg:max-h-full rounded-xl max-sm:rounded-none shadow-xl flex flex-col z-10"
        @click.stop
      >
        <div
          class="flex justify-between rounded-b-none max-md:rounded-none rounded-lg text-white items-center p-4 bg-[#241e6d]"
        >
          <div class="flex items-center gap-2">
            <Icon
              v-if="!dontAllowCancel"
              @click="closeDialog"
              class="w-10 h-10 cursor-pointer"
              icon="icon-park:back"
              color="red"
            />
            <h3 class="text-xl font-bold">Close</h3>
          </div>
          <div class="text-xl font-bold tracking-wide text-center">
            <span
              class="text-green-rgba font-extrabold italic font-serif text-2xl normal-case"
              >t</span
            >
            <span class="text-white font-extrabold font-sans uppercase">C</span>
            <span class="text-white font-bold font-sans">ontractor</span>
          </div>
        </div>

        <!-- Slot Content - Scrollable -->
        <div
          :class="`flex-1 overflow-y-auto relative p-2 sm:p-4 ${contentClasses}`"
          id="dialogContainer"
        >
          <slot></slot>
        </div>

        <div
          :class="`flex ${!showCancel ? 'justify-end' : 'justify-between'} p-4`"
          v-if="showFooter"
        >
          <button
            @click="closeDialog"
            v-show="showCancel"
            class="px-4 py-2 rounded text-white bg-[#364fc7]"
          >
            Cancel
          </button>
          <button
            @click="submit"
            :disabled="disabled"
            type="submit"
            class="px-4 py-2 flex tems-center gap-2 rounded bg-[#5f3dc4] text-white"
            :style="{
              backgroundColor: errorIcon ? '#f03e3e' : '',
            }"
          >
            <div class="flex items-center justify-center">{{ submitText }}</div>
            <img
              v-show="loading"
              src="/images/avatars/Spinner.gif"
              alt="spinner"
              width="30"
            />
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";

const props = defineProps({
  title: String,
  submitText: {
    type: String,
    default: "Submit",
  },
  dontAllowCancel: {
    type: Boolean,
    default: false,
  },
  contentClasses: {
    type: String,
    default: "",
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  dialogWidth: {
    type: String,
    default: "",
  },
  errorIcon: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["submit", "closed"]);
const submit = () => {
  emit("submit");
};
const isVisible = ref(false);

//Computed

const shouldFetchPostsOnClose = computed(
  () => store.state.ratings.shouldFetchPostsOnClose
);
//Methods
const closeDialog = () => {
  if (props.dontAllowCancel) {
    return;
  }
  isVisible.value = false;
  emit("closed");
};

const openDialog = () => {
  isVisible.value = true;
};
defineExpose({ openDialog, closeDialog });
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

/* target state of the dialog after entering or before leaving */
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* transition effect for the dialog */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.width-75 {
  width: 80%;
}
@media (max-width: 1024px) {
  .width-75 {
    width: 100%;
  }
}
@media (max-width: 640px) {
  .width-75 {
    width: 100%;
  }
}
</style>
