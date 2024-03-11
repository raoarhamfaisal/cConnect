<template>
  <!-- Company ,contact address  -->
  <Card
    :shadowLevel="2"
    v-if="!loadingScript"
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
      <IconButton @click="openDialog" icon="nimbus:edit" color="#1864ab" />
    </div>

    <div class="flex space-x-2 justify-between">
      <div class="flex justify-center items-center space-x-2">
        <div>
          <v-skeleton-loader
            v-if="loadingImage"
            style="border-radius: 9999px"
            class="overflow-hidden w-14 h-14 sm:h-20 sm:w-20"
            type="image"
          >
          </v-skeleton-loader>
          <Avatar v-if="!loadingImage" :imageSrc="`/${company_logo}`" />
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
  <CustomDialog
    submitText="Save"
    @submit="handleSubmit"
    :loading="loading"
    :disabled="disabled"
    ref="dialogRef"
    title="Edit Your Contact Information"
  >
    <div class="flex justify-center">
      <v-skeleton-loader
        v-if="loadingImage"
        style="border-radius: 9999px"
        class="overflow-hidden w-36 h-36"
        type="image"
      >
      </v-skeleton-loader>
      <UserAvatar
        v-if="!loadingImage"
        :imageSrc="`/${company_logo ? company_logo : profile.user_avatar}`"
        @update-image="handleImageUpdate"
      />
    </div>
    <div
      class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <InputLabel
          class="font-bold"
          for="company_name"
          value="Company Name*"
        />
        <TextInput
          id="company_name"
          type="text"
          class="mt-1 block w-full"
          placeholder="Type your Company name"
          @input="clearError('company_name')"
          v-model="tempCompanyProfile.company_name"
          required
          autocomplete="company_name"
        />
        <InputError class="mt-2" :message="errors.company_name" />
      </div>
      <div>
        <InputLabel class="font-bold" for="phone_cell" value="Phone Cell*" />
        <TextInput
          id="phone_cell"
          type="tel"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.phone_cell"
          placeholder="Type your phone cell"
          v-mask="'###-###-#####'"
          @input="clearError('phone_cell')"
          autocomplete="tel"
        />
        <InputError class="mt-2" :message="errors.phone_cell" />
      </div>
      <div>
        <InputLabel class="font-bold" for="phone_office" value="Phone Office" />
        <TextInput
          id="phone_office"
          type="tel"
          class="mt-1 block w-full"
          @input="clearError('phone_office')"
          v-mask="'###-###-#####'"
          v-model="tempCompanyProfile.phone_office"
          placeholder="Type your phone office"
        />
        <InputError class="mt-2" :message="errors.phone_office" />
      </div>

      <div>
        <InputLabel class="font-bold" for="address_1" value="Address 1*" />
        <GoogleAddressAutocomplete
          id="address_1"
          v-model="tempCompanyProfile.address_1"
          @input="clearError('address_1')"
          @callback="callbackFunction"
          class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
          placeholder="Type your address 1"
        />
        <InputError class="mt-2" :message="errors.address_1" />
      </div>

      <div>
        <InputLabel class="font-bold" for="address_2" value="Address 2" />
        <GoogleAddressAutocomplete
          id="address_2"
          v-model="tempCompanyProfile.address_2"
          class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
          placeholder="Type your address 2"
        />
      </div>

      <div>
        <InputLabel class="font-bold" for="city" value="City*" />
        <TextInput
          id="city"
          type="text"
          class="mt-1 block w-full"
          @input="clearError('city')"
          v-model="tempCompanyProfile.city"
          placeholder="Type your city"
          autocomplete="city"
        />
        <InputError class="mt-2" :message="errors.city" />
      </div>
      <div>
        <InputLabel class="font-bold mb-1" for="state" value="State*" />
        <SelectProfile
          :options="stateList"
          :modelValue="tempCompanyProfile.state"
          @update:modelValue="
            (value) => {
              tempCompanyProfile.state = value;
              clearError('state');
            }
          "
        />
        <InputError class="mt-2" :message="errors.state" />
      </div>

      <div>
        <InputLabel class="font-bold" for="zipcode" value="Zip Code*" />
        <TextInput
          id="zipcode"
          type="text"
          class="mt-1 block w-full"
          @input="clearError('zipcode')"
          v-model="tempCompanyProfile.zipcode"
          placeholder="Type your Zip Code"
        />
        <InputError class="mt-2" :message="errors.zipcode" />
      </div>
      <div>
        <InputLabel class="font-bold" for="county" value="County*" />
        <TextInput
          id="county"
          type="text"
          @input="clearError('county')"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.county"
          placeholder="Type your County"
        />
        <InputError class="mt-2" :message="errors.county" />
      </div>
    </div>
  </CustomDialog>
</template>
<script setup>
import IconButton from "@/Components/IconButton.vue";
import InfoWithIcon from "@/Components/ContractorPage/InfoWithIcon.vue";
import { stateList } from "@/helpers/selectListsHelpters.js";
import InputError from "@/Components/InputError.vue";

import Card from "@/Components/Card.vue";
import SelectProfile from "@/Components/SelectProfile.vue";

import UserAvatar from "@/Pages/Profile/components/UserAvatar.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import {
  reactive,
  ref,
  watchEffect,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import {
  getAxiosConfigFormData,
  getAxiosConfig,
} from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import GoogleAddressAutocomplete from "@/Components/GoogleAddressAutoComplete.vue";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
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
const loadingImage = ref(false);
const county = ref(props.profile.county);
const zipcode = ref(props.profile.zipcode);
const loading = ref(false);
const loadingScript = ref(true);
const disabled = ref(false);
const tempCompanyProfile = reactive({
  company_name: company_name.value ?? "",
  company_logo: company_logo.value ?? "",
  phone_cell: phone_cell.value ?? "",
  phone_office: phone_office.value ?? "",

  address_1: address_1.value ?? "",
  address_2: address_2.value ?? "",
  city: city.value ?? "",
  state: state.value ?? "",
  county: county.value ?? "",
  zipcode: zipcode.value ?? "",
});
const errors = reactive({
  phone_cell: "",
  company_name: "",
  phone_office: "",
  address_1: "",
  city: "",
  state: "",
  zipcode: "",
  county: "",
});

const dialogRef = ref();

//Methods

const openDialog = () => {
  dialogRef.value.openDialog();
};

const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
    } else {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;

      window.initMap = () => {
        resolve();
      };

      googleMapsScript.onerror = (error) => {
        reject(error);
      };

      document.head.appendChild(googleMapsScript);
    }
  });
};
onBeforeUnmount(() => {
  if (window.initMap) {
    delete window.initMap;
  }
});
onMounted(async () => {
  try {
    loadingScript.value = true;
    await loadGoogleMapsScript();
    loadingScript.value = false;
  } catch (error) {
    console.error("Failed to load Google Maps API", error);
  }
});
const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }
  if (!tempCompanyProfile.phone_cell?.trim()) {
    errors.phone_cell = "Phone number is required";
    isValid = false;
  }
  if (tempCompanyProfile.phone_cell?.trim().length > 13) {
    errors.phone_cell = "Phone number must not be greater than 13 numbers";
    isValid = false;
  }
  if (tempCompanyProfile.phone_office?.trim().length > 13) {
    errors.phone_office = "Phone Office must not be greater than 13 numbers";
    isValid = false;
  }
  // Validate address_1
  if (!tempCompanyProfile.address_1?.trim()) {
    errors.address_1 = "Address 1 is required";
    isValid = false;
  }
  // Validate company_name
  if (!tempCompanyProfile.company_name?.trim()) {
    errors.company_name = "Company name is required";
    isValid = false;
  }

  // Validate city
  if (!tempCompanyProfile.city?.trim()) {
    errors.city = "City is required";
    isValid = false;
  }

  // Validate state
  if (!tempCompanyProfile.state?.trim()) {
    errors.state = "State is required";
    isValid = false;
  }

  // Validate zipcode
  if (!tempCompanyProfile.zipcode?.trim()) {
    errors.zipcode = "Zipcode is required";
    isValid = false;
  }

  if (!tempCompanyProfile.zipcode?.trim()) {
    errors.zipcode = "Zipcode is required";
    isValid = false;
  }
  // Validate county
  if (!tempCompanyProfile.county?.trim()) {
    errors.county = "County is required";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    loading.value = true;
    disabled.value = true;
    try {
      const response = await axios.patch(
        `/api/contractor/additional-information`, // assuming this endpoint
        tempCompanyProfile,
        getAxiosConfig()
      );

      if (response.data) {
        changesSaved(
          response.data.message || "Additional information successfully saved"
        );

        // Updating the refs with the new values
        company_name.value = tempCompanyProfile.company_name;
        company_logo.value = tempCompanyProfile.company_logo;
        phone_cell.value = tempCompanyProfile.phone_cell;
        phone_office.value = tempCompanyProfile.phone_office;
        address_1.value = tempCompanyProfile.address_1;
        address_2.value = tempCompanyProfile.address_2;
        city.value = tempCompanyProfile.city;
        state.value = tempCompanyProfile.state;
        county.value = tempCompanyProfile.county;
        zipcode.value = tempCompanyProfile.zipcode;

        dialogRef.value.closeDialog();
      }
    } catch (err) {
      somethingWentWrong();
    } finally {
      loading.value = false;
      disabled.value = false;
    }
  }
};

// Upload User Avatar on image change
const handleImageUpdate = async (file) => {
  loadingImage.value = true;
  const formData = new FormData();
  formData.append("company_logo", file);

  // formData.append("user_id", user.id);
  axios
    .post("/api/contractor/company-logo", formData, getAxiosConfigFormData())
    .then((response) => {
      company_logo.value = response.data.company_logo; // Update the local state with
      loadingImage.value = false;
    })
    .catch((error) => {
      loadingImage.value = false;

      somethingWentWrong("Error uploading avatar");
      // Handle the error appropriately here
    });
};

const clearError = (field) => {
  console.log("Clear errors", field);
  //for phone_cell only
  if (field === "phone_cell" || field === "phone_office") {
    if (tempCompanyProfile[field]?.trim().length <= 13) {
      errors[field] = "";
    }
    return;
  }
  if (tempCompanyProfile[field]?.trim()) {
    errors[field] = "";
  }
};

const callbackFunction = (place) => {
  console.log(place, "place");
  for (const component of place.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    if (componentType == "locality") {
      tempCompanyProfile.city = component.long_name;
    }
    if (componentType == "administrative_area_level_2") {
      tempCompanyProfile.county = component.long_name;
    }
    if (componentType == "administrative_area_level_1") {
      tempCompanyProfile.state = component.long_name;
    }
    if (componentType == "postal_code") {
      tempCompanyProfile.zipcode = component.long_name;
    }
  }
};
</script>
