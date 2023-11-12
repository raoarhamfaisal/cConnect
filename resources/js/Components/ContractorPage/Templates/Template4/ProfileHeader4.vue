<template>
  <!-- Header -->

  <div class="flex gap-2 mb-1 items-center">
    <div @click="goBack" class="cursor-pointer">
      <Icon
        class="w-8 h-8"
        icon="ion:arrow-back"
        :color="selectedColorScheme[3]"
      />
    </div>
    <div
      @click="goBack"
      class="font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-2xl leading-tight"
      :style="{
        color: selectedColorScheme[3],
      }"
    >
      Go Back
    </div>
  </div>
  <div class="flex gap-2 mt-4" :style="{ color: selectedColorScheme[2] }">
    <div
      :class="`${screenWidth > 768 ? 'w-3/4' : 'w-4/5'}`"
      class="flex items-start"
    >
      <!-- Company Logo -->
      <div v-if="profile.company_logo" class="mr-4 flex-none">
        <CompanyAvatar
          imageClass="companyLogo"
          :imageSrc="`/${profile.company_logo}`"
        />
      </div>

      <!-- Content on the right -->
      <div class="flex-grow">
        <!-- company name -->
        <div
          class="text-2xl xs:text-3xl font-bold uppercase"
          style="line-height: 2rem"
          :style="{
            color: selectedColorScheme[3],
          }"
          v-if="company_name"
        >
          {{ company_name }}
        </div>

        <!-- user name -->
        <div>
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
                style="line-height: 1.7rem"
              >
                {{ truncatedName }}
              </h2>
            </template>
          </v-tooltip>
        </div>

        <!-- phoneOffice -->
        <div class="text-xl font-semibold mt-1">
          <div class="text-base md:text-xl" v-if="city || state">
            {{ city + ", " + state }}
          </div>
          <div class="flex flex-col md:flex-row items-start md:items-center">
            <div>{{ profile.phone_office || profile.phone_cell }}</div>
            <div
              class="mx-2 md:flex md:justify-center md:items-center translate-y-[-1px]"
              v-if="screenWidth > 768"
            >
              |
            </div>
            <div>{{ profile.email }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      :class="` ${
        screenWidth > 768 ? 'w-1/4' : ''
      } flex-grow flex flex-col gap-2  flex justify-center  items-center `"
    >
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
      <div class="flex flex-col gap-1">
        <Link
          class="rounded-full"
          v-if="profile.user_id === loggedInUserId"
          :href="`/contractor/${profile.user_id}/edit`"
        >
          <button
            :class="` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${selectedColorScheme[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`"
            :style="{
              background: selectedColorScheme[4],
              borderColor: selectedColorScheme[4],
            }"
          >
            Edit
          </button>
        </Link>
        <button
          v-bind="props"
          @click="shareLink"
          :style="{
            color: selectedColorScheme[4],
            borderColor: selectedColorScheme[4],
          }"
          :class="`bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95`"
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
import DialogContractorRating from "@/Components/Ratings/Contractor/DialogContractorRating.vue";
import DialogContractorPosts from "@/Components/Postings/DialogContractorPosts.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import CompanyAvatar from "@/Components/Ratings/CompanyAvatar.vue";
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
const ratingDialogRef = ref();
const postDialogRef = ref();
let usePageDeatails = usePage().props.value;
const user = usePageDeatails?.auth?.user;
const profileId = usePageDeatails?.profile?.id;
const modelText = ref("");
const notLoggedDialogRef = ref();

const handleSubmit = () => {
  notLoggedDialogRef.value.closeDialog();
};
const openNotLoggedDialog = () => {
  notLoggedDialogRef.value.openDialog();
};

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
    postDialogRef.value.openDialog();
  } else {
    modelText.value = "posts";
    openNotLoggedDialog();
  }
};
</script>
<style scoped></style>
