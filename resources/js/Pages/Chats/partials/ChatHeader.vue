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
      <div class="text-xs text-green-500">Online</div>
    </div>
  </header>
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";

const props = defineProps({
  partner: Object,
});
</script>
