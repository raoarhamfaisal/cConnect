<template>
  <!-- Header -->

  <div v-if="showGoBack" class="flex gap-2 mb-1 items-center">
    <div @click="goBack" class="cursor-pointer">
      <Icon
        class="w-6 h-6"
        icon="ion:arrow-back"
        :color="selectedColorScheme[3]"
      />
    </div>
    <div
      @click="goBack"
      class="font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-xl leading-tight"
      :style="{
        color: selectedColorScheme[3],
      }"
    >
      {{ translations && translations.go_back }}
    </div>
  </div>
  <div class="flex gap-2" :style="{ color: selectedColorScheme[2] }">
    <div :class="`${screenWidth > 768 ? 'w-3/4' : 'w-4/5'}`">
      <!-- Company Logo -->
      <div class="flex justify-center mb-3">
        <CompanyAvatar
          imageClass="companyLogo"
          :imageSrc="`/${profile.company_logo}`"
        />
      </div>
      <!-- company name -->
      <div
        class="text-2xl text-center xs:text-3xl font-bold uppercase"
        :style="{
          color: selectedColorScheme[3],
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
      <div class="flex flex-col md:mt-2 justify-center items-center">
        <StarRounded
          @click="openContractorRatingDialog"
          :innerStarRadius="screenWidth > 768 ? 17 : 13"
          :starWidth="screenWidth > 768 ? 24 : 15"
          :class="`h-4 md:h-6 cursor-pointer`"
          :indicatorClasses="`text-small h-4 md:h-6 `"
          :starHeight="screenWidth > 768 ? 24 : 15"
          :rating="
            Number(parseFloat(averageRating ? averageRating : 0.0).toFixed(1))
          "
          :isIndicatorActive="false"
        />

        <div class="md:mt-2">
          <h2
            class="font-light mt-2 md:text-base text-sm overflow-hidden tracking-tighter"
          >
            {{ total_reviews }}
          </h2>
        </div>
        <div
          class="text-gray-800 text-[11px] xs:text-xs sm:text-sm text-center"
        >
          {{ userVersionMemberText }}
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
          :class="`bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px]  cursor-pointer hover:shadow-lg active:scale-95`"
        >
          {{ translations && translations.share }}
        </button>
        <v-snackbar
          location="top"
          v-model="snackbarVisible"
          content-class="mt-6"
          color="success"
          :timeout="2000"
        >
          {{ translations && translations.link_copied_to_clipboard }}
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
    :submitText="translations && translations.okay"
    @submit="handleSubmit"
    :showCancel="false"
    :disableOutSideClick="false"
    ref="notLoggedDialogRef"
    errorIcon
    :title="translations && translations.log_in_error"
  >
    <div class="mb-4 sm:mb-0 mt-4">
      {{ translations && translations.you_must_be_logged_in }} {{ modelText }}
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

import { computed, onMounted, ref } from "vue";
import { template1Default } from "@/helpers/templateDefaults";

import { useStore } from "vuex";
import { usePage } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";

// Province
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
let usePageDeatails = usePage().props.value;

const profileId = usePageDeatails?.profile?.id;
const modelText = ref("");
const notLoggedDialogRef = ref();
const showGoBack = ref(true);

onMounted(() => {
  const showBack = localStorage.getItem("showGoBack");
  if (showBack === "false") {
    showGoBack.value = false;
  }
  console.log(showBack);
  localStorage.removeItem("showGoBack");
});
const handleSubmit = () => {
  notLoggedDialogRef.value.closeDialog();
};
const openNotLoggedDialog = () => {
  notLoggedDialogRef.value.openDialog();
};

const ratingDialogRef = ref();
const postDialogRef = ref();

const shareLink = () => {
  if (userVersion.value !== 3) {
    store.commit("setIsUpgradeToGoldPlatinumDialogOpen", true);
    return;
  }
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
  } else if (prevUrl === "/settings") {
    Inertia.visit(`/settings`);
  } else {
    Inertia.visit("/sub-finder");
  }
};

const store = useStore();
const first_name = ref(props.profile.first_name);
const last_name = ref(props.profile.last_name);
const company_name = ref(props.profile.company_name);
const city = ref(props.profile.city);
const state = ref(props.profile.state);

//  Emits

//Computed
const translations = computed(() => store.getters.translations);
const userVersion = computed(() => store.getters.userVersion);
const userVersionMemberText = computed(() => {
  if (props.profile.version === 1) {
    return translations.value && translations.value.free_member;
  } else if (props.profile.version === 2) {
    return translations.value && translations.value.gold_member;
  } else if (props.profile.version === 3) {
    return translations.value && translations.value.platinum_member;
  }
});
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
</script>
<style scoped></style>
