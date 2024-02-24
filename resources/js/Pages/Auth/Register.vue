<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { computed, reactive, ref } from "vue";

const form = useForm({
  name: "",
  email: "",
  company_name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = reactive({
  first_name: "",
  last_name: "",
  company_name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
defineProps({
  showit: Boolean,
});

//Methods
const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }

  // Validate first_name
  if (!form.name.trim()) {
    errors.first_name = "First name is required";
    isValid = false;
  }
  if (!form.last_name.trim()) {
    errors.last_name = "Last name is required";
    isValid = false;
  }

  // Validate company_name
  if (!form.company_name.trim()) {
    errors.company_name = "Company name is required";
    isValid = false;
  }
  // Add validations for other fields similarly, for example:
  if (!form.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email) ||
    !form.email.includes(".")
  ) {
    errors.email = "Invalid email format";
    isValid = false;
  }

  if (!form.password.trim()) {
    errors.password = "Password is required";
    isValid = false;
  }

  if (form.password.trim() !== form.password_confirmation.trim()) {
    errors.password_confirmation = "Passwords don't match";
    isValid = false;
  }

  return isValid;
};

const submit = () => {
  if (validateForm()) {
    console.log(form);
    form.post(route("signup"), {
      onFinish: () => form.reset("password", "password_confirmation"),
    });
  }
};
</script>

<template>
  <SignUpLayout>
    <Head title="Register" />
    <WelcomeHeader :showit="showit" :showSignUp="false" />
    <div class="text-3xl font-bold mb-6">Create Your Account</div>
    <form @submit.prevent="submit">
      <div>
        <InputLabel for="name" value="First Name" />
        <TextInput
          id="name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.name"
          required
          autofocus
          autocomplete="name"
        />
        <InputError class="mt-2" :message="errors.first_name" />
      </div>
      <div class="mt-4">
        <InputLabel for="last_name" value="Last Name" />
        <TextInput
          id="last_name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.last_name"
          required
          autocomplete="name"
        />
        <InputError class="mt-2" :message="errors.last_name" />
      </div>
      <div class="mt-4">
        <InputLabel for="last_name" value="Company Name" />
        <TextInput
          id="last_name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.company_name"
          required
          autocomplete="name"
        />
        <InputError class="mt-2" :message="errors.company_name" />
      </div>

      <div class="mt-4">
        <InputLabel for="email" value="Email" />
        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autocomplete="username"
        />
        <InputError class="mt-2" :message="errors.email" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />
        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="new-password"
        />
        <InputError class="mt-2" :message="errors.password" />
      </div>

      <div class="mt-4">
        <InputLabel for="password_confirmation" value="Confirm Password" />
        <TextInput
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          required
          autocomplete="new-password"
        />
        <InputError class="mt-2" :message="errors.password_confirmation" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Link
          :href="route('login')"
          class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Already a user?
        </Link>

        <PrimaryButton
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          style="
            background-image: linear-gradient(
              111.4deg,
              rgba(7, 7, 9, 1) 6.5%,
              rgba(27, 24, 113, 1) 93.2%
            );
          "
        >
          <div class="flex items-center justify-center">Signup</div>
          <img
            v-show="form.processing"
            src="/images/avatars/Spinner.gif"
            alt="spinner"
            width="30"
          />
        </PrimaryButton>
      </div>
    </form>
  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>
