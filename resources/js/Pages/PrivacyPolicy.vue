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

    <Head title="Privacy Policy" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
    <div class="mb-3 sm:mb-6">
      <Link href="/" class="text-blue-500 hover:underline">← {{ translations && translations.back_to_main_page }}</Link>
    </div>
    <div class="text-3xl font-bold mb-6">{{ translations && translations.privacy_policy }}</div>
    <p class="mb-4">
      Thank you for choosing to be part of our community at tContractor.com. We
      are committed to protecting your personal information and your right to
      privacy.
    </p>

    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">{{ translations && translations.information_we_collect }}</h2>
      <p class="mb-2">
      <ul>
        <li><strong>{{ translations && translations.personal_information }}</strong> Such as names, email addresses, phone numbers, and physical addresses
          that users provide during account creation or in their profiles.</li>

        <li><strong>{{ translations && translations.financial_information }}</strong> Credit/debit card details and other payment-related information.</li>
      </ul>
      </p>
    </section>

    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">{{ translations && translations.how_we_use_your_information }}</h2>
      <p class="mb-2">
      <ul>
        <li><strong>{{ translations && translations.provide_maintain_improve }}</strong> We use your personal information to manage your
          account, provide you with customer support, and ensure you are taking advantage of our full range of services.
        </li>
        <li><strong>Communications:</strong> We use your contact details to communicate with you on matters related to
          your account and to provide you with updates and information about our Services.</li>
        <li><strong>{{ translations && translations.security }}:</strong> We use information about you to verify accounts and activity, and to promote safety
          and security on and off our platform.</li>
      </ul>
      </p>
    </section>
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">{{ translations && translations.sharing_your_information }}</h2>
      <p class="mb-2">We do not share your personal information with third parties without your consent, except in the
        following circumstances:
      <ul>
        <li><strong>{{ translations && translations.legal_compliance }}</strong> We may disclose your information to comply with applicable legal and
          regulatory obligations, such as responding to subpoenas or other governmental requests.</li>
        <li><strong>{{ translations && translations.service_providers }}</strong> We may employ third-party companies and individuals to facilitate our
          Services (e.g., payment processors).</li>
      </ul>
      </p>
    </section>
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">{{ translations && translations.your_rights }}</h2>
      <p class="mb-2">You have certain rights regarding the personal information we hold about you, which may include the
        right to access, correct, delete, restrict, or object to our use of your personal information.</p>
    </section>
    <section class="mb-6 closing">
    <h2 class="text-xl font-semibold mb-2">{{ translations && translations.security }}</h2>
    <p class="mb-2">We implement appropriate technical and organizational safeguards designed to protect your personal
      information. However, we cannot guarantee that the information will not be accessed, disclosed, altered, or
      destroyed in breach of such safeguards.</p>
  </section>
  <section class="mb-6 closing">
    <h2 class="text-xl font-semibold mb-2">{{ translations && translations.contact_us }}</h2>
    <p class="mb-2">For any questions about these TOS, please contact us at <a href='mailto:tcontractor@gmail.com'
        class='text-blue-rgba font-bold'>tcontractor@gmail.com</a></p>
  </section>

</SignUpLayout>
<WelcomeFooter :showit="showit" /></template>
