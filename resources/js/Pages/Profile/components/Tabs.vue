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
      class="border-8 p-2 border-white rounded-t-lg sm:p-8 bg-white shadow sm:rounded-lg"
    >
      <slot :activeTab="activeTab"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const { tabs } = defineProps(["tabs"]);
const activeTab = computed(() => store.getters["profile/activeProfileTab"]);

const emit = defineEmits();

const handleTabClick = (index) => {
  store.commit("profile/setActiveTab", index);

  emit("tabChanged", index);
};
</script>
