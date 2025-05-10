<template>
  <header class="flex items-center p-4 bg-white border-b">
    <Avatar
      :image-src="partner.avatar"
      image-class="w-10 h-10 mr-3"
      :is-not-self="true"
      :is-contractor="partner.is_contractor"
    />
    <div>
      <div class="font-semibold">
        {{ partner.first_name }} {{ partner.last_name }}
      </div>
      <div
        class="text-xs"
        :class="isOnline ? 'text-green-500' : 'text-gray-400'"
      >
        {{ isOnline ? "Online" : "" }}
      </div>
    </div>
  </header>
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  partner: Object,
});

const store = useStore();

const isOnline = computed(() =>
  store.state.chat.onlineUsers.includes(props.partner.id)
);
</script>
