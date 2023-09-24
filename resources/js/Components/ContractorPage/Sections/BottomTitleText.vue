<template>
  <!-- Display Saved Text -->
  <div
    v-if="bottomText"
    :class="`mt-1 flex gap-1 flex-col ${
      mode === 'edit' ? 'border-gray-300 border-2 p-3' : ''
    }  rounded-lg`"
  >
    <div class="flex justify-between" v-if="mode === 'edit'">
      <div class="flex items-center font-bold text-lg">Bottom Text</div>
      <IconButton @click="openDialogEdit" icon="mdi:edit" color="#1864ab" />
    </div>
    <div class="flex-1 flex sm:items-center">{{ bottomText }}</div>
  </div>

  <!-- Add Bottom Text Button -->
  <button
    v-if="!bottomText && mode === 'edit'"
    @click="openDialogEdit"
    class="w-full flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg"
  >
    <Icon icon="mdi:plus-thick" /> Add Bottom Text
  </button>

  <!-- CustomDialog for adding -->

  <CustomDialog
    v-if="mode === 'edit'"
    submitText="Save"
    @submit="handleSubmit"
    @closed="handleClosed"
    ref="dialogRef"
    title="Add Bottom Text"
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
import { ref } from "vue";
import IconButton from "@/Components/IconButton.vue";
import { Icon } from "@iconify/vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

defineProps({
  screenWidth: {
    type: [String, Number],
  },
  mode: {
    type: String,
    default: "",
  },
});

const dialogRef = ref();
const bottomText = ref("");
const bottomTextTemp = ref("");
const isChecked = ref(false);

const openDialogEdit = () => {
  dialogRef.value.openDialog();
};

const handleSubmit = () => {
  isChecked.value = true;
  bottomText.value = bottomTextTemp.value;

  dialogRef.value.closeDialog();
};
const handleClosed = () => {
  console.log("here");
  isChecked.value = false;
};
</script>
