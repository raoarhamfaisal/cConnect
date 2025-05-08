<template>
  <div
    :class="[
      'message-container flex mb-4',
      isOwn ? 'justify-end' : 'justify-start',
    ]"
  >
    <div
      :class="[
        'max-w-xs p-3 rounded-lg shadow-sm',
        isOwn
          ? 'bg-green-500 text-white rounded-br-none'
          : 'bg-white text-gray-800 rounded-bl-none border',
      ]"
      style="min-width: 120px"
    >
      <div class="text-sm leading-relaxed whitespace-pre-wrap break-words">
        {{ message.body }}
      </div>
      <div
        :class="[
          'text-xs mt-1 text-right',
          isOwn ? 'text-green-100' : 'text-gray-500',
        ]"
      >
        {{ formatTime(message.created_at) }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: Object,
  isOwn: Boolean,
});

function formatTime(ts) {
  const d = new Date(ts);
  const h = d.getHours() % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  console.log(`Formatted time: ${h}:${m} ${ampm} for timestamp: ${ts}`);
  return `${h}:${m} ${ampm}`;
}
</script>
