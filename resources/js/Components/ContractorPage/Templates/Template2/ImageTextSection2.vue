<template>
  <!-- Display Saved Sections -->
  <div
    v-if="sections && sections.length > 0"
    :style="{
      color: selectedColorScheme[2],
    }"
    class="flex gap-4 flex-col"
  >
    <div v-for="(section, index) in sections" :key="section.id">
      <!-- class="rounded-md border relative border-gray-300 p-2 sm:p-2" -->
      <!-- Only Text -->
      <div
        v-if="!section.section_image && section.section_text"
        class="w-full p-4 md:p-6 text-xl md:text-2xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold text-center"
      >
        {{ section.section_text }}
      </div>

      <!-- Only Image -->
      <div
        v-if="section.section_image && !section.section_text"
        class="w-full h-full bg-[#222] rounded-md"
      >
        <img
          @click="openImage(section.section_image)"
          :src="section.section_image"
          alt="Section Image"
          class="object-cover w-full rounded-md"
        />
      </div>
      <!-- For even items -->
      <div
        v-if="section.section_image && section.section_text && index % 2 !== 0"
        class="flex max-md:flex-col gap-2 md:gap-4 items-center"
      >
        <div
          class="w-full md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-center"
        >
          {{ section.section_text }}
        </div>
        <div class="relative w-full md:w-3/5 h-3/5 rounded-md">
          <img
            @click="openImage(section.section_image)"
            :src="section.section_image"
            alt="Section Image"
            class="object-cover w-full rounded-md"
          />
        </div>
      </div>

      <!-- For odd items -->
      <div
        v-if="section.section_image && section.section_text && index % 2 === 0"
        class="flex max-md:flex-col gap-2 md:gap-4 items-center max-md:flex-col-reverse"
      >
        <div class="relative w-full md:w-3/5 h-3/5 bg-[#222] rounded-md">
          <img
            @click="openImage(section.section_image)"
            :src="section.section_image"
            alt="Section Image"
            class="object-cover rounded-md w-full"
          />
        </div>
        <div
          class="w-2/5 md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-center"
        >
          {{ section.section_text }}
        </div>
      </div>
      <!-- <div
        v-if="section.section_image && section.section_text && index % 2 === 0"
        class="relative"
        @click="openImage(section.section_image)"
      >
        <img
          :src="section.section_image"
          alt="Section Image"
          class="object-cover w-full rounded-md"
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
      </div> -->
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
  image_sections: {
    type: Array,
  },
  contractorId: {
    type: Number,
  },
});
const store = useStore();
const sections = ref(props.image_sections);

const selectedImage = ref("");

const imageIncDialogRef = ref();

//Computed
const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme || template1Default
);

// Methods

const openImage = (imageSrc) => {
  selectedImage.value = imageSrc;
  console.log("infunction call");
  imageIncDialogRef.value.openDialog();
};
</script>
