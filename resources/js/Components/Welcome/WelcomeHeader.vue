<template>
  <header
    class="absolute top-0 left-0 right-0 z-20 bg-blue-30-rgba"
    style="
      background-image: linear-gradient(
        111.4deg,
        rgba(27, 24, 113, 1) 6.5%,
        rgba(7, 7, 9, 1) 100.2%
      );
    "
  >
    <nav class="container max-w-7xl pr-6 pl-4 sm:px-6 py-2 mx-auto md:px-12">
      <div class="flex items-center justify-between">
        <!-- LOGO -->
        <div class="flex items-center justify-start">
          <Link
            href="/"
            class="text-2xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
          >
            <span
              class="text-green-rgba font-extrabold italic font-serif normal-case"
              >t</span
            >
            <span class="text-white font-extrabold font-sans uppercase">C</span>
            <span class="text-white font-bold font-sans">ontractor</span>
          </Link>
        </div>

        <!-- Cross X Menu Options -->
        <div class="flex items-center justify-end">
          <Link
            @click="$inertia.visit('/#whytContractor')"
            class="hidden md:block mx-3 text-lg font-bold text-white hover:text-blue-rgba cursor-pointer hover:underline hover:underline-offset-8"
          >
            Why tContractor
          </Link>
          <!-- News Feed Button -->
          <div v-if="showit && showNewsFeed">
            <Link
              :href="
                profile && profile.is_payment_verified && profile.active_user
                  ? route('post')
                  : profile && (!profile.is_payment_verified || !profile.active_user)
                  ? (!profile.is_payment_verified && !profile.active_user) 
                  ? '/profile-setup' 
                  : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                  : '/inactive-account'
              "
              class="block flex justify-center items-center mx-2 py-2 sm:py-3 px-3 sm:px-6 font-bold rounded-lg sm:rounded-xl text-white bg-green-600 hover:bg-green-800 border-green-600"
            >
              News Feed
            </Link>
          </div>

          <Link
            href="/about-us#contactUs"
            class="hidden lg:block mx-3 text-lg font-bold text-white hover:text-blue-rgba cursor-pointer hover:underline hover:underline-offset-8"
            :class="`${ url === 'http://0.0.0.0/about-us#contactUs' &&  'bg-gray-300 rounded'}`"
            
          >
            Contact Us
          </Link>

          <!-- Login Button -->
          <div v-if="!showit">
            <Link
              @click="$inertia.visit('/#loginHere')"
              class="block flex justify-center items-center p-1 px-3 sm:p-2 mx-2 sm:px-6 font-bold rounded-xl text-xs sm:text-base text-white bg-blue-800 hover:bg-green-800 border-2 shadow-lg border-green-600"
            >
              Login
            </Link>
          </div>

          <!-- Hamburger menu button -->
          <!-- Hamburger -->
          <div class="-mr-4 sm:-mr-2 flex items-center">
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
                :href="
                  profile && profile.is_payment_verified && profile.active_user
                    ? route('post')
                    : profile && (!profile.is_payment_verified || !profile.active_user)
                    ? (!profile.is_payment_verified && !profile.active_user) 
                    ? '/profile-setup' 
                    : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                    : '/inactive-account'
                "
                class="font-bold"
              >
                News Feed
              </ResponsiveNavLink>
              <ResponsiveNavLink
                v-if="showit"
                :href="
                  profile && profile.is_payment_verified && profile.active_user
                    ? 'sub-finder'
                    : profile && (!profile.is_payment_verified || !profile.active_user)
                    ? (!profile.is_payment_verified && !profile.active_user) 
                    ? '/profile-setup' 
                    : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                    : '/inactive-account'
                "

                class="font-bold"
              >
                Sub Finder
              </ResponsiveNavLink>
              <ResponsiveNavLink
                v-if="showit"
                :href="
                  profile && profile.is_payment_verified && profile.active_user
                    ? 'red-flag'
                    : profile && (!profile.is_payment_verified || !profile.active_user)
                    ? (!profile.is_payment_verified && !profile.active_user) 
                    ? '/profile-setup' 
                    : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                    : '/inactive-account'
                "

                class="font-bold"
              >
                Red Flags
              </ResponsiveNavLink>

              <ResponsiveNavLink
                v-if="showit"
                :href="
                  profile && profile.is_payment_verified && profile.active_user
                    ? route('post')
                    : profile && (!profile.is_payment_verified || !profile.active_user)
                    ? (!profile.is_payment_verified && !profile.active_user) 
                    ? '/profile-setup' 
                    : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                    : '/inactive-account'
                "
                class="font-bold"
              >
                Mentoring
              </ResponsiveNavLink>
              <ResponsiveNavLink
                v-if="showit"
                :href="
                  profile && profile.is_payment_verified && profile.active_user
                    ? `/contractor/${profile.user_id}/edit`
                    : profile && (!profile.is_payment_verified || !profile.active_user)
                    ? (!profile.is_payment_verified && !profile.active_user) 
                    ? '/profile-setup' 
                    : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                    : '/inactive-account'
                "
                class="font-bold"
              >
                Contractor page
              </ResponsiveNavLink>
            </div>
            <!-- Responsive Settings Options -->
            <div class="pb-1 border-t-2 border-gray-400">
              <div class="mt-3 space-y-1">
                <ResponsiveNavLink
                  v-if="showit"
                  :href="
                    profile && profile.is_payment_verified && profile.active_user
                      ? `/posts/${profile.user_id}`
                      : profile && (!profile.is_payment_verified || !profile.active_user)
                      ? (!profile.is_payment_verified && !profile.active_user) 
                      ? '/profile-setup' 
                      : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                      : '/inactive-account'
                  "
                >
                  My Posts
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  v-if="showit"
                  :href="
                    profile && profile.is_payment_verified && profile.active_user
                      ? '/ratings/contractor'
                      : profile && (!profile.is_payment_verified || !profile.active_user)
                      ? (!profile.is_payment_verified && !profile.active_user) 
                      ? '/profile-setup' 
                      : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                      : '/inactive-account'
                  "
                >
                  My Ratings
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  v-if="showit"
                  :href="
                    profile && profile.is_payment_verified && profile.active_user
                      ? '/profile'
                      : profile && (!profile.is_payment_verified || !profile.active_user)
                      ? (!profile.is_payment_verified && !profile.active_user) 
                      ? '/profile-setup' 
                      : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                      : '/inactive-account'
                  "
                >
                  My Profile
                </ResponsiveNavLink>

                <ResponsiveNavLink
                  v-if="showit"
                  :href="
                    profile && profile.is_payment_verified && profile.active_user
                      ? '/settings'
                      : profile && (!profile.is_payment_verified || !profile.active_user)
                      ? (!profile.is_payment_verified && !profile.active_user) 
                      ? '/profile-setup' 
                      : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                      : '/inactive-account'
                  "
                >
                  Settings
                </ResponsiveNavLink>
                <ResponsiveNavLink href="/about-us#contactUs">
                  Contact Us
                </ResponsiveNavLink>

                <ResponsiveNavLink href="/about-us#aboutUs">
                  About Us
                </ResponsiveNavLink>
                <div
                  v-if="isAdminUrl && showit"
                  class="pt-2 pb-2 space-y-1 border-b-2 border-t-2 border-gray-400"
                >
                  <!-- <ResponsiveNavLink href="/admin/regions/contractors">
                    All Contractors
                  </ResponsiveNavLink>
                  <ResponsiveNavLink href="/admin/regions/appealed">
                    Appealed Reviews
                  </ResponsiveNavLink> -->
                  <ResponsiveNavLink 
                    :href="
                      profile && profile.is_payment_verified && profile.active_user
                        ? '/admin'
                        : profile && (!profile.is_payment_verified || !profile.active_user)
                        ? (!profile.is_payment_verified && !profile.active_user) 
                        ? '/profile-setup' 
                        : ((!profile.is_payment_verified && profile.active_user) ? '/pricing-plan' : '/inactive-account')
                        : '/inactive-account'
                    "
                  > 
                    Admin 
                  </ResponsiveNavLink>
                </div>

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
</template>
<script setup>
import { Link, usePage } from "@inertiajs/inertia-vue3";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { Inertia } from "@inertiajs/inertia";
import { getToken } from "@/helpers/localStorageHelper";
import { useStore } from "vuex";

defineProps({
  showit: Boolean,
  showSignUp: {
    type: Boolean,
    default: true,
  },
  showNewsFeed: {
    type: Boolean,
    default: false,
  },
});

const showingNavigationDropdown = ref(false);

const dropdownMenu = ref(null);
const url = usePage().url.value;
console.log(url,usePage(),'url')
const token = ref(false);
const store =  useStore();

//Computed

const isAdminUrl = computed(() => {
  const user = usePage().props.value.auth.user;
  console.log(user);
  if (user) {
    return (
      user.appeals_privileges ||
      user.payments_privileges ||
      user.users_privileges
    );
  }
  return false;
});

const profile = computed(() => store.state.profile.profile);

// Methods

const handleOutsideClick = (e) => {
  if (dropdownMenu.value && !dropdownMenu.value.contains(e.target)) {
    showingNavigationDropdown.value = false;
  }
};

const toggleDropdown = () => {
  showingNavigationDropdown.value = !showingNavigationDropdown.value;
};

onMounted( async() => {
  if (getToken()) {
    console.log(getToken(), token.value, "token");
    await store.dispatch("profile/fetchProfile");
    token.value = true;
  }

  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>
