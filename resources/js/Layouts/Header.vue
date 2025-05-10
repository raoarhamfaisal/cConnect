<script>
import MainSideMenu from "@/Components/tCon/Menu_MainSideMenu.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import Menu_Hamburger from "@/Components/tCon/Menu_HamburgerMenu.vue";
import cConnectWord from "@/Components/tCon/cConnectWord.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-vue3";
import PostForm from "@/Components/tCon/PostForm.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import DialogProfileTabs from "@/Pages/Profile/Partials/main/DialogProfileTabs.vue";
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import { changesSaved, filterBadWordsWithoutValue } from "@/helpers/utilities";
import DialogUpgradeToGoldPlatinum from "@/Components/DialogUpgradeToGoldPlatinum.vue";
import { getToken } from "../helpers/localStorageHelper";

const defaultPostFormObject = {
  user_id: 0,
  title: null,
  image: null,
  body1: null,
  body2: null,
  is_body_bold: false,
  likes: 0,
  repost: 0,
  shares: 0,
  is_body_bold: 0,
  post_text_color_id: null,
  post_background_color_id: null,
  font_size: "0",
  text_alignment: "left",
};

export default {
  components: {
    cConnectWord,
    DialogProfileTabs,
    CustomDialog,
    ButtonPost,
    ButtonRefresh,
    PostForm,
    DialogUpgradeToGoldPlatinum,

    Link,
    MainSideMenu,
    Menu_Hamburger,
    ref,
  },
  props: {
    contentWidth: {
      type: String,
      default: "1440px",
      required: false,
    },
    showit: Boolean,
    showPostButtons: Boolean,
    color: {
      type: String,
      required: false,
    },
    showOnlyNewsFeed: {
      type: Boolean,
      default: true,
      required: false,
    },
    profile: {
      type: Object,
      required: false,
    },
    shouldFetchUserDetails: {
      type: Boolean,
      required: false,
    },
    shouldFetchUserVersion: {
      type: Boolean,
      required: false,
    },

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
      success: false,
      showSpinText: false,
      showingNavigationDropdown: ref(false),

      // SHow fullpage individual post
      postDisplayEnlarged: false,
      postToEnlarge: new Object(),

      // used for PostForm
      playvideo: false,
      isFormOpen: false,
      user_profile: this.profile,
      isFormEdit: false,
      id: null,
      postFormObject: {
        user_id: (this.profile && this.profile.user_id) || null,
        title: null,
        image: null,
        body1: null,
        body2: null,
        is_body_bold: false,
        post_text_color_id: null,
        likes: 0,
        repost: 0,
        region_id: (this.profile && this.profile.region_id) || null,
        trades: [],
        shares: 0,
        is_job_posting: 0,
      },
      userID: null,
      url: usePage().url.value,

      form: defaultPostFormObject,
      paymentCompleted: false,

      // Load postSearch input with current search
      // Object postSearchFilters.postSearch = null or value of serch text
      postSearch: null,
      postSearch: ref(this.postSearchFilters.postSearch),
    };
  },
  computed: {
    ...mapGetters("profile", ["getProfile"]),
    ...mapGetters(["translations", "isUpgradeToGoldPlatinumDialogOpen"]),
  },
  watch: {
    isUpgradeToGoldPlatinumDialogOpen(newVal) {
      if (newVal) {
        this.$refs.upgradeToGoldPlatinumDialogRef.openDialog();
      }
    },
    getProfile(newVal) {
      if (newVal) {
        this.user_profile = newVal;
        this.setInitialData();
      }
    },
    profile(newVal, oldVal) {
      this.postFormObject.user_id =
        (this.profile && this.profile.user_id) || null;
    },
  },

  async mounted() {
    if (!this.profile) {
      await this.fetchProfile();
    } else {
      this.postFormObject.user_id =
        (this.profile && this.profile.user_id) || null;
    }
    this.paymentCompleted =
      this.user_profile.is_payment_verified && this.user_profile.active_user;

    if (
      this.user_profile &&
      (!this.user_profile.is_payment_verified ||
        !this.user_profile.active_user) &&
      this.url !== "/profile-setup" &&
      this.url !== "/inactive-account" &&
      this.url !== "/pricing-plan" &&
      this.url !== "/payment"
    ) {
      this.$refs.paymentDialogRef.openDialog();
    }
    if (this.shouldFetchUserDetails) {
      this.fetchUserDetails();
    }
    if (this.shouldFetchUserVersion) {
      this.fetchUserVersion();
    }
  },

  methods: {
    ...mapActions("profile", ["fetchProfile"]),
    ...mapActions(["fetchUserDetails", "fetchUserVersion"]),
    async saveItem(formData) {
      this.success = false;

      formData.user_id = (this.profile && this.profile.user_id) || null;
      formData.is_body_bold = formData.is_body_bold ? 1 : 0;

      formData.image = formData.image
        ? this.reverseAndJoinString(formData.image)
        : formData.image;

      // Same method for update & create
      // if we have an item id then update
      formData.region_id = +formData.region_id;
      formData.title = formData.title
        ? await filterBadWordsWithoutValue(formData.title)
        : formData.title;
      formData.body1 = formData.body1
        ? await filterBadWordsWithoutValue(formData.body1)
        : formData.body1;
      formData.body2 = formData.body2
        ? await filterBadWordsWithoutValue(formData.body2)
        : formData.body2;
      let url = "/post";
      if (formData.id) {
        url = "/post/" + formData.id;
        formData._method = "PUT";
      }
      // see results - chrome: inpect/network/headers & payload
      // 1) goes to web.php router
      // 2) router listens for Route::post('/post')
      //    to PostController store method
      this.$inertia.post(url, formData, {
        onError: () => {},
        onSuccess: () => {
          this.closeModal();
          this.success = true;
          this.$store.commit("ratings/setShouldFetchFirstPagePosts", true);

          this.fetchUserDetails();
          changesSaved(
            this.translations && this.translations.post_successfully_added
          );
        },
      });
    },
    reverseAndJoinString(inputString) {
      // Split the string into an array
      let arr = inputString.split("|");

      // Reverse the array
      arr = arr.reverse();
      // Join the array back into a string
      return arr.join("|");
    },

    closeModal() {
      this.isFormOpen = false;
    },
    setInitialData() {
      this.id = this.user_profile.id;
      this.postFormObject.region_id =
        this.user_profile.region_id && this.user_profile.region_id.toString();
      this.userID = this.user_profile.user_id;
    },
    closeModalEditMode() {
      // edit was cancelled
      // this make sure any left over temp uploaded
      // file are deleted

      // ****** NOT COMPLETED - WORK ON LATER *******
      this.isFormOpen = false;
    },
    // DISPLAY POST INPUT/EDIT FORM
    // no item # is create new
    openForm(formData) {
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
      this.showingNavigationDropdown = false;
      Inertia.get(
        "/post",
        // include the data to go along with get request
        // because we are using 'get' its going to the query string
        // postSearch=inoput data { preserveState: true }
        { postSearch: this.postSearch }
      );
    },
    openProfileModal() {
      this.$refs.dialogRef.openDialog();
    },
    RefreshPostings() {
      Inertia.get("/post", { postSearch: this.postSearch });
    },
    NavigationDropdown(showingNavigationDropdown) {
      this.showingNavigationDropdown = !this.showingNavigationDropdown;
    },
    handleSubmit() {
      Inertia.visit("/");
    },
  },
};
</script>

<template>
  <Teleport to="body">
    <DialogUpgradeToGoldPlatinum ref="upgradeToGoldPlatinumDialogRef" />
  </Teleport>
  <CustomDialog
    :submitText="translations && translations.okay"
    @submit="handleSubmit"
    :showCancel="false"
    dontAllowCancel
    ref="paymentDialogRef"
    errorIcon
    title="Payment not verified"
  >
    <div class="mb-4 sm:mb-0 mt-4">
      Please complete your payment to access this page
    </div>
  </CustomDialog>
  <DialogProfileTabs ref="dialogRef" :profile="profile" />
  <section
    v-if="
      (user_profile && paymentCompleted) ||
      url === '/profile-setup' ||
      url === '/pricing-plan' ||
      url === '/payment'
    "
    class="bg-gray-100 w-full"
  >
    <!-- Section Container -->
    <div :class="`relative mx-auto mt-0 lg:pt-0 h-screen w-full`">
      <div
        class="flex lg:flex-row lg:justify-start pageContainer lg:items-start w-full bg-gray-100"
      >
        <!-- MAIN SIDE MENU -->
        <!-- ******************************************************* -->

        <MainSideMenu
          :showPostButtons="showPostButtons"
          v-model="postSearch"
          :showit="showit"
          :profile="user_profile"
          :isOpen="isFormOpen"
          @postClicked="openForm"
          @submitPostSearch="submitPostSearch"
          class="lg:w-1/5 xl:w-1/6"
        >
        </MainSideMenu>

        <!-- DISPLAY NEWS FEED -->
        <!-- ******************************************************* -->

        <div
          class="flex flex-col items-center justify-start mx-auto lg:mt-0 h-full overflow-x-hidden bg-gray-200 lg:w-4/5 xl:w-5/6"
          id="scrollable"
          :style="{
            backgroundColor: `${color}`,
          }"
        >
          <div id="NewsFeedScroll" class="h-screen max-lg:pt-14 w-full">
            <!-- FIXED TOP HEADER -->
            <!-- ONLY ON MOBILE       -->
            <header
              class="lg:hidden fixed top-0 left-0 right-0 z-10 h-14 sm:h-16 bg-gray-200"
            >
              <nav class="container max-w-7xl px-1 py-1 pt-2 mx-auto md:px-12">
                <div class="flex items-center justify-between">
                  <!-- LOGO -->
                  <div
                    class="flex items-center justify-start pl-[2px] x365:pl-1 space-x-2"
                  >
                    <!-- <Link href="/" class="xs:hidden md:flex w-12">
                      <img
                        src="/images/logo/icon_blue.png"
                        width="45"
                        height="45"
                      />
                    </Link> -->

                    <Link
                      href="/"
                      class="flex text-xl sx:text-2xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
                    >
                      <cConnectWord />
                    </Link>
                  </div>

                  <!-- Cross X Menu Options -->
                  <div
                    class="flex items-center justify-end sm:space-x-4 space-x-1"
                  >
                    <!-- refresh post icon only -->
                    <ButtonRefresh
                      v-if="showPostButtons"
                      @RefreshPostings="RefreshPostings"
                    ></ButtonRefresh>

                    <!-- View -->
                    <div
                      v-if="showPostButtons"
                      class="flex flex-shrink-0 items-center justify-center"
                    >
                      <button @click="openProfileModal">
                        <img
                          src="/images/icons/news_view.png"
                          class="h-6 w-6 x330:w-7 x330:h-7 xs:w-[38px] xs:h-[38px]"
                        />
                      </button>
                    </div>
                    <Link
                      v-if="!showPostButtons && showOnlyNewsFeed"
                      :href="route('post')"
                      class="block flex justify-center items-center mx-2 py-2 sm:py-3 px-3 sm:px-6 font-bold rounded-lg sm:rounded-xl text-white bg-green-600 hover:bg-green-800 border-green-600"
                    >
                      {{ translations && translations.news_feed }}
                    </Link>

                    <!-- New Post Button -->

                    <ButtonPost
                      v-if="showPostButtons"
                      :isOpen="isFormOpen"
                      @postClicked="openForm"
                    >
                    </ButtonPost>

                    <!-- Hamburger menu button -->
                    <!-- Hamburger -->
                    <div class="-mr-1 x365:-mr-2 flex items-center">
                      <button
                        @click="NavigationDropdown"
                        class="inline-flex items-center justify-center pl-0 py-2 pr-[2px] x365:pr-2 xs:p-2 rounded-md text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
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
                :profile="user_profile"
                :showingNavigationDropdown="showingNavigationDropdown"
                @NavigationDropdown="NavigationDropdown"
                @submitPostSearch="submitPostSearch"
              >
              </Menu_Hamburger>
            </Teleport>

            <Teleport to="body">
              <keep-alive>
                <PostForm
                  v-if="isFormOpen"
                  :isOpen="isFormOpen"
                  :id="user_profile.id"
                  :isEdit="isFormEdit"
                  :form="postFormObject"
                  :success="success"
                  @formsave="saveItem"
                  @formclose="closeModal"
                  @formEditClose="closeModalEditMode"
                >
                </PostForm>
              </keep-alive>
            </Teleport>
            <!-- WRAPPER END: For News Feed -->
            <slot></slot>
          </div>
          <!-- newsfeed scroll -->
        </div>
        <!-- END: DISPLAY NEWS FEED -->
      </div>
    </div>
    <!-- Section Container -->
  </section>
</template>

<style scoped>
.pageContainer {
  margin: auto;
  width: 100%;
}
</style>
