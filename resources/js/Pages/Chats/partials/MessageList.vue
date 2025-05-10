<template>
  <div ref="msgListRef" class="flex-1 p-5 overflow-auto bg-gray-50">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="h-full flex flex-col justify-center items-center"
    >
      <div class="loader mb-3"></div>
      <div class="text-gray-500">Loading messages...</div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="messages.length === 0"
      class="h-full flex flex-col justify-center items-center text-gray-500"
    >
      <Icon
        icon="mdi:chat-outline"
        class="text-gray-400"
        width="50"
        height="50"
      />
      <p class="mt-3">No messages yet. Start the conversation!</p>
    </div>

    <!-- Content State -->
    <div
      v-else
      class="space-y-1"
      @scroll="handleScroll"
      @click="handleMessageInteraction"
    >
      <template v-for="(group, dateKey) in groupedMessages" :key="dateKey">
        <!-- Date Header -->
        <div class="flex justify-center my-4">
          <div
            class="bg-gray-200 rounded-full px-4 py-1 text-xs text-gray-700 font-medium"
          >
            {{ formatDateHeader(dateKey) }}
          </div>
        </div>

        <div v-for="(message, index) in group" :key="message.id">
          <!-- Unread divider immediately above the first unread message -->
          <div
            v-if="shouldShowUnreadDivider(message)"
            class="flex justify-center my-3"
          >
            <div
              class="bg-red-100 text-red-600 rounded-full px-4 py-1 text-xs font-medium flex items-center gap-2"
            >
              <span
                class="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
              >
                {{ group.length - index }}
              </span>
              <span>Unread messages</span>
            </div>
          </div>

          <div
            class="message-container"
            :class="{ 'unread-message': isUnreadMessage(message) }"
          >
            <div
              class="flex items-start mb-4 group"
              :class="
                message.user_id === userId ? 'justify-end' : 'justify-start'
              "
            >
              <!-- Avatar for other user's messages -->
              <div v-if="message.user_id !== userId" class="mr-2 flex-shrink-0">
                <img
                  v-if="message.sender?.profile?.user_avatar"
                  :src="message.sender.profile.user_avatar"
                  class="h-8 w-8 rounded-full object-cover"
                  alt="User avatar"
                />
                <div
                  v-else
                  class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center"
                >
                  <span class="text-gray-600 text-sm">
                    {{
                      getInitials(
                        message.sender?.first_name,
                        message.sender?.last_name
                      )
                    }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col max-w-[75%]">
                <!-- Message bubble with improved action menu -->
                <div
                  class="px-4 py-2 rounded-lg text-sm relative group"
                  :class="
                    message.user_id === userId
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  "
                >
                  <!-- Action menu for own messages -->
                  <div
                    v-if="message.user_id === userId && !message.deleted"
                    class="absolute top-1 right-2 opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    <v-menu offset-y>
                      <template v-slot:activator="{ props }">
                        <button
                          v-bind="props"
                          class="p-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Icon
                            icon="pepicons-pencil:dots-x"
                            :class="
                              message.user_id === userId
                                ? 'text-white'
                                : 'text-gray-700'
                            "
                          />
                        </button>
                      </template>
                      <v-list>
                        <v-list-item
                          @click="replyToMessage(message)"
                          class="hover:bg-gray-200"
                        >
                          <v-list-item-title class="cursor-pointer"
                            >Reply</v-list-item-title
                          >
                        </v-list-item>
                        <v-list-item
                          @click="editMessage(message)"
                          class="hover:bg-gray-200"
                        >
                          <v-list-item-title class="cursor-pointer"
                            >Edit</v-list-item-title
                          >
                        </v-list-item>
                        <v-list-item
                          @click="confirmDeleteMessage(message)"
                          class="hover:bg-gray-200"
                        >
                          <v-list-item-title class="cursor-pointer"
                            >Delete</v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>

                  <!-- Action menu for other user's messages (reply only) -->
                  <div
                    v-if="message.user_id !== userId && !message.deleted"
                    class="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      @click="replyToMessage(message)"
                      class="p-1 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700"
                    >
                      <Icon icon="mdi:reply" />
                    </button>
                  </div>

                  <!-- Reply preview if this message is a reply -->
                  <ReplyMessageBubble
                    v-if="message.reply_to && !message.deleted"
                    :replyMessage="findReplyMessage(message)"
                    :isDark="message.user_id === userId"
                  />

                  <!-- Message content -->
                  <template v-if="message.deleted">
                    <em class="text-gray-500">This message was deleted</em>
                  </template>
                  <template v-else>
                    <div class="mr-8" v-html="processUrls(message.body)"></div>

                    <!-- Attachments -->
                    <div
                      v-if="
                        message.attachments && message.attachments.length > 0
                      "
                      class="mt-2"
                    >
                      <div
                        v-for="attachment in message.attachments"
                        :key="attachment.id"
                        class="mt-1"
                      >
                        <!-- Image preview for image files -->
                        <a
                          v-if="isImage(attachment.file_type)"
                          :href="'/' + attachment.file_path"
                          target="_blank"
                          class="block"
                        >
                          <img
                            :src="'/' + attachment.file_path"
                            alt="Attachment"
                            class="max-h-40 max-w-full rounded border border-gray-200"
                          />
                        </a>

                        <!-- Document link for other file types -->
                        <a
                          v-else
                          :href="'/' + attachment.file_path"
                          target="_blank"
                          class="flex items-center p-2 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100"
                          :class="
                            message.user_id === userId
                              ? 'text-blue-900'
                              : 'text-blue-600'
                          "
                        >
                          <Icon
                            :icon="getFileIcon(attachment.file_type)"
                            class="mr-2"
                            width="20"
                            height="20"
                          />
                          <span class="text-sm truncate">
                            {{ getFileName(attachment.file_path) }}
                          </span>
                        </a>
                      </div>
                    </div>

                    <!-- Edited indicator -->
                    <div
                      v-if="message.edited"
                      class="text-xs mt-1 italic text-right"
                      :class="
                        message.user_id === userId
                          ? 'text-blue-200'
                          : 'text-gray-500'
                      "
                    >
                      (edited)
                    </div>
                  </template>
                </div>

                <!-- Timestamp -->
                <div
                  class="text-xs text-gray-500 mt-1"
                  :class="
                    message.user_id === userId ? 'text-right' : 'text-left'
                  "
                >
                  {{ formatTime(message.created_at) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!-- Delete Confirmation Dialog -->
  <teleport to="body">
    <CustomDialog
      ref="deleteDialogRef"
      :submitText="'Delete'"
      @submit="deleteMessage"
      :loading="deleting"
      :disabled="deleting"
      errorIcon
      title="Delete Message"
    >
      <div class="p-4">
        <p>Are you sure you want to delete this message?</p>
        <p class="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
      </div>
    </CustomDialog>
  </teleport>
</template>

<script setup>
import {
  ref,
  onUpdated,
  defineExpose,
  computed,
  inject,
  watch,
  onMounted,
} from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import ReplyMessageBubble from "./ReplyMessageBubble.vue";

const props = defineProps({
  messages: Array,
  userId: [Number, String],
});

const store = useStore();
const msgListRef = ref(null);
const deleteDialogRef = ref(null);
const messageToDelete = ref(null);
const deleting = ref(false);
const emit = defineEmits(["editMessage", "replyToMessage"]);

// Get loading state from store
const loading = computed(() => store.state.chat?.messagesLoading || false);

// Group messages by date
const groupedMessages = computed(() => {
  const groups = {};

  if (!props.messages || props.messages.length === 0) {
    return groups;
  }

  props.messages.forEach((message) => {
    // Extract date part only from created_at
    const date = new Date(message.created_at);
    const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(message);
  });

  // Sort groups by date, oldest first so newest (Today) appears at the bottom
  return Object.fromEntries(
    Object.entries(groups).sort((a, b) => {
      return new Date(a[0]) - new Date(b[0]); // Changed to ascending order (oldest to newest)
    })
  );
});

// Format date headers (Today, Yesterday, day of week, or full date)
const formatDateHeader = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Set time to beginning of day for comparison
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  // Calculate days difference
  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays > 1 && diffDays < 7) {
    // Show day name for days within the last week
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayNames[date.getDay()];
  } else {
    // For older messages, show the full date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

// Format time in 12-hour format
const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Get user initials for avatar
const getInitials = (firstName, lastName) => {
  let initials = "";
  if (firstName) initials += firstName[0];
  if (lastName) initials += lastName[0];
  return initials.toUpperCase();
};

// Rename to match what's used in the template
const getFileName = (filePath) => {
  if (!filePath) return "attachment";
  return filePath.split("/").pop();
};

// Process URLs to make them clickable
const processUrls = (body) => {
  if (!body) return "";

  const urlRegex = /(https?:\/\/[^<\s]+|www\.[^<\s]+)/g;
  return body.replace(urlRegex, function (url) {
    let actualUrl = url.startsWith("http") ? url : "http://" + url;
    return `<a @click.self.stop="()=>{}" href="${actualUrl}" target="_blank" class="underline">${url}</a>`;
  });
};

// Edit message
const editMessage = (message) => {
  store.commit("chat/SET_EDITING_MESSAGE", message);
  emit("editMessage");
};

// Confirm delete message
const confirmDeleteMessage = (message) => {
  messageToDelete.value = message;
  deleteDialogRef.value.openDialog();
};

// Delete message
const deleteMessage = async () => {
  if (!messageToDelete.value) return;

  deleting.value = true;
  try {
    await store.dispatch("chat/deleteMessage", messageToDelete.value.id);
    deleteDialogRef.value.closeDialog();
  } catch (error) {
    console.error("Error deleting message:", error);
  } finally {
    deleting.value = false;
    messageToDelete.value = null;
  }
};

function scrollToBottom() {
  if (msgListRef.value) {
    msgListRef.value.scrollTop = msgListRef.value.scrollHeight;
  }
}

onUpdated(() => {
  scrollToBottom();
});

defineExpose({ scrollToBottom });

// Add these functions to your script section
const isImage = (mimeType) => {
  return mimeType && mimeType.startsWith("image/");
};

function getFileIcon(mimeType) {
  if (!mimeType) return "mdi:file-outline";

  if (mimeType.includes("pdf")) {
    return "mdi:file-pdf-box";
  } else if (mimeType.includes("word") || mimeType.includes("msword")) {
    return "mdi:file-word-outline";
  } else if (mimeType.includes("image")) {
    return "mdi:file-image-outline";
  } else {
    return "mdi:file-outline";
  }
}

// Improved function to find reply messages that works immediately after send
const findReplyMessage = (message) => {
  // First try using the replyTo property if it exists (from backend)
  if (message.replyTo) {
    return message.replyTo;
  }
  // If not available, try to find the message in our local messages array
  if (message.reply_to) {
    const replyMsg = props.messages.find(
      (m) => m.id === message.reply_to.id || m.id === message.reply_to
    );
    if (replyMsg) {
      return replyMsg;
    }
  }

  // If we still can't find it, return a placeholder
  return message.reply_to
    ? {
        id: message.reply_to,
        body: "Original message",
        user_id: null,
        sender: { first_name: "User", last_name: "" },
      }
    : null;
};

// Add function to handle replying to a message
const replyToMessage = (message) => {
  emit("replyToMessage", message);
};

// Add new code for unread messages
const firstUnreadMessage = ref(null);

// Watch the messages array for changes
watch(
  () => props.messages,
  () => {
    // Find the first unread message
    if (props.messages && props.messages.length) {
      const currentThread = store.getters["chat/currentThread"];

      // If we have unread messages, find the first one
      if (currentThread && currentThread.unread_count > 0) {
        // We can't directly identify unread messages since we don't have the last_read_at timestamp
        // in the frontend, but we can identify them by their position in the messages array
        const totalMessages = props.messages.length;
        const unreadCount = currentThread.unread_count;

        if (unreadCount < totalMessages) {
          firstUnreadMessage.value =
            props.messages[totalMessages - unreadCount];
        }
      } else {
        firstUnreadMessage.value = null;
      }
    }
  },
  { immediate: true }
);

// Check if a message is the first unread message
const isUnreadMessage = (message) => {
  return firstUnreadMessage.value && message.id === firstUnreadMessage.value.id;
};

// Replace the existing hasUnreadMessagesInDate function with shouldShowUnreadDivider
const shouldShowUnreadDivider = (message) => {
  // If this isn't an unread message or no unread messages indicator exists, don't show the divider
  if (!firstUnreadMessage.value || message.id !== firstUnreadMessage.value.id)
    return false;

  // This is the first unread message, show the divider
  return true;
};

// Add new function to handle user interaction with messages
const handleMessageInteraction = () => {
  if (store.getters["chat/currentThread"]?.unread_count > 0) {
    store.dispatch("chat/markMessagesAsRead");
  }
};

// Track if user has scrolled through messages
const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;

  // If user has scrolled more than 70% through the messages, mark as read
  if (scrollTop + clientHeight > scrollHeight * 0.7) {
    if (store.getters["chat/currentThread"]?.unread_count > 0) {
      store.dispatch("chat/markMessagesAsRead");
    }
  }
};

// Do NOT call markMessagesAsRead in onMounted anymore
onMounted(() => {
  // Only scroll to bottom, don't mark as read automatically
  if (msgListRef.value) {
    msgListRef.value.scrollTop = msgListRef.value.scrollHeight;
  }
});
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #16a34a;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.message-container {
  transition: all 0.3s ease;
}

.unread-message {
  position: relative;
}

.unread-message::before {
  content: "";
  position: absolute;
  left: -10px;
  width: 5px;
  height: 100%;
  background-color: #ef4444;
  border-radius: 4px;
}
</style>
