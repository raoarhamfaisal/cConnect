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
        v-if="mode === 'edit'"
        class="self-start flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
      >
        <Link class="rounded-full" :href="`/contractor/${profile.id}`">
          <button
            class="bg-white px-4 py-1 uppercase text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-2 sm:border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95"
          >
            See Live View
          </button>
        </Link>
        <IconButton
          class="self-end sm:self-center"
          @click="openDialog"
          icon="mdi:edit"
          color="#1864ab"
        />
      </div>
    </div>
  </Card>
  <CustomDialog
    v-if="mode === 'edit'"
    submitText="Save"
    @submit="handleSubmit"
    :loading="loading"
    :disabled="disabled"
    ref="dialogRef"
    title="Edit Your General Information"
  >
    <div class="flex justify-center">
      <UserAvatar
        :imageSrc="`/${user_avatar}`"
        @update-image="handleImageUpdate"
      />
    </div>
    <div
      class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <InputLabel class="font-bold" for="first_name" value="First Name" />
        <TextInput
          id="first_name"
          type="text"
          class="mt-1 block w-full"
          required
          v-model="tempProfile.first_name"
          placeholder="Type your first name"
          autocomplete="given-name"
        />
        <!-- <InputError class="mt-2" :message="form.errors.first_name" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="last_name" value="Last Name" />
        <TextInput
          id="last_name"
          type="text"
          class="mt-1 block w-full"
          v-model="tempProfile.last_name"
          required
          placeholder="Type your last name"
          autocomplete="family-name"
        />
        <!-- <InputError class="mt-2" :message="form.errors.last_name" /> -->
      </div>
      <div>
        <InputLabel class="font-bold" for="company_name" value="Company Name" />
        <TextInput
          id="company_name"
          type="text"
          class="mt-1 block w-full"
          placeholder="Type your Company name"
          v-model="tempProfile.company_name"
          required
          autocomplete="company_name"
        />
        <!-- <InputError class="mt-2" :message="form.errors.email" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="city" value="City" />
        <TextInput
          id="city"
          type="text"
          class="mt-1 block w-full"
          v-model="tempProfile.city"
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
          v-model="tempProfile.state"
          placeholder="Type your State"
          autocomplete="state"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
    </div>
  </CustomDialog>
</template>

<script setup>
import IconButton from "@/Components/IconButton.vue";
import UserAvatar from "@/Pages/Profile/components/UserAvatar.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import Card from "@/Components/Card.vue";

import Avatar from "@/Components/Ratings/Avatar.vue";

import { computed, reactive, ref } from "vue";
import { Link } from "@inertiajs/inertia-vue3";
import {
  getAxiosConfig,
  getAxiosConfigFormData,
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

const first_name = ref(props.profile.first_name);
const last_name = ref(props.profile.last_name);
const user_avatar = ref(props.profile.user_avatar);
const company_name = ref(props.profile.company_name);
const city = ref(props.profile.city);
const state = ref(props.profile.state);
const tempProfile = reactive({
  first_name: first_name.value,
  last_name: last_name.value,
  city: city.value,
  state: state.value,
  company_name: company_name.value,
});
const loading = ref(false);
const disabled = ref(false);

const dialogRef = ref();

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

const openDialog = () => {
  dialogRef.value.openDialog();
};

const handleSubmit = async () => {
  loading.value = true;
  disabled.value = true;
  try {
    const response = await axios.patch(
      `/api/contractor/general-profile`,
      tempProfile,
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(
        response.data.message || "Genral information successfully saved"
      );
      first_name.value = tempProfile.first_name;
      last_name.value = tempProfile.last_name;
      city.value = tempProfile.city;
      state.value = tempProfile.state;
      company_name.value = tempProfile.company_name;
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
  formData.append("user_avatar", file);

  // formData.append("user_id", user.id);
  axios
    .post("/api/contractor/user-avatar", formData, getAxiosConfigFormData())
    .then((response) => {
      changesSaved("Avatar uploaded successfully");
      user_avatar.value = response.data.user_avatar; // Update the local state with
    })
    .catch((error) => {
      somethingWentWrong("Error uploading avatar");
    });
};
</script>
