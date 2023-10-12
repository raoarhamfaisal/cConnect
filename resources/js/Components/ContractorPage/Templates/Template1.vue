<template>
  <div v-if="profile">
    <div class="flex flex-col gap-3 sm:gap-4">
      <Card
        :shadowLevel="2"
        :bgColor="selectedColorScheme[1]"
        :padding="screenWidth < 640 ? '7px' : '15px'"
      >
        <ProfileHeader
          :screenWidth="screenWidth"
          :loggedInUserId="loggedInUserId"
          :averageRating="average_rating"
          :total_reviews="total_reviews"
          :profile="profile"
        />
      </Card>

      <Card
        :shadowLevel="2"
        :bgColor="selectedColorScheme[1]"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        v-if="profile.image_sections && profile.image_sections.length > 0"
      >
        <ImageTextSection
          :image_sections="profile.image_sections"
          :contractor-id="profile.id"
          :screen-width="screenWidth"
        />
      </Card>
      <Card
        :shadowLevel="2"
        :bgColor="selectedColorScheme[1]"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        v-if="profile.bottom_text"
      >
        <div
          :style="{
            color: selectedColorScheme[2],
          }"
        >
          <BottomTitleText
            :bottom_text="profile.bottom_text"
            :screen-width="screenWidth"
          />
        </div>
      </Card>
      <div class="flex flex-col md:flex-row gap-2 items-stretch">
        <Card
          :shadowLevel="2"
          cardInnerClasses="h-full"
          :bgColor="selectedColorScheme[1]"
          :isInside="true"
          class="sm:pl-6 md:pl-6 sm:pl-2 lg:pl-8 h-auto md:w-3/5"
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
          class="sm:pr-6 md:pr-6 sm:pr-2 lg:pr-8 h-auto md:w-2/5"
          :padding="screenWidth < 640 ? '7px' : '20px'"
        >
          <RegionTradeSection
            :screenWidth="screenWidth"
            :region_name="region_name"
            :profile="profile"
          />
        </Card>
      </div>

      <Card
        :shadowLevel="2"
        :bgColor="selectedColorScheme[1]"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        v-if="profile.brag_sections && profile.brag_sections.length > 0"
      >
        <BragSection
          :brag_sections="profile.brag_sections"
          :contractor-id="profile.id"
          :screen-width="screenWidth"
        />
      </Card>
      <!-- Image Selection -->
      <Card
        :shadowLevel="2"
        :bgColor="selectedColorScheme[1]"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        v-if="profile.bottom_text || profile.closing_text"
      >
        <div
          class="flex gap-2 flex-col"
          :style="{
            color: selectedColorScheme[2],
          }"
        >
          <ClosingTitleText
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
