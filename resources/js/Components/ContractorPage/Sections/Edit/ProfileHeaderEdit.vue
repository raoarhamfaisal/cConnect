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
          <v-skeleton-loader
            v-if="loadingImage"
            style="border-radius: 9999px"
            class="overflow-hidden w-14 h-14 sm:h-20 sm:w-20"
            type="image"
          >
          </v-skeleton-loader>
          <Avatar v-if="!loadingImage" :imageSrc="`/${user_avatar}`" />
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
        class="self-start flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
      >
        <div>
          <StarRating
            v-if="averageRating"
            :rating="Number(averageRating.toFixed(1))"
            :isIndicatorActive="false"
          />
        </div>
        <div class="flex items-center justify-center gap-2">
          <IconButton
            class="self-end sm:self-center"
            @click="openDialog"
            icon="nimbus:edit"
            color="#1864ab"
          />
        </div>
      </div>
    </div>
  </Card>
  <CustomDialog
    :submitText="translations && translations.save"
    @submit="handleSubmit"
    :loading="loading"
    :disabled="disabled"
    ref="dialogRef"
    :title="translations && translations.edit_your_general_information"
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
        :cover="false"
        :imageSrc="`/${user_avatar}`"
        @update-image="handleImageUpdate"
      />
    </div>
    <div
      class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <InputLabel
          class="font-bold"
          for="first_name"
          :value="translations && translations.first_name + '*'"
        />
        <TextInput
          id="first_name"
          type="text"
          @input="clearError('first_name')"
          class="mt-1 block w-full"
          required
          v-model="tempProfile.first_name"
          :placeholder="translations && translations.type_your_first_name"
          autocomplete="given-name"
        />
        <InputError class="mt-2" :message="errors.first_name" />
      </div>

      <div>
        <InputLabel
          class="font-bold"
          for="last_name"
          :value="translations && translations.last_name + '*'"
        />
        <TextInput
          id="last_name"
          type="text"
          class="mt-1 block w-full"
          @input="clearError('last_name')"
          v-model="tempProfile.last_name"
          required
          :placeholder="translations && translations.type_your_last_name"
          autocomplete="family-name"
        />
        <InputError class="mt-2" :message="errors.last_name" />
      </div>
      <div>
        <InputLabel
          class="font-bold"
          for="company_name"
          :value="translations && translations.company_name + '*'"
        />
        <TextInput
          id="company_name"
          type="text"
          class="mt-1 block w-full"
          :placeholder="translations && translations.type_your_company_name"
          @input="clearError('company_name')"
          v-model="tempProfile.company_name"
          required
          autocomplete="company_name"
        />
        <InputError class="mt-2" :message="errors.company_name" />
      </div>

      <div>
        <InputLabel
          class="font-bold"
          for="city"
          :value="translations && translations.city + '*'"
        />
        <TextInput
          id="city"
          type="text"
          class="mt-1 block w-full"
          v-model="tempProfile.city"
          @input="clearError('city')"
          :placeholder="translations && translations.type_your_city"
          autocomplete="city"
        />
        <InputError class="mt-2" :message="errors.city" />
      </div>
      <div>
        <InputLabel class="font-bold mb-1" for="state" :value="'Province*'" />
        <SelectProfile
          :options="provincesList"
          :modelValue="tempProfile.state"
          @update:modelValue="
            (value) => {
              tempProfile.state = value;
              clearError('state');
            }
          "
        />
        <InputError class="mt-2" :message="errors.state" />
      </div>
    </div>
  </CustomDialog>
  <!-- <Loader
    :loading="loadingImage"
    background="transparent"
    height="100vh"
  ></Loader> -->
</template>

<script setup>
import Loader from "@/Components/Ratings/Loader.vue";
import IconButton from "@/Components/IconButton.vue";
import SelectProfile from "@/Components/SelectProfile.vue";

import UserAvatar from "@/Pages/Profile/components/UserAvatar.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";
import { provincesList } from "@/helpers/selectListsHelpters";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import Card from "@/Components/Card.vue";

import Avatar from "@/Components/Ratings/Avatar.vue";

import { computed, reactive, ref } from "vue";
import {
  getAxiosConfig,
  getAxiosConfigFormData,
} from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import { useStore } from "vuex";
// Province
const props = defineProps({
  profile: Object,
  screenWidth: Number,
  averageRating: {
    type: Number,
    default: 0,
  },
});

const first_name = ref(props.profile.first_name);
const last_name = ref(props.profile.last_name);
const user_avatar = ref(props.profile.user_avatar);
const company_name = ref(props.profile.company_name);
const loadingImage = ref(false);
const city = ref(props.profile.city);
const state = ref(props.profile.state);
const tempProfile = reactive({
  first_name: first_name.value ?? "",
  last_name: last_name.value ?? "",
  city: city.value ?? "",
  state: state.value ?? "",
  company_name: company_name.value ?? "",
});
const loading = ref(false);
const disabled = ref(false);

const dialogRef = ref();
const errors = reactive({
  first_name: "",
  last_name: "",
  company_name: "",

  city: "",
  state: "",
});
const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
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
const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }
  console.log(tempProfile, "form");
  // Validate first_name
  if (!tempProfile.first_name.trim()) {
    errors.first_name =
      translations.value && translations.value.first_name_is_required;
    isValid = false;
  }
  if (!tempProfile.last_name.trim()) {
    errors.last_name =
      translations.value && translations.value.last_name_is_required;
    isValid = false;
  }
  // Validate company_name
  if (!tempProfile.company_name.trim()) {
    errors.company_name = "Company name is required";
    isValid = false;
  }

  // Validate city
  if (!tempProfile.city.trim()) {
    errors.city = translations.value && translations.value.city_is_required;
    isValid = false;
  }

  // Validate state
  if (!tempProfile.state.trim()) {
    errors.state = translations.value && translations.value.state_is_required;
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
  }
};

// Upload User Avatar on image change
const handleImageUpdate = async (file) => {
  loadingImage.value = true;
  const formData = new FormData();
  formData.append("user_avatar", file);

  // formData.append("user_id", user.id);
  axios
    .post("/api/contractor/user-avatar", formData, getAxiosConfigFormData())
    .then((response) => {
      user_avatar.value = response.data.user_avatar; // Update the local state with
      // changesSaved("Avatar uploaded successfully");
      loadingImage.value = false;
    })
    .catch((error) => {
      somethingWentWrong("Error uploading avatar");
      loadingImage.value = false;
    });
};
const clearError = (field) => {
  if (tempProfile[field].trim()) {
    errors[field] = "";
  }
};
</script>
