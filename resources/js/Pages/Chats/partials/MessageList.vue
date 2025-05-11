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
      v-else-if="messages.length === 0 && !hasPendingMessages"
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
    <div v-else class="space-y-1">
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
            v-if="
              currentThread?.unread_count > 0 &&
              group.length - index === currentThread?.unread_count
            "
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

          <div class="message-container">
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
                      v-if="message.attachments && message.attachments.length"
                      class="mt-3 space-y-3"
                    >
                      <div
                        v-for="(file, idx) in message.attachments"
                        :key="idx"
                      >
                        <template v-if="isImage(file.file_type)">
                          <a
                            :href="file.file_path"
                            target="_blank"
                            class="block"
                          >
                            <img
                              :src="file.file_path"
                              class="max-w-xs max-h-40 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
                              alt="attachment"
                            />
                          </a>
                        </template>
                        <template v-else>
                          <a
                            :href="file.file_path"
                            target="_blank"
                            class="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition"
                          >
                            <Icon
                              :icon="getFileIcon(file.file_type)"
                              class="w-6 h-6 text-gray-600"
                            />
                            <span class="text-gray-700 truncate">
                              {{ file.name || getFileName(file.file_path) }}
                            </span>
                          </a>
                        </template>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- Timestamp + delivery ticks + sending/sent text -->
                <div
                  class="text-xs text-gray-500 mt-1 flex items-center justify-end space-x-1"
                  :class="
                    message.user_id === userId ? 'text-right' : 'text-left'
                  "
                >
                  <span>{{ formatTime(message.created_at) }}</span>
                  <Icon
                    v-if="
                      message.user_id === userId && message.status !== 'pending'
                    "
                    icon="mdi:check-all"
                    class="w-4 h-4 text-gray-400"
                  />

                  <Icon
                    v-if="
                      message.user_id === userId && message.status === 'pending'
                    "
                    icon="mdi:check"
                    class="w-4 h-4 text-gray-400"
                  />
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
import { ref, onUpdated, defineExpose, computed, onMounted } from "vue";
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
const currentThread = computed(() => store.getters["chat/currentThread"]);

// Get loading state from store
const loading = computed(() => store.state.chat?.messagesLoading || false);

// Check if there are any pending messages being sent
const hasPendingMessages = computed(() => {
  return (
    store.state.chat?.pendingMessages?.length > 0 ||
    props.messages.some((m) => m.status === "pending")
  );
});

// Fix to properly group messages by local date
const groupedMessages = computed(() => {
  const groups = {};
  if (!props.messages || props.messages.length === 0) return groups;

  // Remove duplicates: keep only the latest status for each temp/real message
  const uniqueMessages = [];
  const seen = new Set();
  for (let i = props.messages.length - 1; i >= 0; i--) {
    const m = props.messages[i];
    // Use a composite key (body, user_id, created_at, reply_to)
    const key = [
      m.user_id,
      m.body,
      m.created_at,
      m.reply_to || "",
      m.attachments?.length || 0,
    ].join("|");
    if (!seen.has(key)) {
      uniqueMessages.unshift(m);
      seen.add(key);
    }
  }

  uniqueMessages.forEach((message) => {
    // Create date object from timestamp
    const date = new Date(message.created_at);

    // Format date as YYYY-MM-DD in local timezone instead of UTC
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const dateKey = localDate.toISOString().split("T")[0];

    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(message);
  });

  return Object.fromEntries(
    Object.entries(groups).sort((a, b) => new Date(a[0]) - new Date(b[0]))
  );
});

// Fixed date header formatter that correctly handles local time
const formatDateHeader = (dateStr) => {
  // Parse the date string (YYYY-MM-DD format)
  const dateParts = dateStr.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // JS months are 0-indexed
  const day = parseInt(dateParts[2]);

  // Create date objects using local time
  const date = new Date(year, month, day);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time portions for comparison
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  // Simple date comparison (already in local time)
  if (date.getTime() === today.getTime()) {
    return "Today";
  } else if (date.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else if (today - date < 7 * 24 * 60 * 60 * 1000) {
    // Within a week
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
    // Format the date as a string with month name
    return date.toLocaleDateString(undefined, {
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
  animation: fade-in 0.2s ease-in;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
