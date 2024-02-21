<template>
  <div v-if="profile">
    <div class="flex flex-col gap-3 sm:gap-4 mt-5 pb-40">
      <ProfileHeader
        :screenWidth="screenWidth"
        :mode="mode"
        :profile="profile"
      />
      <RegionTradeSection
        :screenWidth="screenWidth"
        :mode="mode"
        :region_name="region_name"
        :profile="profile"
      />
      <AdditionalInfoSection
        :screenWidth="screenWidth"
        :mode="mode"
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
      <SocialLinksSection
        :screenWidth="screenWidth"
        :mode="mode"
        :profile="profile"
      />

      <!-- Image Selection -->
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <div class="flex gap-2 flex-col">
          <ImageTextSection :mode="mode" :screen-width="screenWidth" />
          <BottomTitleText :mode="mode" :screen-width="screenWidth" />
          <ClosingTitleText :mode="mode" :screen-width="screenWidth" />
        </div>
      </Card>
    </div>
  </div>
  <MoveToTop />
</template>

<script setup>
import MoveToTop from "@/Components/MoveToTop.vue";

import AverageRating from "@/Components/Ratings/Contractor/PartialsVisiting/AverageRating.vue";
import Card from "@/Components/Card.vue";

import ProfileHeader from "@/Components/ContractorPage/Sections/ProfileHeader.vue";
import RegionTradeSection from "@/Components/ContractorPage/Sections/RegionTradeSection.vue";
import SocialLinksSection from "@/Components/ContractorPage/Sections/SocialLinksSection.vue";
import AdditionalInfoSection from "@/Components/ContractorPage/Sections/AdditionalInfoSection.vue";
import BottomTitleText from "@/Components/ContractorPage/Sections/BottomTitleText.vue";
import ClosingTitleText from "@/Components/ContractorPage/Sections/ClosingTitleText.vue";
import ImageTextSection from "@/Components/ContractorPage/Sections/ImageTextSection.vue";
import { computed } from "vue";
import { useStore } from "vuex";

// State
const props = defineProps({
  profile: Object,
  region_name: String,
  total_reviews: [Number, String],
  average_rating: [Number, String],
  mode: {
    type: String,
    default: "",
  },
  starPercentages: {
    type: Array,
    default: [],
  },
});
const store = useStore();

const screenWidth = computed(() => store.getters.screenWidth);
</script>

<style></style>
