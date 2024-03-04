<template>
  <div v-if="profile">
    <div class="flex flex-col gap-3 sm:gap-4 closing">
      <ProfileHeaderEdit
        :screenWidth="screenWidth"
        :averageRating="average_rating"
        :profile="profile"
      />

      <Templates
        :screenWidth="screenWidth"
        @change-mode="changeMode"
        :profile="profile"
      />

      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <RegionTradeSectionEdit
          :screenWidth="screenWidth"
          :region_name="region_name"
          :profile="profile"
        />
        <!-- Add Bottom Text Button -->
        <button
          v-if="!bottomText"
          @click="openDialogEdit"
          class="w-full flex gap-2 mt-3 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg"
        >
          <Icon icon="mdi:plus-thick" /> About Us - Why You Should Work For or
          Hire Us
        </button>

        <!-- CustomDialog for adding -->
      </Card>
      <AdditionalInfoSectionEdit
        :screenWidth="screenWidth"
        :profile="profile"
      />
      <!-- Average Rating -->
      <Card
        v-if="average_rating && starPercentages"
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <AverageRating
          :averageRating="average_rating"
          :starPercentages="starPercentages"
          :length="total_reviews"
          class="mb-6"
          :contractorId="profile.id"
        />
      </Card>
      <SocialLinksSectionEdit :screenWidth="screenWidth" :profile="profile" />

      <!-- Image Selection -->
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        v-if="
          profile.bottom_text ||
          profile.closing_text ||
          (profile.image_sections && profile.image_sections.length > 0)
        "
      >
        <div class="flex gap-2 flex-col">
          <heading-card
            class="mb-2"
            :style="{
              marginBottom: '8px',
              fontWeight: 800,
              fontSize: screenWidth > 640 ? '24px' : '20px',
            }"
            :heading="`Title/Image Sections`"
          />
          <ImageTextSectionEdit
            :image_sections="profile.image_sections"
            :contractor-id="profile.id"
            :screen-width="screenWidth"
          />
          <heading-card
            class="mb-2 mt-4"
            :style="{
              marginBottom: '8px',
              fontWeight: 800,
              fontSize: screenWidth > 640 ? '24px' : '20px',
            }"
            :heading="`Brag Sections`"
          />
          <BragSectionEdit
            :image_sections="profile.image_sections"
            :contractor-id="profile.id"
            :screen-width="screenWidth"
          />

          <!-- bottom text show -->
          <div
            v-if="bottomText"
            :class="`mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3   rounded-lg`"
          >
            <div class="flex justify-between">
              <div
                class="flex text-blue-rgba items-center font-extrabold text-2xl"
              >
                About Us - Why You Should Work For or Hire Us
              </div>
              <IconButton
                @click="openDialogEdit"
                icon="nimbus:edit"
                color="#1864ab"
              />
            </div>
            <div v-html="bottomText"></div>
          </div>
          <ClosingTitleTextEdit
            :closing_text="profile.closing_text"
            :screen-width="screenWidth"
          />
        </div>
      </Card>
    </div>
  </div>

  <CustomDialog
    submitText="Save"
    :loading="loading"
    :disabled="disabled"
    @submit="handleSubmit"
    @closed="handleClosed"
    ref="dialogRef"
    title="Add Bottom Text"
  >
    <div class="closing">
      <ckeditor
        :editor="editor"
        @ready="onReady"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
    </div>
  </CustomDialog>
</template>

<script setup>
import AverageRating from "@/Components/Ratings/Contractor/PartialsVisiting/AverageRating.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";

import Card from "@/Components/Card.vue";

import ProfileHeaderEdit from "@/Components/ContractorPage/Sections/Edit/ProfileHeaderEdit.vue";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

// import MyEditor from "@/Components/ContractorPage/Sections/Edit/MyEditor.vue";
import RegionTradeSectionEdit from "@/Components/ContractorPage/Sections/Edit/RegionTradeSectionEdit.vue";
import Templates from "@/Components/ContractorPage/Sections/Edit/Templates.vue";
import SocialLinksSectionEdit from "@/Components/ContractorPage/Sections/Edit/SocialLinksSectionEdit.vue";
import AdditionalInfoSectionEdit from "@/Components/ContractorPage/Sections/Edit/AdditionalInfoSectionEdit.vue";
import ClosingTitleTextEdit from "@/Components/ContractorPage/Sections/Edit/ClosingTitleTextEdit.vue";
import ImageTextSectionEdit from "@/Components/ContractorPage/Sections/Edit/ImageTextSectionEdit.vue";
import BragSectionEdit from "@/Components/ContractorPage/Sections/Edit/BragSectionEdit.vue";
import { ref } from "vue";
import IconButton from "@/Components/IconButton.vue";
import { Icon } from "@iconify/vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";

// State
const props = defineProps({
  profile: Object,
  region_name: String,
  screenWidth: Number,
  total_reviews: [Number, String],
  average_rating: [Number, String],
  starPercentages: {
    type: Array,
    default: [],
  },
});

//  Emits
const emit = defineEmits(["changeMode"]);

const changeMode = () => {
  emit("changeMode");
};

const dialogRef = ref();
const bottomText = ref(props.profile.bottom_text);
const loading = ref(false);
const disabled = ref(false);
const bottomTextTemp = ref(bottomText.value);
const isChecked = ref(false);
// Use the Classic Editor build.
const editor = DecoupledEditor;

// Editor content.
const editorData = ref(bottomTextTemp.value);

// Editor configuration.
const editorConfig = ref({});
const onReady = (editor) => {
  // Insert the toolbar before the editable area.
  editor.ui
    .getEditableElement()
    .parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
};
const openDialogEdit = () => {
  dialogRef.value.openDialog();
};

const handleSubmit = async () => {
  isChecked.value = true;
  loading.value = true;
  disabled.value = true;
  bottomTextTemp.value = editorData.value;

  try {
    const response = await axios.patch(
      `/api/contractor/bottom-closing-text`,
      {
        bottom_text: bottomTextTemp.value,
      },
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved("Bottom Text successfully saved");
      bottomText.value = bottomTextTemp.value;
      dialogRef.value.closeDialog();
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
    disabled.value = false;
  }
};

const handleClosed = () => {
  console.log("here");
  isChecked.value = false;
};
</script>

<style></style>
