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
        <StarRating
          :rating="+contractor.averageRating.toFixed(1)"
          :isIndicatorActive="true"
          :starWidth="15"
          :starHeight="15"
          indicatorClasses="text-small font-normal"
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
