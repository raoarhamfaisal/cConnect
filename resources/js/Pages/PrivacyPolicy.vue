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

    <Head :title="translations && translations.privacy_policy" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
    <template v-if="translations && Object.keys(translations).length > 0">
    <div class="mb-3 sm:mb-6">
      <Link href="/" class="text-blue-500 hover:underline">← {{ translations && translations.back_to_main_page }}</Link>
    </div>
    <div class="text-3xl font-bold mb-6">{{ translations && translations.privacy_policy }}</div>
    <p class="mb-4">
  {{ translations && translations.thank_you_being_part_and_we_care_about_privacy }}
    </p>

    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">{{ translations && translations.information_we_collect }}</h2>
      <p class="mb-2">
      <ul>
        <li><strong>{{ translations && translations.personal_information }}</strong> {{ translations && translations.such_as_names_email_addresses_phone_numbers_and_physical_addresses }}</li>

        <li><strong>{{ translations && translations.financial_information }}</strong> {{ translations && translations.credit_debit_card_details_and_other_payment_related_information }}</li>
      </ul>
      </p>
    </section>

    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">{{ translations && translations.how_we_use_your_information }}</h2>
      <p class="mb-2">
      <ul>
        <li><strong>{{ translations && translations.provide_maintain_improve }}</strong> {{ translations && translations.we_use_your_personal_information_to_manage_your_account }}
        </li>
        <li><strong>{{ translations && translations.communications }}</strong> {{ translations && translations.we_use_your_contact_details_to_communicate_with_you }}</li>
        <li><strong>{{ translations && translations.security }}:</strong> {{ translations && translations.we_use_information_about_you_to_verify_accounts_and_activity }}</li>
      </ul>
      </p>
    </section>
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">{{ translations && translations.sharing_your_information }}</h2>
      <p class="mb-2">{{ translations && translations.we_do_not_share_your_personal_information_without_your_consent }}
      <ul>
        <li><strong>{{ translations && translations.legal_compliance }}</strong> {{ translations && translations.we_may_disclose_your_information_to_comply_with_legal_obligations }}</li>
        <li><strong>{{ translations && translations.service_providers }}</strong> {{ translations && translations.we_may_employ_third_party_companies_to_facilitate_our_services }}</li>
      </ul>
      </p>
    </section>
    <section class="mb-6 closing">
      <h2 class="text-xl font-semibold mb-2">{{ translations && translations.your_rights }}</h2>
      <p class="mb-2">{{ translations && translations.you_have_certain_rights_regarding_personal_information }}</p>
    </section>
    <section class="mb-6 closing">
    <h2 class="text-xl font-semibold mb-2">{{ translations && translations.security }}</h2>
    <p class="mb-2">{{ translations && translations.we_implement_technical_and_organizational_safeguards }}</p>
  </section>
  <section class="mb-6 closing">
    <h2 class="text-xl font-semibold mb-2">{{ translations && translations.contact_us }}</h2>
    <p class="mb-2">{{ translations && translations.tos_questions_contact }} <a href='mailto:cConnect@gmail.com'
        class='text-blue-rgba font-bold'>cConnect@gmail.com</a></p>
  </section>
</template>
    <div v-else class="h-[100vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4">
      <div class="text-center text-xl">Loading...</div>
      <v-progress-linear color="#241e6d" indeterminate rounded height="6"></v-progress-linear>
    </div>
</SignUpLayout>
<WelcomeFooter v-if="translations && Object.keys(translations).length > 0" :showit="showit" /></template>
