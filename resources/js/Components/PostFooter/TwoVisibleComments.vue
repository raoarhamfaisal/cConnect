<template>
  <div
    v-if="length > 2"
    @click="emit('openAllComments')"
    class="cursor-pointer hover:underline font-bold text-gray-600 text-sm w-fit"
  >
    {{ translations && translations.view_all_comments }}
  </div>
  <div v-if="loadingComments">
    <v-skeleton-loader
      v-for="n in 2"
      :key="n"
      color="#e5e7eb"
      type="list-item-avatar-two-line"
    ></v-skeleton-loader>
  </div>
  <div
    v-if="comments && comments.length > 0"
    class="flex flex-col gap-1 sm:gap-2"
    ref="commentList"
  >
    <transition-group
      name="comment-transition"
      tag="div"
      class="flex flex-col gap-1 sm:gap-2"
    >
      <div v-for="comment in comments" :key="comment.id">
        <Comment :comment="comment" />
      </div>
    </transition-group>
  </div>

  <div class="flex gap-2 w-full items-start overflow-auto" v-if="length > 0">
    <textarea
      id="comment"
      v-model="commentText"
      @paste="adjustHeight"
      ref="commentAreaRef"
      @keydown="insertTab"
      @input="adjustHeight"
      :rows="1"
      :placeholder="translations && translations.write_a_comment"
      class="text-xl w-full py-1 min-h-[40px] overflow-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-400 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600"
    ></textarea>
    <Icon
      type="button"
      :disabled="loadingSendComment"
      @click="onSendComment"
      :class="`w-8 h-8 sx:w-10 sx:h-10 cursor-pointer text-gray-500 apply-stroke ${
        loadingSendComment ? 'opacity-40' : 'opacity-100'
      }`"
      icon="carbon:send-filled"
    />
  </div>
  <v-dialog
    v-if="comments && comments.length > 0"
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
        {{ translations && translations.comment }}...
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
import Card from "@/Components/Card.vue";

import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { filterBadWords, somethingWentWrong } from "@/helpers/utilities";
import { Icon } from "@iconify/vue";
import { computed, nextTick, ref } from "vue";
import Comment from "@/Components/PostFooter/Comment.vue";

import { useStore } from "vuex";

const props = defineProps({
  comments: {
    type: Array,
  },
  loadingComments: {
    default: false,
    type: Boolean,
  },
  length: {
    type: Number,
  },
  postId: {
    type: [Number, String],
  },
});
const emit = defineEmits(["openAllComments", "unshiftIntoComments"]);
const loadingSendComment = ref(false);
const commentText = ref("");
const commentAreaRef = ref();

const store = useStore();
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
  loadingSendComment.value = true;
  if (!commentText.value && commentText.value / trim() === "") {
    return;
  }
  const postComment = {
    body: filterBadWords(commentText),
  };
  try {
    const response = await axios.post(
      `/api/posts/${props.postId}/comments`,
      postComment,
      getAxiosConfig()
    );
    if (response.data) {
      // this.allComments = response.data;
      commentText.value = "";
      adjustHeight();
      emit("unshiftIntoComments", response.data);
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

//Computed
const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);
</script>
