<template>
  <div
    @click="showNote = !showNote"
    class="cursor-pointer bg-[#f8f9fa] border-round pl-1 pr-2 sm:px-3 py-2 border-l-4"
    :style="{ borderColor: iconColor, transition: 'all 0.3s' }"
  >
    <div class="flex items-center">
      <div
        class="rounded-full px-1 py-1 sm:px-2 sm:py-2 flex items-center inline-block"
        :style="{ backgroundColor: iconBackgroundColor }"
      >
        <Icon
          :icon="icon"
          :color="iconColor"
          :width="iconSize"
          :height="iconSize"
        />
      </div>
      <div class="flex justify-between items-center grow">
        <div class="ml-1 sm:ml-3 text-sm sm:text-lg text-[#495057] font-bold">
          {{ text }}
          <span class="font-medium text-[#868e96]" :style="fontSizeStyle">{{
            formattedDate
          }}</span>
        </div>
        <div>
          <Icon
            icon="ps:right"
            color="#868e96"
            :width="accordionIconSize"
            :height="accordionIconSize"
            :rotate="1"
          />
        </div>
      </div>
    </div>
    <transition name="accordion">
      <div v-if="showNote" class="text-xs sm:text-sm mx-8 sm:mx-14 my-2 p-1">
        {{ reason }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { formatDateTime } from "@/helpers/utilities";
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted } from "vue";

const { icon, iconColor, date, text, reason, accordionIconColor } = defineProps(
  {
    icon: String,
    iconColor: String,
    date: String,
    text: String,
    reason: String,
    iconBackgroundColor: String,
  }
);

const screenWidth = ref(window.innerWidth);
const showNote = ref(false);

const iconSize = ref(screenWidth.value < 640 ? 20 : 30);
const accordionIconSize = ref(screenWidth.value < 640 ? 20 : 24);
const fontSizeStyle = ref({
  fontSize: screenWidth.value < 640 ? "10px" : "14px",
  lineHeight: "1.5rem",
});

const updateWidth = () => {
  screenWidth.value = window.innerWidth;
  iconSize.value = screenWidth.value < 640 ? 20 : 30;
  accordionIconSize.value = screenWidth.value < 640 ? 20 : 24;
  fontSizeStyle.value = {
    fontSize: screenWidth.value < 640 ? "10px" : "14px",
    lineHeight: "1.5rem",
  };
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

const formattedDate = formatDateTime(date); // Format this as you like, similar to the date format function we discussed earlier
</script>
<style scoped>
.border-round:first-child {
  border-top-right-radius: 0.5rem;
}
.border-round:last-child {
  border-bottom-right-radius: 0.5rem;
}
</style>
