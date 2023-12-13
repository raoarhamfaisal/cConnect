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
    <div class="flex flex-col justify-center ml-1">
      <!-- @touchstart="handleTouchStart"
      @touchend="handleTouchEnd" -->
      <div class="flex gap-2">
        <div class="bg-[#f0f2f5] rounded-[18px] px-3 py-2">
          <Link
            class="font-bold text-sm"
            :href="`/contractor/${comment.user_id}`"
          >
            <!-- {{  user }} -->
            {{
              comment.first_name + " " + comment.last_name ||
              comment.company_name
            }}
          </Link>
          <div class="text-sm" style="white-space: pre-wrap">
            {{ comment.body }}
          </div>
        </div>

        <!-- action menu -->
        <div
          class="hover:opacity-100 hover:pointer-events-auto cursor-pointer self-center w-[22%] h-full"
        >
          <v-menu v-model="menuVisible">
            <template v-slot:activator="{ props }">
              <button
                class="bg-[#f0f2f5] px-3 py-2 rounded-[18px] flex items-center"
                v-bind="props"
              >
                <Icon icon="pepicons-pencil:dots-x" />
              </button>
            </template>
            <v-list>
              <v-list-item class="hover:bg-gray-200" @click="openEditModal">
                <v-list-item-title class="cursor-pointer"
                  >Edit</v-list-item-title
                >
              </v-list-item>
              <v-list-item class="hover:bg-gray-200" @click="openDeleteModal">
                <v-list-item-title class="cursor-pointer"
                  >Delete</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div class="text-xs flex gap-4 mt-[3px] ml-3 text-[#65676B]">
        <div>
          {{ timeAgo(comment.updated_at) }}
        </div>
        <div class="font-bold hover:underline cursor-pointer">Like</div>
        <div class="font-bold hover:underline cursor-pointer">Dislike</div>
        <div class="font-bold hover:underline cursor-pointer">Reply</div>
        <!-- Like -->
        <div
          class="flex gap-1 justify-center items-center cursor-pointer"
          @click="onOpenListofLikedUsersModel"
        >
          <!-- <div v-if="post.likes_count" class=""> -->
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
  <teleport to="body">
    <CustomDialog
      submitText="Delete"
      :disableOutSideClick="false"
      @submit="handleSubmitDelete"
      ref="deleteDialogRef"
      :loading="loadingDelete"
      :disabled="loadingDelete"
      errorIcon
      dialogWidth="max-h-[70vh] width50"
      title="Are you sure? "
    >
      <div class="mb-4">
        <div
          class="section_text-lg font-bold sm:pl-6 section_text-gray-800 mt-3 mb-2"
        >
          Do you want to Delete this comment?
        </div>
      </div>
    </CustomDialog>
  </teleport>
  <EditCommentModal
    ref="editRef"
    :commentText="comment?.body"
    :commentId="comment.id"
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

const props = defineProps({
  comment: Object,
  // liked: {
  //   default: false,
  //   type: Boolean,
  // },
});
const store = useStore();
const visible = ref(false);
const deleteDialogRef = ref();
const likes_count = ref(0);
const dislikes_count = ref(0);
const loadingDelete = ref(false);
const showIcon = ref(false);
const menuVisible = ref(false);
const editRef = ref();
// const longPressTimer = ref(null);
const screenWidth = computed(() => store.getters.screenWidth);

const openEditModal = () => {
  editRef.value.openDialogEdit();
};
const openDeleteModal = () => {
  deleteDialogRef.value.openDialog();
};
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
      console.log("after showing message");
    }
  } catch (err) {
    console.log(err);
    somethingWentWrong(err.response.data.message, "inherit");
  } finally {
    loadingDelete.value = false;
    deleteDialogRef.value.closeDialog();
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
