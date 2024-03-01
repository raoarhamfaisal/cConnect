<template>
  <!-- Company ,contact address  -->
  <Card
    :shadowLevel="2"
    bgColor="white"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <div class="flex justify-between">
      <heading-card
        class="mb-2"
        :style="{
          marginBottom: '8px',
          fontWeight: 800,
          fontSize: screenWidth > 640 ? '24px' : '20px',
        }"
        :heading="`Contact Info`"
      />
    </div>

    <div class="flex space-x-2 justify-between">
      <div class="flex justify-center items-center space-x-2">
        <div>
          <Avatar :imageSrc="`/${company_logo}`" />
        </div>
        <div class="flex flex-col justify-center">
          <h2
            class="text-md xs:text-xl font-medium font-bold text-gray-900"
            v-if="company_name"
          >
            {{ company_name }}
          </h2>
          <span class="text-xs xs:text-lg" v-if="city || state">{{
            city + " " + state
          }}</span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col sm:flex-row flex-wrap gap-y-2 mt-2 sm:mt-4 ml-1 mb-1 sm:mb-0 sm:ml-0"
    >
      <InfoWithIcon
        icon="ic:baseline-phone"
        tooltipText="Phone Cell"
        :text="phone_cell"
      />
      <InfoWithIcon
        icon="wpf:phone-office"
        tooltipText="Phone Office"
        :text="phone_office"
      />
      <InfoWithIcon
        icon="entypo:address"
        tooltipText="Address 1"
        :text="address_1"
      />
      <InfoWithIcon
        icon="entypo:address"
        tooltipText="Address 2"
        :text="address_2"
      />
      <InfoWithIcon icon="mdi:city" tooltipText="City" :text="city" />
      <InfoWithIcon icon="entypo:location" tooltipText="State" :text="state" />
      <InfoWithIcon
        icon="map:post-box"
        tooltipText="Zip Code"
        :text="zipcode"
      />
      <InfoWithIcon
        icon="tabler:location-filled"
        tooltipText="County"
        :text="county"
      />
    </div>
  </Card>
</template>
<script setup>
import InfoWithIcon from "@/Components/ContractorPage/InfoWithIcon.vue";

import Card from "@/Components/Card.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { ref } from "vue";

// State
const props = defineProps({
  profile: Object,

  screenWidth: Number,
});

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
</script>
