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
        />

        <ChatComposer @send="send" />
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
const threads = computed(() => store.getters["chat/threads"]);
const currentId = computed(() => store.getters["chat/currentId"]);
const currentThread = computed(() => store.getters["chat/currentThread"]);
const messages = computed(() => store.getters["chat/messages"]);
const props = defineProps({ authUser: Object });
const authUser = props.authUser;

function select(partnerId) {
  // Find the thread associated with this partner
  const thread = threads.value.find((t) => t.partner.id === partnerId);

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
    });
  } else {
    // For new conversations without an ID yet
    store.commit("chat/SET_CURRENT", null);
    store.commit("chat/SET_MESSAGES", []);
  }
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

  return store.dispatch("chat/sendMessage", payload).then(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollToBottom();
    }
  });
}

function openEditModal() {
  if (editMessageModal.value) {
    editMessageModal.value.openDialog();
  }
}

onMounted(() => {
  store.dispatch("chat/fetchThreads").then(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollToBottom();
    }
  });
});
</script>

<style scoped>
/* refine your Tailwind/TSCSS here */
</style>
