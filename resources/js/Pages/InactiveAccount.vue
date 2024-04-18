<template>
  <SignUpLayout>
    <Head title="Account Inactive" />
    <WelcomeHeader :showNewsFeed="false" :showit="showit" :showSignUp="false" />
    <div class="mb-3 sm:mb-6">
      <Link href="/" class="text-blue-500 hover:underline"
        >← Back to Main Page</Link
      >
    </div>
    <div class="text-3xl font-bold mb-6">Account Inactive</div>
    <p class="mb-4">
      We noticed your account is currently inactive. This might be due to
      various reasons such as incomplete registration, pending verifications, or
      other account issues.
    </p>
    <p class="mb-4">
      To regain access to your account and its features, please contact our
      support team or follow the necessary steps to reactivate your account.
    </p>
    <p class="mb-4">
      You can reach out to us at
      <a href="mailto:support@tcontractor.com" class="text-blue-rgba font-bold"
        >support@tcontractor.com</a
      >
      for further assistance.
    </p>
  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>
  
  <script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";

import { Head, Link } from "@inertiajs/inertia-vue3";

const props = defineProps({
  showit: Boolean,
});
</script>
  


