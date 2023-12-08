<template>
    <Link
      :href="`/contractor/${user.id}`"
      class="flex flex-row gap-2 justify-start items-center"
    >
      <!-- Avatar -->
      <div class="cursor-pointer flex justify-start items-start flex-none w=16">
        <!-- <Link :href="route('user.show')" class="block "> -->
        <div class="block">
            <Avatar
              :style="{
                width: screenWidth >= 640 ? '3.5rem' : '2.7rem',
                height: screenWidth >= 640 ? '3.5rem' : '2.7rem',
              }"
              :imageSrc="post.user_avatar"
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
  import { computed } from "vue";
  import { useStore } from "vuex";
  
  const props = defineProps({
    comment: Object,
    // liked: {
    //   default: false,
    //   type: Boolean,
    // },
  });
  const store = useStore();
  
  const screenWidth = computed(() => store.getters.screenWidth);
  </script>
  
  <style></style>
  