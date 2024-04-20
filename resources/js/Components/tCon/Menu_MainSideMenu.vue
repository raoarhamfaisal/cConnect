<script setup>
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import DialogProfileTabs from "@/Pages/Profile/Partials/main/DialogProfileTabs.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import { computed, ref } from "vue";
import { usePage } from "@inertiajs/inertia-vue3";
import { Icon } from "@iconify/vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { Inertia } from "@inertiajs/inertia";
import { removeToken } from "@/helpers/localStorageHelper";
import DialogContractorPage from "@/Pages/Contractor/DialogContractorPage.vue";
import { useStore } from "vuex";
const props = defineProps({
  showit: Boolean,

  profile: {
    type: Object,
    required: true,
  },

  isOpen: Boolean,
  showPostButtons: Boolean,

  // modelValue is the prop from

  //   <Menu_Hamburger v-model=postSearch></Menu_Hamburger>
  modelValue: String,
  postSearchFilters: Object,
});
const userProps = usePage().props.value;
const emit = defineEmits([
  "update:modelValue",
  "submitPostSearch",
  "postClicked",
]);
const store = useStore();
const dialogRef = ref();
const contractorPageRef = ref();
const showContractorPageModal = ref(false);
const url = usePage().url.value;

const newPostSearchValue = () => {
  emit("submitPostSearch");
};

function postClicked(isOpen) {
  isOpen = false;
  emit("postClicked", isOpen);
}
const isAdminUrl = computed(() => {
  const user = userProps.auth.user;
  console.log(usePage().props.value, "usepage");
  if (user) {
    return (
      user.appeals_privileges ||
      user.payments_privileges ||
      user.users_privileges
    );
  }
  return false;
});
const loadingImage = computed(() => store.state.profile.loadingImage);

function handleLogout() {
  removeToken();

  Inertia.post("/logout");
}

const openProfileModal = () => {
  store.commit("profile/setActiveTab", 3);
  if (usePage().url.value !== "/profile") {
    dialogRef.value.openDialog();
  }
};

// Create a computed property to check if at least one property is not null
const shouldShowAddress = computed(() => {
  return (
    props.profile.city !== null ||
    props.profile.state !== null ||
    props.profile.zipcode !== null
  );
});

// Create a computed property for the formatted address
const address = computed(() => {
  const parts = [];
  if (props.profile.city !== null) parts.push(props.profile.city);
  if (props.profile.state !== null) parts.push(props.profile.state);
  if (props.profile.zipcode !== null) parts.push(props.profile.zipcode);
  return parts.join(" ");
});
// Create a computed property for the truncated name
const truncatedName = computed(() => {
  const fullName =
    props.profile.first_name +
    " " +
    (props.profile.last_name ? props.profile.last_name : "");
  return fullName.length < 27 ? fullName : fullName.substring(0, 23) + "...";
});
const openContractorPageModal = () => {
  contractorPageRef.value.openDialog();
};
</script>

<template>
  <DialogProfileTabs ref="dialogRef" :profile="profile" />
  <!-- <DialogContractorPage ref="contractorPageRef" :profile="profile" /> -->

  <!-- MAIN SIDE MENU  SELECTION CHOICES ONLY -->
  <!-- ******************************************************* -->

  <div
    style="width: 650px"
    class="hidden lg:flex lg:flex-col bg-gray-200 items-center justify-start transition-all duration-700 ease-in-out h-screen overflow-y-scroll"
  >
    <div
      class="hidden lg:flex lg:flex-col justify-start items-center px-4 py-2 rounded-lg bg-gray-200"
    >
      <Link
        href="/"
        class="lg:text-5xl xl:text-6xl font-bold tracking-wide text-center"
      >
        <tContractorWord />
      </Link>

      <!-- src="/images/avatars/1_avatar.jpg" -->

      <!-- User Image / NAME / EMAIL / CITY / STATE -->
      <div v-if="showit" class="flex flex-col items-center mt-6 -mx-2">
        <v-skeleton-loader
          v-if="loadingImage"
          style="border-radius: 9999px"
          class="overflow-hidden w-14 h-14 sm:w-24 sm:h-24"
          type="image"
        >
        </v-skeleton-loader>
        <Avatar
          v-if="!loadingImage"
          :imageSrc="`/${profile.user_avatar}`"
          class="sm:w-24 sm:h-24"
        />
        <!-- <img
          class="object-cover w-24 h-24 mx-2 rounded-full"
          :src="`/${profile.user_avatar}`"
          alt="avatar"
        /> -->

        <h4 class="mx-2 mt-2 font-bold text-gray-800">
          {{ truncatedName }}
        </h4>

        <h4 class="mx-2 font-bold text-gray-800">
          {{
            profile.company_name &&
            (profile.company_name.length < 27
              ? profile.company_name
              : profile.company_name.substring(0, 23) + "...")
          }}
        </h4>

        <h4
          v-if="profile && profile.phone_cell"
          class="mx-2 text-sm font-semibold text-gray-700"
        >
          Cell: {{ profile.phone_cell }}
        </h4>

        <h4
          v-if="profile && profile.email"
          class="mx-2 text-sm font-medium text-gray-700"
        >
          {{ profile.email }}
        </h4>

        <!-- City State Zip -->
        <h4
          v-if="showit && shouldShowAddress"
          class="mx-2 text-sm font-medium text-gray-500"
        >
          {{ address }}
        </h4>
      </div>

      <!-- POST BUTTON & SEARCH -->
      <div class="flex flex-col items-center mt-4 -mx-2">
        <div class="flex items-center justify-center gap-2">
          <!-- New Post Button -->
          <ButtonPost
            v-if="showPostButtons"
            :isOpen="isOpen"
            @postClicked="postClicked"
          >
          </ButtonPost>

          <div class="" v-if="showPostButtons">
            <ButtonRefresh></ButtonRefresh>
          </div>
        </div>
        <!-- SEARCH POSTINGS -->
        <div class="relative mt-6">
          <form>
            <!-- +++++++++++++++++++++++++++++++++++++++ -->

            <div class="flex justify-center">
              <div class="mb-0">
                <div
                  class="relative flex w-full flex-wrap items-stretch transition duration-300 ease-in-out focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                >
                  <input
                    type="text"
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    @keypress.prevent.enter="newPostSearchValue"
                    class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 outline-none rounded-l-md border border-solid border-gray-600 placeholder:italic placeholder:text-slate-500"
                    placeholder="Search..."
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
      </div>

      <!-- SIDE MENU OPTIONS -->

      <!-- SIDE MENU DIV -->
      <div
        class="flex flex-col justify-between flex-1 mt-6"
        :class="
          url === '/payment' || url === '/profile-setup'
            ? 'pointer-events-none'
            : ''
        "
      >
        <nav>
          <!-- all contractors -->

          <!-- MENU ITEMS -->

          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            :href="route('post')"
          >
            <img src="/images/icons/newsfeed.png" width="30" height="30" />
            <span class="mx-4 font-medium">News Feed</span>
          </Link>

          <!-- SUB-FINDER SEARCH -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/sub-finder"
          >
            <img src="/images/icons/contractor.png" width="30" height="30" />
            <span class="mx-4 font-medium">Sub-Finder</span>
          </Link>

          <!-- RED FLAGS / SLIPPERY APPLES SEARCH -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/red-flag"
          >
            <img src="/images/icons/redflag.png" width="30" height="30" />
            <span class="mx-4 font-medium">Red Flags</span>
          </Link>

          <!-- Mentor SEARCH -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="#"
          >
            <img src="/images/icons/mentor.png" width="30" height="30" />
            <span class="mx-4 font-medium text-cyan-600">Mentoring</span>
          </Link>

          <!-- CONTRACTOR PAGE -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            :href="`/contractor/${profile.user_id}/edit`"
          >
            <img
              src="/images/icons/contractorpage_b.png"
              width="30"
              height="30"
            />
            <span class="mx-4 font-medium">Contractor page</span>
          </Link>

          <hr class="mt-3 ml-6 mr-6 pt-3 border-t-2 border-gray-400" />

          <!-- VIEW SETTINGS -->
          <button
            @click="openProfileModal"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <img src="/images/icons/news_view.png" width="30" height="30" />
            <span class="mx-4 font-medium hover:text-cyan-600">View</span>
          </button>

          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            :href="`/posts/${profile.user_id}`"
          >
            <svg
              id="SvgjsSvg1017"
              width="30"
              height="30"
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
                  width="30"
                  height="30"
                >
                  <rect width="30" height="30" fill="none"></rect>
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
            <span class="mx-4 font-medium">My Posts</span>
          </Link>
          <!-- Your Reviews -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/ratings/contractor"
          >
            <Icon
              icon="material-symbols:reviews"
              color="#1098ad"
              width="30"
              height="30"
            />
            <span class="mx-4 font-medium">My Ratings</span>
          </Link>

          <!-- PROFILE -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/profile"
          >
            <img src="/images/icons/profile.png" width="30" height="30" />
            <span class="mx-4 font-medium">My Profile</span>
          </Link>

          <!-- SETTINGS -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/settings"
          >
            <img src="/images/icons/settings_bl.png" width="30" height="30" />
            <span class="mx-4 font-medium">Settings</span>
          </Link>

          <!-- CONTACT -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/about-us#contactUs"
          >
            <img src="/images/icons/contactus.png" width="30" height="30" />
            <span class="mx-4 font-medium">Contact Us</span>
          </Link>

          <!-- admin section -->
          <hr
            v-if="isAdminUrl"
            class="mt-3 ml-6 mr-6 pt-3 border-t-2 border-gray-400"
          />
          <Link
            v-if="isAdminUrl"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/admin"
          >
            <Icon
              icon="clarity:administrator-solid"
              color="#1098ad"
              width="30"
              height="30"
            />
            <span class="mx-4 font-medium">Admin</span>
          </Link>
          <!-- <Link
            v-if="isAdminUrl"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/admin/regions/contractors"
          >
            <Icon
              icon="ion:person-sharp"
              color="#1098ad"
              width="30"
              height="30"
            />
            <span class="mx-4 font-medium">All Contractors</span>
          </Link>
          // Appealed Reviews 
          <Link
            v-if="isAdminUrl"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="/admin/regions/appealed"
          >
            <Icon
              icon="fluent-mdl2:review-request-solid"
              color="#1098ad"
              width="30"
              height="30"
            />
            <span class="mx-4 font-medium">Appealed Reviews</span>
          </Link> -->
          <hr
            v-if="isAdminUrl"
            class="mt-3 ml-6 mr-6 pt-3 border-t-2 border-gray-400"
          />

          <!-- LOG OUT -->
          <button
            @click="handleLogout"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700 pointer-events-auto"
          >
            <img src="/images/icons/logout_bl.png" width="30" height="30" />
            <span class="mx-4 font-medium">Log Out</span>
          </button>
          <!-- <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100   hover:text-gray-700"
            :href="route('logout')"
            method="post"
            as="button"
          >
            <img src="/images/icons/logout_bl.png" width="30" height="30" />
            <span class="mx-4 font-medium">Log Out</span>
          </Link> -->
        </nav>
      </div>

      <!-- ---------------    -->
    </div>
  </div>
  <!-- END:  SIDE MENU -->
</template>
