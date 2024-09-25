<template>
  <footer class="bg-blue-rgba">
    <!-- FLEX CONTAINER -->
    <div
      class="container flex flex-col-reverse md:flex-row justify-between py-12 px-6 mx-auto gap-x-3 md:gap-x-5 space-y-8 md:space-y-0"
    >
      <!-- Logo and social links container -->
      <div
        class="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start"
      >
        <!-- COPYRIGHT 2 different ones depending
                            This one for mobile
                            (we are using flex-col-reverse - we put
                            it first for last place postioning)-->
        <div
          class="mx-auto my-6 text-center first-letter: text-white md:hidden"
        >
          Copyright &copy; 2024, All Rights Reserved
        </div>

        <!-- LOGO -->
        <div>
          <Link
            href="/"
            class="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
          >
            <cConnectWhite />
          </Link>
        </div>

        <!-- Social Links Container -->
        <div class="flex justify-center space-x-4">
          <!-- Link 1 Facebook -->
          <a href="#">
            <img src="/images/icons/icon-facebook.svg" alt="" class="h-8" />
          </a>
          <!-- Link 3 Twitter -->
          <a href="#">
            <img src="/images/icons/icon-twitter.svg" alt="" class="h-8" />
          </a>
          <!-- Link 5 instagram -->
          <a href="#">
            <img src="/images/icons/icon-instagram.svg" alt="" class="h-8" />
          </a>
        </div>
      </div>

      <!-- List Menu Container -->
      <div class="flex justify-evenly space-x-10">
        <!-- First Menu List -->
        <div class="flex flex-col space-y-3 text-white">
          <a href="/" class="hover:text-blue-400">{{
            translations && translations.home
          }}</a>
          <a href="/pricing" class="hover:text-blue-400">{{
            translations && translations.pricing
          }}</a>
          <Link href="/pricing#faqs" class="hover:text-blue-400">{{
            translations && translations.faqs
          }}</Link>

          <a href="/about-us#contactUs" class="hover:text-blue-400">{{
            translations && translations.contact_us
          }}</a>
        </div>
        <!-- Second Menu List -->
        <div class="flex flex-col space-y-3 text-white">
          <a href="/careers" class="hover:text-blue-400">
            {{ translations && translations.careers }}</a
          >
          <a href="/terms-of-service" class="hover:text-blue-400">
            {{ translations && translations.terms_of_service }}</a
          >
          <a href="/privacy-policy" class="hover:text-blue-400">
            {{ translations && translations.privacy_policy }}</a
          >
          <a href="/gomobile" class="hover:text-blue-400">
            {{ translations && translations.go_mobile }}</a
          >
        </div>
      </div>

      <!-- Buttons Container -->
      <div class="flex flex-col justify-between">
        <!-- Get Started Button & Arrow -->
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

        <!-- NEWS FEED BUTTON -->
        <div v-if="showit" class="flex justify-center space-x-3">
          <Link
            :href="route('post')"
            class="group flex items-center justify-between rounded-xl border border-green-600 bg-green-600 hover:bg-green-800 px-5 py-3 mt-8 transition-colors focus:outline-none focus:ring"
            preserve-scroll
          >
            <span
              class="text-lg font-bold text-white uppercase transition-colors group-hover:font-extrabold group-active:text-indigo-500"
            >
              {{ translations && translations.news_feed }}
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

        <!-- COPYRIGHT 2 different ones depending
                            on screen size on Mobile its under
                            logo above-->
        <div
          class="hidden text-white md:block mx-auto my-6 text-center first-letter:"
        >
          Copyright &copy; 2024, All Rights Reserved
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import cConnectWhite from "@/Components/tCon/cConnectWhite.vue";
import { useStore } from "vuex";
import { computed } from "vue";

defineProps({
  showit: Boolean,
});

const store = useStore();

const translations = computed(() => store.getters.translations);
</script>
