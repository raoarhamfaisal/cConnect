<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";

import { Head, Link } from "@inertiajs/inertia-vue3";
import { ref } from "vue";

const props = defineProps({
  showit: Boolean,
});
const termsSections = ref([
  {
    title: "Information We Collect",
    content: `<ul>
                <li><strong>Personal Information:</strong> Such as names, email addresses, phone numbers, and physical addresses that users provide during account creation or in their profiles.</li>
               
                <li><strong>Financial Information:</strong> Credit/debit card details and other payment-related information.</li>
              </ul>`,
  },
  {
    title: "How We Use Your Information",
    content: `<ul>
                <li><strong>Provide, Maintain, and Improve Our Services:</strong> We use your personal information to manage your account, provide you with customer support, and ensure you are taking advantage of our full range of services.</li>
                <li><strong>Communications:</strong> We use your contact details to communicate with you on matters related to your account and to provide you with updates and information about our Services.</li>
                <li><strong>Security:</strong> We use information about you to verify accounts and activity, and to promote safety and security on and off our platform.</li>
              </ul>`,
  },
  {
    title: "Sharing Your Information",
    content: `<p>We do not share your personal information with third parties without your consent, except in the following circumstances:</p>
              <ul>
                <li><strong>Legal Compliance:</strong> We may disclose your information to comply with applicable legal and regulatory obligations, such as responding to subpoenas or other governmental requests.</li>
                <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our Services (e.g., payment processors).</li>
              </ul>`,
  },
  {
    title: "Your Rights",
    content:
      "<p>You have certain rights regarding the personal information we hold about you, which may include the right to access, correct, delete, restrict, or object to our use of your personal information.</p>",
  },
  {
    title: "Security",
    content: `<p>We implement appropriate technical and organizational safeguards designed to protect your personal information. However, we cannot guarantee that the information will not be accessed, disclosed, altered, or destroyed in breach of such safeguards.</p>`,
  },
  {
    title: "Contact Us",
    content:
      "For any questions about these TOS, please contact us at <a   href='mailto:tcontractor@gmail.com' class='text-blue-rgba font-bold' >tcontractor@gmail.com</a>",
  },
]);
</script>

<template>
  <SignUpLayout>
    <Head title="Privacy Policy" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
    <div class="mb-3 sm:mb-6">
      <Link href="/" class="text-blue-500 hover:underline"
        >← Back to Main Page</Link
      >
    </div>
    <div class="text-3xl font-bold mb-6">Privacy Policy</div>
    <p class="mb-4">
      Thank you for choosing to be part of our community at tContractor.com. We
      are committed to protecting your personal information and your right to
      privacy.
    </p>

    <section
      v-for="(item, index) in termsSections"
      :key="index"
      class="mb-6 closing"
    >
      <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
      <p v-html="item.content" class="mb-2"></p>
    </section>
  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>
