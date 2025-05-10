<template>
  <div class="flex h-screen bg-gray-100">
    <Head title="My Chats" />
    <!-- SIDEBAR -->
    <ChatSidebar :threads="threads" :current-id="currentId" @select="select" />

    <!-- MAIN CHAT -->
    <div class="flex-1 flex flex-col">
      <div
        v-if="!currentThread"
        class="flex-1 flex items-center justify-center text-gray-500"
      >
        Select or start a conversation.
      </div>
      <template v-else>
        <ChatHeader :partner="currentThread.partner" />

        <MessageList
          ref="messageListRef"
          :messages="messages"
          :user-id="authUser.id"
          @editMessage="openEditModal"
          @replyToMessage="setReplyToMessage"
        />

        <ChatComposer
          @send="send"
          :replyTo="replyToMessage"
          @cancelReply="clearReplyToMessage"
        />
      </template>
    </div>

    <!-- Edit Message Modal -->
    <EditMessageModal ref="editMessageModal" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import ChatSidebar from "@/Pages/Chats/partials/ChatSidebar.vue";
import ChatHeader from "@/Pages/Chats/partials/ChatHeader.vue";
import MessageList from "@/Pages/Chats/partials/MessageList.vue";
import ChatComposer from "@/Pages/Chats/partials/ChatComposer.vue";
import EditMessageModal from "@/Pages/Chats/partials/EditMessageModal.vue";

const store = useStore();
const messageListRef = ref(null);
const editMessageModal = ref(null);
const replyToMessage = ref(null);
const threads = computed(() => store.getters["chat/threads"]);
const currentId = computed(() => store.getters["chat/currentId"]);
const currentThread = computed(() => store.getters["chat/currentThread"]);
const messages = computed(() => store.getters["chat/messages"]);
const props = defineProps({ authUser: Object });
const authUser = props.authUser;

// Track if this is the initial load
const isInitialLoad = ref(true);

async function select(partnerId) {
  // Find the thread associated with this partner
  const thread = threads.value.find((t) => t.partner.id === partnerId);

  // If we're selecting the same thread we're already viewing, just mark as read
  if (currentId.value && thread.conversation_id === currentId.value) {
    // Don't mark as read if this is the initial default selection
    if (!isInitialLoad.value) {
      // Mark as read and clear unread count
      store.dispatch("chat/markMessagesAsRead");
      store.commit("chat/UPDATE_THREAD_UNREAD_COUNT", {
        conversationId: currentId.value,
        count: 0,
      });
    }
    return;
  } else if (currentId.value) {
    await store.dispatch("chat/markMessagesAsRead");
  }

  // Set the partner info
  store.dispatch("chat/initPartner", {
    id: partnerId,
    ...thread.partner,
  });

  // If thread has a conversation_id, set it as current and fetch messages
  if (thread.conversation_id) {
    store.commit("chat/SET_CURRENT", thread.conversation_id);
    store.dispatch("chat/fetchMessages", thread.conversation_id).then(() => {
      if (messageListRef.value) {
        messageListRef.value.scrollToBottom();
      }

      // Only mark as read when user explicitly selects a thread (not on initial load)
      if (!isInitialLoad.value) {
        store.dispatch("chat/markMessagesAsRead");
        store.commit("chat/UPDATE_THREAD_UNREAD_COUNT", {
          conversationId: thread.conversation_id,
          count: 0,
        });
      }

      // Set initial load to false after first selection
      isInitialLoad.value = false;
    });
  } else {
    // For new conversations without an ID yet
    store.commit("chat/SET_CURRENT", null);
    store.commit("chat/SET_MESSAGES", []);
    isInitialLoad.value = false;
  }
}

function setReplyToMessage(message) {
  replyToMessage.value = message;
}

function clearReplyToMessage() {
  replyToMessage.value = null;
}

function send(data) {
  let payload;
  if (typeof data === "string") {
    payload = { text: data };
  } else {
    payload = {
      text: data.text,
      attachments: data.attachments || [],
    };
  }

  // Add reply_to if replying to a message
  if (replyToMessage.value) {
    // Keep a reference to the full message object for the UI while we wait for API response
    const replyMessageReference = { ...replyToMessage.value };

    // Add the ID to the payload for the API
    payload.reply_to = replyToMessage.value.id;

    // After dispatch, modify the returned message to ensure replyTo is properly set
    return store.dispatch("chat/sendMessage", payload).then((newMessage) => {
      // If the message doesn't have replyTo set but has reply_to, set it manually
      if (newMessage && newMessage.reply_to && !newMessage.replyTo) {
        newMessage.replyTo = replyMessageReference;

        // Update the message in the store to ensure UI shows the reply
        store.commit("chat/UPDATE_MESSAGE", newMessage);
      }

      if (messageListRef.value) {
        messageListRef.value.scrollToBottom();
      }

      // Clear the reply reference after sending
      clearReplyToMessage();
    });
  } else {
    return store.dispatch("chat/sendMessage", payload).then(() => {
      if (messageListRef.value) {
        messageListRef.value.scrollToBottom();
      }
    });
  }
}

function openEditModal() {
  if (editMessageModal.value) {
    editMessageModal.value.openDialog();
  }
}

onMounted(() => {
  store.dispatch("chat/fetchThreads").then(() => {
    // only scroll, don't select or mark as read
    if (messageListRef.value) {
      messageListRef.value.scrollToBottom();
    }
  });
});
</script>

<style scoped>
/* refine your Tailwind/TSCSS here */
</style>
