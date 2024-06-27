<template>
  <div class="flex space-x-2 justify-between">
    <div class="flex justify-center items-center space-x-2">
      <div>
        <Avatar :imageSrc="`/${contractor.user_avatar}`" />
      </div>
      <div class="flex flex-col justify-center">
        <h2 class="text-md xs:text-xl font-medium font-bold text-gray-900">
          {{ contractor.first_name + " " + contractor.last_name }}
        </h2>
        <div class="text-sm xs:text-lg" v-if="contractor.company_name">
          {{ contractor.company_name }}
        </div>
        <span
          class="text-xs xs:text-lg"
          v-if="contractor.city || contractor.state"
          >{{ contractor.city + " " + contractor.state }}</span
        >
      </div>
    </div>
  </div>
  <!-- trades -->
  <div class="mb-3">
    <div class="pl-2 text-sm xs:text-md font-bold mt-4 mb-1">
      {{ contractor.first_name + " " + contractor.last_name }}
      {{ `'s ${translations && translations.trades} :` }}
    </div>
    <template v-for="(option, index) in options" :key="option.name">
      <Badge
        v-if="contractor[option.id] === 1"
        class="my-1 mx-1 space-x-1 flex"
        :style="{
          backgroundColor: index % 2 === 0 ? '#5f3dc4' : '#364fc7',
          fontSize: '10px',
          paddingTop: '6px',
          paddingBottom: '6px',
        }"
        >{{ option.name }}</Badge
      >
    </template>
  </div>
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import Badge from "@/Components/Ratings/Badge.vue";
import { options } from "@/helpers/selectListsHelpters.js";
import { computed } from "vue";
import { useStore } from "vuex";

defineProps(["contractor"]);

const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
</script>
