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
    <div v-else class="space-y-1">
      <message-item
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :is-own="message.user_id === userId"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, defineExpose, computed } from "vue";
import MessageItem from "./MessageItem.vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";

defineProps({
  messages: Array,
  userId: [Number, String],
});

const store = useStore();
const msgListRef = ref(null);

// Get loading state from store
const loading = computed(() => store.state.chat?.messagesLoading || false);

function scrollToBottom() {
  if (msgListRef.value) {
    msgListRef.value.scrollTop = msgListRef.value.scrollHeight;
  }
}

onUpdated(() => {
  scrollToBottom();
});

defineExpose({ scrollToBottom });
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
</style>
