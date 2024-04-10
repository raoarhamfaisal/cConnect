<script setup>
import Checkbox from "@/Components/Checkbox.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import tContractorWhite from "@/Components/tCon/tContractorWhite.vue";
import { checkCompatEnabled } from "@vue/compiler-core";
import { ref, watch, onMounted } from "vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import TC_SignupForm from "@/Components/TC_SignupForm.vue";

const { showit } = defineProps({
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

const submit = () => {
  form.post(route("login"), {
    onFinish: () => form.reset("password"),
  });
};

// watch()

watch(
  () => showit,
  () => {
    console.log("showit");
    if (showit) {
    }
  }
);

onMounted(() => {});
</script>

<template>
  <Head title="tContractor" />

  <div class="relative h-screen bg-gray-200">
    <img
      src="/images/pages/bg_a_xl.jpg"
      class="absolute object-cover w-full h-full"
    />
    <!-- <div class="absolute inset-0 bg-black opacity-10"></div> -->

    <header class="absolute top-0 left-0 right-0 z-10 bg-blue-30-rgba">
      <nav class="container px-6 py-2 mx-auto md:px-12">
        <div class="flex items-center justify-between">
          <!-- LOGO -->
          <div class="flex items-center justify-start">
            <Link
              href="/"
              class="hidden sm:block sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
            >
              <tContractorWord />
            </Link>
          </div>

          <!-- Cross X Menu Options -->
          <div class="flex items-center justify-end">
            <Link
              href="#whytContractor"
              class="hidden md:block mx-3 text-lg font-bold text-white hover:text-blue-rgba cursor-pointer hover:underline hover:underline-offset-8"
            >
              Why tContractor
            </Link>
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
                class="block mt-3 mr-2 p-3 px-6 pt-2 font-bold rounded-xl text-white bg-green-600 hover:bg-green-800 border-green-600"
              >
                News Feed
              </Link>
            </div>

            <!-- Login Button -->
            <div v-if="!showit">
              <Link
                :href="route('post')"
                class="block mt-3 mr-2 p-3 px-6 pt-2 font-bold rounded-xl text-white bg-blue-800 hover:bg-green-800 border-2 shadow-lg border-green-600"
              >
                Login
              </Link>
            </div>

            <!-- Hamburger menu button -->
            <!-- Hamburger -->
            <div class="-mr-2 flex items-center">
              <button
                @click="showingNavigationDropdown = !showingNavigationDropdown"
                class="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
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
                  View
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
                  :href="route('logout')"
                  method="post"
                  as="button"
                  class="text-blue-rgba font-bold"
                >
                  Sign Up
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  v-if="!showit"
                  :href="route('logout')"
                  method="post"
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
            @click="showingNavigationDropdown = !showingNavigationDropdown"
            class="inline-flex items-start justify-center p-2 rounded-md text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
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

    <!-- Signup Section  -->
    <section class="relative">
      <div
        class="container lg:max-w-4xl xl:max-w-7xl z-20 mx-auto mt-4 md:px-12 py-10 sm:px-20 lg:px-8 bg-slate-30-rgba text-gray-700 rounded-xl"
      ></div>
    </section>
  </div>
</template>
