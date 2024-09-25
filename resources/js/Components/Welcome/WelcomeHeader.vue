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
          <img
            style="border: 1px solid #ccc"
            class="h-8 w-8 sm:h-10 translate-y-1 sm:w-10 rounded-full block object-contain"
            src="/images/logo.png"
          />
          <Link
            href="/"
            class="ml-1 text-xl x350:text-2xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
          >
            <!-- <span
              class="text-green-rgba font-extrabold italic font-serif normal-case"
              >c</span
            > -->
            <span class="text-white font-extrabold font-sans uppercase">C</span>
            <span class="text-white font-bold font-sans">onnect</span>
          </Link>
        </div>

        <!-- Cross X Menu Options -->
        <div class="flex items-center justify-end">
          <Link
            @click="$inertia.visit('/#whycConnect')"
            class="hidden md:block mx-3 text-lg font-bold text-white hover:text-blue-rgba cursor-pointer hover:underline hover:underline-offset-8"
          >
            {{ translations && translations.why }} cConnect
          </Link>

          <Link
            href="/about-us#contactUs"
            class="hidden lg:block mx-3 text-lg font-bold text-white hover:text-blue-rgba cursor-pointer hover:underline hover:underline-offset-8"
            :class="`${
              url === 'http://0.0.0.0/about-us#contactUs' && ' rounded'
            }`"
          >
            {{ translations && translations.contact_us }}
          </Link>
          <v-menu open-on-hover open-on-click>
            <template v-slot:activator="{ props }">
              <div
                class="cursor-pointer flex gap-1 mr-2 items-center justify-center"
                v-bind="props"
              >
                <img
                  style="border: 1px solid #ccc"
                  v-if="selectedLanguage === 'english'"
                  class="h-8 w-8 sm:h-10 sm:w-10 rounded-full block object-contain"
                  src="@/Pages/assets/usa.svg"
                />
                <img
                  style="border: 1px solid #ccc"
                  v-else
                  class="h-8 w-8 sm:h-10 sm:w-10 rounded-full block object-contain"
                  src="@/Pages/assets/spanish.svg"
                />
                <Icon
                  class="max-sm:hidden block w-4 h-4"
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
          <div v-if="showit && showNewsFeed">
            <Link
              :href="
                profile && profile.is_payment_verified && profile.active_user
                  ? route('post')
                  : profile &&
                    (!profile.is_payment_verified || !profile.active_user)
                  ? !profile.is_payment_verified && !profile.active_user
                    ? '/profile-setup'
                    : !profile.is_payment_verified && profile.active_user
                    ? '/pricing-plan'
                    : '/inactive-account'
                  : '/inactive-account'
              "
              class="block flex justify-center items-center mx-1 x365:mx-2 py-[6px] x365:py-2 sm:py-3 px-2 x365:px-3 sm:px-6 font-bold rounded-lg sm:rounded-xl text-white bg-green-600 max-x365:text-sm hover:bg-green-800 border-green-600"
            >
              {{ translations && translations.news_feed }}
            </Link>
          </div>

          <!-- Login Button -->
          <div v-if="!showit">
            <Link
              @click="$inertia.visit('/#loginHere')"
              class="block flex justify-center items-center p-1 px-3 sm:p-2 mx-2 sm:px-6 font-bold rounded-xl text-xs sm:text-base text-white bg-blue-800 hover:bg-green-800 border-2 shadow-lg border-green-600"
            >
              {{ translations && translations.login }}
            </Link>
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
            <ResponsiveNavLink href="/#whycConnect">
              {{ translations && translations.why }}
              <cConnectWord></cConnectWord>
            </ResponsiveNavLink>

            <ResponsiveNavLink
              v-if="showit"
              :href="
                profile && profile.is_payment_verified && profile.active_user
                  ? route('post')
                  : profile &&
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
              {{ translations && translations.news_feed }}
            </ResponsiveNavLink>
            <ResponsiveNavLink
              v-if="showit"
              :href="
                profile && profile.is_payment_verified && profile.active_user
                  ? 'sub-finder'
                  : profile &&
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
            <div
              class="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out font-bold cursor-pointer"
              v-if="showit"
              @click="goToRedFlagPage"
            >
              {{ translations && translations.red_flags }}
            </div>

            <!-- <ResponsiveNavLink
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
              </ResponsiveNavLink> -->
            <ResponsiveNavLink
              v-if="showit"
              :href="
                profile && profile.is_payment_verified && profile.active_user
                  ? `/contractor/${profile.user_id}/edit`
                  : profile &&
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
                  profile && profile.is_payment_verified && profile.active_user
                    ? `/posts/${profile.user_id}`
                    : profile &&
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
                  profile && profile.is_payment_verified && profile.active_user
                    ? '/ratings/contractor'
                    : profile &&
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
                  profile && profile.is_payment_verified && profile.active_user
                    ? '/profile'
                    : profile &&
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
                  profile && profile.is_payment_verified && profile.active_user
                    ? '/settings'
                    : profile &&
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
              <ResponsiveNavLink href="/gomobile" as="button">
                {{ translations && translations.go_mobile }}
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
                    profile.is_payment_verified &&
                    profile.active_user
                      ? '/admin'
                      : profile &&
                        (!profile.is_payment_verified || !profile.active_user)
                      ? !profile.is_payment_verified && !profile.active_user
                        ? '/profile-setup'
                        : !profile.is_payment_verified && profile.active_user
                        ? '/pricing-plan'
                        : '/inactive-account'
                      : '/inactive-account'
                  "
                >
                  {{ translations && translations.admin }}
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
                href="/#loginHere"
                as="button"
                @click="showingNavigationDropdown = !showingNavigationDropdown"
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
  <Teleport to="body">
    <DialogUpgradeToGoldPlatinum ref="upgradeToGoldPlatinumDialogRef" />
  </Teleport>
</template>
<script setup>
import { Link, usePage } from "@inertiajs/inertia-vue3";
import cConnectWord from "@/Components/tCon/cConnectWord.vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { Inertia } from "@inertiajs/inertia";
import { getToken, removeToken } from "@/helpers/localStorageHelper";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import DialogUpgradeToGoldPlatinum from "@/Components/DialogUpgradeToGoldPlatinum.vue";

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
const store = useStore();
let lang = localStorage.getItem("lang");
if (!lang) {
  lang = "english";
  localStorage.setItem("lang", "english");
}
const selectedLanguage = ref(lang);
const upgradeToGoldPlatinumDialogRef = ref(null);

const translations = computed(() => store.getters.translations);
const userVersion = computed(() => store.getters.userVersion);
const profile = computed(() => store.state.profile.profile);

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
  if (getToken()) {
    await store.dispatch("profile/fetchProfile");
  }

  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

function handleLogout() {
  removeToken();
  showingNavigationDropdown.value = !showingNavigationDropdown.value;
  store.commit("setUserVersion", 0);
  store.commit("profile/setProfile", {});
  store.commit("setUserDetails", {});
  Inertia.post("/logout");
}

const onSelectLang = (lang) => {
  localStorage.setItem("lang", lang);
  selectedLanguage.value = lang;
  store.commit("setTranlations", lang);
};
const goToRedFlagPage = (event) => {
  if (
    profile.value &&
    profile.value.id &&
    profile.value.is_payment_verified &&
    profile.value.active_user &&
    userVersion.value !== 0 &&
    userVersion.value !== 1
  ) {
    Inertia.visit("red-flag");
  } else if (
    profile.value &&
    profile.value.id &&
    (!profile.value.is_payment_verified || !profile.value.active_user)
  ) {
    if (!profile.value.is_payment_verified && !profile.value.active_user) {
      Inertia.visit("/profile-setup");
    } else if (
      !profile.value.is_payment_verified &&
      profile.value.active_user
    ) {
      Inertia.visit("/pricing-plan");
    } else {
      Inertia.visit("/inactive-account");
    }
  } else if (userVersion.value === 0 || userVersion.value === 1) {
    upgradeToGoldPlatinumDialogRef.value.openDialog();
  } else {
    Inertia.visit("/inactive-account");
  }
};
</script>
