<template>
  <!-- Display Saved Sections -->
  <div
    v-if="sections && sections.length > 0"
    :style="{
      color: selectedColorScheme[2],
    }"
    class="flex flex-col text-[#2d2c2b]"
  >
    <div v-for="(section, index) in sections" :key="section.id">
      <!-- Only Text -->
      <div
        class="bg-[#f8f8f8] py-10 sm:py-20"
        v-if="
          (!section.section_image || section.imageFailedToLoad) &&
          section.section_text
        "
      >
        <div
          class="w-full p-4 md:p-6 font-bold md:font-extrabold text-xl px-3 sm:px-10 md:text-3xl font-bold md:font-extrabold text-center w-full max-w-[1400px] px-3 sm:px-10 mx-auto"
        >
          {{ section.section_text }}
        </div>
      </div>
      <!-- Only Image -->
      <div
        v-if="
          section.section_image &&
          !section.imageFailedToLoad &&
          !section.section_text
        "
        class="w-full h-full bg-[#2d2c2b] py-10 sm:py-20"
      >
        <img
          @error="onImageError(index)"
          @click="openImage(section.section_image)"
          :src="section.section_image"
          alt="Section Image"
          class="object-cover w-full max-w-[1400px] px-3 sm:px-10 mx-auto"
        />
      </div>
      <!-- For even items -->

      <div
        class="bg-[#f8f8f8] py-10 sm:py-20 overflow-hidden"
        v-intersect="{
          handler: () => showAnimcation(index),
          options: {
            threshold: [0.1],
          },
        }"
        v-if="
          section.section_image &&
          !section.imageFailedToLoad &&
          section.section_text &&
          index % 2 !== 0
        "
      >
        <div
          class="flex max-md:flex-col gap-2 md:gap-4 items-center max-w-[1400px] px-3 sm:px-10 mx-auto w-full"
        >
          <!-- Text coming from the bottom -->
          <div
            class="w-full md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-left text-[#2d2c2b] duration-700 transition-all"
            :class="{
              'translate-y-0': screenWidth > 768 && isSectionVisible[index],
              'translate-y-[600px]':
                screenWidth > 768 && !isSectionVisible[index],
            }"
          >
            {{ section.section_text }}
          </div>
          <!-- Image filling from right to left -->
          <div
            class="relative w-full md:w-3/5 h-3/5 bg-[#222] rounded-md overflow-hidden transition-all duration-1000 transitioning"
            :class="{
              reveal: isSectionVisible[index],
            }"
          >
            <img
              @error="onImageError(index)"
              @click="openImage(section.section_image)"
              :src="section.section_image"
              alt="Section Image"
              class="object-cover w-full rounded-md"
            />
          </div>
        </div>
      </div>
      <!-- overlayed -->
      <div
        v-if="
          section.section_image &&
          !section.imageFailedToLoad &&
          section.section_text &&
          index % 2 === 0
        "
        @click="openImage(section.section_image)"
        class="bg-[#2d2c2b] py-10 sm:py-20 relative"
      >
        <img
          @error="onImageError(index)"
          class="max-w-[1400px] overflow-hidden hover:scale-110 hover:cursor-pointer z-50 mx-auto w-full object-cover w-full rounded-md"
          :src="section.section_image"
          alt="Section Image"
        />
        <div
          v-intersect="{
            handler: () => overlayedAnimcation(index),
            options: {
              threshold: [0.5],
            },
          }"
          class="absolute inset-0 flex justify-center items-center"
          style="
            background: radial-gradient(
              ellipse at center,
              rgba(0, 0, 0, 0.5) 0%,
              rgba(0, 0, 0, 0) 55%
            );
            /* background: radial-gradient(
              circle at center,
              rgba(0, 0, 0, 0.7),
              transparent
            ); */
          "
        >
          <span
            :style="{
              color: '#fff',

              // boxShadow:
              //   '0px 0px 15px #000000, -1px -1px 15px #000000, 1px -1px 15px #000000, -1px 1px 15px #000000, 1px 1px 15px #000000',
            }"
            :class="{
              'translate-y-0': screenWidth > 768 && isOvelayedVisible[index],
              'translate-y-[600px]':
                screenWidth > 768 && !isOvelayedVisible[index],
            }"
            class="text-center transitioning text-xl md:text-3xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold bg-opacity-50 p-2 rounded"
          >
            {{ section.section_text }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- Zoom image dialog -->
  <CustomDialog
    dialogWidth="widthAuto"
    :showFooter="false"
    ref="imageIncDialogRef"
    :title="translations && translations.your_image"
  >
    <div
      class="max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]"
    >
      <img @error="onImageError(index)" :src="selectedImage" />
    </div>
  </CustomDialog>
</template>

<script setup>
import { Icon } from "@iconify/vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { computed, ref } from "vue";
import { template1Default } from "@/helpers/templateDefaults";

import { useStore } from "vuex";
// Province
const props = defineProps({
  screenWidth: {
    type: [String, Number],
  },
  brag_sections: {
    type: Array,
  },
  contractorId: {
    type: Number,
  },
});
const store = useStore();

const sections = ref(props.brag_sections);

const selectedImage = ref("");

const imageIncDialogRef = ref();

//Computed
const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme || template1Default
);
const translations = computed(() => store.getters.translations);

// Methods

const onImageError = (index) => {
  sections.value[index].imageFailedToLoad = true;
};

const openImage = (imageSrc) => {
  selectedImage.value = imageSrc;
  imageIncDialogRef.value.openDialog();
};

const isSectionVisible = ref(Array(sections.value.length).fill(false));
const isOvelayedVisible = ref(Array(sections.value.length).fill(false));

const showAnimcation = (index) => {
  const dialogContainer = document.getElementById("dialogContainer");
  if (window.scrollY > 100 || dialogContainer.scrollTop > 100) {
    console.log("in animation for section:", index);
    isSectionVisible.value[index] = true;
  }
};
const overlayedAnimcation = (index) => {
  const dialogContainer = document.getElementById("dialogContainer");
  if (window.scrollY > 100 || dialogContainer.scrollTop > 100) {
    isOvelayedVisible.value[index] = true;
  }
};
</script>
<style scoped>
@keyframes revealAnimation {
  from {
    clip-path: inset(0 0 0 100%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.reveal {
  animation: revealAnimation 1.5s forwards;
}

.transitioning {
  transition: all 1.5s;
}
</style>
