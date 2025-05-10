<template>
  <div
    class="flex gap-1 cursor-pointer text-sm rounded-full border border-blue-500 bg-transparent px-2 py-0.5 font-bold items-center text-blue-500"
    v-if="shouldShowButton"
    @click.prevent.stop="handleClick"
  >
    <Icon
      icon="material-symbols:chat"
      color="#3b82f6"
      class="cursor-pointer"
      width="16"
      height="16"
    />
    Message
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["open-chat"]);

const shouldShowButton = computed(() => {
  return props.profile.user_id !== props.post.user_id;
});

const handleClick = () => {
  emit("open-chat", props.post);
};
</script>
