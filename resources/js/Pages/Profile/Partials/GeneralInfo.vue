<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Link, useForm, usePage } from "@inertiajs/inertia-vue3";
import UserAvatar from "../components/UserAvatar.vue";

const props = defineProps({
  mustVerifyEmail: Boolean,
  status: String,
});

const user = usePage().props.value.auth.user;

const form = useForm({
  first_name: null,
  last_name: null,
  email: user.email,
  phone_cell: null,
  phone_office: null,
  user_avatar: null,
  longitude: null,
  latitude: null,
  user_avatar: null,
});
const handleImageUpdate = (file) => {
  console.log("Received file from child:", file);
  // form.user_avatar = file;
  // Now you can use this file as needed, e.g., uploading it to a server
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <UserAvatar
        :imageSrc="form.user_avatar"
        @update-image="handleImageUpdate"
      />
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

    <form @submit.prevent="form.patch(route('profile.update'))">
      <!-- <div>
        <InputLabel for="name" value="Name" />
        <TextInput
          id="name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.name"
          required
          autofocus
          autocomplete="name"
        />
        <InputError class="mt-2" :message="form.errors.name" />
      </div> -->
      <div
        class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
      >
        <div>
          <InputLabel class="font-bold" for="first_name" value="First Name" />
          <TextInput
            id="first_name"
            type="text"
            class="mt-1 block w-full"
            v-model="form.first_name"
            required
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
            placeholder="Type your company name"
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

        <div>
          <InputLabel class="font-bold" for="longitude" value="Longitude" />
          <TextInput
            id="longitude"
            type="number"
            class="mt-1 block w-full"
            v-model="form.longitude"
            placeholder="Enter the longitude"
          />
        </div>

        <div>
          <InputLabel class="font-bold" for="latitude" value="Latitude" />
          <TextInput
            id="latitude"
            type="number"
            class="mt-1 block w-full"
            v-model="form.latitude"
            placeholder="Enter the latitude"
          />
        </div>
      </div>

      <div class="flex items-center gap-4 mt-6">
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
