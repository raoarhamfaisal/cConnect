<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  image: String,
  numberOfImages: Number,
  plusImages: Boolean,
  cropImage: Boolean,
});

const dimensions = ref({}); // this is the object to hold dimensions
// made reactive for watch()

function image_path(img) {
  // function adds the filepath
  return "/uploads/posts/" + img;
}

function isVideo(img) {
  // determine if video
  let extension = img.split(".").pop();
  if ((extension == "mp4") | (extension == "mov")) {
    this.playVideo = true;
  } else {
    this.playVideo = false;
  }
  return this.playVideo;
}

// purpose id to get the image dimensions but must wait until newImg()
// file is loaded so I used watch() with async instead of trying to do
// async computed which is ugly.
// When props.image changes we run loadImageDimensions()
const loadImageDimensions = async (imageSrc) => {
  if (!imageSrc) {
    return {};
  }
  const newImg = new Image();
  newImg.src = image_path(imageSrc);
  await new Promise((resolve) => (newImg.onload = resolve));
  return {
    nHeight: newImg.naturalHeight,
    nWidth: newImg.naturalWidth,
    nAspect: newImg.naturalWidth / newImg.naturalHeight,
    nPortrait: newImg.naturalWidth > newImg.naturalHeight ? false : true,
  };
};
watch(
  () => props.image,
  async () => (dimensions.value = await loadImageDimensions(props.image)),
  { immediate: true }
);
</script>

<template>
  <div>
    <span>Height: {{ dimensions.nHeight }}</span>

    <video
      v-if="isVideo(props.image)"
      class="w-full h-full rounded-lg"
      controls
      autoplay
      loop
      muted
    >
      <source :src="image_path(props.image)" type="video/mp4" />
    </video>

    <div v-else>
      <img
        v-if="cropImage"
        class="h-full w-full rounded-lg"
        :src="image_path(props.image)"
        alt=""
      />
      <img
        v-else
        class="w-full h-full object-fill object-center rounded-lg"
        :src="image_path(props.image)"
        alt=""
      />

      <div
        v-if="plusImages"
        class="fixed w-full h-full grid place-items-center blue-400 text-red-600 font-extrabold text-7xl"
      >
        +000000
      </div>
    </div>
  </div>
</template>

<style scoped>
.scale-image {
  object-fit: cover;
  height: 200px;
}
</style>
