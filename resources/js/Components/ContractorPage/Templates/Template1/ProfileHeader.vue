<template>
  <!-- Header -->
  <div class="bg-[#2d2c2b]" v-if="profile">
    <div
      class="relative gap-2 mb-1 bg-[] max-w-[1400px] px-3 sm:px-10 py-4 sm:py-8 mx-auto w-full"
    >
      <div class="sm:hidden flex gap-2 mb-2">
        <div @click="goBack" class="cursor-pointer">
          <Icon class="w-6 h-6" icon="ion:arrow-back" :color="'#c78b22'" />
        </div>
        <div
          @click="goBack"
          class="font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-xl leading-tight"
          :style="{
            color: '#c78b22',
          }"
        >
          Go Back
        </div>
      </div>
      <div class="flex gap-2 items-center justify-between w-full">
        <div class="sm:flex gap-2 hidden">
          <div @click="goBack" class="cursor-pointer">
            <Icon class="w-6 h-6" icon="ion:arrow-back" :color="'#fff'" />
          </div>
          <div
            @click="goBack"
            class="font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-xl leading-tight"
            :style="{
              color: '#fff',
            }"
          >
            Go Back
          </div>
        </div>
        <div
          class="text-2xl sm:absolute company-center text-center xs:text-3xl font-bold uppercase"
          :style="{
            color: '#fff',
          }"
          v-if="company_name"
        >
          {{ company_name }}
        </div>
        <div class="flex gap-1">
          <Link
            class="rounded-full"
            v-if="profile.user_id === loggedInUserId"
            :href="`/contractor/${profile.user_id}/edit`"
          >
            <button
              :class="` px-4 py-1 text-xs hover:bg-[#c78b22] sm:text-sm font-bold rounded-full border-[${'#c78b22'}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`"
              :style="{
                background: '#c78b22',
                borderColor: '#c78b22',
              }"
            >
              Edit
            </button>
          </Link>
          <button
            v-bind="props"
            @click="shareLink"
            :style="{
              color: '#c78b22',
              borderColor: '#c78b22',
            }"
            :class="`bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95`"
          >
            Share
          </button>
          <v-snackbar
            location="top"
            v-model="snackbarVisible"
            content-class="mt-6"
            color="success"
            :timeout="2000"
          >
            Link Copied to Clipboard
          </v-snackbar>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="max-w-[1400px] shadow-lg rounded mx-auto w-full">
      <img
        v-if="profile.company_logo || profile.user_avatar"
        class="w-full"
        :class="imageClass"
        ref="imgRef"
        @load="onLoad"
        :src="`/${profile.company_logo || profile.user_avatar}`"
        alt=""
      />
      <div
        v-else
        class="w-full text-[#2d2c2b] bg-[#f8f8f8] text-3xl flex justify-center items-center font-bold h-[400px]"
      >
        No Company Logo or User Avatar available for this contractor
      </div>
    </div>
  </div>

  <div
    v-if="profile.bottom_text"
    class="bg-[#f8f2e8] py-10 overflow-hidden"
    :style="{
      color: '#2d2c2b',
    }"
  >
    <div
      class="max-w-[1400px] px-3 sm:px-10 mx-auto flex justify-between w-full"
    >
      <div class="text-left">
        <div class="">
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
        <div class="flex text-lg sm:text-xl font-semibold mt-1 flex-col">
          <div class="text-base md:text-xl" v-if="city || state">
            {{ city + ", " + state }}
          </div>
          <div class="flex max-md:flex-col">
            <div>{{ profile.phone_office || profile.phone_cell }}</div>
            <div class="mx-2 flex translate-y-[-1px]" v-if="screenWidth > 768">
              |
            </div>
            <div>{{ profile.email }}</div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <div class="">
          <img src="/images/icons/pre-diamond.png" width="20" height="30" />
        </div>
        <div class="flex flex-col justify-center items-center">
          <StarRounded
            @click="openContractorRatingDialog"
            :starWidth="screenWidth > 768 ? 18 : 15"
            :class="`h-4 cursor-pointer `"
            :indicatorClasses="`text-small h-4 `"
            :starHeight="screenWidth > 768 ? 18 : 15"
            :rating="
              Number(parseFloat(averageRating ? averageRating : 0.0).toFixed(1))
            "
            :isIndicatorActive="false"
          />

          <div class="">
            <h2 class="font-light text-xs overflow-hidden tracking-tighter">
              {{ total_reviews }}
            </h2>
          </div>
        </div>

        <div class="flex gap-2 sm:gap-3 translate-x-[-2px]">
          <v-tooltip text="See User Posts" location="left">
            <template v-slot:activator="{ props }">
              <div
                @click="openPostDialog"
                class="active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md"
              >
                <button
                  class="xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center"
                >
                  <img
                    src="/images/icons/post_b.png"
                    v-bind="props"
                    width="28"
                    height="28"
                  />
                </button>
              </div>
            </template>
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="h-12 bg-[#2d2c2b]"></div> -->
  <!-- <div class="flex gap-2" :style="{ color: selectedColorScheme[2] }">
    <div :class="`${screenWidth > 768 ? 'w-3/4' : 'w-4/5'}`">
      <div v-if="profile.company_logo" class="flex justify-center mb-3">
        <Avatar
          imageClass="companyLogo"
          :imageSrc="`/${profile.company_logo}`"
        />
      </div>
      <div
        class="text-2xl text-center xs:text-3xl font-bold uppercase"
        :style="{
          color: '#4169E1',
        }"
        v-if="company_name"
      >
        {{ company_name }}
      </div>
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
      <div class="flex text-xl font-semibold mt-1 flex-col justify-center">
        <div class="self-center text-base md:text-xl" v-if="city || state">
          {{ city + ", " + state }}
        </div>
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
      </div>
    </div>
    <div
      :class="` ${
        screenWidth > 768 ? 'w-1/4' : ''
      } flex-grow flex flex-col gap-2  flex justify-center  items-center `"
    >
   
      <div class="flex flex-col justify-center items-center">
        <StarRounded
          @click="openContractorRatingDialog"
          :innerStarRadius="screenWidth > 768 ? 16 : 16"
          :starWidth="screenWidth > 768 ? 24 : 24"
          :class="`h-6 cursor-pointer `"
          :indicatorClasses="`text-small h-6 `"
          :starHeight="screenWidth > 768 ? 24 : 24"
          :rating="
            Number(parseFloat(averageRating ? averageRating : 0.0).toFixed(1))
          "
          :isIndicatorActive="false"
        />

        <div class="">
          <h2 class="font-light mt-2 text-sm overflow-hidden tracking-tighter">
            {{ total_reviews }}
          </h2>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <div class="">
          <img src="/images/icons/pre-diamond.png" width="20" height="30" />
        </div>
        <div class="flex gap-2 sm:gap-3 translate-x-[-2px]">
          <v-tooltip text="See User Posts" location="left">
            <template v-slot:activator="{ props }">
              <div
                @click="openPostDialog"
                class="active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md"
              >
                <button
                  class="xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center"
                >
                  <img
                    src="/images/icons/post_b.png"
                    v-bind="props"
                    width="28"
                    height="28"
                  />
                </button>
              </div>
            </template>
          </v-tooltip>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <Link
          class="rounded-full"
          v-if="profile.user_id === loggedInUserId"
          :href="`/contractor/${profile.user_id}/edit`"
        >
          <button
            :class="` px-4 py-1 text-xs hover:bg-[#4169E1] sm:text-sm font-bold rounded-full border-[${'#4169E1'}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`"
            :style="{
              background: '#4169E1',
              borderColor: '#4169E1',
            }"
          >
            Edit
          </button>
        </Link>
        <button
          v-bind="props"
          @click="shareLink"
          :style="{
            color: '#4169E1',
            borderColor: '#4169E1',
          }"
          :class="`bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95`"
        >
          Share
        </button>
        <v-snackbar
          location="top"
          v-model="snackbarVisible"
          content-class="mt-6"
          color="success"
          :timeout="2000"
        >
          Link Copied to Clipboard
        </v-snackbar>
      </div>
    </div>
  </div> -->
  <DialogContractorRating
    ref="ratingDialogRef"
    :loggedInUserId="profileId"
    :userId="profile.user_id"
  />
  <DialogContractorPosts ref="postDialogRef" :contractorId="profile.user_id" />
  <CustomDialog
    submitText="Okay"
    @submit="handleSubmit"
    :showCancel="false"
    :disableOutSideClick="false"
    ref="notLoggedDialogRef"
    errorIcon
    title="Log in Error"
  >
    <div class="mb-4 sm:mb-0 mt-4">
      You must be logged in to see the contractor's {{ modelText }}
    </div>
  </CustomDialog>
</template>

<script setup>
import StarRounded from "@/Components/Ratings/StarRounded.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import DialogContractorRating from "@/Components/Ratings/Contractor/DialogContractorRating.vue";
import DialogContractorPosts from "@/Components/Postings/DialogContractorPosts.vue";

import Card from "@/Components/Card.vue";

import Avatar from "@/Components/Ratings/Avatar.vue";
import { Icon } from "@iconify/vue";

import { computed, ref, watchEffect } from "vue";
import { template1Default } from "@/helpers/templateDefaults";

import { useStore } from "vuex";
import { usePage } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";
import { POSTS_IMAGES_FULL_PATH } from "@/config/constants";

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
const mainColor = ref("#4169E1");
const snackbarVisible = ref(false);
const notLoggedDialogRef = ref();
let usePageDeatails = usePage().props.value;
const user = usePageDeatails?.auth?.user;
const profileId = usePageDeatails?.profile?.id;
const modelText = ref("");

const handleSubmit = () => {
  notLoggedDialogRef.value.closeDialog();
};

const imageClass = ref("");
function image_path(img) {
  // function adds the filepath
  return POSTS_IMAGES_FULL_PATH + img;
}

const onLoad = async () => {
  console.log("onLoad");
  if (props.profile.company_logo || props.profile.user_avatar) {
    const img = new Image();
    img.src = "/" + props.profile.company_logo || props.profile.user_avatar;
    await new Promise((resolve) => (img.onload = resolve));

    console.log(img.naturalHeight, img.naturalWidth, "height,width");

    if (img.naturalWidth <= img.naturalHeight) {
      imageClass.value = "rounded-full object-contain h-[400px]"; // Apply border-radius: 50% for circular images
    } else {
      imageClass.value = ""; // No additional class for landscape images
    }
  }
};

const openNotLoggedDialog = () => {
  notLoggedDialogRef.value.openDialog();
};
// const usePageDeatails = ref(usePageDeatails().props.value);
console.log(usePageDeatails, "usepage");
const ratingDialogRef = ref();
const postDialogRef = ref();

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
    Inertia.visit("/sub-finder");
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
// const contractorId = computed(() => store.state.profile.contractorId);
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
const openContractorRatingDialog = () => {
  if (profileId) {
    ratingDialogRef.value.openDialog();
  } else {
    modelText.value = "ratings";

    openNotLoggedDialog();
  }
};
const openPostDialog = () => {
  if (profileId) {
    postDialogRef.value.openPostDialog();
  } else {
    modelText.value = "posts";
    openNotLoggedDialog();
  }
};
</script>
<style scoped>
@media (min-width: 640px) {
  .company-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.edit {
  top: 50%;
  left: 100%;
  transform: translate(-100%, -50%);
}
</style>
