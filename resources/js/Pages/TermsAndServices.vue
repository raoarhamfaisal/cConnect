<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";

import { Head, Link } from "@inertiajs/inertia-vue3";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  showit: Boolean,
});
const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);

</script>

<template>
  <SignUpLayout>

    <Head title="Terms of Service" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
    <div class="mb-3 sm:mb-6">
      <Link href="/" class="text-blue-500 hover:underline">← Back to Main Page</Link>
    </div>
    <div class="text-3xl font-bold mb-6">{{ translations && translations.terms_of_service }}</div>
    <p class="mb-4">
      By accessing and using the services provided by tContractor.com , you
      agree to comply with and be bound by the following Terms of Service .
      Please review them carefully before usage of the site. If you do not agree
      to these terms, you should not review information or services from this
      site.
    </p>
    <!-- Additional Sections Go Here -->
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">Description of Service</h2>
      <p class="mb-2">TContractor.com provides a platform that connects contractors with customers seeking contractor
        services ('Services'). The Site allows contractors to advertise their services, create profiles, and communicate
        with potential clients.</p>
    </section>
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">Registration and Account Security</h2>
      <p class="mb-2">Users may be required to register in order to access certain features of the Site. You agree to
        provide accurate, current, and complete information during the registration process and to update such information
        to keep it accurate, current, and complete.</p>
    </section>
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">User Conduct</h2>
      <p class="mb-2">All users agree not to use the Site to:
      <ul>
        <li>Post, upload, or distribute any defamatory, obscene, or otherwise unlawful content.</li>
        <li>Violate the legal rights of others.</li>
        <li>Exploit, harm, or attempt to exploit or harm minors.</li>
        <li>Transmit viruses, malware, or other malicious or destructive code.</li>
        <li>Engage in any activities that disrupt, negatively affect, or inhibit other users from fully enjoying the Site.
        </li>
      </ul>
      </p>
    </section>
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">Privacy</h2>
      <p class="mb-2">Your use of the Site is also governed by our Privacy Policy, which can be found at <a
          href='/privacy-policy' class='text-blue-rgba font-bold'>this page</a>.</p>
    </section>
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">Payment</h2>
      <p class="mb-2">All financial transactions conducted through the Site will be processed in accordance with our
        Payment Policy. Contractors agree to pay all fees for the Site as specified in the applicable pricing structure.
      </p>
    </section>
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">Termination</h2>
      <p class="mb-2">tContractor.com reserves the right to terminate or suspend your account and access to the Site and
        Services for any or no reason.</p>
    </section>
    <section class="mb-6 closing">
    <h2 class="text-xl font-semibold mb-2">Disclaimers</h2>
    <p class="mb-2">tContractor.com makes no guarantee regarding the reliability, accuracy, or quality of any content or
      services provided on this Site.</p>
  </section>
  <section class="mb-6 closing">
    <h2 class="text-xl font-semibold mb-2">Limitation of Liability</h2>
    <p class="mb-2">tContractor.com shall not be liable for any direct, indirect, incidental, special, or consequential
      damages that result from the use of, or the inability to use, the Site or Services.</p>
  </section>
  <section class="mb-6 closing">
    <h2 class="text-xl font-semibold mb-2">{{ translations && translations.contact_us }}</h2>
    <p class="mb-2">For any questions about these TOS, please contact us at <a href='mailto:tcontractor@gmail.com'
        class='text-blue-rgba font-bold'>tcontractor@gmail.com</a></p>
  </section>
</SignUpLayout>
<WelcomeFooter :showit="showit" /></template>
