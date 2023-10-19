<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";

import { Head } from "@inertiajs/inertia-vue3";
import { ref } from "vue";

const props = defineProps({
  showit: Boolean,
});

const termsSections = ref([
  {
    title: "Description of Service",
    content:
      "TContractor.com provides a platform that connects contractors with customers seeking contractor services ('Services'). The Site allows contractors to advertise their services, create profiles, and communicate with potential clients.",
  },
  {
    title: "Registration and Account Security",
    content:
      "Users may be required to register in order to access certain features of the Site. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
  },
  {
    title: "User Conduct",
    content:
      "All users agree not to use the Site to: <ul><li>Post, upload, or distribute any defamatory, obscene, or otherwise unlawful content.</li><li>Violate the legal rights of others.</li><li>Exploit, harm, or attempt to exploit or harm minors.</li><li>Transmit viruses, malware, or other malicious or destructive code.</li><li>Engage in any activities that disrupt, negatively affect, or inhibit other users from fully enjoying the Site.</li></ul>",
  },
  {
    title: "Privacy",
    content:
      "Your use of the Site is also governed by our Privacy Policy, which can be found at <a   href='/privacy-policy' class='text-blue-rgba font-bold' >this page</a>.",
  },
  {
    title: "Payment",
    content:
      "All financial transactions conducted through the Site will be processed in accordance with our Payment Policy. Contractors agree to pay all fees for the Site as specified in the applicable pricing structure.",
  },
  {
    title: "Termination",
    content:
      "tContractor.com reserves the right to terminate or suspend your account and access to the Site and Services for any or no reason.",
  },
  {
    title: "Disclaimers",
    content:
      "tContractor.com makes no guarantee regarding the reliability, accuracy, or quality of any content or services provided on this Site.",
  },
  {
    title: "Limitation of Liability",
    content:
      "tContractor.com shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the Site or Services.",
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
    <Head title="Terms of Service" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
    <div class="text-3xl font-bold mb-6">Terms of Service</div>
    <p class="mb-4">
      By accessing and using the services provided by tContractor.com , you
      agree to comply with and be bound by the following Terms of Service .
      Please review them carefully before usage of the site. If you do not agree
      to these terms, you should not review information or services from this
      site.
    </p>
    <!-- Additional Sections Go Here -->
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
