<template>
  <!-- Social Links -->
  <Card
    v-if="website_url || facebook || twitter || tiktok || instagram"
    :shadowLevel="2"
    bgColor="white"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <div class="flex justify-between">
      <heading-card
        class="mb-2"
        :style="{
          fontWeight: 800,
          marginBottom: '8px',
          fontSize: screenWidth > 640 ? '24px' : '20px',
        }"
        :heading="translations && translations.social_links"
      />
    </div>
    <div
      class="flex flex-col sm:flex-row flex-wrap gap-y-3 mt-2 sm:mt-4 ml-1 mb-1 sm:mb-0 sm:ml-0"
    >
      <InfoWithIcon
        v-if="website_url"
        icon="fluent-mdl2:website"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Website"
        :text="website_url"
      />
      <InfoWithIcon
        v-if="facebook"
        icon="logos:facebook"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Facebook"
        :text="facebook"
      />
      <InfoWithIcon
        v-if="twitter"
        icon="fa6-brands:square-x-twitter"
        iconColor="black"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Twitter"
        :text="twitter"
      />
      <InfoWithIcon
        v-if="tiktok"
        icon="logos:tiktok-icon"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="TikTok"
        :text="tiktok"
      />
      <InfoWithIcon
        v-if="instagram"
        icon="skill-icons:instagram"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Instagram"
        :text="instagram"
      />
    </div>
  </Card>
</template>
<script setup>
import InfoWithIcon from "@/Components/ContractorPage/InfoWithIcon.vue";

import Card from "@/Components/Card.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import { ref } from "vue";
import { useStore } from "vuex";

// Province
const props = defineProps({
  profile: Object,
  screenWidth: Number,
});
const store = useStore();

const translations = computed(() => store.getters.translations);

const website_url = ref(props.profile.website_url);
const facebook = ref(props.profile.facebook);
const twitter = ref(props.profile.twitter);
const tiktok = ref(props.profile.tiktok);
const instagram = ref(props.profile.instagram);
</script>
