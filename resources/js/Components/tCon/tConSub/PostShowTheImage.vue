<script setup>
import { onMounted, ref, watch } from "vue";

import { POSTS_IMAGES_FULL_PATH } from "../../../config/constants";

const props = defineProps({
  image: String,
  numberOfImages: Number,
  allPortraits: {
    type: Boolean,
    default: false,
  },
  firstTwoImages: {
    type: Boolean,
    default: false,
  },
  smallestHeight: {
    type: [String, Number],
    default: 1000,
  },
  smallestHeightFirstTwo: {
    type: [String, Number],
    default: 1000,
  },
  plusImages: Boolean,
  cropImage: Boolean,
});

const playVideo = ref(false);
const imageRef = ref(null);
const heights = ref([]);
const dimensions = ref({}); // this is the object to hold dimensions
// made reactive for watch()
const emit = defineEmits(["updateHeight"]);

function image_path(img) {
  // function adds the filepath
  return POSTS_IMAGES_FULL_PATH + img;
}

function isVideo(img) {
  // determine if video
  let extension = img.split(".").pop();
  if ((extension == "mp4") | (extension == "mov")) {
    playVideo.value = true;
  } else {
    playVideo.value = false;
  }
  return playVideo.value;
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
  async () => {
    dimensions.value = await loadImageDimensions(props.image);
    onImageLoad();
  },
  { immediate: true }
);

const onImageLoad = () => {
  if (imageRef.value) {
    setTimeout(() => {
      let imgHeight = imageRef.value.height;

      emit("updateHeight", {
        height: imgHeight,
        imageLength: props.numberOfImages,
        firstTwoImages: props.firstTwoImages,
      }); // Emitting the new smallest height
    }, 0);
  }
};

// Check immediately on mount
// onMounted(onImageLoad);
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
        ref="imageRef"
        v-if="firstTwoImages && allPortraits"
        :style="{
          height: smallestHeightFirstTwo + 'px',
        }"
        :class="`w-full hello  object-cover object-center rounded-lg`"
        :src="image_path(props.image)"
        alt=""
      />
      <img
        v-else-if="allPortraits"
        :style="{
          height: smallestHeight + 'px',
        }"
        ref="imageRef"
        :class="`w-full  object-cover object-center rounded-lg`"
        :src="image_path(props.image)"
        alt=""
      />

      <img
        v-else-if="cropImage"
        class="max-h-[200px] x350:max-h-[250px] xs:max-h-[300px] md:max-h-[350px] lg:max-h-[546px] w-full object-cover object-center rounded-lg"
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
