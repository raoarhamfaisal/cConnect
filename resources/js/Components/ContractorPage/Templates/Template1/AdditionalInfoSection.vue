<template>
  <!-- Company ,contact address  -->

  <div
    :style="{
      color: selectedColorScheme[2],
    }"
    class="flex flex-col justify-center text-center"
  >
    <!-- Company Logo -->
    <div v-if="profile.user_avatar" class="flex justify-center mb-3">
      <Avatar :imageSrc="`/${profile.user_avatar}`" />
    </div>
    <h2
      class="text-xl sm:text-2xl font-medium font-extrabold"
      v-if="company_name"
    >
      {{ company_name }}
    </h2>
    <div
      class="text-lg sm:text-xl font-medium font-bold"
      v-if="address_1 || address_2"
    >
      {{ address_1 || address_2 }}
    </div>
    <span
      class="text-base sm:text-lg font-semibold"
      v-if="city || state || zipcode"
      >{{ city + ", " + state + " " + zipcode }}</span
    >
  </div>
  <div
    class="flex flex-col justify-start mt-3 md:mt-6 text-base md:text-lg max-md:items-center font-semibold emailPhoneSection"
    :style="{
      color: selectedColorScheme[2],
    }"
  >
    <!-- For Phone Office -->
    <div v-if="address_2">
      <v-tooltip text="Alternative Address" location="top">
        <template v-slot:activator="{ props }">
          <Icon
            v-bind="props"
            :color="selectedColorScheme[3]"
            icon="entypo:address"
            class="w-5 h-5"
          />
        </template>
      </v-tooltip>
      <div>{{ address_2 }}</div>
    </div>
    <!-- For Phone Office -->
    <div v-if="phone_office">
      <v-tooltip text="Phone Office" location="top">
        <template v-slot:activator="{ props }">
          <Icon
            v-bind="props"
            :color="selectedColorScheme[3]"
            icon="wpf:phone-office"
            class="w-5 h-5"
          />
        </template>
      </v-tooltip>
      <div>{{ phone_office }}</div>
    </div>

    <!-- For Phone Cell -->
    <div v-else-if="phone_cell">
      <v-tooltip text="Phone Cell" location="top">
        <template v-slot:activator="{ props }">
          <Icon
            v-bind="props"
            :color="selectedColorScheme[3]"
            icon="ic:baseline-phone"
            class="w-5 h-5"
          />
        </template>
      </v-tooltip>
      <div>{{ phone_cell }}</div>
    </div>
    <!-- For Email -->
    <div v-if="profile.email">
      <v-tooltip text="Email" location="top">
        <template v-slot:activator="{ props }">
          <Icon
            v-bind="props"
            :color="selectedColorScheme[3]"
            icon="bi:envelope-fill"
            class="w-5 h-5"
          />
        </template>
      </v-tooltip>
      <div>{{ profile.email }}</div>
    </div>

    <!-- For District -->
    <div v-if="profile.county">
      <v-tooltip text="District" location="top">
        <template v-slot:activator="{ props }">
          <Icon
            v-bind="props"
            :color="selectedColorScheme[3]"
            icon="tabler:location-filled"
            class="w-5 h-5"
          />
        </template>
      </v-tooltip>
      <div>District: {{ profile.county }}</div>
    </div>

    <div
      class="flex flex-col gap-1 mt-3 md:mt-6 max-md:items-center text-sm md:text-base"
    >
      <a v-if="profile.website_url" :href="absoluteUrl(profile.website_url)">
        <v-tooltip text="Website" location="top">
          <template v-slot:activator="{ props }">
            <Icon
              v-bind="props"
              icon="fluent-mdl2:website"
              :color="selectedColorScheme[3]"
              class="``"
            />
          </template>
        </v-tooltip>
        <div>{{ profile.website_url }}</div>
      </a>
      <!-- For Facebook -->
      <a v-if="profile.facebook" :href="absoluteUrl(profile.facebook)">
        <v-tooltip text="Facebook" location="top">
          <template v-slot:activator="{ props }">
            <Icon v-bind="props" icon="logos:facebook" class="" />
          </template>
        </v-tooltip>
        <div>{{ translations && translations.follow_us_on }} Facebook</div>
      </a>

      <!-- For Twitter -->
      <a v-if="profile.twitter" :href="absoluteUrl(profile.twitter)">
        <v-tooltip text="Twitter" location="top">
          <template v-slot:activator="{ props }">
            <Icon
              v-bind="props"
              icon="fa6-brands:square-x-twitter"
              color="black"
              class=""
            />
          </template>
        </v-tooltip>
        <div>{{ translations && translations.follow_us_on }} Twitter</div>
      </a>

      <!-- For TikTok -->
      <a v-if="profile.tiktok" :href="absoluteUrl(profile.tiktok)">
        <v-tooltip text="TikTok" location="top">
          <template v-slot:activator="{ props }">
            <Icon v-bind="props" icon="logos:tiktok-icon" class="" />
          </template>
        </v-tooltip>
        <div>{{ translations && translations.follow_us_on }} Tiktok</div>
      </a>

      <!-- For Instagram -->
      <a v-if="profile.instagram" :href="absoluteUrl(profile.instagram)">
        <v-tooltip text="Instagram" location="top">
          <template v-slot:activator="{ props }">
            <Icon v-bind="props" icon="skill-icons:instagram" class="" />
          </template>
        </v-tooltip>
        <div>{{ translations && translations.follow_us_on }} Instagram</div>
      </a>
    </div>
  </div>
</template>
<script setup>
import InfoWithIcon from "@/Components/ContractorPage/InfoWithIcon.vue";
import { Icon } from "@iconify/vue";

import Card from "@/Components/Card.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { computed, ref } from "vue";
import { template1Default } from "@/helpers/templateDefaults";

import { useStore } from "vuex";

// Province
const props = defineProps({
  profile: Object,

  screenWidth: Number,
});

const iconColor = ref("#241e6d");
const store = useStore();
const company_name = ref(props.profile.company_name);
const company_logo = ref(props.profile.company_logo);
const phone_cell = ref(props.profile.phone_cell);
const phone_office = ref(props.profile.phone_office);
const address_1 = ref(props.profile.address_1);
const address_2 = ref(props.profile.address_2);
const city = ref(props.profile.city);
const state = ref(props.profile.state);
const county = ref(props.profile.county);
const zipcode = ref(props.profile.zipcode);

//Computed
const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme || template1Default
);
const translations = computed(() => store.getters.translations);

const absoluteUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  } else {
    // Here you can decide on a default protocol. Assuming "http://" for simplicity
    return `http://${url}`;
  }
};
</script>
<style scoped>
a {
  display: flex;
  gap: 8px;
  align-items: center;
}
a:hover {
  text-decoration: underline;
}
.emailPhoneSection > div:not(:last-child) {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
