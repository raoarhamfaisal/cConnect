<template>
  <Card
    :shadowLevel="2"
    :isInside="true"
    bgColor="#fff"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <ContractorHeader :contractor="contractor" />
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
              <div
                class="ml-2 cursor-pointer flex items-center gap-1 sm:gap-2"
                @click="openTradeDialog"
              >
                <template v-if="firstTrade">
                  <Badge
                    class="flex"
                    :style="{
                      backgroundColor: '#364fc7',
                      fontSize: '10px',
                      paddingTop: screenWidth > 640 ? '6px' : '4px',
                      paddingBottom: screenWidth > 640 ? '6px' : '4px',
                    }"
                  >
                    {{ firstTrade.name }}
                  </Badge>
                </template>
                <!-- Show count for the rest of the trades -->
                <span
                  v-if="tradesCount > 1"
                  class="text-base sm:text-xl font-semibold flex"
                >
                  +{{ tradesCount - 1 }}
                </span>
              </div>
            </div>
            <!-- mobile View links -->
            <div
              v-if="screenWidth <= 640"
              class="flex flex-col gap-2 mr-8 mt-2"
            >
              <InfoWithIconLink
                v-if="contractor?.website_url"
                icon="fluent-mdl2:website"
                iconClasses="w-5 h-5 sm:w-6 sm:h-6"
                textClasses="text-sm sm:text-base"
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
                class="flex translate-x-[-3px] items-center w-full gap-2 xs:gap-4"
              >
                <button class="xs:text-md translate-x-[1px] font-semibold">
                  <img src="/images/icons/post_b.png" class="w-7 h-7" />
                </button>

                <div :class="`cursor-pointer hover:underline text-sm`">
                  Contractor's Postings
                </div>
              </div>
            </div>
            <label for="notes" class="text-base text-gray-700 font-semibold">
              My Notes
            </label>
          </div>
          <!-- social and postings -->
          <div v-if="screenWidth > 640" class="flex flex-col gap-2 mr-8 mt-2">
            <InfoWithIconLink
              v-if="contractor?.website_url"
              icon="fluent-mdl2:website"
              iconClasses="w-6 h-6"
              textClasses="text-md"
              tooltipText="Website"
              :link="contractor?.website_url"
            />
            <InfoWithIconLink
              v-if="contractor?.facebook"
              icon="logos:facebook"
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
              class="flex translate-x-[-3px] items-center w-full gap-2 xs:gap-4"
            >
              <button class="xs:text-md translate-x-[1px] font-semibold">
                <img src="/images/icons/post_b.png" class="w-7 h-7" />
              </button>

              <div :class="`cursor-pointer hover:underline text-sm`">
                Contractor's Postings
              </div>
            </div>
          </div>
        </div>
        <!-- textarea -->
        <textarea
          id="notes"
          v-model="note"
          @blur="stopTyping"
          @keydown="saveNotes"
          placeholder="Type your Notes"
          class="text-sm w-full py-1 px-3 overflow-auto focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-200 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600"
          :rows="5"
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

  <!-- show Trades -->
  <CustomDialog
    :showFooter="false"
    :disableOutSideClick="false"
    ref="tradeDialogRef"
    title="Trades"
  >
    <template v-for="(option, index) in options" :key="option.name">
      <Badge
        v-if="tradesPost[option.id]"
        class="my-1 mx-1 space-x-1 flex"
        :style="{
          backgroundColor: index % 2 === 0 ? '#5f3dc4' : '#364fc7',
          fontSize: '10px',
          paddingTop: '6px',
          paddingBottom: '6px',
        }"
        >{{ option.name }}</Badge
      >
    </template>
  </CustomDialog>
</template>

<script setup>
import Card from "@/Components/Card.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import ContractorHeader from "@/Pages/SubFinder/partials/ContractorHeader.vue";
import { computed, onMounted, reactive, ref } from "vue";
import InfoWithIconLink from "@/Components/InfoWithIconLink.vue";
import { options } from "@/helpers/selectListsHelpters.js";
import { useStore } from "vuex";
import Badge from "@/Components/Ratings/Badge.vue";

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
const note = ref("");
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
  // trade24: props.profile.trade24,
});
const tradeDialogRef = ref();

const firstTrade = computed(() => {
  return options.find((option) => tradesPost[option.id] === 1);
});
const tradesCount = computed(() => {
  return options.filter((option) => tradesPost[option.id] === 1).length;
});
const screenWidth = computed(() => store.getters.screenWidth);

// methods

const openTradeDialog = () => {
  tradeDialogRef.value.openDialog();
};

const stopTyping = () => {
  isTyping.value = false;
  editAdmitNoteText.value = false;
};
let saveTimeout = null;

const saveNotes = () => {
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
      const response = await axios.put(
        `/api/admin/discount-coupon/`,
        notes,
        getAxiosConfig()
      );
      console.log(response, "response");
      if (response.data) {
      }
    } catch (err) {
      // somethingWentWrong(err.response.data.message, "inherit");
    }
  }, 1000);
};

// buttons

const contractorSelectedDisplayChoiceButtons = ref([
  {
    value: "preferred",
    label: "Preferred",
    selectedClass: "bg-green-500 text-white border-green-500",
  },
  {
    value: "backup",
    label: "Back-Up",
    selectedClass: "bg-blue-500 text-white border-blue-500",
  },
  {
    value: "possible",
    label: "Possible",
    selectedClass: "bg-yellow-500 text-white border-yellow-500",
  },
  {
    value: "rejected",
    label: "Rejected",
    selectedClass: "bg-red-500 text-white border-red-500",
  },
]);

const selectedDisplayContractorButton = ref("");

const toggleButton = (value) => {
  if (selectedDisplayContractorButton.value === value) {
    selectedDisplayContractorButton.value = ""; // deselect the button
  } else {
    selectedDisplayContractorButton.value = value;
  }
};
</script>

<style></style>
