<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const { imageSrc } = defineProps(["imageSrc"]);
const emit = defineEmits();
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
  <div class="relative w-36 h-36 inline-block mb-4 mt-8">
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
      class="absolute rounded-full bg-lime-600 border-2 border-green p-1 cursor-pointer positioningEditIcon"
    >
      <Icon
        icon="material-symbols:edit-sharp"
        color="white"
        width="36"
        @click="updateImage"
      />
    </div>
  </div>
</template>

<style scoped>
.positioningEditIcon {
  top: -11px;
  right: -8px;
}
</style>
