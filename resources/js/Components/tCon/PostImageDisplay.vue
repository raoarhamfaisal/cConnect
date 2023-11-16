<script setup>
import PostShowTheImage from "@/Components/tCon/tConSub/PostShowTheImage.vue";
import { POSTS_IMAGES_FULL_PATH } from "@/config/constants";
import { computed, watch, ref } from "vue";

const props = defineProps({
  imageArray: Array,

  numberOfImages: {
    type: Number,
    default: 0,
  },
});
const smallestHeight = ref(null);
const portraitHeight = ref([]);
const smallestHeightFirstTwo = ref(null);
const heights = ref([]);

const gridConfigs = computed(() => {
  const remainingLength = props.imageArray.length - 2;
  const configs = [];
  let i = 2; // start from the third image

  switch (remainingLength) {
    case 4:
      configs.push(
        { cols: 2, start: i, end: i + 2 },
        { cols: 2, start: i + 2, end: i + 4 }
      );
      break;

    default:
      configs.push(
        { cols: 2, start: i, end: i + 2 },
        { cols: 3, start: i + 2, end: i + 5 }
      );
      break;
  }
  return configs;
});

const cropImage = false; //  Tells PostShowTheImage.vue to crop image

const plusImages = true; // tells PostShowTheImage.vue to
// display the "+" - prop is default is false
// we send props.on last image of >= 5
const allPortraits = ref(false); // Initial value

function image_path(img) {
  // function adds the filepath
  return POSTS_IMAGES_FULL_PATH + img;
}
const isImagePortrait = async (imageSrc) => {
  if (!imageSrc) {
    return false;
  }
  const newImg = new Image();
  newImg.src = imageSrc; // assuming image_path is applied before
  await new Promise((resolve) => (newImg.onload = resolve));

  return newImg.naturalWidth < newImg.naturalHeight;
};
const checkAllImagesPortrait = async (imageArray) => {
  if (!imageArray || imageArray.length === 0) {
    allPortraits.value = false;
    return;
  }

  // Fetch portrait status for all images
  const portraitStatuses = await Promise.all(
    imageArray.map((image) => isImagePortrait(image_path(image)))
  );

  // Set allPortraits to true only if all images are portrait
  allPortraits.value = portraitStatuses.every((status) => status);
};
// const getNaturalHeight = (src) => {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.onload = () => resolve(img.naturalHeight);
//     img.src = src;
//   });
// };
// Watch the image array
watch(
  () => props.imageArray,
  async (newImageArray) => {
    if (newImageArray.length === 2) {
      console.log(newImageArray, "newImageArray");
      await checkAllImagesPortrait(props.imageArray);
    }
    if (newImageArray.length > 3) {
      await checkAllImagesPortrait(props.imageArray.slice(0, 2));
      console.log(props.imageArray.slice(0, 2), "first2");
    }
  },
  { immediate: true }
);
const handleUpdateHeight = ({ height, imageLength, firstTwoImages }) => {
  if (firstTwoImages) {
    portraitHeight.value.push(height);
    if (portraitHeight.value.length === 2) {
      smallestHeightFirstTwo.value = Math.min(...portraitHeight.value);
      portraitHeight.value = [];
    }
  } else if (!firstTwoImages) {
    heights.value.push(height);
    if (heights.value.length === imageLength || heights.value.length === 5) {
      smallestHeight.value = Math.min(...heights.value);
    }
  }
};
</script>

<template>
  <div class="w-full">
    <p>numberOfImages: {{ numberOfImages }}</p>

    <div
      v-if="numberOfImages == 1"
      class="flex flex-col flex-nowrap w-full gap-1 pb-1"
    >
      <!-- 1 Image here     ++++++++++++++++++++++++++++++++++
                    +++++++++++++++++++++++++++++++++++++++++++++++++++++-->
      <PostShowTheImage
        :image="imageArray[0]"
        :numberOfImages="numberOfImages"
        :cropImage="true"
        :plusImages="false"
      />
    </div>

    <div
      v-if="numberOfImages == 2 && !allPortraits"
      class="flex flex-col flex-nowrap w-full gap-1 pb-1"
    >
      <!-- 2 Images Here    +++++++++++++++++++++++++++++
                    +++++++++++++++++++++++++++++++++++++++++++++++ -->
      <PostShowTheImage
        :image="imageArray[0]"
        :numberOfImages="numberOfImages"
        :cropImage="true"
        :plusImages="false"
      />
      <PostShowTheImage
        :image="imageArray[1]"
        :numberOfImages="numberOfImages"
        :cropImage="true"
        :plusImages="false"
      />
    </div>
    <div
      v-if="numberOfImages == 2 && allPortraits"
      class="flex flex-nowrap w-full gap-1 pb-1"
    >
      <!-- 2 Images Here    +++++++++++++++++++++++++++++
                    +++++++++++++++++++++++++++++++++++++++++++++++ -->
      <PostShowTheImage
        class="w-1/2"
        :allPortraits="allPortraits"
        @updateHeight="handleUpdateHeight"
        :smallestHeight="smallestHeight"
        :image="imageArray[0]"
        :numberOfImages="numberOfImages"
        :cropImage="true"
        :plusImages="false"
      />
      <PostShowTheImage
        class="w-1/2"
        :allPortraits="allPortraits"
        @updateHeight="handleUpdateHeight"
        :smallestHeight="smallestHeight"
        :image="imageArray[1]"
        :numberOfImages="numberOfImages"
        :cropImage="true"
        :plusImages="false"
      />
    </div>

    <div v-if="numberOfImages == 3">
      <!-- 3 Images Here    ++++++++++++++++++++++++++++++++++
                +++++++++++++++++++++++++++++++++++++++++++++++++++++-->
      <div class="flex flex-col flex-nowrap w-full gap-1 pb-1">
        <PostShowTheImage
          :image="imageArray[0]"
          :numberOfImages="numberOfImages"
          :cropImage="true"
          :plusImages="false"
        />
      </div>
      <div class="grid grid-rows-1 grid-cols-2 w-full h-full gap-1 pb-1">
        <PostShowTheImage
          :image="imageArray[1]"
          @updateHeight="handleUpdateHeight"
          :allPortraits="true"
          :smallestHeight="smallestHeight"
          :numberOfImages="numberOfImages - 1"
          :cropImage="true"
          :plusImages="false"
        />
        <PostShowTheImage
          :image="imageArray[2]"
          @updateHeight="handleUpdateHeight"
          :allPortraits="true"
          :smallestHeight="smallestHeight"
          :numberOfImages="numberOfImages - 1"
          :cropImage="true"
          :plusImages="false"
        />
      </div>
    </div>

    <div v-if="numberOfImages == 4">
      <!-- 4 Images Here    ++++++++++++++++++++++++++++++++++
                +++++++++++++++++++++++++++++++++++++++++++++++++++++-->

      <div
        class="flex flex-col flex-nowrap w-full gap-1 pb-1"
        v-if="!allPortraits"
      >
        <div>
          <PostShowTheImage
            :image="imageArray[0]"
            :numberOfImages="numberOfImages"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
        <div>
          <PostShowTheImage
            :image="imageArray[1]"
            :numberOfImages="numberOfImages"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
      </div>
      <div v-if="allPortraits" class="flex flex-nowrap w-full gap-1 pb-1">
        <PostShowTheImage
          class="w-1/2"
          :numberOfImages="2"
          :allPortraits="allPortraits"
          @updateHeight="handleUpdateHeight"
          :smallestHeightFirstTwo="smallestHeightFirstTwo"
          :image="imageArray[0]"
          :firstTwoImages="true"
          :cropImage="true"
          :plusImages="false"
        />
        <PostShowTheImage
          class="w-1/2"
          :allPortraits="allPortraits"
          :firstTwoImages="true"
          @updateHeight="handleUpdateHeight"
          :smallestHeightFirstTwo="smallestHeightFirstTwo"
          :image="imageArray[1]"
          :numberOfImages="2"
          :cropImage="true"
          :plusImages="false"
        />
      </div>
      <div class="grid grid-rows-1 grid-cols-2 w-full h-full gap-1 pb-1">
        <div>
          <PostShowTheImage
            :image="imageArray[2]"
            :numberOfImages="2"
            @updateHeight="handleUpdateHeight"
            :allPortraits="true"
            :smallestHeight="smallestHeight"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
        <div>
          <PostShowTheImage
            :image="imageArray[3]"
            :numberOfImages="2"
            @updateHeight="handleUpdateHeight"
            :allPortraits="true"
            :smallestHeight="smallestHeight"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
      </div>
    </div>

    <div v-if="numberOfImages == 5">
      <!-- 5 Images Here    ++++++++++++++++++++++++++++++++++
                +++++++++++++++++++++++++++++++++++++++++++++++++++++-->
      <div
        class="flex flex-col flex-nowrap w-full gap-1 pb-1"
        v-if="!allPortraits"
      >
        <div>
          <PostShowTheImage
            :image="imageArray[0]"
            :numberOfImages="numberOfImages"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
        <div>
          <PostShowTheImage
            :image="imageArray[1]"
            :numberOfImages="numberOfImages"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
      </div>
      <div v-if="allPortraits" class="flex flex-nowrap w-full gap-1 pb-1">
        <PostShowTheImage
          class="w-1/2"
          :numberOfImages="2"
          :allPortraits="allPortraits"
          @updateHeight="handleUpdateHeight"
          :smallestHeightFirstTwo="smallestHeightFirstTwo"
          :image="imageArray[0]"
          :firstTwoImages="true"
          :cropImage="true"
          :plusImages="false"
        />
        <PostShowTheImage
          class="w-1/2"
          :allPortraits="allPortraits"
          :firstTwoImages="true"
          @updateHeight="handleUpdateHeight"
          :smallestHeightFirstTwo="smallestHeightFirstTwo"
          :image="imageArray[1]"
          :numberOfImages="2"
          :cropImage="true"
          :plusImages="false"
        />
      </div>
      <div class="grid grid-rows-1 grid-cols-3 w-full h-full gap-1 pb-1">
        <div>
          <PostShowTheImage
            :image="imageArray[2]"
            :numberOfImages="3"
            @updateHeight="handleUpdateHeight"
            :allPortraits="true"
            :smallestHeight="smallestHeight"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
        <div>
          <PostShowTheImage
            :image="imageArray[3]"
            :numberOfImages="3"
            @updateHeight="handleUpdateHeight"
            :allPortraits="true"
            :smallestHeight="smallestHeight"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
        <div>
          <PostShowTheImage
            :image="imageArray[4]"
            :numberOfImages="3"
            @updateHeight="handleUpdateHeight"
            :allPortraits="true"
            :smallestHeight="smallestHeight"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
      </div>
    </div>

    <div v-if="numberOfImages >= 6">
      <!-- 6 Images Here    ++++++++++++++++++++++++++++++++++
                +++++++++++++++++++++++++++++++++++++++++++++++++++++-->
      <div
        v-if="!allPortraits"
        class="flex flex-col flex-nowrap w-full gap-1 pb-1"
      >
        <div>
          <PostShowTheImage
            :image="imageArray[0]"
            :numberOfImages="numberOfImages"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
        <div>
          <PostShowTheImage
            :image="imageArray[1]"
            :numberOfImages="numberOfImages"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
      </div>
      <div v-if="allPortraits" class="flex flex-nowrap w-full gap-1 pb-1">
        <PostShowTheImage
          class="w-1/2"
          :numberOfImages="2"
          :allPortraits="allPortraits"
          @updateHeight="handleUpdateHeight"
          :smallestHeightFirstTwo="smallestHeightFirstTwo"
          :image="imageArray[0]"
          :firstTwoImages="true"
          :cropImage="true"
          :plusImages="false"
        />
        <PostShowTheImage
          class="w-1/2"
          :allPortraits="allPortraits"
          :firstTwoImages="true"
          @updateHeight="handleUpdateHeight"
          :smallestHeightFirstTwo="smallestHeightFirstTwo"
          :image="imageArray[1]"
          :numberOfImages="2"
          :cropImage="true"
          :plusImages="false"
        />
      </div>
      <!-- Looping through grid configurations -->
      <div
        v-for="(config, cIndex) in gridConfigs"
        :key="cIndex"
        :class="`grid grid-cols-${config.cols} gap-1 pb-1`"
      >
        <div
          v-for="(image, index) in imageArray.slice(config.start, config.end)"
          :key="index"
        >
          <PostShowTheImage
            v-if="index === 2"
            @updateHeight="handleUpdateHeight"
            :allPortraits="true"
            :cropImage="true"
            :smallestHeight="smallestHeight"
            :image="image"
            :numberOfImages="numberOfImages - 2"
            :plusImageNumber="imageArray.length - config.end + 1"
          />
          <PostShowTheImage
            v-else
            :numberOfImages="numberOfImages - 2"
            @updateHeight="handleUpdateHeight"
            :allPortraits="true"
            :smallestHeight="smallestHeight"
            :image="image"
            :cropImage="true"
            :plusImages="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <div
v-for="(config, cIndex) in gridConfigs"
:key="cIndex"
:class="`grid grid-cols-${config.cols} gap-1 pb-1`"
>
<div
  v-for="(image, index) in imageArray.slice(config.start, config.end)"
  :key="index"
>

  <PostShowTheImage
    v-if="index < 2"
    :numberOfImages="numberOfImages - 2"
    @updateHeight="handleUpdateHeight"
    :allPortraits="true"
    :smallestHeight="smallestHeight"
    :image="image"
    :cropImage="true"
    :plusImageNumber="0"
  />
  <PostShowTheImage
    v-else
    :numberOfImages="numberOfImages - 2"
    @updateHeight="handleUpdateHeight"
    :allPortraits="true"
    :smallestHeight="smallestHeight"
    :image="image"
    :cropImage="true"
    :plusImageNumber="imageArray.length - config.end + 1"
  />
 
</div> -->
