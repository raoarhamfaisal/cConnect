<script setup>
import { ref, reactive } from "vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import ScrollToLinkVue from "@/Components/tCon/ScrollToLink.vue";

const showMore1 = ref(false);
const showMore2 = ref(false);
const showMore3 = ref(false);
const showMore4 = ref(false);
const showMore5 = ref(false);
const showMore6 = ref(false);
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
      <h1
        class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white"
      >
        explore our <br />
        <span class="underline underline-offset-8 decoration-blue-rgba">
          Game-Changing Tools
        </span>
      </h1>

      <p
        class="text-2xl capitalize mt-4 text-gray-600 xl:mt-6 dark:text-gray-300"
      >
        more business - more profit - less hassles
      </p>

      <div
        class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3"
      >
        <!-- #1 FEATURE NEWS FEED  -->
        <div class="" id="newsFeedFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500"
            >
              <img src="/images/icons/news_view.png" width="40" height="40" />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase dark:text-white"
              >
                news feed
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-black font-semibold capitalize tracking-tight"
              >
                <h2>Want To BID on JOBS?</h2>
                <h2 class="pl-4">Looking For WORK?</h2>
                <h2 class="pl-8">...For SUBS? ...INFO?</h2>
              </div>

              <p
                class="mt-1 text-xl font-bold italic tracking-tighter text-red-600 uppercase"
              >
                The ACTION Starts Here!
              </p>

              <div v-show="showMore1">
                <p class="pt-2 font-semibold text-slate-700 capitalize">
                  See postings from other contractors, locally, city wide or the
                  region!
                </p>
                <p class="pt-2 font-semibold text-blue-700 capitalize">
                  See what jobs you can bid on, who to hire or not, and who to
                  stay away from! looking for work, you'll find plenty of
                  opportunities here!
                </p>
                <p class="pt-2 font-semibold text-slate-700 capitalize">
                  Hear and see the latest "happenings" from other contractors,
                  in your locale area or from around the country!
                </p>
                <p class="pt-2 font-semibold text-slate-700 capitalize">
                  Got Some Questions on tough projects? Put it on the FEED, Find
                  out from other experts what may be the best route for you!
                </p>
                <p
                  class="-ml-4 pt-2 text-lg font-bold italic text-red-600 capitalize"
                >
                  Visit Often - Hourly/Daily
                </p>

                <p
                  class="pt-2 text-lg font-bold italic text-blue-rgba capitalize text-center"
                >
                  Private - For Members Only!
                </p>
              </div>

              <!--            listening for click goes to  -->
              <!-- <MoreLessButton @click="toggleShowState" /> -->
              <button
                v-if="!showMore1"
                @click="showMore1 = !showMore1"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
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
                href="#newsFeedFeature"
                v-if="showMore1"
                @click="showMore1 = !showMore1"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-500"
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
        </div>

        <!-- #2 SUB FINDER  -->
        <div class="" id="subFinderFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500"
            >
              <img src="/images/icons/contractor.png" width="40" height="40" />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase dark:text-white"
              >
                sub finder
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-black font-semibold capitalize tracking-tight"
              >
                <h2>Need To Hire Someone?</h2>
                <h2 class="pl-4">Hire with confidence!</h2>
                <h2 class="pl-8 text-lg">
                  Subs, Contractors, Talent, Engineers & Temps
                </h2>
              </div>

              <p
                class="mt-1 text-xl font-bold italic tracking-tighter text-red-600 uppercase"
              >
                Rated By Their Peers!
              </p>

              <div v-show="showMore2">
                <ul
                  class="pt-2 text-md font-semibold text-slate-700 capitalize list-disc"
                >
                  <li>Con't find a contractor or a sub?</li>
                  <li>Who do you trust?</li>
                  <li>
                    Ever hire a sub only to have them try and renegotiate the
                    deal... or disappear?
                  </li>
                  <li>Ever hire a contractor who just did a bad job?</li>
                  <li>Ever got stiffed by someone who hired you?</li>
                  <li>Who do you trust to represent your name?</li>
                </ul>
                <span class="pt-2 text-blue-700 font-bold -ml-4"
                  >Do you want to be<br
                /></span>
                <span class="text-blue-700 font-bold -ml-4"
                  >confident in your next hire?</span
                >
                <ul
                  class="text-md font-semibold text-blue-700 capitalize list-disc"
                >
                  <li>
                    Hire A Contractor Reviewed By Your Peers! Not Bogus review
                    companies or even their buddies!
                  </li>
                  <li>
                    Hire a Sub who has demonstrated integrity, gets the job done
                    - the right way - the first time, at the price agreed!
                  </li>
                  <li>
                    <tContractorWord></tContractorWord> has it's own private
                    rating system!
                    <span class="font-bold underline"
                      >No fake ratings Here!</span
                    >
                    Know what your getting into!
                  </li>
                  <li>
                    Need to find a sub, electrician, plumber for a job across
                    town
                  </li>
                </ul>

                <p class="pt-2 text-center font-bold text-red-600 uppercase">
                  Hiring with confidence makes all the difference in the world!
                </p>
                <p class="text-center font-semibold text-red-600 capitalize">
                  Saves Time, Saves Headaches
                </p>
                <p class="text-center font-semibold text-red-600 capitalize">
                  Allows Time To Take On More Jobs
                </p>
                <p class="text-center font-semibold text-red-600 capitalize">
                  When Your subs do a great job.. you both look great and you
                  make more money!
                </p>
                <p class="text-center font-bold text-red-600 uppercase">
                  GET peace of mind & higher profits
                </p>
              </div>

              <button
                v-if="!showMore2"
                @click="showMore2 = !showMore2"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
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
                href="#subFinderFeature"
                v-if="showMore2"
                @click="showMore2 = !showMore2"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-500"
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
        </div>

        <!-- #3 FEATURE CUSTOMER CHECK  -->
        <div class="" id="customerCheckFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500"
            >
              <img src="/images/icons/redflag.png" width="40" height="40" />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase dark:text-white"
              >
                Red Flag Customers
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-blue-700 text-center font-bold uppercase tracking-tight"
              >
                <h2>The Customer Is<br />Always Right</h2>
                <h2 class="capitalize text-black">
                  All Customers are<br />Great... RIGHT?
                </h2>
              </div>

              <p
                class="mt-1 text-3xl text-center font-bold italic tracking-tighter text-red-600 uppercase"
              >
                not!
              </p>

              <div v-show="showMore3">
                <ul
                  class="pt-2 text-md font-semibold text-slate-700 capitalize list-disc"
                >
                  <li>
                    Ever had one of those customer's from
                    <i>"You Know Where"</i>?
                  </li>
                  <li>
                    How about the customer who insist on renegotiating after the
                    deal... after the work is completed?
                  </li>
                  <li>How about slow-payers... never pay customers?</li>
                  <li>Unfair reviewers... and those Hostage Reviews?</li>
                  <li>Ever had an Unrealistic or difficult customers?</li>
                </ul>

                <p class="-ml-4 pt-3 text-blue-700 font-bold capitalize">
                  We've all had those good customers, even great customers! THIS
                  LIST IS NOT FOR THEM.
                  <span class="text-red-700"
                    >This List Is for those customers you would not wish on your
                    worst enemy... those customers that take advantage of you
                    more than most...
                  </span>
                </p>

                <p class="pt-3 text-blue-700 font-bold capitalize">
                  We call these people
                </p>
                <p
                  class="text-red-800 text-2xl text-center uppercase font-extrabold"
                >
                  "RED FLAGS"
                </p>

                <p class="-ml-4 pt-3 text-blue-700 font-bold capitalize">
                  if you've been in business long enough, you know that
                  <span class="text-red-700"> NOT all customers</span> are good
                  for you.
                </p>

                <p class="pt-2 font-medium -ml-4 capitalize">
                  As a contractor, you're always under review, now here's your
                  chance to
                  <span class="text-red-700 font-bold"
                    >Keep them accountable for their underhanded play - review
                    them yourselves!</span
                  >
                </p>

                <p
                  class="-ml-4 pt-4 text-blue-rgba text-center uppercase font-extrabold"
                >
                  Don't Loose Money or your reputation... Make More Money &
                  Better Peace of Mind...
                </p>

                <p
                  class="-ml-4 pt-3 text-xl text-rose-700 text-center uppercase font-extrabold"
                >
                  Check your prospective customer out before agreeing to a deal!
                </p>
              </div>

              <button
                v-if="!showMore3"
                @click="showMore3 = !showMore3"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
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
                href="#customerCheckFeature"
                v-if="showMore3"
                @click="showMore3 = !showMore3"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-500"
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
        </div>

        <!-- #4 FEATURE CONTRACTOR PAGE  -->
        <div class="" id="contractorPageFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500"
            >
              <img
                src="/images/icons/contractorpage.png"
                width="40"
                height="40"
              />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase dark:text-white"
              >
                Contractor Page
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-black font-semibold capitalize tracking-tight"
              >
                <h2>Help other contractors<br />find you</h2>
                <h2 class="pl-4">Free Advertisement!</h2>
                <h2 class="pl-8">Quick & Easy!</h2>
              </div>

              <p
                class="mt-1 text-xl font-bold italic tracking-tighter text-red-600 uppercase"
              >
                be a show off here!
              </p>

              <div v-show="showMore4">
                <ul
                  class="pt-2 text-md font-semibold text-slate-700 capitalize list-disc"
                >
                  <li>
                    Advertise your services to other contractors looking to hire
                    or sub out!
                  </li>
                  <li>Show off your work through images & video.</li>
                  <li>quick and easy setup!</li>
                </ul>

                <p
                  class="-ml-4 pt-3 text-blue-rgba text-center uppercase font-extrabold"
                >
                  FREE advertisement to your local areas
                </p>

                <p
                  class="-ml-4 pt-4 text-xl text-rose-700 text-center uppercase font-extrabold"
                >
                  ridiculously low cost advertisement!
                </p>
                <p
                  class="-ml-4 text-lg text-blue-rgba text-center capitalize font-extrabold"
                >
                  ... As low as $5 bucks for larger advertisement areas
                </p>
              </div>

              <button
                v-if="!showMore4"
                @click="showMore4 = !showMore4"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
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
                href="#contractorPageFeature"
                v-if="showMore4"
                @click="showMore4 = !showMore4"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-500"
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
        </div>

        <!-- #5 FEATURE MENTORING  -->
        <div class="" id="mentoringFeature">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500"
            >
              <img src="/images/icons/mentor.png" width="40" height="40" />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase dark:text-white"
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
                  tContractor provides this Free service by a renowned Master
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
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
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
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-500"
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
        </div>

        <!-- #6 FEATURE NEW FEAtURES  -->
        <div class="" id="newFeatures">
          <div class="flex flex-row justify-start items-center">
            <div
              class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500"
            >
              <img
                src="/images/icons/under_construc.png"
                width="40"
                height="40"
              />
            </div>

            <div class="flex w-4/5 flex-col justify-center items-start">
              <h1
                class="pl-2 text-2xl min-[450px]:text-3xl sm:text-3xl font-bold text-gray-700 uppercase dark:text-white"
              >
                NEW FEATURES<br />COMING SOON!
              </h1>
            </div>
          </div>

          <div class="flex flex-row justify-start items-start">
            <div class="w-1/5"></div>

            <div class="flex w-4/5 flex-col justify-start">
              <div
                class="pl-4 text-xl text-blue-700 text-center font-bold capitalize tracking-tight"
              >
                <h2>
                  <tContractorWord></tContractorWord> is built & managed by
                  contractors,<br />for contractors & sub-contractors!
                </h2>
              </div>

              <p
                class="mt-1 text-lg text-center font-bold italic tracking-tighter text-red-600 uppercase"
              >
                Always Free<br />Never an upcharge!
              </p>

              <div v-show="showMore6">
                <h2 class="capitalize text-black">
                  tContractor is always adding new features
                </h2>

                <p class="-ml-4 pt-3 text-blue-rgba capitalize font-extrabold">
                  <tContractorWord></tContractorWord> wants to be the most
                  important tool in the toolbox! We are always looking to
                  improve, upgrade our services to you for a
                  <span class="uppercase text-rose-700"
                    >better contruction business!</span
                  >
                </p>

                <p
                  class="-ml-4 pt-4 text-xl text-rose-700 text-center uppercase font-extrabold"
                >
                  NEVER AN UPCHARGE FOR NEW FEATURES
                </p>
              </div>

              <button
                v-if="!showMore6"
                @click="showMore6 = !showMore6"
                class="inline-flex items-center -mx-1 text-md text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
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
                href="#newFeatures"
                v-if="showMore6"
                @click="showMore6 = !showMore6"
                class="inline-flex items-center -mx-1 text-md text-teal-500 capitalize transition-colors duration-300 transform dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-500"
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
        </div>
      </div>
    </div>
  </section>
</template>
