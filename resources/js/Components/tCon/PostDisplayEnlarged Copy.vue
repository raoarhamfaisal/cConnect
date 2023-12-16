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
    textColors: {
      type: Array,
      required: true,
    },
    backgroundColors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialogRef: null,
      customBgColor: "",
      text_alignment: "left",
      text_color: "",
      lineHeight: 0,
      lineHeightBody2: 0,

      title_text_alignment: "",
      titleCustomBgColor: "left",
      title_text_color: "",
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
    textStyle() {
      return {
        fontSize: `${16 + +this.postToEnlarge.font_size}px`,
        lineHeight:
          +this.postToEnlarge.font_size > 3 &&
          +this.postToEnlarge.font_size < 10
            ? "1.7rem"
            : +this.postToEnlarge.font_size >= 10
            ? "2rem"
            : "inherit",
        display: "block",

        color: this.text_color,
      };
    },
    textStyleBody2() {
      return {
        overflow: "hidden",
        display: "block",
      };
    },
    titleTextStyle() {
      return {
        color: this.title_text_color,
      };
    },
    titleClass: function () {
      let className, className2;

      if (this.postToEnlarge.title_text_alignment) {
        this.title_text_alignment =
          this.postToEnlarge.title_text_alignment === "left"
            ? " text-left"
            : this.postToEnlarge.title_text_alignment === "center"
            ? " text-center"
            : " text-right";
      }
      if (this.postToEnlarge.title_text_color_id) {
        this.textColors.forEach((color) => {
          if (color.id === this.postToEnlarge.title_text_color_id) {
            this.title_text_color = color.color;
          }
        });
      }
      if (this.postToEnlarge.title_background_color_id) {
        this.backgroundColors.forEach((color) => {
          if (color.id === this.postToEnlarge.title_background_color_id) {
            this.titleCustomBgColor = color.color;
          }
        });
      }

      return className + " " + className2;
    },

    body1Class: function () {
      let className, className2;
      if (this.postToEnlarge.is_body_bold) {
        className = "font-bold";
      }
      if (this.postToEnlarge.text_alignment) {
        this.text_alignment =
          this.postToEnlarge.text_alignment === "left"
            ? " text-left"
            : this.postToEnlarge.text_alignment === "center"
            ? " text-center"
            : " text-right";
      }
      if (this.postToEnlarge.post_text_color_id) {
        this.textColors.forEach((color) => {
          if (color.id === this.postToEnlarge.post_text_color_id) {
            this.text_color = color.color;
          }
        });
      }
      if (this.postToEnlarge.post_background_color_id) {
        this.backgroundColors.forEach((color) => {
          if (color.id === this.postToEnlarge.post_background_color_id) {
            this.customBgColor = color.color;
          }
        });
      }
      return className + " " + className2;
    },

    displayedBody1() {
      let content = this.postToEnlarge.body1;
      if (content) {
        content = content.replace(/\/n/g, "<br>"); // Replace /n with <br>
      }

      return this.processUrls(content);
    },

    displayedBody2() {
      let content = this.postToEnlarge.body2;
      if (content) {
        content = content.replace(/\/n/g, "<br>"); // Replace /n with <br>
      }

      return this.processUrls(content);
    },
  },
  methods: {
    openDialog() {
      this.$refs.dialogRef.openDialog();
    },
    processUrls(body) {
      const urlRegex = /(https?:\/\/[^<\s]+|www\.[^<\s]+)/g;
      return body?.replace(urlRegex, function (url) {
        let actualUrl = url.startsWith("http") ? url : "http://" + url;
        return `<a @click.self.stop="()=>{}" href="${actualUrl}" target="_blank">${url}</a>`;
      });
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
        <div class="px-4 flex justify-start items-center flex-col">
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
                  {{ postToEnlarge.id }}:
                  {{ postToEnlarge.first_name + " " + postToEnlarge.last_name }}
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
          </div>
          <!-- END Ratings / postToEnlarge action menu / posting date -->
          <!-- End TOP POSTING ROW -->

          <div
            :class="`${title_text_alignment} ${
              titleCustomBgColor.startsWith('#')
                ? ' flex-col w-full items-center  px-2 py-2 rounded-md shadow-lg border-2'
                : 'w-full'
            } `"
            class="font-bold text-xl sm:text-2xl md:tex-3xl mb-1 mt-1"
            :style="{ backgroundColor: titleCustomBgColor }"
          >
            <span
              v-show="postToEnlarge.title"
              v-html="postToEnlarge.title"
              style="white-space: pre-wrap"
              :style="titleTextStyle"
              :class="`${titleClass} w-full processed-body inline`"
              ref="titleElement"
            ></span>
          </div>
          <div
            :class="`${text_alignment} ${
              customBgColor.startsWith('#')
                ? ' flex-col w-full items-center  px-2 py-[87px] rounded-md shadow-lg border-2'
                : 'w-full'
            } `"
            class=""
            :style="{ backgroundColor: customBgColor }"
          >
            <span
              v-show="postToEnlarge.body1"
              v-html="displayedBody1"
              style="white-space: pre-wrap"
              :style="textStyle"
              :class="`${body1Class} w-full processed-body inline`"
              ref="textElement"
            ></span>
          </div>

          <!-- INDIVIDUAL POST: MAIN IMAGES  -->
          <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          <div
            class="flex flex-row justify-center items-center w-full mb-1 mt-1"
          >
            <div v-if="imageArray.length > 0" class="w-full">
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

          <div :class="`'w-full'`" class="">
            <span
              v-show="postToEnlarge.body2"
              v-html="displayedBody2"
              style="white-space: pre-wrap"
              :style="textStyleBody2"
              :class="`w-full processed-body inline`"
              ref="textElementBody2"
            ></span>
          </div>
          <!-- footer icons counts -->
          <!-- INDIVIDUAL POST: BOTTOM ROW MENU -->
          <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          <div
            :class="`mb-2 ${
              postToEnlarge.body2 ? 'mt-3' : ''
            } border-[1px] w-1/3 border-gray-800 rounded`"
          ></div>

          <div class="pb-2 flex justify-between w-full">
            <div class="flex gap-2">
              <!-- Like -->
              <div
                class="flex gap-1 justify-center items-center cursor-pointer"
              >
                <!-- <div v-if="postToEnlarge.likes_count" class=""> -->
                <div
                  class="font-medium text-xs sm:text-sm text-blue-800 cursor-pointer"
                >
                  <div class="flex flex-row justify-between items-center">
                    <div class="">
                      <Icon
                        icon="emojione-monotone:up-arrow"
                        :class="`  text-[#16a34a]`"
                        width="25"
                      />
                    </div>
                  </div>
                </div>
                <div>{{ postToEnlarge.likes_count }}</div>
              </div>
              <!-- dislikes -->
              <div
                class="flex gap-1 justify-center items-center cursor-pointer"
              >
                <!-- <div v-if="postToEnlarge.likes_count" class=""> -->
                <div
                  class="font-medium text-xs sm:text-sm text-blue-800 cursor-pointer"
                >
                  <div class="flex flex-row justify-between items-center">
                    <div class="">
                      <Icon
                        icon="emojione-monotone:up-arrow"
                        :class="`  text-[#c40516]`"
                        width="25"
                        :rotate="2"
                      />
                    </div>
                  </div>
                </div>
                <div>{{ postToEnlarge.dislikes_count }}</div>
              </div>
            </div>
            <div class="text-gray-900 flex gap-1">
              <span class=""> 4 Comments </span>
              &#9679;
              <span class=""> {{ postToEnlarge.repost }} Re-posts </span>
            </div>
          </div>

          <div
            :class="`mb-2 border-[1px] w-full border-gray-300 rounded`"
          ></div>
          <div class="flex flex-row justify-between items-center w-full mb-2">
            <!-- Likes -->
            <div class="hovered">
              <div
                class="font-medium text-xs sm:text-sm text-blue-800 cursor-pointer"
              >
                <div class="flex flex-row justify-between items-center">
                  <div hoveredclass="">
                    <Icon
                      icon="emojione-monotone:up-arrow"
                      :class="`icon-like text-transparent stroke-[2px] stroke-green-600   `"
                      width="25"
                    />
                  </div>
                  <div class="pl-1 icon-text text-[#16a34a]">Like</div>
                </div>
              </div>
            </div>
            <!-- Dislike -->
            <div class="hovered">
              <a
                class="font-medium text-xs sm:text-sm text-blue-800 cursor-pointer"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <!-- <img src="/images/icons/like_green.png" width="25" height="25" /> -->
                    <!-- <Icon icon="emojione-monotone:up-arrow" :rotate="2" color="#c40516" width="25" /> -->
                    <Icon
                      icon="emojione-monotone:up-arrow"
                      :rotate="2"
                      :class="`icon-dislike text-transparent stroke-[2px] stroke-[#c40516] `"
                      width="25"
                    />
                  </div>
                  <div class="pl-1 icon-text text-[#c40516]">Dislike</div>
                </div>
              </a>
            </div>

            <!-- Comments -->
            <div class="hovered">
              <Link
                href="#"
                class="font-medium text-xs sm:text-sm text-blue-800"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/comment_icon.png"
                      width="25"
                      height="25"
                    />
                  </div>
                  <div class="pl-1 icon-text">Comment</div>
                </div>
              </Link>
            </div>

            <!-- Re-Posted -->
            <div class="hovered">
              <Link
                href="#"
                class="font-medium text-xs sm:text-sm text-blue-800"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/share_icon.png"
                      width="25"
                      height="25"
                    />
                  </div>
                  <div class="pl-1 icon-text">Re-post</div>
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
<style scoped>
.processed-body a {
  color: blue;
  text-decoration: none;
}

.processed-body a:hover {
  text-decoration: underline;
}

.hovered:hover .icon-text {
  text-decoration: underline;
}

.hovered:hover .icon-like {
  stroke-width: 0px;
  color: #16a34a;
}
.hovered:hover .icon-dislike {
  stroke-width: 0px;
  color: #c40516;
}
</style>
