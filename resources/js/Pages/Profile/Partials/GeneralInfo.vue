<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Link, useForm, usePage } from "@inertiajs/inertia-vue3";
import UserAvatar from "../components/UserAvatar.vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";

import axios from "axios";

const props = defineProps({
  mustVerifyEmail: Boolean,
  status: String,
  profile: Object,
});

const user = usePage().props.value.auth.user;

const form = useForm({
  first_name: props.profile.first_name,
  last_name: props.profile.last_name,
  email: props.profile.email,
  phone_cell: props.profile.phone_cell,
  user_avatar: props.profile.user_avatar,
  file: props.profile.user_avatar,
});

// Upload User Avatar on image change
const handleImageUpdate = (file) => {
  const formData = new FormData();
  formData.append("user_avatar", file);
  formData.append("user_id", user.id);

  axios
    .post("/api/profile/user-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": usePage().props.value.csrf_token,
      },
    })
    .then((response) => {
      changesSaved("Avatar uploaded successfully");
      form.file = response.data.user_avatar; // Update the local state with the new avatar path
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
        <h2
          class="text-lg font-medium font-bold text-gray-900 dark:text-gray-100"
        >
          General Information
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your account's General Information.
        </p>
      </div>
    </header>

    <form
      @submit.prevent="form.patch(route('profile.updateGeneralInfo'))"
      class="flex flex-col items-center"
    >
      <UserAvatar :imageSrc="form.file" @update-image="handleImageUpdate" />
      <div
        class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
      >
        <div>
          <InputLabel class="font-bold" for="first_name" value="First Name" />
          <TextInput
            id="first_name"
            type="text"
            class="mt-1 block w-full"
            required
            v-model="form.first_name"
            placeholder="Type your first name"
            autocomplete="given-name"
          />
          <InputError class="mt-2" :message="form.errors.first_name" />
        </div>

        <div>
          <InputLabel class="font-bold" for="last_name" value="Last Name" />
          <TextInput
            id="last_name"
            type="text"
            class="mt-1 block w-full"
            v-model="form.last_name"
            required
            placeholder="Type your last name"
            autocomplete="family-name"
          />
          <InputError class="mt-2" :message="form.errors.last_name" />
        </div>
        <div>
          <InputLabel class="font-bold" for="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            class="mt-1 block w-full"
            v-model="form.email"
            required
            autocomplete="email"
          />
          <InputError class="mt-2" :message="form.errors.email" />
        </div>
        <div>
          <InputLabel class="font-bold" for="phone_cell" value="Phone Cell" />
          <TextInput
            id="phone_cell"
            type="tel"
            class="mt-1 block w-full"
            v-model="form.phone_cell"
            required
            placeholder="Type your phone number"
            autocomplete="phone_cell"
          />
          <InputError class="mt-2" :message="form.errors.phone_cell" />
        </div>

        <div v-if="props.mustVerifyEmail && user.email_verified_at === null">
          <p class="text-sm mt-2 text-gray-800 dark:text-gray-200">
            Your email address is unverified.
            <Link
              :href="route('verification.send')"
              method="post"
              as="button"
              class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Click here to re-send the verification email.
            </Link>
          </p>
          <div
            v-show="props.status === 'verification-link-sent'"
            class="mt-2 font-medium text-sm text-green-600 dark:text-green-400"
          >
            A new verification link has been sent to your email address.
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 mt-6 w-full">
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
