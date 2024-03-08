<template>
  <!-- Header -->
  <Card
    :shadowLevel="2"
    :bgColor="selectedColorScheme[1]"
    :padding="screenWidth < 640 ? '7px' : '15px'"
  >
    <div class="flex gap-4 mb-1 items-center">
      <div @click="goBack" class="cursor-pointer">
        <Icon class="w-8 h-8" icon="ion:arrow-back" color="#241e6d" />
      </div>
      <div
        @click="goBack"
        class="font-bold flex justify-center items-center text-2xl text-blue-rgba leading-tight"
      >
        Go Back
      </div>
    </div>
    <div class="flex gap-2" :style="{ color: selectedColorScheme[2] }">
      <div :class="`${screenWidth > 768 ? 'w-3/4' : 'w-4/5'}`">
        <!-- company name -->
        <div
          class="text-2xl text-center xs:text-3xl font-bold uppercase"
          :style="{
            color: selectedColorScheme[1] === '#212529' ? '#364fc7' : blueRgba,
          }"
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
                class="text-xl xs:text-2xl font-medium font-bold"
                v-bind="props"
              >
                {{ truncatedName }}
              </h2>
            </template>
          </v-tooltip>
        </div>
        <!-- phoneOffice -->
        <div class="flex text-xl font-semibold mt-1 flex-col justify-center">
          <div class="flex max-md:flex-col items-center justify-center">
            <div>{{ profile.phone_office || profile.phone_cell }}</div>
            <div
              class="mx-2 flex justify-center items-center translate-y-[-1px]"
              v-if="screenWidth > 768"
            >
              |
            </div>
            <div>{{ profile.email }}</div>
          </div>
          <div class="self-center text-base md:text-xl" v-if="city || state">
            {{ city + ", " + state }}
          </div>
        </div>
      </div>
      <div
        :class="` ${
          screenWidth > 768 ? 'w-1/4' : ''
        } flex-grow flex flex-col gap-2  flex justify-center  items-center px-2`"
      >
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
                  parseFloat(averageRating ? averageRating : 0.0).toFixed(1)
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
        <div class="flex flex-col gap-1">
          <Link
            class="rounded-full"
            v-if="profile.user_id === loggedInUserId"
            :href="`/contractor/${profile.user_id}/edit`"
          >
            <button
              class="bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-[1px] text-white bg-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95 w-full"
            >
              Edit
            </button>
          </Link>
          <button
            v-bind="props"
            @click="shareLink"
            class="bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-[1px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95"
          >
            Share
          </button>
          <v-snackbar
            location="bottom"
            v-model="snackbarVisible"
            :timeout="2000"
            color="success"
          >
            Link Copied to Clipboard
          </v-snackbar>
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
import { Icon } from "@iconify/vue";

import { computed, ref } from "vue";
import { template1Default } from "@/helpers/templateDefaults";

import { useStore } from "vuex";
import { usePage } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";

// State
const props = defineProps({
  profile: Object,
  loggedInUserId: [String, Number],
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
const snackbarVisible = ref(false);

const shareLink = () => {
  const success = copyToClipboard(window.location.href);
  if (success) {
    snackbarVisible.value = true; // Show the Snackbar on successful copy
  }
};

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  let success;
  try {
    success = document.execCommand("copy");
    console;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    success = false;
  }
  document.body.removeChild(textarea);
  return success;
}

const goBack = () => {
  // Check if the history is
  const prevUrl = localStorage.getItem("prevUrl");
  console.log(prevUrl);
  if (prevUrl === "/post") {
    Inertia.visit(prevUrl);
  } else if (prevUrl === "/edit") {
    Inertia.visit(`/contractor/${props.profile.user_id}/edit`);
  } else {
    Inertia.visit("/post");
  }
  // if (window.history.length > 1) {
  //   let previousUrl = document.referrer;

  //   if (previousUrl) {
  //     let baseUrl = previousUrl.split("?")[0]; // Split by "?" and take the base URL
  //     window.location.href = baseUrl; // Navigate to the cleaned URL
  //   } else {
  //     window.history.back(); // If no referrer found, just go back
  //   }
  // } else {
  //   console.log("No history available");
  // }
};

const store = useStore();
const blueRgba = ref("#241e6d");
const first_name = ref(props.profile.first_name);
const last_name = ref(props.profile.last_name);
const user_avatar = ref(props.profile.user_avatar);
const company_name = ref(props.profile.company_name);
const city = ref(props.profile.city);
const state = ref(props.profile.state);

//  Emits

//Computed
const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme || template1Default
);

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
</script>
<style scoped></style>
