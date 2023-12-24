<template>
  <div class="flex space-x-2 justify-between">
    <div class="flex justify-center items-center space-x-2">
      <div>
        <Avatar :imageSrc="`/${contractor.user_avatar}`" />
      </div>
      <div class="flex flex-col justify-center">
        <h2 class="text-xl font-medium font-bold text-gray-900">
          {{ contractor.first_name + " " + contractor.last_name }}
        </h2>
        <div v-if="contractor.company_name">{{ contractor.company_name }}</div>
        <StarRating
          v-if="contractor.average_rating"
          :rating="Number(parseFloat(contractor.average_rating).toFixed(1))"
          :isIndicatorActive="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";

defineProps(["contractor"]);
</script>

<style setup>
.text-small {
  font-size: 14px;
  transform: translateY(2px);
}
</style>
