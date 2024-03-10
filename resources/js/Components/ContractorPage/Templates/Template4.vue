<template>
  <div v-if="profile">
    <div class="flex flex-col gap-3 sm:gap-4">
      <Card
        :shadowLevel="2"
        :bgColor="selectedColorScheme[1]"
        :padding="screenWidth < 640 ? '7px' : '15px'"
      >
        <ProfileHeader4
          :screenWidth="screenWidth"
          :loggedInUserId="loggedInUserId"
          :averageRating="average_rating"
          :total_reviews="total_reviews"
          :profile="profile"
        />
        <div class="mt-6">
          <ImageTextSection4
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
          <BottomTitleText4
            class="md:border-gray-300 md:border-2 p-3"
            :bottom_text="profile.bottom_text"
            :screen-width="screenWidth"
          />
        </div>
        <div class="flex flex-col mb-6 md:flex-row gap-2 items-stretch">
          <Card
            :shadowLevel="2"
            cardInnerClasses="h-full"
            :bgColor="selectedColorScheme[1]"
            :isInside="true"
            class="h-auto md:w-3/5"
            :padding="screenWidth < 640 ? '7px' : '20px'"
          >
            <AdditionalInfoSection4
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
            <RegionTradeSection4
              :screenWidth="screenWidth"
              :region_name="region_name"
              :profile="profile"
            />
          </Card>
        </div>

        <BragSection4
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
          <ClosingTitleText4
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

import ProfileHeader4 from "@/Components/ContractorPage/Templates/Template4/ProfileHeader4.vue";
import RegionTradeSection4 from "@/Components/ContractorPage/Templates/Template4/RegionTradeSection4.vue";
import AdditionalInfoSection4 from "@/Components/ContractorPage/Templates/Template4/AdditionalInfoSection4.vue";
import BottomTitleText4 from "@/Components/ContractorPage/Templates/Template4/BottomTitleText4.vue";
import ClosingTitleText4 from "@/Components/ContractorPage/Templates/Template4/ClosingTitleText4.vue";
import BragSection4 from "@/Components/ContractorPage/Templates/Template4/BragSection4.vue";
import ImageTextSection4 from "@/Components/ContractorPage/Templates/Template4/ImageTextSection4.vue";
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
