<script>
import axios from "axios";
import VueFilePond from "vue-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

// additional required plugins
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// Note: Need both plugins image transform & resize for resize options to work

// import filepond css
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";

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
  },

  props: ["form", "isOpen", "isEdit"],
  // props: {
  //     form: {
  //         type: Object,
  //         required: true
  //     },
  //     isOpen: Boolean,
  //     isEdit: Boolean,
  // },

  data() {
    return {
      // the image array parameter
      myFiles: [],

      // csrfToken: document.querySelector('meta[name="csrf-token"]').content
    };
  },

  methods: {
    // called when plugin is initialized
    handleFilePondInit() {
      this.myFiles = [];
      // Create the array of images using seperator |
      let arr = this.form.image ? this.form.image.split("|") : [];

      // loop through array and display each image
      for (let i = 0; i < arr.length; i++) {
        // Adding image object to myFiles arrray
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
    },

    addFormImage(image) {
      // deleting or adding new item to array and
      // then joining that array into a string
      // using vertical line as delimiter... all the
      // file names will be in the same field in the DB
      // but seperated by '|'
      let arr = this.form.image ? this.form.image.split("|") : [];
      arr.push(image);
      this.form.image = arr.join("|");
      console.log("addForm: ", this.form.image);
    },

    removeFormImage(image) {
      let arr = this.form.image ? this.form.image.split("|") : [];
      arr.remove(image);
      this.form.image = arr.join("|");
      console.log("removeForm: ", this.form.image);
    },

    // The callback when image is loaded
    // response is the image
    handleFilePondLoad(response) {
      this.addFormImage(response);
      // for multiple we need to return the unique file id
      // the name of the file
      return response;
    },

    // Remove Images
    handleFilePondRemove(source, load, error) {
      // call the method we created to remove deleted image(s)
      // had to get rid of '/' in order to make it delete
      console.log("file remove source: ", source);
      this.removeFormImage(source.replace(/^\//, ""));
      load();
    },

    // Remove images in temp storage when image uploaded
    // but then deleted before saving
    // Uses axios
    handleFilePondRevert(uniqueId, load, error) {
      this.removeFormImage(uniqueId);
      // within the method make an HTTP call to upload-posts-revert
      axios.post("/upload-post-revert", {
        // send there the name of the upload but not saved image
        image: uniqueId,
      });
      load();
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
  <div
    v-if="isOpen"
    class="fixed z-40 inset-0 overflow-y-auto ease-out duration-400 overscroll-contain"
  >
    <div
      class="flex items-start justify-start min-h-screen mt-5 pt-4 px-1 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-70"></div>
      </div>

      <!-- This element is to trick the browser into
                 centering the modal contents. -->
      <!-- <span class="hidden sm:inline-block
                         sm:align-middle sm:h-screen">
            </span>​ -->

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full mx-6 sm:mx-0 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <form>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="">
              <!-- POST TITLE -->
              <div
                class="flex justify-start items-center pb-2 space-x-2 text-blue-rgba font-bold text-xl md:text-3xl"
              >
                <img src="/icons/post_b.png" width="25" height="25" />
                <p class="">Create Post</p>
              </div>

              <!-- TITLE TEXT -->
              <div class="mb-4">
                <label
                  for="formPostTitle"
                  class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >Post Title:
                </label>
                <input
                  type="text"
                  v-model="form.title"
                  class="w-full py-2 px-3 shadow appearance-none text-gray-900 font-semibold dark:text-gray-300 border rounded border-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-500 dark:placeholder:text-gray-300"
                  id="formPostTitle"
                  placeholder="Post Title..."
                />
                <div v-if="$page.props.errors.title" class="text-red-500">
                  {{ $page.props.errors.title }}
                </div>
              </div>

              <!-- TOP TEXT -->
              <div class="mb-4">
                <label
                  for="formPostbody1"
                  class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >Top text (not required):
                </label>
                <input
                  type="text"
                  v-model="form.body1"
                  class="w-full py-2 px-3 shadow appearance-none text-gray-900 font-semibold dark:text-gray-300 border rounded border-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-500 dark:placeholder:text-gray-300"
                  id="formPostbody1"
                  placeholder="Top text..."
                />
                <div v-if="$page.props.errors.body1" class="text-red-500">
                  {{ $page.props.errors.body1 }}
                </div>
              </div>

              <!-- IMAGE UPLOAD -->
              <div class="mb-4">
                <label
                  for="formPostImage"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >Image (max 6):
                </label>

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
                  maxFileSize="25MB"
                  labelMaxTotalFileSizeExceeded="Maximum Size Is 25MB"
                  allowImageResize="true"
                  imageResizeMode="contain"
                  imageResizeTargetWidth="1000"
                  imageResizeTargetHeight="2000"
                  imageResizeUpscale="true"
                  maxFiles="10"
                  allowReorder="true"
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
                      onerror: () => {},
                    },
                    remove: handleFilePondRemove,
                    revert: handleFilePondRevert,
                  }"
                  v-bind:files="myFiles"
                  v-on:init="handleFilePondInit"
                >
                </file-pond>
                <!-- <input type="text"
                            class="shadow appearance-none
                                    border rounded w-full
                                    py-2 px-3 text-gray-700
                                    leading-tight focus:outline-none
                                    focus:shadow-outline"
                            id="formBookImage"
                            placeholder="Enter Image"> -->
              </div>

              <!-- BOTTOM TEXT -->
              <div class="mb-4">
                <label
                  for="formPostbody2"
                  class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >Bottom text (not required):
                </label>
                <input
                  type="text"
                  v-model="form.body2"
                  class="w-full py-2 px-3 shadow appearance-none text-gray-900 font-semibold dark:text-gray-300 border rounded border-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-500 dark:placeholder:text-gray-300"
                  id="formPostbody2"
                  placeholder="Bottom text..."
                />
                <div v-if="$page.props.errors.body2" class="text-red-500">
                  {{ $page.props.errors.body2 }}
                </div>
              </div>
            </div>
          </div>

          <!-- OUR BUTTONS -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <!-- SAVE POST BUTTON - saveItem -->
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                v-show="!isEdit"
                @click="$emit('formsave', form)"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Save Post
              </button>
            </span>

            <!-- UPDATE POST BUTTON -->
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                v-show="isEdit"
                @click="$emit('formsave', form)"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none f ocus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Update Post
              </button>
            </span>

            <!-- CANCEL POST BUTTON -->
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                type="button"
                v-if="!isEdit"
                @click="$emit('formclose')"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Cancel
              </button>
            </span>

            <!-- EDIT POST BUTTON -->
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                type="button"
                v-if="isEdit"
                @click="$emit('formEditClose', form)"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Edit Cancel
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
