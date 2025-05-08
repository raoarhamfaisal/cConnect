<template>
  <!-- Dialog Footer -->
  <div
    class="flex justify-end p-2 pb-0 sm:p-3 shadow-lg overflow-hidden border-t-[1px] border-gray-400 min-h-[60px] sm:min-h-[70px]"
    ref="container"
  >
    <div class="flex flex-col w-full">
      <!-- File Preview Area -->
      <div v-if="filePreviewVisible" class="mb-2 p-2 bg-gray-100 rounded">
        <div class="flex items-center justify-between mb-1">
          <h3 class="text-sm font-medium text-gray-700">Attachments</h3>
          <button
            @click="closeFileUpload"
            class="text-gray-500 hover:text-gray-700"
          >
            <Icon icon="mdi:close" width="18" height="18" />
          </button>
        </div>
        <file-pond
          name="filepond"
          ref="pond"
          allowFileTypeValidation="true"
          :allowMultiple="true"
          acceptedFileTypes="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
          labelFileTypeNotAllowed="Only PDF, DOC, DOCX, JPG, and PNG files are allowed"
          allowFileSizeValidation="true"
          maxFileSize="5MB"
          labelMaxFileSizeExceeded="Maximum file size is 5MB"
          :files="attachments"
          :server="{
            url: '',
            timeout: 7000,
            process: {
              url: '/chat/upload-attachment',
              method: 'POST',
              headers: {
                'X-CSRF-TOKEN': $page.props.csrf_token,
              },
              withCredentials: true,
              onload: handleAttachmentLoad,
              onerror: handleAttachmentError,
            },
            revert: handleAttachmentRevert,
          }"
          v-on:init="handleAttachmentInit"
          @processfile="handleAttachmentProcessed"
          @processfilerevert="handleAttachmentReverted"
          labelIdle="Drag & Drop files or <span class='filepond--label-action'>Browse</span>"
        />
      </div>

      <!-- Reply Preview Area -->
      <div
        v-if="replyTo"
        class="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded border-l-4 border-blue-500"
      >
        <div class="flex flex-col">
          <span class="text-xs font-bold text-blue-600">
            {{
              profile.user_id === replyTo.user_id
                ? "You"
                : replyTo.sender?.first_name + " " + replyTo.sender?.last_name
            }}
          </span>
          <span class="text-sm text-gray-600 line-clamp-1">{{
            replyPreviewText
          }}</span>
        </div>
        <button @click="cancelReply" class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:close" width="18" height="18" />
        </button>
      </div>

      <div class="flex gap-2 w-full items-start overflow-auto max-h-[165px]">
        <Icon
          type="button"
          @click="toggleFileUpload"
          class="w-8 h-8 sx:w-10 sx:h-10 cursor-pointer text-gray-500"
          icon="mdi:plus-circle-outline"
        />
        <textarea
          v-model="message"
          @paste="adjustHeight"
          ref="messageAreaRef"
          @input="adjustHeight"
          :rows="1"
          placeholder="Type a message…"
          class="text-xl w-full py-1 min-h-[40px] overflow-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-400 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600"
          @keyup.enter="sendMessage"
        ></textarea>
        <Icon
          type="button"
          :disabled="loading || isUploadInProgress"
          @click="sendMessage"
          :class="`w-8 h-8 sx:w-10 sx:h-10 cursor-pointer text-gray-500 apply-stroke ${
            loading || isUploadInProgress ? 'opacity-40' : 'opacity-100'
          }`"
          icon="carbon:send-filled"
        />
      </div>
    </div>
  </div>
  <v-dialog
    class="dialog-modal"
    v-model="loading"
    scrim="transparent"
    persistent
    width="auto"
  >
    <Card
      :shadowLevel="2"
      bgColor="#364fc7"
      :padding="screenWidth < 640 ? '7px' : '10px'"
    >
      <div class="text-white">Sending Message...</div>
      <v-progress-linear
        indeterminate
        color="#fff"
        class="mb-0"
      ></v-progress-linear>
    </Card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import Card from "@/Components/Card.vue";
import { usePage } from "@inertiajs/inertia-vue3";

// Import FilePond and plugins
import VueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Import FilePond CSS
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Create FilePond component with plugins
const FilePond = VueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview
);

const props = defineProps({
  replyTo: {
    type: Object,
    default: null,
  },
});

const $page = usePage();
const userProps = usePage().props.value;

const profile = userProps.auth.user.profile || userProps.profile;

const emit = defineEmits(["send", "cancelReply"]);
const message = ref("");
const loading = ref(false);
const store = useStore();
const messageAreaRef = ref();
const container = ref();
const minHeight = ref(70);
const paddingHeight = ref(25);
// File upload
const filePreviewVisible = ref(false);
const pond = ref(null);
const attachments = ref([]);
const attachmentPaths = ref([]);
const isUploadInProgress = ref(false);

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
  () => screenWidth.value,
  (newVal) => {
    if (newVal > 640) {
      minHeight.value = 70;
      paddingHeight.value = 25;
    } else {
      minHeight.value = 60;
      paddingHeight.value = 17;
    }
  }
);

const adjustHeight = () => {
  nextTick(() => {
    messageAreaRef.value.style.height = "auto"; // Reset height first to get the correct scrollHeight

    messageAreaRef.value.style.height =
      messageAreaRef.value.scrollHeight + "px";
    if (
      messageAreaRef.value.scrollHeight < 165 &&
      messageAreaRef.value.scrollHeight + paddingHeight.value > minHeight.value
    ) {
      container.value.style.minHeight =
        messageAreaRef.value.scrollHeight + paddingHeight.value + "px";
    } else if (
      messageAreaRef.value.scrollHeight + paddingHeight.value <
      minHeight.value
    ) {
      container.value.style.minHeight = minHeight.value + "px";
    }
  });
};

// Computed property for reply preview text
const replyPreviewText = computed(() => {
  if (!props.replyTo) return "";

  if (props.replyTo.deleted) {
    return "This message was deleted";
  }

  if (props.replyTo.body) {
    return props.replyTo.body;
  }

  if (props.replyTo.attachments?.length) {
    return "Attachment";
  }

  return "";
});

// File upload methods
const toggleFileUpload = () => {
  filePreviewVisible.value = !filePreviewVisible.value;
};

const closeFileUpload = () => {
  filePreviewVisible.value = false;
};

const handleAttachmentInit = () => {
  attachments.value = [];
  attachmentPaths.value = [];
};

const handleAttachmentLoad = (response) => {
  attachmentPaths.value.push(response);
  return response;
};

const handleAttachmentError = (error) => {
  console.error("File upload error:", error);
  store.dispatch("showToast", {
    message: "Error uploading file",
    type: "error",
  });
};

const handleAttachmentRevert = (filename, load) => {
  const index = attachmentPaths.value.indexOf(filename);
  if (index !== -1) {
    attachmentPaths.value.splice(index, 1);
  }
  load();
};

const handleAttachmentProcessed = () => {
  console.log("File processed, paths:", attachmentPaths.value);
  isUploadInProgress.value = false;
};

const handleAttachmentReverted = () => {
  isUploadInProgress.value = false;
};

// Function to cancel reply
const cancelReply = () => {
  emit("cancelReply");
};

async function sendMessage() {
  if (!message.value.trim() && attachmentPaths.value.length === 0) return;
  if (isUploadInProgress.value) return;

  loading.value = true;
  try {
    await emit("send", {
      text: message.value,
      attachments: attachmentPaths.value,
    });
    message.value = "";
    attachmentPaths.value = [];
    filePreviewVisible.value = false;
    if (pond.value) {
      pond.value.removeFiles();
    }
    adjustHeight();
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.apply-stroke path {
  stroke-width: 2px;
}
</style>
