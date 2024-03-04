<template>
  <!-- Trades and Region  -->
  <Card
    :shadowLevel="2"
    bgColor="white"
    cardInnerClasses="h-full"
    :isInside="true"
    class="sm:pr-6 md:pr-6 sm:pr-2 lg:pr-8 h-auto"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <div class="flex justify-between">
      <heading-card
        class="mb-2"
        :style="{
          marginBottom: '8px',
          fontWeight: 800,
          fontSize: screenWidth > 640 ? '24px' : '20px',
        }"
        :heading="`Trade Groups`"
      />
      <!-- User Posting and Edit Button -->
      <div class="flex gap-2 sm:gap-3">
        <!-- User Postings -->
        <v-tooltip text="See User Posts" location="left">
          <template v-slot:activator="{ props }">
            <Link
              class="active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md"
              :href="`/contractor/posts/${profile.id}`"
            >
              <button
                class="xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center"
              >
                <!-- <Icon
                  v-bind="props"
                  class="w-[16px] h-[16px] xs:w-[18px] xs:h-[18px] focus:outline-none"
                  icon="mdi:post"
                  color="#1864ab"
                /> -->
                <img
                  src="/images/icons/post_b.png"
                  v-bind="props"
                  width="28"
                  height="28"
                />
              </button>
            </Link>
          </template>
        </v-tooltip>
      </div>
    </div>
    <!-- trades -->
    <div class="mb-3">
      <!-- <div class="pl-2 text-sm xs:text-md font-bold mt-2 mb-1">
        {{ profile.first_name + " " + profile.last_name }}
        {{ "'s Trades :" }}
      </div> -->
      <template v-for="(option, index) in options" :key="option.name">
        <Badge
          v-if="tradesPost[option.id] === 1"
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
    <div
      v-if="region_name"
      class="flex items-center justify-between w-full gap-2 xs:gap-4 mt-2 sm:mt-0"
    >
      <div class="flex items-center">
        <v-tooltip text="Region" location="top">
          <template v-slot:activator="{ props }">
            <Icon
              v-bind="props"
              class="w-6 h-6 sm:w-8 sm:h-8"
              icon="mdi:location"
              color="#241e6d"
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
  </Card>
</template>
<script setup>
import Badge from "@/Components/Ratings/Badge.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Card from "@/Components/Card.vue";
import { Icon } from "@iconify/vue";

import { options } from "@/helpers/selectListsHelpters.js";
import { Link } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";
import { computed, ref, watch, onMounted, reactive } from "vue";
// State
const props = defineProps({
  profile: Object,
  region_name: String,

  screenWidth: Number,
});
const store = useStore();
const referenceList = ref([]);
const region_name = ref(props.region_name ?? "");

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
});

// Computed

const regions = computed(() => store.state.ratings.allRegions);

//Watch
watch(regions, (newVal) => {
  if (newVal.length > 0) {
    console.log(regions, "regions");
    referenceList.value = regions.value.map((item) => item.name);
  }
});

// Hooks

onMounted(() => {
  store.dispatch("ratings/getRegions");
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
