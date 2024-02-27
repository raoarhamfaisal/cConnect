<template>
  <!-- Header -->
  <Card
    :shadowLevel="2"
    bgColor="white"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <div class="flex justify-between">
      <heading-card
        class="mb-2"
        :style="{
          marginBottom: '8px',
          fontWeight: 800,
          fontSize: screenWidth > 640 ? '24px' : '20px',
        }"
        :heading="`Template`"
      />
      <!-- see live view-->
      <Link
        v-if="mode === 'edit'"
        class="rounded-full"
        :href="`/contractor/${profile.id}`"
      >
        <button
          class="bg-white px-4 py-1 uppercase text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-2 sm:border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95"
        >
          See Live View
        </button>
      </Link>
    </div>
    <div
      class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <InputLabel class="font-bold mb-1" for="state" value="Template" />
        <SelectProfile
          :options="templateList"
          :modelValue="form.selectedTemplate"
          @update:modelValue="
            (value) => {
              form.selectedTemplate = value;
            }
          "
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
      <div>
        <InputLabel class="font-bold mb-1" for="state" value="Color Scheme" />
        <ColorSelect
          :options="colorSchemeList"
          :modelValue="form.selectedColorScheme"
          @update:modelValue="
            (value) => {
              form.selectedColorScheme = value;
            }
          "
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
    </div>
  </Card>
</template>

<script setup>
import IconButton from "@/Components/IconButton.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";

// import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import SelectProfile from "@/Components/SelectProfile.vue";
import ColorSelect from "@/Components/ColorSelect.vue";
import { templateList, colorSchemeList } from "@/helpers/selectListsHelpters";

// import TextInput from "@/Components/TextInput.vue";
// import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import Card from "@/Components/Card.vue";

import Avatar from "@/Components/Ratings/Avatar.vue";

import { computed, reactive, ref } from "vue";
import { Link } from "@inertiajs/inertia-vue3";

// State
const props = defineProps({
  profile: Object,
  screenWidth: Number,
  mode: {
    type: String,
    default: "",
  },
});
const form = reactive({
  selectedTemplate: "",
  selectedColorScheme: "",
});
</script>
