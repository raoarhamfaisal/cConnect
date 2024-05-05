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
        class="bg-white md:w-2/3 w-full max-h-[90vh] max-md:max-h-full rounded-xl max-sm:rounded-none shadow-xl flex flex-col z-10"
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
            class="p-2 hover:bg-[#6741d9] rounded-full w-12"
          >
            X
          </button>
        </div>

        <!-- Slot Content - Scrollable -->
        <div
          :class="`flex-1 ${
            overflowAllowed ? 'overflow-y-auto' : ''
          } p-2 sm:p-4 padding-none ${contentClasses}`"
        >  <div
        v-if="allComments&& allComments.length === 0"
        class="p-2 text-xl text-grey-600 font-bold h-screen flex items-center justify-center"
      >
        No Comments Yet
      </div></div>

        <div
          :class="`flex ${!showCancel ? 'justify-end' : 'justify-between'} p-2 sm:p-3 shadow-lg  overflow-hidden  border-t-[1px] border-gray-400 min-h-[60px] sm:min-h-[70px]`"
          v-if="showFooter"
          ref="container"
        >
          <div class="flex gap-2 w-full items-start  overflow-auto max-h-[165px]">
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
              @click="onSendComment"
             
              class="w-8 h-8 sx:w-10 sx:h-10 cursor-pointer text-gray-400 apply-stroke"
              icon="lucide:send-horizontal"
              
            />
          </div>
          

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  allComments: {
    type: Array,
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
const emit = defineEmits(["submit", "closed", "opened"]);

const store = useStore();
const isVisible = ref(false);
const commentAreaRef = ref();
const container = ref();
const commentText = ref("");
const minHeight = ref(70);
const paddingHeight =ref(25);


//Computed
const screenWidth = computed(() => store.getters.screenWidth);

onMounted(()=>{
    if(screenWidth.value >640){
        minHeight.value = 70
        paddingHeight.value =25
    }else{
        minHeight.value = 60
        paddingHeight.value =17

    } 
})
watch(()=>screenWidth,(newVal)=>{
    console.log('here')
    if(newVal >640){
        minHeight.value = 70
        paddingHeight.value =25
    }else{
        minHeight.value = 60
        paddingHeight.value =17

    }
   

})

//Methods
const closeDialog = () => {
  isVisible.value = false;
};

const openDialog = () => {
  isVisible.value = true;
  emit("opened");
};

const adjustHeight = () => {
  nextTick(() => {
    commentAreaRef.value.style.height = "auto"; // Reset height first to get the correct scrollHeight
    console.log(commentAreaRef.value.style,commentAreaRef.value.scrollHeight,commentAreaRef.value.clientHeight,'styles')
    commentAreaRef.value.style.height =
      commentAreaRef.value.scrollHeight + "px" ;
      if(commentAreaRef.value.scrollHeight< 165 && commentAreaRef.value.scrollHeight +paddingHeight.value >minHeight.value){
          container.value.style.minHeight = commentAreaRef.value.scrollHeight + paddingHeight.value + "px" ;
      }else if(commentAreaRef.value.scrollHeight +paddingHeight.value < minHeight.value){
        container.value.style.minHeight = minHeight.value + "px"
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
      commentText.value.substring(0, start) + "      " + commentText.value.substring(end);

    // Put caret at right position again
    nextTick(() => {
      event.target.selectionStart = event.target.selectionEnd = start + 60;
    });
  }
};

defineExpose({ openDialog, closeDialog });
</script>

<style >
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


.apply-stroke path{
    stroke-width:2px;
}


</style>
