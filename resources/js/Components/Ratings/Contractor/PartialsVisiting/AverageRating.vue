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
          v-for="(progress, index) in starPercentages"
          :key="index"
          class="star-row"
        >
          <div class="star-number">{{ 5 - index }}</div>
          <ProgressBar
            :width="progress"
            filledColor="#ff8800"
            unfilledColor="lightgrey"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="flex justify-between">
        <div class="flex flex-col justify-center space-y-2">
          <div>
            <StarRating
              :rating="Number(averageRating.toFixed(1))"
              :isIndicatorActive="false"
            />
          </div>
          <span class="ml-6 lowercase"
            >{{ length }} {{ translations && translations.reviews }}</span
          >
        </div>
        <div v-if="contractorId" class="self-end">
          <Link :href="`/ratings/${contractorId}`">
            <button
              class="bg-white px-4 py-1 text-sm uppercase font-bold rounded-full border-[#1864ab] border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95"
            >
              {{ translations && translations.see_ratings }}
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProgressBar from "@/Components/Ratings/ProgressBar.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";
import { Link } from "@inertiajs/inertia-vue3";
defineProps({
  averageRating: {
    type: Number,
    default: 0,
  },
  length: {
    type: Number,
    default: 0,
  },
  starPercentages: {
    type: Array,
    default: [],
  },
  contractorId: {
    type: [String, Number],
    default: "",
  },
});
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
