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
        :heading="`Additional Info`"
      />
      <IconButton
        v-if="mode === 'edit'"
        @click="openDialog"
        icon="mdi:edit"
        color="#1864ab"
      />
    </div>

    <div class="flex space-x-2 justify-between">
      <div class="flex justify-center items-center space-x-2">
        <div>
          <Avatar
            :imageSrc="`/${
              profile.company_logo ? profile.company_logo : profile.user_avatar
            }`"
          />
        </div>
        <div class="flex flex-col justify-center">
          <h2
            class="text-md xs:text-xl font-medium font-bold text-gray-900"
            v-if="profile.company_name"
          >
            {{ profile.company_name }}
          </h2>
          <span
            class="text-xs xs:text-lg"
            v-if="profile.city || profile.state"
            >{{ profile.city + " " + profile.state }}</span
          >
        </div>
      </div>
    </div>
    <div
      class="flex flex-col sm:flex-row flex-wrap gap-y-2 mt-2 sm:mt-4 ml-1 mb-1 sm:mb-0 sm:ml-0"
    >
      <InfoWithIcon
        icon="ic:baseline-phone"
        tooltipText="Phone Cell"
        :text="profile.phone_cell"
      />
      <InfoWithIcon
        icon="wpf:phone-office"
        tooltipText="Phone Office"
        :text="profile.phone_office"
      />
      <InfoWithIcon
        icon="clarity:email-solid"
        tooltipText="Email"
        :text="profile.email"
      />
      <InfoWithIcon
        icon="entypo:address"
        tooltipText="Address 1"
        :text="profile.address_1"
      />
      <InfoWithIcon
        icon="entypo:address"
        tooltipText="Address 2"
        :text="profile.address_2"
      />
      <InfoWithIcon icon="mdi:city" tooltipText="City" :text="profile.city" />
      <InfoWithIcon
        icon="entypo:location"
        tooltipText="State"
        :text="profile.state"
      />
      <InfoWithIcon
        icon="tabler:location-filled"
        tooltipText="County"
        :text="profile.county"
      />
      <InfoWithIcon
        icon="material-symbols:flag"
        tooltipText="Country"
        :text="profile.counrty"
      />
      <InfoWithIcon
        icon="map:post-box"
        tooltipText="Zip Code"
        :text="profile.zipcode"
      />
    </div>
  </Card>
  <CustomDialog
    v-if="mode === 'edit'"
    submitText="Save"
    @submit="handleSubmit"
    ref="dialogRef"
    title="Edit Your Additional Information"
  >
    <div class="flex justify-center">
      <UserAvatar
        :imageSrc="
          profile.company_logo ? profile.company_logo : profile.user_avatar
        "
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
          v-model="company_name"
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
          v-model="phone_cell"
          placeholder="Type your phone cell"
          autocomplete="tel"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
      <div>
        <InputLabel class="font-bold" for="phone_office" value="Phone Office" />
        <TextInput
          id="phone_office"
          type="tel"
          class="mt-1 block w-full"
          v-model="phone_office"
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
          v-model="email"
          placeholder="Type your email"
          autocomplete="email"
        />
        <!-- <InputError class="mt-2" :message="form.errors.email" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="address_1" value="Address 1" />
        <TextInput
          id="address_1"
          type="text"
          class="mt-1 block w-full"
          v-model="address_1"
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
          v-model="address_2"
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
          v-model="city"
          placeholder="Type your city"
          autocomplete="city"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
      <div>
        <InputLabel class="font-bold" for="state" value="State" />
        <TextInput
          id="state"
          type="text"
          class="mt-1 block w-full"
          v-model="state"
          placeholder="Type your State"
          autocomplete="state"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
      <div>
        <InputLabel class="font-bold" for="county" value="County" />
        <TextInput
          id="county"
          type="text"
          class="mt-1 block w-full"
          v-model="county"
          placeholder="Type your County"
        />
        <!-- <InputError class="mt-2" :message="form.errors.address_2" /> -->
      </div>
      <div>
        <InputLabel class="font-bold" for="counrty" value="Country" />
        <TextInput
          id="counrty"
          type="text"
          class="mt-1 block w-full"
          v-model="counrty"
          placeholder="Type your Country"
        />
        <!-- <InputError class="mt-2" :message="form.errors.address_2" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="zipcode" value="Zip Code" />
        <TextInput
          id="zipcode"
          type="text"
          class="mt-1 block w-full"
          v-model="zipcode"
          placeholder="Type your Zip Code"
        />
        <!-- <InputError class="mt-2" :message="form.errors.zipcode" /> -->
      </div>
    </div>
  </CustomDialog>
</template>
<script setup>
import IconButton from "@/Components/IconButton.vue";
import InfoWithIcon from "@/Components/ContractorPage/InfoWithIcon.vue";

import Card from "@/Components/Card.vue";
import UserAvatar from "@/Pages/Profile/components/UserAvatar.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { ref } from "vue";

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

const dialogRef = ref();

//Methods

const openDialog = () => {
  dialogRef.value.openDialog();
};

const handleSubmit = () => {};

// Upload User Avatar on image change
const handleImageUpdate = (file) => {
  // const formData = new FormData();
  // formData.append("user_avatar", file);
  // formData.append("user_id", user.id);
  // axios
  //   .post("/api/profile/user-avatar", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       "X-CSRF-TOKEN": usePage().props.value.csrf_token,
  //     },
  //   })
  //   .then((response) => {
  //     changesSaved("Avatar uploaded successfully");
  //     form.file = response.data.user_avatar; // Update the local state with the new avatar path
  //     Inertia.visit(route("profile.edit"), { only: ["profile"] });
  //   })
  //   .catch((error) => {
  //     somethingWentWrong("Error uploading avatar");
  //     // Handle the error appropriately here
  //   });
};
</script>
