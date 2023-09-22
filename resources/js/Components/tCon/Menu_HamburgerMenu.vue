<script setup>
import { removeToken } from "@/helpers/localStorageHelper";
import { Icon } from "@iconify/vue";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-vue3";
import { computed, ref } from "vue";
import DialogProfileTabs from "@/Pages/Profile/Partials/main/DialogProfileTabs.vue";
import { useStore } from "vuex";
import Avatar from "@/Components/Ratings/Avatar.vue";

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

const store = useStore();
const dialogRef = ref();

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
const isAdminUrl = computed(() => {
  return usePage().props.value.auth.user.appeals_privileges === 1;
});
function handleLogout() {
  removeToken();

  Inertia.post("/logout");
}
const openProfileModal = () => {
  store.commit("profile/setActiveTab", 3);
  if (usePage().url.value !== "/profile") {
    dialogRef.value.openDialog();
  } else {
    emit("NavigationDropdown");
  }
};
// Create a computed property for the truncated name
const truncatedName = computed(() => {
  const fullName =
    props.profile.first_name +
    " " +
    (props.profile.last_name ? props.profile.last_name : "");
  return fullName.length < 27 ? fullName : fullName.substring(0, 23) + "...";
});
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

        <!-- HAMBURGER MENU OPTIONS -->
        <div class="pt-1 pb-3 space-y-2">
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

          <!-- DropDown: NEWS FEED -->

          <Link
            v-if="Inertia.page.component != 'Postings'"
            :href="route('post')"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <img src="/images/icons/newsfeed.png" width="20" height="20" />
            <span class="mx-4 font-medium">News Feed</span>
          </Link>

          <Link
            href="/ratings/contractor"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <Icon
              icon="material-symbols:reviews"
              color="#1098ad"
              width="20"
              height="20"
            />
            <span class="mx-4 font-medium">Your Ratings</span>
          </Link>

          <!-- DropDown: SUB FINDER -->
          <Link
            :href="route('post')"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <img src="/images/icons/contractor.png" width="20" height="20" />
            <span class="mx-4 font-medium">Sub Finder</span>
          </Link>

          <!-- DropDown: RED FLAG / SLIPPERY APPLES -->
          <Link
            :href="route('post')"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <img src="/images/icons/redflag.png" width="20" height="20" />
            <span class="mx-4 font-medium">Red Flags</span>
          </Link>

          <!-- DropDown: MENTORING -->
          <Link
            :href="route('post')"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <img src="/images/icons/mentor.png" width="20" height="20" />
            <span class="mx-4 font-medium">Mentoring</span>
          </Link>

          <!-- DropDown: CONTRACTOR PAGE -->
          <Link
            :href="route('post')"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <img
              src="/images/icons/contractorpage_b.png"
              width="20"
              height="20"
            />
            <span class="mx-4 font-medium">Contractor page</span>
          </Link>

          <div class="pt-1 border-t-2 border-gray-400"></div>

          <!-- DropDown: VIEW SETTINGS -->
          <button
            @click="openProfileModal"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <img src="/images/icons/news_view.png" width="20" height="20" />
            <span class="mx-4 font-medium">View Settings</span>
          </button>

          <!-- DropDown: My Profile -->
          <Link
            :href="route('profile.edit')"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <img src="/images/icons/profile.png" width="20" height="20" />
            <span class="mx-4 font-medium">My Profile</span>
          </Link>

          <!-- DropDown: Settings -->
          <Link
            :href="route('post')"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <img src="/images/icons/settings_bl.png" width="20" height="20" />
            <span class="mx-4 font-medium">Settings</span>
          </Link>

          <!-- DropDown: Contact Us -->
          <Link
            :href="route('post')"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <img src="/images/icons/contactus.png" width="20" height="20" />
            <span class="mx-4 font-medium">Contact Us</span>
          </Link>
          <!-- DropDown: All Contractors -->
          <div v-if="isAdminUrl" class="pt-1 border-t-2 border-gray-400"></div>

          <Link
            v-if="isAdminUrl"
            href="/admin/regions/contractors"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <Icon
              icon="ion:person-sharp"
              color="#1098ad"
              width="20"
              height="20"
            />
            <span class="mx-4 font-medium">All Contractors</span>
          </Link>
          <!-- DropDown: Appeal Review -->
          <Link
            v-if="isAdminUrl"
            href="/admin/regions/appealed"
            class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
          >
            <Icon
              icon="fluent-mdl2:review-request-solid"
              color="#1098ad"
              width="20"
              height="20"
            />
            <span class="mx-4 font-medium">Appealed Reviews</span>
          </Link>
          <div v-if="isAdminUrl" class="pt-1 border-t-2 border-gray-400"></div>
          <!-- DropDown: LOGOUT -->
          <button
            @click="handleLogout"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <img src="/images/icons/logout_bl.png" width="20" height="20" />
            <span class="mx-4 font-medium">Log Out</span>
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
