<script setup>
import TC_LoginForm from "@/Components/TC_LoginForm.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import tContractorWhite from "@/Components/tCon/tContractorWhite.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import ScrollToLinkVue from "@/Components/tCon/ScrollToLink.vue";
import FeaturesGrid from "@/Components/tCon/FeaturesGrid.vue";

defineProps({
  canResetPassword: Boolean,
  status: String,
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,
  showit: Boolean,
});

const showingNavigationDropdown = ref(false);

const form = useForm({
  email: "",
  password: "",
  remember: false,
});
const dropdownMenu = ref(null);

const handleOutsideClick = (e) => {
  console.log(dropdownMenu.value, "target");
  if (dropdownMenu.value && !dropdownMenu.value.contains(e.target)) {
    showingNavigationDropdown.value = false;
  }
};

const toggleDropdown = () => {
  showingNavigationDropdown.value = !showingNavigationDropdown.value;
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const submit = () => {
  form.post(route("login"), {
    onFinish: () => form.reset("password"),
  });
};
</script>

<template>
  <Head title="Welcome" />

  <div class="relative h-screen bg-white">
    <!-- bg-gray-200 -->
    <img
      src="/images/pages/bg_a_xl_white.jpg"
      class="absolute object-cover w-full h-full"
    />
    <!-- <div class="absolute inset-0 bg-black opacity-10"></div> -->

    <header class="absolute top-0 left-0 right-0 z-20 bg-blue-30-rgba">
      <nav class="container max-w-7xl px-6 py-2 mx-auto md:px-12">
        <div class="flex items-center justify-between">
          <!-- LOGO -->
          <div class="flex items-center justify-start">
            <Link
              href="/"
              class="text-2xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
            >
              <tContractorWord />
            </Link>
          </div>

          <!-- Cross X Menu Options -->
          <div class="flex items-center justify-end">
            <ScrollToLinkVue
              href="#whytContractor"
              class="hidden md:block mx-3 text-lg font-bold text-white hover:text-blue-rgba cursor-pointer hover:underline hover:underline-offset-8"
            >
              Why tContractor
            </ScrollToLinkVue>

            <Link
              href="#"
              class="hidden lg:block mx-3 text-lg font-bold text-white hover:text-blue-rgba cursor-pointer hover:underline hover:underline-offset-8"
            >
              Contact Us
            </Link>

            <!-- News Feed Button -->
            <div v-if="showit">
              <Link
                :href="route('post')"
                class="block flex justify-center items-center mx-2 p-3 px-6 font-bold rounded-xl text-white bg-green-600 hover:bg-green-800 border-green-600"
              >
                News Feed
              </Link>
            </div>

            <!-- Login Button -->
            <div v-if="!showit">
              <ScrollToLinkVue
                href="#loginHere"
                class="block flex justify-center items-center p-2 mx-2 px-6 font-bold rounded-xl text-white bg-blue-800 hover:bg-green-800 border-2 shadow-lg border-green-600"
              >
                Login
              </ScrollToLinkVue>
            </div>

            <!-- Hamburger menu button -->
            <!-- Hamburger -->
            <div class="-mr-2 flex items-center">
              <button
                ref="dropdownMenu"
                @click="toggleDropdown"
                class="inline-flex items-center justify-center p-2 rounded-md text-black text-gray-500 bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  class="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    :class="{
                      hidden: showingNavigationDropdown,
                      'inline-flex': !showingNavigationDropdown,
                    }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    :class="{
                      hidden: !showingNavigationDropdown,
                      'inline-flex': showingNavigationDropdown,
                    }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- HAMBURGER Navigation Menu -->
        <div
          :class="{
            block: showingNavigationDropdown,
            hidden: !showingNavigationDropdown,
          }"
          class="absolute top-16 right-4 sm:right-6 lg:right-20 xl:right-32 2xl:right-80 z-30 px-3 text-left border-b border-gray-400 rounded-xl bg-gray-100 flex"
        >
          <div class="">
            <div class="pt-4 pb-2 ml-3 border-b-2 border-gray-400">
              <div class="font-bold text-base text-gray-800">
                <div v-if="showit">{{ $page.props.auth.user.name }}</div>
                <div v-if="!showit">Not Logged In</div>
              </div>
              <div v-if="showit" class="font-medium text-sm text-gray-500">
                {{ $page.props.auth.user.email }}
              </div>
            </div>
            <div class="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink href="#whytContractor">
                Why <tContractorWord></tContractorWord>
              </ResponsiveNavLink>

              <ResponsiveNavLink
                v-if="showit"
                :href="route('post')"
                :active="route().current('post')"
                class="font-bold"
              >
                News Feed
              </ResponsiveNavLink>

              <ResponsiveNavLink :href="route('index')">
                Contact Us
              </ResponsiveNavLink>

              <ResponsiveNavLink :href="route('index')">
                About Us
              </ResponsiveNavLink>
            </div>
            <!-- Responsive Settings Options -->
            <div class="pt-4 pb-1 border-t-2 border-gray-400">
              <div class="mt-3 space-y-1">
                <ResponsiveNavLink v-if="showit" :href="route('profile.edit')">
                  Profile
                </ResponsiveNavLink>

                <ResponsiveNavLink
                  v-if="showit"
                  :href="route('post')"
                  :active="route().current('post')"
                >
                  View Settings
                </ResponsiveNavLink>

                <ResponsiveNavLink
                  v-if="showit"
                  :href="route('logout')"
                  method="post"
                  as="button"
                  @click="
                    showingNavigationDropdown = !showingNavigationDropdown
                  "
                >
                  Log Out
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  v-if="!showit"
                  :href="route('signup')"
                  as="button"
                  class="text-blue-rgba font-bold"
                >
                  Sign Up
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  v-if="!showit"
                  href="#loginHere"
                  as="button"
                  @click="
                    showingNavigationDropdown = !showingNavigationDropdown
                  "
                >
                  Log In
                </ResponsiveNavLink>
              </div>
            </div>
          </div>
          <button
            @click="toggleDropdown"
            class="self-start inline-flex items-start justify-center p-2 rounded-md text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                :class="{
                  hidden: !showingNavigationDropdown,
                  'inline-flex': showingNavigationDropdown,
                }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <!-- Annoucement  -->
    <section>
      <div
        class="container relative max-w-7xl z-10 flex items-center px-6 pt-32 pb-5 mx-auto md:px-10 xl:py-30"
      >
        <!-- Bow YOU Too **********************     -->
        <div
          class="relative z-10 flex flex-col items-start min-[500px]:w-3/5 md:w-3/5 xl:w-2/5 bg-blue-30-rgba rounded-xl border border-blue-rgba shadow-lg p-2 py-4 px-4"
        >
          <!-- LOGO -->
          <h2 class="sm:hidden text-4xl font-bold tracking-wide text-center">
            <tContractorWord></tContractorWord>
          </h2>

          <span class="font-bold text-slate-300 uppercase">
            Better Construction!
          </span>
          <h1
            class="mt-4 text-4xl sm:text-5xl font-bold text-white tracking-tighter capitalize"
          >
            Want access to the most powerful tool in construction?
          </h1>

          <Link
            class="group flex items-center justify-between rounded-xl border border-red-500 bg-red-500 px-5 py-3 mt-8 transition-colors hover:bg-red-800 focus:outline-none focus:ring"
            :href="route('signup')"
          >
            <span
              class="text-lg font-bold text-white uppercase transition-colors group-hover:font-extrabold group-active:text-indigo-500"
            >
              Get Started
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
      </div>
    </section>

    <!-- LOGIN & FEATURES SECTION  -->
    <section class="relative">
      <div
        class="container lg:max-w-4xl xl:max-w-7xl z-20 mx-auto mt-4 md:px-12 py-10 sm:px-20 lg:px-8 bg-slate-30-rgba text-gray-700 rounded-xl"
      >
        <!-- WITHOUT LOG IN OPTION /  showit = true -->
        <div v-if="showit" class="max-w-lg">
          <h2 class="text-3xl font-bold sm:text-4xl">
            Why Do You need
            <br />
            <span class="text-center text-4xl sm:text-6xl"
              ><tContractorWord /> ?</span
            >
          </h2>

          <p
            class="mt-4 text-center text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            To Increase Your Bottom Line & Peace of Mind!
          </p>
          <p class="mt-4 text-center text-2xl font-semibold text-gray-800">
            From Searching for Locally Vetted Sub-Contractors, to Finding Jobs,
            Getting Bids... <br />to Free Advertising.
          </p>
        </div>

        <!-- WITH LOG IN OPTION /  showit = false -->
        <div
          v-if="!showit"
          id="loginHere"
          class="grid grid-cols-1 md:grid-cols-2 mt-0 md:mt-0 gap-6 md:gap-2"
        >
          <!-- Top or at md size Left Side -->
          <div class="flex flex-col flex-shrink-0 justify-center items-center">
            <h2 class="text-3xl font-bold sm:text-4xl md:max-lg:text-3xl">
              Why Do You need
              <br />
              <span class="text-center text-4xl sm:text-6xl md:max-lg:text-4xl">
                <tContractorWord /> ?
              </span>
            </h2>
            <p
              class="mt-4 text-center text-3xl sm:text-4xl font-extrabold text-slate-900"
            >
              To Increase Your Bottom Line & Peace of Mind!
            </p>
            <p class="mt-4 text-center text-2xl font-semibold text-gray-800">
              From Searching for Locally Vetted Sub-Contractors, to Finding
              Jobs, Getting Bids... <br />to Free Advertising.
            </p>
          </div>

          <!-- LOGIN Bottom or at md size display right -->
          <div
            class="flex flex-col flex-shrink-0 justify-center items-center p-3 bg-stone-100 border-2 border-blue-rgba rounded-xl shadow-xl"
          >
            <div class="mx-auto pt-0">
              <p class="text-green-800 text-center font-bold pb-2 text-xl">
                Login in to Join The Private Community For the Construction
                Trades!
              </p>
            </div>

            <!-- LOGIN FORM -->
            <TC_LoginForm />
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES SECTION  -->
    <section
      class="relative z-20 bg-white md:mt-24 lg:mt-28 xl:mt-32 2xl:mt-40"
      id="whytContractor"
    >
      <FeaturesGrid></FeaturesGrid>
    </section>

    <!-- CALL TO ACTION SECTION -->
    <section id="cta" class="relative bg-red-600">
      <!-- CTA CONTAINER -->
      <div class="">
        <div
          class="container flex flex-col-reverse md:flex-row items-center justify-around mx-auto my-0 p-6 space-y-10"
        >
          <!-- left side or bottom -->
          <div class="flex flex-col space-y-2 pt-6 md:pt-0 px-4 md:px-0">
            <div class="">
              <Link
                href="/"
                class="text-5xl md:text-6xl font-bold tracking-wide text-center"
              >
                <tContractorWhite />
              </Link>
            </div>
            <div>
              <ul
                class="capitalize text-xl font-semibold tracking-tighter list-disc"
              >
                <li>Locate subs to hire</li>
                <li>Find local work & job bids</li>
                <li>Be aware of whats up in your area!</li>
                <li>Check for slippery customers!</li>
                <li>Questions & Answers!</li>
                <li>Low cost targeted advertising!</li>
                <li>Mentoring: go the next level with Mentoring!</li>
                <li class="lg:max-w-md">
                  <span class="font-bold italic">"No-Brainer Pricing"</span>
                  &nbsp;- As contractors ourselves, seems like everyone is
                  trying to sell us something at super - exorbitant prices!
                  <span class="font-extrabold text-white normal-case"
                    >&nbsp;Not Here at&nbsp; <tContractorWhite /></span
                  >&nbsp;... useful tools, decently priced!
                </li>
              </ul>
            </div>
          </div>

          <!-- right side or top -->
          <div class="flex flex-col justify-center">
            <div class="text-3xl text-black font-bold">
              <p class="tracking-tight">Your Top Tool For Only</p>
            </div>
            <div class="flex flex-row justify-center">
              <div
                class="flex text-5xl justify-start font-extrabold text-green-rgba"
              >
                <span class="pt-10">$</span>
              </div>
              <div class="price">
                <span>29</span>
              </div>
              <div
                class="flex text-xl justify-end items-end italic text-blue-rgba pb-10"
              >
                <span>/month</span>
              </div>
            </div>
            <!-- Button Flex Item -->
            <div class="flex justify-center items-end">
              <Link
                :href="route('signup')"
                class="p-3 px-6 pt-2 text-red bg-white rounded-lg border-white border-spacing-3 shadow-2xl shadow-black align-baseline hover:text-white hover:bg-blue-30-rgba"
                >Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
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
            Copyright &copy; 2023, All Rights Reserved
          </div>

          <!-- LOGO -->
          <div>
            <Link
              href="/"
              class="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
            >
              <tContractorWhite />
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
            <a href="#" class="hover:text-blue-400">Home</a>
            <a href="#" class="hover:text-blue-400">Pricing</a>
            <a href="#" class="hover:text-blue-400">Contact Us</a>
          </div>
          <!-- Second Menu List -->
          <div class="flex flex-col space-y-3 text-white">
            <a href="#" class="hover:text-blue-400"> Careers</a>
            <a href="#" class="hover:text-blue-400"> Terms of Service</a>
            <a href="#" class="hover:text-blue-400"> Privacy Policy</a>
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
                Get Started
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
                News Feed
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
            Copyright &copy; 2023, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.price {
  color: white;
  font-weight: bolder;
  font-size: 120px;
  text-shadow: 5px 5px 0 #000;
}
</style>
