<template>
  <Link
    :href="`/contractor/${user.user_id}`"
    class="flex flex-row gap-2 justify-start items-center"
  >
    <!-- Avatar -->
    <div class="cursor-pointer flex justify-start items-start flex-none w=16">
      <!-- <Link :href="route('user.show')" class="block "> -->
      <div class="block">
        <AvatarWithIcon
          icon="emojione-monotone:up-arrow"
          :style="{
            width: screenWidth >= 640 ? '4.5rem' : '3.7rem',
            height: screenWidth >= 640 ? '4.5rem' : '3.7rem',
          }"
          :imageSrc="user.user_avatar || user.company_logo"
          :iconRotate="!liked ? 2 : 0"
          :iconColorClass="liked ? 'text-[#16a34a]' : 'text-[#c40516]'"
        />
      </div>
    </div>

    <!-- User Info -->
    <div class="flex flex-col justify-center ml-1">
      <h2 class="font-bold text-lg sm:text-xl" style="line-height: 1.5rem">
        <!-- {{  user }} -->
        {{ user.first_name + " " + user.last_name }}
      </h2>
      <div class="">
        {{ user.company_name }}
      </div>
    </div>
  </Link>
</template>

<script setup>
import AvatarWithIcon from "@/Components/PostFooter/AvatarWithIcon.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  user: Object,
  liked: {
    default: false,
    type: Boolean,
  },
});
const store = useStore();

const screenWidth = computed(() => store.getters.screenWidth);
</script>

<style></style>
