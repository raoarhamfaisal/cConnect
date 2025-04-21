<template>
  <div v-if="profile && translations && Object.keys(translations).length > 0">
    <div class="flex flex-col gap-3 sm:gap-4">
      <ProfileHeaderEdit
        :screenWidth="screenWidth"
        :averageRating="average_rating"
        :profile="profile"
      />

      <Templates
        :templateList="templateList"
        :colorSchemeList="colorSchemeList"
        :screenWidth="screenWidth"
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
          <Icon icon="mdi:plus-thick" />
          {{
            translations &&
            translations.about_us_why_you_should_work_for_or_hire_us
          }}
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
          :contractorId="profile.user_id"
        />
      </Card>
      <SocialLinksSectionEdit :screenWidth="screenWidth" :profile="profile" />

      <!-- Image Selection -->
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <div class="flex gap-2 flex-col">
          <heading-card
            class="mb-2"
            :style="{
              marginBottom: '8px',
              fontWeight: 800,
              fontSize: screenWidth > 640 ? '24px' : '20px',
            }"
            :heading="translations && translations.title_image_section"
          />
          <ImageTextSectionEdit
            :image_sections="profile.image_sections"
            :contractor-id="profile.id"
            :screen-width="screenWidth"
          />
          <!-- bottom text show -->
          <div
            v-if="bottomText"
            :class="`mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3   rounded-lg closing`"
          >
            <div class="flex justify-between">
              <div
                class="flex text-blue-rgba items-center font-extrabold text-2xl"
              >
                {{
                  translations &&
                  translations.about_us_why_you_should_work_for_or_hire_us
                }}
              </div>
              <IconButton
                @click="openDialogEdit"
                icon="nimbus:edit"
                color="#1864ab"
              />
            </div>
            <div class="default ck-content" v-html="processedBottomText"></div>
            <!-- <div v-html="'<strong>Test</strong>'"></div> -->
          </div>
          <heading-card
            class="mb-2 mt-4"
            :style="{
              marginBottom: '8px',
              fontWeight: 800,
              fontSize: screenWidth > 640 ? '24px' : '20px',
            }"
            ::heading="translations && translations.brag_sections"
          />
          <BragSectionEdit
            :brag_sections="profile.brag_sections"
            :contractor-id="profile.id"
            :screen-width="screenWidth"
          />

          <ClosingTitleTextEdit
            :closing_text="profile.closing_text"
            :screen-width="screenWidth"
          />
          <CustomDialog
            :submitText="translations && translations.save"
            :loading="loading"
            :disabled="disabled"
            :overflowAllowed="true"
            @submit="handleSubmit"
            @closed="handleClosed"
            ref="dialogRef"
            :title="translations && translations.add_bottom_text"
          >
            <div class="closing default">
              <ckeditor
                :editor="editor"
                @ready="onReady"
                v-model="editorData"
                :config="editorConfig"
              ></ckeditor>
            </div>
          </CustomDialog>
        </div>
      </Card>
    </div>
  </div>
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
import { computed, ref } from "vue";
import IconButton from "@/Components/IconButton.vue";
import { Icon } from "@iconify/vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import {
  changesSaved,
  somethingWentWrong,
  toolbarConfig,
} from "@/helpers/utilities";
import { useStore } from "vuex";

// Province
const props = defineProps({
  profile: Object,
  region_name: String,
  templateList: Array,
  colorSchemeList: Array,
  screenWidth: Number,
  total_reviews: [Number, String],
  average_rating: [Number, String],
  starPercentages: {
    type: Array,
    default: [],
  },
});
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

//  Emits

const dialogRef = ref();
const bottomText = ref(decodeHtml(props.profile.bottom_text));
const loading = ref(false);
const disabled = ref(false);
const bottomTextTemp = ref(bottomText.value);
const isChecked = ref(false);
// Use the Classic Editor build.
const editor = DecoupledEditor;
const editorData = ref(bottomTextTemp.value);

// Editor configuration.
const editorConfig = ref(toolbarConfig);
const onReady = (editor) => {
  // Insert the toolbar before the editable area.
  editor.ui
    .getEditableElement()
    .parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
};
const store = useStore();
// computed
const translations = computed(() => store.getters.translations);
const processedBottomText = computed(() => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(bottomText.value, "text/html");

  doc.querySelectorAll("a").forEach((anchor) => {
    const hrefValue = anchor.getAttribute("href");
    if (!hrefValue.startsWith("http://") && !hrefValue.startsWith("https://")) {
      anchor.setAttribute("href", "http://" + hrefValue);
    }
    anchor.target = "_blank";
  });

  return doc.body.innerHTML;
});
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
