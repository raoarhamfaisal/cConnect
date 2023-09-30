<template>
  <!-- Company ,contact address  -->
  <Card
    :shadowLevel="2"
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
      <IconButton
        v-if="mode === 'edit'"
        @click="openDialog"
        icon="nimbus:edit"
        color="#1864ab"
      />
    </div>

    <div class="flex space-x-2 justify-between">
      <div class="flex justify-center items-center space-x-2">
        <div>
          <Avatar :imageSrc="`/${company_logo}`" />
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
        icon="clarity:email-solid"
        tooltipText="Email"
        :text="email"
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
    v-if="mode === 'edit'"
    submitText="Save"
    @submit="handleSubmit"
    :loading="loading"
    :disabled="disabled"
    ref="dialogRef"
    title="Edit Your Additional Information"
  >
    <div class="flex justify-center">
      <UserAvatar
        :imageSrc="`/${company_logo ? company_logo : profile.user_avatar}`"
        @update-image="handleImageUpdate"
      />
    </div>
    <div
      class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <InputLabel class="font-bold" for="company_name" value="Company Name" />
        <TextInput
          id="company_name"
          type="text"
          class="mt-1 block w-full"
          placeholder="Type your Company name"
          v-model="tempCompanyProfile.company_name"
          required
          autocomplete="company_name"
        />
        <!-- <InputError class="mt-2" :message="form.errors.email" /> -->
      </div>
      <div>
        <InputLabel class="font-bold" for="phone_cell" value="Phone Cell" />
        <TextInput
          id="phone_cell"
          type="tel"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.phone_cell"
          placeholder="Type your phone cell"
          autocomplete="tel"
        />
        <div v-if="errors.phoneCellError" class="text-red-500">
          {{ errors.phoneCellError }}
        </div>
      </div>
      <div>
        <InputLabel class="font-bold" for="phone_office" value="Phone Office" />
        <TextInput
          id="phone_office"
          type="tel"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.phone_office"
          placeholder="Type your phone office"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_office" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="email" value="Email" />
        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.email"
          placeholder="Type your email"
          autocomplete="email"
        />
        <div v-if="errors.emailError" class="text-red-500">
          {{ errors.emailError }}
        </div>
      </div>

      <div>
        <InputLabel class="font-bold" for="address_1" value="Address 1" />
        <TextInput
          id="address_1"
          type="text"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.address_1"
          placeholder="Type your Address 1"
        />
        <!-- <InputError class="mt-2" :message="form.errors.address_1" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="address_2" value="Address 2" />
        <TextInput
          id="address_2"
          type="text"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.address_2"
          placeholder="Type your Address 2"
        />
        <!-- <InputError class="mt-2" :message="form.errors.address_2" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="city" value="City" />
        <TextInput
          id="city"
          type="text"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.city"
          placeholder="Type your city"
          autocomplete="city"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
      <div>
        <InputLabel class="font-bold mb-1" for="state" value="State" />
        <SelectProfile
          :options="stateList"
          :modelValue="tempCompanyProfile.state"
          @update:modelValue="
            (value) => {
              tempCompanyProfile.state = value;
            }
          "
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="zipcode" value="Zip Code" />
        <TextInput
          id="zipcode"
          type="text"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.zipcode"
          placeholder="Type your Zip Code"
        />
        <!-- <InputError class="mt-2" :message="form.errors.zipcode" /> -->
      </div>
      <div>
        <InputLabel class="font-bold" for="county" value="County" />
        <TextInput
          id="county"
          type="text"
          class="mt-1 block w-full"
          v-model="tempCompanyProfile.county"
          placeholder="Type your County"
        />
        <!-- <InputError class="mt-2" :message="form.errors.address_2" /> -->
      </div>
    </div>
  </CustomDialog>
</template>
<script setup>
import IconButton from "@/Components/IconButton.vue";
import InfoWithIcon from "@/Components/ContractorPage/InfoWithIcon.vue";
import { stateList } from "@/helpers/selectListsHelpters.js";

import Card from "@/Components/Card.vue";
import SelectProfile from "@/Components/SelectProfile.vue";

import UserAvatar from "@/Pages/Profile/components/UserAvatar.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { reactive, ref, watchEffect } from "vue";
import {
  getAxiosConfigFormData,
  getAxiosConfig,
} from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";

// State
const props = defineProps({
  profile: Object,

  screenWidth: Number,
  mode: {
    type: String,
    default: "",
  },
});

const company_name = ref(props.profile.company_name);
const company_logo = ref(props.profile.company_logo);
const phone_cell = ref(props.profile.phone_cell);
const phone_office = ref(props.profile.phone_office);
const email = ref(props.profile.email);
const address_1 = ref(props.profile.address_1);
const address_2 = ref(props.profile.address_2);
const city = ref(props.profile.city);
const state = ref(props.profile.state);
const county = ref(props.profile.county);
const counrty = ref(props.profile.counrty);
const zipcode = ref(props.profile.zipcode);
const loading = ref(false);
const disabled = ref(false);
const tempCompanyProfile = reactive({
  company_name: company_name.value,
  company_logo: company_logo.value,
  phone_cell: phone_cell.value,
  phone_office: phone_office.value,
  email: email.value,
  address_1: address_1.value,
  address_2: address_2.value,
  city: city.value,
  state: state.value,
  county: county.value,
  country: counrty.value, // typo in your ref name, make sure to correct it
  zipcode: zipcode.value,
});
const errors = reactive({
  emailError: "",
  phoneCellError: "",
});

const dialogRef = ref();

//Watch
watchEffect(() => {
  if (tempCompanyProfile.email.trim()) {
    errors.emailError = "";
  }
  if (tempCompanyProfile.phone_cell.trim()) {
    errors.phoneCellError = "";
  }
});

//Methods

const openDialog = () => {
  dialogRef.value.openDialog();
};

const handleSubmit = async () => {
  if (!tempCompanyProfile.email.trim()) {
    errors.emailError = "Please enter your email address";
    return;
  }
  if (!tempCompanyProfile.phone_cell.trim()) {
    errors.phoneCellError = "Please enter your Phone number";
    return;
  }

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
      email.value = tempCompanyProfile.email;
      address_1.value = tempCompanyProfile.address_1;
      address_2.value = tempCompanyProfile.address_2;
      city.value = tempCompanyProfile.city;
      state.value = tempCompanyProfile.state;
      county.value = tempCompanyProfile.county;
      counrty.value = tempCompanyProfile.country; // again, there's a typo in your ref name
      zipcode.value = tempCompanyProfile.zipcode;

      dialogRef.value.closeDialog();
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
    disabled.value = false;
  }
};

// Upload User Avatar on image change
const handleImageUpdate = async (file) => {
  const formData = new FormData();
  formData.append("company_logo", file);

  // formData.append("user_id", user.id);
  axios
    .post("/api/contractor/company-logo", formData, getAxiosConfigFormData())
    .then((response) => {
      changesSaved("Avatar uploaded successfully");
      company_logo.value = response.data.company_logo; // Update the local state with
    })
    .catch((error) => {
      somethingWentWrong("Error uploading avatar");
      // Handle the error appropriately here
    });
};
</script>
@/helpers/selectListsHelpters.js
