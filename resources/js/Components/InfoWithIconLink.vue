<template>
  <a target="_blank" :href="absoluteUrl(link)">
    <div v-if="link" class="flex items-center w-full gap-2 xs:gap-4">
      <v-tooltip :text="tooltipText" location="top">
        <template v-slot:activator="{ props }">
          <Icon
            v-if="icon"
            v-bind="props"
            :icon="icon"
            :color="iconColor"
            :class="`${iconClasses}`"
          />
          <img v-else-if="imgPath" :src="imgPath" :class="`${imgClasses}`" />
        </template>
      </v-tooltip>

      <div :class="`hover:underline text-sm ${textClasses}`">
        {{ translations && translations.follow_us_on }} {{ tooltipText }}
      </div>
    </div>
  </a>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  icon: {
    type: String,
    required: false,
  },
  imgPath: {
    type: String,
    required: false,
  },
  iconColor: {
    type: String,
    default: "#241e6d",
  },
  imgClasses: {
    type: String,
    default: "",
  },
  iconClasses: {
    type: String,
    default: "",
  },
  textClasses: {
    type: String,
    default: "",
  },
  tooltipText: {
    type: String,
    required: true,
  },
  link: {
    type: [String, Number, null],
    required: true,
  },
});
const absoluteUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  } else {
    // Here you can decide on a default protocol. Assuming "http://" for simplicity
    return `http://${url}`;
  }
};
const store = useStore();
const translations = computed(() => store.getters.translations);
</script>

<style scoped>
/* If you have any styles specific to this component, place them here */
</style>
