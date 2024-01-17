<script>
// Why is script on top? BECAUSE I LIKE AIT HERE!
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Header from "@/Layouts/Header.vue";

import AppSpinner from "@/Shared/AppSpinner.vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import { Icon } from "@iconify/vue";

import PostDisplay from "@/Components/tCon/PostDisplay.vue";

import { Head, Link } from "@inertiajs/inertia-vue3";
import Loader from "@/Components/Ratings/Loader.vue";

import { ref } from "vue";
import PostDisplayEnlarged from "@/Components/tCon/PostDisplayEnlarged.vue";
import { mapGetters, mapState } from "vuex";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";

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
};

export default {
  components: {
    AuthenticatedLayout,
    Icon,
    Loader,
    AppSpinner,
    tContractorWord,
    Header,
    ButtonPost,
    ButtonRefresh,
    PostDisplayEnlarged,
    PostDisplay,
    Head,
    Link,
    ref,
  },

  mounted() {
    localStorage.setItem("prevUrl", "/post");
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

      this.$nextTick(() => {
        if (this.$refs.loadMoreIntersectPosts) {
          observer.observe(this.$refs.loadMoreIntersectPosts);
        }
      });
    }, 1000);
    this.fetchColors();

    console.log("window.Echo", window.Echo);

    window.Echo.channel("comments") // Replace with your channel name
      .listen("CommentPosted", (data) => {
        console.log("CommentPosted", data);
        this.$store.dispatch("profile/fetchCommentPosted", data);

        // Handle the event (data.g., update your data or UI)
      })
      .listen("CommentUpdated", (data) => {
        console.log("CommentUpdated:", data);
        this.$store.dispatch("profile/fetchComment", data);
        // Handle the event (data.g., update your data or UI)
      })
      .listen("CommentDeleted", (data) => {
        console.log("Comment Deleted:", data);
        this.$store.commit("profile/setPusherCommentToDelete", data.comment);
        // Handle the event (data.g., update your data or UI)
      });

    window.Echo.channel("post") // Replace with your channel name
      .listen("PostCountersChanged", (data) => {
        console.log("data", data);
        const post = data.post;
        const index = this.allPosts.findIndex(
          (post_allPosts) => post.id === post_allPosts.id
        );
        if (index !== -1) {
          this.allPosts[index].repost = post.repost;

          this.allPosts[index].likes_count = data.likesCount;

          this.allPosts[index].dislikes_count = data.dislikesCount;

          this.allPosts[index].your_reaction = data.userReaction;

          if (this.postDisplayEnlarged) {
            this.postToEnlarge = this.allPosts[index];
          }
        }
      });

    window.Echo.channel("commentReactions") // Replace with your channel name
      .listen("CommentReactionOrReplyChanged", (data) => {
        console.log("CommentReactionOrReplyChanged", data);
        this.$store.dispatch("profile/fetchComment", data);

        // Handle the event (e.g., update your data or UI)
      });
  },

  // beforeDestroy() {
  //   window.Echo.leave("your-channel-name");
  // },

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
    contractor_id: {
      type: [String, Number],
      required: false,
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

      textColors: [],
      backgroundColors: [],

      loading: false,
      addedCommentInEnlarge: {},
      previousY: 0,
      previousRatio: 0,
      showSpinText: false,
      showingNavigationDropdown: ref(false),
      loadingPosts: ref(false),
      dontTakeFirstPostOnRepost: false,

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
        return state.ratings.index;
      },
    }),
    ...mapGetters("ratings", [
      "shouldFetchPostsOnClose",
      "shouldLoadPosts",
      "shouldFetchFirstPagePosts",
    ]),
    ...mapGetters("profile", [
      "loadFirstPageWithNoPreserve",
      "updatedPost",
      "updatedPostId",
      "deletedPost",
    ]),

    postsToShow() {
      const allPostsToShow = this.allPosts;

      // Get the modified array
      const modifiedPosts = allPostsToShow.map((item) => {
        return {
          ...item,
          body1: item.body1 ? item.body1.replace(/\n/g, "<br>") : item.body1,
          body2: item.body2 ? item.body2.replace(/\n/g, "<br>") : item.body2,
        };
      });

      return modifiedPosts;
    },
  },
  watch: {
    updatedPostId(newVal) {
      if (newVal > 0) {
        this.getFirstPage();
      }
    },
    deletedPost(newVal) {
      if (newVal && Object.keys(newVal).length > 0) {
        this.getFirstPage();
      }
    },

    loadFirstPageWithNoPreserve(newVal) {
      if (newVal) {
        this.$inertia.get(
          this.posts.first_page_url,
          {},
          {
            // these preserve state keeps our position in the scroll
            preserveState: true,
            preserveScroll: false,
            // 'only' makes sure that inertia only loads current post property
            // not the whole payload. Make sure lazy load is used in controller
            only: ["posts"],
            onSuccess: () => {
              // takes the object posts and appends it to allpost
              this.allPosts = [...this.posts.data];
              this.loadingPosts = false;
              // 'this.initialUrl' is set in script data
              window.history.replaceState(
                {},
                this.$page.title,
                this.initialUrl
              );
              this.$store.commit(
                "profile/setLoadFirstPageWithNoPreserve",
                false
              );
            },
          }
        );
      }
    },
    shouldLoadPosts(newValue) {
      if (this.shouldLoadPosts) {
        this.loadPostsOnChange();
        this.$store.commit("ratings/setShouldLoadPosts", false);
      }
    },
    shouldFetchFirstPagePosts(newVal) {
      if (newVal) {
        this.$inertia.get(
          this.posts.first_page_url,
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
              this.allPosts = [...this.posts.data];
              this.loadingPosts = false;
              // 'this.initialUrl' is set in script data
              window.history.replaceState(
                {},
                this.$page.title,
                this.initialUrl
              );
              this.$store.commit("ratings/setShouldFetchFirstPagePosts", false);
            },
          }
        );
      }
    },
  },
  methods: {
    fetchColors() {
      this.loading = true;

      axios
        .get(`/api/post/text-colors`, getAxiosConfig())
        .then((response) => {
          if (response.data) {
            this.textColors = response.data.textColors;
          }
          return axios.get(`/api/post/background-colors`, getAxiosConfig());
        })
        .then((response) => {
          if (response.data) {
            this.backgroundColors = response.data.backgroundColors;
          }
        })
        .catch((err) => {
          somethingWentWrong();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getFirstPage() {
      this.loadingPosts = true;
      this.$inertia.get(
        this.posts.first_page_url,
        {},
        {
          // these preserve state keeps our position in the scroll
          preserveState: true,
          preserveScroll: false,
          // 'only' makes sure that inertia only loads current post property
          // not the whole payload. Make sure lazy load is used in controller
          only: ["posts"],
          onSuccess: () => {
            // takes the object posts and appends it to allpost
            this.allPosts = [...this.posts.data];
            this.loadingPosts = false;
            // 'this.initialUrl' is set in script data
            window.history.replaceState({}, this.$page.title, this.initialUrl);
          },
        }
      );
    },
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
            if (this.dontTakeFirstPostOnRepost) {
              this.allPosts = [...this.allPosts, ...this.posts.data.slice(1)];
              this.dontTakeFirstPostOnRepost = false;
            } else {
              this.allPosts = [...this.allPosts, ...this.posts.data];
            }
            this.loadingPosts = false;
            // 'this.initialUrl' is set in script data
            window.history.replaceState({}, this.$page.title, this.initialUrl);
          },
        }
      );
    },
    loadPostsOnChange() {
      const pageNumber = Math.ceil((this.index + 1) / this.posts.per_page);

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

    // DISPLAY POST INPUT/EDIT FORM
    // no item # is create new

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
    onAddingEnlargeComment(comment) {
      this.addedCommentInEnlarge = comment;
    },
    onRespost() {
      this.dontTakeFirstPostOnRepost = true;
      this.$inertia.get(
        this.posts.first_page_url,
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
            this.allPosts.unshift(this.posts.data[0]);
            this.loadingPosts = false;
            // 'this.initialUrl' is set in script data
            window.history.replaceState({}, this.$page.title, this.initialUrl);
          },
        }
      );
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
    :show-post-buttons="contractor_id ? false : true"
    contentWidth="1220px"
    :color="contractor_id ? '#bebdbb' : 'rgb(156 163 175)'"
  >
    <!-- color="rgb(156 163 175)" -->
    <!-- POSTING CONTAINER -->
    <div
      class="flex flex-col items-center justify-start mx-auto lg:mr-1 mt-3 sm:mt-6 lg:mt-0 shadow-md sm:rounded-3xl"
    >
      <!-- FULL POST WRAPPER News Feed -->
      <div
        class="flex flex-col w-full items-center justify-start px-2 lg:max-h-screen lg:overflow-y-auto h-screen pb-8"
      >
        <!-- back page -->
        <div v-if="contractor_id" class="self-start w-full mt-6 px-2">
          <div class="flex relative gap-4 mb-4 items-center">
            <Link href="/post">
              <Icon
                class="w-7 h-7"
                icon="icomoon-free:arrow-left"
                color="black"
            /></Link>
            <div
              class="flex sm:absolute sm:transform sm:-translate-x-1/2 sm:left-1/2 items-center gap-2"
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
              <div class="font-extrabold text-2xl text-[#021d91] leading-tight">
                My Posts
              </div>
            </div>
          </div>
        </div>
        <!-- -------for="post in allPosts"------------- -->
        <!-- .slice only allows 400 iterations -->
        <!-- <div v-for="post in allPosts.slice(0, 400)" :key="post.id" -->
        <Loader :loading="loading" background="inherit" height="100vh"></Loader>
        <template v-if="!loading && postsToShow">
          <div
            v-for="(post, index) in postsToShow"
            id="scrollPost"
            :key="post.id"
            class="relative mx-auto w-full py-0"
          >
            <!-- INDIVIDUAL POST DISPLAY WITH MENUS -->
            <PostDisplay
              @onRepost="onRespost"
              :addedCommentInEnlarge="addedCommentInEnlarge"
              :showit="showit"
              :index="index"
              :profile="profile"
              :textColors="textColors"
              :backgroundColors="backgroundColors"
              :post="post"
              :body1Colors="body1Colors"
              @enlarge-post="EnlargePost"
            >
            </PostDisplay>
          </div>

          <!-- v-for="post in allPosts" -->
          <!-- ------------------------------------------- -->

          <!-- Makes call to load more posts calling the script
                             observer.observe(this.$refs.loadMoreIntersectPosts) -->
          <!-- <div ref="loadMoreIntersectPosts" style="width: 5px; height: 5px" />
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
                             observer.observe(this.$refs.loadMoreIntersectPosts) -->
          <span
            ref="loadMoreIntersectPosts"
            style="width: 5px; height: 5px"
          ></span>

          <!-- {{ posts.next_page_url }} -->

          <!-- <AppSpinner v-show="posts.next_page_url" :showSpinText="true">
          <div class="px-5 text-gray-300 mb-8 mt-8">LOADING MORE POSTS!</div>
        </AppSpinner> -->

          <div
            v-show="posts.next_page_url"
            class="flex mb-8 mt-8"
            style="height: 250px; justify-content: center; align-items: center"
          >
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
            <div class="text-white font-semibold text-2xl inline text-center">
              You're all up to date! 🥳
            </div>
          </div>
        </template>

        <div v-if="postDisplayEnlarged">
          <Teleport to="body">
            <PostDisplayEnlarged
              :profile="profile"
              :postEnlarged="postToEnlarge"
              :textColors="textColors"
              :backgroundColors="backgroundColors"
              :body1Colors="body1Colors"
              @close-enlarged="EnLargedPostClosed"
              @onAddingEnlargeComment="onAddingEnlargeComment"
            >
            </PostDisplayEnlarged>
          </Teleport>
        </div>
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
