<template>
  <div
    v-if="isVisible"
    class="fixed m-0 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-2"
    :style="{
      '--tw-space-x-reverse': 'inherit',
    }"
    type="button"
    @click="
      () => {
        if (!disableOutSideClick) {
          closeDialog();
        }
      }
    "
  >
    <transition name="fade">
      <div
        :class="[dialogWidth]"
        class="bg-white md:w-2/3 w-full max-h-[90vh] max-md:max-h-full rounded-xl max-sm:rounded-none shadow-xl flex flex-col z-10"
        type="button"
        @click.stop
      >
        <div
          v-if="showHeader"
          class="flex justify-between rounded-b-none max-md:rounded-none rounded-lg text-white items-center p-2 xs:p-4 bg-[#241e6d]"
        >
          <div class="flex items-center gap-2">
            <Icon
              v-if="!dontAllowCancel"
              type="button"
              @click="closeDialog"
              class="w-8 h-8 sx:w-10 sx:h-10 cursor-pointer"
              icon="icon-park:back"
              color="red"
            />
            <h3 class="text-lg sx:text-xl font-bold">
              {{ title }}
            </h3>
            <Icon
              class="w-6 h-6"
              v-if="errorIcon"
              icon="ic:baseline-error"
              color="red"
            />
          </div>
          <button
            type="button"
            v-if="!dontAllowCancel"
            @click="closeDialog"
            class="p-2 hover:bg-[#6741d9] w-10 h-10 flex justify-center items-center rounded-full"
          >
            X
          </button>
        </div>

        <!-- Slot Content - Scrollable -->
        <div
          :class="`flex-1 ${
            overflowAllowed ? 'overflow-y-auto' : ''
          } p-2 sm:p-4 padding-none ${contentClasses}`"
        >
          <slot></slot>
        </div>

        <div
          :class="`flex ${!showCancel ? 'justify-end' : 'justify-between'} p-4`"
          v-if="showFooter"
        >
          <button
            type="button"
            @click="closeDialog"
            v-show="showCancel"
            class="px-4 py-2 rounded text-white bg-[#364fc7]"
          >
            {{
              cancelText === "Cancel"
                ? translations && translations.cancel
                : cancelText
            }}
          </button>
          <button
            @click="submit"
            :disabled="disabled"
            type="button"
            class="px-4 py-2 flex tems-center gap-2 rounded bg-[#5f3dc4] text-white"
            :style="{
              backgroundColor: errorIcon ? '#f03e3e' : '',
              opacity: disabled ? '0.2' : '1',
            }"
          >
            <div class="flex items-center justify-center">
              {{
                submitText === "Submit"
                  ? translations && translations.submit
                  : submitText
              }}
            </div>
            <img
              v-show="loading"
              src="/images/avatars/Spinner.gif"
              alt="spinner"
              width="25"
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
import { useStore } from "vuex";

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
  showHeader: {
    type: Boolean,
    default: true,
  },
  dialogWidth: {
    type: String,
    default: "",
  },
  overflowAllowed: {
    type: Boolean,
    default: true,
  },
  errorIcon: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disableOutSideClick: {
    type: Boolean,
    default: true,
  },
  shouldFetchPost: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  upgradeDialog: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["submit", "closed", "opened"]);
const submit = () => {
  emit("submit");
};
const store = useStore();
const isVisible = ref(false);

//Computed

const shouldFetchPostsOnClose = computed(
  () => store.state.ratings.shouldFetchPostsOnClose
);
const translations = computed(() => store.getters.translations);
//Methods
const closeDialog = () => {
  if (props.dontAllowCancel) {
    return;
  }

  if (props.upgradeDialog) {
    store.commit("setIsUpgradeToGoldPlatinumDialogOpen", false);
  }
  isVisible.value = false;
  emit("closed");

  if (shouldFetchPostsOnClose.value && props.shouldFetchPost) {
    console.log("inLoadingPost");
    store.commit("ratings/setShouldLoadPosts", true);
    store.commit("ratings/setShouldFetchPostsOnClose", false);
  }
};

const openDialog = () => {
  isVisible.value = true;
  emit("opened");
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
.width780px {
  max-width: 800px;
}
.width780px .padding-none {
  padding: 0;
}
@media (max-width: 750px) {
  .width-75.contractorDialog {
    width: 100%;
  }
}
@media (max-width: 640px) {
  .width-75 {
    width: 100%;
  }
}
.width-40 {
  width: 40%;
}

@media (max-width: 640px) {
  .card-width {
    width: 90%;
    max-height: 90%;
    border-radius: 10px;
  }
}
@media (max-width: 460px) {
  .card-width {
    width: 95%;
    max-height: 95%;
    border-radius: 10px;
  }
  .width-75.contractorDialog div {
    padding: 0px;
  }
}

@media (max-width: 640px) {
  .width-40 {
    width: 100%;
  }
}
.widthAuto {
  width: auto;
}
</style>
