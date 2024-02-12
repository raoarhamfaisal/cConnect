<template>
  <SignUpLayout>
    <Head :title="translations && translations.account_inactive" />
    <WelcomeHeader :showNewsFeed="false" :showit="showit" :showSignUp="false" />
    <!-- Back to Main Page Link -->
    <div class="mb-3 sm:mb-6">
      <Link href="/" class="text-blue-500 hover:underline"
        >← {{ translations && translations.back_to_main_page }}</Link
      >
    </div>
    <!-- Condition for Billing Issue -->

    <div v-if="profile.active_user === 1 && profile.is_payment_verified === 0">
      <div class="text-3xl font-bold mb-6">
        {{ translations && translations.account_inactive }}
      </div>
      <p class="mb-4">
        {{
          translations &&
          translations.we_noticed_your_account_is_inactive_due_to_billing_issues
        }}.
      </p>
      <p class="mb-4">
        {{
          translations &&
          translations.to_regain_access_please_update_your_billing_information
        }}
        <a
          href="mailto:support@tcontractor.com"
          class="text-blue-500 hover:underline"
          >support@tcontractor.com</a
        >.
      </p>
      <div class="flex gap-2 mt-3">
        <Link
          href="/pricing-plan"
          :style="{
            backgroundImage:
              'linear-gradient( 111.4deg,rgba(7, 7, 9, 1) 6.5%, rgba(27, 24, 113, 1) 93.2% )',
          }"
          class="block w-full sm:w-40 flex items-center justify-center text-white font-semibold text-xl py-2 px-4 rounded transition transform duration-300 hover:shadow-lg active:scale-95 cursor-pointer"
        >
          {{ translations && translations.billing }}
        </Link>
        <button
          @click="handleLogout"
          class="border-2 border-blue-rgba w-full sm:w-40 flex justify-center items-center text-blue-rgba font-bold text-xl py-2 px-4 uppercase rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95"
        >
          {{ translations && translations.close }}
        </button>
      </div>
    </div>

    <!-- Condition for Admin Suspension -->
    <div
      v-else-if="profile.active_user === 0 && profile.is_payment_verified === 1"
    >
      <div class="text-3xl font-bold mb-6">
        {{ translations && translations.your_account_has_been_deactivated }}
      </div>
      <p class="mb-4">
        {{ translations && translations.close }}
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
        {{ translations && translations.close }}
      </button>
    </div>

    <!-- Condition for Unknown Reason -->
    <div v-else>
      <div class="text-3xl font-bold mb-6">
        {{
          translations &&
          translations.it_appears_you_have_not_completed_the_registration_process
        }}
      </div>

      <p class="mb-4">
        {{
          translations &&
          translations.if_you_have_any_questions_please_contact_our_support_team
        }}
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
          {{ translations && translations.continue }}
        </Link>
        <button
          @click="handleLogout"
          class="border-2 border-teal-green w-full sm:w-40 flex justify-center items-center text-teal-green font-bold text-xl py-2 px-4 uppercase rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95"
        >
          {{ translations && translations.close }}
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
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  showit: Boolean,
  profile: Object,
});

const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);

onMounted(() => {
  localStorage.setItem("prevUrlPricingPlan", "inactive-account");
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
  store.commit("setUserVersion", 0);
  store.commit("profile/setProfile", {});
  store.commit("setUserDetails", {});
  Inertia.post("/logout");
}
</script>
