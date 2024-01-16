<script>
import MainSideMenu from "@/Components/tCon/Menu_MainSideMenu.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import Menu_Hamburger from "@/Components/tCon/Menu_HamburgerMenu.vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import { Inertia } from "@inertiajs/inertia";

const defaultPostFormObject = {
  user_id: 0,
  title: null,
  image: null,
  body1: null,
  body2: null,
  body1Bold: false,
  body1ColorId: 0,
  likes: 0,
  repost: 0,
  shares: 0,
};

export default {
  components: {
    tContractorWord,
    ButtonPost,
    ButtonRefresh,
    MainSideMenu,
    Menu_Hamburger,
  },
  props: {
    posts: {
      type: Object,
      required: true,
    },

    profile: {
      type: Object,
      required: true,
    },

    showit: Boolean,

    // get existing search filters on page
    // from PostController.php
    // this.postSearchFilters.postSearch = value or null
    postSearchFilters: {
      type: Object,
      default: () => ({
        postSearch: "",
      }),
    },
  },

  data() {
    return {
      // (2) sets the URL to the first url - for looks
      initialUrl: this.$page.url,

      previousY: 0,
      previousRatio: 0,
      showSpinText: false,
      showingNavigationDropdown: ref(false),

      // SHow fullpage individual post
      postDisplayEnlarged: false,
      postToEnlarge: new Object(),

      // used for PostForm
      playvideo: false,
      isFormOpen: false,
      isFormEdit: false,
      postFormObject: defaultPostFormObject,
      userID: this.profile.user_id,

      form: defaultPostFormObject,

      // Load postSearch input with current search
      // Object postSearchFilters.postSearch = null or value of serch text
      postSearch: null,
      postSearch: ref(this.postSearchFilters.postSearch),
    };
  },

  methods: {
    // DISPLAY POST INPUT/EDIT FORM
    // no item # is create new
    openForm(formData) {
      // console.log(('Post button clicked'))
      this.showingNavigationDropdown = false;
      this.isFormOpen = true;
      this.isFormEdit = !!formData; // !! conversts a "truthy" or "falsey" to
      // boolean true or false
      // So if e=tiem is null or "0" then
      // make isFormEdit false or Create Mode
      // If a value there its "truthy" and make
      // isFormEdit true or edit mode.

      // if formData is "truthy" (has data) then assign postFormObject with the
      // object associated with form# else assign it the defaultPostFormObject
      // and set user_id to the current user

      // btw, we need to explicitly make a copy of the form object when
      // we assign it to the postFormObject... do it by calling Object.assign()

      if (this.isFormEdit) {
        // existing Post
        this.form = Object.assign({}, formData);
      } else {
        // New Post
        formData = defaultPostFormObject;
        this.postFormObject.user_id = this.userID;
      }

      // And, reset error messages everytime we open the form
      this.$page.props.errors = {};
    },
    // Input search from Menu_HamburgerMenu & Menu_MainSideMenu
    submitPostSearch() {
      console.log("***** postSearch submitted: " + this.postSearch);
      this.showingNavigationDropdown = false;
      Inertia.get(
        "/post",
        // include the data to go along with get request
        // because we are using 'get' its going to the query string
        // postSearch=inoput data { preserveState: true }
        { postSearch: this.postSearch }
      );
    },
    RefreshPostings() {
      console.log("Refreshed with search: " + this.postSearch);
      Inertia.get("/post", { postSearch: this.postSearch });
    },
    NavigationDropdown(showingNavigationDropdown) {
      this.showingNavigationDropdown = !this.showingNavigationDropdown;
    },
  },
};
</script>

<template>
  <section class="bg-gray-100">
    <!-- Section Container -->
    <div class="relative mx-auto mt-0 lg:mt-2 pt-10 lg:pt-0 h-screen">
      <div class="flex lg:flex-row lg:justify-center lg:items-start lg:gap-x-5">
        <!-- MAIN SIDE MENU -->
        <!-- ******************************************************* -->

        <MainSideMenu
          v-model="postSearch"
          :showit="showit"
          :profile="profile"
          :isOpen="isFormOpen"
          @postClicked="openForm"
          @submitPostSearch="submitPostSearch"
        >
        </MainSideMenu>

        <!-- DISPLAY NEWS FEED -->
        <!-- ******************************************************* -->

        <div
          class="flex flex-col items-center justify-start mx-auto lg:mx-1 lg:mt-0 h-full overflow-x-hidden bg-gray-400"
        >
          <div id="NewsFeedScroll" class="">
            <!-- FIXED TOP HEADER -->
            <!-- ONLY ON MOBILE       -->
            <header
              class="lg:hidden fixed top-0 left-0 right-0 z-10 h-14 sm:h-16 bg-gray-400"
            >
              <nav class="container max-w-7xl px-1 py-1 pt-2 mx-auto md:px-12">
                <div class="flex items-center justify-between">
                  <!-- LOGO -->
                  <div class="flex items-center justify-start pl-1 space-x-2">
                    <Link href="/" class="xs:hidden md:flex w-12">
                      <img
                        src="images/logo/icon_blue.png"
                        width="45"
                        height="45"
                      />
                    </Link>

                    <Link
                      href="/"
                      class="hidden xs:flex text-2xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
                    >
                      <tContractorWord />
                    </Link>
                  </div>

                  <!-- Cross X Menu Options -->
                  <div
                    class="flex items-center justify-end sm:space-x-4 space-x-2"
                  >
                    <!-- refresh post icon only -->
                    <ButtonRefresh
                      @RefreshPostings="RefreshPostings"
                    ></ButtonRefresh>

                    <!-- Contractor Page -->
                    <div
                      class="hidden sx:flex flex-shrink-0 items-center justify-center"
                    >
                      <Link href="#">
                        <img
                          src="images/icons/contractorpage_b.png"
                          width="45"
                          height="45"
                        />
                      </Link>
                    </div>

                    <!-- New Post Button -->
                    <ButtonPost :isOpen="isFormOpen" @postClicked="openForm">
                    </ButtonPost>

                    <!-- Hamburger menu button -->
                    <!-- Hamburger -->
                    <div class="-mr-2 flex items-center">
                      <button
                        @click="NavigationDropdown"
                        class="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
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
              </nav>
            </header>

            <Teleport to="body">
              <Menu_Hamburger
                v-model="postSearch"
                :showit="showit"
                :profile="profile"
                :showingNavigationDropdown="showingNavigationDropdown"
                @NavigationDropdown="NavigationDropdown"
                @submitPostSearch="submitPostSearch"
              >
              </Menu_Hamburger>
            </Teleport>

            <slot></slot>
          </div>
          <!-- nrewsfeed scroll -->
        </div>
        <!-- END: DISPLAY NEWS FEED -->
      </div>
    </div>
    <!-- Section Container -->
  </section>
</template>
