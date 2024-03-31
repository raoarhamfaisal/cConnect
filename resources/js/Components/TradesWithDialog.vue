<template>
  <teleport to="body">
    <CustomDialog
      :showFooter="false"
      :disableOutSideClick="false"
      ref="tradeDialogRef"
      title="Trades"
    >
      <template v-for="(option, index) in options" :key="option.name">
        <Badge
          v-if="modelValue[option.id]"
          class="my-1 mx-1 space-x-1 flex"
          :style="{
            backgroundColor: index % 2 ? '#5f3dc4' : '#364fc7',
            fontSize: '10px',
            paddingTop: '6px',
            paddingBottom: '6px',
          }"
          >{{ option.name }}</Badge
        >
      </template>
    </CustomDialog>
  </teleport>

  <div
    class="cursor-pointer flex items-center gap-1 sm:gap-2"
    @click="openTradeDialog"
  >
    <template v-if="firstTrade">
      <Badge
        class="flex"
        :style="{
          backgroundColor: '#364fc7',
          fontSize: '10px',
          paddingTop: screenWidth > 640 ? '6px' : '4px',
          paddingBottom: screenWidth > 640 ? '6px' : '4px',
        }"
      >
        {{ firstTrade.name }}
      </Badge>
    </template>
    <span
      v-if="tradesCount > 1"
      class="text-base sm:text-xl font-semibold flex"
    >
      +{{ tradesCount - 1 }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { options } from "@/helpers/selectListsHelpters.js";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { useStore } from "vuex";
import Badge from "@/Components/Ratings/Badge.vue";

const props = defineProps({
  modelValue: Object,
});

const tradeDialogRef = ref();
const store = useStore();
const emit = defineEmits(["update:modelValue"]);
const firstTrade = computed(() => {
  return options.find(
    (option) =>
      props.modelValue[option.id] === true || props.modelValue[option.id] === 1
  );
});
const tradesCount = computed(() => {
  return options.filter(
    (option) =>
      props.modelValue[option.id] === true || props.modelValue[option.id] === 1
  ).length;
});
const screenWidth = computed(() => store.getters.screenWidth);

const openTradeDialog = () => {
  tradeDialogRef.value.openDialog();
};

// When the modelValue changes, we'll emit an update to the parent
watchEffect(() => {
  emit("update:modelValue", props.modelValue);
});
</script>
