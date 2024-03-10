<template>
  <div v-if="profile">
    <div class="flex flex-col gap-3 sm:gap-4">
      <Card
        :shadowLevel="2"
        :bgColor="selectedColorScheme[1]"
        :padding="screenWidth < 640 ? '7px' : '15px'"
      >
        <ProfileHeader2
          :screenWidth="screenWidth"
          :loggedInUserId="loggedInUserId"
          :averageRating="average_rating"
          :total_reviews="total_reviews"
          :profile="profile"
        />
        <div class="flex flex-col mb-6 md:flex-row gap-2 items-stretch mt-6">
          <Card
            :shadowLevel="2"
            cardInnerClasses="h-full"
            :bgColor="selectedColorScheme[1]"
            :isInside="true"
            class="h-auto md:w-3/5"
            :padding="screenWidth < 640 ? '7px' : '20px'"
          >
            <AdditionalInfoSection2
              class=""
              :screenWidth="screenWidth"
              :profile="profile"
            />
          </Card>
          <Card
            :shadowLevel="2"
            :bgColor="selectedColorScheme[1]"
            cardInnerClasses="h-full flex flex-col justify-center"
            :isInside="true"
            class="h-auto md:w-2/5"
            :padding="screenWidth < 640 ? '7px' : '20px'"
          >
            <RegionTradeSection2
              :screenWidth="screenWidth"
              :region_name="region_name"
              :profile="profile"
            />
          </Card>
        </div>
        <div class="mt-6">
          <ImageTextSection2
            v-if="profile.image_sections && profile.image_sections.length > 0"
            :image_sections="profile.image_sections"
            :contractor-id="profile.id"
            :screen-width="screenWidth"
          />
        </div>

        <div
          class="my-6"
          v-if="profile.bottom_text"
          :style="{
            color: selectedColorScheme[2],
          }"
        >
          <BottomTitleText2
            class="md:border-gray-300 md:border-2 p-3"
            :bottom_text="profile.bottom_text"
            :screen-width="screenWidth"
          />
        </div>

        <BragSection2
          v-if="profile.brag_sections && profile.brag_sections.length > 0"
          :brag_sections="profile.brag_sections"
          :contractor-id="profile.id"
          :screen-width="screenWidth"
        />
        <!-- Image Selection -->
        <div
          v-if="profile.bottom_text || profile.closing_text"
          class="flex gap-2 flex-col mt-6"
          :style="{
            color: selectedColorScheme[2],
          }"
        >
          <ClosingTitleText2
            :userId="profile.user_id"
            :loggedInUserId="loggedInUserId"
            :closing_text="profile.closing_text"
            :screen-width="screenWidth"
          />
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from "@/Components/Card.vue";

import ProfileHeader2 from "@/Components/ContractorPage/Templates/Template2/ProfileHeader2.vue";
import RegionTradeSection2 from "@/Components/ContractorPage/Templates/Template2/RegionTradeSection2.vue";
import AdditionalInfoSection2 from "@/Components/ContractorPage/Templates/Template2/AdditionalInfoSection2.vue";
import BottomTitleText2 from "@/Components/ContractorPage/Templates/Template2/BottomTitleText2.vue";
import ClosingTitleText2 from "@/Components/ContractorPage/Templates/Template2/ClosingTitleText2.vue";
import BragSection2 from "@/Components/ContractorPage/Templates/Template2/BragSection2.vue";
import ImageTextSection2 from "@/Components/ContractorPage/Templates/Template2/ImageTextSection2.vue";
import { computed } from "vue";
import { template1Default } from "@/helpers/templateDefaults";
import { useStore } from "vuex";

// State
const props = defineProps({
  profile: Object,
  loggedInUserId: [String, Number],
  region_name: String,
  total_reviews: [Number, String],
  average_rating: [Number, String],
  screenWidth: Number,
  starPercentages: {
    type: Array,
    default: [],
  },
});
const store = useStore();

//Computed
const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme || template1Default
);
</script>

<style></style>
