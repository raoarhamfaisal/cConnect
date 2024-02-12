<script setup>
import { removeToken } from "@/helpers/localStorageHelper";
import { Icon } from "@iconify/vue";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-vue3";
import { computed, ref } from "vue";
import DialogProfileTabs from "@/Pages/Profile/Partials/main/DialogProfileTabs.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { useStore } from "vuex";

const props = defineProps({
  showit: Boolean,

  profile: {
    type: Object,
    required: true,
  },

  // modelValue is the prop from
  //   <Menu_Hamburger v-model=postSearch></Menu_Hamburger>
  modelValue: String,
  postSearchFilters: Object,

  showingNavigationDropdown: Boolean,
});

const dialogRef = ref();
const store = useStore();

const url = usePage().url.value;
let lang = localStorage.getItem("lang");
if (!lang) {
  lang = "english";
  localStorage.setItem("lang", "english");
}
const selectedLanguage = ref(lang);

const emit = defineEmits([
  "NavigationDropdown",
  "update:modelValue",
  "submitPostSearch",
]);

function NavigationDropdown() {
  emit("NavigationDropdown");
}

const newPostSearchValue = () => {
  emit("submitPostSearch");
};
const translations = computed(() => store.getters.translations);
const userVersion = computed(() => store.getters.userVersion);
const isAdminUrl = computed(() => {
  return usePage().props.value.auth.user.appeals_privileges === 1;
});
function handleLogout() {
  removeToken();

  store.commit("setUserVersion", 0);
  store.commit("profile/setProfile", {});
  store.commit("setUserDetails", {});

  Inertia.post("/logout");
}
const openProfileModal = () => {
  dialogRef.value.openDialog();
};
// Create a computed property for the truncated name
const truncatedName = computed(() => {
  const fullName =
    props.profile.first_name +
    " " +
    (props.profile.last_name ? props.profile.last_name : "");
  return fullName.length < 27 ? fullName : fullName.substring(0, 23) + "...";
});

const onSelectLang = (lang) => {
  localStorage.setItem("lang", lang);
  selectedLanguage.value = lang;
  store.commit("setTranlations", lang);
};

const goToRedFlagPage = () => {
  if (userVersion.value === 1) {
    store.commit("setIsUpgradeToGoldPlatinumDialogOpen", true);
  } else {
    Inertia.visit("/red-flag");
  }
};
</script>

<template>
  <DialogProfileTabs ref="dialogRef" :profile="profile" />
  <div id="hamburgerwithsticky" class="z-40">
    <div
      id="myHamburgerMenu"
      :class="{
        // if true class = block if not, class = hidden
        block: showingNavigationDropdown,
        hidden: !showingNavigationDropdown,
      }"
      class="lg:hidden absolute flex top-16 right-4 sm:right-6 lg:right-20 xl:right-32 2xl:right-80 z-20 px-3 text-left border-b border-gray-400 rounded-xl bg-gray-100"
    >
      <div class="">
        <div v-if="showit" class="pt-2 pb-0 ml-3">
          <Avatar :imageSrc="`/${profile.user_avatar}`" class="mt-2" />
          <h4 class="mt-1 text-base font-bold text-gray-800">
            <!-- Tienary cuts off string if over 20 chrs and adds "..."
                                        the end  1st checks if combined string is over 20 chrs,
                                        if not display as normal '?' , if over do the else ':'
                                        and cut oof string at 20th chr -->
            {{ truncatedName }}
          </h4>

          <h4 class="text-base font-semibold text-gray-800">
            {{
              profile.company_name &&
              (profile.company_name.length < 27
                ? profile.company_name
                : profile.company_name.substring(0, 23) + "...")
            }}
          </h4>

          <!-- <h4 class="
                                        text-sm font-semibold
                                        text-gray-700
                                        
                                        ">
                                Cell: {{ profile.phone_cell }}
                            </h4> -->
        </div>
        <v-menu open-on-hover open-on-click>
          <template v-slot:activator="{ props }">
            <!-- border-2 border-[#ced0d4] -->
            <div
              class="cursor-pointer mt-2 flex gap-1 items-center justify-left p-1 rounded-md"
              v-bind="props"
            >
              <div
                v-if="selectedLanguage === 'english'"
                class="flex justify-left items-center gap-2 font-bold"
              >
                <img
                  class="h-8 w-8 sm:h-10 sm:w-10 rounded-full block object-contain"
                  style="border: 1px solid #ccc"
                  src="@/Pages/assets/usa.svg"
                />
                <div>English</div>
              </div>
              <div
                v-else
                class="flex justify-left items-center gap-2 font-bold"
              >
                <img
                  style="border: 1px solid #ccc"
                  class="h-8 w-8 sm:h-10 sm:w-10 rounded-full block object-contain"
                  src="@/Pages/assets/spanish.svg"
                />
                <div>Spanish / Mexican</div>
              </div>
              <Icon
                class="block w-4 h-4"
                icon="mingcute:down-fill"
                color="black"
              ></Icon>
            </div>
          </template>
          <v-list class="mt-2">
            <v-list-item
              class="hover:bg-gray-200"
              @click="onSelectLang('english')"
            >
              <div class="flex justify-left items-center gap-2 font-bold w-32">
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
              <div class="flex justify-left items-center gap-2 font-bold w-44">
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

        <!-- HAMBURGER MENU OPTIONS -->
        <div
          class="pt-1 pb-3 space-y-2"
          :class="
            url === '/payment' ||
            url === '/profile-setup' ||
            url === '/pricing-plan'
              ? 'pointer-events-none'
              : ''
          "
        >
          <!-- DropDown: SEARCH POSTS -->
          <div class="relative mt-1">
            <form>
              <!-- +++++++++++++++++++++++++++++++++++++++ -->

              <div class="flex justify-center">
                <div class="mb-0 xl:w-96">
                  <div
                    class="relative mb-2 flex w-full flex-wrap items-stretch transition duration-300 ease-in-out focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  >
                    <input
                      type="search"
                      :value="modelValue"
                      @input="$emit('update:modelValue', $event.target.value)"
                      @keypress.prevent.enter="newPostSearchValue"
                      class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 outline-none rounded-l-md border border-solid border-gray-600 placeholder:italic placeholder:text-slate-500"
                      :placeholder="`${translations && translations.search}...`"
                    />

                    <button
                      @click="newPostSearchValue"
                      class="relative z-[2] flex items-center px-4 py-2.5 text-xs font-medium uppercase leading-tight rounded-r-md border border-solid border-gray-600 text-white bg-blue-600 transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-lg"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- +++++++++++++++++++++++++++++++++++++++ -->
            </form>
          </div>

          <!-- DropDown: NEWS FEED -->

          <Link
            :href="route('post')"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === '/post' && 'bg-gray-300 text-gray-700'
            }`"
          >
            <img src="/images/icons/newsfeed.png" width="20" height="20" />
            <span class="mx-4 font-medium">{{
              translations && translations.news_feed
            }}</span>
          </Link>

          <!-- DropDown: SUB FINDER -->
          <Link
            href="/sub-finder"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === `/sub-finder` && 'bg-gray-300 text-gray-700'
            }`"
          >
            <img src="/images/icons/contractor.png" width="20" height="20" />
            <span class="mx-4 font-medium">{{
              translations && translations.sub_finder
            }}</span>
          </Link>

          <!-- DropDown: RED FLAG / SLIPPERY APPLES -->
          <div
            @click="goToRedFlagPage"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === `/red-flag` && 'bg-gray-300 text-gray-700'
            }`"
          >
            <img src="/images/icons/redflag.png" width="20" height="20" />
            <span class="mx-4 font-medium">{{
              translations && translations.red_flags
            }}</span>
          </div>

          <!-- DropDown: MENTORING -->
          <!-- <Link
            :href="route('post')"
             :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${url === `/` && 'bg-gray-300 text-gray-700'}`"
          >
            <img src="/images/icons/mentor.png" width="20" height="20" />
            <span class="mx-4 font-medium">Mentoring</span>
          </Link> -->

          <!-- DropDown: CONTRACTOR PAGE -->
          <Link
            :href="`/contractor/${profile.user_id}/edit`"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === `/contractor/${profile.user_id}/edit` &&
              'bg-gray-300 text-gray-700'
            }`"
          >
            <img
              src="/images/icons/contractorpage_b.png"
              width="20"
              height="20"
            />
            <span class="mx-4 font-medium">{{
              translations && translations.contractor_page
            }}</span>
          </Link>

          <div class="pt-1 border-t-2 border-gray-400"></div>

          <!-- DropDown: VIEW SETTINGS -->
          <button
            @click="openProfileModal"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 `"
          >
            <img src="/images/icons/news_view.png" width="20" height="20" />
            <span class="mx-4 font-medium">{{
              translations && translations.view
            }}</span>
          </button>
          <Link
            :href="`/posts/${profile.user_id}`"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === `/posts/${profile.user_id}` && 'bg-gray-300 text-gray-700'
            }`"
          >
            <svg
              id="SvgjsSvg1017"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs id="SvgjsDefs1018"></defs>
              <g id="SvgjsG1019">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  clip-rule="evenodd"
                  viewBox="0 0 64 64"
                  width="20"
                  height="20"
                >
                  <rect width="20" height="20" fill="none"></rect>
                  <path
                    d="M58,104C58,98.696 56.946,93.609 55.071,89.858C53.196,86.107 50.652,84 48,84C39.122,84 24.878,84 16,84C13.348,84 10.804,86.107 8.929,89.858C7.054,93.609 6,98.696 6,104C6,117.961 6,136 6,136C6,138.209 6.895,140 8,140L56,140C57.105,140 58,138.209 58,136L58,104ZM54,132L54,104C54,100.817 53.368,97.765 52.243,95.515C51.117,93.264 49.591,92 48,92C39.122,92 24.878,92 16,92C14.409,92 12.883,93.264 11.757,95.515C10.632,97.765 10,100.817 10,104L10,132L54,132Z"
                    transform="matrix(1 0 0 .5 0 -36)"
                    fill="#464898"
                    class="color000 svgShape"
                  ></path>
                  <path
                    d="M10,92L10,120C10,123.183 10.632,126.235 11.757,128.485C12.883,130.736 14.409,132 16,132C24.878,132 39.122,132 48,132C49.591,132 51.117,130.736 52.243,128.485C53.368,126.235 54,123.183 54,120C54,117.792 54.896,116 56,116C57.104,116 58,117.792 58,120C58,125.304 56.946,130.391 55.071,134.142C53.196,137.893 50.652,140 48,140C39.122,140 24.878,140 16,140C13.348,140 10.804,137.893 8.929,134.142C7.054,130.391 6,125.304 6,120L6,88C6,85.791 6.895,84 8,84L56,84C57.105,84 58,85.791 58,88C58,88 58,95.188 58,104C58,106.208 57.104,108 56,108C54.896,108 54,106.208 54,104L54,92L10,92Z"
                    transform="matrix(1 0 0 .5 0 -12)"
                    fill="#464898"
                    class="color000 svgShape"
                  ></path>
                  <path
                    d="M26,100C26,98.895 25.105,98 24,98L16,98C14.895,98 14,98.895 14,100L14,108C14,109.105 14.895,110 16,110L24,110C25.105,110 26,109.105 26,108L26,100ZM18,102L18,106L22,106L22,102L18,102Z"
                    transform="translate(0 -84)"
                    fill="#464898"
                    class="color000 svgShape"
                  ></path>
                  <path
                    d="M24,103L48,103C49.656,103 51,102.104 51,101C51,99.896 49.656,99 48,99L24,99C22.344,99 21,99.896 21,101C21,102.104 22.344,103 24,103Z"
                    transform="matrix(.66667 0 0 1 16 -85)"
                    fill="#464898"
                    class="color000 svgShape"
                  ></path>
                  <path
                    d="M24,103L48,103C49.656,103 51,102.104 51,101C51,99.896 49.656,99 48,99L24,99C22.344,99 21,99.896 21,101C21,102.104 22.344,103 24,103Z"
                    transform="matrix(.66667 0 0 1 16 -77)"
                    fill="#464898"
                    class="color000 svgShape"
                  ></path>
                  <path
                    d="M26,127.172L36.586,116.586C37.367,115.805 38.633,115.805 39.414,116.586L55.071,132.243C55.85,133.022 55.852,134.285 55.075,135.067C55.075,135.067 55.075,135.067 55.071,135.071C53.196,136.946 50.652,138 48,138L32,138C32,138 16,138 16,138C13.348,138 10.804,136.946 8.929,135.071L8.925,135.067C8.148,134.285 8.15,133.022 8.929,132.243L18.586,122.586C19.367,121.805 20.633,121.805 21.414,122.586L26,127.172ZM50.586,133.414L38,120.828L28.828,130L32.828,134L48,134C48.904,134 49.787,133.796 50.586,133.414ZM27.172,134L20,126.828L13.414,133.414C14.214,133.796 15.097,134 16,134L27.172,134Z"
                    transform="translate(0 -80)"
                    fill="#464898"
                    class="color000 svgShape"
                  ></path>
                </svg>
              </g>
            </svg>
            <span class="mx-4 font-medium">{{
              translations && translations.my_posts
            }}</span>
          </Link>
          <Link
            href="/ratings/contractor"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === `/ratings/contractor` && 'bg-gray-300 text-gray-700'
            }`"
          >
            <Icon
              icon="material-symbols:reviews"
              color="#1098ad"
              width="20"
              height="20"
            />
            <span class="mx-4 font-medium">{{
              translations && translations.my_ratings
            }}</span>
          </Link>

          <!-- DropDown: My Profile -->
          <Link
            :href="route('profile.edit')"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === `/profile` && 'bg-gray-300 text-gray-700'
            }`"
          >
            <img src="/images/icons/profile.png" width="20" height="20" />
            <span class="mx-4 font-medium">{{
              translations && translations.my_profile
            }}</span>
          </Link>

          <!-- DropDown: Settings -->
          <Link
            href="/settings"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === `/settings` && 'bg-gray-300 text-gray-700'
            }`"
          >
            <img src="/images/icons/settings_bl.png" width="20" height="20" />
            <span class="mx-4 font-medium">{{
              translations && translations.settings
            }}</span>
          </Link>

          <!-- DropDown: Contact Us -->
          <Link
            href="/about-us#contactUs"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === `/about-us#contactUs` && 'bg-gray-300 text-gray-700'
            }`"
          >
            <img src="/images/icons/contactus.png" width="20" height="20" />
            <span class="mx-4 font-medium">Contact Us</span>
          </Link>
          <!-- DropDown: All Contractors -->
          <div v-if="isAdminUrl" class="pt-1 border-t-2 border-gray-400"></div>

          <Link
            v-if="isAdminUrl"
            href="/admin"
            :class="`flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
              url === `/admin` && 'bg-gray-300 text-gray-700'
            }`"
          >
            <Icon
              icon="clarity:administrator-solid"
              color="#1098ad"
              width="20"
              height="20"
            />
            <span class="mx-4 font-medium">{{
              translations && translations.admin
            }}</span>
          </Link>

          <div v-if="isAdminUrl" class="pt-1 border-t-2 border-gray-400"></div>
          <!-- DropDown: LOGOUT -->
          <button
            @click="handleLogout"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700 pointer-events-auto"
          >
            <img src="/images/icons/logout_bl.png" width="20" height="20" />
            <span class="mx-4 font-medium">{{
              translations && translations.log_out
            }}</span>
          </button>
          <!-- <Link
            :href="route('logout')"
            method="post"
            as="button"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300   hover:text-gray-700"
          >
            <img src="/images/icons/logout_bl.png" width="20" height="20" />
            <span class="mx-4 font-medium">Log Out</span>
          </Link> -->
        </div>
      </div>

      <button
        @click="NavigationDropdown"
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
    <!-- END: HAMBURGER Navigation Menu -->
  </div>
</template>
