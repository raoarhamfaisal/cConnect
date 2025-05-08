<template>
  <div
    v-if="replyMessage"
    class="border-l-4 pl-2 py-1 mb-2 text-xs"
    :class="
      isDark
        ? 'border-blue-300 bg-blue-600 bg-opacity-30'
        : 'border-blue-500 bg-gray-100'
    "
  >
    <!-- Reply sender name -->
    <div class="font-bold" :class="isDark ? 'text-blue-200' : 'text-blue-600'">
      {{
        profile.user_id === replyMessage.user_id
          ? "You"
          : replyMessage.sender?.first_name +
            " " +
            replyMessage.sender?.last_name
      }}
    </div>

    <!-- Reply content preview -->
    <div
      class="line-clamp-2"
      :class="isDark ? 'text-gray-100' : 'text-gray-600'"
    >
      <template v-if="replyMessage.deleted">
        <em>This message was deleted</em>
      </template>
      <template v-else-if="replyMessage.body">
        {{ replyMessage.body }}
      </template>
      <template v-else-if="replyMessage.attachments?.length">
        <div class="flex items-center">
          <Icon
            icon="mdi:attachment"
            class="mr-1"
            :class="isDark ? 'text-gray-100' : 'text-gray-600'"
          />
          <span>Attachment</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { usePage } from "@inertiajs/inertia-vue3";

defineProps({
  replyMessage: Object,
  isDark: Boolean,
});
const userProps = usePage().props.value;
const profile = userProps.auth.user.profile || userProps.profile;
</script>
