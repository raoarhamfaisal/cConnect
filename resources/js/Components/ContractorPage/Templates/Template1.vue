<template>
  <div v-if="profile">
    <div class="flex flex-col gap-3 sm:gap-4">
      <ProfileHeader
        :screenWidth="screenWidth"
        :averageRating="average_rating"
        @change-mode="changeMode"
        :total_reviews="total_reviews"
        :profile="profile"
      />
      <Card
        :shadowLevel="2"
        bgColor="white"
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
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        v-if="profile.bottom_text"
      >
        <BottomTitleText
          :bottom_text="profile.bottom_text"
          :screen-width="screenWidth"
        />
      </Card>
      <RegionTradeSection
        :screenWidth="screenWidth"
        :region_name="region_name"
        :profile="profile"
      />
      <AdditionalInfoSection :screenWidth="screenWidth" :profile="profile" />
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
      <SocialLinksSection :screenWidth="screenWidth" :profile="profile" />

      <!-- Image Selection -->
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        v-if="profile.bottom_text || profile.closing_text"
      >
        <div class="flex gap-2 flex-col">
          <BottomTitleText
            :bottom_text="profile.bottom_text"
            :screen-width="screenWidth"
          />
          <ClosingTitleText
            :closing_text="profile.closing_text"
            :screen-width="screenWidth"
          />
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import AverageRating from "@/Components/Ratings/Contractor/PartialsVisiting/AverageRating.vue";
import Card from "@/Components/Card.vue";

import ProfileHeader from "@/Components/ContractorPage/Templates/Template1/ProfileHeader.vue";
import RegionTradeSection from "@/Components/ContractorPage/Templates/Template1/RegionTradeSection.vue";
import SocialLinksSection from "@/Components/ContractorPage/Templates/Template1/SocialLinksSection.vue";
import AdditionalInfoSection from "@/Components/ContractorPage/Templates/Template1/AdditionalInfoSection.vue";
import BottomTitleText from "@/Components/ContractorPage/Templates/Template1/BottomTitleText.vue";
import ClosingTitleText from "@/Components/ContractorPage/Templates/Template1/ClosingTitleText.vue";
import ImageTextSection from "@/Components/ContractorPage/Templates/Template1/ImageTextSection.vue";

// State
const props = defineProps({
  profile: Object,
  region_name: String,
  total_reviews: [Number, String],
  average_rating: [Number, String],
  screenWidth: Number,
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
</script>

<style></style>
