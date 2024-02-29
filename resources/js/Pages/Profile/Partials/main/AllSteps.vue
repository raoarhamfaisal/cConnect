<script setup>
// import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import GeneralInfo from "@/Pages/Profile/Partials/GeneralInfo.vue";
import CompanyAddressInfo from "@/Pages/Profile/Partials/CompanyAddressInfo.vue";
import Trades from "@/Pages/Profile/Partials/Trades.vue";
import Views from "@/Pages/Profile/Partials/Views.vue";
import LinksInfo from "@/Pages/Profile/Partials/LinksInfo.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";

const props = defineProps({
  mustVerifyEmail: Boolean,
  status: String,
  profile: Object,
  regions: Array,
  showHeader: {
    default: true,
    type: Boolean,
  },
});
const store = useStore();
const profile = props?.profile ?? {};
const propertiesToProcess = [
  "website_url",
  "facebook",
  "twitter",
  "tiktok",
  "instagram",
];

const form = reactive({
  first_name: profile.first_name ?? "",
  last_name: profile.last_name ?? "",
  phone_cell: profile.phone_cell ?? "",
  company_name: profile.company_name ?? "",
  phone_office: profile.phone_office ?? "",
  region_id: profile.region_id?.toString() ?? "",
  address_1: profile.address_1 ?? "",
  address_2: profile.address_2 ?? "",
  city: profile.city ?? "",
  state: profile.state ?? "",
  zipcode: profile.zipcode ?? "",
  county: profile.county ?? "",
  website_url: profile.website_url ?? "",
  facebook: profile.facebook ?? "",
  twitter: profile.twitter ?? "",
  tiktok: profile.tiktok ?? "",
  instagram: profile.instagram ?? "",
});

const errors = reactive({
  first_name: "",
  last_name: "",
  phone_cell: "",
  company_name: "",
  phone_office: "",
  address_1: "",
  city: "",
  state: "",
  zipcode: "",
  county: "",
  region_id: "",
  website_url: "",
  facebook: "",
  twitter: "",
  tiktok: "",
  instagram: "",
});
const currentStep = ref(1);
const editableAllowed = ref(1);
const steps = ref(4);
const stepTitles = ["General Info", "Trades", "Views", "Billing"];

const disable = computed(() => {
  return currentStep.value === 1
    ? "prev"
    : currentStep.value > steps.value
    ? "next"
    : false;
});
const screenWidth = computed(() => store.getters.screenWidth);
const loading = computed(() => store.state.profile.loading);

// Methods

const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }
  console.log(form, "form");
  // Validate first_name
  if (!form.first_name.trim()) {
    errors.first_name = "First name is required";
    isValid = false;
  }
  if (!form.last_name.trim()) {
    errors.last_name = "Last name is required";
    isValid = false;
  }
  if (!form.phone_cell.trim()) {
    errors.phone_cell = "Phone number is required";
    isValid = false;
  }
  if (form.phone_cell.trim().length > 13) {
    errors.phone_cell = "Phone number must not be greater than 13 numbers";
    isValid = false;
  }
  if (form.phone_office.trim().length > 13) {
    errors.phone_office = "Phone Office must not be greater than 13 numbers";
    isValid = false;
  }
  // Validate address_1
  if (!form.address_1.trim()) {
    errors.address_1 = "Address 1 is required";
    isValid = false;
  }
  // Validate company_name
  if (!form.company_name.trim()) {
    errors.company_name = "Company name is required";
    isValid = false;
  }

  // Validate city
  if (!form.city.trim()) {
    errors.city = "City is required";
    isValid = false;
  }

  // Validate state
  if (!form.state.trim()) {
    errors.state = "State is required";
    isValid = false;
  }

  // Validate zipcode
  if (!form.zipcode.trim()) {
    errors.zipcode = "Zipcode is required";
    isValid = false;
  }

  // Validate county
  if (!form.county.trim()) {
    errors.county = "County is required";
    isValid = false;
  }

  // Validate region
  if (!form.region_id.trim()) {
    errors.region_id = "Region is required";
    isValid = false;
  }
  // Validate website_url
  if (form.website_url && !isValidUrl(form.website_url)) {
    errors.website_url = "Invalid website URL";
    isValid = false;
  }

  // Validate facebook
  if (form.facebook && !isValidUrl(form.facebook)) {
    errors.facebook = "Invalid Facebook URL";
    isValid = false;
  }

  // Validate twitter
  if (form.twitter && !isValidUrl(form.twitter)) {
    errors.twitter = "Invalid Twitter URL";
    isValid = false;
  }

  // Validate tiktok
  if (form.tiktok && !isValidUrl(form.tiktok)) {
    errors.tiktok = "Invalid TikTok URL";
    isValid = false;
  }

  // Validate instagram
  if (form.instagram && !isValidUrl(form.instagram)) {
    errors.instagram = "Invalid Instagram URL";
    isValid = false;
  }

  return isValid;
};

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,6}|" + // validate domain name and tld
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(urlString);
};

const clearErrors = (field) => {
  console.log("Clear errors", field);
  //for phone_cell only
  if (field === "phone_cell" || field === "phone_office") {
    if (form[field].trim().length <= 13) {
      errors[field] = "";
    }
    return;
  }
  if (form[field].trim()) {
    errors[field] = "";
  }
};

const nextClick = async () => {
  //for last step
  if (currentStep.value === steps.value) {
    Inertia.visit(route("post"));
  }
  //for step 1 complted
  if (currentStep.value === 1) {
    if (validateForm()) {
      propertiesToProcess.forEach((prop) => {
        if (form[prop] && typeof form[prop] === "string") {
          form[prop] = form[prop].replace(/^https?:\/\//, "");
        }
      });
      await store.dispatch("profile/updateProfileGeneralInfoForProfileSetup", {
        form: form,
        showSuccess: false,
      });
    } else {
      return;
    }
  }
  currentStep.value = currentStep.value + 1;
  editableAllowed.value = editableAllowed.value + 1;
};
const completePayment = async () => {
  await store.dispatch("profile/verifyPayment");
};
</script>

<template>
  <v-stepper
    prev-text="back"
    :next-text="currentStep >= steps ? 'News Feed' : 'Continue'"
    alt-labels
    v-model="currentStep"
  >
    <template v-slot:default="{ prev }">
      <v-stepper-header class="flex-col">
        <header v-if="showHeader" class="w-full">
          <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 max-lg:pt-10">
            <h2
              class="font-bold text-2xl sm:text-3xl text-blue-rgba leading-tight"
            >
              Profile Setup
            </h2>
            <p class="mt-0.5 text-sm text-gray-600">
              Set up your Profile to get started
            </p>
          </div>
        </header>
        <div
          class="flex justify-between items-center relative overflow-x-auto z-10 self-start w-full"
        >
          <template v-for="(n, index) in steps" :key="`${n}-step`">
            <v-stepper-item
              :complete="currentStep > n"
              class="step"
              :step="`Step ${n}`"
              :value="n"
              :style="{
                color: currentStep > n - 1 ? '#2b8a3e' : 'inherit',
                opacity: 1,
                padding: screenWidth > 700 ? '1.5rem' : '1.5rem 0rem',
              }"
              :editable="editableAllowed > n ? true : false"
              >{{ stepTitles[index] }}</v-stepper-item
            >
            <v-divider
              v-if="n !== steps"
              :style="{
                opacity: 1,
                border:
                  currentStep > n ? '4px solid #2b8a3e' : '4px solid grey',
                margin:
                  screenWidth > 700
                    ? '35px -55px 0'
                    : screenWidth > 450
                    ? '35px -40px 0px'
                    : '35px -20px 0',
              }"
              :thickness="4"
              :key="n"
            ></v-divider>
          </template>
        </div>
      </v-stepper-header>

      <v-stepper-window>
        <div class="sm:p-[1rem] bg-white shadow sm:rounded-lg">
          <v-stepper-window-item :value="1">
            <GeneralInfo
              v-model:form="form"
              :user_avatar="profile.user_avatar"
              :errors="errors"
              @clearErrors="clearErrors"
              class="flex flex-col justify-center m-auto"
            />
            <v-divider
              class="mt-8 mb-6"
              style="opacity: 1"
              :thickness="3"
            ></v-divider>
            <CompanyAddressInfo
              :region_id="profile.region_id"
              :company_logo="profile.company_logo"
              :regions="regions"
              v-model:form="form"
              :errors="errors"
              @clearErrors="clearErrors"
            />

            <v-divider
              class="mt-8 mb-6"
              style="opacity: 1"
              :thickness="3"
            ></v-divider>
            <LinksInfo
              v-model:form="form"
              :errors="errors"
              @clearErrors="clearErrors"
            />
          </v-stepper-window-item>
          <v-stepper-window-item :value="2">
            <Trades :profile="profile" />
          </v-stepper-window-item>
          <v-stepper-window-item :value="3">
            <Views :profile="profile" />
          </v-stepper-window-item>
          <v-stepper-window-item :value="4">
            <PrimaryButton
              @click="completePayment"
              :disabled="loading"
              style="
                background-image: linear-gradient(
                  111.4deg,
                  rgba(7, 7, 9, 1) 6.5%,
                  rgba(27, 24, 113, 1) 93.2%
                );
              "
              class="w-full flex justify-center"
            >
              <div class="flex items-center justify-center">
                Complete Payment
              </div>
              <img
                v-show="loading"
                src="/images/avatars/Spinner.gif"
                alt="spinner"
                width="30"
            /></PrimaryButton>
          </v-stepper-window-item>
        </div>
      </v-stepper-window>

      <v-stepper-actions
        :class="`buttonClass ${currentStep >= steps ? 'nextNewFeedColor' : ''}`"
        :disabled="disable"
        @click:prev="prev"
        @click:next="nextClick"
      ></v-stepper-actions>
    </template>
  </v-stepper>
</template>
<style>
.v-stepper-item--selected.step .v-stepper-item__avatar.v-avatar,
.v-stepper-item--complete .v-stepper-item__avatar.v-avatar {
  background: #2b8a3e;
}
@media (max-width: 700px) {
  .v-stepper--alt-labels .v-stepper-item {
    flex-basis: 130px;
  }
}
@media (max-width: 450px) {
  .v-stepper--alt-labels .v-stepper-item {
    flex-basis: 77px;
  }
}
.buttonClass button:last-child {
  background-image: linear-gradient(
    111.4deg,
    rgba(27, 24, 113, 1) 6.5%,
    rgba(7, 7, 9, 1) 97.2%
  );

  color: #fff;
}
.nextNewFeedColor.buttonClass button:last-child {
  background: #2b8a3e;
  color: #fff;
}
.buttonClass button:first-child {
  background: #ccc;
}
.buttonClass button:first-child:hover {
  background-image: linear-gradient(
    111.4deg,
    rgba(27, 24, 113, 1) 6.5%,
    rgba(7, 7, 9, 1) 97.2%
  );

  color: #fff;
}
</style>
