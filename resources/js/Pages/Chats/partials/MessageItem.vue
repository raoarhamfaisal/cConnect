<template>
  <div
    :class="[
      'message-item flex gap-2',
      isOwn ? 'justify-end' : 'justify-start',
    ]"
  >
    <div
      :class="[
        'max-w-[75%] rounded-lg p-3',
        isOwn
          ? 'bg-green-100 text-gray-800'
          : 'bg-white text-gray-800 border border-gray-200',
      ]"
    >
      <!-- Message Text -->
      <div v-if="message.body" class="break-words">{{ message.body }}</div>

      <!-- Attachments -->
      <div
        v-if="message.attachments && message.attachments.length > 0"
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
            :href="getPublicUrl(attachment.file_path)"
            target="_blank"
            class="block"
          >
            <img
              :src="getPublicUrl(attachment.file_path)"
              alt="Attachment"
              class="max-h-40 max-w-full rounded border border-gray-200"
            />
          </a>

          <!-- Document link for other file types -->
          <a
            v-else
            :href="getPublicUrl(attachment.file_path)"
            target="_blank"
            class="flex items-center p-2 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100"
          >
            <Icon
              :icon="getFileIcon(attachment.file_type)"
              class="mr-2"
              width="20"
              height="20"
            />
            <span class="text-sm text-blue-600 truncate">
              {{ getFileName(attachment.file_path) }}
            </span>
          </a>
        </div>
      </div>

      <div class="text-xs text-gray-500 mt-1 text-right">
        {{ formatTime(message.created_at) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  message: Object,
  isOwn: Boolean,
});

function formatTime(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getPublicUrl(path) {
  // If path already starts with a slash, HTTP, or HTTPS, return it as is
  if (path.startsWith("/") || path.startsWith("http")) {
    return path;
  }

  // If path includes "uploads/", it's already a relative path from public directory
  if (path.includes("uploads/")) {
    return `/${path}`;
  }

  // Otherwise, assume it's in the Laravel storage directory
  return `/storage/${path}`;
}

function getFileName(path) {
  return path.split("/").pop();
}

function isImage(mimeType) {
  return mimeType && mimeType.startsWith("image/");
}

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
</script>
