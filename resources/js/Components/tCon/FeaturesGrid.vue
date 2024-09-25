<script setup>
import { ref, reactive, computed } from "vue";
import cConnectWord from "@/Components/tCon/cConnectWord.vue";
import ScrollToLinkVue from "@/Components/tCon/ScrollToLink.vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import { Inertia } from "@inertiajs/inertia";

const showMore1 = ref(false);
const showMore2 = ref(false);
const showMore3 = ref(false);
const showMore4 = ref(false);
const showMore5 = ref(false);
const showMore6 = ref(false);

const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
</script>

<template>
  <section class="bg-white">
    <div class="container px-2 sm:px-6 py-10 mx-auto">
      <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
        {{ translations && translations.explore_our }} <br />
        <span class="underline underline-offset-8 decoration-blue-rgba">
          {{ translations && translations.game_changing_tools }}
        </span>
      </h1>

      <p class="text-2xl capitalize mt-4 text-gray-600 xl:mt-6">
        {{
          translations && translations.more_business_more_profit_less_hassles
        }}
      </p>

      <div
        class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3"
      >
        <!-- #1 FEATURE NEWS FEED  -->
        <div class="" id="newsFeedFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full"
            >
              <img src="/images/icons/news_view.png" width="40" height="40" />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase"
              >
                {{ translations && translations.news_feed }}
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-black font-semibold capitalize tracking-tight"
              >
                <h2>{{ translations && translations.want_to_bid_on_jobs }}</h2>
                <h2 class="pl-4">
                  {{ translations && translations.looking_for_work }}
                </h2>
                <h2 class="pl-8">
                  {{ translations && translations.for_subs_info }}
                </h2>
              </div>

              <p
                class="mt-1 text-xl font-bold italic tracking-tighter text-red-600 uppercase"
              >
                {{ translations && translations.the_action_starts_here }}
              </p>

              <div v-show="showMore1">
                <p class="pt-2 font-semibold text-slate-700 capitalize">
                  {{
                    translations && translations.see_postings_from_contractors
                  }}
                </p>
                <p class="pt-2 font-semibold text-blue-700 capitalize">
                  {{ translations && translations.see_what_jobs_to_bid }}
                </p>
                <p class="pt-2 font-semibold text-slate-700 capitalize">
                  {{ translations && translations.hear_see_latest_happenings }}
                </p>
                <p class="pt-2 font-semibold text-slate-700 capitalize">
                  {{ translations && translations.got_questions_on_projects }}
                </p>
                <p
                  class="-ml-4 pt-2 text-lg font-bold italic text-red-600 capitalize"
                >
                  {{ translations && translations.visit_often }}
                </p>

                <p
                  class="pt-2 text-lg font-bold italic text-blue-rgba capitalize text-center"
                >
                  {{ translations && translations.private_for_members_only }}
                </p>
              </div>

              <!--            listening for click goes to  -->
              <!-- <MoreLessButton @click="toggleShowState" /> -->
              <button
                v-if="!showMore1"
                @click="showMore1 = !showMore1"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform hover:underline hover:text-blue-600"
              >
                {{ translations && translations.more }}
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ScrollToLinkVue
                href="#newsFeedFeature"
                v-if="showMore1"
                @click="showMore1 = !showMore1"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform hover:underline hover:text-teal-600"
              >
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    transform="scale(-1,-1) translate(-24,-20)"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ translations && translations.less }}
              </ScrollToLinkVue>
            </div>
          </div>
        </div>

        <!-- #2 SUB FINDER  -->
        <div class="" id="subFinderFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full"
            >
              <img src="/images/icons/contractor.png" width="40" height="40" />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase"
              >
                {{ translations && translations.sub_finder }}
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-black font-semibold capitalize tracking-tight"
              >
                <h2>{{ translations && translations.need_to_hire_someone }}</h2>
                <h2 class="pl-4">
                  {{ translations && translations.hire_with_confidence }}
                </h2>
                <h2 class="pl-8 text-lg">
                  {{
                    translations &&
                    translations.subs_contractors_talent_engineers_temps
                  }}
                </h2>
              </div>

              <p
                class="mt-1 text-xl font-bold italic tracking-tighter text-red-600 uppercase"
              >
                {{ translations && translations.rated_by_their_peers }}
              </p>

              <div v-show="showMore2">
                <ul
                  class="pt-2 text-md font-semibold text-slate-700 capitalize list-disc"
                >
                  <li>
                    {{ translations && translations.cant_find_contractor_sub }}
                  </li>
                  <li>{{ translations && translations.who_do_you_trust }}</li>
                  <li>
                    {{
                      translations &&
                      translations.hire_sub_renegotiate_disappear
                    }}
                  </li>
                  <li>
                    {{ translations && translations.hire_contractor_bad_job }}
                  </li>
                  <li>
                    {{ translations && translations.got_stiffed_by_hirer }}
                  </li>
                  <li>
                    {{ translations && translations.trust_to_represent_name }}
                  </li>
                </ul>
                <span class="pt-2 text-blue-700 font-bold -ml-4"
                  >{{ translations && translations.confident_in_next_hire }}<br
                /></span>

                <ul
                  class="text-md font-semibold text-blue-700 capitalize list-disc"
                >
                  <li>
                    {{
                      translations &&
                      translations.hire_contractor_reviewed_by_peers
                    }}
                  </li>
                  <li>
                    {{ translations && translations.hire_sub_with_integrity }}
                  </li>
                  <li>
                    <cConnectWord></cConnectWord>
                    {{ translations && translations.private_rating_system }}
                  </li>
                  <li>
                    {{ translations && translations.find_sub_for_job }}
                  </li>
                </ul>

                <p class="pt-2 text-center font-bold text-red-600 uppercase">
                  {{ translations && translations.hiring_with_confidence }}
                </p>
                <p class="text-center font-semibold text-red-600 capitalize">
                  {{ translations && translations.saves_time_headaches }}
                </p>
                <p class="text-center font-semibold text-red-600 capitalize">
                  {{ translations && translations.allows_more_jobs }}
                </p>
                <p class="text-center font-semibold text-red-600 capitalize">
                  {{ translations && translations.great_job_more_money }}
                </p>
                <p class="text-center font-bold text-red-600 uppercase">
                  {{
                    translations && translations.peace_of_mind_higher_profits
                  }}
                </p>
              </div>

              <button
                v-if="!showMore2"
                @click="showMore2 = !showMore2"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform hover:underline hover:text-blue-600"
              >
                {{ translations && translations.more }}
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>

              <ScrollToLinkVue
                href="#subFinderFeature"
                v-if="showMore2"
                @click="showMore2 = !showMore2"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform hover:underline hover:text-teal-600"
              >
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    transform="scale(-1,-1) translate(-24,-20)"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ translations && translations.less }}
              </ScrollToLinkVue>
            </div>
          </div>
        </div>

        <!-- #3 FEATURE CUSTOMER CHECK  -->
        <div class="" id="customerCheckFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full"
            >
              <img src="/images/icons/redflag.png" width="40" height="40" />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase"
              >
                {{ translations && translations.red_flag_customers }}
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-blue-700 text-center font-bold uppercase tracking-tight"
              >
                <h2>
                  {{ translations && translations.customer_is }}<br />{{
                    translations && translations.always_right
                  }}
                </h2>
                <h2 class="capitalize text-black">
                  {{ translations && translations.all_customers_are }}e<br />{{
                    translations && translations.great_right
                  }}
                </h2>
              </div>

              <p
                class="mt-1 text-3xl text-center font-bold italic tracking-tighter text-red-600 uppercase"
              >
                {{ translations && translations.not }}
              </p>

              <div v-show="showMore3">
                <ul
                  class="pt-2 text-md font-semibold text-slate-700 capitalize list-disc"
                >
                  <li>
                    {{ translations && translations.ever_customers_from }}
                    <i> {{ translations && translations.you_know_where }}</i
                    >?
                  </li>
                  <li>
                    {{
                      translations &&
                      translations.renegotiating_customers_post_work
                    }}
                  </li>
                  <li>
                    {{ translations && translations.slow_never_pay_customers }}
                  </li>
                  <li>
                    {{
                      translations &&
                      translations.unfair_reviewers_hostage_reviews
                    }}
                  </li>
                  <li>
                    {{
                      translations &&
                      translations.unrealistic_difficult_customers
                    }}
                  </li>
                </ul>

                <p class="-ml-4 pt-3 text-blue-700 font-bold capitalize">
                  {{ translations && translations.good_customers_not_for_them }}
                  <span class="text-red-700"
                    >{{ translations && translations.list_for_bad_customers }}
                  </span>
                </p>

                <p class="pt-3 text-blue-700 font-bold capitalize">
                  {{ translations && translations.call_these_people }}
                </p>
                <p
                  class="text-red-800 text-2xl text-center uppercase font-extrabold uppercase"
                >
                  "{{ translations && translations.red_flags }}"
                </p>

                <p class="-ml-4 pt-3 text-blue-700 font-bold capitalize">
                  {{ translations && translations.in_business_lon_enough }}
                  <span class="text-red-700">
                    {{ translations && translations.not_all_customers }}</span
                  >
                  {{ translations && translations.are_good_for_you }}
                </p>

                <p class="pt-2 font-medium -ml-4 capitalize">
                  {{
                    translations && translations.contactor_always_under_review
                  }}
                  <span class="text-red-700 font-bold">
                    {{
                      translations && translations.accountable_and_review_them
                    }}</span
                  >
                </p>

                <p
                  class="-ml-4 pt-4 text-blue-rgba text-center uppercase font-extrabold"
                >
                  {{ translations && translations.dont_lose_money_reputation }}.
                </p>

                <p
                  class="-ml-4 pt-3 text-xl text-rose-700 text-center uppercase font-extrabold"
                >
                  {{ translations && translations.check_customer_before_deal }}
                </p>
              </div>

              <button
                v-if="!showMore3"
                @click="showMore3 = !showMore3"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform hover:underline hover:text-blue-600"
              >
                {{ translations && translations.more }}
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ScrollToLinkVue
                href="#customerCheckFeature"
                v-if="showMore3"
                @click="showMore3 = !showMore3"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform hover:underline hover:text-teal-600"
              >
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    transform="scale(-1,-1) translate(-24,-20)"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ translations && translations.less }}
              </ScrollToLinkVue>
            </div>
          </div>
        </div>

        <!-- #4 FEATURE CONTRACTOR PAGE  -->
        <div class="" id="contractorPageFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full"
            >
              <img
                src="/images/icons/contractorpage.png"
                width="40"
                height="40"
              />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase"
              >
                {{ translations && translations.contractor_page }}
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-black font-semibold capitalize tracking-tight"
              >
                <h2>
                  {{ translations && translations.help_other_contractors
                  }}<br />{{ translations && translations.find_you }}
                </h2>
                <h2 class="pl-4">
                  {{ translations && translations.free_advertisement }}
                </h2>
                <h2 class="pl-8">
                  {{ translations && translations.quick_easy }}
                </h2>
              </div>

              <p
                class="mt-1 text-xl font-bold italic tracking-tighter text-red-600 uppercase"
              >
                {{ translations && translations.be_show_off_here }}
              </p>

              <div v-show="showMore4">
                <ul
                  class="pt-2 text-md font-semibold text-slate-700 capitalize list-disc"
                >
                  <li>
                    {{
                      translations &&
                      translations.advertise_services_to_other_contractors
                    }}
                  </li>
                  <li>{{ translations && translations.show_off_work }}</li>
                  <li>{{ translations && translations.quick_easy_setup }}</li>
                </ul>

                <p
                  class="-ml-4 pt-3 text-blue-rgba text-center uppercase font-extrabold"
                >
                  {{
                    translations && translations.free_advertisement_local_areas
                  }}
                </p>

                <p
                  class="-ml-4 pt-4 text-xl text-rose-700 text-center uppercase font-extrabold"
                >
                  {{ translations && translations.low_cost_advertisement }}
                </p>
                <p
                  class="-ml-4 text-lg text-blue-rgba text-center capitalize font-extrabold"
                >
                  {{ translations && translations.low_as_5_bucks }}
                </p>
              </div>

              <button
                v-if="!showMore4"
                @click="showMore4 = !showMore4"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform hover:underline hover:text-blue-600"
              >
                {{ translations && translations.more }}
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ScrollToLinkVue
                href="#contractorPageFeature"
                v-if="showMore4"
                @click="showMore4 = !showMore4"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform hover:underline hover:text-teal-600"
              >
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    transform="scale(-1,-1) translate(-24,-20)"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ translations && translations.less }}
              </ScrollToLinkVue>
            </div>
          </div>
        </div>

        <!-- #5 FEATURE MENTORING  -->
        <!-- <div class="" id="mentoringFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full"
            >
              <img src="/images/icons/mentor.png" width="40" height="40" />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase"
              >
                Mentoring
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-blue-700 text-center font-semibold uppercase tracking-tight"
              >
                <h2>Don't Fool Yourselves</h2>
                <h2 class="capitalize text-black">
                  ... Even the best companies & business managers can ALWAYS use
                  a little <br /><i>(or alot)</i> of mentoring!
                </h2>
              </div>

              <p
                class="mt-1 text-lg text-center font-bold italic tracking-tighter text-red-600 uppercase"
              >
                Free & Valuable Service
              </p>

              <div v-show="showMore5">
                <p class="-ml-4 pt-3 text-blue-rgba uppercase font-extrabold">
                  cConnect provides this Free service by a renowned Master
                  business strategist
                </p>

                <ul
                  class="ml-2 pt-2 pl-3 text-md font-semibold text-slate-700 capitalize list-disc"
                >
                  <li class="">Daily Motivations & Encouragements.</li>
                  <li>Sales Insights.</li>
                  <li>Sales Techniques.</li>
                  <li>Best Practices & Habits.</li>
                </ul>

                <p
                  class="-ml-4 pt-4 text-xl text-rose-700 text-center uppercase font-extrabold"
                >
                  Better Business = Higher Profits & Peace Of Mind!
                </p>
              </div>

              <button
                v-if="!showMore5"
                @click="showMore5 = !showMore5"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform hover:underline hover:text-blue-600"
              >
                More
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ScrollToLinkVue
                href="#mentoringFeature"
                v-if="showMore5"
                @click="showMore5 = !showMore5"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform hover:underline hover:text-teal-600"
              >
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    transform="scale(-1,-1) translate(-24,-20)"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Less
              </ScrollToLinkVue>
            </div>
          </div>
        </div> -->

        <!-- #6 FEATURE NEW FEAtURES  -->
        <div class="" id="newFeatures">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full"
            >
              <img
                src="/images/icons/under_construc.png"
                width="40"
                height="40"
              />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase"
              >
                {{ translations && translations.new_features }}<br />{{
                  translations && translations.coming_soon
                }}
              </h1>
            </div>
          </div>
          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5 sm:w-1/6"></div>
            <div class="w-4/5 sm:w-5/6">
              <div class="flex gap-1">
                <Icon width="26" height="26" icon="mdi:faq" />
                <div class="text-lg sm:text-xl font-bold text-blue-700">
                  {{
                    translations &&
                    translations.faqs_learn_more_about_tcontractor
                  }}
                </div>
              </div>
              <div
                @click="
                  () => {
                    Inertia.visit('/pricing');
                  }
                "
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform underline hover:text-blue-600 cursor-pointer pl-1"
              >
                {{ translations && translations.more_information }}
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-blue-700 text-center font-bold capitalize tracking-tight"
              >
                <h2>
                  <cConnectWord></cConnectWord>
                  {{ translations && translations.built_managed_by_contractors
                  }}<br />{{
                    translations && translations.for_contractors_subcontractors
                  }}
                </h2>
              </div>

              <p
                class="mt-1 text-lg text-center font-bold italic tracking-tighter text-red-600 uppercase"
              >
                {{ translations && translations.always_free }}<br />{{
                  translations && translations.never_an_upcharge
                }}
              </p>

              <div v-show="showMore6">
                <h2 class="capitalize text-black">
                  cConnect
                  {{ translations && translations.adding_new_features }}
                </h2>

                <p class="-ml-4 pt-3 text-blue-rgba capitalize font-extrabold">
                  <cConnectWord></cConnectWord>
                  {{ translations && translations.important_tool_in_toolbox }}
                  <span class="uppercase text-rose-700">{{
                    translations && translations.better_construction_business
                  }}</span>
                </p>

                <p
                  class="-ml-4 pt-4 text-xl text-rose-700 text-center uppercase font-extrabold"
                >
                  {{ translations && translations.never_upcharge_new_features }}
                </p>
              </div>

              <button
                v-if="!showMore6"
                @click="showMore6 = !showMore6"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform hover:underline hover:text-blue-600"
              >
                {{ translations && translations.more }}
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ScrollToLinkVue
                href="#newFeatures"
                v-if="showMore6"
                @click="showMore6 = !showMore6"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform hover:underline hover:text-teal-600"
              >
                <svg
                  class="w-4 h-4 mx-1 rtl:-scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    transform="scale(-1,-1) translate(-24,-20)"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ translations && translations.less }}
              </ScrollToLinkVue>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
