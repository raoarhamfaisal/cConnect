<script>
// SCRIPT UP TOP BECAUSE I LIKE IT HERE!
import { InertiaLink, usePage } from "@inertiajs/inertia-vue3";
import Avatar from "@/Components/Ratings/Avatar.vue";
import StarRounded from "@/Components/Ratings/StarRounded.vue";

import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import PostingActionMenu from "@/Components/tCon/PostingActionMenu.vue";
import PostImageDisplay from "@/Components/tCon/PostImageDisplay.vue";
import throttle from "lodash/throttle";

import { Link } from "@inertiajs/inertia-vue3";
import { ref } from "vue";
import { mapGetters } from "vuex";
import DialogContractorRating from "@/Components/Ratings/Contractor/DialogContractorRating.vue";

export default {
  components: {
    InertiaLink,
    tContractorWord,
    ButtonPost,
    ButtonRefresh,
    StarRounded,
    PostingActionMenu,
    Avatar,
    PostImageDisplay,
    Link,
    ref,
    throttle,
    DialogContractorRating,
  },

  mounted() {
    // console.log('content', this.post);
    // this.post.body1 = this.post.body1.replace(/\/n/g, '<br>');
    // Remove PostingActionMenu upon scroll
    // const scrollElement = document.querySelector('#scrollPost');
    // console.log((scrollElement));

    // scrollElement.addEventListener("scroll",
    //     throttle(this.ScreenPostingActionMenu, 1000));

    // Remove PostingActionMenu upon scroll
    // ERROR ONLY WORKS IN MOBILE BECAUSE LOOKING AT WINDOW140
    this.$nextTick(() => {
      this.checkContentHeight();
    });
    window.addEventListener(
      "scroll",
      throttle(this.HidePostingActionMenu, 500)
    );
  },

  unmounted() {
    // scrollElement.removeEventListener("scroll",
    //     throttle(this.ScreenPostingActionMenu, 1000));

    window.removeEventListener(
      "scroll",
      throttle(this.HidePostingActionMenu, 500)
    );
  },

  props: {
    showit: Boolean,
    index: Number,
    // profile of current logged in user (postings.vue)
    profile: {
      type: Object,
      required: true,
    },

    // Individual post from v-for posts (postings.vue)
    post: {
      type: Object,
      required: true,
    },
    textColors: {
      type: Array,
      required: true,
    },
    backgroundColors: {
      type: Array,
      required: true,
    },

    // array of colors for top body text (postings.vue)
    body1Colors: {
      type: Array,
      required: true,
    },
  },
  data() {
    let usePageDeatails = usePage().props.value;
    return {
      showingPostingActionMenu: ref(false),
      dialogRef: ref(),
      user: usePageDeatails.auth.user,
      customBgColor: "",
      text_alignment: "left",
      text_color: "",
      profileId: usePageDeatails.profile.id,
      isContentOverflow: false,
      lineHeight: 0,
      showFullTextBody1: false,
      showFullTextBody2: false,
      truncatedLength: this.$store.state.screenWidth > 769 ? 300 : 150,
      truncatedLengthBody2: this.$store.state.screenWidth > 769 ? 200 : 120,
    };
  },

  computed: {
    ...mapGetters(["screenWidth"]),
    toggleClass() {
      return `cursor-pointer ${
        this.customBgColor.startsWith("#") ? "text-sky-400" : "text-sky-700"
      }`;
    },
    textStyle() {
      if (this.showFullTextBody1) {
        return {
          maxHeight: "none",
          overflow: "hidden",
          display: "inline",
          fontSize: `${16 + +this.post.font_size}px`,
          color: this.text_color,
        };
      } else {
        return {
          maxHeight: this.lineHeight * 4 + "px",
          fontSize: `${16 + +this.post.font_size}px`,
          overflow: "hidden",
          display: "block",

          color: this.text_color,
        };
      }
    },
    numberOfImages: {
      // Gets the number of images in post.image string
      // passed as prop to PostImageDisplay.vue
      get: function () {
        if (this.post.image.length > 0) {
          return this.post.image.split("|").length;
        } else {
          return 0;
        }
      },
    },
    body1Class: function () {
      // let regex = /class="([^"]*text-[^"]*)"/;
      // let regex2 = /class="([^"]*justify-[^"]*)"/;

      // let match = this.post.body1.match(regex);
      // let match2 = this.post.body1.match(regex2);

      // let className = match ? match[1] : ""; // Extract the classes
      // let className2 = match2 ? match2[1] : ""; // Extract the classes
      let className, className2;
      if (this.post.is_body_bold) {
        className = "font-bold";
      }
      if (this.post.text_alignment) {
        this.text_alignment =
          this.post.text_alignment === "left"
            ? " text-left"
            : this.post.text_alignment === "center"
            ? " text-center"
            : " text-right";
      }
      if (this.post.post_text_color_id) {
        this.textColors.forEach((color) => {
          if (color.id === this.post.post_text_color_id) {
            this.text_color = color.color;
          }
        });
      }
      if (this.post.post_background_color_id) {
        this.backgroundColors.forEach((color) => {
          if (color.id === this.post.post_background_color_id) {
            this.customBgColor = color.color;
          }
        });
      }

      // let bgClassMatch = className.match(/bg-\[#([a-zA-Z0-9]+)\]/);

      // if (bgClassMatch) {
      //   // this.post.body1 = this.post.body1.replace(bgClassMatch[0], ""); // Remove the bg-[#...] class from post.body1
      //   this.customBgColor = "#" + bgClassMatch[1]; // Set the custom background color (with '#')
      // }

      return className + " " + className2;
    },

    displayedBody1() {
      let content = this.post.body1;
      if (content) {
        content = content.replace(/\/n/g, "<br>"); // Replace /n with <br>
      }
      return this.processUrls(content);

      // if (this.showFullTextBody1 || content?.length <= this.truncatedLength) {
      //   return this.processUrls(content);
      // } else {
      //   let truncated = content?.substring(0, this.truncatedLength);
      //   // Ensure it doesn't cut off in the middle of a word if and only if it's actually being truncated
      //   if (truncated?.length >= this.truncatedLength) {
      //     truncated = truncated.substring(0, truncated.lastIndexOf(" "));
      //   }
      //   return this.processUrls(truncated);
      // }
    },

    displayedBody2() {
      let content = this.post.body2;
      if (content) {
        content = content.replace(/\/n/g, "<br>"); // Replace /n with <br>
      }

      if (
        this.showFullTextBody2 ||
        content?.length <= this.truncatedLengthBody2
      ) {
        return this.processUrls(content);
      } else {
        let truncated = content?.substring(0, this.truncatedLengthBody2);
        // Ensure it doesn't cut off in the middle of a word if and only if it's actually being truncated
        if (truncated?.length >= this.truncatedLengthBody2) {
          truncated = truncated.substring(0, truncated.lastIndexOf(" "));
        }
        return this.processUrls(truncated);
      }
    },

    processedBody1() {
      return this.processUrls(this.post.body1);
    },
    // processedTopText() {
    //   const parser = new DOMParser();
    //   const doc = parser.parseFromString(this.post.body1, "text/html");

    //   doc.querySelectorAll("a").forEach((anchor) => {
    //     const hrefValue = anchor.getAttribute("href");
    //     if (
    //       !hrefValue.startsWith("http://") &&
    //       !hrefValue.startsWith("https://")
    //     ) {
    //       anchor.setAttribute("href", "http://" + hrefValue);
    //     }
    //     anchor.target = "_blank";
    //   });

    //   return doc.body.innerHTML;
    // },

    processedBody2() {
      return this.processUrls(this.post.body2);
    },
    // Places the post.image string into an array to be
    // passed as prop to PostImageDisplay.vue
    imageArray: {
      get: function () {
        if (this.post.image.length > 0) {
          // split string into an array
          let videoArray = [];

          let newImageArray = this.post.image.split("|");
          return newImageArray;
        } else {
          return [];
        }
      },
    },
  },
  watch: {
    post: {
      handler: "checkContentHeight",
      deep: true,
    },
    showFullTextBody1: "checkContentHeight",
  },
  methods: {
    NavPostingActionMenu(showingPostingActionMenu) {
      this.showingPostingActionMenu = !this.showingPostingActionMenu;
    },
    checkContentHeight() {
      const textElement = this.$refs.textElement;
      if (!textElement) {
        return;
      }

      this.lineHeight = parseInt(
        window.getComputedStyle(textElement).lineHeight
      );
      const maxHeight = this.lineHeight * 4;
      console.log(
        "Checking content height",
        textElement.offsetHeight,
        textElement.scrollHeight,
        maxHeight
      );
      this.isContentOverflow =
        textElement.offsetHeight || textElement.scrollHeight > maxHeight;
    },

    HidePostingActionMenu(showingPostingActionMenu) {
      this.showingPostingActionMenu = false;
    },
    openDialog() {
      this.$refs.dialogRef.openDialog();
      this.$store.commit("ratings/setIndex", this.index);
    },
    processUrls(body) {
      // Improved regex: capture URLs but stop if a '<' character (start of a potential HTML tag) is encountered
      const urlRegex = /(https?:\/\/[^<\s]+|www\.[^<\s]+)/g;
      return body?.replace(urlRegex, function (url) {
        let actualUrl = url.startsWith("http") ? url : "http://" + url;
        return `<a @click.self.stop="()=>{}" href="${actualUrl}" target="_blank">${url}</a>`;
      });
    },
    toggleText() {
      this.showFullTextBody1 = !this.showFullTextBody1;
    },
    toggleTextBody2() {
      this.showFullTextBody2 = !this.showFullTextBody2;
    },
  },
};
</script>

<template>
  <DialogContractorRating
    ref="dialogRef"
    :loggedInUserId="profileId"
    :userId="post.user_id"
  />
  <!-- {{ profile }} -->
  <div
    v-if="post.view"
    class="z-48 flex flex-col items-center justify-start my-2 py-1 lg:py-1 px-2 bg-gray-200 border-2 border-gray-300 rounded-lg drop-shadow-lg"
  >
    <!-- INDIVIDUAL POST:


        TOP ROW MENUS
        POST ACTIONS MENU -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div class="flex flex-row justify-between items-center w-full mb-2 mt-2">
      <!-- User Avatar & User /// INDIVIDUAL POST: TOP POSTING ROW -->
      <Link
        :href="`/contractor/${post.user_id}`"
        class="flex flex-row gap-2 justify-start items-center"
      >
        <!-- Avatar -->
        <div
          class="cursor-pointer flex justify-start items-start flex-none w=16"
        >
          <!-- <Link :href="route('post.show')" class="block "> -->
          <div class="block">
            <Avatar
              :style="{
                width: screenWidth >= 640 ? '4.5rem' : '3.7rem',
                height: screenWidth >= 640 ? '4.5rem' : '3.7rem',
              }"
              :imageSrc="post.user_avatar"
            />
          </div>
        </div>
        <!-- User Info -->
        <div class="flex flex-col justify-center ml-1">
          <h2
            class="font-bold text-lg sm:text-xl"
            style="line-height: 1.5rem"
            @click="$emit('enlarge-post', post)"
          >
            <!-- {{  post }} -->
            {{ post.id }}: {{ post.title }}
          </h2>
          <div class="">
            {{ post.company_name }}
          </div>

          <div class="">
            <h2 class="font-light text-sm overflow-hidden">
              {{ post.city }} {{ post.state }}
            </h2>
          </div>
        </div>
      </Link>

      <!-- Ratings / post action menu / posting date -->
      <div
        class="flex flex-row justify-end items-center self-start flex-none w-28"
      >
        <!-- User RATINGS /// INDIVIDUAL POST: TOP POSTING ROW -->
        <div class="flex flex-row flex-none justify-end items-center px-2">
          <!-- Premium Marking -->
          <!-- <div class="">
            <img src="/images/icons/pre-diamond.png" width="20" height="30" />
          </div> -->

          <!-- ${
              user.id === post.user_id ? 'pointer-events-none' : ''
            } -->
          <div class="flex flex-col md:mt-2 justify-center items-center">
            <StarRounded
              @click="openDialog"
              :innerStarRadius="screenWidth > 768 ? 17 : 13"
              :starWidth="screenWidth > 768 ? 24 : 15"
              :class="`h-4 md:h-6 cursor-pointer`"
              :indicatorClasses="`text-small h-4 md:h-6 `"
              :starHeight="screenWidth > 768 ? 24 : 15"
              :rating="
                Number(
                  parseFloat(
                    post.average_rating ? post.average_rating : 0.0
                  ).toFixed(1)
                )
              "
              :isIndicatorActive="false"
            />

            <div class="md:mt-2">
              <h2
                class="font-light text-xs md:text-sm overflow-hidden tracking-tighter"
              >
                {{ post.total_reviews }}
              </h2>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE --- POST ACTION MENU
                                & time since posting -->
        <div
          class="flex flex-col flex-initial flex-nowrap justify-center items-center mr-3"
        >
          <!-- POST MENU -->
          <!-- <div class="">
                        <h2 class="font-bold text-xl overflow-hidden
                                   tracking-tighter
                                   sm:tracking-wide">
                            ---
                        </h2>
                    </div> -->

          <!-- Hamburger -->
          <div class="-mr-2 flex items-center">
            <button
              @click="NavPostingActionMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-500 hover:bg-gray-100 dfocus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  :class="{
                    hidden: showingPostingActionMenu,
                    'inline-flex': !showingPostingActionMenu,
                  }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  :class="{
                    hidden: !showingPostingActionMenu,
                    'inline-flex': showingPostingActionMenu,
                  }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="">
            <h2
              class="flex flex-nowrap font-light text-xs tracking-tighter italic"
            >
              20 hrs
            </h2>
          </div>
        </div>
      </div>
      <!-- END Ratings / post action menu / posting date -->
    </div>
    <!-- End TOP POSTING ROW -->

    <!-- Text Body1 UPPER -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div
      :class="`${text_alignment} ${
        customBgColor.startsWith('#')
          ? ' flex-col w-full items-center  px-2 py-32 rounded-md shadow-lg border-2'
          : 'w-full'
      } `"
      @click="$emit('enlarge-post', post)"
      class=""
      :style="{ backgroundColor: customBgColor }"
    >
      <span
        v-show="post.body1"
        v-html="displayedBody1"
        :style="textStyle"
        :class="`${body1Class} w-full processed-body inline`"
        ref="textElement"
      ></span>
      <span
        v-if="isContentOverflow"
        @click.self.stop="toggleText"
        :class="`${toggleClass} ${showFullTextBody1 ? 'inline' : 'inline'} `"
      >
        {{ showFullTextBody1 ? "...less" : "...more" }}
      </span>
      <!-- <span
        v-if="!showFullTextBody1 && post.body1?.length > truncatedLength"
        @click.self.stop="toggleText"
        :class="`cursor-pointer ${
          customBgColor.startsWith('#') ? 'text-sky-400' : 'text-sky-700'
        }`"
      >
        ...more
      </span>

      <span
        v-if="showFullTextBody1 && post.body1?.length > truncatedLength"
        @click.self.stop="toggleText"
        :class="`cursor-pointer ${
          customBgColor.startsWith('#') ? 'text-sky-400' : 'text-sky-700'
        }`"
      >
        ...less
      </span> -->
    </div>
    <!-- <div
      v-show="post.body1"
      @click="$emit('enlarge-post', post)"
      class="flex flex-row justify-center items-center w-full px-2 text-lg xs:text-xl md:text-2xl"
      :class="[
        body1Colors[post.post_text_color_id],
        post.is_body_bold ? 'font-bold' : 'font-normal',
      ]"
    >
      {{ post.body1 }}
    </div> -->

    <!-- INDIVIDUAL POST: MAIN IMAGES  -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div class="flex flex-row justify-center w-full mb-1">
      <!-- justify-center  -->

      <div
        class="w-full"
        v-if="post.image"
        @click="$emit('enlarge-post', post)"
      >
        <PostImageDisplay
          :imageArray="imageArray"
          :numberOfImages="numberOfImages"
        >
        </PostImageDisplay>
      </div>
    </div>

    <!-- Text Body2 LOWER -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <!-- <div
      class="flex flex-row justify-center items-center w-full px-2 mt-0 mb-0 text-base xs:text-lg md:text-xl font-normal text-gray-900"
      @click="$emit('enlarge-post', post)"
    >
      {{ post.body2 }}
    </div> -->
    <div class="mb-3 mt-3">
      <div
        v-show="post.body2"
        v-html="displayedBody2"
        @click="$emit('enlarge-post', post)"
        class="processed-body inline justify-center items-center w-full text-base xs:text-lg md:text-xl font-normal text-gray-900"
      ></div>
      <span
        v-if="!showFullTextBody2 && post.body2?.length > truncatedLengthBody2"
        @click="toggleTextBody2"
        class="cursor-pointer text-sky-700"
      >
        ...more
      </span>
      <span
        v-if="showFullTextBody2 && post.body2?.length > truncatedLengthBody2"
        @click="toggleTextBody2"
        class="cursor-pointer text-sky-700"
      >
        ...less
      </span>
    </div>

    <!-- INDIVIDUAL POST: BOTTOM ROW MENU -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div class="flex flex-row justify-between items-center w-full mb-2">
      <!-- Likes -->
      <div class="">
        <Link
          href="#"
          class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="">
              <img src="/images/icons/like_green.png" width="25" height="25" />
            </div>
            <div class="pl-1">
              {{ post.likes }}
            </div>
          </div>
        </Link>
      </div>

      <!-- Comments -->
      <div class="">
        <Link
          href="#"
          class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="">
              <img
                src="/images/icons/comment_icon.png"
                width="25"
                height="25"
              />
            </div>
            <div class="pl-1">12,999</div>
          </div>
        </Link>
      </div>

      <!-- Re-Posted -->
      <div class="">
        <Link
          href="#"
          class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="">
              <img src="/images/icons/share_icon.png" width="25" height="25" />
            </div>
            <div class="pl-1">
              {{ post.repost }}
            </div>
          </div>
        </Link>
      </div>

      <!-- Shares -->
      <div class="">
        <Link
          href="#"
          class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="">
              <img
                src="/images/icons/share_out_icon.png"
                width="20"
                height="17"
              />
            </div>
            <div class="pl-1">
              {{ post.shares }}
            </div>
          </div>
        </Link>
      </div>
    </div>

    <PostingActionMenu
      :showingPostingActionMenu="showingPostingActionMenu"
      :postID="post.id"
      :postUserId="post.user_id"
      :currentUserId="profile.user_id"
      @NavPostingActionMenu="NavPostingActionMenu"
    >
    </PostingActionMenu>
  </div>
</template>
<style>
.processed-body a {
  color: blue;
  text-decoration: none;
}

.processed-body a:hover {
  text-decoration: underline;
}
</style>
<!--
  should be present on @input
  const adjustHeight = () => {
  nextTick(() => {
    editor.value.style.height = 'auto'; // Reset height first to get the correct scrollHeight
    editor.value.style.height = editor.value.scrollHeight + 'px';
  });
};
.editor {
  min-height: 200px;
  overflow-y: hidden; /* Hide vertical scrollbar */
  resize: none; /* Disable textarea resizing */
} -->
