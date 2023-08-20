<template>
  <Head title="Ratings" />

  <Header
    :profile="profile"
    :posts="posts"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <!-- Average Ratings End-->
    <!-- Average Ratings -->

    <div class="bg-gray-200 mt-10">
      <Card :shadowLevel="2" bgColor="white" padding="20px">
        <heading-card heading="Average Ratings" class="mb-12" />

        <AverageRating class="mb-12" />
        <!-- Filters -->
        <div class="border-t-2 border-gray-300">
          <heading-card class="mt-6" heading="Filter Reviews By" />
          <div class="mb-12">
            <div class="flex gap-3">
              <Button @onSelect="handleSelect">Latest</Button>
              <Button @onSelect="handleSelect">Oldest</Button>
              <Button @onSelect="handleSelect">A-Z</Button>
              <Button @onSelect="handleSelect">Z-A</Button>
            </div>
          </div>
        </div>
        <!-- RAting -->
        <div class="mb-12 mt-12 border-t-2 border-gray-300">
          <heading-card heading="Ratings" class="mt-6" />
          <div class="flex gap-3">
            <div class="flex gap-3">
              <Button @onSelect="handleSelect">Highest rated</Button>
              <Button @onSelect="handleSelect">Middle Rated</Button>
              <Button @onSelect="handleSelect">Low Rated</Button>
            </div>
          </div>
        </div>
        <div class="mb-12 border-t-2 border-gray-300 mt-12">
          <heading-card heading="Top Reviews" class="mt-6 mb-12" />
          <Review />
        </div>
      </Card>
    </div>

    <!-- Reviews End-->
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import Review from "./Partials/Review.vue";
import { Head } from "@inertiajs/inertia-vue3";
import AverageRating from "./Partials/AverageRating.vue";
import Heading from "./components/HeadingOutSideCard.vue";
import Button from "./components/Button.vue";
import HeadingCard from "./components/HeadingCard.vue";
import Card from "@/Components/Card.vue";

defineProps({
  profile: Object,
  posts: Object,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
</script>

<style></style>
