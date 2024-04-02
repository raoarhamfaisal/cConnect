<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";

import { Link } from "@inertiajs/inertia-vue3";

import { Head } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";
import { computed } from "vue";

const props = defineProps({
  showit: Boolean,
});
const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
</script>

<template>
  <SignUpLayout>
    <Head :title="translations && translations.careers" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />

    <div
      v-if="translations && Object.keys(translations).length > 0"
      class="bg-gray-100 min-h-screen p-3 sm:p-5 max-sm:rounded"
    >
      <div class="mb-3 sm:mb-6">
        <Link href="/" class="text-blue-500 hover:underline"
          >← {{ translations && translations.back_to_main_page }}</Link
        >
      </div>
      <h1 class="text-4xl font-bold mb-3 sm:mb-6">
        {{ translations && translations.join_our_network_of_contractors }}
      </h1>
      <p class="text-lg mb-3 sm:mb-6">
        {{ translations && translations.building_community_at_tcontractor }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card 1 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">
            {{ translations && translations.hire_talented_contractors }}
          </h2>
          <p class="text-gray-700">
            {{ translations && translations.find_skilled_professionals }}
          </p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">
            {{ translations && translations.find_work_opportunities }}
          </h2>
          <p class="text-gray-700">
            {{ translations && translations.explore_new_work_opportunities }}
          </p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">
            {{ translations && translations.offer_and_receive_help }}
          </h2>
          <p class="text-gray-700">
            {{ translations && translations.engage_in_give_and_take }}
          </p>
        </div>

        <!-- Card 4 -->
        <!-- <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">Mentor and Be Mentored</h2>
          <p class="text-gray-700">
            Invest in mutual growth by participating in our mentoring services.
            Share your knowledge and gain new perspectives from seasoned
            professionals.
          </p>
        </div> -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">
            {{ translations && translations.spot_red_flag_customers }}
          </h2>
          <p class="text-gray-700">
            {{ translations && translations.identify_difficult_customers }}
          </p>
        </div>

        <!-- Card 6 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">
            {{ translations && translations.stay_updated_with_news_feed }}
          </h2>
          <p class="text-gray-700">
            {{ translations && translations.keep_yourself_informed }}
          </p>
        </div>
      </div>
      <div v-if="!showit" class="flex justify-center space-x-3">
        <Link
          class="group flex items-center justify-between rounded-xl border border-red-500 bg-red-500 px-5 py-3 mt-8 transition-colors hover:bg-red-800 focus:outline-none focus:ring"
          :href="route('signup')"
        >
          <span
            class="text-lg font-bold text-white uppercase transition-colors group-hover:font-extrabold group-active:text-indigo-500"
          >
            {{ translations && translations.get_started }}
          </span>
          <!-- Arrow -->
          <span
            class="ml-4 flex-shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </Link>
      </div>
      <!-- <div class="mt-10">
        <a
          href="#"
          class="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600"
        >
          Get Started
        </a>
      </div> -->
    </div>
    <div
      v-else
      class="h-[100vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
    >
      <div class="text-center text-xl">Loading...</div>
      <v-progress-linear
        color="#241e6d"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </div>
  </SignUpLayout>
  <WelcomeFooter
    v-if="translations && Object.keys(translations).length > 0"
    :showit="showit"
  />
</template>
