<template>
  <div v-if="profile">
    <!-- '#f8f8f8'  -->
    <!-- "'#c78b22'" -->
    <!-- #f8f2e8 -->
    <!-- #4169E1 -->
    <!-- #2d2c2b text color -->
    <div class="flex flex-col" v-if="profile">
      <div class="">
        <ProfileHeader
          :screenWidth="screenWidth"
          :loggedInUserId="loggedInUserId"
          :averageRating="average_rating"
          :total_reviews="total_reviews"
          :profile="profile"
        />
      </div>

      <div
        v-if="
          profile.image_sections &&
          profile.image_sections.length > 0 &&
          isContractor
        "
      >
        <ImageTextSection
          :image_sections="profile.image_sections"
          :contractor-id="profile.id"
          :screen-width="screenWidth"
        />
      </div>

      <div
        v-if="profile.bottom_text && isContractor"
        class="bg-[#f8f2e8] py-10 sm:py-20 overflow-hidden"
        :style="{
          color: '#2d2c2b',
        }"
      >
        <BottomTitleText
          :bottom_text="profile.bottom_text"
          :screen-width="screenWidth"
        />
      </div>
      <div
        class="flex flex-col md:flex-row gap-2 items-stretch max-w-[1400px] px-3 sm:px-10 mx-auto w-full py-10 sm:py-20"
      >
        <Card
          :shadowLevel="2"
          cardInnerClasses="h-full"
          :bgColor="selectedColorScheme[1]"
          :isInside="true"
          class="h-auto md:w-3/5"
          :padding="screenWidth < 640 ? '7px' : '20px'"
        >
          <AdditionalInfoSection
            class=""
            :screenWidth="screenWidth"
            :profile="profile"
          />
        </Card>
        <Card
          :shadowLevel="2"
          :bgColor="selectedColorScheme[1]"
          cardInnerClasses="h-full"
          :isInside="true"
          class="h-auto md:w-2/5"
          :padding="screenWidth < 640 ? '7px' : '20px'"
        >
          <RegionTradeSection
            :screenWidth="screenWidth"
            :region_name="region_name"
            :profile="profile"
          />
        </Card>
      </div>

      <div
        v-if="
          profile.brag_sections &&
          profile.brag_sections.length > 0 &&
          isContractor
        "
      >
        <BragSection
          :brag_sections="profile.brag_sections"
          :contractor-id="profile.id"
          :screen-width="screenWidth"
        />
      </div>
      <!-- Image Selection -->
      <div v-if="(profile.bottom_text || profile.closing_text) && isContractor">
        <div
          class="flex gap-2 overflow-hidden flex-col bg-[#f8f2e8] py-10 sm:py-20"
          :style="{
            color: '#2d2c2b',
          }"
        >
          <ClosingTitleText
            :userId="profile.user_id"
            :loggedInUserId="loggedInUserId"
            :closing_text="profile.closing_text"
            :screen-width="screenWidth"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from "@/Components/Card.vue";

import ProfileHeader from "@/Components/ContractorPage/Templates/Template1/ProfileHeader.vue";
import RegionTradeSection from "@/Components/ContractorPage/Templates/Template1/RegionTradeSection.vue";
import AdditionalInfoSection from "@/Components/ContractorPage/Templates/Template1/AdditionalInfoSection.vue";
import BottomTitleText from "@/Components/ContractorPage/Templates/Template1/BottomTitleText.vue";
import ClosingTitleText from "@/Components/ContractorPage/Templates/Template1/ClosingTitleText.vue";
import BragSection from "@/Components/ContractorPage/Templates/Template1/BragSection.vue";
import ImageTextSection from "@/Components/ContractorPage/Templates/Template1/ImageTextSection.vue";
import { computed } from "vue";
import { template1Default } from "@/helpers/templateDefaults";
import { useStore } from "vuex";

// Province
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

const isContractor = computed(() => {
  const profile = props.profile;
  return profile && profile.is_contractor === 1;
});
</script>

<style></style>
