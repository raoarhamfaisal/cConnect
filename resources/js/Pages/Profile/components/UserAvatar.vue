<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const { imageSrc } = defineProps(["imageSrc"]);
const emit = defineEmits();
const showUpdate = ref(false);
const file = ref(null);
const updatedImage = ref(null);

const updateImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", (event) => {
    file.value = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      updatedImage.value = e.target.result;
    };

    if (file.value) {
      reader.readAsDataURL(file.value);
    }
    emit("update-image", file.value);
  });

  input.click();
};
</script>

<template>
  <div
    class="relative w-14 h-14 cursor-pointer inline-block"
    @mouseover="showUpdate = true"
    @mouseout="showUpdate = false"
  >
    <img
      v-if="imageSrc"
      class="object-cover w-full h-full rounded-full"
      :src="imageSrc"
      alt="avatar"
    />
    <img
      v-else-if="updatedImage"
      class="object-cover w-full h-full rounded-full"
      :src="updatedImage"
      alt="avatar"
    />
    <div
      v-else
      class="object-cover w-full h-full rounded-full border-2 border-gray-100 flex items-center justify-center"
    >
      <Icon icon="mdi:camera" color="#777" width="24" />
    </div>
    <div
      class="rounded-full text-sm absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white"
      v-show="showUpdate"
      @click="updateImage"
    >
      Update
    </div>
  </div>
</template>
