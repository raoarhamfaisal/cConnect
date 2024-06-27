<script>
// Why is script on top? BECAUSE I LIKE AIT HERE!
import { Inertia } from "@inertiajs/inertia";

import AppSpinner from "@/Shared/AppSpinner.vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import PostDisplay from "@/Components/tCon/PostDisplay.vue";
import Loader from "@/Components/Ratings/Loader.vue";

import { Link } from "@inertiajs/inertia-vue3";
import { ref } from "vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import PostDisplayEnlarged from "@/Components/tCon/PostDisplayEnlarged.vue";
import { mapGetters, mapState } from "vuex";
import { somethingWentWrong } from "@/helpers/utilities";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";

const defaultPostFormObject = {
  user_id: 0,
  title: null,
  image: null,
  body1: null,
  body2: null,
  is_body_bold: false,
  post_text_color_id: null,
  likes: 0,
  repost: 0,
  shares: 0,
};

export default {
  components: {
    AppSpinner,
    tContractorWord,
    Loader,
    ResponsiveNavLink,
    ButtonPost,
    ButtonRefresh,
    PostDisplayEnlarged,
    PostDisplay,
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

      observer.observe(this.$refs.loadMoreIntersect);
    }, 1000);
  },

  // unmounted() {

  // },

  props: {
    contractorPosts: {
      type: Object,
      required: true,
    },
    contractorId: {
      type: [String, Number],
    },
    profile: {
      type: Object,
      required: true,
    },

    showit: Boolean,
  },

  data() {
    return {
      // (1) intially makes allPosts = to prop posts
      allPosts: this.contractorPosts.data,
      // (2) sets the URL to the first url - for looks
      initialUrl: this.$page.url,

      previousY: 0,
      previousRatio: 0,
      showSpinText: false,
      posts: this.contractorPosts,
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
    ...mapGetters("profile", ["loadFirstPageWithNoPreserve"]),
    ...mapGetters(["translations"]),
  },
  watch: {
    async loadFirstPageWithNoPreserve(newVal) {
      if (newVal) {
        let url = this.posts.first_page_url;

        // Find the position of "/api" in the string
        let position = url.indexOf("/api");

        // Extract the substring from the position of "/api" to the end of the string
        let cleanedUrl = url.substring(position);
        this.loadingPosts = true;

        try {
          const response = await axios.get(`${cleanedUrl}`, getAxiosConfig());
          if (response.data) {
            const data = response.data;

            this.posts = { ...data.posts };
            this.allPosts = [...data.posts.data];
            this.$store.commit("profile/setLoadFirstPageWithNoPreserve", false);
            this.loadingPosts = false;
          }
        } catch (err) {
          somethingWentWrong(err.message);
          this.loadingPosts = false;
        }
      }
    },
    shouldLoadPosts(newValue) {
      if (this.shouldLoadPosts) {
        this.loadPostsOnChange();
        this.$store.commit("ratings/setShouldLoadPosts", false);
      }
    },
    async shouldFetchFirstPagePosts(newVal) {
      if (newVal) {
        let url = this.posts.first_page_url;

        // Find the position of "/api" in the string
        let position = url.indexOf("/api");

        // Extract the substring from the position of "/api" to the end of the string
        let cleanedUrl = url.substring(position);
        this.loadingPosts = true;

        try {
          const response = await axios.get(`${cleanedUrl}`, getAxiosConfig());
          if (response.data) {
            const data = response.data;

            this.posts = { ...data.posts };
            this.allPosts = [...data.posts.data];
            this.$store.commit("ratings/setShouldFetchFirstPagePosts", false);
            this.loadingPosts = false;
          }
        } catch (err) {
          somethingWentWrong(err.message);
          this.loadingPosts = false;
        }
      }
    },
  },
  methods: {
    async loadMorePosts() {
      // Check to see if post proerty has a next page url
      // js function hasMore
      if (this.posts.next_page_url === null) {
        return;
      }
      this.loadingPosts = true;
      let url = this.posts.next_page_url;

      // Find the position of "/api" in the string
      let position = url.indexOf("/api");

      // Extract the substring from the position of "/api" to the end of the string
      let cleanedUrl = url.substring(position);

      try {
        const response = await axios.get(`${cleanedUrl}`, getAxiosConfig());
        if (response.data) {
          const data = response.data;

          this.posts = { ...data.posts };
          this.allPosts = [...this.allPosts, ...data.posts.data];
          this.loadingPosts = false;
        }
      } catch (err) {
        somethingWentWrong(err.message);
        this.loadingPosts = false;
      }
    },
    async loadPostsOnChange() {
      const pageNumber = Math.ceil((this.index + 1) / this.posts.per_page);

      try {
        const response = await axios.get(
          `/api/contractor/post/${this.contractorId}?page=${pageNumber}`,
          getAxiosConfig()
        );
        if (response.data) {
          const data = response.data;

          this.posts = { ...data.posts };
          const startIndex = (pageNumber - 1) * this.posts.per_page;

          // Replace items in this.allPosts array
          this.allPosts.splice(
            startIndex,
            this.posts.data.length,
            ...this.posts.data
          );
        }
      } catch (err) {
        somethingWentWrong(err.message);
      }
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
  },
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-start mx-auto lg:mr-1 mt-3 sm:mt-6 lg:mt-0 shadow-md sm:rounded-3xl"
  >
    <!-- FULL POST WRAPPER News Feed -->
    <div class="flex flex-col items-center w-full justify-start px-2">
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

      <span ref="loadMoreIntersect" style="width: 5px; height: 5px" />

      <div
        v-show="posts.next_page_url"
        class="flex"
        style="height: 100px; justify-content: center; align-items: center"
      >
        <div class="loader"></div>
        <div class="px-5 text-gray-700">LOADING MORE POSTS!</div>
      </div>

      <div class="h-5"></div>

      <!-- 'next_page_url' is set to null in script -->
      <div
        v-if="posts.next_page_url === null && allPosts && allPosts.length > 0"
        class="mb-8"
      >
        <div class="text-gray-300 inline text-center">
          {{ translations && translations.youre_all_up_to_date }} 🥳
        </div>
      </div>

      <div
        v-if="allPosts && allPosts.length === 0 && posts.next_page_url === null"
        class="mb-8 flex items-center justify-center h-72"
      >
        <div class="text-gray-800 inline text-center">
          {{ translations && translations.no_posts_found_for_this_contractor }}
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
    </div>
    <!-- WRAPPER END: For News Feed -->
  </div>
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
