<script setup>
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { usePage } from "@inertiajs/inertia-vue3";
import UserAvatar from "../components/UserAvatar.vue";
import SelectProfile from "@/Components/SelectProfile.vue";
import { stateList } from "@/helpers/selectListsHelpters.js";

import InputError from "@/Components/InputError.vue";
import { watch, ref } from "vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";

const props = defineProps({
  company_logo: [String, Object],
  region_id: [String, Number],
  form: Object,
  errors: Object,
  regions: Array,
});
const user = usePage().props.value.auth.user;

const company_logo = ref(props.company_logo);
const referenceList = props.regions.map((item) => item.name);
const selectedObj = props.regions.find((item) => item.id === props.region_id);
const selectedName = selectedObj ? selectedObj.name : undefined;

const selectedReferal = ref(selectedName ?? "");

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

// Upload Company Logo on image change
const handleImageUpdate = (file) => {
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
      changesSaved("Company Logo uploaded successfully");
      company_logo.value = response.data.company_logo; // Update the local state with the new avatar path
    })
    .catch((error) => {
      somethingWentWrong("Error uploading avatar");
      // Handle the error appropriately here
    });
};

const clearError = (field) => {
  emit("clearErrors", field);
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <div>
        <h2 class="text-lg font-medium font-bold text-gray-900">
          Company & Address Information
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          Provide your Company General Information and your address info.
        </p>
      </div>
    </header>

    <form
      @submit.prevent="form.patch(route('profile.updateCompanyInfo'))"
      class="flex flex-col items-center"
    >
      <UserAvatar :imageSrc="company_logo" @update-image="handleImageUpdate" />
      <div
        class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
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
            v-model="form.company_name"
            @input="clearError('company_name')"
            required
            placeholder="Type your Company name"
            autocomplete="company-name"
          />
          <InputError class="mt-2" :message="errors.company_name" />
        </div>

        <div>
          <InputLabel
            class="font-bold"
            for="phone_office"
            value="Phone Office"
          />
          <TextInput
            id="phone_office"
            type="tel"
            class="mt-1 block w-full"
            @input="clearError('phone_office')"
            v-model="form.phone_office"
            placeholder="Type your office phone "
            autocomplete="tel"
          />

          <InputError class="mt-2" :message="errors.phone_office" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold" for="address_1" value="Address 1*" />
          <TextInput
            id="address_1"
            type="text"
            class="mt-1 block w-full"
            v-model="form.address_1"
            @input="clearError('address_1')"
            placeholder="Type your address 1"
          />
          <InputError class="mt-2" :message="errors.address_1" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold" for="address_2" value="Address 2" />
          <TextInput
            id="address_2"
            type="text"
            class="mt-1 block w-full"
            v-model="form.address_2"
            placeholder="Type your address 2"
          />
        </div>
        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold" for="city" value="City*" />
          <TextInput
            id="city"
            type="text"
            class="mt-1 block w-full"
            v-model="form.city"
            @input="clearError('city')"
            placeholder="Type your city"
          />
          <InputError class="mt-2" :message="errors.city" />
        </div>
        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold mb-1" value="State*" />
          <SelectProfile
            :options="stateList"
            :modelValue="form.state"
            @update:modelValue="
              (value) => {
                form.state = value;
                clearError('state');
              }
            "
          />
          <InputError class="mt-2" :message="errors.state" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold" for="zipcode" value="Zip Code*" />
          <TextInput
            id="zipcode"
            type="text"
            class="mt-1 block w-full"
            v-model="form.zipcode"
            @input="clearError('zipcode')"
            placeholder="Type your zip code"
          />
          <InputError class="mt-2" :message="errors.zipcode" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold" for="county" value="County*" />
          <TextInput
            id="county"
            type="text"
            class="mt-1 block w-full"
            v-model="form.county"
            @input="clearError('county')"
            placeholder="Type your county"
          />
          <InputError class="mt-2" :message="errors.county" />
        </div>

        <div class="mb-4 sm:mb-0">
          <InputLabel class="font-bold mb-1" value="Region*" />
          <SelectProfile
            :options="referenceList"
            :modelValue="selectedReferal"
            @update:modelValue="changeReferal"
          />
          <InputError class="mt-2" :message="errors.region_id" />
        </div>
      </div>
      <!-- <div class="flex items-center w-full mt-6 gap-4">
        <PrimaryButton
          :disabled="form.processing"
          class="w-full flex justify-center"
          >Save</PrimaryButton
        >
        <Transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          class="transition ease-in-out"
        >
          <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">
            Saved.
          </p>
        </Transition>
      </div> -->
    </form>
  </section>
</template>
