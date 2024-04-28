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
    <div v-if="!user.payments_privileges">
     <p class="mb-4" >
      We noticed your account is inactive due to billing issues.
    </p>
    <p class="mb-4">
      To regain access, please update your billing information. If you feel this is incorrect or need further assistance, please contact our support team at <a href="mailto:support@tcontractor.com" class="text-blue-rgba font-bold"
        >support@tcontractor.com</a
      >
    </p>
    <div class="flex gap-2 mt-3">

      <Link
      href="/payment"
      :style="{
        backgroundImage:
          'linear-gradient( 111.4deg,rgba(7, 7, 9, 1) 6.5%, rgba(27, 24, 113, 1) 93.2% )',
       
      }"
      class="  block w-full sm:w-40 flex items-center justify-center  text-white font-semibold text-xl py-2 px-4 rounded transition transform duration-300 hover:shadow-lg active:scale-95 cursor-pointer"
      >
     Billing
    </Link>
    <button
      @click="handleLogout"
      class="border-2 border-blue-rgba w-full sm:w-40 flex justify-center items-center text-blue-rgba font-bold text-xl py-2 px-4 uppercase rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95"
      >
     Cancel
  </button>
  </div>
  </div>

    <!-- <p class="mb-4" >
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
    </p> -->

  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>
  
  <script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";

import { Head, Link, usePage } from "@inertiajs/inertia-vue3";
import { removeToken } from "@/helpers/localStorageHelper";
import { Inertia } from "@inertiajs/inertia";

const props = defineProps({
  showit: Boolean,
});
let usePageDeatails = usePage().props.value;


const user = usePageDeatails.auth.user
console.log(user.payments_privileges,usePageDeatails,'usePageDetails')
function handleLogout() {
  removeToken();

  Inertia.post("/logout");
}
</script>
  


