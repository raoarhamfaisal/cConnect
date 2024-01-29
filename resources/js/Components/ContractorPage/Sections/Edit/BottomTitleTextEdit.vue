<template>
  <!-- Display Saved Text -->
  <div
    v-if="bottomText"
    :class="`mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3   rounded-lg`"
  >
    <div class="flex justify-between">
      <div class="flex items-center font-bold text-lg">
        {{
          translations &&
          translations.about_us_why_you_should_work_for_or_hire_us
        }}
      </div>
      <IconButton @click="openDialogEdit" icon="nimbus:edit" color="#1864ab" />
    </div>
    <div class="flex-1 flex sm:items-center">{{ bottomText }}</div>
  </div>

  <!-- Add Bottom Text Button -->
  <button
    v-if="!bottomText"
    @click="openDialogEdit"
    class="w-full flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg"
  >
    <Icon icon="mdi:plus-thick" />
    {{
      translations && translations.about_us_why_you_should_work_for_or_hire_us
    }}
  </button>

  <!-- CustomDialog for adding -->

  <CustomDialog
    :submitText="translations && translations.save"
    :loading="loading"
    :disabled="disabled"
    @submit="handleSubmit"
    @closed="handleClosed"
    ref="dialogRef"
    :title="translations && translations.add_bottom_text"
  >
    <!-- Textarea -->
    <textarea
      v-model="bottomTextTemp"
      type="text"
      :rows="5"
      class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
      placeholder="Type your Bottom title description..."
    ></textarea>
    <!-- <p v-if="!bottomTextTemp && isChecked" class="text-sm text-red-600 mt-2">
      You must enter something
    </p> -->
  </CustomDialog>
</template>

<script setup>
import { computed, ref } from "vue";
import IconButton from "@/Components/IconButton.vue";
import { Icon } from "@iconify/vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import {
  changesSaved,
  somethingWentWrong,
  toolbarConfig,
} from "@/helpers/utilities";
import { useStore } from "vuex";

const props = defineProps({
  screenWidth: {
    type: [String, Number],
  },
  bottom_text: {
    type: String,
  },
});

const dialogRef = ref();
const bottomText = ref(props.bottom_text);
const loading = ref(false);
const disabled = ref(false);
const bottomTextTemp = ref(bottomText.value);
const isChecked = ref(false);
const store = useStore();
const translations = computed(() => store.getters.translations);

const openDialogEdit = () => {
  dialogRef.value.openDialog();
};

const handleSubmit = async () => {
  isChecked.value = true;
  loading.value = true;
  disabled.value = true;
  try {
    const response = await axios.patch(
      `/api/contractor/bottom-closing-text`,
      {
        bottom_text: bottomTextTemp.value,
      },
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved("Bottom Text successfully saved");
      bottomText.value = bottomTextTemp.value;
      dialogRef.value.closeDialog();
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
    disabled.value = false;
  }
};

const handleClosed = () => {
  console.log("here");
  isChecked.value = false;
};
</script>
