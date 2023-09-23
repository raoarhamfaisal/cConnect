<script setup>
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm, usePage } from "@inertiajs/inertia-vue3";
import UserAvatar from "../components/UserAvatar.vue";
import InputError from "@/Components/InputError.vue";

const props = defineProps({
  profile: Object,
});

const form = useForm({
  company_logo: props.profile.company_logo,
  company_name: props.profile.company_name,
  phone_office: props.profile.phone_office,
});

// Upload Company Logo on image change
const handleImageUpdate = (file) => {
  const formData = new FormData();
  formData.append("company_logo", file);
  formData.append("user_id", props.profile.user_id);

  axios
    .post("/api/profile/company-logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": usePage().props.value.csrf_token,
      },
    })
    .then((response) => {
      changesSaved("Avatar uploaded successfully");
      form.company_logo = response.data.company_logo; // Update the local state with the new avatar path
    })
    .catch((error) => {
      somethingWentWrong("Error uploading avatar");
      // Handle the error appropriately here
    });
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <div>
        <h2 class="text-lg font-medium font-bold text-gray-900">
          Company Information
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          Update your Company General Information.
        </p>
      </div>
    </header>

    <form
      @submit.prevent="form.patch(route('profile.updateCompanyInfo'))"
      class="flex flex-col items-center"
    >
      <UserAvatar
        :imageSrc="form.company_logo"
        @update-image="handleImageUpdate"
      />
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
          <InputError class="mt-2" :message="form.errors.company_name" />
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
            placeholder="Type your office phone "
            autocomplete="tel"
          />

          <InputError class="mt-2" :message="form.errors.phone_office" />
        </div>
      </div>
      <div class="flex items-center mt-6 gap-4 w-full">
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
      </div>
    </form>
  </section>
</template>
