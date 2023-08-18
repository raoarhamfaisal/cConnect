<script setup>
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm, usePage } from "@inertiajs/inertia-vue3";
import UserAvatar from "../components/UserAvatar.vue";
import { ref } from "vue";

const props = defineProps({
  profile: Object,
});

const user = usePage().props.value.auth.user;

const form = useForm({
  company_logo: props.profile.company_logo,
  company_name: props.profile.company_name,
  // business_start: props.profile.business_start,
  business_start: null,
  phone_office: props.profile.phone_office
});
const handleImageUpdate = (file) => {
  console.log("Received file from child:", file);
  // form.company_logo = file;
  // Now you can use this file as needed, e.g., uploading it to a server
};

const selectedDate = ref(null);
const unixTimestamp = ref(null);

const updateTimestamp = () => {
  if (selectedDate.value) {
    unixTimestamp.value = new Date(selectedDate.value).getTime() / 1000;
    form.business_start = unixTimestamp.value;
  }
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <UserAvatar
        :imageSrc="form.company_logo"
        @update-image="handleImageUpdate"
      />
      <div>
        <h2
          class="text-lg font-medium font-bold text-gray-900 dark:text-gray-100"
        >
          Company Information
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your Company General Information.
        </p>
      </div>
    </header>

    <form @submit.prevent="form.patch(route('profile.updateCompanyInfo'))">
      <div
        class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
      >
        <div>
          <InputLabel
            class="font-bold"
            for="company_name"
            value="Company Name"
          />
          <TextInput
            id="company_name"
            type="text"
            class="mt-1 block w-full"
            v-model="form.company_name"
            required
            placeholder="Type your Company name"
            autocomplete="company-name"
          />
        </div>

        <div>
          <InputLabel
            class="font-bold"
            for="business_start"
            value="Business Start Date"
          />
          <input
            id="datePicker"
            type="date"
            v-model="selectedDate"
            class="rounded w-full mt-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full"
            @change="updateTimestamp"
          />
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
            v-model="form.phone_office"
            placeholder="Type your office phone number"
            autocomplete="tel"
          />
        </div>
      </div>
      <div class="flex items-center mt-6 gap-4">
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
          <p
            v-if="form.recentlySuccessful"
            class="text-sm text-gray-600 dark:text-gray-400"
          >
            Saved.
          </p>
        </Transition>
      </div>
    </form>
  </section>
</template>
