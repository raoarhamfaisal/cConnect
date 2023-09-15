<script>
// Why is script on top? BECAUSE I LIKE AIT HERE!
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Header from "@/Layouts/Header.vue";
import { Inertia } from "@inertiajs/inertia";

import AppSpinner from "@/Shared/AppSpinner.vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import MainSideMenu from "@/Components/tCon/Menu_MainSideMenu.vue";
import Menu_Hamburger from "@/Components/tCon/Menu_HamburgerMenu.vue";
import PostDisplay from "@/Components/tCon/PostDisplay.vue";
import PostForm from "@/Components/tCon/PostForm.vue";
import Loader from "@/Components/Ratings/Loader.vue";

import { Head, Link } from "@inertiajs/inertia-vue3";
import { ref } from "vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import PostDisplayEnlarged from "@/Components/tCon/PostDisplayEnlarged.vue";
import { mapGetters, mapState } from "vuex";

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
    AuthenticatedLayout,
    AppSpinner,
    tContractorWord,
    Header,
    Loader,
    ResponsiveNavLink,
    ButtonPost,
    ButtonRefresh,
    MainSideMenu,
    Menu_Hamburger,
    PostDisplayEnlarged,
    PostDisplay,
    PostForm,
    Head,
    Link,
    ref,
  },

  mounted() {
    // makes use of javascript IntersectionObserver
    // entries & entry defined by browser as object enters viewing area
    // 'IntersectionObserver' allows us to execute code when something
    // enters or leaves the browser viewport
    // const observer = new IntersectionObserver((entries) =>
    //   entries.forEach((entry) => entry.isIntersecting && this.loadMorePosts(), {
    //     rootMargin: "0px 0px 0px 0px",
    //     threshold: 0,
    //   })
    // );
    // // rootMargin: "-500px 0px -500px 0px",   top right bottom left

    // observer.observe(this.$refs.loadMoreIntersect);
    setTimeout(() => {
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadMorePosts();
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
      });

      observer.observe(this.$refs.loadMoreIntersect);
    }, 1000);
  },

  // unmounted() {

  // },

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
      // (1) intially makes allPosts = to prop posts
      allPosts: this.posts.data,
      // (2) sets the URL to the first url - for looks
      initialUrl: this.$page.url,

      previousY: 0,
      previousRatio: 0,
      showSpinText: false,
      showingNavigationDropdown: ref(false),
      loadingPosts: ref(false),

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

      // Body 1 color array
      body1Colors: [
        "text-gray-900",
        "text-slate-600",
        "text-gray-600",
        "text-zinc-600",
        "text-neutral-600",
        "text-stone-600",
        "text-red-600",
        "text-orange-600",
        "text-amber-600",
        "text-yellow-600",
        "text-lime-600",
        "text-green-600",
        "text-emerald-600",
        "text-teal-600",
        "text-cyan-600",
        "text-sky-600",
        "text-blue-600",
        "text-indigo-600",
        "text-violet-600",
        "text-purple-600",
        "text-fuchsia-600",
        "text-pink-600",
        "text-rose-600",
      ],
    };
  },
  computed: {
    ...mapState({
      index: (state) => {
        console.log("index");
        return state.ratings.index;
      },
    }),
    ...mapGetters("ratings", ["shouldFetchPostsOnClose", "shouldLoadPosts"]),
  },
  watch: {
    shouldLoadPosts(newValue) {
      console.log("inforLoadPosts", this.shouldLoadPosts);
      if (this.shouldLoadPosts) {
        this.loadPostsOnChange();
        this.$store.commit("ratings/setShouldLoadPosts", false);
      }
    },
  },
  methods: {
    loadMorePosts() {
      // Check to see if post proerty has a next page url
      // js function hasMore
      if (this.posts.next_page_url === null) {
        return;
      }

      // next_page_url property returned from Laravel's pagination object.
      // if more pages, use the inertia class to lad url with page #
      // inertia is going to treat this as a data reload, not completely
      // switching component out
      this.loadingPosts = true;
      this.$inertia.get(
        this.posts.next_page_url,
        {},
        {
          // these preserve state keeps our position in the scroll
          preserveState: true,
          preserveScroll: true,
          // 'only' makes sure that inertia only loads current post property
          // not the whole payload. Make sure lazy load is used in controller
          only: ["posts"],
          onSuccess: () => {
            // takes the object posts and appends it to allpost
            this.allPosts = [...this.allPosts, ...this.posts.data];
            this.loadingPosts = false;
            // 'this.initialUrl' is set in script data
            window.history.replaceState({}, this.$page.title, this.initialUrl);
          },
        }
      );
    },
    loadPostsOnChange() {
      const pageNumber = Math.ceil((this.index + 1) / this.posts.per_page);
      console.log(
        "infoLocation",
        window.location.href,
        window.location,
        this.initialUrl
      );
      this.$inertia.get(
        `${window.location.href}?page=${pageNumber}`,
        {},
        {
          preserveState: true,
          preserveScroll: true,
          only: ["posts"],
          onSuccess: () => {
            // Calculate the starting index in the allPosts array
            const startIndex = (pageNumber - 1) * this.posts.per_page;

            console.log(pageNumber, this.index, this.allPosts, "info");
            // Replace items in this.allPosts array
            this.allPosts.splice(
              startIndex,
              this.posts.data.length,
              ...this.posts.data
            );
            // 'this.initialUrl' is set in script data
            window.history.replaceState({}, this.$page.title, this.initialUrl);
          },
        }
      );
    },

    NavigationDropdown(showingNavigationDropdown) {
      this.showingNavigationDropdown = !this.showingNavigationDropdown;
    },
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

    saveItem(formData) {
      // Same method for update & create
      // if we have an item id then update

      let url = "/post";
      if (formData.id) {
        url = "/post/" + formData.id;
        formData._method = "PUT";
      }

      console.log("saveItem: " + url);

      // see results - chrome: inpect/network/headers & payload
      // 1) goes to web.php router
      // 2) router listens for Route::post('/post')
      //    to PostController store method
      this.$inertia.post(url, formData, {
        onError: () => {},
        onSuccess: () => {
          this.closeModal();
        },
      });
    },

    closeModal() {
      this.isFormOpen = false;
    },

    closeModalEditMode() {
      // edit was cancelled
      // this make sure any left over temp uploaded
      // file are deleted

      // ****** NOT COMPLETED - WORK ON LATER *******
      this.isFormOpen = false;
    },

    deleteItem(formData) {
      if (window.confirm("are you sure?")) {
        this.$inertia.post("/posts/" + formData.id, {
          _method: "DELETE",
        });
      }
    },

    EnlargePost(clickedPost) {
      // Toggles display of indiviual post
      // click event is in PostDisplayEnlarged.vue

      this.postToEnlarge = clickedPost;
      this.postDisplayEnlarged = true;
    },

    EnLargedPostClosed() {
      this.postToEnlarge = null;
      this.postDisplayEnlarged = false;
    },
  },
};

// this is script setup, here for reference only
// watch(postSearch, value => {
//     console.log(('changed ' + value));
//     // normal is inertia.get re-renders page
//     // we need to stop that by 3rd argument preserveState: true
//     Inertia.get('/post',
//         // include the data to go along with get request
//         // because we are using 'get' its going to the query string
//         // postSearch=inoput data
//         { postSearch: value },
//         { preserveState: true }
//     );
// });
</script>

<template>
  <Head title="News Feed" />

  <Header
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    contentWidth="1202px"
    color="rgb(156 163 175)"
  >
    <!-- POSTING CONTAINER -->
    <div
      class="flex flex-col items-center justify-start mx-auto lg:mr-1 mt-3 sm:mt-6 lg:mt-0 shadow-md sm:rounded-3xl"
    >
      <!-- FULL POST WRAPPER News Feed -->
      <div
        class="flex flex-col items-center justify-start px-2 lg:max-h-screen lg:overflow-y-auto h-screen pb-8"
      >
        <!-- -------for="post in allPosts"------------- -->
        <!-- .slice only allows 400 iterations -->
        <!-- <div v-for="post in allPosts.slice(0, 400)" :key="post.id" -->
        <div
          v-for="(post, index) in allPosts"
          id="scrollPost"
          :key="post.id"
          class="relative mx-auto w-full py-0"
        >
          <!-- INDIVIDUAL POST DISPLAY WITH MENUS -->
          <PostDisplay
            :showit="showit"
            :index="index"
            :profile="profile"
            :post="post"
            :body1Colors="body1Colors"
            @enlarge-post="EnlargePost"
          >
          </PostDisplay>
        </div>
        <!-- v-for="post in allPosts" -->
        <!-- ------------------------------------------- -->

        <!-- Makes call to load more posts calling the script
                             observer.observe(this.$refs.loadMoreIntersect) -->
        <!-- <div ref="loadMoreIntersect" style="width: 5px; height: 5px" />
        <Loader
          classes="flex gap-2"
          :loading="loadingPosts"
          circleClasses="small-circle"
          textClasses="small-text"
          background="#ccc"
          height="70px"
        ></Loader>
        <AppSpinner v-show="loadingPosts" :showSpinText="true">
          <div class="px-5 text-gray-300 mb-8">LOADING MORE POSTS!</div>
        </AppSpinner> -->

        <!-- Makes call to load more posts calling the script
                             observer.observe(this.$refs.loadMoreIntersect) -->
        <span ref="loadMoreIntersect" style="width: 5px; height: 5px" />

        <!-- {{ posts.next_page_url }} -->

        <!-- <AppSpinner v-show="posts.next_page_url" :showSpinText="true">
          <div class="px-5 text-gray-300 mb-8 mt-8">LOADING MORE POSTS!</div>
        </AppSpinner> -->

        <div v-show="posts.next_page_url" class="flex mt-8">
          <!-- <Loader
            classes="flex gap-2"
            :loading="loadingPosts"
            circleClasses="small-circle"
            textClasses="small-text"
            background="transparent"
            height="70px"
          ></Loader> -->

          <!-- <AppSpinner :showSpinText="true">
            <div class="px-5 text-gray-300 mb-8 mt-8">LOADING MORE POSTS!</div>
          </AppSpinner> -->
          <div class="loader"></div>
          <div class="px-5 text-gray-300">LOADING MORE POSTS!</div>
        </div>

        <div class="h-5"></div>

        <!-- 'next_page_url' is set to null in script -->
        <div v-if="posts.next_page_url === null" class="mt-6">
          <div class="text-gray-300 inline text-center">
            You're all up to date! 🥳
          </div>
        </div>

        <div v-if="postDisplayEnlarged">
          <Teleport to="body">
            <PostDisplayEnlarged
              :profile="profile"
              :postToEnlarge="postToEnlarge"
              :body1Colors="body1Colors"
              @close-enlarged="EnLargedPostClosed"
            >
            </PostDisplayEnlarged>
          </Teleport>
        </div>

        <Teleport to="body">
          <PostForm
            :isOpen="isFormOpen"
            :isEdit="isFormEdit"
            :form="postFormObject"
            @formsave="saveItem"
            @formclose="closeModal"
            @formEditClose="closeModalEditMode"
          >
          </PostForm>
        </Teleport>
      </div>
      <!-- WRAPPER END: For News Feed -->
    </div>
    <!-- END POSTING CONTAINER -->
  </Header>
</template>

<style>
.loader {
  border: 3px solid #f3f3f3;
  /* Light grey */
  border-top: 3px solid #024673;
  /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
