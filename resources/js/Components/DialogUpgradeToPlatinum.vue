<template>
  <CustomDialog
    ref="dialogRef"
    :showFooter="false"
    :disableOutSideClick="false"
    dialogWidth="width-40"
    :title="translations && translations.unlock_platinum_features_now"
    contentClasses="max-sm:p-0 bg-gray-200 sm:pt-4"
  >
    <div
      class="border-8 p-1 font-semibold sm:p-2 border-white rounded-t-lg bg-white shadow sm:rounded-lg text-base sx:text-lg sm:text-xl"
    >
      <div>
        {{
          translations &&
          translations.this_feature_requires_the_platinum_version_to_access
        }}
      </div>

      <div class="flex justify-start space-x-3 cursor-pointer">
        <div
          @click="onUpgrade"
          class="group flex items-center justify-between rounded-xl border border-green-600 bg-green-600 hover:bg-green-800 px-3 py-2 mt-4 transition-colors focus:outline-none focus:ring"
        >
          <span
            class="text-lg font-bold text-white uppercase transition-colors group-hover:font-extrabold group-active:text-indigo-500"
          >
            {{ translations && translations.upgrade }}
          </span>
          <!-- Arrow -->
          <span
            class="ml-4 flex-shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
          >
            <svg
              class="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { Inertia } from "@inertiajs/inertia";

import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const dialogRef = ref();

const translations = computed(() => store.getters.translations);

const onUpgrade = () => {
  localStorage.setItem("activeTab", 2);
  Inertia.visit("/settings");
};
//Exposed
let closeDialogTimeoutId;
const openDialog = () => {
  dialogRef.value.openDialog();
  if (closeDialogTimeoutId) {
    clearTimeout(closeDialogTimeoutId);
  }

  // Set a new timeout to automatically close the dialog after 5 seconds
  closeDialogTimeoutId = setTimeout(() => {
    if (dialogRef.value) {
      dialogRef.value.closeDialog();
    }
  }, 10000);
};
defineExpose({ openDialog });
</script>

<style></style>
