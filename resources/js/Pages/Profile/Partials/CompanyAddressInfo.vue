<script setup>
import InputLabel from "@/Components/InputLabel.vue";
import SelectProfile from "@/Components/SelectProfile.vue";
import InputError from "@/Components/InputError.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { usePage } from "@inertiajs/inertia-vue3";
import UserAvatar from "../components/UserAvatar.vue";
import { stateList } from "@/helpers/selectListsHelpters.js";

import { watch, ref, onMounted, onBeforeUnmount, computed } from "vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import GoogleAddressAutocomplete from "@/Components/GoogleAddressAutoComplete.vue";
import { useStore } from "vuex";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const props = defineProps({
  company_logo: [String, Object],
  region_id: [String, Number],
  form: Object,
  errors: Object,
  regions: Array,
});
const user = usePage().props.value.auth.user;
const loadingImage = ref(false);
const loadingScript = ref(true);

const company_logo = ref(props.company_logo);
const referenceList = props.regions.map((item) => item.name);
const selectedObj = props.regions.find((item) => item.id == props.region_id);
const selectedName = selectedObj ? selectedObj.name : undefined;

const selectedReferal = ref(selectedName ?? "");
const companyLogoError = ref("");
const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
//Emits
const emit = defineEmits(["update:form", "clearErrors"]);

//Watch
watch(
  props.form,
  (newForm) => {
    emit("update:form", newForm);
  },
  { deep: true }
);

//Methods
const changeReferal = (value) => {
  selectedReferal.value = value;
  props.regions.forEach((item) => {
    if (value === item.name) {
      props.form.region_id = item.id.toString();
    }
  });
  clearError("region_id");
};

const callbackFunction = (place) => {
  console.log(place, "place");
  for (const component of place.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    if (componentType == "locality") {
      props.form.city = component.long_name;
    }
    if (componentType == "administrative_area_level_2") {
      props.form.county = component.long_name;
    }
    if (componentType == "administrative_area_level_1") {
      props.form.state = component.long_name;
    }
    if (componentType == "postal_code") {
      props.form.zipcode = component.long_name;
    }
  }
};

// Upload Company Logo on image change
const handleImageUpdate = (file) => {
  loadingImage.value = true;

  const formData = new FormData();
  formData.append("company_logo", file);
  formData.append("user_id", user.id);

  axios
    .post("/api/profile/company-logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": usePage().props.value.csrf_token,
      },
    })
    .then((response) => {
      loadingImage.value = false;
      companyLogoError.value = "";

      company_logo.value = response.data.company_logo; // Update the local state with the new avatar path
    })
    .catch((error) => {
      companyLogoError.value = error.response.data.message;

      loadingImage.value = false;

      // Handle the error appropriately here
    });
};

const clearError = (field) => {
  emit("clearErrors", field);
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
onMounted(async () => {
  try {
    loadingScript.value = true;
    await loadGoogleMapsScript();
    loadingScript.value = false;
  } catch (error) {
    console.error("Failed to load Google Maps API", error);
  }
});
onBeforeUnmount(() => {
  delete window.initMap;
});
</script>

<template>
  <section v-if="!loadingScript">
    <header class="flex space-x-2">
      <div>
        <h2 class="text-lg font-medium font-bold text-gray-900">
          {{ translations && translations.company_address_information }}
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          {{
            translations &&
            translations.provide_your_company_general_information_and_your_address_info
          }}
        </p>
      </div>
    </header>

    <form
      @submit.prevent="form.patch(route('profile.updateCompanyInfo'))"
      class="flex flex-col items-center"
    >
      <v-skeleton-loader
        v-if="loadingImage"
        style="border-radius: 0.375rem"
        class="overflow-hidden w-48 h-24"
        type="image"
      >
      </v-skeleton-loader>
      <UserAvatar
        v-if="!loadingImage"
        :cover="false"
        :rounded="false"
        :imageSrc="company_logo"
        @update-image="handleImageUpdate"
      />
      <InputError class="mt-2" :message="companyLogoError" />

      <div
        class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
      >
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
            v-model="form.company_name"
            @input="clearError('company_name')"
            required
            :placeholder="translations && translations.type_your_company_name"
            autocomplete="company-name"
          />
          <InputError class="mt-2" :message="errors.company_name" />
        </div>

        <div>
          <InputLabel
            class="font-bold"
            for="phone_office"
            :value="translations && translations.phone_office"
          />
          <TextInput
            id="phone_office"
            type="tel"
            class="mt-1 block w-full"
            @input="clearError('phone_office')"
            v-model="form.phone_office"
            v-mask="'###-###-#####'"
            :placeholder="translations && translations.type_your_phone_office"
            autocomplete="tel"
          />

          <InputError class="mt-2" :message="errors.phone_office" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold" for="address_1" value="Address 1*" />
          <GoogleAddressAutocomplete
            id="address_1"
            v-model="form.address_1"
            @input="clearError('address_1')"
            @callback="callbackFunction"
            class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            :placeholder="translations && translations.type_your_address + 1"
          />

          <InputError class="mt-2" :message="errors.address_1" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold" for="address_2" value="Address 2" />
          <GoogleAddressAutocomplete
            id="address_2"
            v-model="form.address_2"
            class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            :placeholder="translations && translations.type_your_address + 2"
          />
        </div>
        <div class="mb-4 sm:mb-0">
          <InputLabel
            class="font-bold"
            for="city"
            :value="translations && translations.city + '*'"
          />
          <TextInput
            id="city"
            type="text"
            class="mt-1 block w-full"
            v-model="form.city"
            @input="clearError('city')"
            :placeholder="translations && translations.type_your_city"
          />
          <InputError class="mt-2" :message="errors.city" />
        </div>
        <div class="mb-4 sm:mb-0">
          <InputLabel
            for="state"
            class="font-bold mb-1"
            :value="translations && translations.state + '*'"
          />
          <TextInput
            id="state"
            type="text"
            class="mt-1 block w-full"
            v-model="form.state"
            @input="clearError('state')"
            :placeholder="translations && translations.type_your_state"
          />
          <!-- <SelectProfile
            :options="stateList"
            :modelValue="form.state"
            @update:modelValue="
              (value) => {
                form.state = value;
                clearError('state');
              }
            "
          /> -->
          <InputError class="mt-2" :message="errors.state" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel
            class="font-bold"
            for="zipcode"
            :value="translations && translations.zip_code + '*'"
          />
          <TextInput
            id="zipcode"
            type="text"
            class="mt-1 block w-full"
            v-model="form.zipcode"
            @input="clearError('zipcode')"
            :placeholder="translations && translations.type_your_zip_code"
          />
          <InputError class="mt-2" :message="errors.zipcode" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel
            class="font-bold"
            for="county"
            :value="translations && translations.county + '*'"
          />
          <TextInput
            id="county"
            type="text"
            class="mt-1 block w-full"
            v-model="form.county"
            @input="clearError('county')"
            :placeholder="translations && translations.type_your_county"
          />
          <InputError class="mt-2" :message="errors.county" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel
            class="font-bold mb-1"
            :value="translations && translations.region + '*'"
          />
          <SelectProfile
            :options="referenceList"
            :modelValue="selectedReferal"
            @update:modelValue="changeReferal"
          />
          <InputError class="mt-2" :message="errors.region_id" />
        </div>
      </div>
    </form>
  </section>
</template>
