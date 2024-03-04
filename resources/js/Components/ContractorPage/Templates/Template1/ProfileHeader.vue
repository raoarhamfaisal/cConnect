<template>
  <!-- Header -->
  <Card
    :shadowLevel="2"
    bgColor="white"
    :padding="screenWidth < 640 ? '7px' : '15px'"
  >
    <div class="flex gap-2">
      <div :class="`${screenWidth > 768 ? 'w-3/4' : ''}`">
        <!-- company name -->
        <div
          class="text-2xl text-center xs:text-3xl font-bold uppercase"
          :style="{ color: blueRgba }"
          v-if="company_name"
        >
          {{ company_name }}
        </div>
        <!-- user name -->
        <div class="text-center">
          <v-tooltip
            :open-on-click="true"
            :open-on-focus="true"
            :text="fullName"
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <h2
                class="text-xl xs:text-2xl font-medium font-bold text-gray-900"
                v-bind="props"
              >
                {{ truncatedName }}
              </h2>
            </template>
          </v-tooltip>
        </div>
        <!-- phoneOffice -->
        <div class="flex text-xl font-semibold mt-1 flex-col justify-center t">
          <div class="flex justify-center">
            <div>{{ profile.phone_office || profile.phone_cell }}</div>
            <div
              class="mx-2 flex justify-center items-center translate-y-[-1px]"
            >
              |
            </div>
            <div>{{ profile.email }}</div>
          </div>
          <div class="self-center" v-if="city || state">
            {{ city + ", " + state }}
          </div>
        </div>
      </div>
      <div
        :class="` ${
          screenWidth > 768 ? 'w-1/4' : ''
        } flex-grow flex flex-col gap-2  flex justify-center  items-center px-2`"
      >
        <div class="rounded-full" v-if="true" @click="changeMode">
          <button
            class="bg-white px-4 py-1 uppercase text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-2 sm:border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95"
          >
            Edit
          </button>
        </div>
        <div class="flex items-center">
          <div class="">
            <img src="/images/icons/pre-diamond.png" width="20" height="30" />
          </div>
          <div class="flex flex-col justify-center items-center">
            <StarRounded
              :starWidth="screenWidth > 768 ? 18 : 15"
              class="h-4 cursor-pointer"
              :indicatorClasses="`text-small h-4 `"
              :starHeight="screenWidth > 768 ? 18 : 15"
              :rating="
                Number(
                  parseFloat(
                    profile.average_rating ? profile.average_rating : 0.0
                  ).toFixed(1)
                )
              "
              :isIndicatorActive="false"
            />

            <div class="">
              <h2 class="font-light text-xs overflow-hidden tracking-tighter">
                {{ total_reviews }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import StarRounded from "@/Components/Ratings/StarRounded.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";

import Card from "@/Components/Card.vue";

import Avatar from "@/Components/Ratings/Avatar.vue";

import { computed, ref } from "vue";

// State
const props = defineProps({
  profile: Object,
  screenWidth: Number,
  averageRating: {
    type: Number,
    default: 0,
  },
  total_reviews: {
    type: Number,
    default: 0,
  },
});
const blueRgba = ref("#241e6d");
const first_name = ref(props.profile.first_name);
const last_name = ref(props.profile.last_name);
const user_avatar = ref(props.profile.user_avatar);
const company_name = ref(props.profile.company_name);
const city = ref(props.profile.city);
const state = ref(props.profile.state);

//  Emits
const emit = defineEmits(["changeMode"]);

//Computed
const fullName = computed(() => first_name.value + " " + last_name.value);
const truncatedName = computed(() => {
  console.log("here in teh trunctated", props.screenWidth);
  if (props.screenWidth < 600) {
    const length = props.screenWidth < 400 ? 30 : 34;
    return fullName.value.length > length
      ? fullName.value.substring(0, length) + "..."
      : fullName.value;
  } else {
    return first_name.value + " " + last_name.value;
  }
});

//Methods

const changeMode = () => {
  emit("changeMode");
};
</script>
