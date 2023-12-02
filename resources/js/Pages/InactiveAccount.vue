<template>
  <SignUpLayout>
    <Head title="Account Inactive" />
    <WelcomeHeader :showNewsFeed="false" :showit="showit" :showSignUp="false" />

    <!-- Condition for Billing Issue -->
    <div v-if="profile.active_user === 1 && profile.is_payment_verified === 0">
      <div class="text-3xl font-bold mb-6">Account Inactive</div>
      <p class="mb-4">
        We noticed your account is inactive due to billing issues.
      </p>
      <p class="mb-4">
        To regain access, please update your billing information. If you feel this is incorrect or need further assistance, please contact our support team at <a href="mailto:support@tcontractor.com" class="text-blue-500 hover:underline">support@tcontractor.com</a>.
      </p>
      <button @click="goToBilling">Billing</button>
      <button @click="logoutUser">Cancel</button>
    </div>

    <!-- Condition for Admin Suspension -->
    <div v-else-if="profile.active_user === 0 && profile.is_deactivated_by_admin === 1">
      <div class="text-3xl font-bold mb-6">Account Inactive</div>
      <p class="mb-4">
        Your account has been deactivated. To regain access or for more information, please contact our support team at <a href="mailto:support@tcontractor.com" class="text-blue-500 hover:underline">support@tcontractor.com</a>.
      </p>
      <button @click="logoutUser">Close</button>
    </div>

    <!-- Condition for Unknown Reason -->
    <div v-else-if="profile.active_user === 0">
      <div class="text-3xl font-bold mb-6">Account Inactive</div>
      <p class="mb-4">
        It appears you have not completed the registration process, please select “Continue” to finish registration.
      </p>
      <p class="mb-4">
        If you have any questions, please contact our support team at <a href="mailto:support@tcontractor.com" class="text-blue-500 hover:underline">support@tcontractor.com</a>.
      </p>
      <button @click="continueSignup">Continue</button>
      <button @click="logoutUser">Close</button>
    </div>

    <!-- Back to Main Page Link -->
    <div class="mb-3 sm:mb-6">
      <Link href="/" class="text-blue-500 hover:underline">← Back to Main Page</Link>
    </div>
  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>

<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
import { Head, Link, Inertia } from "@inertiajs/inertia-vue3";

const props = defineProps({
  showit: Boolean,
  profile: Object,
});

const goToBilling = () => {
  // Implement navigation to the billing section
  // Example: Inertia.visit('/billing');
};

const logoutUser = () => {
  // Implement logout functionality
  // Example: Inertia.post('/logout');
};

const continueSignup = () => {
  // Implement navigation to the signup process
  // Example: Inertia.visit('/signup');
};
</script>
