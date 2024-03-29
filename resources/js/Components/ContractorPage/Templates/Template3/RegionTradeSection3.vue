<template>
  <!-- Trades and Region  -->

  <div class="flex justify-center items-center max-md:gap-4 max-md:mb-2">
    <heading-card
      class="text"
      :style="{
        marginBottom: screenWidth > 768 ? '0px' : '0',
        fontWeight: 800,
        fontSize: screenWidth > 640 ? '24px' : '20px',
        color: selectedColorScheme[3],
      }"
      :heading="`Trade Groups`"
    />
  </div>
  <!-- trades -->
  <div class="mb-3 text-center">
    <template v-for="(option, index) in options" :key="option.name">
      <Badge
        v-if="tradesPost[option.id] === 1"
        class="my-1 mx-1 space-x-1 flex"
        :style="{
          backgroundColor:
            index % 2 === 0
              ? selectedColorScheme[4]
              : darken(selectedColorScheme[4], 30),
          fontSize: '10px',
          paddingTop: '6px',
          paddingBottom: '6px',
        }"
        >{{ option.name }}</Badge
      >
    </template>
  </div>
  <div
    v-if="region_name"
    class="flex items-center justify-center w-full gap-2 xs:gap-4 mt-2 sm:mt-0"
    :style="{
      color: selectedColorScheme[2],
    }"
  >
    <div class="flex items-center">
      <v-tooltip text="Region" location="top">
        <template v-slot:activator="{ props }">
          <Icon
            v-bind="props"
            class="w-6 h-6 sm:w-8 sm:h-8"
            icon="mdi:location"
            :color="selectedColorScheme[3]"
          />
        </template>
      </v-tooltip>
      <div class="font-bold text-sm xs:text-base sm:text-lg ml-1 xs:ml-2">
        Region :
      </div>
      <div class="text-xs xs:text-sm sm:text-base translate-y-[0px] ml-2">
        {{ region_name }}
      </div>
    </div>
  </div>
</template>
<script setup>
import Badge from "@/Components/Ratings/Badge.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import { Icon } from "@iconify/vue";

import { options } from "@/helpers/selectListsHelpters.js";
import { darken } from "@/helpers/utilities.js";
import { Link } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";
import { computed, ref, reactive } from "vue";
import { template1Default } from "@/helpers/templateDefaults";

// State
const props = defineProps({
  profile: Object,
  region_name: String,

  screenWidth: Number,
});
const store = useStore();
const region_name = ref(props.region_name ?? "");
const iconColor = ref("#241e6d");
const tradesPost = reactive({
  trade1: props.profile.trade1,
  trade2: props.profile.trade2,
  trade3: props.profile.trade3,
  trade4: props.profile.trade4,
  trade5: props.profile.trade5,
  trade6: props.profile.trade6,
  trade7: props.profile.trade7,
  trade8: props.profile.trade8,
  trade9: props.profile.trade9,
  trade10: props.profile.trade10,
  trade11: props.profile.trade11,
  trade12: props.profile.trade12,
  trade13: props.profile.trade13,
  trade14: props.profile.trade14,
  trade15: props.profile.trade15,
  trade16: props.profile.trade16,
  trade17: props.profile.trade17,
  trade18: props.profile.trade18,
  trade19: props.profile.trade19,
  trade20: props.profile.trade20,
  trade21: props.profile.trade21,
  trade22: props.profile.trade22,
  trade23: props.profile.trade23,
  trade24: props.profile.trade24,
  trade25: props.profile.trade25,
  trade26: props.profile.trade26,
  trade27: props.profile.trade27,
  trade28: props.profile.trade28,
  trade29: props.profile.trade29,
  trade30: props.profile.trade30,
  // trade24: props.profile.trade24,
});

// Computed

const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme || template1Default
);
const filteredOptions = computed(() => {
  return options.filter((option) => tradesPost[option.id] === 1);
});

//Methods
</script>

<style scoped>
.switch-post {
  cursor: pointer;
  width: 30px;
  height: 15px;
  position: relative;
}
.switch-bg-on-post,
.switch-bg-off-post {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: background-color 0.2s;
}
.switch-bg-on-post {
  background-color: rgba(36, 30, 109, 1);
  width: 30px;
}
.switch-bg-off-post {
  background-color: #ccc;
  width: 29px;
}
.switch-knob-on-post,
.switch-knob-off-post {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 1px;
  transition: left 0.2s;
}
.switch-knob-on-post {
  left: 16px;
}
.switch-knob-off-post {
  left: 1px;
}
</style>
