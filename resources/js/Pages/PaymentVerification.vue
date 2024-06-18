<script setup>
import TC_LoginForm from "@/Components/TC_LoginForm.vue";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-vue3";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import tContractorWhite from "@/Components/tCon/tContractorWhite.vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import ScrollToLinkVue from "@/Components/tCon/ScrollToLink.vue";
import FeaturesGrid from "@/Components/tCon/FeaturesGrid.vue";
import { Inertia } from "@inertiajs/inertia";
import { removeToken } from "@/helpers/localStorageHelper";
import { useStore } from "vuex";

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
const store = useStore();

//Computed

const isAdminUrl = computed(() => {
  if (usePage().props.value.auth.user) {
    return usePage().props.value.auth.user.appeals_privileges === 1;
  }
  return false;
});

// Methods

const handleOutsideClick = (e) => {
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
function handleLogout() {
  removeToken();
  showingNavigationDropdown.value = !showingNavigationDropdown.value;
  Inertia.post("/logout");
  store.commit("setUserVersion", 0);
}
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
            <div class="pt-4 pb-2 pl-3 border-b-2 border-gray-400">
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
              <ResponsiveNavLink v-if="showit" href="/ratings/contractor">
                My Ratings
              </ResponsiveNavLink>
            </div>
            <!-- Responsive Settings Options -->
            <div class="pb-1 border-t-2 border-gray-400">
              <div class="mt-3 space-y-1">
                <ResponsiveNavLink v-if="showit" :href="route('profile.edit')">
                  Profile
                </ResponsiveNavLink>

                <ResponsiveNavLink
                  v-if="showit"
                  :href="route('post')"
                  :active="route().current('post')"
                >
                  View
                </ResponsiveNavLink>
                <ResponsiveNavLink :href="route('index')">
                  Contact Us
                </ResponsiveNavLink>

                <ResponsiveNavLink :href="route('index')">
                  About Us
                </ResponsiveNavLink>
                <div
                  v-if="isAdminUrl && showit"
                  class="pt-2 pb-3 space-y-1 border-b-2 border-t-2 border-gray-400"
                >
                  <ResponsiveNavLink href="/admin/regions/contractors">
                    All Contractors
                  </ResponsiveNavLink>
                  <ResponsiveNavLink href="/admin/regions/appealed">
                    Appealed Reviews
                  </ResponsiveNavLink>
                </div>

                <ResponsiveNavLink
                  v-if="showit"
                  @click="handleLogout"
                  method="post"
                  as="button"
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

    <!-- Payment Verification  -->
    <section>
      <h1>Verify Payments</h1>
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
            Copyright &copy; 2024, All Rights Reserved
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
            Copyright &copy; 2024, All Rights Reserved
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
