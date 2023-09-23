<template>
  <div v-if="profile">
    <div class="flex flex-col gap-4 mt-5 pb-40">
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <!-- Header -->
        <!-- <heading-card
          class="mt-2"
          style="font-weight: 800; margin-bottom: 8px; font-size: 24px"
          :heading="`Contractor Info`"
        /> -->
        <div class="flex space-x-2 justify-between">
          <div class="flex justify-center items-center space-x-2">
            <div>
              <Avatar :imageSrc="`/${profile.user_avatar}`" />
            </div>
            <div class="flex flex-col justify-center">
              <h2
                class="text-md xs:text-xl font-medium font-bold text-gray-900"
              >
                {{ profile.first_name + " " + profile.last_name }}
              </h2>
              <div class="text-sm xs:text-lg" v-if="profile.company_name">
                {{ profile.company_name }}
              </div>
              <span
                class="text-xs xs:text-lg"
                v-if="profile.city || profile.state"
                >{{ profile.city + " " + profile.state }}</span
              >
            </div>
          </div>
        </div>

        <!-- <Loader :loading="loading" background="" height="60vh"></Loader> -->
      </Card>
      <!-- Trades and Region  -->
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <div
          v-if="region_name"
          class="flex items-center w-full sm:w-1/2 gap-2 xs:gap-4"
        >
          <v-tooltip text="Region" location="top">
            <template v-slot:activator="{ props }">
              <Icon
                v-bind="props"
                class="w-8 h-8"
                icon="mdi:location"
                color="#241e6d"
              />
            </template>
          </v-tooltip>
          <div class="font-bold text-lg">Region :</div>
          <div class="text-base translate-y-[0px]">
            {{ region_name }}
          </div>
        </div>
        <!-- trades -->
        <div class="mb-3">
          <div class="pl-2 text-sm xs:text-md font-bold mt-4 mb-1">
            {{ profile.first_name + " " + profile.last_name }}
            {{ "'s Trades :" }}
          </div>
          <template v-for="(option, index) in options" :key="option.name">
            <Badge
              v-if="profile[option.id] === 1"
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
        </div>
        <!-- <Loader :loading="loading" background="" height="60vh"></Loader> -->
      </Card>
      <!-- Company ,contact address  -->
      <Card
        :shadowLevel="2"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
      >
        <heading-card
          class="mb-2"
          style="font-weight: 800; margin-bottom: 8px; font-size: 24px"
          :heading="`Additional Info`"
        />
        <div class="flex space-x-2 justify-between">
          <div class="flex justify-center items-center space-x-2">
            <div>
              <Avatar
                :imageSrc="`/${
                  profile.company_logo
                    ? profile.company_logo
                    : profile.user_avatar
                }`"
              />
            </div>
            <div class="flex flex-col justify-center">
              <h2
                class="text-md xs:text-xl font-medium font-bold text-gray-900"
                v-if="profile.company_name"
              >
                {{ profile.company_name }}
              </h2>
              <span
                class="text-xs xs:text-lg"
                v-if="profile.city || profile.state"
                >{{ profile.city + " " + profile.state }}</span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row flex-wrap gap-y-2 mt-4">
          <InfoWithIcon
            icon="ic:baseline-phone"
            tooltipText="Phone Cell"
            :text="profile.phone_cell"
          />
          <InfoWithIcon
            icon="wpf:phone-office"
            tooltipText="Phone Office"
            :text="profile.phone_office"
          />
          <InfoWithIcon
            icon="clarity:email-solid"
            tooltipText="Email"
            :text="profile.email"
          />
          <InfoWithIcon
            icon="entypo:address"
            tooltipText="Address 1"
            :text="profile.address_1"
          />
          <InfoWithIcon
            icon="entypo:address"
            tooltipText="Address 2"
            :text="profile.address_2"
          />
          <InfoWithIcon
            icon="mdi:city"
            tooltipText="City"
            :text="profile.city"
          />
          <InfoWithIcon
            icon="entypo:location"
            tooltipText="State"
            :text="profile.state"
          />
          <InfoWithIcon
            icon="tabler:location-filled"
            tooltipText="County"
            :text="profile.county"
          />
          <InfoWithIcon
            icon="material-symbols:flag"
            tooltipText="Country"
            :text="profile.counrty"
          />
          <InfoWithIcon
            icon="map:post-box"
            tooltipText="Zip Code"
            :text="profile.zipcode"
          />
        </div>
        <!-- <Loader :loading="loading" background="" height="60vh"></Loader> -->
      </Card>
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
        />
      </Card>
    </div>
  </div>
  <MoveToTop />
</template>

<script setup>
import MoveToTop from "@/Components/MoveToTop.vue";
import AverageRating from "@/Components/Ratings/Contractor/PartialsVisiting/AverageRating.vue";
import Card from "@/Components/Card.vue";
import { Icon } from "@iconify/vue";

import InfoWithIcon from "@/Components/ContractorPage/InfoWithIcon.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import Badge from "@/Components/Ratings/Badge.vue";
import { options } from "@/helpers/dataHelpters.js";
import { computed } from "vue";
import { useStore } from "vuex";

// State
const { profile } = defineProps({
  profile: Object,
  region_name: String,
  total_reviews: [Number, String],
  average_rating: [Number, String],
  starPercentages: {
    type: Array,
    default: [],
  },
});
const store = useStore();
const screenWidth = computed(() => store.getters.screenWidth);
</script>

<style></style>
