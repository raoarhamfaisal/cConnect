<template>
  <div class="flex space-x-2 justify-between">
    <div class="flex justify-center items-center space-x-2">
      <div>
        <Avatar :imageSrc="review.reviewer.profilePic" />
      </div>
      <div class="flex flex-col justify-center">
        <h2
          class="text-xl font-medium font-bold text-gray-900 dark:text-gray-100"
        >
          {{ review.reviewer.firstName }} {{ review.reviewer.lastName }}
        </h2>
        <div>{{ review.reviewer.company }}</div>
        <span v-if="review.reviewer.city || review.reviewer.state">{{
          `${review.reviewer.city} ${review.reviewer.state}`
        }}</span>
      </div>
    </div>
    <div v-if="review.isUnderAppeal === 1">
      <Badge class="bg-orange-500">Under Appeal</Badge>
    </div>
  </div>
  <div>
    <div class="mt-3 mb-2 ml-1 flex items-center space-x-4">
      <StarRating :rating="4.5" :isIndicatorActive="true" />
      <div class="font-bold flex justify-center items-center text-xl">
        {{ review.date }}
      </div>
    </div>
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
    <div class="mt-1">
      <p class="p-2 text-lg">
        {{
          showFullReview
            ? review.rating_reason
            : review.rating_reason.substring(0, 400) +
              (review.rating_reason.length > 400 ? "..." : "")
        }}
        <span
          v-if="!showFullReview && review.rating_reason.length > 400"
          @click="showFullReview = true"
          class="cursor-pointer text-sky-700"
        >
          See more
        </span>
        <span
          v-if="showFullReview && review.rating_reason.length > 400"
          @click="showFullReview = false"
          class="cursor-pointer text-sky-700"
        >
          See less
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";
import Badge from "@/Components/Ratings/Badge.vue";
import { ref } from "vue";
defineProps(["review", "contractor"]);
const options = [
  { id: "trade1", name: "Supplier & Advertiser (all trades)" },
  { id: "trade2", name: "Construction & Remodeling" },
  { id: "trade5", name: "Landscape" },
  { id: "trade6", name: "Earthworks, Drives & Parking Lots" },
];
const showFullReview = ref(false);
</script>
