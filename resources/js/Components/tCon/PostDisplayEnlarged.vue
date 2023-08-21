<script setup>
import PostShowTheImage from "@/Components/tCon/tConSub/PostShowTheImage.vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const myProps = defineProps({
  profile: {
    type: Object,
    required: true,
  },

  // Individual post from v-for posts (postings.vue)
  postToEnlarge: {
    type: Object,
    required: true,
  },

  // array of colors for top body text (postings.vue)
  body1Colors: {
    type: Array,
    required: true,
  },
});

const imageArray = computed(() => {
  return myProps.postToEnlarge.image.split("|");
});

const emit = defineEmits(["close-enlarged"]);
</script>

<template>
  <!-- Enlarged Post -->
  <div class="fixed z-40 inset-0 overflow-y-auto ease-out duration-400">
    <div class="relative flex items-start justify-center m-auto mt-0 mb-0 p-3">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 m-0 bg-slate-200 opacity-80"></div>
      </div>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all w-full mx-0 my-0 md:max-w-4xl overflow-y-scroll"
        role="dialog"
      >
        <!-- TOP BACK TO NEWS FEED -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div
          class="bg-slate-200 px-2 mb-2 p-0 border-b-2 border-b-gray-400 w-full"
        >
          <button class="w-full" @click="$emit('close-enlarged')">
            <div
              class="flex flex-row items-center justify-between w-full pt-1 pb-1"
            >
              <div class="flex items-center justify-start gap-2">
                <Icon
                  icon="ph:arrow-fat-left-duotone"
                  color="#232069"
                  height="35"
                />
                <span class="text-lg font-bold"> News Feed...</span>
              </div>
              <!-- LOGO -->
              <div class="text-lg font-bold tracking-wide text-center">
                <tContractorWord />
              </div>
            </div>
          </button>
        </div>

        <!-- TOP ROW MENUS POST ACTIONS MENU -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div class="flex flex-row justify-between items-center w-full mb-2">
          <!-- User Avatar & User /// INDIVIDUAL POST: TOP POSTING ROW -->
          <div class="flex flex-row justify-start items-center">
            <!-- Avatar -->
            <div class="flex justify-start items-start flex-none mt-2 w=16">
              <!-- <Link :href="route('post.show')" class="block "> -->
              <div class="block">
                <img
                  class="object-cover w-14 h-14 mx-2 rounded-full"
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="avatar"
                />
              </div>
            </div>
            <!-- User Info -->
            <div class="flex flex-wrap ml-1">
              <h2 class="font-bold text-xl xs:text-2xl md:text-3xl">
                {{ postToEnlarge.id }}: {{ postToEnlarge.title }}
              </h2>
            </div>
          </div>

          <!-- Ratings / post action menu / posting date -->
          <div class="flex flex-row justify-end items-center flex-none w-28">
            <!-- User RATINGS /// INDIVIDUAL POST: TOP POSTING ROW -->
            <div class="flex flex-row flex-none justify-end items-center px-2">
              <!-- Premium Marking -->
              <div class="">
                <img
                  src="images/icons/pre-diamond.png"
                  width="20"
                  height="30"
                />
              </div>
              <!-- ratings & how many -->
              <div class="flex flex-col justify-center items-center">
                <div class="">
                  <img
                    src="images/icons/Stars4_icon.png"
                    width="40"
                    height="40"
                  />
                </div>
                <div class="">
                  <h2
                    class="font-light text-xs overflow-hidden tracking-tighter"
                  >
                    5555
                  </h2>
                </div>
              </div>
            </div>

            <!-- RIGHT SIDE --- POST ACTION MENU
                                    & time since posting -->
            <div
              class="flex flex-col flex-initial flex-nowrap justify-center items-center mr-3"
            ></div>
          </div>
          <!-- END Ratings / post action menu / posting date -->
        </div>
        <!-- End TOP POSTING ROW -->

        <!-- Text Body1 UPPER -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div
          v-show="postToEnlarge.body1"
          class="flex flex-row justify-center items-center w-full px-2 text-lg xs:text-xl md:text-2xl dark:text-gray-300"
          :class="[
            body1Colors[postToEnlarge.body1ColorId],
            postToEnlarge.body1Bold ? 'font-bold' : 'font-normal',
          ]"
        >
          {{ postToEnlarge.body1 }}
        </div>

        <!-- INDIVIDUAL POST: MAIN IMAGES  -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div class="flex flex-row justify-center items-center w-full mb-1">
          <div v-if="imageArray.length > 0">
            <div v-for="image in imageArray" :key="image.id" class="pb-2">
              <PostShowTheImage
                :image="image"
                :numberOfImages="1"
                :cropImage="false"
                :plusImages="false"
              >
              </PostShowTheImage>
            </div>
          </div>
        </div>

        <!-- Text Body2 LOWER -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div
          class="flex flex-row justify-center items-center w-full px-2 mt-0 mb-0 text-base xs:text-lg md:text-xl font-normal text-gray-900 dark:text-gray-300"
        >
          {{ postToEnlarge.body2 }}
        </div>

        <!-- INDIVIDUAL POST: BOTTOM ROW MENU -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div class="flex flex-row justify-between items-center w-full mb-2">
          <!-- Likes -->
          <div class="">
            <Link
              href="#"
              class="font-medium text-xs sm:text-sm text-blue-800 dark:text-blue-400 hover:underline"
            >
              <div class="flex flex-row justify-between items-center">
                <div class="">
                  <img
                    src="images/icons/like_green.png"
                    width="25"
                    height="25"
                  />
                </div>
                <div class="pl-1">
                  {{ postToEnlarge.likes }}
                </div>
              </div>
            </Link>
          </div>

          <!-- Comments -->
          <div class="">
            <Link
              href="#"
              class="font-medium text-xs sm:text-sm text-blue-800 dark:text-blue-400 hover:underline"
            >
              <div class="flex flex-row justify-between items-center">
                <div class="">
                  <img
                    src="images/icons/comment_icon.png"
                    width="25"
                    height="25"
                  />
                </div>
                <div class="pl-1">12,999</div>
              </div>
            </Link>
          </div>

          <!-- Re-Posted -->
          <div class="">
            <Link
              href="#"
              class="font-medium text-xs sm:text-sm text-blue-800 dark:text-blue-400 hover:underline"
            >
              <div class="flex flex-row justify-between items-center">
                <div class="">
                  <img
                    src="images/icons/share_icon.png"
                    width="25"
                    height="25"
                  />
                </div>
                <div class="pl-1">
                  {{ postToEnlarge.repost }}
                </div>
              </div>
            </Link>
          </div>

          <!-- Shares -->
          <div class="">
            <Link
              href="#"
              class="font-medium text-xs sm:text-sm text-blue-800 dark:text-blue-400 hover:underline"
            >
              <div class="flex flex-row justify-between items-center">
                <div class="">
                  <img
                    src="images/icons/share_out_icon.png"
                    width="20"
                    height="17"
                  />
                </div>
                <div class="pl-1">
                  {{ postToEnlarge.shares }}
                </div>
              </div>
            </Link>
          </div>
        </div>

        <!-- TOP BACK TO NEWS FEED -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div
          class="bg-slate-200 px-2 mb-2 p-0 border-b-2 border-b-gray-400 w-full"
        >
          <button class="w-full" @click="$emit('close-enlarged')">
            <div
              class="flex flex-row items-center justify-between w-full pt-1 pb-1"
            >
              <div class="flex items-center justify-start gap-2">
                <Icon
                  icon="ph:arrow-fat-left-duotone"
                  color="#232069"
                  height="35"
                />
                <span class="text-lg font-bold"> News Feed...</span>
              </div>
              <!-- LOGO -->
              <div class="text-lg font-bold tracking-wide text-center">
                <tContractorWord />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
