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
          >← {{ translations && translations.back_to_main_page }}</Link
        >
      </div>

      <!-- About Us Section -->
      <section id="aboutUs" class="mb-8">
        <h2 class="text-2xl font-bold mb-4">
          {{ translations && translations.about_us }}
        </h2>
        <p class="text-lg mb-4">
          {{ translations && translations.building_community }}
        </p>
        <p class="text-lg mb-4">
          {{ translations && translations.mission_empower_contractors }}
        </p>
        <p class="text-lg">
          {{ translations && translations.power_of_community }}
        </p>
      </section>

      <!-- Contact Us Section -->
      <section id="contactUs" class="mb-8">
        <h2 class="text-2xl font-bold mb-4">
          {{ translations && translations.contact_us }}
        </h2>
        <p class="text-lg mb-4">
          {{ translations && translations.always_here_to_help }}
        </p>
        <p class="text-lg">
          {{ translations && translations.reach_out_to_us }}
          <a href="mailto:tcontractor@gmail.com" class="text-blue-500"
            >tcontractor@gmail.com</a
          >, {{ translations && translations.get_back_to_you }}
        </p>
      </section>
    </div>
  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>
