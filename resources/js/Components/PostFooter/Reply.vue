<template>
  <div
    class="flex flex-row gap-1 sm:gap-2 justify-start items-start transition-all duration-1000 transitioning"
  >
    <!-- Avatar -->
    <Link
      :href="`/contractor/${reply.user_id}`"
      class="cursor-pointer flex justify-start items-start flex-none w=16 mt-[2px]"
    >
      <!-- <Link :href="route('user.show')" class="block "> -->
      <div class="block">
        <Avatar
          :style="{
            width: screenWidth >= 640 ? '1.9rem' : '1.8rem',
            height: screenWidth >= 640 ? '1.9rem' : '1.8rem',
          }"
          :imageSrc="reply.user_avatar || reply.company_logo"
        />
      </div>
    </Link>

    <!-- User Info -->
    <div class="flex flex-col justify-center sm:ml-1">
      <!-- @touchstart="handleTouchStart"
      @touchend="handleTouchEnd" -->
      <div class="flex gap-1 sm:gap-2">
        <div class="bg-[#f0f2f5] rounded-[18px] px-3 py-2">
          <Link
            class="font-bold text-sm"
            :href="`/contractor/${reply.user_id}`"
          >
            <!-- {{  user }} -->
            {{ reply.first_name + " " + reply.last_name || reply.company_name }}
          </Link>
          <div class="text-sm" style="white-space: pre-wrap">
            {{ reply.body }}
          </div>
        </div>

        <!-- action menu -->
        <div
          v-if="loggedInUserId === reply.user_id"
          class="hover:opacity-100 hover:pointer-events-auto cursor-pointer self-center"
        >
          <v-menu v-model="menuVisible">
            <template v-slot:activator="menuProps">
              <v-tooltip
                :open-on-click="false"
                :open-on-focus="true"
                v-model="tooltip"
                max-width="300px"
                text="Edit or Delete the reply"
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
                <v-list-item-title class="cursor-pointer"
                  >Edit</v-list-item-title
                >
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
        class="text-xs flex gap-2 x350:gap-3 xs:gap-4 items-center mt-[3px] ml-3 text-[#65676B]"
      >
        <div>
          {{ timeAgo(reply.updated_at) }}
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
        <!-- Like -->
        <div
          class="flex gap-1 justify-center items-center cursor-pointer"
          @click="onOpenListofLikedUsersModel"
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
          @click="onOpenListofDislikedUsersModel"
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
    @click="showReplies"
    class="ml-[54px] hover:underline sm:ml-[65px] text-gray-600 mt-2 flex gap-2"
    v-if="reply.replies?.length > 0 && !isRepliesShown"
  >
    <Icon icon="bi:arrow-return-right" />
    <div class="font-bold text-sm cursor-pointer">
      {{ translations && translations.view }}
      {{
        reply.replies?.length === 1
          ? reply.replies?.length + " reply"
          : reply.replies?.length + " replies"
      }}
    </div>
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
          {{ translations && translations.do_you_want_to_delete_this_reply }}
        </div>
      </div>
    </CustomDialog>
  </teleport>
  <EditCommentModal
    ref="editRef"
    isReply
    :commentText="reply?.body"
    :commentId="reply.id"
  />
</template>

<script setup>
import { changesSaved, somethingWentWrong, timeAgo } from "@/helpers/utilities";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import EditCommentModal from "@/Components/PostFooter/EditCommentModal.vue";

import Avatar from "@/Components/Ratings/Avatar.vue";

import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { watch } from "vue";
import { usePage } from "@inertiajs/inertia-vue3";

const props = defineProps({
  reply: Object,
});
const store = useStore();
const visible = ref(false);
const deleteDialogRef = ref();
const likes_count = ref(props.reply?.likes_count ?? 0);
const dislikes_count = ref(props.reply?.dislikes_count ?? 0);
const loadingDelete = ref(false);
const showIcon = ref(false);
const menuVisible = ref(false);
const your_reaction = ref(props.reply?.user_reaction ?? "");
const editRef = ref();
const tooltip = ref(false);
const isRepliesShown = ref(false);
let usePageDeatails = usePage().props.value;
const loggedInUserId = usePageDeatails.profile.user_id;
// const longPressTimer = ref(null);
const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);

const openEditModal = () => {
  editRef.value.openDialogEdit();
};
const openDeleteModal = () => {
  deleteDialogRef.value.openDialog();
};

const emit = defineEmits(["openDislikedUserModal", "openlikedUserModal"]);

watch(
  () => menuVisible.value,
  (newVal) => {
    if (newVal) {
      tooltip.value = false;
    }
  }
);

watch(
  () => props.reply?.likes_count,
  (newVal) => {
    if (newVal !== undefined) {
      likes_count.value = newVal;
    }
  }
);

watch(
  () => props.reply?.dislikes_count,
  (newVal) => {
    if (newVal !== undefined) {
      dislikes_count.value = newVal;
    }
  }
);

watch(
  () => props.reply?.user_reaction,
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
    let postReply;
    postReply = {
      ...props.reply,
      likes_count: likes_count.value,
      dislikes_count: dislikes_count.value,
      user_reaction: your_reaction.value,
    };
    store.commit("profile/setPostReply", postReply);
  }
);
watch(
  () => dislikes_count.value,
  (newValue) => {
    let postReply;
    postReply = {
      ...props.reply,
      likes_count: likes_count.value,
      dislikes_count: dislikes_count.value,
      user_reaction: your_reaction.value,
    };
    store.commit("profile/setPostReply", postReply);
  }
);
watch(
  () => your_reaction.value,
  (newValue) => {
    let postReply;
    postReply = {
      ...props.reply,
      likes_count: likes_count.value,
      dislikes_count: dislikes_count.value,
      user_reaction: your_reaction.value,
    };
    store.commit("profile/setPostReply", postReply);
  }
);
onMounted(() => {
  visible.value = true;
});
const handleSubmitDelete = async () => {
  loadingDelete.value = true;
  try {
    const response = await axios.delete(
      `/api/comments/${props.reply.id}`,
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(response.data.message || "Comment successfully deleted");
      store.commit("profile/setReplyId", props.reply.id);
    }
  } catch (err) {
    console.log(err);
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
        `/api/comments/${props.reply.id}/like`,
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
          `/api/comments/${props.reply.id}/like`,
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
        `/api/comments/${props.reply.id}/dislike`,
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
          `/api/comments/${props.reply.id}/dislike`,
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
const onOpenListofLikedUsersModel = () => {
  emit("openLikedUserModal", true, props.reply.id);
};
const onOpenListofDislikedUsersModel = () => {
  emit("openDislikedUserModal", true, props.reply.id);
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
