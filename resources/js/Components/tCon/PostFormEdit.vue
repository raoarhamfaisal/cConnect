<script>
import axios from "axios";
import VueFilePond from "vue-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import InputLabel from "@/Components/InputLabel.vue";
import MultiSelect from "@/Components/MultiSelect.vue";
import InputError from "@/Components/InputError.vue";
import { Icon } from "@iconify/vue";

import TextEditorTopTextEdit from "@/Components/TextEditorTopTextEdit.vue";
import TextEditorTitleEdit from "@/Components/TextEditorTitleEdit.vue";
import SelectProfile from "@/Components/SelectProfile.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import TradesWithDialog from "@/Components/TradesWithDialog.vue";
import Badge from "@/Components/Ratings/Badge.vue";
// import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import Loader from "@/Components/Ratings/Loader.vue";

// additional required plugins
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// {{translations. && translations..note}}: Need both plugins image transform & resize for resize options to work

// import filepond css
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
import { mapGetters } from "vuex";
import { nextTick, ref } from "vue";
import { options } from "@/helpers/selectListsHelpters.js";
import {
  getAxiosConfig,
  getAxiosConfigFormData,
} from "@/helpers/axiosConfigHelpers";
import { POSTS_IMAGES_FULL_PATH } from "@/config/constants";
import { somethingWentWrong } from "@/helpers/utilities";

const FilePond = VueFilePond(
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageTransform,
  FilePondPluginImageResize,
  FilePondPluginFilePoster,
  FilePondPluginFileValidateSize
);

export default {
  components: {
    FilePond,
    Loader,
    TradesWithDialog,
    InputLabel,

    // DecoupledEditor,
    InputError,
    TextEditorTopTextEdit,
    TextEditorTitleEdit,
    SelectProfile,
    CustomDialog,
    Icon,
    Badge,
    MultiSelect,
  },

  props: ["form", "isOpen", "id", "success", "imageArray", "loadingUpdate"],

  data() {
    return {
      // the image array parameter
      myFiles: ref([]),
      options: options,
      playVideo: false,
      previousImages: this.imageArray,
      isUploading: false,
      referenceList: ref([]),
      selectedReferal: ref(""),
      original: "",
      selectedItems: null,
      selectAll: false,
      isModalOpened: this.isOpen,
      postTrades: [],
      loadingPostTrades: false,
      tradesPost: {
        trade1: false,
        trade2: false,
        trade3: false,
        trade4: false,
        trade5: false,
        trade6: false,
        trade7: false,
        trade8: false,
        trade9: false,
        trade10: false,
        trade11: false,
        trade12: false,
        trade13: false,
        trade14: false,
        trade15: false,
        trade16: false,
        trade17: false,
        trade18: false,
        trade19: false,
        trade20: false,
        trade21: false,
        trade22: false,
        trade23: false,
        trade24: false,
        trade25: false,
        trade26: true,
        trade27: true,
        trade28: true,
        trade29: true,
        trade30: true,
      },

      // csrfToken: document.querySelector('meta[name="csrf-token"]').content
    };
  },
  async mounted() {
    this.$refs.pond.removeFiles();
    this.myFiles = [];
    this.form.image = "";

    await this.fetchPostTrades();
    this.$store.dispatch("ratings/getRegions");
    // this.$store.dispatch("ratings/getTrades", this.id);
  },
  computed: {
    ...mapGetters("ratings", ["regions", "loading", "trades"]),
    ...mapGetters(["translations", "userVersion"]),
    maxImages() {
      if (this.userVersion === 1) {
        return 3 - this.previousImages.length;
      } else if (this.userVersion === 2) {
        return 15 - this.previousImages.length;
      } else if (this.userVersion === 3) {
        return 20 - this.previousImages.length;
      }
    },
    maxImageForErrorMsg() {
      if (this.userVersion === 1) {
        return 3;
      } else if (this.userVersion === 2) {
        return 15;
      } else if (this.userVersion === 3) {
        return 20;
      }
    },
    upgradeImageText() {
      if (this.userVersion === 1) {
        return (
          this.translations &&
          this.translations.upgrade_to_gold_version_for_15_images
        );
      } else if (this.userVersion === 2) {
        return (
          this.translations &&
          this.translations.upgrade_to_platinum_version_for_20_images
        );
      } else if (this.userVersion === 3) {
        return "";
      }
    },
  },
  emits: ["formsave", "formclose"],
  watch: {
    isModalOpened(newVal) {
      console.log(newVal, "isOpen is called", this.myFiles);
      if (newVal) {
        this.myFiles = [];
      }
    },
    regions(newValue) {
      if (newValue.length > 0) {
        this.referenceList = this.regions.map((item) => item.name);
        const selectedObj = this.regions.find(
          (item) => item.id === +this.form.region_id
        );
        const selectedName = selectedObj ? selectedObj.name : undefined;

        this.selectedReferal = selectedName;
      }
    },

    success(newVal) {
      if (newVal) {
        // this.form.title = "";
        // this.form.body1 = "";
        // this.form.body2 = "";
        // this.form.post_text_color_id = null;
        // this.form.title_text_color_id = null;

        // this.form.post_background_color_id = null;
        // this.form.title_background_color_id = null;
        // this.form.is_body_bold = false;
        // this.form.font_size = "0";
        // this.form.text_alignment = "left";
        // this.form.title_text_alignment = "left";
        this.myFiles = [];
        // this.form.image = "";
        // this.$store.dispatch("ratings/getTrades", this.id);
      }
    },
    tradesPost: {
      handler(newVal) {
        this.postTrades = Object.entries(newVal)
          .filter(([key, value]) => value)
          .map(([key]) => parseInt(key.replace(/^trade/, ""), 10));
      },
      deep: true,
    },
    selectedItems(newVal) {
      this.form.trades = this.selectedItems
        .map((item) => {
          const match = item.id.match(/\d+$/);
          return match ? parseInt(match[0], 10) : null;
        })
        .filter(Number.isInteger);
    },
  },
  methods: {
    onWarning(error) {
      console.log(error);
      if (error.body === "Max files") {
        somethingWentWrong(
          `${this.translations.maximum_images_cannot_exceed} ${this.maxImageForErrorMsg}`,
          "inherit"
        );
      }
    },
    toggleSwitch(field) {
      // Check if userVersion is 0 and if any 8 trades are set to 1
      if (this.userVersion === 1 && !this.tradesPost[field]) {
        // Count how many trades are set to 1
        const numberOfTradesSetToOne = Object.values(this.tradesPost).reduce(
          (count, value) => count + (value ? true : false),
          0
        );

        // Check if 8 or more trades are set to 1
        if (numberOfTradesSetToOne >= 8) {
          this.$store.commit("setIsUpgradeToGoldPlatinumDialogOpen", true);
          return; // Return early to stop further execution
        }
      }

      if (field === "trade1") {
        const newState = !this.tradesPost["trade1"];
        if (this.userVersion !== 1) {
          for (let i = 1; i <= 24; i++) {
            this.tradesPost["trade" + i] = newState;
          }
        } else {
          // for free version
          this.tradesPost["trade" + 1] = newState;
        }
      } else {
        this.tradesPost[field] = !this.tradesPost[field];
      }

      if (allSelected) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    insertTabBody2(event) {
      if (event.key === "Tab") {
        event.preventDefault();
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        if (this.form.body2 === null) {
          this.form.body2 = "";
        }
        // Set the value to: text before caret + four spaces + text after caret
        this.form.body2 =
          this.form.body2.substring(0, start) +
          "      " +
          this.form.body2.substring(end);

        // Put caret at right position again
      }
      nextTick(() => {
        event.target.selectionStart = event.target.selectionEnd = start + 6;
      });
    },

    handleFilePondProcessStart(file) {
      // this.showBackroundColor = false;
      this.isUploading = true;
    },
    async handleFileReorder() {
      let imagesArray = this.form.image.split("|");
      let filePondFiles = this.$refs.pond.getFiles(); // Get actual File objects from FilePond

      let formData = new FormData();
      imagesArray.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      filePondFiles.forEach((fileItem, index) => {
        if (fileItem.file) {
          // Check if the file object exists
          formData.append(`imageFiles[${index}]`, fileItem.file);
        }
      });

      axios
        .post("/api/re-order", formData, getAxiosConfigFormData())
        .then((response) => {
          this.form.image = this.reverseAndJoinString(response.data);
        })
        .catch((error) => {
          console.error("Error uploading images", error);
        });
    },
    async checkAllFilesProcessed() {
      const allProcessed = this.$refs.pond.getFiles().every((file) => {
        return file.status === 5;
      });

      if (allProcessed) {
        await this.handleFileReorder();
      }

      this.isUploading = false;
    },
    sortFiles(a, b) {
      // If no file data yet, treat as equal
      if (!(a.file && b.file)) return 0;

      // Move to right location in list
      if (a.fileSize < b.fileSize) {
        return -1;
      } else if (a.fileSize > b.fileSize) {
        return 1;
      }

      return 0;
    },
    handleFilePondProcessEnd(file, error) {},
    handleFilePondError(error) {
      this.isUploading = false;
      // this.showBackroundColor = true;
    },

    // called when plugin is initialized
    handleFilePondInit() {
      this.myFiles = [];
      // Create the array of images using seperator |

      let arr = this.form.image ? this.form.image.split("|") : [];
      // loop through array and display each image
      for (let i = 0; i < arr.length; i++) {
        // Adding image object to myFiles arrray
        if (arr[i].startsWith("uploads/posts")) {
          console.log("here in the init", arr[i]);
          this.myFiles.push({
            source: "/" + arr[i],
            options: {
              type: "local",
              metadata: {
                poster: "/" + arr[i],
              },
            },
          });
        }
      }
    },
    reverseAndJoinString(inputString) {
      // Split the string into an array
      let arr = inputString.split("|");

      // Reverse the array

      arr = arr.reverse();
      // Join the array back into a string
      return arr.join("|");
    },

    addFormImage(image) {
      let arr = this.form.image ? this.form.image.split("|") : [];
      arr.push(image);
      this.form.image = arr.join("|");
      this.original = arr.join("|");
    },

    removeFormImage(image) {
      let arr = this.form.image ? this.form.image.split("|") : [];
      arr.remove(image);

      this.form.image = arr.join("|");
    },

    handleFilePondLoad(response) {
      this.addFormImage(response);

      return response;
    },

    // Remove Images
    handleFilePondRemove(source, load, error) {
      this.removeFormImage(source.replace(/^\//, ""));

      load();
    },

    handleFilePondRevert(uniqueId, load, error) {
      this.removeFormImage(uniqueId);
      axios.post("/upload-post-revert", {
        image: uniqueId,
      });
      load();
    },
    async handleFilePondRevertedEnd() {
      this.isUploading = true;
      await this.handleFileReorder();
      this.isUploading = false;
    },
    openDialog() {
      this.$refs.tradeDialogRef.openDialog();
    },
    handleSubmit() {
      this.$refs.tradeDialogRef.closeDialog();
    },
    updateFiles(files) {
      // let myFiles = files.map((fileItem) => fileItem.file);
    },
    selectAllTrades() {
      if (this.selectAll) {
        this.selectAll = !this.selectAll;

        for (let key in this.tradesPost) {
          this.tradesPost[key] = 0;
        }
      } else {
        this.selectAll = !this.selectAll;

        for (let key in this.tradesPost) {
          this.tradesPost[key] = 1;
        }
      }
    },
    image_path(img) {
      // function adds the filepath
      return POSTS_IMAGES_FULL_PATH + img;
    },
    isVideo(img) {
      // determine if video
      let extension = img.split(".").pop();
      if ((extension == "mp4") | (extension == "mov")) {
        this.playVideo = true;
      } else {
        this.playVideo = false;
      }
      return this.playVideo;
    },
    removeImage(index) {
      this.previousImages.splice(index, 1);
    },
    onUpdate() {
      let previousImages;
      previousImages = this.previousImages.join("|");
      this.form.image = this.form.image
        ? this.reverseAndJoinString(this.form.image)
        : this.form.image;

      if (this.form.image && previousImages) {
        this.form.image = previousImages + "|" + this.form.image;
      } else if (!this.form.image && previousImages) {
        this.form.image = previousImages;
      }
      this.form.trades = this.postTrades;
      let formData = { ...this.form };
      this.$emit("formsave", formData);
    },
    reverseAndJoinString(inputString) {
      // Split the string into an array
      let arr = inputString.split("|");

      // Reverse the array

      arr = arr.reverse();
      // Join the array back into a string
      return arr.join("|");
    },
    async fetchPostTrades() {
      this.loadingPostTrades = true;

      try {
        const response = await axios.get(
          `/api/posts/${this.form.id}/trades`,
          getAxiosConfig()
        );
        if (response.data) {
          this.postTrades = response.data.trade_ids;

          this.postTrades.forEach((postTradeNum) => {
            this.tradesPost[`trade${postTradeNum}`] = true;
          });

          const allSelected = Object.values(this.tradesPost).every(
            (value) => value === 1 || value === true
          );
          if (allSelected) {
            this.selectAll = true;
          }
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        this.loadingPostTrades = false;
      }
    },
  },
};

// the remove method is not implemented in native JS
// so we are adding it here
Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
</script>

<template>
  <CustomDialog
    :submitText="translations && translations.okay"
    :shouldFetchPost="false"
    @submit="handleSubmit"
    :showCancel="false"
    ref="tradeDialogRef"
    :title="translations && translations.edit_trade_groups"
  >
    <div class="w-full">
      <span class="mt-1 text-base">
        <strong>{{ translations && translations.hint }}</strong>
        {{ translations && translations.select_the_trade_groups_for_your_post }}
      </span>
    </div>
    <div class="mb-4 sm:mb-0 mt-4">
      <div class="flex items-center gap-4 mt-4 mb-5" v-if="userVersion !== 1">
        <div class="switch-trades" @click="selectAllTrades">
          <div
            :class="[
              selectAll ? 'switch-bg-on-trades' : 'switch-bg-off-trades',
            ]"
          >
            <div
              :class="[
                selectAll ? 'switch-knob-on-trades' : 'switch-knob-off-trades',
              ]"
            ></div>
          </div>
        </div>
        <label for="select_all" class="mr-4 text-gray-800 font-bold">{{
          translations && translations.select_all
        }}</label>
      </div>
      <div class="grid mt-8 gap-3">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="flex items-center justify-between sm:w-96 sm:ml-3 mb-5"
        >
          <label :for="option.id" class="mr-4 max-sm:text-sm font-bold">{{
            option.name
          }}</label>
          <div class="switch" @click="toggleSwitch(option.id)">
            <div
              :class="[
                tradesPost[option.id] ? 'switch-bg-on' : 'switch-bg-off',
              ]"
            >
              <div
                :class="[
                  tradesPost[option.id] ? 'switch-knob-on' : 'switch-knob-off',
                ]"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <InputError class="mt-2" :message="$page.props.errors.trades" />
    </div>
  </CustomDialog>

  <div
    class="fixed z-40 inset-0 overflow-y-auto ease-out duration-400 overscroll-contain"
  >
    <div
      v-if="isOpen"
      class="flex items-start justify-start min-h-screen mt-5 pt-4 px-1 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" @click="$emit('formclose')">
        <div class="absolute inset-0 bg-gray-500 opacity-70"></div>
      </div>

      <!-- This element is to trick the browser into
                 centering the modal contents. -->
      <!-- <span class="hidden sm:inline-block
                         sm:align-middle sm:h-screen">
            </span>​ -->

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full mx-2 sm:my-8 sm:align-middle sm:w-full md:max-w-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <form>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6">
            <Loader
              :loading="loading || loadingPostTrades"
              background=""
              height="30vh"
            ></Loader>

            <div v-if="!loading && !loadingPostTrades" class="">
              <!-- POST TITLE -->
              <div
                class="flex justify-start items-center pb-2 space-x-2 text-blue-rgba font-bold text-xl md:text-3xl"
              >
                <img src="/images/icons/post_b.png" width="25" height="25" />
                <p class="">{{ translations && translations.edit_post }}</p>
              </div>

              <!-- TITLE TEXT -->
              <div class="mb-2" v-if="userVersion !== 1">
                <label
                  for="formPostTitle"
                  class="block text-gray-700 text-sm font-bold mb-1"
                  >{{ translations && translations.post_title_max_35char }}
                </label>
                <TextEditorTitleEdit
                  v-model:modelValue="form.title"
                  v-model:textColorId="form.title_text_color_id"
                  v-model:backgroundColorId="form.title_background_color_id"
                  v-model:textAlignment="form.title_text_alignment"
                />
                <div v-if="$page.props.errors.title" class="text-red-500">
                  {{ $page.props.errors.title }}
                </div>
              </div>

              <!-- TOP TEXT -->
              <div class="mb-2 closing">
                <label
                  for="formPostbody1"
                  class="block text-gray-700 text-sm font-bold mb-1"
                  >{{ translations && translations.top_text_required }}
                </label>

                <TextEditorTopTextEdit
                  v-model:modelValue="form.body1"
                  v-model:fontSize="form.font_size"
                  v-model:textColorId="form.post_text_color_id"
                  v-model:backgroundColorId="form.post_background_color_id"
                  v-model:isBold="form.is_body_bold"
                  v-model:textAlignment="form.text_alignment"
                />
                <!-- :shouldShowBackground="showBackroundColor" -->
                <div v-if="$page.props.errors.body1" class="text-red-500">
                  {{ $page.props.errors.body1 }}
                </div>
              </div>

              <!-- IMAGE UPLOAD -->
              <div class="mb-4">
                <label
                  for="formPostImage"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >{{ translations && translations.image }} ({{
                    translations && translations.max
                  }}
                  {{ maxImages }})
                  <span class="italic lowercase font-normal text-xs">
                    {{ upgradeImageText }}:
                  </span>
                </label>
                <div
                  class="w-full flex flex-col gap-2 mb-2"
                  v-if="previousImages && previousImages.length > 0"
                >
                  <transition-group
                    name="comment-transition"
                    tag="div"
                    class="flex flex-col gap-1 sm:gap-2"
                  >
                    <div
                      v-for="(image, index) in previousImages"
                      :key="index"
                      class="relative"
                    >
                      <Icon
                        icon="charm:circle-cross"
                        width="25"
                        class="absolute top-0 right-0 m-2 cursor-pointer text-white rounded-full ctive:scale-95 hover:bg-white hover:text-inherit transition transform duration-300"
                        @click="removeImage(index)"
                      />
                      <video
                        v-if="isVideo(image)"
                        class="w-full h-full rounded-lg object-cover"
                        controls
                        autoplay
                        loop
                        muted
                      >
                        <source :src="image_path(image)" type="video/mp4" />
                      </video>
                      <div class="bg-[#222] p-2 rounded-md" v-else-if="image">
                        <img
                          ref="imageRef"
                          :class="`w-full object-contain object-center rounded-lg`"
                          :style="{ maxHeight: 256 + 'px' }"
                          :src="image_path(image)"
                          alt=""
                        />
                      </div>
                    </div>
                  </transition-group>
                </div>

                <!-- :maxFiles="
                    15 - previousImages && previousImages.length > 0
                      ? previousImages.length
                      : 0
                  " -->
                <file-pond
                  name="imageFilepond"
                  ref="pond"
                  allowImageExifOrientation="true"
                  v-bind:allow-multiple="true"
                  accepted-file-types="image/png,
                                            image/jpeg,
                                            image/gif,
                                            image/bmp,
                                            image/svg,
                                            video/mp4,
                                            video/mov"
                  allowFileSizeValidation="true"
                  item-insert-location="before"
                  :allow-reorder="true"
                  maxFileSize="25MB"
                  labelMaxTotalFileSizeExceeded="Maximum Size Is 25MB"
                  allowImageResize="true"
                  imageResizeMode="contain"
                  imageResizeTargetWidth="1000"
                  imageResizeTargetHeight="2000"
                  imageResizeUpscale="true"
                  :maxFiles="maxImages"
                  credits="false"
                  v-bind:server="{
                    url: '',
                    timeout: 7000,
                    process: {
                      url: '/upload-post',
                      method: 'POST',
                      headers: {
                        'X-CSRF-TOKEN': $page.props.csrf_token,
                      },
                      withCredentials: false,
                      onload: handleFilePondLoad,
                      onerror: handleFilePondError,
                    },
                    remove: handleFilePondRemove,
                    revert: handleFilePondRevert,
                  }"
                  v-bind:files="myFiles"
                  v-on:init="handleFilePondInit"
                  v-on:sort="sortFiles"
                  v-on:processfiles="checkAllFilesProcessed"
                  v-on:error="
                    () => {
                      isUploading = false;
                    }
                  "
                  v-on:addfilestart="handleFilePondProcessStart"
                  @processfilestart="() => {}"
                  @warning="onWarning"
                  v-on:addfile="handleFilePondProcessEnd"
                  v-on:processfileabort="handleFilePondError"
                  v-on:updatefiles="updateFiles"
                  v-on:removefile="handleFilePondProcessEnd"
                  v-on:reorderfiles="handleFileReorder"
                  v-on:processfilerevert="handleFilePondRevertedEnd"
                  :labelIdle="`${
                    translations && translations.drag_and_drop_files_or
                  } <span class='filepond--label-action'> ${
                    translations && translations.browse
                  } </span>`"
                >
                </file-pond>
              </div>

              <!-- BOTTOM TEXT -->
              <div class="mb-4" v-if="userVersion !== 1 && userVersion !== 2">
                <label
                  for="formPostbody2"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >{{ translations && translations.bottom_text_not_required }}
                </label>

                <textarea
                  v-model="form.body2"
                  @keydown="insertTabBody2"
                  class="w-full py-2 px-3 shadow appearance-none text-gray-900 font-semibold border rounded border-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-500"
                  rows="3"
                  id="formPostbody2"
                  :placeholder="translations && translations.bottom_text"
                >
                </textarea>

                <div v-if="$page.props.errors.body2" class="text-red-500">
                  {{ $page.props.errors.body2 }}
                </div>
              </div>
              <div class="mb-4 sm:mb-0">
                <InputLabel
                  class="font-bold mb-1 mt-1"
                  :value="translations && translations.region"
                />
                <div class="text-lg">{{ selectedReferal }}</div>
                <InputError
                  class="mt-2"
                  :message="$page.props.errors.region_id"
                />
              </div>
              <div class="mb-4 sm:mb-0 mt-1">
                <div class="flex justify-between mb-2">
                  <div class="text-lg font-bold text-[#241e6d]">
                    {{ translations && translations.display_in_trades_group }}
                  </div>
                  <div
                    @click="openDialog"
                    class="cursor-pointer text-base font-bold self-center text-[#241e6d]"
                  >
                    {{ translations && translations.edit }}
                  </div>
                </div>
                <TradesWithDialog v-model="tradesPost" />
              </div>
            </div>
          </div>

          <!-- UPDATE POST BUTTON -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <!-- SAVE POST BUTTON - saveItem -->
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                @click="onUpdate"
                :disabled="isUploading || loadingUpdate"
                :class="`inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5 ${
                  isUploading || loadingUpdate ? 'disabled' : ''
                }`"
              >
                {{
                  loadingUpdate
                    ? translations && translations.updating
                    : translations && translations.update
                }}
                {{ translations && translations.post }}
              </button>
            </span>

            <!-- CANCEL POST BUTTON -->
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                type="button"
                :disabled="isUploading"
                @click="$emit('formclose')"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {{ translations && translations.edit }}
                {{ translations && translations.cancel }}
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.disabled {
  opacity: 0.2;
}

.switch-trades {
  cursor: pointer;
  width: 40px;
  height: 20px;
  position: relative;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
}

.switch-bg-on-trades,
.switch-bg-off-trades {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transition: background-color 0.2s;
}

.switch-bg-on-trades {
  /* background-color: rgba(36, 30, 109, 1); */
  background-color: rgba(10, 150, 10, 1);
  width: 40px;
}

.switch-bg-off-trades {
  background-color: #ccc;
  /* background-color: rgba(150, 10, 10, 1); */
  width: 39px;
}

.switch-knob-on-trades,
.switch-knob-off-trades {
  width: 19px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 1px;
  transition: left 0.2s;
}

.switch-knob-on-trades {
  left: 21px;
}

.switch-knob-off-trades {
  left: 1px;
}
</style>
