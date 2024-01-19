<template>
  <div class="flex space-x-2 justify-between">
    <div class="flex justify-center items-center space-x-2">
      <div>
        <Avatar :imageSrc="contractor.profilePic" />
      </div>
      <div class="flex flex-col justify-center">
        <h2
          class="text-xl font-medium font-bold text-gray-900 dark:text-gray-100"
        >
          {{ contractor.firstName + " " + contractor.lastName }}
        </h2>
        <div v-if="contractor.company">{{ contractor.company }}</div>
        <span v-if="contractor.city || contractor.state">{{
          contractor.city + " " + contractor.state
        }}</span>
      </div>
    </div>
  </div>
  <div class="mb-8 mt-4">
    <Badge
      v-for="(option, index) in options"
      :key="option.name"
      class="my-1 mx-1 space-x-1 flex"
      :style="{
        backgroundColor: index % 2 === 0 ? '#5f3dc4' : '#364fc7',
        fontSize: '13px',
      }"
      >{{ option.name }}</Badge
    >
  </div>
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import Badge from "@/Components/Ratings/Badge.vue";
defineProps(["contractor"]);
const options = [
  { id: "trade1", name: "Supplier & Advertiser (all trades)" },
  { id: "trade2", name: "Construction & Remodeling" },
  { id: "trade5", name: "Landscape" },
  { id: "trade6", name: "Earthworks, Drives & Parking Lots" },
  { id: "trade7", name: "Roofing & Solar" },
  { id: "trade8", name: "Gutters, Siding & Fencing" },
];
</script>
