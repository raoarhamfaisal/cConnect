<template>
  <Head title="Ratings" />

  <Header
    :profile="profile"
    :posts="posts"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="true"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div class="bg-gray-200 mt-10">
      <Card :shadowLevel="2" bgColor="white" padding="20px">
        <heading-card heading="All Contractors" class="mt-3 mb-6" />
        <div class="flex flex-col" v-if="contractors.length > 0">
          <Link
            v-for="(contractor, index) in contractors"
            :key="index"
            :href="`/admin/ratings/${contractor.id}`"
            class="hover:bg-[#f8f9fa] hover:rounded"
          >
            <contractor
              class="border-b-2 py-2 border-gray-200 cursor-pointer"
              :contractor="contractor"
            />
          </Link>
        </div>
        <div v-if="contractors.length === 0">
          <div
            class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
          >
            No Contractors Available
          </div>
        </div>
      </Card>
    </div>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";
import Card from "@/Components/Card.vue";
import { Link } from "@inertiajs/inertia-vue3";
import Contractor from "./partials/AllContractors/Contractor.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";

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
const contractors = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    company: "John Company",
    averageRating: 3.5,
    profilePic:
      "http://0.0.0.0/images/avatars/e63Uf6DrgCqMTzQId2cCm5wF5vwtmBmOBvAPqrAC.jpg",
  },
  {
    id: 2,
    firstName: "Smith",
    lastName: "Smith",
    company: "Smith Company",
    averageRating: 4.5,
    profilePic:
      "http://0.0.0.0/images/avatars/e63Uf6DrgCqMTzQId2cCm5wF5vwtmBmOBvAPqrAC.jpg",
  },
  {
    id: 3,
    firstName: "Smith",
    lastName: "Doe",
    company: "Smith Company",
    averageRating: 3.5,
    profilePic:
      "http://0.0.0.0/images/avatars/e63Uf6DrgCqMTzQId2cCm5wF5vwtmBmOBvAPqrAC.jpg",
  },
];
</script>
