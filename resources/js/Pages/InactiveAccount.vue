<template>
  <SignUpLayout>
    <Head title="Account Inactive" />
    <WelcomeHeader :showNewsFeed="false" :showit="showit" :showSignUp="false" />
    <!-- Back to Main Page Link -->
    <div class="mb-3 sm:mb-6">
      <Link href="/" class="text-blue-500 hover:underline"
        >← Back to Main Page</Link
      >
    </div>
    <!-- Condition for Billing Issue -->

    <div v-if="profile.active_user === 1 && profile.is_payment_verified === 0">
      <div class="text-3xl font-bold mb-6">Account Inactive</div>
      <p class="mb-4">
        We noticed your account is inactive due to profile-setup issues.
      </p>
      <p class="mb-4">
        To regain access, please update your profile setup & billing
        information. If you feel this is incorrect or need further assistance,
        please contact our support team at
        <a
          href="mailto:support@tcontractor.com"
          class="text-blue-500 hover:underline"
          >support@tcontractor.com</a
        >.
      </p>
      <div class="flex gap-2 mt-3">
        <Link
          href="/profile-setup"
          :style="{
            backgroundImage:
              'linear-gradient( 111.4deg,rgba(7, 7, 9, 1) 6.5%, rgba(27, 24, 113, 1) 93.2% )',
          }"
          class="block w-full sm:w-40 flex items-center justify-center text-white font-semibold text-xl py-2 px-4 rounded transition transform duration-300 hover:shadow-lg active:scale-95 cursor-pointer"
        >
          Profile Setup
        </Link>
        <button
          @click="handleLogout"
          class="border-2 border-blue-rgba w-full sm:w-40 flex justify-center items-center text-blue-rgba font-bold text-xl py-2 px-4 uppercase rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Condition for Admin Suspension -->
    <div
      v-else-if="profile.active_user === 0 && profile.is_payment_verified === 1"
    >
      <div class="text-3xl font-bold mb-6">Account Inactive</div>
      <p class="mb-4">
        Your account has been deactivated. To regain access or for more
        information, please contact our support team at
        <a
          href="mailto:support@tcontractor.com"
          class="text-blue-500 hover:underline"
          >support@tcontractor.com</a
        >.
      </p>
      <button
        @click="handleLogout"
        class="border-2 border-blue-rgba w-full sm:w-40 flex justify-center items-center text-blue-rgba font-bold text-xl py-2 px-4 uppercase rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95"
      >
        Close
      </button>
    </div>

    <!-- Condition for Unknown Reason -->
    <div v-else>
      <div class="text-3xl font-bold mb-6">Account Inactive</div>
      <p class="mb-4">
        It appears you have not completed the registration process, please
        select “Continue” to finish registration.
      </p>
      <p class="mb-4">
        If you have any questions, please contact our support team at
        <a
          href="mailto:support@tcontractor.com"
          class="text-blue-500 hover:underline"
          >support@tcontractor.com</a
        >.
      </p>
      <div class="flex gap-2 mt-3">
        <Link
          href="/profile-setup"
          class="block w-full sm:w-40 flex items-center justify-center text-white font-semibold text-xl py-2 px-4 rounded transition transform duration-300 hover:shadow-lg active:scale-95 cursor-pointer bg-[#16a34a]"
        >
          Contiue
        </Link>
        <button
          @click="handleLogout"
          class="border-2 border-teal-green w-full sm:w-40 flex justify-center items-center text-teal-green font-bold text-xl py-2 px-4 uppercase rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>

<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
import { Head, Link } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";
import { removeToken } from "@/helpers/localStorageHelper";

const props = defineProps({
  showit: Boolean,
  profile: Object,
});

const logoutUser = () => {
  // Implement logout functionality
  // Example: Inertia.post('/logout');
};

const continueSignup = () => {
  // Implement navigation to the signup process
  // Example: Inertia.visit('/signup');
};
function handleLogout() {
  removeToken();

  Inertia.post("/logout");
}
</script>
