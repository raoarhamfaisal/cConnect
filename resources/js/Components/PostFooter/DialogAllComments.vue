<template>
  <div
    v-if="isVisible"
    class="fixed m-0 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
    :style="{
      '--tw-space-x-reverse': 'inherit',
    }"
    type="button"
    @click="
      () => {
        if (!disableOutSideClick) {
          closeDialog();
        }
      }
    "
  >
    <transition name="fade">
      <div
        class="bg-white md:w-2/3 w-full h-full sm:h-5/6 rounded-xl max-sm:rounded-none shadow-xl flex flex-col z-10"
        type="button"
        @click.stop
      >
        <div
          v-if="showHeader"
          class="flex justify-between rounded-b-none max-md:rounded-none rounded-lg text-white items-center p-2 xs:p-4 bg-[#241e6d]"
        >
          <div class="flex items-center gap-2">
            <Icon
              v-if="!dontAllowCancel"
              type="button"
              @click="closeDialog"
              class="w-8 h-8 sx:w-10 sx:h-10 cursor-pointer"
              icon="icon-park:back"
              color="red"
            />
            <h3 class="text-lg sx:text-xl font-bold">Comments</h3>
          </div>
          <button
            type="button"
            v-if="!dontAllowCancel"
            @click="closeDialog"
            class="p-2 hover:bg-[#6741d9] w-10 h-10 flex justify-center items-center rounded-full"
          >
            X
          </button>
        </div>

        <!-- Slot Content - Scrollable -->
        <div
          :class="`flex-1 ${
            overflowAllowed ? 'overflow-y-auto' : ''
          } p-2 sm:p-4 padding-none ${contentClasses}`"
        >
          <Loader :loading="loading" background="" height="60vh"></Loader>
          <!-- in case of Comments -->
          <div
            v-if="comments && comments.length > 0 && !loading"
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

          <!-- if no Comment -->
          <div
            v-if="comments && comments.length === 0"
            class="p-2 text-xl text-grey-600 font-bold h-full flex items-center justify-center"
          >
            No Comments Yet
          </div>
          <div
            v-if="+currentPage !== +pagination.last_page"
            ref="loadMoreIntersect"
            style="width: 5px; height: 5px"
          ></div>
          <div
            v-show="
              currentPage > 1 &&
              !loadingNextPage &&
              +currentPage === +pagination.last_page
            "
            class="text-center font-bold mt-4"
          >
            No More Comments to Load
          </div>
          <Loader
            classes="flex gap-2"
            :loading="loadingNextPage"
            circleClasses="small-circle"
            textClasses="small-text"
            background=""
            height="70px"
          ></Loader>
        </div>
        <!-- Dialog Footer -->
        <div
          :class="`flex ${
            !showCancel ? 'justify-end' : 'justify-between'
          } p-2 sm:p-3 shadow-lg  overflow-hidden  border-t-[1px] border-gray-400 min-h-[60px] sm:min-h-[70px]`"
          v-if="showFooter"
          ref="container"
        >
          <div
            class="flex gap-2 w-full items-start overflow-auto max-h-[165px]"
          >
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
      </div>
    </transition>
  </div>
</template>

<script setup>
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import Loader from "@/Components/Ratings/Loader.vue";

import { filterBadWords, somethingWentWrong } from "@/helpers/utilities";
import { Icon } from "@iconify/vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import Comment from "@/Components/PostFooter/Comment.vue";

import { useStore } from "vuex";

const props = defineProps({
  modelValue: {
    type: Array,
  },
  postId: {
    type: [Number, String],
  },
  pagination: {
    type: Object,
  },
  addedNumber: {
    type: Number,
  },
  dontAllowCancel: {
    type: Boolean,
    default: false,
  },
  contentClasses: {
    type: String,
    default: "",
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },

  overflowAllowed: {
    type: Boolean,
    default: true,
  },

  disableOutSideClick: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits([
  "unshiftIntoComments",
  "update:modelValue",
  "update:addedNumber",
  "submit",
  "closed",
  "opened",
]);

const store = useStore();
const commentList = ref(null);
const isVisible = ref(false);
const commentAreaRef = ref();
const container = ref();
const commentText = ref("");
const minHeight = ref(70);
const paddingHeight = ref(25);
const loadingSendComment = ref(false);
const comments = ref(props.modelValue ?? []);
const pagination = ref(props.pagination);
const currentPage = ref(1);
const perPage = ref(10);
const loadingNextPage = ref(false);
const loadMoreIntersect = ref();
const addedNumber = ref(props.addedNumber);
const loading = ref(false);

//Computed
const screenWidth = computed(() => store.getters.screenWidth);
const commentId = computed(() => store.state.profile.commentId);

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
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      console.log("here");
      comments.value = newVal;
    }
  }
);
watch(
  () => props.addedNumber,
  (newVal) => {
    if (newVal) {
      addedNumber.value = newVal;
    }
  }
);
watch(
  () => props.pagination,
  (newVal) => {
    if (newVal) {
      pagination.value = newVal;
    }
  }
);
watch(
  () => comments.value,
  (newValue) => {
    emit("update:modelValue", comments.value);
  }
);
watch(
  () => addedNumber.value,
  (newValue) => {
    emit("update:addedNumber", addedNumber.value);
  }
);
watch(
  () => commentId.value,
  async (newValue) => {
    if (newValue > 0) {
      currentPage.value = 1;
      loading.value = true;
      await fetchComments(perPage.value, currentPage.value, false, true);
      loading.value = false;
    }
  }
);
//Methods
const closeDialog = () => {
  isVisible.value = false;
};

const openDialog = async () => {
  isVisible.value = true;
  console.log("inOpen", comments.value);
  // await fetchComments(perPage.value, currentPage.value, false);
  if (comments.value.length > 0) {
    setTimeout(() => {
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("intersecting");
            loadMoreComments();
          }
        });
      };
      console.log("in");

      const observer = new IntersectionObserver(observerCallback, {
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
      });

      observer.observe(loadMoreIntersect.value);
    }, 100);
  }

  emit("opened");
};

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
      // comments.value.unshift(response.data);
      emit("unshiftIntoComments", response.data);
      nextTick(() => {
        commentList.value?.scrollIntoView({ behavior: "smooth" });
      });
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loadingSendComment.value = false;
  }
};
const loadMoreComments = async () => {
  loadingNextPage.value = true;
  currentPage.value = currentPage.value + 1;
  console.log("3");

  await fetchComments(perPage.value, currentPage.value);
  loadingNextPage.value = false;
};

const fetchComments = async (
  per_page = perPage.value,
  page = 1,
  append = true,
  noReviewsChanges = false
) => {
  try {
    console.log("fetchComments");
    const response = await axios.get(
      `/api/posts/${props.postId}/comments?per_page=${per_page}&page=${page}`,
      getAxiosConfig()
    );
    if (addedNumber.value > 0) {
      comments.value = [
        ...comments.value,
        ...response.data.comments.slice(addedNumber.value),
      ];
      addedNumber.value = 0;
    } else if (append) {
      comments.value = [...comments.value, ...response.data.comments];
    } else {
      if (!noReviewsChanges) {
        currentPage.value = 1;
        comments.value = [...response.data.comments];
      }
    }
    pagination.value = response.data.pagination;
  } catch (err) {
    somethingWentWrong();
  }
};

defineExpose({ openDialog, closeDialog });
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
