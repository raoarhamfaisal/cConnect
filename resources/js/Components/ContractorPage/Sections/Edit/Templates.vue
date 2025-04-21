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
      <Link class="rounded-full" :href="`/contractor/${profile.user_id}`">
        <button
          class="bg-white px-4 py-1 uppercase text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-2 sm:border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95"
        >
          {{ translations && translations.see_live_view }}
        </button>
      </Link>
    </div>
    <div
      class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <InputLabel class="font-bold mb-1" for="state" value="Template" />
        <TemplateSelect
          :options="templateList"
          :modelValue="form.selectedTemplate"
          @update:modelValue="updateSelectedTemplate"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
      <div>
        <InputLabel
          class="font-bold mb-1"
          for="state"
          :value="translations && translations.color_scheme"
        />
        <ColorSelect
          :options="colorSchemeList"
          :modelValue="form.selectedColorScheme"
          @update:modelValue="updateSelectedColorScheme"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
    </div>
  </Card>
</template>

<script setup>
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import { Link } from "@inertiajs/inertia-vue3";

// import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TemplateSelect from "@/Components/TemplateSelect.vue";
import ColorSelect from "@/Components/ColorSelect.vue";

// import TextInput from "@/Components/TextInput.vue";
// import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import Card from "@/Components/Card.vue";

import { computed, onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
import { startOptionToArray } from "@/helpers/utilities";
// import { colorSchemeList } from "@/helpers/selectListsHelpters";

// Province
const store = useStore();
const props = defineProps({
  templateList: Array,
  profile: Object,
  screenWidth: Number,
});
const form = reactive({
  selectedTemplate:
    props.templateList && props.templateList.length > 0
      ? props.templateList.find((item) => props.profile.template_id === item.id)
          .name
      : "",
  selectedColorScheme: "",
});

const colorSchemeList = computed(() => store.state.contractor.colorSchemeList);
const translations = computed(() => store.getters.translations);
watch(
  () => props.templateList,
  () => {
    if (props.profile && props.templateList.value.length > 0) {
      form.selectedTemplate = props.templateList.value.find(
        (item) => props.profile.template_id === item.id
      ).name;
    }
  }
);

watch(colorSchemeList, () => {
  if (props.profile && colorSchemeList.value.length > 0) {
    form.selectedColorScheme = colorSchemeList.value.find(
      (item) => props.profile.color_scheme_id === item.id
    ).name;
  }
});
const updateSelectedTemplate = (value) => {
  console.log(value, "value");
  form.selectedTemplate = value.name;
  store.dispatch("contractor/updatedSelctedTemplate", value.id);
};

const updateSelectedColorScheme = (value) => {
  console.log(value);
  form.selectedColorScheme = value.name;
  const selectedScheme = startOptionToArray(value);
  console.log(selectedScheme);
  store.dispatch("contractor/updatedSelectedColorScheme", value.id);
  store.commit("contractor/setSelectedColorScheme", selectedScheme);

  console.log(value, "value");
};

onMounted(() => {
  console.log("watch called", colorSchemeList);
  if (props.profile && colorSchemeList.value.length > 0) {
    form.selectedColorScheme = colorSchemeList.value.find(
      (item) => props.profile.color_scheme_id === item.id
    ).name;
  }
});
</script>
