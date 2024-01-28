<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";

import { Head } from "@inertiajs/inertia-vue3";
import { Link } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";
import { computed } from "vue";

const props = defineProps({
  showit: Boolean,
});
const store = useStore();

const translations = computed(() => store.getters.translations);
</script>

<template>
  <SignUpLayout>
    <Head title="Careers" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
    <div class="container mx-auto p-4">
      <!-- Back Button -->
      <div class="mb-3 sm:mb-6">
        <Link href="/" class="text-blue-500 hover:underline"
          >← Back to Main Page</Link
        >
      </div>

      <!-- About Us Section -->
      <section id="aboutUs" class="mb-8">
        <h2 class="text-2xl font-bold mb-4">
          {{ translations && translations.about_us }}
        </h2>
        <p class="text-lg mb-4">
          At tContractor, we're building a community where contractors help each
          other succeed. Whether you're looking to hire, seek guidance, or find
          new opportunities, you’re in the right place. Our platform connects
          contractors with customers seeking contractor services, allowing
          contractors to advertise their services, create profiles, and
          communicate with potential clients.
        </p>
        <p class="text-lg mb-4">
          At tContractor,our mission is to empower contractors, helping them
          connect, collaborate, and succeed. Our platform serves as a bridge
          between contractors and clients, ensuring that every project is a
          success story waiting to be told. From small tasks to large projects,
          our community thrives on mutual support and collaboration.
        </p>
        <p class="text-lg">
          We believe in the power of community, and at tContractor, every member
          plays a pivotal role in shaping our collective future. Join us and be
          a part of our ever-growing family.
        </p>
      </section>

      <!-- Contact Us Section -->
      <section id="contactUs" class="mb-8">
        <h2 class="text-2xl font-bold mb-4">
          {{ translations && translations.contact_us }}
        </h2>
        <p class="text-lg mb-4">
          We're always here to help. Whether you have a question, feedback, or
          just want to chat, our team is just an email away. We value our
          community and are committed to ensuring that every experience with
          tContractor is a positive one.
        </p>
        <p class="text-lg">
          Reach out to us at
          <a href="mailto:tcontractor@gmail.com" class="text-blue-500"
            >tcontractor@gmail.com</a
          >, and we'll get back to you as soon as possible.
        </p>
      </section>
    </div>
  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>
