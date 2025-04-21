<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, useForm } from "@inertiajs/inertia-vue3";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
defineProps({
  status: String,
});

const form = useForm({
  email: "",
});

const submit = () => {
  form.post(route("password.email"));
};
</script>

<template>
  <div
    :class="`pt-10 sm:pt-36 pb-2 sm:pb-20 flex sm:justify-center items-center   bg-gray-100 h-[75vh]`"
  >
    <div
      class="w-full sm:max-w-md mt-6 px-3 sm:px-6 py-4 bg-white shadow-md sm:rounded-lg"
    >
      <Head title="Forgot Password" />
      <WelcomeHeader :showit="false" :showSignUp="true" />
      <div>
        <div class="mb-4 text-sm text-gray-600">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
          {{ status }}
        </div>

        <form @submit.prevent="submit">
          <div>
            <InputLabel for="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              class="mt-1 block w-full"
              v-model="form.email"
              required
              autofocus
              autocomplete="username"
            />
            <InputError class="mt-2" :message="form.errors.email" />
          </div>

          <div class="flex items-center justify-end mt-4">
            <PrimaryButton
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
            >
              Email Password Reset Link
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </div>
  <WelcomeFooter :showit="false" />
</template>
