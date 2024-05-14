<template>
  <!-- Dialog Footer -->
  <div
    :class="`flex ${
      !showCancel ? 'justify-end' : 'justify-between'
    } p-2 pb-0 sm:p-3 shadow-lg  overflow-hidden  border-t-[1px] border-gray-400 min-h-[60px] sm:min-h-[70px]`"
    v-if="showFooter"
    ref="container"
  >
    <div class="flex gap-2 w-full items-start overflow-auto max-h-[165px]">
      <textarea
        id="comment"
        v-model="commentText"
        @paste="adjustHeight"
        ref="commentAreaRef"
        @keydown="insertTab"
        @input="adjustHeight"
        :rows="1"
        placeholder="Write a comment..."
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
  </div>
</template>

<script setup>
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";

import { filterBadWords, somethingWentWrong } from "@/helpers/utilities";
import { Icon } from "@iconify/vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";

import { useStore } from "vuex";

const props = defineProps({
  postId: {
    type: [Number, String],
  },

  showCancel: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["unshiftIntoComments"]);

const store = useStore();
const commentAreaRef = ref();
const container = ref();
const commentText = ref("");
const minHeight = ref(70);
const paddingHeight = ref(25);
const loadingSendComment = ref(false);

//Computed
const screenWidth = computed(() => store.getters.screenWidth);

onMounted(() => {
  if (screenWidth.value > 640) {
    minHeight.value = 70;
    paddingHeight.value = 25;
  } else {
    minHeight.value = 60;
    paddingHeight.value = 17;
  }
});
watch(
  () => screenWidth,
  (newVal) => {
    console.log("here");
    if (newVal > 640) {
      minHeight.value = 70;
      paddingHeight.value = 25;
    } else {
      minHeight.value = 60;
      paddingHeight.value = 17;
    }
  }
);

//Methods

const adjustHeight = () => {
  nextTick(() => {
    commentAreaRef.value.style.height = "auto"; // Reset height first to get the correct scrollHeight

    commentAreaRef.value.style.height =
      commentAreaRef.value.scrollHeight + "px";
    if (
      commentAreaRef.value.scrollHeight < 165 &&
      commentAreaRef.value.scrollHeight + paddingHeight.value > minHeight.value
    ) {
      container.value.style.minHeight =
        commentAreaRef.value.scrollHeight + paddingHeight.value + "px";
    } else if (
      commentAreaRef.value.scrollHeight + paddingHeight.value <
      minHeight.value
    ) {
      container.value.style.minHeight = minHeight.value + "px";
    }
  });
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
const onSendComment = async (event) => {
  event.preventDefault();
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
      // comments.value.unshift(response.data);
      emit("unshiftIntoComments", response.data);
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loadingSendComment.value = false;
  }
};
</script>

<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

/* target state of the dialog after entering or before leaving */
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* transition effect for the dialog */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.apply-stroke path {
  stroke-width: 2px;
}
</style>
