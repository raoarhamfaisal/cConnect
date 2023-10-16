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
      <!-- class="rounded-md border relative border-gray-300 p-2 sm:p-2" -->
      <!-- Only Text -->
      <div
        class="bg-[#f8f8f8] py-20"
        v-if="!section.section_image && section.section_text"
      >
        <div
          class="w-full p-4 md:p-6 font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold text-center w-full max-w-[1400px] mx-auto"
        >
          {{ section.section_text }}
        </div>
      </div>
      <!-- Only Image -->
      <div
        v-if="section.section_image && !section.section_text"
        class="w-full h-full bg-[#2d2c2b] py-20 rounded-md"
      >
        <img
          @click="openImage(section.section_image)"
          :src="section.section_image"
          alt="Section Image"
          class="object-cover w-full max-w-[1400px] mx-auto"
        />
      </div>
      <!-- For even items -->
      <div
        class="bg-[#f8f8f8] py-20"
        v-if="section.section_image && section.section_text && index % 2 !== 0"
      >
        <div
          class="flex max-md:flex-col gap-2 md:gap-4 items-center max-w-[1400px] mx-auto w-full"
        >
          <div
            class="w-full md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-left text-[#2d2c2b]"
          >
            {{ section.section_text }}
          </div>
          <div class="relative w-full md:w-3/5 h-3/5 bg-[#222] rounded-md">
            <img
              @click="openImage(section.section_image)"
              :src="section.section_image"
              alt="Section Image"
              class="object-cover w-full rounded-md"
            />
          </div>
        </div>
      </div>
      <!-- For odd items -->
      <div
        v-if="section.section_image && section.section_text && index % 2 === 0"
        @click="openImage(section.section_image)"
        class="bg-[#2d2c2b] py-20 relative"
      >
        <img
          class="max-w-[1400px] mx-auto w-full object-cover w-full rounded-md"
          :src="section.section_image"
          alt="Section Image"
        />
        <div class="absolute inset-0 flex justify-center items-center">
          <span
            :style="{
              color: '#fff',
              backgroundColor: '#000000' + '80',
            }"
            class="text-center text-xl md:text-3xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold bg-opacity-50 p-2 rounded"
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
    title="Your Image"
  >
    <div
      class="max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]"
    >
      <img :src="selectedImage" />
    </div>
  </CustomDialog>
</template>

<script setup>
import { Icon } from "@iconify/vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { computed, ref } from "vue";
import { template1Default } from "@/helpers/templateDefaults";

import { useStore } from "vuex";
// State
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

// Methods

const openImage = (imageSrc) => {
  selectedImage.value = imageSrc;
  imageIncDialogRef.value.openDialog();
};
</script>
