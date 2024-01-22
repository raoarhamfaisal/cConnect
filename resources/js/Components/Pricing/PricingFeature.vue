<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";

const props = defineProps({
  featureText: {
    type: String,
  },
  bgColor: {
    type: String,
  },
  freeText: {
    type: [String, Number, Boolean],
  },
  goldText: {
    type: [String, Number, Boolean],
  },
  platinumText: {
    type: [String, Number, Boolean],
  },
  pageName: {
    type: String,
    default: "pricing",
  },
});

const store = useStore();

const userVersion = computed(() => store.getters.userVersion);
const screenWidth = computed(() => store.getters.screenWidth);

const notPricingPageAndDesktop = computed(
  () =>
    props.pageName !== "pricing" &&
    screenWidth.value > 768 &&
    screenWidth.value < 1200
);

const notFreeVersion = computed(
  () => userVersion.value !== 0 && userVersion.value !== 1
);
</script>
<template>
  <!-- For Desktop -->
  <div :class="`flex gap-2 `" v-if="screenWidth > 768">
    <div class="w-[55%] text-xl text-end font-semibold">
      {{ props.featureText }}
    </div>
    <!-- Free -->
    <div
      v-if="userVersion === 1 || userVersion === 0"
      class="w-[15%] flex justify-center items-center"
    >
      <Icon
        color="#099268"
        width="26"
        height="26"
        v-if="props.freeText === 1"
        icon="mdi:tick-circle"
      />
      <Icon
        color="#e03131"
        width="28"
        height="28"
        v-else-if="props.freeText === 0"
        icon="clarity:remove-solid"
      />
      <div
        v-else
        :style="{
          fontSize: notPricingPageAndDesktop ? '1.2rem' : '',
        }"
        class="text-lg lg:text-2xl font-bold"
      >
        {{ props.freeText === 99 ? "Unlimited" : props.freeText }}
      </div>
    </div>
    <!-- Gold -->
    <div
      class="flex justify-center items-center"
      :style="{ width: notFreeVersion ? '22.5%' : '15%' }"
    >
      <Icon
        color="#099268"
        width="28"
        height="28"
        v-if="props.goldText === 1"
        icon="mdi:tick-circle"
      />
      <Icon
        color="#e03131"
        width="26"
        height="26"
        v-else-if="props.goldText === 0"
        icon="clarity:remove-solid"
      />
      <div
        v-else
        :style="{
          fontSize: notPricingPageAndDesktop ? '1.2rem' : '',
        }"
        class="text-lg lg:text-2xl font-bold"
      >
        {{ props.goldText === 99 ? "Unlimited" : props.goldText }}
      </div>
    </div>
    <!-- Platinium -->
    <div
      :style="{ width: notFreeVersion ? '22.5%' : '15%' }"
      class="flex justify-center items-center"
    >
      <Icon
        color="#099268"
        width="26"
        height="26"
        v-if="props.platinumText === 1"
        icon="mdi:tick-circle"
      />
      <Icon
        color="#e03131"
        width="26"
        height="26"
        v-else-if="props.platinumText === 0"
        icon="clarity:remove-solid"
      />
      <div
        v-else
        :style="{
          fontSize: notPricingPageAndDesktop ? '1.2rem' : '',
        }"
        class="text-lg lg:text-2xl font-bold"
      >
        {{ props.platinumText === 99 ? "Unlimited" : props.platinumText }}
      </div>
    </div>
  </div>
  <!-- For Mobile -->
  <div :class="` ${bgColor}`" v-else>
    <!-- Feteature TExt -->
    <div class="text-xl mb-2 text-center font-semibold">
      {{ props.featureText }}
    </div>
    <div class="grid grid-cols-3 gap-x-1">
      <!-- Free -->
      <div
        v-if="userVersion === 1 || userVersion === 0"
        class="flex justify-center items-center"
      >
        <Icon
          color="#099268"
          width="22"
          height="22"
          v-if="props.freeText === 1"
          icon="mdi:tick-circle"
        />
        <Icon
          color="#e03131"
          width="22"
          height="22"
          v-else-if="props.freeText === 0"
          icon="clarity:remove-solid"
        />
        <div v-else class="text-lg lg:text-2xl font-extrabold">
          {{ props.freeText === 99 ? "Unlimited" : props.freeText }}
        </div>
      </div>
      <!-- Gold -->
      <div class="flex justify-center items-center">
        <Icon
          color="#099268"
          width="22"
          height="22"
          v-if="props.goldText === 1"
          icon="mdi:tick-circle"
        />
        <Icon
          color="#e03131"
          width="22"
          height="22"
          v-else-if="props.goldText === 0"
          icon="clarity:remove-solid"
        />
        <div v-else class="text-lg lg:text-2xl font-extrabold">
          {{ props.goldText === 99 ? "Unlimited" : props.goldText }}
        </div>
      </div>
      <!-- Platinium -->
      <div class="flex justify-center items-center">
        <Icon
          color="#099268"
          width="22"
          height="22"
          v-if="props.platinumText === 1"
          icon="mdi:tick-circle"
        />
        <Icon
          color="#e03131"
          width="22"
          height="22"
          v-else-if="props.platinumText === 0"
          icon="clarity:remove-solid"
        />
        <div v-else class="text-lg lg:text-2xl font-extrabold">
          {{ props.platinumText === 99 ? "Unlimited" : props.platinumText }}
        </div>
      </div>
    </div>
  </div>
</template>
