<!-- <script setup>
import PostShowTheImage from "@/Components/tCon/tConSub/PostShowTheImage.vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import { computed, ref } from "vue";
import StarRounded from "@/Components/Ratings/StarRounded.vue";
import DialogContractorRating from "@/Components/Ratings/Contractor/DialogContractorRating.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";

const myProps = defineProps({
  profile: {
    type: Object,
    required: true,
  },

  // Individual postToEnlarge from v-for posts (postings.vue)
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
const store = useStore();
const dialogRef = ref();

const screenWidth = computed(() => store.getters.screenWidth);
const imageArray = computed(() => {
  return myProps.postToEnlarge.image.split("|");
});
const openDialog = () => {
  dialogRef.value.openDialog();
};
const emit = defineEmits(["close-enlarged"]);
</script> -->
<script>
import PostShowTheImage from "@/Components/tCon/tConSub/PostShowTheImage.vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import StarRounded from "@/Components/Ratings/StarRounded.vue";
import DialogContractorRating from "@/Components/Ratings/Contractor/DialogContractorRating.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { Icon } from "@iconify/vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PostShowTheImage,
    tContractorWord,
    StarRounded,
    DialogContractorRating,
    Avatar,
    Icon,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
    postToEnlarge: {
      type: Object,
      required: true,
    },
    body1Colors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialogRef: null,
      showFullTextBody1: false,
      showFullTextBody2: false,
      truncatedLength: this.$store.state.screenWidth > 769 ? 400 : 260,
      truncatedLengthBody2: this.$store.state.screenWidth > 769 ? 300 : 200,
    };
  },
  computed: {
    ...mapGetters(["screenWidth"]),
    // imageArray() {
    //   return this.postToEnlarge.image.split("|");
    // },
    imageArray: {
      get: function () {
        if (
          this.postToEnlarge &&
          this.postToEnlarge.image &&
          this.postToEnlarge.image.length > 0
        ) {
          // split string into an array
          let videoArray = [];

          let newImageArray = this.postToEnlarge.image.split("|");
          return newImageArray;
        } else {
          return [];
        }
      },
    },
    processedBody2() {
      return this.processUrls(this.postToEnlarge.body2);
    },
    displayedBody1() {
      if (this.showFullTextBody1) {
        return this.processedBody1;
      } else {
        // Truncate the text after a certain length
        let truncated = this.postToEnlarge.body1.substring(
          0,
          this.truncatedLength
        );
        // Ensure it doesn't cut off in the middle of a word
        truncated = truncated.substring(0, truncated.lastIndexOf(" "));
        return this.processUrls(truncated);
      }
    },
    displayedBody2() {
      if (this.showFullTextBody2) {
        return this.processedBody2;
      } else {
        // Truncate the text after a certain length
        let truncated = this.postToEnlarge.body2.substring(
          0,
          this.truncatedLengthBody2
        );
        // Ensure it doesn't cut off in the middle of a word
        truncated = truncated.substring(0, truncated.lastIndexOf(" "));
        return this.processUrls(truncated);
      }
    },
    processedBody1() {
      return this.processUrls(this.postToEnlarge.body1);
    },
  },
  methods: {
    openDialog() {
      this.$refs.dialogRef.openDialog();
    },
    processUrls(body) {
      const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
      return body.replace(urlRegex, function (url) {
        let actualUrl = url.startsWith("http") ? url : "http://" + url;
        return `<a href="${actualUrl}" target="_blank">${url}</a>`;
      });
    },
    toggleText() {
      this.showFullTextBody1 = !this.showFullTextBody1;
    },
    toggleTextBody2() {
      this.showFullTextBody2 = !this.showFullTextBody2;
    },
    emit() {
      this.$emit("close-enlarged");
    },
  },
};
</script>

<template>
  <DialogContractorRating
    ref="dialogRef"
    :userId="profile.id"
    :contractorId="postToEnlarge.id"
  />
  <!-- Enlarged Post -->
  <div class="fixed z-40 inset-0 overflow-y-auto ease-out duration-400">
    <div class="relative flex items-start justify-center m-auto mt-0 mb-0 p-3">
      <div
        @click.stop="$emit('close-enlarged')"
        class="fixed inset-0 transition-opacity"
      >
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
        <div class="px-4">
          <!-- TOP ROW MENUS POST ACTIONS MENU -->
          <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          <div
            class="flex flex-row justify-between items-center w-full mb-2 mt-4"
          >
            <!-- User Avatar & User /// INDIVIDUAL POST: TOP POSTING ROW -->
            <div class="flex flex-row gap-2 justify-start items-center">
              <!-- Avatar -->
              <div
                @click="openDialog"
                class="cursor-pointer flex justify-start items-start flex-none w=16"
              >
                <!-- <Link :href="route('postToEnlarge.show')" class="block "> -->
                <div class="block">
                  <Avatar
                    :style="{
                      width: screenWidth >= 640 ? '4.5rem' : '3.7rem',
                      height: screenWidth >= 640 ? '4.5rem' : '3.7rem',
                    }"
                    :imageSrc="postToEnlarge.user_avatar"
                  />
                </div>
              </div>
              <!-- User Info -->
              <div class="flex flex-col justify-center ml-1">
                <h2
                  class="font-bold text-lg sm:text-xl"
                  style="line-height: 1.5rem"
                >
                  {{ postToEnlarge.id }}: {{ postToEnlarge.title }}
                </h2>
                <div class="">
                  {{ postToEnlarge.company_name }}
                </div>

                <div class="">
                  <h2 class="font-light text-sm overflow-hidden">
                    {{ postToEnlarge.city }} {{ postToEnlarge.state }}
                  </h2>
                </div>
              </div>
            </div>

            <!-- Ratings / postToEnlarge action menu / posting date -->
            <div
              class="flex flex-row justify-end items-center self-start flex-none w-28"
            >
              <!-- User RATINGS /// INDIVIDUAL POST: TOP POSTING ROW -->
              <div class="flex flex-row flex-none justify-end items-center">
                <!-- Premium Marking -->
                <div class="">
                  <img
                    src="/images/icons/pre-diamond.png"
                    width="20"
                    height="30"
                  />
                </div>
                <!-- ratings & how many -->
                <!-- <div class="flex flex-col justify-center items-center">
            <div class="">
              <img src="/images/icons/Stars4_icon.png" width="40" height="40" />
            </div>
            <div class="">
              <h2 class="font-light text-xs overflow-hidden tracking-tighter">
                5555
              </h2>
            </div>
          </div> -->
                <div class="flex flex-col justify-center items-center">
                  <StarRounded
                    @click="openDialog"
                    :starWidth="15"
                    class="h-4 cursor-pointer"
                    indicatorClasses="text-small h-4"
                    :starHeight="15"
                    :rating="
                      Number(
                        parseFloat(
                          postToEnlarge.average_rating
                            ? postToEnlarge.average_rating
                            : 0.0
                        ).toFixed(1)
                      )
                    "
                    :isIndicatorActive="false"
                  />

                  <div class="">
                    <h2
                      class="font-light text-xs overflow-hidden tracking-tighter"
                    >
                      {{ postToEnlarge.total_reviews }}
                    </h2>
                  </div>
                </div>
              </div>

              <!-- RIGHT SIDE --- POST ACTION MENU
                                    & time since posting -->
            </div>
            <!-- END Ratings / postToEnlarge action menu / posting date -->
          </div>
          <!-- End TOP POSTING ROW -->

          <!-- Text Body1 UPPER -->
          <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          <!-- <div
            v-show="postToEnlarge.body1"
            class="flex flex-row justify-center items-center w-full px-2 text-lg xs:text-xl md:text-2xl"
            :class="[
              body1Colors[postToEnlarge.body1ColorId],
              postToEnlarge.body1Bold ? 'font-bold' : 'font-normal',
            ]"
          >
            {{ postToEnlarge.body1 }}
          </div> -->

          <div class="">
            <span
              v-show="postToEnlarge.body1"
              v-html="displayedBody1"
              class="w-full processed-body inline"
            ></span>
            <span
              v-if="
                !showFullTextBody1 &&
                postToEnlarge.body1.length > truncatedLength
              "
              @click="toggleText"
              class="cursor-pointer text-sky-700"
            >
              ...more
            </span>
            <span
              v-if="
                showFullTextBody1 &&
                postToEnlarge.body1.length > truncatedLength
              "
              @click="toggleText"
              class="cursor-pointer text-sky-700"
            >
              ...less
            </span>
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
          <!-- <div
            class="flex flex-row justify-center items-center w-full px-2 mt-0 mb-0 text-base xs:text-lg md:text-xl font-normal text-gray-900"
          >
            {{ postToEnlarge.body2 }}
          </div> -->
          <div class="">
            <div
              v-show="postToEnlarge.body2"
              v-html="displayedBody2"
              class="processed-body inline justify-center items-center w-full mt-0 mb-0 text-base xs:text-lg md:text-xl font-normal text-gray-900"
            ></div>
            <span
              v-if="
                !showFullTextBody2 &&
                postToEnlarge.body2.length > truncatedLengthBody2
              "
              @click="toggleTextBody2"
              class="cursor-pointer text-sky-700"
            >
              ...more
            </span>
            <span
              v-if="
                showFullTextBody2 &&
                postToEnlarge.body2.length > truncatedLengthBody2
              "
              @click="toggleTextBody2"
              class="cursor-pointer text-sky-700"
            >
              ...less
            </span>
          </div>

          <!-- INDIVIDUAL POST: BOTTOM ROW MENU -->
          <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          <div class="flex flex-row justify-between items-center w-full mb-2">
            <!-- Likes -->
            <div class="">
              <Link
                href="#"
                class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/like_green.png"
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
                class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/comment_icon.png"
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
                class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/share_icon.png"
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
                class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/share_out_icon.png"
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
