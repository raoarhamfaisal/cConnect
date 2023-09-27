<script setup>
import { computed } from "vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";

const props = defineProps({
  status: String,
  showit: Boolean,
});

const form = useForm();

const submit = () => {
  form.post(route("verification.send"));
};

const verificationLinkSent = computed(
  () => props.status === "verification-link-sent"
);
</script>

<template>
  <GuestLayout verifyEmailPage>
    <Head title="Email Verification" />
    <WelcomeHeader :showit="showit" :showSignUp="false" />

    <div class="mb-4 text-sm text-gray-600">
      Thanks for signing up! Before getting started, could you verify your email
      address by clicking on the link we just emailed to you? If you didn't
      receive the email, we will gladly send you another.
    </div>

    <div
      class="mb-4 font-medium text-sm text-green-600"
      v-if="verificationLinkSent"
    >
      A new verification link has been sent to the email address you provided
      during registration.
    </div>

    <form @submit.prevent="submit">
      <div class="mt-4 flex items-center justify-between">
        <PrimaryButton
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          style="
            background-image: linear-gradient(
              111.4deg,
              rgba(7, 7, 9, 1) 6.5%,
              rgba(27, 24, 113, 1) 93.2%
            );
          "
          customClass="text-xs sx:text-sm sm:text-base"
        >
          <div class="flex items-center justify-center">
            Resend Verification Email
          </div>
          <img
            v-show="form.processing"
            src="/images/avatars/Spinner.gif"
            alt="spinner"
            width="30"
          />
        </PrimaryButton>

        <Link
          :href="route('logout')"
          method="post"
          as="button"
          class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >Log Out</Link
        >
      </div>
    </form>
  </GuestLayout>
  <WelcomeFooter :showit="showit" />
</template>
