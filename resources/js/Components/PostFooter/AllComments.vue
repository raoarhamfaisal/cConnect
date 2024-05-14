<template>
  <transition name="fade">
    <div class="mb-2">
      <Loader
        :loading="loading || loadingComments"
        background=""
        height="60vh"
      ></Loader>
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
      <!-- <div
        v-if="comments && comments.length === 0"
        class="p-2 text-xl text-grey-600 font-bold h-full flex items-center justify-center"
      >
        No Comments Yet
      </div> -->
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
  </transition>
</template>

<script setup>
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import Loader from "@/Components/Ratings/Loader.vue";

import { somethingWentWrong } from "@/helpers/utilities";
import { computed, onMounted, ref, watch } from "vue";
import Comment from "@/Components/PostFooter/Comment.vue";

import { useStore } from "vuex";

const props = defineProps({
  modelValue: {
    type: Array,
  },
  addedNumber: {
    type: Number,
  },
  postId: {
    type: [Number, String],
  },
  added: {
    default: false,
    type: Boolean,
  },
  loadingComments: {
    default: false,
    type: Boolean,
  },
  pagination: {
    type: Object,
  },
});
const emit = defineEmits(["update:modelValue", "update:addedNumber"]);

const store = useStore();
const commentList = ref(null);

const comments = ref(props.modelValue ?? []);
const pagination = ref(props.pagination);
const currentPage = ref(1);
const perPage = ref(10);
const loadingNextPage = ref(false);
const loadMoreIntersect = ref();
const addedNumber = ref(props.addedNumber);
const loading = ref(false);

//Computed
const commentId = computed(() => store.state.profile.commentId);

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
    console.log(newValue, "newComments after deletion");
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
    console.log("commentId when deleted", newValue);
    if (newValue > 0) {
      currentPage.value = 1;
      loading.value = true;
      await fetchComments(perPage.value, currentPage.value, false, true);
      loading.value = false;
    }
  }
);
watch(
  () => props.added,
  (newVal) => {
    if (newVal) {
      commentList.value?.scrollIntoView({ behavior: "smooth" });
    }
  }
);
//Methods

onMounted(async () => {
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
});

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
    console.log("fetchComments2");

    if (addedNumber.value > 0) {
      console.log("in 1st", response.data.comments);
      comments.value = [
        ...comments.value,
        ...response.data.comments.slice(addedNumber.value),
      ];
      addedNumber.value = 0;
    } else if (append) {
      console.log("in 2nd", response.data.comments);

      comments.value = [...comments.value, ...response.data.comments];
    } else {
      if (!noReviewsChanges) {
        currentPage.value = 1;
        console.log("reponse comments", response.data.comments);
        comments.value = [...response.data.comments];
        console.log("reponse comments", comments.value);
      }
    }
    pagination.value = response.data.pagination;
  } catch (err) {
    somethingWentWrong();
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
