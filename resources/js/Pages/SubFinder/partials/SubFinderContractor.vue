<template>
  <Card
    :shadowLevel="3"
    :isInside="true"
    bgColor="#fff"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <ContractorHeader :contractor="contractor" :region_name="region_name" />
    <div class="flex justify-between gap-2 mt-2 sm:mt-3">
      <!-- left sections -->
      <div class="flex w-full self-start flex-col gap-2">
        <!-- left without textarea -->
        <div class="flex justify-between">
          <div class="flex justify-between flex-col gap-2">
            <!-- region & trades -->
            <div class="flex flex-col gap-2">
              <!-- regionName -->
              <div
                v-if="region_name"
                class="flex items-center w-full gap-2 text-gray-700 xs:gap-4 mt-2 sm:mt-0"
              >
                <div class="flex items-center">
                  <v-tooltip text="Region" location="top">
                    <template v-slot:activator="{ props }">
                      <Icon
                        v-bind="props"
                        class="w-6 h-6 sm:w-8 sm:h-8"
                        icon="mdi:location"
                        color="#241e6d"
                      />
                    </template>
                  </v-tooltip>
                  <div
                    class="font-bold text-sm xs:text-base sm:text-lg ml-1 xs:ml-2"
                  >
                    Region :
                  </div>
                  <div
                    class="text-xs xs:text-sm sm:translate-y-[1px] sm:text-base ml-2"
                  >
                    {{ region_name }}
                  </div>
                </div>
              </div>
              <!-- trades -->
              <TradesWithDialog v-model="tradesPost" />
            </div>
            <!-- mobile View links -->
            <div
              v-if="screenWidth <= 640"
              class="flex flex-col gap-2 mr-8 mt-2"
            >
              <InfoWithIconLink
                class="translate-x-[-2px]"
                v-if="contractor?.website_url"
                imgPath="/images/icons/website.png"
                imgClasses="w-6  h-6"
                textClasses="text-md translate-x-[-2px]"
                tooltipText="Website"
                :link="contractor?.website_url"
              />
              <InfoWithIconLink
                v-if="contractor?.facebook"
                icon="logos:facebook"
                iconClasses="w-5 h-5 sm:w-6 sm:h-6"
                textClasses="text-sm sm:text-base"
                tooltipText="Facebook"
                :link="contractor?.facebook"
              />
              <InfoWithIconLink
                v-if="contractor?.twitter"
                icon="fa6-brands:square-x-twitter"
                iconColor="black"
                iconClasses="w-5 h-5 sm:w-6 sm:h-6"
                textClasses="text-sm sm:text-base"
                tooltipText="Twitter"
                :link="contractor?.twitter"
              />
              <InfoWithIconLink
                v-if="contractor?.tiktok"
                icon="logos:tiktok-icon"
                iconClasses="w-5 h-5 sm:w-6 sm:h-6"
                textClasses="text-sm sm:text-base"
                tooltipText="TikTok"
                :link="contractor?.tiktok"
              />
              <InfoWithIconLink
                v-if="contractor?.instagram"
                icon="skill-icons:instagram"
                iconClasses="w-5 h-5 sm:w-6 sm:h-6"
                textClasses="text-sm sm:text-base"
                tooltipText="Instagram"
                :link="contractor?.instagram"
              />
              <div
                @click="openPostDialog"
                class="flex translate-x-[-3px] items-center w-full gap-2 xs:gap-4"
              >
                <button class="xs:text-md translate-x-[1px] font-semibold">
                  <svg
                    id="SvgjsSvg1017"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <defs id="SvgjsDefs1018"></defs>
                    <g id="SvgjsG1019">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill-rule="evenodd"
                        stroke-linejoin="round"
                        stroke-miterlimit="2"
                        clip-rule="evenodd"
                        viewBox="0 0 64 64"
                        width="24"
                        height="24"
                      >
                        <rect width="24" height="24" fill="none"></rect>
                        <path
                          d="M58,104C58,98.696 56.946,93.609 55.071,89.858C53.196,86.107 50.652,84 48,84C39.122,84 24.878,84 16,84C13.348,84 10.804,86.107 8.929,89.858C7.054,93.609 6,98.696 6,104C6,117.961 6,136 6,136C6,138.209 6.895,140 8,140L56,140C57.105,140 58,138.209 58,136L58,104ZM54,132L54,104C54,100.817 53.368,97.765 52.243,95.515C51.117,93.264 49.591,92 48,92C39.122,92 24.878,92 16,92C14.409,92 12.883,93.264 11.757,95.515C10.632,97.765 10,100.817 10,104L10,132L54,132Z"
                          transform="matrix(1 0 0 .5 0 -36)"
                          fill="#464898"
                          class="color000 svgShape"
                        ></path>
                        <path
                          d="M10,92L10,120C10,123.183 10.632,126.235 11.757,128.485C12.883,130.736 14.409,132 16,132C24.878,132 39.122,132 48,132C49.591,132 51.117,130.736 52.243,128.485C53.368,126.235 54,123.183 54,120C54,117.792 54.896,116 56,116C57.104,116 58,117.792 58,120C58,125.304 56.946,130.391 55.071,134.142C53.196,137.893 50.652,140 48,140C39.122,140 24.878,140 16,140C13.348,140 10.804,137.893 8.929,134.142C7.054,130.391 6,125.304 6,120L6,88C6,85.791 6.895,84 8,84L56,84C57.105,84 58,85.791 58,88C58,88 58,95.188 58,104C58,106.208 57.104,108 56,108C54.896,108 54,106.208 54,104L54,92L10,92Z"
                          transform="matrix(1 0 0 .5 0 -12)"
                          fill="#464898"
                          class="color000 svgShape"
                        ></path>
                        <path
                          d="M26,100C26,98.895 25.105,98 24,98L16,98C14.895,98 14,98.895 14,100L14,108C14,109.105 14.895,110 16,110L24,110C25.105,110 26,109.105 26,108L26,100ZM18,102L18,106L22,106L22,102L18,102Z"
                          transform="translate(0 -84)"
                          fill="#464898"
                          class="color000 svgShape"
                        ></path>
                        <path
                          d="M24,103L48,103C49.656,103 51,102.104 51,101C51,99.896 49.656,99 48,99L24,99C22.344,99 21,99.896 21,101C21,102.104 22.344,103 24,103Z"
                          transform="matrix(.66667 0 0 1 16 -85)"
                          fill="#464898"
                          class="color000 svgShape"
                        ></path>
                        <path
                          d="M24,103L48,103C49.656,103 51,102.104 51,101C51,99.896 49.656,99 48,99L24,99C22.344,99 21,99.896 21,101C21,102.104 22.344,103 24,103Z"
                          transform="matrix(.66667 0 0 1 16 -77)"
                          fill="#464898"
                          class="color000 svgShape"
                        ></path>
                        <path
                          d="M26,127.172L36.586,116.586C37.367,115.805 38.633,115.805 39.414,116.586L55.071,132.243C55.85,133.022 55.852,134.285 55.075,135.067C55.075,135.067 55.075,135.067 55.071,135.071C53.196,136.946 50.652,138 48,138L32,138C32,138 16,138 16,138C13.348,138 10.804,136.946 8.929,135.071L8.925,135.067C8.148,134.285 8.15,133.022 8.929,132.243L18.586,122.586C19.367,121.805 20.633,121.805 21.414,122.586L26,127.172ZM50.586,133.414L38,120.828L28.828,130L32.828,134L48,134C48.904,134 49.787,133.796 50.586,133.414ZM27.172,134L20,126.828L13.414,133.414C14.214,133.796 15.097,134 16,134L27.172,134Z"
                          transform="translate(0 -80)"
                          fill="#464898"
                          class="color000 svgShape"
                        ></path>
                      </svg>
                    </g>
                  </svg>
                </button>

                <div :class="`cursor-pointer hover:underline text-sm`">
                  {{ translations && translations.contractors_postings }}
                </div>
              </div>
            </div>
            <label for="notes" class="text-base text-gray-700 font-semibold">
              {{ translations && translations.my_notes }}
            </label>
          </div>
          <!-- social and postings -->
          <div
            v-if="screenWidth > 640"
            class="flex flex-col translate-y-[-2px] gap-2 mr-8"
          >
            <InfoWithIconLink
              class="translate-x-[-2px]"
              v-if="contractor?.website_url"
              imgPath="/images/icons/website.png"
              imgClasses="w-7  h-7"
              textClasses="text-md translate-x-[-2px]"
              tooltipText="Website"
              :link="contractor?.website_url"
            />
            <InfoWithIconLink
              v-if="contractor?.facebook"
              icon="logos:facebook"
              class="z-10"
              iconClasses="w-6 h-6"
              textClasses="text-md"
              tooltipText="Facebook"
              :link="contractor?.facebook"
            />
            <InfoWithIconLink
              v-if="contractor?.twitter"
              icon="fa6-brands:square-x-twitter"
              iconColor="black"
              iconClasses="w-6 h-6"
              textClasses="text-md"
              tooltipText="Twitter"
              :link="contractor?.twitter"
            />
            <InfoWithIconLink
              v-if="contractor?.tiktok"
              icon="logos:tiktok-icon"
              iconClasses="w-6 h-6"
              textClasses="text-md"
              tooltipText="TikTok"
              :link="contractor?.tiktok"
            />
            <InfoWithIconLink
              v-if="contractor?.instagram"
              icon="skill-icons:instagram"
              iconClasses="w-6 h-6"
              textClasses="text-md"
              tooltipText="Instagram"
              :link="contractor?.instagram"
            />
            <div
              @click="openPostDialog"
              class="flex translate-x-[-3px] items-center w-full gap-2 xs:gap-4"
            >
              <button class="xs:text-md translate-x-[1px] font-semibold">
                <svg
                  id="SvgjsSvg1017"
                  width="28"
                  height="28"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <defs id="SvgjsDefs1018"></defs>
                  <g id="SvgjsG1019">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      clip-rule="evenodd"
                      viewBox="0 0 64 64"
                      width="28"
                      height="28"
                    >
                      <rect width="28" height="28" fill="none"></rect>
                      <path
                        d="M58,104C58,98.696 56.946,93.609 55.071,89.858C53.196,86.107 50.652,84 48,84C39.122,84 24.878,84 16,84C13.348,84 10.804,86.107 8.929,89.858C7.054,93.609 6,98.696 6,104C6,117.961 6,136 6,136C6,138.209 6.895,140 8,140L56,140C57.105,140 58,138.209 58,136L58,104ZM54,132L54,104C54,100.817 53.368,97.765 52.243,95.515C51.117,93.264 49.591,92 48,92C39.122,92 24.878,92 16,92C14.409,92 12.883,93.264 11.757,95.515C10.632,97.765 10,100.817 10,104L10,132L54,132Z"
                        transform="matrix(1 0 0 .5 0 -36)"
                        fill="#464898"
                        class="color000 svgShape"
                      ></path>
                      <path
                        d="M10,92L10,120C10,123.183 10.632,126.235 11.757,128.485C12.883,130.736 14.409,132 16,132C24.878,132 39.122,132 48,132C49.591,132 51.117,130.736 52.243,128.485C53.368,126.235 54,123.183 54,120C54,117.792 54.896,116 56,116C57.104,116 58,117.792 58,120C58,125.304 56.946,130.391 55.071,134.142C53.196,137.893 50.652,140 48,140C39.122,140 24.878,140 16,140C13.348,140 10.804,137.893 8.929,134.142C7.054,130.391 6,125.304 6,120L6,88C6,85.791 6.895,84 8,84L56,84C57.105,84 58,85.791 58,88C58,88 58,95.188 58,104C58,106.208 57.104,108 56,108C54.896,108 54,106.208 54,104L54,92L10,92Z"
                        transform="matrix(1 0 0 .5 0 -12)"
                        fill="#464898"
                        class="color000 svgShape"
                      ></path>
                      <path
                        d="M26,100C26,98.895 25.105,98 24,98L16,98C14.895,98 14,98.895 14,100L14,108C14,109.105 14.895,110 16,110L24,110C25.105,110 26,109.105 26,108L26,100ZM18,102L18,106L22,106L22,102L18,102Z"
                        transform="translate(0 -84)"
                        fill="#464898"
                        class="color000 svgShape"
                      ></path>
                      <path
                        d="M24,103L48,103C49.656,103 51,102.104 51,101C51,99.896 49.656,99 48,99L24,99C22.344,99 21,99.896 21,101C21,102.104 22.344,103 24,103Z"
                        transform="matrix(.66667 0 0 1 16 -85)"
                        fill="#464898"
                        class="color000 svgShape"
                      ></path>
                      <path
                        d="M24,103L48,103C49.656,103 51,102.104 51,101C51,99.896 49.656,99 48,99L24,99C22.344,99 21,99.896 21,101C21,102.104 22.344,103 24,103Z"
                        transform="matrix(.66667 0 0 1 16 -77)"
                        fill="#464898"
                        class="color000 svgShape"
                      ></path>
                      <path
                        d="M26,127.172L36.586,116.586C37.367,115.805 38.633,115.805 39.414,116.586L55.071,132.243C55.85,133.022 55.852,134.285 55.075,135.067C55.075,135.067 55.075,135.067 55.071,135.071C53.196,136.946 50.652,138 48,138L32,138C32,138 16,138 16,138C13.348,138 10.804,136.946 8.929,135.071L8.925,135.067C8.148,134.285 8.15,133.022 8.929,132.243L18.586,122.586C19.367,121.805 20.633,121.805 21.414,122.586L26,127.172ZM50.586,133.414L38,120.828L28.828,130L32.828,134L48,134C48.904,134 49.787,133.796 50.586,133.414ZM27.172,134L20,126.828L13.414,133.414C14.214,133.796 15.097,134 16,134L27.172,134Z"
                        transform="translate(0 -80)"
                        fill="#464898"
                        class="color000 svgShape"
                      ></path>
                    </svg>
                  </g>
                </svg>
              </button>

              <div :class="`cursor-pointer hover:underline text-sm`">
                {{ translations && translations.contractors_postings }}
              </div>
            </div>
          </div>
        </div>
        <!-- textarea -->
        <textarea
          id="notes"
          v-model="note"
          @paste="adjustHeight"
          ref="textRef"
          @blur="stopTyping"
          @keydown="insertTab"
          @input="saveNotes"
          :placeholder="translations && translations.type_your_notes"
          class="text-sm w-full py-1 min-h-[100px] overflow-y-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-200 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600"
        ></textarea>
      </div>
      <!-- buttons -->
      <div class="max-sm:mt-2 flex flex-col gap-2">
        <button
          v-for="btn in contractorSelectedDisplayChoiceButtons"
          @click="toggleButton(btn.value)"
          :key="btn.value"
          :class="[
            'w-20 sm:w-28 py-2 border-2 font-medium text-sm sm:text-lg rounded transition transform duration-300 hover:shadow-lg active:scale-95',
            selectedDisplayContractorButton === btn.value
              ? btn.selectedClass
              : 'border-gray-700 bg-white',
          ]"
        >
          {{ btn.label }}
        </button>
      </div>
    </div>
  </Card>
  <DialogContractorPosts
    ref="postDialogRef"
    :contractorId="contractor.user_id"
  />
</template>

<script setup>
import Card from "@/Components/Card.vue";

import ContractorHeader from "@/Pages/SubFinder/partials/ContractorHeader.vue";
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import TradesWithDialog from "@/Components/TradesWithDialog.vue";

import InfoWithIconLink from "@/Components/InfoWithIconLink.vue";
import DialogContractorPosts from "@/Components/Postings/DialogContractorPosts.vue";

import { useStore } from "vuex";

import { Icon } from "@iconify/vue";
import {
  filterBadWordsWithoutValue,
  somethingWentWrong,
} from "@/helpers/utilities";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";

const props = defineProps({
  contractor: Object,
  region_name: String,
});
const store = useStore();
const note = ref(props.contractor?.notes ?? "");
const textRef = ref();
const postDialogRef = ref();
const isTyping = ref(false);

const tradesPost = reactive({
  trade1: props.contractor?.trade1,
  trade2: props.contractor?.trade2,
  trade3: props.contractor?.trade3,
  trade4: props.contractor?.trade4,
  trade5: props.contractor?.trade5,
  trade6: props.contractor?.trade6,
  trade7: props.contractor?.trade7,
  trade8: props.contractor?.trade8,
  trade9: props.contractor?.trade9,
  trade10: props.contractor?.trade10,
  trade11: props.contractor?.trade11,
  trade12: props.contractor?.trade12,
  trade13: props.contractor?.trade13,
  trade14: props.contractor?.trade14,
  trade15: props.contractor?.trade15,
  trade16: props.contractor?.trade16,
  trade17: props.contractor?.trade17,
  trade18: props.contractor?.trade18,
  trade19: props.contractor?.trade19,
  trade20: props.contractor?.trade20,
  trade21: props.contractor?.trade21,
  trade22: props.contractor?.trade22,
  trade23: props.contractor?.trade23,
  trade24: props.contractor?.trade24,
  trade25: props.contractor?.trade25,
  trade26: props.contractor?.trade26,
  trade27: props.contractor?.trade27,
  trade28: props.contractor?.trade28,
  trade29: props.contractor?.trade29,
  trade30: props.contractor?.trade30,
  // trade24: props.profile.trade24,
});

const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);

// methods

const stopTyping = () => {
  isTyping.value = false;
  editAdmitNoteText.value = false;
};

const adjustHeight = () => {
  nextTick(() => {
    textRef.value.style.height = "auto"; // Reset height first to get the correct scrollHeight
    textRef.value.style.height = textRef.value.scrollHeight + "px";
  });
};
const insertTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Set the value to: text before caret + four spaces + text after caret
    note.value =
      note.value.substring(0, start) + "      " + note.value.substring(end);

    // Put caret at right position again
    nextTick(() => {
      event.target.selectionStart = event.target.selectionEnd = start + 6;
    });
  }
};

let saveTimeout = null;

const saveNotes = () => {
  adjustHeight();
  isTyping.value = true;
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Start a new timer
  saveTimeout = setTimeout(async () => {
    const notes = {
      notes: note.value ? filterBadWordsWithoutValue(note.value) : note.value,
    };
    console.log(notes, note.value, "selectedNote");
    try {
      const response = await axios.post(
        `/api/sub-finder/${props.contractor.id}/preference-and-notes`,
        notes,
        getAxiosConfig()
      );
      console.log(response, "response");
      if (response.data) {
      }
    } catch (err) {
      // somethingWentWrong(err.response.data.message, "inherit");
    }
  }, 500);
};
const openPostDialog = () => {
  postDialogRef.value.openPostDialog();
};

// buttons

const contractorSelectedDisplayChoiceButtons = ref([
  {
    value: "Preferred",
    label: "Preferred",
    selectedClass: "bg-green-500 text-white border-green-500",
  },
  {
    value: "Back-Up",
    label: "Back-Up",
    selectedClass: "bg-blue-500 text-white border-blue-500",
  },
  {
    value: "Possible",
    label: "Possible",
    selectedClass: "bg-yellow-500 text-white border-yellow-500",
  },
  {
    value: "Rejected",
    label: "Rejected",
    selectedClass: "bg-red-500 text-white border-red-500",
  },
]);

const selectedDisplayContractorButton = ref(
  props.contractor?.preference_status
);

const toggleButton = async (value) => {
  if (selectedDisplayContractorButton.value === value) {
    selectedDisplayContractorButton.value = ""; // deselect the button
  } else {
    selectedDisplayContractorButton.value = value;
  }
  const data = {
    preference_status: selectedDisplayContractorButton.value,
  };
  try {
    const response = await axios.post(
      `/api/sub-finder/${props.contractor.id}/preference-and-notes`,
      data,
      getAxiosConfig()
    );
    console.log(response, "response");
    if (response.data) {
    }
  } catch (err) {
    somethingWentWrong(err.response.data.message, "inherit");
  }
};
</script>

<style>
.placeholder-color-change::placeholder {
  color: red;
}
</style>
