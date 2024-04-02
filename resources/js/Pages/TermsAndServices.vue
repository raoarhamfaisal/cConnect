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

    <Head :title="translations && translations.terms_of_service" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
    <template v-if="translations && Object.keys(translations).length > 0">
      <div class="mb-3 sm:mb-6">
        <Link href="/" class="text-blue-500 hover:underline">← {{ translations && translations.back_to_main_page }}
        </Link>
      </div>
      <div class="text-3xl font-bold mb-6">{{ translations && translations.terms_of_service }}</div>
      <p class="mb-4">
        {{ translations && translations.tos_agreement }}
      </p>
      <!-- Additional Sections Go Here -->
      <section class="mb-6 closing">
        <h2 class="text-xl font-semibold mb-2">{{ translations && translations.description_of_service }}</h2>
        <p class="mb-2">{{ translations && translations.tcontractor_platform_description }}</p>
      </section>
      <section class="mb-6 closing">
        <h2 class="text-xl font-semibold mb-2">{{ translations && translations.registration_and_account_security }}</h2>
        <p class="mb-2">{{ translations && translations.user_registration_requirements }}</p>
      </section>
      <section class="mb-6 closing">
        <h2 class="text-xl font-semibold mb-2">{{ translations && translations.user_conduct }}</h2>
        <p class="mb-2">{{ translations && translations.site_usage_restrictions }}
        <ul>
          <li>{{ translations && translations.post_upload_distribute }}</li>
          <li>{{ translations && translations.violate_legal_rights }}</li>
          <li>{{ translations && translations.exploit_harm_minors }}</li>
          <li>{{ translations && translations.transmit_viruses_malware }}</li>
          <li>{{ translations && translations.engage_in_disruptive_activities }}
          </li>
        </ul>
        </p>
      </section>
      <section class="mb-6 closing">
        <h2 class="text-xl font-semibold mb-2">{{ translations && translations.privacy }}</h2>
        <p class="mb-2">{{ translations && translations.privacy_policy_governed }} <a href='/privacy-policy'
            class='text-blue-rgba font-bold'>{{ translations && translations.this_page }}</a>.</p>
      </section>
      <section class="mb-6 closing">
        <h2 class="text-xl font-semibold mb-2">{{ translations && translations.payment }}</h2>
        <p class="mb-2">{{ translations && translations.financial_transactions }}
        </p>
      </section>
      <section class="mb-6 closing">
        <h2 class="text-xl font-semibold mb-2">{{ translations && translations.termination }}</h2>
        <p class="mb-2">{{ translations && translations.account_termination }}</p>
      </section>
      <section class="mb-6 closing">
        <h2 class="text-xl font-semibold mb-2">{{ translations && translations.disclaimers }}</h2>
        <p class="mb-2">{{ translations && translations.no_guarantee_reliability }}</p>
      </section>
      <section class="mb-6 closing">
        <h2 class="text-xl font-semibold mb-2">{{ translations && translations.limitation_of_liability }}</h2>
        <p class="mb-2">{{ translations && translations.liability_limitation }}</p>
      </section>
      <section class="mb-6 closing">
        <h2 class="text-xl font-semibold mb-2">{{ translations && translations.contact_us }}</h2>
        <p class="mb-2">{{ translations && translations.tos_questions_contact }} <a href='mailto:tcontractor@gmail.com'
            class='text-blue-rgba font-bold'>tcontractor@gmail.com</a></p>
      </section>
    </template>
    <div v-else class="h-[100vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4">
      <div class="text-center text-xl">Loading...</div>
      <v-progress-linear color="#241e6d" indeterminate rounded height="6"></v-progress-linear>
    </div>
  </SignUpLayout>
  <WelcomeFooter v-if="translations && Object.keys(translations).length > 0" :showit="showit" />
</template>
