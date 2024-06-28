<script>
import { Link, usePage } from "@inertiajs/inertia-vue3";
import PostFormEdit from "@/Components/tCon/PostFormEdit.vue";
import ReportPost from "@/Components/tCon/ReportPost.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import {
  changesSaved,
  filterBadWordsWithoutValue,
  somethingWentWrong,
} from "@/helpers/utilities";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import InputError from "@/Components/InputError.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Link,
    CustomDialog,
    ReportPost,
    InputError,
    PostFormEdit,
  },

  props: {
    showingPostingActionMenu: Boolean,
    // menu in reference to this post.id
    postID: Number, // the posting number
    postUserId: Number,
    post: Object,
    currentUserId: Number,

    imageArray: Array,
  },

  data() {
    let usePageDeatails = usePage().props.value;

    return {
      isFormOpen: false,
      loadingUpdate: false,
      loadingDelete: false,
      success: false,
      postToEdit: { ...this.post },
      profileId: usePageDeatails.profile.id,
      loadingBlockContact: false,
      loadingEditRepost: false,
      commentText: "",
      commentTextError: "",

      //
    };
  },
  emits: ["repostEdited"],
  computed: {
    ...mapGetters(["translations"]),
  },
  mounted() {
    this.postToEdit.image = "";
  },
  methods: {
    openEditForm(formData) {
      if (!this.post.repost_comment) {
        this.postToEdit = { ...this.post };
        this.showingNavigationDropdown = false;
        this.isFormOpen = true;
      } else {
        this.commentText = this.post.repost_comment;
        this.$refs.editRepostCommentDialogRef.openDialog();
      }
    },
    closeEditModal() {
      this.isFormOpen = false;
    },
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
    async onEditRepost() {
      if (this.validate()) {
        this.loadingEditRepost = true;
        const reposterComment = {
          repost_comment: filterBadWordsWithoutValue(this.commentText),
        };
        try {
          const response = await axios.patch(
            `/api/posts/${this.post.id}/edit-repost`,
            reposterComment,
            getAxiosConfig()
          );
          if (response.data) {
            this.$emit("repostEdited", this.commentText, this.post.id);
            changesSaved(
              this.translations && this.translations.changes_successfully_saved
            );
          }
        } catch (err) {
          somethingWentWrong(err.response.data.message, "inherit");
        } finally {
          this.loadingEditRepost = false;
          this.$refs.editRepostCommentDialogRef.closeDialog();
        }
      }
    },
    async handleSubmitDelete() {
      this.loadingDelete = true;
      let url = "/post/" + this.post.id;

      this.$inertia.delete(url, {
        onFinish: () => {
          this.loadingDelete = false;
        },
        onSuccess: () => {
          this.loadingDelete = false;
          changesSaved("Post Successfully Deleted");
          this.$store.commit("profile/setDeletedPost", this.post);

          this.$refs.deleteDialogRef.closeDialog();
        },
      });
    },
    openDeletedPostDialog() {
      this.$refs.deleteDialogRef.openDialog();
    },
    openPostReportDialog() {
      this.$refs.repostPostDialogRef.openDialog();
    },
    openBlockContactDialog() {
      this.$refs.blockDialogRef.openDialog();
    },
    async handleSubmitBlock() {
      this.loadingBlockContact = true;
      try {
        const response = await axios.post(
          `/api/user/${this.post.user_id}/block`,
          {},
          getAxiosConfig()
        );
        if (response.data) {
          changesSaved(response.data.message || "User Successfully Blocked");
          this.$store.commit("profile/setDeletedPost", this.post);
        }
      } catch (err) {
        somethingWentWrong(err.response.data.message, "inherit");
      } finally {
        this.loadingBlockContact = false;
        this.$refs.blockDialogRef.closeDialog();
      }
    },
    async saveItem(formData) {
      this.success = false;
      this.loadingUpdate = true;

      formData.is_body_bold = formData.is_body_bold ? 1 : 0;

      // Same method for update & create
      // if we have an item id then update

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
        formData._method = "PATCH";
      }

      if (formData.image) {
        const allImages = formData.image.split("|");
        const uploadPostsImages = allImages.map((path) => {
          if (!path.startsWith("uploads/posts/")) {
            return "uploads/posts/" + path;
          }
          return path;
        });

        formData.image = uploadPostsImages.join("|");
      }

      this.$inertia.patch(url, formData, {
        onError: () => {
          this.loadingUpdate = false;
        },
        onFinish: () => {
          this.loadingUpdate = false;
        },
        onSuccess: () => {
          this.closeEditModal();
          this.success = true;
          this.loadingUpdate = false;
          // this.$store.commit("profile/setUpdatedPost", formData);
          this.$store.commit("profile/setUpdatedPostId", formData.id);
          changesSaved("Post Successfully updated");
        },
      });
    },
  },
};
</script>

<template>
  <div id="" class="z-50 fixed top-4 right-2 left-4 included">
    <div
      :class="{
        // if true class = block if not, class = hidden
        block: showingPostingActionMenu,
        hidden: !showingPostingActionMenu,
      }"
      class="absolute flex top-11 right-0 sm:right-0 px-3 text-left border-b border-gray-400 rounded-xl bg-gray-100"
    >
      <div class="">
        <!-- HAMBURGER MENU OPTIONS -->
        <div :id="'postID' + postID" class="PostActionMenu pt-1 pb-3 space-y-2">
          <!-- EDIT & DELETE POST -->
          <div v-if="currentUserId == postUserId">
            <!-- EDIT Posting Action Menu -->
            <button
              @click="openEditForm"
              class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
            >
              <img src="/images/icons/edit.png" width="20" height="20" />
              <span class="mx-4 font-medium">{{
                translations && translations.edit_post
              }}</span>
            </button>

            <!-- DELETE Posting Action Menu -->
            <button
              @click="openDeletedPostDialog"
              class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
            >
              <img src="/images/icons/delete.png" width="20" height="20" />
              <span class="mx-4 font-medium">{{
                translations && translations.delete_post
              }}</span>
            </button>
          </div>
          <div v-else>
            <!-- Posting Action Menu: Report Post -->
            <button
              @click="openPostReportDialog"
              class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
            >
              <img src="/images/icons/Icon-report.png" width="20" height="20" />
              <span class="mx-4 font-medium">{{
                translations && translations.report_post
              }}</span>
            </button>

            <!-- DropDown: BLOCK THIS CONTACT -->
            <button
              @click="openBlockContactDialog"
              class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
            >
              <img
                src="/images/icons/Icon-blocked-red.png"
                width="20"
                height="20"
              />
              <span class="mx-4 font-medium">{{
                translations && translations.block_this_contact
              }}</span>
            </button>

            <!-- DropDown: FOLLOW CONTACT -->
            <Link
              :href="route('post')"
              class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
            >
              <img
                src="/images/icons/Icon-person-blue.png"
                width="20"
                height="20"
              />
              <span class="mx-4 font-medium">{{
                translations && translations.follow_contact
              }}</span>
            </Link>

            <!-- DropDown: UN-FOLLOW -->
            <Link
              :href="route('post')"
              class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
            >
              <img
                src="/images/icons/icon-unfollow.png"
                width="20"
                height="20"
              />
              <span class="mx-4 font-medium">{{
                translations && translations.un_follow_contact
              }}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <!-- END: HAMBURGER Navigation Menu -->

    <ReportPost ref="repostPostDialogRef" :postId="postID" />
    <!-- Block -->
    <teleport to="body">
      <CustomDialog
        :submitText="translations && translations.block_now"
        :disableOutSideClick="true"
        @submit="handleSubmitBlock"
        ref="blockDialogRef"
        :loading="loadingBlockContact"
        :disabled="loadingBlockContact"
        errorIcon
        dialogWidth="max-h-[70vh] width50"
        :title="
          translations && translations.are_you_sure_about_blocking_this_contact
        "
      >
        <div class="">
          <div
            class="section_text-lg font-bold sm:pl-6 section_text-gray-800 mt-3 mb-2"
          >
            {{ translations && translations.activate_hide_posts }}
          </div>
        </div>
      </CustomDialog>
    </teleport>

    <!-- Delete post -->
    <teleport to="body">
      <CustomDialog
        :submitText="translations && translations.delete"
        :disableOutSideClick="true"
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
            {{ translations && translations.please_confirm_deletion }}
          </div>
        </div>
      </CustomDialog>
    </teleport>
    <teleport to="body">
      <CustomDialog
        ref="editRepostCommentDialogRef"
        @submit="onEditRepost"
        :loading="loadingEditRepost"
        :disabled="loadingEditRepost"
        :shouldFetchPost="false"
        :submitText="translations && translations.save"
        :title="
          translations &&
          translations.edit + translations &&
          translations.repost_text
        "
      >
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
          :placeholder="
            translations && translations.say_something_about_the_post
          "
        />
        <InputError
          v-if="commentTextError"
          class="mt-2"
          :message="commentTextError"
        />
      </CustomDialog>
    </teleport>
    <Teleport to="body">
      <!-- <keep-alive> -->
      <PostFormEdit
        v-if="isFormOpen"
        :isOpen="isFormOpen"
        :id="profileId"
        :loadingUpdate="loadingUpdate"
        :form="postToEdit"
        :success="success"
        :imageArray="imageArray"
        @formsave="saveItem"
        @formclose="closeEditModal"
      >
      </PostFormEdit>
      <!-- </keep-alive> -->
    </Teleport>
  </div>
</template>
