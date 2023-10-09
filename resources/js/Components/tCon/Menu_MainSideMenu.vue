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
const emit = defineEmits([
  "update:modelValue",
  "submitPostSearch",
  "postClicked",
]);
const store = useStore();
const dialogRef = ref();
const contractorPageRef = ref();
const showContractorPageModal = ref(false);

const newPostSearchValue = () => {
  emit("submitPostSearch");
};

function postClicked(isOpen) {
  isOpen = false;
  emit("postClicked", isOpen);
}
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
        <Avatar :imageSrc="`/${profile.user_avatar}`" class="sm:w-24 sm:h-24" />
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
      <div class="flex flex-col items-center mt-6 -mx-2">
        <!-- New Post Button -->
        <ButtonPost
          v-if="showPostButtons"
          :isOpen="isOpen"
          @postClicked="postClicked"
        >
        </ButtonPost>

        <div class="mt-4" v-if="showPostButtons">
          <ButtonRefresh></ButtonRefresh>
        </div>

        <!-- SEARCH POSTINGS -->
        <div class="relative mt-6">
          <form>
            <!-- +++++++++++++++++++++++++++++++++++++++ -->

            <div class="flex justify-center">
              <div class="mb-0">
                <div
                  class="relative mb-2 flex w-full flex-wrap items-stretch transition duration-300 ease-in-out focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
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
      <div class="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <!-- all contractors -->

          <!-- MENU ITEMS -->

          <Link
            v-if="Inertia.page.component != 'Postings'"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            :href="route('post')"
          >
            <img src="/images/icons/newsfeed.png" width="30" height="30" />
            <span class="mx-4 font-medium">News Feed</span>
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
            <span class="mx-4 font-medium">Your Ratings</span>
          </Link>

          <!-- SUB-FINDER SEARCH -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="#"
          >
            <img src="/images/icons/contractor.png" width="30" height="30" />
            <span class="mx-4 font-medium">Sub-Finder</span>
          </Link>

          <!-- RED FLAGS / SLIPPERY APPLES SEARCH -->
          <Link
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
            href="#"
          >
            <img src="/images/icons/redflag.png" width="30" height="30" />
            <span class="mx-4 font-medium text-cyan-600">Red Flags</span>
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

          <hr class="mt-4 ml-6 mr-6 pt-4 pb-1 border-t-2 border-gray-400" />

          <!-- VIEW SETTINGS -->
          <button
            @click="openProfileModal"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <img src="/images/icons/news_view.png" width="30" height="30" />
            <span class="mx-4 font-medium text-cyan-600">View Settings</span>
          </button>

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
            href="#"
          >
            <img src="/images/icons/contactus.png" width="30" height="30" />
            <span class="mx-4 font-medium">Contact Us</span>
          </Link>

          <!-- admin section -->
          <hr
            v-if="isAdminUrl"
            class="mt-4 ml-6 mr-6 pt-4 pb-1 border-t-2 border-gray-400"
          />
          <Link
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
          <!-- Appealed Reviews -->
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
          </Link>
          <hr
            v-if="isAdminUrl"
            class="mt-4 ml-6 mr-6 pt-4 pb-1 border-t-2 border-gray-400"
          />

          <!-- LOG OUT -->
          <button
            @click="handleLogout"
            class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
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
