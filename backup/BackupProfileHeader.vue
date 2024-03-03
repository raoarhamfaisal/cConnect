<template>
  <!-- Header -->
  <Card
    :shadowLevel="2"
    bgColor="white"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <div class="flex space-x-2 justify-between">
      <div class="flex justify-center items-center space-x-2">
        <div>
          <Avatar :imageSrc="`/${user_avatar}`" />
        </div>
        <div class="flex flex-col justify-center">
          <!-- <h2
                  class="text-md xs:text-xl font-medium font-bold text-gray-900"
                >
                  {{ profile.first_name + " " + profile.last_name }}
                </h2> -->
          <div>
            <v-tooltip
              :open-on-click="true"
              :open-on-focus="true"
              :text="fullName"
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <h2
                  class="text-md xs:text-xl font-medium font-bold text-gray-900"
                  v-bind="props"
                >
                  {{ truncatedName }}
                </h2>
              </template>
            </v-tooltip>
          </div>
          <div class="text-sm xs:text-lg" v-if="company_name">
            {{ company_name }}
          </div>
          <span class="text-xs xs:text-lg" v-if="city || state">{{
            city + " " + state
          }}</span>
        </div>
      </div>
      <!-- See Live view and edit -->

      <div
        class="self-start flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
      >
        <div>
          <StarRating
            v-if="averageRating"
            :rating="Number(averageRating.toFixed(1))"
            :isIndicatorActive="false"
          />
        </div>
        <div class="flex items-center justify-center gap-2">
          <div class="rounded-full" @click="changeMode">
            <button
              class="bg-white px-4 py-1 uppercase text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-2 sm:border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
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
});

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
    const length = props.screenWidth < 400 ? 18 : 24;
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
