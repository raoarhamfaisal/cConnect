<script>
// SCRIPT UP TOP BECAUSE I LIKE IT HERE!
import { usePage } from "@inertiajs/inertia-vue3";
import Avatar from "@/Components/Ratings/Avatar.vue";
import StarRounded from "@/Components/Ratings/StarRounded.vue";

import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import LikedUser from "@/Components/PostFooter/LikedUser.vue";
import DialogAllComments from "@/Components/PostFooter/DialogAllComments.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import PostingActionMenu from "@/Components/tCon/PostingActionMenu.vue";
import PostImageDisplay from "@/Components/tCon/PostImageDisplay.vue";
import throttle from "lodash/throttle";

import { Link } from "@inertiajs/inertia-vue3";
import { ref } from "vue";
import { mapGetters } from "vuex";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import DialogContractorRating from "@/Components/Ratings/Contractor/DialogContractorRating.vue";

import TwoVisibleComments from "@/Components/PostFooter/TwoVisibleComments.vue";

import { Icon } from "@iconify/vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { filterBadWordsWithoutValue } from "@/helpers/utilities";
import InputError from "@/Components/InputError.vue";

export default {
  components: {
    TwoVisibleComments,

    tContractorWord,
    ButtonPost,
    ButtonRefresh,
    StarRounded,
    Icon,
    PostingActionMenu,
    InputError,
    CustomDialog,
    LikedUser,
    DialogAllComments,
    Avatar,
    PostImageDisplay,
    Link,
    ref,
    throttle,
    DialogContractorRating,
    Icon,
  },

  mounted() {
    // Remove PostingActionMenu upon scroll
    // ERROR ONLY WORKS IN MOBILE BECAUSE LOOKING AT WINDOW140
    this.fetchAllComments();
    this.$nextTick(() => {
      this.checkContentHeight();
      this.checkContentHeightBody2();
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
    addedCommentInEnlarge: {
      type: Object,
      default: {},
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
      commentTextError: "",
      commentText: "",
      showingPostingActionMenu: ref(false),
      contractorRatingDialogRef: ref(),
      customBgColor: "",
      isPostVisible: false,
      text_alignment: "left",
      text_color: "",
      title_text_alignment: "",
      titleCustomBgColor: "left",
      title_text_color: "",
      isContentOverflow: false,
      isContentOverflowBody2: false,
      lineHeight: 0,
      lineHeightBody2: 0,
      showFullTextBody1: false,
      showFullTextBody2: false,
      your_reaction: this.post.your_reaction,
      user: usePageDeatails.auth.user,
      likes_count: this.post.likes_count,
      profileId: usePageDeatails.profile.id,
      dislikes_count: this.post.dislikes_count,
      repost_count: this.post.repost,
      loadingLiked: false,
      loadingUnliked: false,
      loadingRepost: false,
      likedUsers: [],
      unLikedUsers: [],
      allComments: [],
      loadingComments: false,
      pagination: {},
      addedNumber: 0,
      total_number_of_comments_with_replies: 0,
    };
  },
  emits: ["onRepost", "enlarge-post", "repostEdited"],
  computed: {
    ...mapGetters(["screenWidth"]),
    ...mapGetters("profile", [
      "commentId",
      "postComment",
      "replyId",
      "reply",
      "postReply",
      "pusherComment",
      "pusherCommentToDelete",
      "pusherCommentPosted",
    ]),
    ...mapGetters("ratings", ["comment"]),
    ...mapGetters(["translations", "userVersion"]),
    firstTwoComments() {
      return this.allComments.slice(0, 2);
    },
    toggleClass() {
      return `cursor-pointer ${
        this.customBgColor.startsWith("#") ? "text-sky-400" : "text-sky-700"
      }`;
    },
    toggleClassBody2() {
      return `cursor-pointer text-sky-700 "
      }`;
    },
    textStyle() {
      if (this.showFullTextBody1) {
        return {
          maxHeight: "none",
          overflow: "hidden",
          lineHeight:
            +this.post.font_size > 3 && this.post.font_size < 10
              ? "1.7rem"
              : this.post.font_size >= 10
              ? "2rem"
              : "inherit",
          display: "inline",
          fontSize: `${16 + +this.post.font_size}px`,

          color: this.text_color,
        };
      } else {
        return {
          maxHeight: this.lineHeight * 4 + "px",
          fontSize: `${16 + +this.post.font_size}px`,
          overflow: "hidden",
          lineHeight:
            +this.post.font_size > 3 && +this.post.font_size < 10
              ? "1.7rem"
              : +this.post.font_size >= 10
              ? "2rem"
              : "inherit",
          display: "block",

          color: this.text_color,
        };
      }
    },
    textStyleBody2() {
      if (this.showFullTextBody2) {
        return {
          maxHeight: "none",
          overflow: "hidden",
          display: "inline",
        };
      } else {
        return {
          maxHeight: this.lineHeightBody2 * 4 + "px",

          overflow: "hidden",
          display: "block",
        };
      }
    },
    titleTextStyle() {
      return {
        color: this.title_text_color,
      };
    },
    numberOfImages: {
      // Gets the number of images in post.image string
      // passed as prop to PostImageDisplay.vue
      get: function () {
        if (this.post && this.post.image && this.post.image.length > 0) {
          return this.post.image.split("|").length;
        } else {
          return 0;
        }
      },
    },
    body1Class: function () {
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

      return className + " " + className2;
    },
    titleClass: function () {
      let className, className2;

      if (this.post.title_text_alignment) {
        this.title_text_alignment =
          this.post.title_text_alignment === "left"
            ? " text-left"
            : this.post.title_text_alignment === "center"
            ? " text-center"
            : " text-right";
      }
      if (this.post.title_text_color_id) {
        this.textColors.forEach((color) => {
          if (color.id === this.post.title_text_color_id) {
            this.title_text_color = color.color;
          }
        });
      }
      if (this.post.title_background_color_id) {
        this.backgroundColors.forEach((color) => {
          if (color.id === this.post.title_background_color_id) {
            this.titleCustomBgColor = color.color;
          }
        });
      }

      return className + " " + className2;
    },

    displayedBody1() {
      let content = this.post.body1;
      if (content) {
        content = content.replace(/\/n/g, "<br>"); // Replace /n with <br>
      }
      return this.processUrls(content);
    },

    displayedBody2() {
      let content = this.post.body2;
      if (content) {
        content = content.replace(/\/n/g, "<br>"); // Replace /n with <br>
      }

      return this.processUrls(content);
    },

    processedBody1() {
      return this.processUrls(this.post.body1);
    },

    processedBody2() {
      return this.processUrls(this.post.body2);
    },
    // Places the post.image string into an array to be
    // passed as prop to PostImageDisplay.vue
    imageArray: {
      get: function () {
        if (this.post && this.post.image && this.post.image.length > 0) {
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
    // post: {
    //   handler: "checkContentHeight",
    //   deep: true,
    // },
    commentText(newVal) {
      if (newVal) {
        this.commentTextError = "";
      }
    },
    post: {
      handler(newVal, oldVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          this.repost_count = this.post.repost;
          this.likes_count = this.post.likes_count;
          this.dislikes_count = this.post.dislikes_count;
          this.your_reaction = this.post.your_reaction;
        }
      },
      deep: true,
    },
    showFullTextBody1: "checkContentHeight",
    showFullTextBody2: "checkContentHeightBody2",
    //adding comment on enlarged
    addedCommentInEnlarge(newVal) {
      if (newVal && Object.keys(newVal).length > 0) {
        if (this.post.id === newVal.post_id) {
          this.allComments.unshift(newVal);
          this.total_number_of_comments_with_replies =
            this.total_number_of_comments_with_replies + 1;
        }
      }
    },
    pusherCommentPosted: {
      handler(newVal, oldVal) {
        if (
          newVal &&
          newVal.id &&
          newVal != oldVal &&
          this.post.id === newVal.post_id
        ) {
          const commentIndex = this.allComments.findIndex(
            (comment) => comment.id === newVal.id
          );
          if (commentIndex === -1) {
            this.allComments.unshift(newVal);
            this.total_number_of_comments_with_replies =
              this.total_number_of_comments_with_replies + 1;
          }
        }
      },
      deep: true,
    },
    // comment delte
    commentId(newVal) {
      if (newVal) {
        const index = this.allComments.findIndex(
          (comment) => comment.id === newVal
        );
        if (index !== -1) {
          this.allComments.splice(index, 1);
          this.total_number_of_comments_with_replies =
            this.total_number_of_comments_with_replies - 1;
          // this.fetchAllComments();
        }
      }
    },
    pusherCommentToDelete: {
      handler(newVal, oldVal) {
        if (
          newVal &&
          newVal.id &&
          newVal != oldVal &&
          this.post.id === newVal.post_id
        ) {
          const comment_id = newVal.parent_id ? newVal.parent_id : newVal.id;
          const index = this.allComments.findIndex(
            (comment) => comment.id === comment_id
          );
          if (comment_id === newVal.id) {
            // for comment deletion
            if (index !== -1) {
              this.allComments.splice(index, 1);
              this.total_number_of_comments_with_replies =
                this.total_number_of_comments_with_replies - 1;
            }
          } else {
            // for reply deletion
            const replyIndex = this.allComments[index].replies.findIndex(
              (comment) => comment.id === newVal.id
            );
            this.allComments[index].replies.splice(replyIndex, 1);
          }
        }
      },
      deep: true,
    },

    replyId(newVal) {
      if (newVal) {
        for (let i = 0; i < this.allComments.length; i++) {
          const comment = this.allComments[i];
          if (comment.replies) {
            const replyIndex = comment.replies.findIndex(
              (reply) => reply.id === newVal
            );
            if (replyIndex !== -1) {
              comment.replies.splice(replyIndex, 1);
              break;
            }
          }
        }
      }
    },
    reply(newVal, oldVal) {
      if (newVal && newVal.reply) {
        const commentIndex = this.allComments.findIndex((comment) => {
          return comment.id === newVal.commentId;
        });
        if (commentIndex !== -1) {
          if (!this.allComments[commentIndex].replies) {
            // If 'replies' doesn't exist, initialize it as an empty array
            this.allComments[commentIndex].replies = [];
          }

          const length = this.allComments[commentIndex].replies.length;
          if (
            length > 0 &&
            this.allComments[commentIndex].replies[length - 1].id !==
              newVal.reply.id
          ) {
            // Now that 'replies' is guaranteed to be an array, push the new reply
            this.allComments[commentIndex].replies.push(newVal.reply);
          } else if (length === 0) {
            this.allComments[commentIndex].replies.push(newVal.reply);
          }
        }
      }
    },
    postComment: {
      handler(newVal, oldVal) {
        if (newVal && newVal.id && newVal != oldVal) {
          const commentIndex = this.allComments.findIndex(
            (comment) => comment.id === newVal.id
          );

          if (commentIndex !== -1) {
            // Update the existing comment with the new data
            this.allComments[commentIndex] = newVal;
          }
        }
      },
      deep: true,
    },
    pusherComment: {
      handler(newVal, oldVal) {
        if (
          newVal &&
          newVal.id &&
          newVal != oldVal &&
          this.post.id === newVal.post_id
        ) {
          const commentIndex = this.allComments.findIndex(
            (comment) => comment.id === newVal.id
          );

          if (commentIndex !== -1) {
            // Update the existing comment with the new data
            this.allComments[commentIndex] = newVal;
          }
        }
      },
      deep: true,
    },
    postReply: {
      handler(newVal, oldVal) {
        if (newVal && newVal.id) {
          this.allComments.forEach((comment, index) => {
            // Check if any reply ID matches
            if (comment.replies) {
              const replyIndex = comment.replies.findIndex(
                (reply) => reply.id === newVal.id
              );
              if (replyIndex !== -1) {
                this.allComments[index].replies[replyIndex] = newVal;
              }
            }
          });
        }
      },
      deep: true,
    },
    comment: {
      handler(newVal, oldVal) {
        if (newVal && newVal.commentId) {
          if (newVal.isReply) {
            const commentIndex = this.allComments.findIndex((comment) => {
              // Check if any reply ID matches
              if (comment.replies) {
                return comment.replies.some(
                  (reply) => reply.id === newVal.commentId
                );
              }
              return false;
            });

            if (commentIndex !== -1) {
              // Check if the match was in the replies
              if (this.allComments[commentIndex].replies) {
                const replyIndex = this.allComments[
                  commentIndex
                ].replies.findIndex((reply) => reply.id === newVal.commentId);
                if (replyIndex !== -1) {
                  // Update the matching reply
                  this.allComments[commentIndex].replies[replyIndex].body =
                    newVal.body;
                }
              }
            }
          } else {
            const commentIndex = this.allComments.findIndex(
              (comment) => comment.id === newVal.commentId
            );

            if (commentIndex !== -1) {
              this.allComments[commentIndex].body = newVal.body;
            }
          }

          setTimeout(() => {
            this.$store.commit("ratings/setLoadingComment", false);
          }, 300);
        }
      },
      deep: true,
    },
  },
  methods: {
    validate() {
      let isValid = true;
      // Reset the error messages before validating
      this.commentTextError = "";
      // Validate rating_text
      if (!this.commentText || this.commentText.trim() === "") {
        this.commentTextError =
          this.translations && this.translations.repost_should_not_be_empty;
        isValid = false;
      }

      return isValid;
    },
    insertTab(event) {
      if (event.key === "Tab") {
        event.preventDefault();
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;

        // Set the value to: text before caret + four spaces + text after caret
        this.commentText =
          this.commentText.substring(0, start) +
          "      " + // using four spaces for a tab
          this.commentText.substring(end);

        // Vue.nextTick to handle DOM updates after Vue's reactivity system updates
        this.$nextTick(() => {
          event.target.selectionStart = event.target.selectionEnd = start + 6;
        });
      }
    },
    adjustHeight(event) {
      // Vue.nextTick to ensure the DOM is updated before we adjust the height
      this.$nextTick(() => {
        const target = event.target;
        target.style.height = "auto"; // Reset height first to get the correct scrollHeight
        target.style.height = `${target.scrollHeight}px`;
      });
    },
    onClickOutside() {
      this.showingPostingActionMenu = false;
    },
    include() {
      return [document.querySelector(".included")];
    },
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

      this.isContentOverflow =
        textElement.offsetHeight || textElement.scrollHeight > maxHeight;
    },
    checkContentHeightBody2() {
      const textElementBody2 = this.$refs.textElementBody2;
      if (!textElementBody2) {
        return;
      }

      this.lineHeightBody2 = parseInt(
        window.getComputedStyle(textElementBody2).lineHeight
      );
      const maxHeight = this.lineHeightBody2 * 4;
      this.isContentOverflowBody2 =
        textElementBody2.offsetHeight ||
        textElementBody2.scrollHeight > maxHeight;
    },

    HidePostingActionMenu(showingPostingActionMenu) {
      this.showingPostingActionMenu = false;
    },
    openDialog() {
      this.$refs.contractorRatingDialogRef.openDialog();
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
    async onLike() {
      if (!this.your_reaction || this.your_reaction === "dislike") {
        this.likes_count = this.likes_count + 1;
        // if(!this.your_reaction){
        // }
        if (this.your_reaction === "dislike") {
          this.dislikes_count = this.dislikes_count - 1;
        }
        this.your_reaction = "like";

        try {
          const response = await axios.post(
            `/api/posts/${this.post.id}/like`,
            {},
            getAxiosConfig()
          );
          if (response.data) {
          }
        } catch (err) {
          somethingWentWrong();
        }
      } else {
        if (this.your_reaction === "like") {
          this.likes_count = this.likes_count - 1;

          this.your_reaction = null;

          try {
            const response = await axios.delete(
              `/api/posts/${this.post.id}/like`,
              getAxiosConfig()
            );
            if (response.data) {
            }
          } catch (err) {
            somethingWentWrong();
          }
        }
      }
    },
    async onDislike() {
      if (!this.your_reaction || this.your_reaction === "like") {
        this.dislikes_count = this.dislikes_count + 1;
        // if(!this.your_reaction){
        // }
        if (this.your_reaction === "like") {
          this.likes_count = this.likes_count - 1;
        }
        this.your_reaction = "dislike";

        try {
          const response = await axios.post(
            `/api/posts/${this.post.id}/dislike`,
            {},
            getAxiosConfig()
          );
          if (response.data) {
          }
        } catch (err) {
          somethingWentWrong();
        }
      } else {
        if (this.your_reaction === "dislike") {
          this.dislikes_count = this.dislikes_count - 1;

          this.your_reaction = null;

          try {
            const response = await axios.delete(
              `/api/posts/${this.post.id}/dislike`,
              getAxiosConfig()
            );
            if (response.data) {
            }
          } catch (err) {
            somethingWentWrong();
          }
        }
      }
    },
    onOpenListofLikedUsersModel() {
      this.$refs.likeDialogRef.openDialog();
    },
    async onLikeModalOpen() {
      this.loadingLiked = true;
      try {
        const response = await axios.get(
          `/api/posts/${this.post.id}/likes`,
          getAxiosConfig()
        );
        if (response.data) {
          this.likedUsers = response.data;
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        this.loadingLiked = false;
      }
    },
    onOpenListofDislikedUsersModel() {
      this.$refs.dislikeDialogRef.openDialog();
    },
    async onDislikeModalOpen() {
      this.loadingUnliked = true;
      try {
        const response = await axios.get(
          `/api/posts/${this.post.id}/dislikes`,
          getAxiosConfig()
        );
        if (response.data) {
          this.unLikedUsers = response.data;
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        this.loadingUnliked = false;
      }
    },
    onOpenRepostAssuranceModel() {
      if (this.userVersion !== 1) {
        this.$refs.repostDialogRef.openDialog();
      } else {
        this.$store.commit("setIsUpgradeToGoldPlatinumDialogOpen", true);
      }
    },
    async onRepost() {
      if (this.validate()) {
        this.loadingRepost = true;
        const reposterComment = {
          repost_comment: filterBadWordsWithoutValue(this.commentText),
        };
        try {
          const response = await axios.post(
            `/api/posts/${this.post.id}/repost`,
            reposterComment,
            getAxiosConfig()
          );
          if (response.data) {
            this.repost_count = this.repost_count + 1;
            console.log(this.repost_count, "repost count");
            this.$emit("onRepost");
            changesSaved(
              this.translations && this.translations.repost_successfully
            );
          }
        } catch (err) {
          somethingWentWrong(err.response.data.message, "inherit");
        } finally {
          this.loadingRepost = false;
          this.$refs.repostDialogRef.closeDialog();
        }
      }
    },
    async fetchAllComments() {
      this.loadingComments = true;
      try {
        const response = await axios.get(
          `/api/posts/${this.post.id}/comments?per_page=10`,
          getAxiosConfig()
        );
        if (response.data) {
          this.allComments = response.data?.comments;
          this.pagination = response.data?.pagination;
          this.total_number_of_comments_with_replies =
            response.data?.total_number_of_comments_with_replies;
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        this.loadingComments = false;
      }
    },
    onOpenCommentsModal() {
      this.$emit("enlarge-post", this.post);
    },
    onAddingComment(comment) {
      this.allComments.unshift(comment);
      this.total_number_of_comments_with_replies =
        this.total_number_of_comments_with_replies + 1;
      this.addedNumber = this.addedNumber + 1;
    },
    onRepostEdit(repostedComment, postId) {
      this.$emit("repostEdited", repostedComment, postId);
    },
  },
};
</script>

<template>
  <DialogContractorRating
    ref="contractorRatingDialogRef"
    :loggedInUserId="profileId"
    :userId="post.user_id"
  />

  <!-- commentModal -->
  <!-- <DialogAllComments
    ref="commentDialogRef"
    @unshiftIntoComments="onAddingComment"
    v-model:modelValue="allComments"
    v-model:addedNumber="addedNumber"
    :postId="post.id"
    :pagination="pagination"
  /> -->
  <!-- likes modal -->
  <CustomDialog
    ref="likeDialogRef"
    dialogWidth="w-full h-full sm:h-5/6"
    @opened="onLikeModalOpen"
    :showFooter="false"
    :title="translations && translations.people_who_liked_the_post"
  >
    <div v-if="loadingLiked">
      <v-skeleton-loader
        v-for="n in 5"
        :key="n"
        type="list-item-avatar"
      ></v-skeleton-loader>
    </div>
    <div
      class="flex flex-col gap-2"
      v-else-if="!loadingLiked && likedUsers && likedUsers.length > 0"
    >
      <LikedUser
        liked
        v-for="(user, index) in likedUsers"
        :key="index"
        :user="user"
      />
    </div>

    <div v-else class="h-full">
      <div
        class="p-2 text-xl text-grey-600 font-bold h-full flex items-center justify-center"
      >
        {{ translations && translations.no_contractor_found }}
      </div>
    </div>
  </CustomDialog>

  <!-- dislike modal -->
  <CustomDialog
    ref="dislikeDialogRef"
    dialogWidth="w-full h-full sm:h-5/6"
    @opened="onDislikeModalOpen"
    :showFooter="false"
    :title="translations && translations.people_who_disliked_the_post"
  >
    <div v-if="loadingUnliked">
      <v-skeleton-loader
        v-for="n in 3"
        :key="n"
        type="list-item-avatar"
      ></v-skeleton-loader>
    </div>
    <div
      class="flex flex-col gap-2"
      v-else-if="!loadingUnliked && unLikedUsers && unLikedUsers.length > 0"
    >
      <LikedUser
        v-for="(user, index) in unLikedUsers"
        :key="index"
        :user="user"
      />
    </div>
    <div v-else class="h-full">
      <div
        class="p-2 text-xl text-grey-600 font-bold h-full flex items-center justify-center"
      >
        {{ translations && translations.no_contractor_found }}
      </div>
    </div>
  </CustomDialog>
  <!--  repost confirmation modal-->
  <CustomDialog
    ref="repostDialogRef"
    @submit="onRepost"
    :loading="loadingRepost"
    :disabled="loadingRepost"
    :shouldFetchPost="false"
    :submitText="translations && translations.repost_now"
    :title="translations && translations.do_you_wish_to_share_this_post"
  >
    <!-- :showHeader="false" -->
    <div class="mb-4">
      <div class="section_text-lg font-bold section_text-gray-800 mt-3 mb-2">
        {{ translations && translations.reposting_allows_you_to_share }}
      </div>
      <div class="text-md font-bold text-gray-600 mt-3 mb-2">
        {{ translations && translations.repost_text }}
      </div>
      <textarea
        id="responseText"
        type="text"
        :rows="5"
        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden"
        required
        v-model="commentText"
        ref="textRef"
        @keydown="insertTab"
        @input="adjustHeight"
        @paste="adjustHeight"
        :placeholder="translations && translations.say_something_about_the_post"
      />
      <InputError
        v-if="commentTextError"
        class="mt-2"
        :message="commentTextError"
      />
    </div>
  </CustomDialog>
  <!-- {{ profile }} -->

  <div
    v-if="post && Object.keys(post).length > 0"
    class="z-48 flex flex-col items-center justify-start my-2 py-1 lg:py-1 px-2 bg-gray-200 border-2 border-gray-300 rounded-lg drop-shadow-lg transition-all duration-1000 transitioning reveal"
  >
    <!-- INDIVIDUAL POST:


        TOP ROW MENUS
        POST ACTIONS MENU -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div class="flex flex-row justify-between items-center w-full mt-2">
      <!-- User Avatar & User /// INDIVIDUAL POST: TOP POSTING ROW -->
      <Link
        :href="`/contractor/${post.user_id}`"
        class="flex flex-row gap-2 justify-start items-start"
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
          <h2 class="font-bold text-lg sm:text-xl" style="line-height: 1.5rem">
            <!-- {{  post }} -->
            {{ post.id }}: {{ post.first_name + " " + post.last_name }}
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
          <div
            class="-mr-2 flex items-center"
            v-click-outside="{
              handler: onClickOutside,
              include,
            }"
          >
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
    <div
      class="flex gap-2 self-start sm:mt-[-4px] md:mt-[-6px] ml-[3px]"
      v-if="post.original_user_first_name && post.original_user_last_name"
    >
      <div
        :style="{
          width: screenWidth >= 640 ? '4.5rem' : '3.7rem',
        }"
      ></div>
      <Link class="self-start" :href="`/contractor/${post.original_user_id}`">
        <div
          v-if="post.original_user_first_name && post.original_user_last_name"
          class="text-sm flex gap-1 items-center"
        >
          <img src="/images/icons/share_icon.png" width="15" height="15" />
          <div class="">{{ translations && translations.reposted_from }}</div>
          <Icon
            class="translate-y-[-1px]"
            icon="ion:caret-forward"
            width="15"
          />
          <div class="font-bold cursor-pointer">
            {{
              post.original_user_first_name + " " + post.original_user_last_name
            }}
          </div>
        </div>
      </Link>
    </div>
    <!-- End TOP POSTING ROW -->

    <!-- Text Body1 UPPER -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

    <!-- Reposted Comment -->

    <div
      class="self-start"
      style="white-space: pre-wrap"
      v-if="post.repost_comment"
    >
      {{ post.repost_comment }}
    </div>

    <div
      :class="`${title_text_alignment} ${
        titleCustomBgColor.startsWith('#')
          ? ' flex-col w-full items-center  px-2 py-2 rounded-md shadow-lg border-2'
          : 'w-full'
      } `"
      @click="$emit('enlarge-post', post)"
      class="font-bold text-xl sm:text-2xl md:tex-3xl mb-1 mt-1"
      :style="{ backgroundColor: titleCustomBgColor }"
    >
      <span
        v-show="post.title"
        v-html="post.title"
        style="white-space: pre-wrap"
        :style="titleTextStyle"
        :class="`${titleClass} w-full processed-body inline`"
        ref="titleElement"
      ></span>
    </div>
    <div
      :class="`${text_alignment} ${
        customBgColor.startsWith('#')
          ? ' flex-col w-full items-center  px-2 py-[87px] rounded-md shadow-lg border-2'
          : 'w-full'
      } `"
      @click="$emit('enlarge-post', post)"
      class=""
      :style="{ backgroundColor: customBgColor }"
    >
      <span
        v-show="post.body1"
        v-html="displayedBody1"
        style="white-space: pre-wrap"
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
    </div>

    <!-- INDIVIDUAL POST: MAIN IMAGES  -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div class="flex flex-row justify-center w-full mb-1 mt-1">
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

    <div :class="`'w-full'`" @click="$emit('enlarge-post', post)" class="">
      <span
        v-show="post.body2"
        v-html="displayedBody2"
        style="white-space: pre-wrap"
        :style="textStyleBody2"
        :class="`w-full processed-body inline`"
        ref="textElementBody2"
      ></span>

      <span
        v-if="isContentOverflowBody2"
        @click.self.stop="toggleTextBody2"
        :class="`${toggleClassBody2} ${
          showFullTextBody2 ? 'inline' : 'inline'
        } `"
      >
        {{ showFullTextBody2 ? "...less" : "...more" }}
      </span>
    </div>

    <!-- footer icons counts -->
    <!-- INDIVIDUAL POST: BOTTOM ROW MENU -->
    <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div
      :class="`mb-2 ${
        post.body2 ? 'mt-3' : ''
      } border-[1px] w-1/3 border-gray-800 rounded`"
    ></div>

    <div class="pb-2 flex justify-between items-center w-full">
      <div class="flex items-center gap-2">
        <!-- Like -->
        <div
          class="flex gap-1 justify-center items-center cursor-pointer"
          @click="onOpenListofLikedUsersModel"
        >
          <!-- <div v-if="post.likes_count" class=""> -->
          <div class="font-medium text-blue-800 cursor-pointer">
            <Icon
              icon="emojione-monotone:up-arrow"
              :class="`text-[17px] xs:text-[25px]  text-[#16a34a]`"
            />
          </div>
          <div
            class="text-[13px] sx:text-[15px] sm:text-[17px] flex items-center justify-center leading-3 self-center"
          >
            {{ likes_count }}
          </div>
        </div>
        <!-- dislikes -->
        <div
          class="flex gap-1 justify-center items-center cursor-pointer"
          @click="onOpenListofDislikedUsersModel"
        >
          <!-- <div v-if="post.likes_count" class=""> -->
          <div class="font-medium text-blue-800 cursor-pointer">
            <Icon
              icon="emojione-monotone:up-arrow"
              :class="`text-[17px] xs:text-[25px] text-[#c40516]`"
              :rotate="2"
            />
          </div>
          <div
            class="text-[13px] sx:text-[15px] sm:text-[17px] flex items-center justify-center leading-3"
          >
            {{ dislikes_count }}
          </div>
        </div>
      </div>
      <div
        class="text-gray-900 text-[13px] sx:text-[15px] sm:text-[17px] flex items-center self-center gap-[2px]"
      >
        <span
          class="cursor-pointer hover:underline leading-3"
          @click="$emit('enlarge-post', post)"
        >
          {{ total_number_of_comments_with_replies }}
          {{ translations && translations.comments }}
        </span>

        <Icon icon="octicon:dot-fill-16" width="11" />
        <span
          class="text-[13px] sx:text-[15px] flex items-center justify-center sm:text-[17px] leading-3"
        >
          {{ repost_count }} {{ translations && translations.reposts }}
        </span>
      </div>
    </div>

    <div :class="`mb-2 border-[1px] w-full border-gray-300 rounded`"></div>
    <div
      class="flex flex-row max-sm:gap-2 justify-between items-center w-full mb-2"
    >
      <!-- Likes -->
      <div class="hovered" @click="onLike">
        <div
          class="font-medium text-xs sm:text-sm text-blue-800 cursor-pointer"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="hovered">
              <Icon
                icon="emojione-monotone:up-arrow"
                class="text-[20px] sm:text-[25px] icon-like text-transparent stroke-[2px] stroke-green-600"
                :class="`${your_reaction === 'like' ? 'liked' : ''}`"
              />
            </div>
            <div class="pl-1 icon-text text-[#16a34a]">
              {{ translations && translations.like }}
            </div>
          </div>
        </div>
      </div>
      <!-- Dislike -->
      <div class="hovered" @click="onDislike">
        <a class="font-medium text-xs sm:text-sm text-blue-800 cursor-pointer">
          <div class="flex flex-row justify-between items-center">
            <div class="">
              <!-- <img src="/images/icons/like_green.png" width="25" height="25" /> -->
              <!-- <Icon icon="emojione-monotone:up-arrow" :rotate="2" color="#c40516" width="25" /> -->
              <Icon
                icon="emojione-monotone:up-arrow"
                :rotate="2"
                :class="`${your_reaction === 'dislike' ? 'disliked' : ''}`"
                class="text-[20px] sm:text-[25px] icon-dislike text-transparent stroke-[2px] stroke-[#c40516]"
              />
            </div>
            <div class="pl-1 icon-text text-[#c40516]">
              {{ translations && translations.dislike }}
            </div>
          </div>
        </a>
      </div>

      <!-- Comments -->
      <div class="hovered cursor-pointer" @click="$emit('enlarge-post', post)">
        <div class="font-medium text-xs sm:text-sm text-blue-800">
          <div class="flex flex-row justify-between items-center">
            <div class="">
              <img
                src="/images/icons/comment_icon.png"
                class="w-[20px] sm:w-[25px] h-[20px] sm:h-[25px]"
              />
            </div>
            <div class="pl-1 icon-text">
              {{ translations && translations.comment }}
            </div>
          </div>
        </div>
      </div>

      <!-- Re-Posted -->
      <div class="hovered cursor-pointer" @click="onOpenRepostAssuranceModel">
        <div class="font-medium text-xs sm:text-sm text-blue-800">
          <div class="flex flex-row justify-between items-center">
            <div class="">
              <img
                src="/images/icons/share_icon.png"
                class="w-[20px] sm:w-[25px] h-[20px] sm:h-[25px]"
              />
            </div>
            <div class="pl-1 icon-text">
              {{ translations && translations.repost }}
            </div>
          </div>
        </div>
      </div>

      <!-- Shares -->
      <!-- <div class="">
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
      </div> -->
    </div>

    <div :class="`mb-2 border-[1px] w-full border-gray-300 rounded`"></div>
    <div class="flex flex-col gap-1 sm:gap-2 w-full">
      <TwoVisibleComments
        :loadingComments="loadingComments"
        @openAllComments="onOpenCommentsModal"
        @unshiftIntoComments="onAddingComment"
        :comments="firstTwoComments"
        :length="allComments.length"
        :postId="post.id"
      />
    </div>

    <PostingActionMenu
      :showingPostingActionMenu="showingPostingActionMenu"
      :postID="post.id"
      :post="post"
      :postUserId="post.user_id"
      :imageArray="imageArray"
      :currentUserId="profile.user_id"
      @NavPostingActionMenu="NavPostingActionMenu"
      @repostEdited="onRepostEdit"
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

.hovered:hover .icon-text {
  text-decoration: underline;
}

.hovered:hover .icon-like {
  stroke-width: 0px;
  color: #16a34a;
}

.liked {
  stroke-width: 0px;
  color: #16a34a;
}

.hovered:hover .icon-dislike {
  stroke-width: 0px;
  color: #c40516;
}

.disliked {
  stroke-width: 0px;
  color: #c40516;
}
.transitioning {
  transition: all 1.5s;
}
@keyframes revealAnimation {
  from {
    max-height: 0;
  }
  to {
    max-height: 10000px;
  }
}

.reveal {
  animation: revealAnimation 1.5s forwards;
}

.dialog-modal .v-overlay__scrim {
  background: transparent !important;
}
</style>
