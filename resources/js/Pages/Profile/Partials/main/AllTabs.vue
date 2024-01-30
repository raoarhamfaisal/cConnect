<script setup>
// import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.vue";
import GeneralInfo from "@/Pages/Profile/Partials/GeneralInfo.vue";
import Tabs from "@/Pages/Profile/components/Tabs.vue";
import CompanyAddressInfo from "@/Pages/Profile/Partials/CompanyAddressInfo.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

import Trades from "@/Pages/Profile/Partials/Trades.vue";
import Views from "@/Pages/Profile/Partials/Views.vue";
import LinksInfo from "@/Pages/Profile/Partials/LinksInfo.vue";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
const propertiesToProcess = [
  "website_url",
  "facebook",
  "twitter",
  "tiktok",
  "instagram",
];
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
// const tabNames = ["General Info", "Trades", "Views"];
const form = reactive({
  first_name: props.profile.first_name,
  last_name: props.profile.last_name,
  phone_cell: props.profile.phone_cell,
  company_name: props.profile.company_name,
  phone_office: props.profile.phone_office,
  region_id:
    props.profile &&
    props.profile.region_id &&
    props.profile.region_id.toString(),
  address_1: props.profile.address_1,
  address_2: props.profile.address_2,
  city: props.profile.city,
  state: props.profile.state,
  zipcode: props.profile.zipcode,
  county: props.profile.county,
  website_url: props.profile.website_url,
  facebook: props.profile.facebook,
  twitter: props.profile.twitter,
  tiktok: props.profile.tiktok,
  instagram: props.profile.instagram,
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
  region: "",
  website_url: "",
  facebook: "",
  twitter: "",
  tiktok: "",
  instagram: "",
});
const loading = computed(() => store.state.profile.loading);

const translations = computed(() => store.getters.translations);
const tabNames = computed(() => {
  return [
    translations.value && translations.value.general_info,
    translations.value && translations.value.trades,
    translations.value && translations.value.views,
  ];
});

const validateForm = () => {
  //Computed

  //Methods
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }

  // Validate first_name
  if (!form.first_name?.trim()) {
    errors.first_name =
      translations.value && translations.value.first_name_is_required;
    isValid = false;
  }
  if (!form.last_name?.trim()) {
    errors.last_name =
      translations.value && translations.value.last_name_is_required;
    isValid = false;
  }
  if (!form.phone_cell?.trim()) {
    errors.phone_cell =
      translations.value && translations.value.phone_number_is_required;
    isValid = false;
  }
  if (form.phone_cell?.trim().length > 13) {
    errors.phone_cell =
      translations.value &&
      translations.value.phone_number_must_not_be_greater_than_13_numbers;
    isValid = false;
  }
  if (form.phone_office?.trim().length > 13) {
    errors.phone_office =
      translations.value &&
      translations.value.phone_office_must_not_be_greater_than_13_numbers;
    isValid = false;
  }
  // Validate address_1
  if (!form.address_1?.trim()) {
    errors.address_1 =
      translations.value && translations.value.address_1_is_required;
    isValid = false;
  }

  // Validate city
  if (!form.city?.trim()) {
    errors.city = translations.value && translations.value.city_is_required;
    isValid = false;
  }

  // Validate state
  if (!form.state?.trim()) {
    errors.state = translations.value && translations.value.state_is_required;
    isValid = false;
  }
  // Validate company_name
  if (!form.company_name?.trim()) {
    errors.company_name =
      translations.value && translations.value.company_name_is_required;
    isValid = false;
  }
  // Validate zipcode
  if (form.zipcode?.trim().length < 5) {
    errors.zipcode =
      translations.value &&
      translations.value.zipcode_cannot_be_less_than_5_characters;
    isValid = false;
  }
  if (!form.zipcode?.trim()) {
    errors.zipcode =
      translations.value && translations.value.zipcode_is_required;
    isValid = false;
  }

  // Validate county
  if (!form.county?.trim()) {
    errors.county = translations.value && translations.value.county_is_required;
    isValid = false;
  }

  // Validate region
  if (!form.region_id?.trim()) {
    errors.region_id =
      translations.value && translations.value.region_is_required;
    isValid = false;
  }
  // Validate website_url
  if (form.website_url && !isValidUrl(form.website_url)) {
    errors.website_url =
      translations.value && translations.value.invalid_website_url;
    isValid = false;
  }

  // Validate facebook
  if (form.facebook && !isValidUrl(form.facebook)) {
    errors.facebook =
      translations.value && translations.value.invalid_facebook_url;
    isValid = false;
  }

  // Validate twitter
  if (form.twitter && !isValidUrl(form.twitter)) {
    errors.twitter =
      translations.value && translations.value.invalid_twitter_url;
    isValid = false;
  }

  // Validate tiktok
  if (form.tiktok && !isValidUrl(form.tiktok)) {
    errors.tiktok = translations.value && translations.value.invalid_tiktok_url;
    isValid = false;
  }

  // Validate instagram
  if (form.instagram && !isValidUrl(form.instagram)) {
    errors.instagram =
      translations.value && translations.value.invalid_instagram_url;
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
  //for phone_cell only
  if (field === "phone_cell" || field === "phone_office") {
    if (form[field]?.trim().length <= 13) {
      errors[field] = "";
    }
    return;
  }
  if (form[field]?.trim()) {
    errors[field] = "";
  }
};

const handleTabChange = (newActiveTab) => {
  store.commit("profile/setActiveTab", newActiveTab);
};
const submitDetails = async () => {
  propertiesToProcess.forEach((prop) => {
    if (form[prop] && typeof form[prop] === "string") {
      form[prop] = form[prop].replace(/^https?:\/\//, "");
    }
  });
  if (validateForm()) {
    await store.dispatch("profile/updateProfileGeneralInfo", {
      form: form,
      showSuccess: true,
    });
  }
};
</script>

<template>
  <header v-if="showHeader" class="bg-gray-200">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 max-lg:pt-10">
      <h2 class="font-bold text-xl text-blue-rgba leading-tight">
        {{ translations && translations.profile }}
      </h2>
    </div>
  </header>
  <div class="bg-gray-200">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
      <Tabs :tabs="tabNames" @tabChanged="handleTabChange">
        <template #default="{ activeTab }">
          <div v-if="activeTab === 0">
            <GeneralInfo
              v-model:form="form"
              :email="profile.email"
              mode="profile"
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
              mode="profile"
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
            <div class="flex items-center gap-4 mt-6 w-full">
              <PrimaryButton
                @click="submitDetails"
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
                  {{ translations && translations.save }}
                </div>
                <img
                  v-show="loading"
                  src="/images/avatars/Spinner.gif"
                  alt="spinner"
                  width="30"
              /></PrimaryButton>
            </div>
          </div>
          <div v-if="activeTab === 1">
            <Trades :profile="profile" />
          </div>
          <div v-if="activeTab === 2">
            <Views :profile="profile" />
          </div>
          <!-- ... -->
        </template>
      </Tabs>
      <!-- <div
          v-if="active === 0"
          class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
        >
          <DeleteUserForm class="max-w-xl" />
        </div> -->
    </div>
    <br />
    <br />
  </div>
</template>
