<template>
  <div v-if="text" class="flex items-center w-full xs:w-1/2 gap-2 xs:gap-4">
    <v-tooltip :text="tooltipText" location="top">
      <template v-slot:activator="{ props }">
        <Icon v-bind="props" :icon="icon" color="#241e6d" />
      </template>
    </v-tooltip>
    <div class="text-sm">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  tooltipText: {
    type: String,
    required: true,
  },
  text: {
    type: [String, Number],
    required: true,
  },
});
</script>

<style scoped>
/* If you have any styles specific to this component, place them here */
</style>
