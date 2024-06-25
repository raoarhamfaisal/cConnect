<script setup>
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
import PricingVersions from "@/Components/Pricing/PricingVersions.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { Link } from "@inertiajs/inertia-vue3";
import MoveToTop from "@/Components/MoveToTop.vue";

const props = defineProps({
  showit: Boolean,
});
</script>

<template>
  <Head title="Pricing" />
  <div
    :class="`pt-20 sm:pt-28 pb-2  flex sm:justify-center items-center bg-white   bg-gray-100 `"
  >
    <div
      class="container max-w-7xl max-sm:px-1 sm:px-6 py-2 mx-auto overflow-hidden sm:rounded-lg"
    >
      <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
      <!-- Back Button -->
      <div class="mb-2 sm:mb-2">
        <Link href="/" class="text-blue-500 hover:underline"
          >← Back to Main Page</Link
        >
      </div>
      <div
        class="xl:container bg-white md:mx-auto px-2 py-4 sm:p-6 shadow-md rounded-lg"
      >
        <!-- THE MOST POWERFUL TOOL IN THE TOOLBOX! -->
        <section id="powerfull tool" class="">
          <div class="flex justify-center">
            <span
              class="text-3xl font-bold mb-4 text-center text-blue-rgba border-b-2 border-black"
            >
              THE MOST POWERFUL TOOL IN THE TOOLBOX!
            </span>
          </div>
          <div
            class="flex max-md:flex-col max-md:flex-row-reverse gap-2 sm:gap-4 sm:mt-4"
          >
            <div class="md:w-[50%] max-md:mb-4">
              <ul
                class="text-xl sm:text-2xl font-semibold tracking-tighter list-disc pl-8"
              >
                <li>Find Local or Statewide Subs to Hire!</li>
                <li>Hire Someone You Can Trust - Check Them Out Here!</li>
                <li>Looking For Work - Check Out the News Feed</li>
                <li>Advertise Your Business for Free - Post It!</li>
                <li>Got a Job to be Done, Post it To The News Feed!</li>
                <li>
                  Want to KNOW, what's happening in your local area or Got a
                  Question? Check Out the News Feed!
                </li>
                <li>
                  New Customer - Can you trust Them? See If Other Contractors
                  Had Issues with Them With Using Our Slippery Customers!
                </li>
                <li>Ask Questions / Get Answers!</li>
              </ul>
            </div>
            <div class="md:w-[50%] text-center">
              <h1 class="text-3xl font-bold text-blue-rgba mb-1">
                It's a GAME CHANGER!
              </h1>
              <h2 class="text-2xl font-bold mb-1 text-orange-accent">
                FOR CONTRACTORS & SUB-CONTRACTORS ONLY!
              </h2>
              <p class="text-xl mb-1 text-blue-rgba font-bold">
                No-BRAINER PRICING
              </p>
              <p class="text-sm mb-1 text-xl">
                As Contractors Ourselves, Seems Like Everyone is Trying to Sell
                Us Something At Super - Exorbitant Prices!
              </p>
              <p class="text-xl text-blue-rgba font-bold">
                Not Here at tContractor...
              </p>
              <h3 class="mx-auto text-3xl font-bold text-red-600 max-w-[418px]">
                Your Most Important Tool for Free!!
              </h3>

              <p class="text-xl">for basic services</p>
              <p class="text-xl font-bold text-orange-accent">
                And, A few bucks a month,
              </p>
              <p class="text-xl font-bold text-orange-accent">
                brings you even more!
              </p>
            </div>
          </div>
        </section>
      </div>
      <PricingVersions pageName="pricing" />
    </div>
  </div>

  <WelcomeFooter :showit="showit" />
  <MoveToTop scrollableContainer="app" />
</template>
