<script setup>
import TC_LoginForm from "@/Components/TC_LoginForm.vue";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-vue3";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import tContractorWhite from "@/Components/tCon/tContractorWhite.vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import ScrollToLinkVue from "@/Components/tCon/ScrollToLink.vue";
import FeaturesGrid from "@/Components/tCon/FeaturesGrid.vue";
import { useStore } from "vuex";
import { getToken, removeToken } from "@/helpers/localStorageHelper";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";
import { Inertia } from "@inertiajs/inertia";
import { Icon } from "@iconify/vue";

defineProps({
  showit: Boolean,
});

const animate = ref(false);
const loading = ref(false);
const showingNavigationDropdown = ref(false);
const pricingPlan = ref({});
const form = useForm({
  email: "",
  password: "",
  remember: false,
});
const dropdownMenu = ref(null);
let lang = localStorage.getItem("lang");
if (!lang) {
  lang = "english";
  localStorage.setItem("lang", "english");
}
const selectedLanguage = ref(lang);
const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
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
const userVersion = computed(() => store.getters.userVersion);
const notFreeVersion = computed(
  () => userVersion.value !== 0 && userVersion.value !== 1
);

const getStartedButtonText = computed(() => {
  if (getToken() && profile.value && profile.value.id) {
    console.log("this get executed successfully");
    return userVersion.value === 0
      ? translations.value && translations.value.get_started
      : userVersion.value === 1
      ? translations.value && translations.value.upgrade_now
      : translations.value && translations.value.news_feed;
  } else {
    return translations.value && translations.value.get_started;
  }
});
const newsFeedUrl = computed(() => {
  return profile.value &&
    profile.value.id &&
    profile.value.is_payment_verified &&
    profile.value.active_user &&
    userVersion.value !== 0
    ? route("post")
    : profile.value &&
      profile.value.id &&
      (!profile.value.is_payment_verified || !profile.value.active_user)
    ? !profile.value.is_payment_verified && !profile.value.active_user
      ? "/profile-setup"
      : !profile.value.is_payment_verified && profile.value.active_user
      ? "/pricing-plan"
      : "/inactive-account"
    : "/inactive-account";
});
const getStartedButtonUrl = computed(() => {
  return profile.value &&
    profile.value.id &&
    profile.value.is_payment_verified &&
    profile.value.active_user &&
    userVersion.value === 1
    ? "/settings"
    : profile.value &&
      profile.value.id &&
      profile.value.is_payment_verified &&
      profile.value.active_user &&
      (userVersion.value === 2 || userVersion.value === 3)
    ? route("post")
    : profile.value &&
      profile.value.id &&
      (!profile.value.is_payment_verified || !profile.value.active_user)
    ? !profile.value.is_payment_verified && !profile.value.active_user
      ? "/profile-setup"
      : !profile.value.is_payment_verified && profile.value.active_user
      ? "/pricing-plan"
      : "/inactive-account"
    : route("signup");
});

const settingTabBillingSelection = () => {
  if (
    profile.value &&
    profile.value.id &&
    profile.value.is_payment_verified &&
    profile.value.active_user &&
    userVersion.value === 1
  ) {
    localStorage.setItem("activeTab", 2);
  }
};

// Methods

const handleOutsideClick = (e) => {
  if (dropdownMenu.value && !dropdownMenu.value.contains(e.target)) {
    showingNavigationDropdown.value = false;
  }
};

const toggleDropdown = () => {
  showingNavigationDropdown.value = !showingNavigationDropdown.value;
};

onMounted(async () => {
  await store.dispatch("fetchUserVersion");
  if (userVersion.value !== 0) {
    fetchPricingCardDetails();
  }
  if (getToken()) {
    console.log("inside token");
    await store.dispatch("profile/fetchProfile");
  }
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

onMounted(() => {
  animate.value = true;
});

const fetchPricingCardDetails = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `/api/payment-info-of-a-region/1`,
      getAxiosConfig()
    );
    console.log(response, "response");
    if (response.data) {
      pricingPlan.value = { ...response.data.paymentInfo };
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price) => {
  const num = parseFloat(price);
  if (Math.floor(num) === num) {
    return Math.floor(num).toString();
  }
  return num.toString();
};

const handleLogout = () => {
  removeToken();
  showingNavigationDropdown.value = !showingNavigationDropdown.value;
  Inertia.post("/logout");
  store.commit("setUserVersion", 0);
};

const onSelectLang = (lang) => {
  localStorage.setItem("lang", lang);
  selectedLanguage.value = lang;
  store.commit("setTranlations", lang);
};
</script>

<template>
  <Head :title="translations && translations.welcome" />
  <div
    v-if="loading"
    class="h-full h-[100vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
  >
    <div class="text-center text-xl">
      {{ translations && translations.loading }}
    </div>
    <v-progress-linear
      color="#241e6d"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>
  </div>
  <div
    v-if="
      !loading &&
      translations &&
      translations &&
      Object.keys(translations).length > 0
    "
    class="relative h-screen bg-white"
  >
    <!-- bg-gray-200 -->
    <img
      :class="{ 'animate-scale': animate }"
      src="/images/pages/bg_a_xl_white.jpg"
      class="absolute object-cover w-full h-full mt-14"
    />
    <!-- <div class="absolute inset-0 bg-black opacity-10"></div> -->

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
              class="text-xl x350:text-2xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
            >
              <tContractorWhite />
            </Link>
          </div>

          <!-- Cross X Menu Options -->
          <div class="flex items-center justify-end">
            <ScrollToLinkVue
              href="#whytContractor"
              class="hidden md:block mx-3 text-lg font-bold text-white hover:text-blue-rgba cursor-pointer hover:underline hover:underline-offset-8"
            >
              {{ translations && translations.why }} tContractor
            </ScrollToLinkVue>

            <Link
              href="/about-us#contactUs"
              class="hidden lg:block mx-3 text-lg font-bold text-white hover:text-blue-rgba cursor-pointer hover:underline hover:underline-offset-8"
            >
              {{ translations && translations.contact_us }}
            </Link>

            <v-menu open-on-hover open-on-click>
              <template v-slot:activator="{ props }">
                <div
                  class="cursor-pointer flex gap-1 items-center justify-center"
                  v-bind="props"
                >
                  <img
                    v-if="selectedLanguage === 'english'"
                    style="border: 1px solid #ccc"
                    class="h-8 w-8 sm:h-10 sm:w-10 rounded-full block object-contain"
                    src="@/Pages/assets/usa.svg"
                  />
                  <img
                    v-else
                    style="border: 1px solid #ccc"
                    class="h-8 w-8 sm:h-10 sm:w-10 rounded-full block object-contain"
                    src="@/Pages/assets/spanish.svg"
                  />
                  <Icon
                    class="max-sm:hidden block w-4 h-4 hover:rotate-180 transition duration-150 ease-in-out"
                    icon="mingcute:down-fill"
                    color="white"
                  ></Icon>
                </div>
              </template>
              <v-list class="mt-2">
                <v-list-item
                  class="hover:bg-gray-200"
                  @click="onSelectLang('english')"
                >
                  <div
                    class="flex justify-left items-center gap-2 font-bold w-32"
                  >
                    <img
                      style="border: 1px solid #ccc"
                      class="h-8 w-8 object-contain block rounded-full"
                      src="@/Pages/assets/usa.svg"
                    />

                    <div>English</div>
                  </div>
                </v-list-item>
                <v-list-item
                  class="hover:bg-gray-200"
                  @click="onSelectLang('spanish')"
                >
                  <div
                    class="flex justify-left items-center gap-2 font-bold w-44"
                  >
                    <img
                      style="border: 1px solid #ccc"
                      class="h-8 w-8 object-contain block rounded-full"
                      src="@/Pages/assets/spanish.svg"
                    />
                    <div>Spanish / Mexican</div>
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- News Feed Button -->
            <div v-if="showit">
              <Link
                :href="newsFeedUrl"
                class="block flex justify-center items-center mx-1 x365:mx-2 py-[6px] x365:py-2 sm:py-3 px-2 x365:px-3 sm:px-6 font-bold rounded-lg sm:rounded-xl text-white bg-green-600 max-x365:text-sm hover:bg-green-800 border-green-600"
              >
                {{ translations && translations.news_feed }}
              </Link>
            </div>

            <!-- Login Button -->
            <div v-if="!showit">
              <ScrollToLinkVue
                href="#loginHere"
                class="block flex justify-center items-center p-1 px-3 sm:p-2 mx-2 sm:px-6 font-bold rounded-xl text-xs sm:text-base text-white bg-blue-800 hover:bg-green-800 border-2 shadow-lg border-green-600"
              >
                {{ translations && translations.login }}
              </ScrollToLinkVue>
            </div>

            <!-- Hamburger menu button -->
            <!-- Hamburger -->
            <div class="-mr-4 sm:-mr-2 flex items-center">
              <button
                ref="dropdownMenu"
                @click="toggleDropdown"
                class="inline-flex items-center justify-center p-[6px] x365:p-2 rounded-md text-black text-gray-500 bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  class="h-4 w-4 x365:h-6 x365:w-6"
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
                <div v-if="!showit">
                  {{ translations && translations.not_logged_in }}
                </div>
              </div>
              <div v-if="showit" class="font-medium text-sm text-gray-500">
                {{ $page.props.auth.user.email }}
              </div>
            </div>

            <div class="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink href="#whytContractor">
                {{ translations && translations.why }}
                <tContractorWord></tContractorWord>
              </ResponsiveNavLink>

              <ResponsiveNavLink
                v-if="showit"
                :href="newsFeedUrl"
                class="font-bold"
              >
                {{ translations && translations.news_feed }}
              </ResponsiveNavLink>
              <ResponsiveNavLink
                v-if="showit"
                :href="
                  profile &&
                  profile.id &&
                  profile.is_payment_verified &&
                  profile.active_user
                    ? 'sub-finder'
                    : profile &&
                      profile.id &&
                      (!profile.is_payment_verified || !profile.active_user)
                    ? !profile.is_payment_verified && !profile.active_user
                      ? '/profile-setup'
                      : !profile.is_payment_verified && profile.active_user
                      ? '/pricing-plan'
                      : '/inactive-account'
                    : '/inactive-account'
                "
                class="font-bold"
              >
                {{ translations && translations.sub_finder }}
              </ResponsiveNavLink>
              <ResponsiveNavLink
                v-if="showit"
                :href="
                  profile &&
                  profile.id &&
                  profile.is_payment_verified &&
                  profile.active_user
                    ? 'red-flag'
                    : profile &&
                      profile.id &&
                      (!profile.is_payment_verified || !profile.active_user)
                    ? !profile.is_payment_verified && !profile.active_user
                      ? '/profile-setup'
                      : !profile.is_payment_verified && profile.active_user
                      ? '/pricing-plan'
                      : '/inactive-account'
                    : '/inactive-account'
                "
                class="font-bold"
              >
                {{ translations && translations.red_flags }}
              </ResponsiveNavLink>

              <!-- <ResponsiveNavLink
                v-if="showit"
                :href="
                  profile &&
                  profile.id &&
                  profile.is_payment_verified &&
                  profile.active_user
                    ? route('post')
                    : profile &&
                      profile.id &&
                      (!profile.is_payment_verified || !profile.active_user)
                    ? !profile.is_payment_verified && !profile.active_user
                      ? '/profile-setup'
                      : !profile.is_payment_verified && profile.active_user
                      ? '/pricing-plan'
                      : '/inactive-account'
                    : '/inactive-account'
                "
                class="font-bold"
              >
                Mentoring
              </ResponsiveNavLink> -->
              <ResponsiveNavLink
                v-if="showit"
                :href="
                  profile &&
                  profile.id &&
                  profile.is_payment_verified &&
                  profile.active_user
                    ? `/contractor/${profile.user_id}/edit`
                    : profile &&
                      profile.id &&
                      (!profile.is_payment_verified || !profile.active_user)
                    ? !profile.is_payment_verified && !profile.active_user
                      ? '/profile-setup'
                      : !profile.is_payment_verified && profile.active_user
                      ? '/pricing-plan'
                      : '/inactive-account'
                    : '/inactive-account'
                "
                class="font-bold"
              >
                {{ translations && translations.contractor_page }}
              </ResponsiveNavLink>
            </div>
            <!-- Responsive Settings Options -->
            <div class="pb-1 border-t-2 border-gray-400">
              <div class="mt-3 space-y-1">
                <ResponsiveNavLink
                  v-if="showit"
                  :href="
                    profile &&
                    profile.id &&
                    profile.is_payment_verified &&
                    profile.active_user
                      ? `/posts/${profile.user_id}`
                      : profile &&
                        profile.id &&
                        (!profile.is_payment_verified || !profile.active_user)
                      ? !profile.is_payment_verified && !profile.active_user
                        ? '/profile-setup'
                        : !profile.is_payment_verified && profile.active_user
                        ? '/pricing-plan'
                        : '/inactive-account'
                      : '/inactive-account'
                  "
                >
                  {{ translations && translations.my_posts }}
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  v-if="showit"
                  :href="
                    profile &&
                    profile.id &&
                    profile.is_payment_verified &&
                    profile.active_user
                      ? '/ratings/contractor'
                      : profile &&
                        profile.id &&
                        (!profile.is_payment_verified || !profile.active_user)
                      ? !profile.is_payment_verified && !profile.active_user
                        ? '/profile-setup'
                        : !profile.is_payment_verified && profile.active_user
                        ? '/pricing-plan'
                        : '/inactive-account'
                      : '/inactive-account'
                  "
                >
                  {{ translations && translations.my_ratings }}
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  v-if="showit"
                  :href="
                    profile &&
                    profile.id &&
                    profile.is_payment_verified &&
                    profile.active_user
                      ? '/profile'
                      : profile &&
                        profile.id &&
                        (!profile.is_payment_verified || !profile.active_user)
                      ? !profile.is_payment_verified && !profile.active_user
                        ? '/profile-setup'
                        : !profile.is_payment_verified && profile.active_user
                        ? '/pricing-plan'
                        : '/inactive-account'
                      : '/inactive-account'
                  "
                >
                  {{ translations && translations.my_profile }}
                </ResponsiveNavLink>

                <ResponsiveNavLink
                  v-if="showit"
                  :href="
                    profile &&
                    profile.id &&
                    profile.is_payment_verified &&
                    profile.active_user
                      ? '/settings'
                      : profile &&
                        profile.id &&
                        (!profile.is_payment_verified || !profile.active_user)
                      ? !profile.is_payment_verified && !profile.active_user
                        ? '/profile-setup'
                        : !profile.is_payment_verified && profile.active_user
                        ? '/pricing-plan'
                        : '/inactive-account'
                      : '/inactive-account'
                  "
                >
                  {{ translations && translations.settings }}
                </ResponsiveNavLink>
                <ResponsiveNavLink href="/about-us#contactUs">
                  {{ translations && translations.contact_us }}
                </ResponsiveNavLink>

                <ResponsiveNavLink href="/about-us#aboutUs">
                  {{ translations && translations.about_us }}
                </ResponsiveNavLink>
                <ResponsiveNavLink href="/pricing" as="button">
                  {{ translations && translations.pricing }}
                </ResponsiveNavLink>
                <ResponsiveNavLink href="/pricing#faqs" as="button">
                  {{ translations && translations.faqs }}
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
                      profile &&
                      profile.id &&
                      profile.is_payment_verified &&
                      profile.active_user
                        ? '/admin'
                        : profile &&
                          profile.id &&
                          (!profile.is_payment_verified || !profile.active_user)
                        ? !profile.is_payment_verified && !profile.active_user
                          ? '/profile-setup'
                          : !profile.is_payment_verified && profile.active_user
                          ? '/pricing-plan'
                          : '/inactive-account'
                        : '/inactive-account'
                    "
                  >
                    Admin
                  </ResponsiveNavLink>
                </div>

                <ResponsiveNavLink
                  v-if="showit"
                  method="post"
                  as="button"
                  @click="handleLogout"
                >
                  {{ translations && translations.log_out }}
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  v-if="!showit"
                  :href="route('signup')"
                  as="button"
                  class="text-blue-rgba font-bold"
                >
                  {{ translations && translations.sign_up }}
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  v-if="!showit"
                  href="#loginHere"
                  as="button"
                  @click="
                    showingNavigationDropdown = !showingNavigationDropdown
                  "
                >
                  {{ translations && translations.log_in }}
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
        class="container relative max-w-7xl z-10 flex items-center px-4 xs:px-6 pt-40 pb-5 mx-auto md:px-10 xl:py-30"
      >
        <!-- Bow YOU Too **********************     -->
        <div
          class="relative z-10 flex flex-col items-start min-[500px]:w-3/5 md:w-3/5 xl:w-2/5 bg-[#ccb19c] rounded-xl text-[#29231f] shadow-lg p-2 py-4 px-4"
          :class="{ 'animate-scale': animate }"
          style="
            background: rgb(215, 150, 81);
            background: linear-gradient(
              90deg,
              rgba(215, 150, 81, 1) 0%,
              rgba(227, 218, 211, 1) 63%,
              rgba(204, 177, 156, 1) 100%
            );
          "
        >
          <!-- LOGO -->
          <h2 class="sm:hidden text-4xl font-bold tracking-wide text-center">
            <tContractorWord></tContractorWord>
          </h2>

          <span class="font-bold uppercase text-white">
            {{ translations && translations.better_construction }}
          </span>
          <h1
            class="mt-4 text-4xl sm:text-5xl font-bold tracking-tighter capitalize"
          >
            {{ translations && translations.want_access_powerful_tool }}
          </h1>

          <!-- {{  profile }} -->
          <div v-if="!showit" class="flex justify-center space-x-3">
            <Link
              class="group flex items-center justify-between rounded-xl border border-red-500 bg-red-500 px-5 py-3 mt-8 transition-colors hover:bg-red-800 focus:outline-none focus:ring"
              :href="
                profile &&
                profile.id &&
                profile.is_payment_verified &&
                profile.active_user
                  ? route('post')
                  : profile &&
                    profile.id &&
                    (!profile.is_payment_verified || !profile.active_user)
                  ? !profile.is_payment_verified && !profile.active_user
                    ? '/profile-setup'
                    : !profile.is_payment_verified && profile.active_user
                    ? '/pricing-plan'
                    : '/inactive-account'
                  : route('signup')
              "
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
              :href="newsFeedUrl"
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
        </div>
      </div>
    </section>

    <!-- LOGIN & FEATURES SECTION  -->

    <section class="relative" :class="{ 'animate-scale': animate }">
      <div
        class="sm:container max-sm:w-full px-2 lg:max-w-4xl xl:max-w-7xl z-20 mx-auto mt-4 md:px-12 py-10 lg:px-8 bg-[#e5e7eb] text-gray-700 rounded-xl"
        style="
          background: #ada996; /* fallback for old browsers */
          background: -webkit-linear-gradient(
            to right,
            #dbdbdb,
            #eaeaea,
            #f2f2f2,
            #ada996
          ); /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(
            to right,
            #dbdbdb,
            #eaeaea,
            #f2f2f2,
            #ada996
          ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        "
      >
        <!-- WITHOUT LOG IN OPTION /  showit = true -->
        <div v-if="showit">
          <h2 class="text-3xl text-center font-bold sm:text-4xl">
            {{ translations && translations.why_do_you_need }}
            <br />
            <span class="text-center mt-1 text-4xl sm:text-6xl"
              ><tContractorWord /> ?</span
            >
          </h2>

          <p
            class="mt-4 text-center text-3xl sm:text-4xl text-[#241e6d] font-extrabold"
          >
            {{ translations && translations.increase_bottom_line }}
          </p>
          <p class="mt-4 text-center text-2xl font-semibold">
            {{
              translations &&
              translations.searching_locally_vetted_subcontractors
            }}<br />{{ translations && translations.free_advertising }}
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
              {{ translations && translations.why_do_you_need }}
              <br />
              <span
                class="text-center mt-1 text-4xl sm:text-6xl md:max-lg:text-4xl"
              >
                <tContractorWord /> ?
              </span>
            </h2>
            <p
              class="mt-4 text-center text-3xl sm:text-4xl font-extrabold text-[#241e6d]"
            >
              {{ translations && translations.increase_bottom_line }}
            </p>
            <p class="mt-4 text-center text-2xl font-semibold">
              {{
                translations &&
                translations.searching_locally_vetted_subcontractors
              }}
              <br />{{ translations && translations.free_advertising }}
            </p>
          </div>

          <!-- LOGIN Bottom or at md size display right -->
          <div
            class="flex flex-col flex-shrink-0 justify-center items-center p-3 bg-stone-100 border-2 border-blue-rgba rounded-xl shadow-xl"
          >
            <div class="mx-auto pt-0">
              <p class="text-green-800 text-center font-bold pb-2 text-xl">
                {{ translations && translations.join_private_community }}
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
    <section id="pricing" class="relative bg-[#16a34a] text-[#073116]">
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
                <tContractorWhite isOrange />
              </Link>
            </div>
            <div>
              <ul
                class="text-xl font-semibold tracking-tighter text-[#] list-disc"
              >
                <!-- a6b9b9 -->
                <li>
                  {{
                    translations && translations.find_local_or_statewide_subs
                  }}
                </li>
                <li>
                  {{ translations && translations.advertise_your_business }}
                </li>
                <li>
                  {{ translations && translations.post_job_bids_look_work }}
                </li>
                <li>{{ translations && translations.know_whats_happening }}</li>
                <li>
                  {{ translations && translations.ask_questions_get_answers }}
                </li>

                <li class="md:max-w-md lg:max-w-lg">
                  <span class="font-bold italic"
                    >"{{
                      translations && translations.no_brainer_pricing
                    }}"</span
                  >
                  &nbsp;-
                  {{ translations && translations.everyone_trying_to_sell }}
                  <div class="font-extrabold text-white normal-case">
                    Not Here at&nbsp; <tContractorWhite isOrange />
                  </div>
                  <div class="inline-block mt-2">
                    <div class="inline">We Provide</div>
                    <div class="text-white inline text-2xl font-bold">
                      &nbsp;{{
                        translations && translations.important_tool_for_free
                      }}
                    </div>
                  </div>
                  <div class="text-orange-accent-darker font-extrabold">
                    {{ translations && translations.few_bucks_more_benefits }}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- right side or top -->
          <div class="flex flex-col justify-center mb-4">
            <!-- <div class="text-3xl text-[#073116] font-bold">
              <p class="tracking-tight">Your Top Tool For Only</p>
            </div> -->
            <img
              v-if="userVersion !== 1"
              class="mb-3 h-full object-contain"
              src="@/Components/Pricing/assets/freebox.png"
            />
            <div
              v-else-if="userVersion === 1"
              class="flex text-orange-accent font-extrabold mb-4 justify-center"
            >
              <div class="text-2xl self-center mt-[-40px]">$</div>
              <div class="text-[90px] leading-[0.9]">
                {{ formatPrice(pricingPlan.gold_advertised_price) }}
              </div>
            </div>
            <!-- Button Flex Item -->
            <div class="flex justify-center items-end">
              <!-- :href="
                  profile &&
                  profile.id &&
                  profile.is_payment_verified &&
                  profile.active_user
                    ? route('post')
                    : profile &&
                      profile.id &&
                      (!profile.is_payment_verified || !profile.active_user)
                    ? !profile.is_payment_verified && !profile.active_user
                      ? '/profile-setup'
                      : !profile.is_payment_verified && profile.active_user
                      ? '/pricing-plan'
                      : '/inactive-account'
                    : route('signup')
                " -->
              <Link
                @click="settingTabBillingSelection"
                :href="getStartedButtonUrl"
                class="p-3 px-6 pt-2 text-red bg-white rounded-lg border-white border-spacing-3 shadow-2xl shadow-black align-baseline hover:text-white hover:bg-blue-30-rgba"
                >{{ getStartedButtonText }}
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
            class="mx-auto text-xs mb-6 text-center first-letter: text-white md:hidden"
          >
            0162312291810
          </div>
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
            <a href="#" class="hover:text-blue-400">{{
              translations && translations.home
            }}</a>
            <a href="/pricing" class="hover:text-blue-400">{{
              translations && translations.pricing
            }}</a>
            <a href="/pricing#faqs" class="hover:text-blue-400">{{
              translations && translations.faqs
            }}</a>
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
          </div>
        </div>

        <!-- Buttons Container -->
        <div class="flex flex-col justify-between">
          <!-- Get Started Button & Arrow -->
          <div v-if="!showit" class="flex justify-center space-x-3">
            <Link
              class="group flex items-center justify-between rounded-xl border border-red-500 bg-red-500 px-5 py-3 mt-8 transition-colors hover:bg-red-800 focus:outline-none focus:ring"
              :href="
                profile &&
                profile.id &&
                profile.is_payment_verified &&
                profile.active_user
                  ? route('post')
                  : profile &&
                    profile.id &&
                    (!profile.is_payment_verified || !profile.active_user)
                  ? !profile.is_payment_verified && !profile.active_user
                    ? '/profile-setup'
                    : !profile.is_payment_verified && profile.active_user
                    ? '/pricing-plan'
                    : '/inactive-account'
                  : route('signup')
              "
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
              :href="newsFeedUrl"
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
            class="hidden text-white md:block mx-auto mt-6 text-center first-letter:"
          >
            Copyright &copy; 2024, All Rights Reserved
          </div>
          <div
            class="hidden text-xs text-white md:block my-2 text-center first-letter:"
          >
            0162312291810
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

@keyframes scaleUp {
  from {
    transform: scale(1.07);
  }
  to {
    transform: scale(1);
  }
}

.animate-scale {
  animation: scaleUp 1.5s ease-in-out;
}
</style>
