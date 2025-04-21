<script>
import PostShowTheImage from "@/Components/tCon/tConSub/PostShowTheImage.vue";

import cConnectWord from "@/Components/tCon/cConnectWord.vue";
import StarRounded from "@/Components/Ratings/StarRounded.vue";
import DialogContractorRating from "@/Components/Ratings/Contractor/DialogContractorRating.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { Icon } from "@iconify/vue";
import { mapGetters } from "vuex";
import LikedUser from "@/Components/PostFooter/LikedUser.vue";
import AllComments from "@/Components/PostFooter/AllComments.vue";
import WriteCommentFooter from "@/Components/PostFooter/WriteCommentFooter.vue";

import { usePage } from "@inertiajs/inertia-vue3";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { somethingWentWrong, changesSaved } from "@/helpers/utilities";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { filterBadWordsWithoutValue } from "@/helpers/utilities";
import InputError from "@/Components/InputError.vue";

export default {
  components: {
    PostShowTheImage,

    cConnectWord,
    StarRounded,
    WriteCommentFooter,
    AllComments,
    InputError,
    LikedUser,
    CustomDialog,
    DialogContractorRating,
    Avatar,
    Icon,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
    postEnlarged: {
      type: Object,
      required: true,
    },
    body1Colors: {
      type: Array,
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
  },
  data() {
    let usePageDeatails = usePage().props.value;

    return {
      commentTextError: "",
      commentText: "",
      repostDialogRef: null,
      customBgColor: "",
      isPostEnlarged: false,
      postToEnlarge: this.postEnlarged,
      added: false,
      text_alignment: "left",
      text_color: "",
      lineHeight: 0,
      lineHeightBody2: 0,

      title_text_alignment: "",
      titleCustomBgColor: "left",
      title_text_color: "",
      your_reaction: this.postEnlarged.your_reaction,
      user: usePageDeatails.auth.user,
      likes_count: this.postEnlarged.likes_count,
      profileId: usePageDeatails.profile.id,
      dislikes_count: this.postEnlarged.dislikes_count,
      repost_count: this.postEnlarged.repost,
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
  mounted() {
    if (this.goToComments) {
      setTimeout(() => {
        this.$refs.allCommentsRef.$el.scrollIntoView({
          behavior: "instant",
          block: "end",
          inline: "end",
        });
        this.$store.commit("setGoToComments", false);
      }, 0);
    }
    this.fetchAllComments();
  },
  computed: {
    ...mapGetters(["screenWidth", "goToComments"]),
    ...mapGetters("profile", [
      "commentId",
      "postComment",
      "replyId",
      "reply",
      "postReply",
      "pusherComment",
      "pusherCommentToDelete",
      "pusherCommentPosted",
      "isCommentAddedEnlarged",
    ]),
    ...mapGetters(["translations", "userVersion"]),
    ...mapGetters("ratings", ["comment"]),
    // imageArray() {
    //   return this.postToEnlarge.image.split("|");
    // },
    imageArray: {
      get: function () {
        if (
          this.postToEnlarge &&
          this.postToEnlarge.image &&
          this.postToEnlarge.image.length > 0
        ) {
          // split string into an array
          let videoArray = [];

          let newImageArray = this.postToEnlarge.image.split("|");
          return newImageArray;
        } else {
          return [];
        }
      },
    },
    userVersionMemberText() {
      if (this.postEnlarged.version === 1) {
        return this.translations && this.translations.free_member;
      } else if (this.postEnlarged.version === 2) {
        return this.translations && this.translations.gold_member;
      } else if (this.postEnlarged.version === 3) {
        return this.translations && this.translations.platinum_member;
      }
    },
    textStyle() {
      return {
        fontSize: `${16 + +this.postToEnlarge.font_size}px`,
        lineHeight:
          +this.postToEnlarge.font_size > 3 &&
          +this.postToEnlarge.font_size < 10
            ? "1.7rem"
            : +this.postToEnlarge.font_size >= 10
            ? "2rem"
            : "inherit",
        display: "block",

        color: this.text_color,
      };
    },
    textStyleBody2() {
      return {
        overflow: "hidden",
        display: "block",
      };
    },
    titleTextStyle() {
      return {
        color: this.title_text_color,
      };
    },
    titleClass: function () {
      let className, className2;

      if (this.postToEnlarge.title_text_alignment) {
        this.title_text_alignment =
          this.postToEnlarge.title_text_alignment === "left"
            ? " text-left"
            : this.postToEnlarge.title_text_alignment === "center"
            ? " text-center"
            : " text-right";
      }
      if (this.postToEnlarge.title_text_color_id) {
        this.textColors?.forEach((color) => {
          if (color.id === this.postToEnlarge.title_text_color_id) {
            this.title_text_color = color.color;
          }
        });
      }
      if (this.postToEnlarge.title_background_color_id) {
        this.backgroundColors.forEach((color) => {
          if (color.id === this.postToEnlarge.title_background_color_id) {
            this.titleCustomBgColor = color.color;
          }
        });
      }

      return className + " " + className2;
    },

    body1Class: function () {
      let className, className2;
      if (this.postToEnlarge.is_body_bold) {
        className = "font-bold";
      }
      if (this.postToEnlarge.text_alignment) {
        this.text_alignment =
          this.postToEnlarge.text_alignment === "left"
            ? " text-left"
            : this.postToEnlarge.text_alignment === "center"
            ? " text-center"
            : " text-right";
      }
      if (this.postToEnlarge.post_text_color_id) {
        this.textColors?.forEach((color) => {
          if (color.id === this.postToEnlarge.post_text_color_id) {
            this.text_color = color.color;
          }
        });
      }
      if (this.postToEnlarge.post_background_color_id) {
        this.backgroundColors.forEach((color) => {
          if (color.id === this.postToEnlarge.post_background_color_id) {
            this.customBgColor = color.color;
          }
        });
      }
      return className + " " + className2;
    },

    displayedBody1() {
      let content = this.postToEnlarge.body1;
      if (content) {
        content = content.replace(/\/n/g, "<br>"); // Replace /n with <br>
      }

      return this.processUrls(content);
    },

    displayedBody2() {
      let content = this.postToEnlarge.body2;
      if (content) {
        content = content.replace(/\/n/g, "<br>"); // Replace /n with <br>
      }

      return this.processUrls(content);
    },
  },
  emits: ["close-enlarged", "onAddingEnlargeComment"],
  watch: {
    isCommentAddedEnlarged(newVal) {
      console.log("comment added");
      if (newVal) {
        this.total_number_of_comments_with_replies =
          this.total_number_of_comments_with_replies + 1;
        this.$store.commit("profile/setIsCommentAddedEnlarged", false);
      }
    },
    commentText(newVal) {
      if (newVal) {
        this.commentTextError = "";
      }
    },
    postEnlarged: {
      handler(newVal, oldVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          this.repost_count = this.postEnlarged.repost;
          this.likes_count = this.postEnlarged.likes_count;
          this.dislikes_count = this.postEnlarged.dislikes_count;
          // this.your_reaction = this.postEnlarged.your_reaction;
        }
      },
      deep: true,
    },
    pusherCommentPosted: {
      handler(newVal, oldVal) {
        if (
          newVal &&
          newVal.id &&
          newVal != oldVal &&
          this.postToEnlarge.id === newVal.post_id
        ) {
          const commentIndex = this.allComments.findIndex(
            (comment) => comment.id === newVal.id
          );
          if (commentIndex === -1) {
            // check if it is a reply or a comment if comment_id then it is a reply
            const reply_comment_id = newVal.parent_id;
            if (reply_comment_id) {
              this.allComments.forEach((comment) => {
                if (comment.id === reply_comment_id) {
                  if (comment.replies && comment.replies.length > 0) {
                    const replyIndex = comment.replies.findIndex(
                      (reply) => reply.id === newVal.id
                    );
                    if (replyIndex === -1) {
                      comment.replies = [];
                      comment.replies.push(newVal);
                      this.total_number_of_comments_with_replies =
                        this.total_number_of_comments_with_replies + 1;
                    }
                  } else {
                    comment.replies.push(newVal);
                    this.total_number_of_comments_with_replies =
                      this.total_number_of_comments_with_replies + 1;
                  }
                }
              });
            } else {
              this.allComments.push(newVal);
              this.total_number_of_comments_with_replies =
                this.total_number_of_comments_with_replies + 1;
            }
          }
        }
      },
      deep: true,
    },
    commentId(newVal) {
      if (newVal) {
        const index = this.allComments.findIndex(
          (comment) => comment.id === newVal
        );
        if (index !== -1) {
          const repliesLength = this.allComments[index].replies
            ? this.allComments[index].replies.length
            : 0;
          this.allComments.splice(index, 1);

          this.total_number_of_comments_with_replies =
            this.total_number_of_comments_with_replies - (repliesLength + 1);
        }
      }
    },
    pusherCommentToDelete: {
      handler(newVal, oldVal) {
        if (
          newVal &&
          newVal.id &&
          newVal != oldVal &&
          this.postToEnlarge.id === newVal.post_id
        ) {
          const comment_id = newVal.parent_id ? newVal.parent_id : newVal.id;
          const index = this.allComments.findIndex(
            (comment) => comment.id === comment_id
          );
          if (comment_id === newVal.id) {
            // for comment deletion
            if (index !== -1) {
              const repliesLength = this.allComments[index].replies
                ? this.allComments[index].replies.length
                : 0;
              this.allComments.splice(index, 1);

              this.total_number_of_comments_with_replies =
                this.total_number_of_comments_with_replies -
                (repliesLength + 1);
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
            this.allComments[commentIndex].replies[length - 1]?.id !==
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
          this.postEnlarged.id === newVal.post_id
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
    openDialog() {
      this.$refs.repostDialogRef.openDialog();
    },
    processUrls(body) {
      const urlRegex = /(https?:\/\/[^<\s]+|www\.[^<\s]+)/g;
      return body?.replace(urlRegex, function (url) {
        let actualUrl = url.startsWith("http") ? url : "http://" + url;
        return `<a @click.self.stop="()=>{}" href="${actualUrl}" target="_blank">${url}</a>`;
      });
    },
    emit() {
      this.$emit("close-enlarged");
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
            `/api/posts/${this.postToEnlarge.id}/like`,
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
              `/api/posts/${this.postToEnlarge.id}/like`,
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
            `/api/posts/${this.postToEnlarge.id}/dislike`,
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
              `/api/posts/${this.postToEnlarge.id}/dislike`,
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
          `/api/posts/${this.postToEnlarge.id}/likes`,
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
          `/api/posts/${this.postToEnlarge.id}/dislikes`,
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
        this.$store.commit("setGoldOrPlatinum", true);
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
            `/api/posts/${this.postToEnlarge.id}/repost`,
            reposterComment,
            getAxiosConfig()
          );
          if (response.data) {
            this.repost_count = this.repost_count + 1;
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
          `/api/posts/${this.postToEnlarge.id}/comments?per_page=10&sort_by=oldest`,
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
      this.$refs.commentDialogRef.openDialog();
    },
    onAddingComment(comment) {
      this.added = true;
      this.allComments.unshift(comment);
      this.total_number_of_comments_with_replies =
        this.total_number_of_comments_with_replies + 1;
      if (this.pagination.current_page !== this.pagination.last_page) {
        this.addedNumber = this.addedNumber + 1;
      }
      this.$emit("onAddingEnlargeComment", comment);
    },
  },
};
</script>

<template>
  <DialogContractorRating
    ref="repostDialogRef"
    :userId="profile.id"
    :contractorId="postToEnlarge.id"
  />

  <!-- Enlarged Post -->
  <!-- <div class="fixed z-40 inset-0 overflow-y-auto ease-out duration-400">
    <div class="relative flex items-start justify-center m-auto mt-0 mb-0 p-3"> -->
  <!-- <div
        @click.stop="$emit('close-enlarged')"
        class="fixed inset-0 transition-opacity"
      >
        <div class="absolute inset-0 m-0 bg-slate-200 opacity-80"></div>
      </div> -->
  <!-- 
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all w-full mx-0 my-0 md:max-w-4xl"
        role="dialog"
      > -->

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

    <div v-else>
      <div
        class="p-2 text-xl text-grey-600 font-bold h-72 flex items-center justify-center"
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
    <div v-else>
      <div
        class="p-2 text-xl text-grey-600 font-bold h-72 flex items-center justify-center"
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
        {{ translations && translations.comment_text }}
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
  <!-- TOP BACK TO NEWS FEED -->
  <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
  <div
    class="fixed m-0 inset-0 flex items-center justify-center z-20 bg-slate-200 bg-opacity-80"
    :style="{
      '--tw-space-x-reverse': 'inherit',
    }"
    type="button"
    @click="$emit('close-enlarged')"
  >
    <div
      class="bg-white md:max-w-4xl w-full h-full sm:h-[93%] rounded-xl max-sm:rounded-none shadow-xl flex flex-col z-10"
      type="button"
      @click.stop
    >
      <!-- header -->
      <div
        class="flex justify-between rounded-b-none max-md:rounded-none rounded-lg items-center"
      >
        <div class="bg-slate-200 px-2 p-0 border-b-2 border-b-gray-400 w-full">
          <button class="w-full" @click="$emit('close-enlarged')">
            <div
              class="flex flex-row items-center justify-between w-full pt-1 pb-1"
            >
              <div class="flex items-center justify-start gap-2">
                <Icon
                  icon="ph:arrow-fat-left-duotone"
                  color="#232069"
                  height="35"
                />
                <span class="text-lg font-bold">
                  {{ translations && translations.news_feed }}...</span
                >
              </div>
              <!-- LOGO -->
              <div class="text-lg font-bold tracking-wide text-center">
                <cConnectWord />
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Slot Content - Scrollable -->
      <!-- <div
          :class="`flex-1 ${
            overflowAllowed ? 'overflow-y-auto' : ''
          } p-2 sm:p-4 padding-none ${contentClasses}`"
        > -->

      <div
        class="flex-1 flex flex-col overflow-y-auto px-2 sm:px-4 overflow-x-hidden padding-none"
      >
        <!-- TOP ROW MENUS POST ACTIONS MENU -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div
          class="flex flex-row justify-between items-center w-full mb-1 mt-3"
        >
          <!-- User Avatar & User /// INDIVIDUAL POST: TOP POSTING ROW -->
          <div class="flex flex-row gap-2 justify-start items-center">
            <!-- Avatar -->
            <div
              @click="openDialog"
              class="cursor-pointer flex justify-start items-start flex-none w=16"
            >
              <!-- <Link :href="route('postToEnlarge.show')" class="block "> -->
              <div class="block">
                <Avatar
                  :style="{
                    width: screenWidth >= 640 ? '4.5rem' : '3.7rem',
                    height: screenWidth >= 640 ? '4.5rem' : '3.7rem',
                  }"
                  :imageSrc="postToEnlarge.user_avatar"
                />
              </div>
            </div>
            <!-- User Info -->
            <div class="flex flex-col justify-center ml-1">
              <h2
                class="font-bold text-lg sm:text-xl"
                style="line-height: 1.5rem"
              >
                <!-- {{ postToEnlarge.id }}: -->
                {{ postToEnlarge.first_name + " " + postToEnlarge.last_name }}
              </h2>
              <div class="">
                {{ postToEnlarge.company_name }}
              </div>

              <div class="">
                <h2 class="font-light text-sm overflow-hidden">
                  {{ postToEnlarge.city }} {{ postToEnlarge.state }}
                </h2>
              </div>
            </div>
          </div>

          <!-- Ratings / postToEnlarge action menu / posting date -->
          <div
            class="flex flex-row justify-end items-center self-start flex-none w-28"
          >
            <!-- User RATINGS /// INDIVIDUAL POST: TOP POSTING ROW -->
            <div class="flex flex-row flex-none justify-end items-center">
              <!-- Premium Marking -->
              <!-- <div class="">
                  <img
                    src="/images/icons/pre-diamond.png"
                    width="20"
                    height="30"
                  />
                </div> -->

              <div class="flex flex-col justify-center items-center">
                <StarRounded
                  @click="openDialog"
                  :starWidth="15"
                  class="h-4 cursor-pointer"
                  indicatorClasses="text-small h-4"
                  :starHeight="15"
                  :rating="
                    Number(
                      parseFloat(
                        postToEnlarge.average_rating
                          ? postToEnlarge.average_rating
                          : 0.0
                      ).toFixed(1)
                    )
                  "
                  :isIndicatorActive="false"
                />

                <div class="">
                  <h2
                    class="font-light text-xs overflow-hidden tracking-tighter"
                  >
                    {{ postToEnlarge.total_reviews }}
                  </h2>
                </div>
                <div
                  class="sm:mt-[-2px] text-gray-800 text-[11px] xs:text-xs sm:text-sm"
                >
                  {{ userVersionMemberText }}
                </div>
              </div>
            </div>

            <!-- RIGHT SIDE --- POST ACTION MENU
                                    & time since posting -->
          </div>
        </div>
        <!-- END Ratings / postToEnlarge action menu / posting date -->
        <!-- End TOP POSTING ROW -->
        <div
          class="self-start flex gap-2 sm:mt-[-4px] md:mt-[-6px] ml-[3px]"
          v-if="
            postToEnlarge.original_user_first_name &&
            postToEnlarge.original_user_last_name
          "
        >
          <div
            :style="{
              width: screenWidth >= 640 ? '4.5rem' : '3.7rem',
            }"
          ></div>
          <Link
            class="self-start"
            :href="`/contractor/${postToEnlarge.original_user_id}`"
          >
            <div
              v-if="
                postToEnlarge.original_user_first_name &&
                postToEnlarge.original_user_last_name
              "
              class="text-sm flex gap-1 items-center"
            >
              <img src="/images/icons/share_icon.png" width="15" height="15" />
              <div class="">
                {{ translations && translations.reposted_from }}
              </div>
              <Icon
                class="translate-y-[-1px]"
                icon="ion:caret-forward"
                width="15"
              />
              <div class="font-bold cursor-pointer">
                {{
                  postToEnlarge.original_user_first_name +
                  " " +
                  postToEnlarge.original_user_last_name
                }}
              </div>
            </div>
          </Link>
        </div>
        <div
          class="self-start"
          style="white-space: pre-wrap"
          v-if="postToEnlarge.repost_comment"
        >
          {{ postToEnlarge.repost_comment }}
        </div>

        <div
          :class="`${title_text_alignment} ${
            titleCustomBgColor.startsWith('#')
              ? ' flex-col w-full items-center  px-2 py-2 rounded-md shadow-lg border-2'
              : 'w-full'
          } `"
          class="font-bold text-xl sm:text-2xl md:tex-3xl mb-1 mt-1"
          :style="{ backgroundColor: titleCustomBgColor }"
        >
          <span
            v-show="postToEnlarge.title"
            v-html="postToEnlarge.title"
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
          class=""
          :style="{ backgroundColor: customBgColor }"
        >
          <span
            v-show="postToEnlarge.body1"
            v-html="displayedBody1"
            style="white-space: pre-wrap"
            :style="textStyle"
            :class="`${body1Class} w-full processed-body inline`"
            ref="textElement"
          ></span>
        </div>

        <!-- INDIVIDUAL POST: MAIN IMAGES  -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div class="flex flex-row justify-center items-center w-full mb-1 mt-1">
          <div v-if="imageArray.length > 0" class="w-full">
            <div v-for="image in imageArray" :key="image.id" class="pb-2">
              <PostShowTheImage
                :image="image"
                :numberOfImages="1"
                :cropImage="false"
                :plusImages="false"
              >
              </PostShowTheImage>
            </div>
          </div>
        </div>

        <!-- Text Body2 LOWER -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

        <div :class="`'w-full'`" class="">
          <span
            v-show="postToEnlarge.body2"
            v-html="displayedBody2"
            style="white-space: pre-wrap"
            :style="textStyleBody2"
            :class="`w-full processed-body inline`"
            ref="textElementBody2"
          ></span>
        </div>
        <!-- footer icons counts -->
        <!-- INDIVIDUAL POST: BOTTOM ROW MENU -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div
          :class="`mb-2 ${
            postToEnlarge.body2 ? 'mt-3' : ''
          } border-[1px] w-1/3 border-gray-800 rounded self-center`"
        ></div>

        <div class="pb-2 flex justify-between w-full">
          <div class="flex gap-2">
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
                class="text-[13px] sx:text-[15px] sm:text-[17px] flex items-center justify-center self-center"
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
                class="text-[13px] sx:text-[15px] sm:text-[17px] flex items-center justify-center"
              >
                {{ dislikes_count }}
              </div>
            </div>
          </div>
          <div
            class="text-gray-900 text-[11px] x350:text-[13px] sx:text-[15px] sm:text-[17px] flex items-center self-center gap-[2px]"
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
              class="text-[11px] x350:text-[13px] sx:text-[15px] flex items-center justify-center sm:text-[17px] leading-3"
            >
              {{ repost_count }} {{ translations && translations.reposts }}
            </span>
          </div>
        </div>

        <div :class="`mb-2 border-[1px] w-full border-gray-300 rounded`"></div>
        <div
          class="flex flex-row max-sm:gap-1 justify-between items-center w-full mb-2"
        >
          <!-- Likes -->
          <div class="hovered" @click="onLike">
            <div
              class="font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800 cursor-pointer"
            >
              <div class="flex flex-row justify-between items-center">
                <div class="hovered">
                  <Icon
                    icon="emojione-monotone:up-arrow"
                    class="text-[17px] x350:text-[20px] sm:text-[25px] icon-like text-transparent stroke-[2px] stroke-green-600"
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
            <a
              class="font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800 cursor-pointer"
            >
              <div class="flex flex-row justify-between items-center">
                <div class="">
                  <!-- <img src="/images/icons/like_green.png" width="25" height="25" /> -->
                  <!-- <Icon icon="emojione-monotone:up-arrow" :rotate="2" color="#c40516" width="25" /> -->
                  <Icon
                    icon="emojione-monotone:up-arrow"
                    :rotate="2"
                    :class="`${your_reaction === 'dislike' ? 'disliked' : ''}`"
                    class="text-[17px] x350:text-[20px] sm:text-[25px] icon-dislike text-transparent stroke-[2px] stroke-[#c40516]"
                  />
                </div>
                <div class="pl-1 icon-text text-[#c40516]">
                  {{ translations && translations.dislike }}
                </div>
              </div>
            </a>
          </div>

          <!-- Comments -->
          <div
            class="hovered cursor-pointer"
            @click="$emit('enlarge-post', post)"
          >
            <div
              class="font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800"
            >
              <div class="flex flex-row justify-between items-center">
                <div class="">
                  <img
                    src="/images/icons/comment_icon.png"
                    class="w-[17px] x350:w-[20px] sm:w-[25px] h-[17px] x350:h-[20px] sm:h-[25px]"
                  />
                </div>
                <div class="pl-1 icon-text">
                  {{ translations && translations.comment }}
                </div>
              </div>
            </div>
          </div>

          <!-- Re-Posted -->
          <div
            class="hovered cursor-pointer"
            @click="onOpenRepostAssuranceModel"
          >
            <div
              class="font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800"
            >
              <div class="flex flex-row justify-between items-center">
                <div class="">
                  <img
                    src="/images/icons/share_icon.png"
                    class="w-[17px] x350:w-[20px] sm:w-[25px] h-[17px] x350:h-[20px] sm:h-[25px]"
                  />
                </div>
                <div class="pl-1 icon-text">
                  {{ translations && translations.repost }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div :class="`mb-2 border-[1px] w-full border-gray-300 rounded`"></div>
        <AllComments
          ref="allCommentsRef"
          v-model:modelValue="allComments"
          :loadingComments="loadingComments"
          v-model:addedNumber="addedNumber"
          :postId="postToEnlarge.id"
          :pagination="pagination"
          :added="added"
        />
      </div>

      <!-- TOP BACK TO NEWS FEED -->
      <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
      <WriteCommentFooter
        @unshiftIntoComments="onAddingComment"
        :postId="postToEnlarge.id"
      />
    </div>
  </div>
  <!-- </div> -->
</template>
<style scoped>
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
.hovered:hover .icon-dislike {
  stroke-width: 0px;
  color: #c40516;
}
</style>
