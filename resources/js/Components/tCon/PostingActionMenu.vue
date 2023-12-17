<script>
import { Link, usePage } from "@inertiajs/inertia-vue3";
import PostFormEdit from "@/Components/tCon/PostFormEdit.vue";
import ReportPost from "@/Components/tCon/ReportPost.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";

export default {
  components: {
    Link,
    CustomDialog,
    ReportPost,
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
      loadingDelete: false,
      success: false,
      postToEdit: { ...this.post },
      profileId: usePageDeatails.profile.id,
      loadingBlockContact: false,
      //
    };
  },
  mounted() {
    this.postToEdit.imagesUploadedAlready = this.postToEdit.image;
    this.postToEdit.image = "";
  },
  methods: {
    openEditForm(formData) {
      this.showingNavigationDropdown = false;
      this.isFormOpen = true;
    },
    closeEditModal() {
      this.isFormOpen = false;
    },
    async handleSubmitDelete() {
      this.loadingDelete = true;
      try {
        const response = await axios.delete(
          `/api/comments/${props.reply.id}`,
          getAxiosConfig()
        );
        if (response.data) {
          changesSaved(response.data.message || "Post successfully deleted");
        }
      } catch (err) {
        console.log(err);
        somethingWentWrong(err.response.data.message, "inherit");
      } finally {
        this.loadingDelete = false;
        this.$refs.deleteDialogRef.closeDialog();
      }
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

    async saveItem(formData) {
      // this.success = false;
      // formData.user_id = (this.profile && this.profile.user_id) || null;
      // formData.is_body_bold = formData.is_body_bold ? 1 : 0;
      // console.log(formData.image, "before");
      // formData.image = formData.image
      //   ? this.reverseAndJoinString(formData.image)
      //   : formData.image;
      // console.log(formData.image, "after");
      // // Same method for update & create
      // // if we have an item id then update
      // formData.region_id = +formData.region_id;
      // formData.title = formData.title
      //   ? await filterBadWordsWithoutValue(formData.title)
      //   : formData.title;
      // formData.body1 = formData.body1
      //   ? await filterBadWordsWithoutValue(formData.body1)
      //   : formData.body1;
      // formData.body2 = formData.body2
      //   ? await filterBadWordsWithoutValue(formData.body2)
      //   : formData.body2;
      // let url = "/post";
      // if (formData.id) {
      //   url = "/post/" + formData.id;
      //   formData._method = "PUT";
      // }
      // console.log("saveItem: " + url);
      // // see results - chrome: inpect/network/headers & payload
      // // 1) goes to web.php router
      // // 2) router listens for Route::post('/post')
      // //    to PostController store method
      // this.$inertia.post(url, formData, {
      //   onError: () => {},
      //   onSuccess: () => {
      //     this.closeModal();
      //     this.success = true;
      //     this.$store.commit("ratings/setShouldFetchFirstPagePosts", true);
      //     changesSaved("Post Successfully Added");
      //   },
      // });
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
              <span class="mx-4 font-medium">Edit Post</span>
            </button>

            <!-- DELETE Posting Action Menu -->
            <button
              @click="openDeletedPostDialog"
              class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
            >
              <img src="/images/icons/delete.png" width="20" height="20" />
              <span class="mx-4 font-medium">Delete Post</span>
            </button>
          </div>
          <div v-else>
            <!-- Posting Action Menu: Report Post -->
            <button
              @click="openPostReportDialog"
              class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700"
            >
              <img src="/images/icons/Icon-report.png" width="20" height="20" />
              <span class="mx-4 font-medium">Report Post</span>
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
              <span class="mx-4 font-medium">Block This Contact</span>
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
              <span class="mx-4 font-medium">Follow Contact</span>
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
              <span class="mx-4 font-medium">Un-Follow Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <!-- END: HAMBURGER Navigation Menu -->

    <ReportPost ref="repostPostDialogRef" :postId="postId" />
    <!-- Block -->
    <teleport to="body">
      <CustomDialog
        submitText="Block Now"
        :disableOutSideClick="true"
        @submit="handleSubmitBlock"
        ref="blockDialogRef"
        :loading="loadingBlockContact"
        :disabled="loadingBlockContact"
        errorIcon
        dialogWidth="max-h-[70vh] width50"
        title="Are you sure about Blocking this Contact? "
      >
        <div class="">
          <div
            class="section_text-lg font-bold sm:pl-6 section_text-gray-800 mt-3 mb-2"
          >
            Activate 'Hide Posts' to stop seeing updates from this user, keeping
            your feed tailored to your preferences.
          </div>
        </div>
      </CustomDialog>
    </teleport>

    <!-- Delete post -->
    <teleport to="body">
      <CustomDialog
        submitText="Delete"
        :disableOutSideClick="true"
        @submit="handleSubmitDelete"
        ref="deleteDialogRef"
        :loading="loadingDelete"
        :disabled="loadingDelete"
        errorIcon
        dialogWidth="max-h-[70vh] width50"
        title="Are you sure? "
      >
        <div class="">
          <div
            class="section_text-lg font-bold sm:pl-6 section_text-gray-800 mt-3 mb-2"
          >
            Please confirm if you wish to proceed with the deletion of this
            post. Be advised that this action is irreversible and the post will
            be permanently removed.
          </div>
        </div>
      </CustomDialog>
    </teleport>
    <Teleport to="body">
      <keep-alive>
        <PostFormEdit
          v-if="isFormOpen"
          :isOpen="isFormOpen"
          :id="profileId"
          :form="postToEdit"
          :success="success"
          :imageArray="imageArray"
          @formsave="saveItem"
          @formclose="closeEditModal"
        >
        </PostFormEdit>
      </keep-alive>
    </Teleport>
  </div>
</template>
