<script setup>
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
import PricingVersions from "@/Components/Pricing/PricingVersions.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { Link } from "@inertiajs/inertia-vue3";
import MoveToTop from "@/Components/MoveToTop.vue";
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
  <Head :title="translations && translations.pricing" />
  <div
    v-if="translations && Object.keys(translations).length > 0"
    :class="`pt-20 sm:pt-28 pb-2  flex sm:justify-center items-center bg-white   bg-gray-100 `"
  >
    <div
      class="container max-w-7xl max-sm:px-1 sm:px-6 py-2 mx-auto overflow-hidden sm:rounded-lg"
    >
      <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
      <!-- Back Button -->
      <div class="mb-2 sm:mb-2">
        <Link href="/" class="text-blue-500 hover:underline"
          >← {{ translations && translations.back_to_main_page }}</Link
        >
      </div>
      <div
        class="xl:container bg-white md:mx-auto px-2 py-4 sm:p-6 shadow-md rounded-lg"
      >
        <!-- THE MOST POWERFUL TOOL IN THE TOOLBOX! -->
        <section id="powerfull tool" class="">
          <div class="flex justify-center">
            <span
              class="text-xl sm:text-3xl font-bold mb-4 text-center text-blue-rgba border-b-2 border-black"
            >
              {{
                translations &&
                translations.the_most_powerful_tool_in_the_toolbox
              }}
            </span>
          </div>
          <div
            class="flex max-md:flex-col max-md:flex-row-reverse gap-2 sm:gap-4 sm:mt-4"
          >
            <div class="md:w-[50%] max-md:mb-4">
              <ul
                class="text-xl sm:text-2xl font-semibold tracking-tighter list-disc pl-8"
              >
                <li>
                  {{
                    translations && translations.find_local_or_statewide_subs
                  }}!
                </li>
                <li>
                  {{ translations && translations.hire_someone_you_can_trust }}
                </li>
                <li>
                  {{
                    translations &&
                    translations.looking_for_work_check_news_feed
                  }}
                </li>
                <li>
                  {{
                    translations &&
                    translations.advertise_your_business_for_free
                  }}
                </li>
                <li>{{ translations && translations.got_a_job_to_be_done }}</li>
                <li>
                  {{ translations && translations.got_a_job_to_be_done }}
                </li>
                <li>
                  {{
                    translations && translations.want_to_know_whats_happening
                  }}
                </li>
                <li>
                  {{
                    translations && translations.new_customer_can_you_trust_them
                  }}
                </li>
              </ul>
            </div>
            <div class="md:w-[50%] text-center">
              <h1 class="text-xl sm:text-3xl font-bold text-blue-rgba mb-1">
                {{ translations && translations.its_a_game_changer }}
              </h1>
              <h2 class="text-xl sm:text-2xl font-bold mb-1 text-orange-accent">
                {{
                  translations &&
                  translations.for_contractors_and_subcontractors_only
                }}
              </h2>
              <p class="text-xl mb-1 text-blue-rgba font-bold">
                {{ translations && translations.no_brainer_pricing }}
              </p>
              <p class="text-sm mb-1 text-xl">
                {{ translations && translations.contractors_trying_to_sell }}
              </p>
              <p class="text-xl text-blue-rgba font-bold">
                {{ translations && translations.not_here_at_cConnect }}
              </p>
              <h3
                class="mx-auto text-xl sm:text-3xl font-bold text-red-600 max-w-[418px]"
              >
                {{ translations && translations.important_tool_for_free }}
              </h3>

              <p class="text-xl">
                {{ translations && translations.for_basic_services }}
              </p>
              <p
                class="mx-auto text-xl font-bold text-orange-accent w-[17rem] text"
              >
                And, {{ translations && translations.few_bucks_more_benefits }}
              </p>
            </div>
          </div>
        </section>
      </div>
      <PricingVersions pageName="pricing" />
    </div>
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

  <WelcomeFooter
    v-if="translations && Object.keys(translations).length > 0"
    :showit="showit"
  />
  <MoveToTop scrollableContainer="app" />
</template>
