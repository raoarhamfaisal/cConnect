<template>
  <div
    class="flex flex-row gap-1 sm:gap-2 justify-start items-start transition-all duration-1000 transitioning"
  >
    <!-- @mouseenter="showIcon = true"
    @mouseleave="showIcon = false" -->
    <!-- Avatar -->
    <Link
      :href="`/contractor/${comment.user_id}`"
      class="cursor-pointer flex justify-start items-start flex-none w=16 mt-[2px]"
    >
      <!-- <Link :href="route('user.show')" class="block "> -->
      <div class="block">
        <Avatar
          :style="{
            width: screenWidth >= 640 ? '2.5rem' : '2.0rem',
            height: screenWidth >= 640 ? '2.5rem' : '2.0rem',
          }"
          :imageSrc="comment.user_avatar || comment.company_logo"
        />
      </div>
    </Link>

    <!-- User Info -->
    <div class="flex flex-col justify-center">
      <!-- @touchstart="handleTouchStart"
      @touchend="handleTouchEnd" -->
      <div class="flex gap-1 sm:gap-2">
        <div class="bg-[#f0f2f5] rounded-[18px] px-3 py-2">
          <Link
            class="font-bold text-xs x350:text-sm"
            :href="`/contractor/${comment.user_id}`"
          >
            <!-- {{  user }} -->
            {{
              comment.first_name + " " + comment.last_name ||
              comment.company_name
            }}
          </Link>
          <div class="text-xs x350:text-sm" style="white-space: pre-wrap">
            {{ comment.body }}
          </div>
        </div>

        <!-- action menu -->
        <div
          v-if="loggedInUserId === comment.user_id"
          class="hover:opacity-100 hover:pointer-events-auto cursor-pointer self-center"
        >
          <v-menu v-model="menuVisible">
            <template v-slot:activator="menuProps">
              <v-tooltip
                :open-on-click="false"
                :open-on-focus="true"
                v-model="tooltip"
                max-width="300px"
                text="Edit or Delete the comment"
                location="top"
              >
                <template v-slot:activator="{ props }">
                  <div v-bind="props">
                    <button
                      class="bg-[#f0f2f5] px-2 sm:px-3 py-1 sm:py-2 rounded-[18px] flex items-center"
                      v-bind="menuProps.props"
                    >
                      <Icon icon="pepicons-pencil:dots-x" />
                    </button>
                  </div>
                </template>
              </v-tooltip>
            </template>
            <v-list>
              <v-list-item class="hover:bg-gray-200" @click="openEditModal">
                <v-list-item-title class="cursor-pointer">{{
                  translations && translations.edit
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item class="hover:bg-gray-200" @click="openDeleteModal">
                <v-list-item-title class="cursor-pointer">{{
                  translations && translations.delete
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div
        class="text-xs flex gap-2 x350:gap-3 xs:gap-4 items-center mt-[3px] ml-2 text-[#65676B]"
      >
        <div>
          {{ timeAgo(comment.updated_at) }}
        </div>
        <div
          @click="onLike"
          class="font-bold hover:underline hover:text-[#16a34a] cursor-pointer"
          :class="`${your_reaction === 'like' ? 'text-[#16a34a]' : ''}`"
        >
          {{ translations && translations.like }}
        </div>
        <div
          @click="onDislike"
          class="font-bold hover:underline cursor-pointer hover:text-[#c40516]"
          :class="`${your_reaction === 'dislike' ? 'text-[#c40516]' : ''}`"
        >
          {{ translations && translations.dislike }}
        </div>
        <div
          class="font-bold hover:underline cursor-pointer"
          @click="showReplyBox"
        >
          {{ translations && translations.reply_first_cap }}
        </div>
        <!-- Like -->
        <div
          class="flex gap-1 justify-center items-center cursor-pointer"
          @click="() => onOpenListofLikedUsersModel()"
        >
          <!-- <div v-if="post.likes_count.value" class=""> -->
          <div
            class="font-medium text-xs text-blue-800 flex flex-row justify-between items-center cursor-pointer"
          >
            <Icon
              icon="emojione-monotone:up-arrow"
              :class="`  text-[#16a34a]`"
              width="14"
            />
          </div>
          <div
            class="translate-y-[0.5px] md:translate-y-[1px]"
            style="font-size: 12px"
          >
            {{ likes_count }}
          </div>
        </div>
        <!-- dislikes -->
        <div
          class="flex gap-1 justify-center items-center cursor-pointer"
          @click="() => onOpenListofDislikedUsersModel()"
        >
          <!-- <div v-if="post.likes_count" class=""> -->
          <div
            class="font-medium flex flex-row justify-between items-center text-xs text-blue-800 cursor-pointer"
          >
            <Icon
              icon="emojione-monotone:up-arrow"
              :class="`  text-[#c40516]`"
              width="14"
              :rotate="2"
            />
          </div>
          <div
            style="font-size: 12px"
            class="translate-y-[0.5px] md:translate-y-[1px]"
          >
            {{ dislikes_count }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="flex gap-2 w-full items-start overflow-auto mt-2 pl-[48px] sm:pl-[57px]"
    v-if="showReplyTextArea"
  >
    <textarea
      id="comment"
      v-model="commentText"
      @paste="adjustHeight"
      ref="commentAreaRef"
      @keydown="insertTab"
      @input="adjustHeight"
      :rows="1"
      :placeholder="translations && translations.write_your_reply"
      class="text-base w-full py-1 min-h-[30px] overflow-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-400 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600"
    ></textarea>
    <Icon
      type="button"
      :disabled="loadingSendComment"
      @click="onSendComment"
      :class="`w-8 h-8 cursor-pointer text-gray-500 apply-stroke ${
        loadingSendComment ? 'opacity-40' : 'opacity-100'
      }`"
      icon="carbon:send-filled"
    />
  </div>
  <div
    @click="showReplies"
    class="ml-[44px] hover:underline sm:ml-[60px] text-gray-600 mt-2 flex gap-2"
    v-if="comment.replies?.length > 0 && !isRepliesShown"
  >
    <Icon icon="bi:arrow-return-right" />
    <div class="font-bold text-sm cursor-pointer">
      {{ translations && translations.view }}
      {{ comment.replies?.length > 1 ? comment.replies.length : "" }}
      {{
        comment.replies?.length === 1
          ? translations && translations.reply
          : translations && translations.replies
      }}
    </div>
  </div>
  <div
    v-if="
      comment && comment.replies && comment.replies.length > 0 && isRepliesShown
    "
    class="flex flex-col gap-1 sm:gap-2 mt-2 ml-[40px] sm:ml-[57px]"
    ref="commentList"
  >
    <transition-group
      name="comment-transition"
      tag="div"
      class="flex flex-col gap-1 sm:gap-2"
    >
      <div v-for="reply in comment.replies" :key="reply.id">
        <Reply
          :reply="reply"
          @openLikedUserModal="onOpenListofLikedUsersModel"
          @openDislikedUserModal="onOpenListofDislikedUsersModel"
        />
      </div>
    </transition-group>
  </div>

  <teleport to="body">
    <CustomDialog
      :submitText="translations && translations.delete"
      :disableOutSideClick="false"
      @submit="handleSubmitDelete"
      ref="deleteDialogRef"
      :loading="loadingDelete"
      :disabled="loadingDelete"
      errorIcon
      dialogWidth="max-h-[70vh] width50"
      :title="translations && translations.are_you_sure"
    >
      <div class="">
        <div
          class="section_text-lg font-bold sm:pl-6 section_text-gray-800 mt-3 mb-2"
        >
          {{ translations && translations.do_you_want_to_delete_this_comment }}
        </div>
      </div>
    </CustomDialog>
  </teleport>
  <EditCommentModal
    ref="editRef"
    :commentText="comment?.body"
    :commentId="comment.id"
  />
  <Teleport to="body">
    <CustomDialog
      ref="likeDialogRef"
      dialogWidth="w-full h-full sm:h-5/6"
      @opened="onLikeModalOpen"
      :showFooter="false"
      :title="
        isForReplyDialog
          ? translations && translations.people_who_liked_the_reply
          : translations && translations.people_who_liked_the_comment
      "
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
  </Teleport>
  <Teleport to="body">
    <CustomDialog
      ref="dislikeDialogRef"
      dialogWidth="w-full h-full sm:h-5/6"
      @opened="onDislikeModalOpen"
      :showFooter="false"
      :title="
        isForReplyDialog
          ? translations && translations.people_who_disliked_the_reply
          : translations && translations.people_who_disliked_the_comment
      "
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
  </Teleport>

  <v-dialog
    v-if="loadingSendComment"
    class="dialog-modal"
    v-model="loadingSendComment"
    scrim="transparent"
    persistent
    width="auto"
  >
    <Card
      :shadowLevel="2"
      bgColor="#364fc7"
      :padding="screenWidth < 640 ? '7px' : '10px'"
    >
      <div class="text-white">
        {{ translations && translations.uploading }}
        {{ translations && translations.reply_first_cap }}...
      </div>
      <v-progress-linear
        indeterminate
        color="#fff"
        class="mb-0"
      ></v-progress-linear>
    </Card>
  </v-dialog>
</template>

<script setup>
import {
  changesSaved,
  filterBadWords,
  somethingWentWrong,
  timeAgo,
} from "@/helpers/utilities";
import Card from "@/Components/Card.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import LikedUser from "@/Components/PostFooter/LikedUser.vue";

import EditCommentModal from "@/Components/PostFooter/EditCommentModal.vue";
import Reply from "@/Components/PostFooter/Reply.vue";

import Avatar from "@/Components/Ratings/Avatar.vue";

import { computed, nextTick, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { watch } from "vue";
import { usePage } from "@inertiajs/inertia-vue3";
import { reactive } from "vue";
import axios from "axios";

const props = defineProps({
  comment: Object,
});
const store = useStore();

const visible = ref(false);
const deleteDialogRef = ref();
const likes_count = ref(props.comment?.likes_count ?? 0);
const dislikes_count = ref(props.comment?.dislikes_count ?? 0);
const loadingDelete = ref(false);
// const showIcon = ref(false);
const menuVisible = ref(false);
const your_reaction = ref(props.comment?.user_reaction ?? "");
const editRef = ref();
const tooltip = ref(false);
const isRepliesShown = ref(false);
let usePageDeatails = usePage().props.value;
const loggedInUserId = usePageDeatails.profile.user_id;
// const longPressTimer = ref(null);
const showReplyTextArea = ref(false);
const loadingSendComment = ref(false);
const commentText = ref("");
const commentAreaRef = ref();
const likeDialogRef = ref(null);
const dislikeDialogRef = ref(null);
const likedUsers = ref([]);
const unLikedUsers = ref([]);
const loadingLiked = ref(false);
const loadingUnliked = ref(false);
const isForReplyDialog = ref(false);
const replyId = ref(0);

const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);

const openEditModal = () => {
  editRef.value.openDialogEdit();
};
const openDeleteModal = () => {
  deleteDialogRef.value.openDialog();
};

watch(
  () => menuVisible.value,
  (newVal) => {
    if (newVal) {
      tooltip.value = false;
    }
  }
);
watch(
  () => props.comment?.likes_count,
  (newVal) => {
    if (newVal !== undefined) {
      likes_count.value = newVal;
    }
  }
);

watch(
  () => props.comment?.dislikes_count,
  (newVal) => {
    if (newVal !== undefined) {
      dislikes_count.value = newVal;
    }
  }
);

watch(
  () => props.comment?.user_reaction,
  (newVal) => {
    console.log(newVal, "user_reaction");
    if (newVal !== undefined) {
      your_reaction.value = newVal;
    }
  }
);

watch(
  () => likes_count.value,
  (newValue) => {
    let postComment;
    postComment = {
      ...props.comment,
      likes_count: likes_count.value,
      dislikes_count: dislikes_count.value,
      user_reaction: your_reaction.value,
    };
    store.commit("profile/setPostComment", postComment);
  }
);
watch(
  () => dislikes_count.value,
  (newValue) => {
    let postComment;
    postComment = {
      ...props.comment,
      likes_count: likes_count.value,
      dislikes_count: dislikes_count.value,
      user_reaction: your_reaction.value,
    };
    store.commit("profile/setPostComment", postComment);
  }
);
watch(
  () => your_reaction.value,
  (newValue) => {
    let postComment;
    postComment = {
      ...props.comment,
      likes_count: likes_count.value,
      dislikes_count: dislikes_count.value,
      user_reaction: your_reaction.value,
    };
    store.commit("profile/setPostComment", postComment);
  }
);

onMounted(() => {
  visible.value = true;
});
const handleSubmitDelete = async () => {
  loadingDelete.value = true;
  try {
    const response = await axios.delete(
      `/api/comments/${props.comment.id}`,
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(response.data.message || "Comment successfully deleted");
      store.commit("profile/setCommentId", props.comment.id);
    }
  } catch (err) {
    somethingWentWrong(err.response.data.message, "inherit");
  } finally {
    loadingDelete.value = false;
    deleteDialogRef.value.closeDialog();
  }
};

const onLike = async () => {
  if (!your_reaction.value || your_reaction.value === "dislike") {
    likes_count.value = likes_count.value + 1;
    // if(!your_reaction.value){
    // }
    if (your_reaction.value === "dislike") {
      dislikes_count.value = dislikes_count.value - 1;
    }
    your_reaction.value = "like";

    try {
      const response = await axios.post(
        `/api/comments/${props.comment.id}/like`,
        {},
        getAxiosConfig()
      );
      if (response.data) {
      }
    } catch (err) {
      somethingWentWrong();
    }
  } else {
    if (your_reaction.value === "like") {
      likes_count.value = likes_count.value - 1;

      your_reaction.value = null;

      try {
        const response = await axios.delete(
          `/api/comments/${props.comment.id}/like`,
          getAxiosConfig()
        );
        if (response.data) {
        }
      } catch (err) {
        somethingWentWrong();
      }
    }
  }
};
const onDislike = async () => {
  if (!your_reaction.value || your_reaction.value === "like") {
    dislikes_count.value = dislikes_count.value + 1;
    // if(!your_reaction.value){
    // }
    if (your_reaction.value === "like") {
      likes_count.value = likes_count.value - 1;
    }
    your_reaction.value = "dislike";

    try {
      const response = await axios.post(
        `/api/comments/${props.comment.id}/dislike`,
        {},
        getAxiosConfig()
      );
      if (response.data) {
      }
    } catch (err) {
      somethingWentWrong();
    }
  } else {
    if (your_reaction.value === "dislike") {
      dislikes_count.value = dislikes_count.value - 1;

      your_reaction.value = null;

      try {
        const response = await axios.delete(
          `/api/comments/${props.comment.id}/dislike`,
          getAxiosConfig()
        );
        if (response.data) {
        }
      } catch (err) {
        somethingWentWrong();
      }
    }
  }
};
const showReplies = () => {
  isRepliesShown.value = true;
};
const showReplyBox = () => {
  showReplyTextArea.value = !showReplyTextArea.value;
};
const insertTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Set the value to: text before caret + four spaces + text after caret
    commentText.value =
      commentText.value.substring(0, start) +
      "      " +
      commentText.value.substring(end);

    // Put caret at right position again
    nextTick(() => {
      event.target.selectionStart = event.target.selectionEnd = start + 60;
    });
  }
};
const onSendComment = async () => {
  console.log("loading comment");
  loadingSendComment.value = true;
  if (!commentText.value && commentText.value / trim() === "") {
    return;
  }
  const postComment = {
    body: filterBadWords(commentText),
  };
  try {
    const response = await axios.post(
      `/api/comments/${props.comment.id}/reply`,
      postComment,
      getAxiosConfig()
    );
    if (response.data) {
      // this.allComments = response.data;
      commentText.value = "";
      adjustHeight();
      store.commit("profile/setReply", {
        reply: response.data,
        commentId: props.comment.id,
      });

      store.commit("profile/setIsCommentAdded", true);
      store.commit("profile/setIsCommentAddedEnlarged", true);
      changesSaved(
        translations.value &&
          translations.value.reply_first_cap + " " + translations.value &&
          translations.value.successfully_added,
        300,
        1500
      );
      showReplyTextArea.value = false;
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loadingSendComment.value = false;
  }
};
const adjustHeight = () => {
  nextTick(() => {
    commentAreaRef.value.style.height = "auto"; // Reset height first to get the correct scrollHeight
    commentAreaRef.value.style.height =
      commentAreaRef.value.scrollHeight + "px";
  });
};
const onOpenListofLikedUsersModel = (isforReply = false, repId = 0) => {
  isForReplyDialog.value = isforReply;
  console.log("onOpenListofLikedUsersModel", isForReplyDialog.value);
  replyId.value = repId;
  likeDialogRef.value.openDialog();
};
const onOpenListofDislikedUsersModel = (isforReply = false, repId = 0) => {
  isForReplyDialog.value = isforReply;
  replyId.value = repId;
  dislikeDialogRef.value.openDialog();
};
const onLikeModalOpen = async () => {
  loadingLiked.value = true;
  try {
    const response = await axios.get(
      `/api/comments/${
        isForReplyDialog.value ? replyId.value : props.comment.id
      }/likes`,
      getAxiosConfig()
    );
    if (response.data) {
      likedUsers.value = response.data;
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loadingLiked.value = false;
  }
};

const onDislikeModalOpen = async () => {
  loadingUnliked.value = true;
  try {
    const response = await axios.get(
      `/api/comments/${
        isForReplyDialog.value ? replyId.value : props.comment.id
      }/dislikes`,
      getAxiosConfig()
    );
    if (response.data) {
      unLikedUsers.value = response.data;
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loadingUnliked.value = false;
  }
};
// const handleTouchStart = () => {
//   if (longPressTimer.value) clearTimeout(longPressTimer.value);
//   longPressTimer.value = setTimeout(() => {
//     menuVisible.value = true; // Open the menu
//   }, 500); // Time in milliseconds
// };
// const handleTouchEnd = () => {
//   if (longPressTimer.value) clearTimeout(longPressTimer.value);
// };
</script>

<style>
.transitioning {
  transition: all 1.5s;
}
</style>
