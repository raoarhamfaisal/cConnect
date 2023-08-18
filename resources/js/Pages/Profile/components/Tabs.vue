<template>
  <div>
    <div class="pb-8 flex flex-wrap justify-center px-2">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="handleTabClick(index)"
        class="cursor-pointer whitespace-nowrap"
      >
        <div
          class="py-2 px-4 text-xs border-b-4 uppercase text-center font-bold w-36 ml-2"
          :class="{
            'rounded border-b-4 border-blue-rgba font-bold text-blue-rgba text-xs uppercase':
              activeTab === index,
          }"
        >
          {{ tab }}
        </div>
        <div class="rounded-full h-2 w-8" v-if="activeTab === index"></div>
      </div>
    </div>

    <div
      class="border-8 p-2 border-white rounded-t-lg sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
    >
      <slot :activeTab="activeTab"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

const { tabs } = defineProps(["tabs"]);
const activeTab = ref(0);
const emit = defineEmits();
const handleTabClick = (index) => {
  activeTab.value = index;
  emit("tabChanged", activeTab.value);
};
</script>
