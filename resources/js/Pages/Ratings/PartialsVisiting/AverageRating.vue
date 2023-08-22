<template>
  <!-- <ProgressBar :width="75" filledColor="blue" unfilledColor="lightgrey" /> -->

  <section>
    <div class="flex gap-4">
      <div
        class="sm:text-8xl text-8xl flex justify-center items-center font-sans font-bold text-gray-600"
      >
        {{ averageRating.toFixed(1) }}
      </div>
      <div class="w-full">
        <div
          v-for="progress in starProgress"
          :key="progress.star"
          class="star-row"
        >
          <div class="star-number">{{ progress.star }}</div>
          <ProgressBar
            :width="progress.width"
            filledColor="#ff8800"
            unfilledColor="lightgrey"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center space-y-2">
      <div>
        <StarRating
          :rating="+averageRating.toFixed(1)"
          :isIndicatorActive="false"
        />
      </div>
      <span class="ml-6">{{ reviews.length }} reviews</span>
    </div>
  </section>
</template>

<script setup>
import ProgressBar from "@/Components/Ratings/ProgressBar.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";

const reviews = [4.2, 4.3, 4.5, 3.2, 4.1, 2, 1, 4.3, 4.1, 3.5, 4.8];

const totalReviews = reviews.length;

// Calculate the average rating
const averageRating =
  reviews.reduce((sum, rating) => sum + rating) / totalReviews;

// Function to determine the star category based on the rating
function getStarCategory(rating) {
  if (rating >= 4.1) return 5;
  if (rating >= 3.1) return 4;
  if (rating >= 2.1) return 3;
  if (rating >= 1.1) return 2;
  return 1;
}

const starProgress = Array(5)
  .fill(0)
  .map((_, index) => {
    const starRating = 5 - index; // Starts with 5 and goes down to 1
    const count = reviews.filter(
      (rating) => getStarCategory(rating) === starRating
    ).length;
    return {
      star: starRating,
      width: (count / totalReviews) * 100,
    };
  });

console.log("Average Rating:", averageRating.toFixed(2));
console.log("Star Progress:", starProgress);
const handleSelect = (selected) => {
  console.log(selected);
};
</script>
<style scoped>
.star-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.star-number {
  margin-right: 15px;
  font-weight: bold;
}
</style>
