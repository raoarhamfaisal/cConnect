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
    <!-- Average Ratings End-->
    <!-- Average Ratings -->

    <div class="bg-gray-200 mt-10">
      <Card :shadowLevel="2" bgColor="white" padding="20px">
        <ContractorInfo :contractor="contractor" />
        <heading-card heading="Average Ratings" class="mb-12" />
        <AverageRating class="mb-12" />
        <!-- Filters -->
        <div class="border-t-2 border-gray-300">
          <heading-card class="mt-6" heading="Order Reviews By" />
          <div class="mb-12">
            <div class="flex gap-3">
              <Button @onSelect="handleSelect">Latest</Button>
              <Button @onSelect="handleSelect">Oldest</Button>
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
          <!-- <Loader :loading="true" background="white" height="50vh"></Loader> -->

          <div v-if="reviews.length > 0" class="flex gap-8 flex-col">
            <QuestionsReview
              v-for="(review, index) in reviews"
              :key="index"
              :review="review"
              :contractor="contractor"
            />
          </div>
          <div v-if="reviews.length === 0">
            <div
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No reviews Available for this Contractor
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Reviews End-->
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import QuestionsReview from "./PartialsPersonal/QuestionsReview.vue";
import { Head } from "@inertiajs/inertia-vue3";
import AverageRating from "./PartialsVisiting/AverageRating.vue";
import Button from "./components/Button.vue";
import HeadingCard from "./components/HeadingCard.vue";
import Card from "@/Components/Card.vue";
// import Loader from "./components/Loader.vue";
import ContractorInfo from "./PartialsVisiting/ContractorInfo.vue";

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
import { ref } from "vue";

// State
const reviews = [
  {
    reviewer: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      company: "John Company",
      city: "McKinney",
      state: "TX",
      profilePic:
        "http://0.0.0.0/images/avatars/e63Uf6DrgCqMTzQId2cCm5wF5vwtmBmOBvAPqrAC.jpg",
    },
    rating: 4.5,
    date: "03/03/2023",
    reviewText:
      "Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, dolores debitis! Repellat quasi sit placeat, assumenda distinctio laborum nihil quaerat veniam, dolore enim voluptatum. Sequi nihil libero animi illo ad?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ut vero facere laborum sequi ducimus ullam itaque culpa harum! Et iste consequatur doloribus repudiandae. Temporibus adipisci vel ipsa inventore saepe?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quod corrupti iusto. Enim sint hic molestias voluptates est vitae, blanditiis iure saepe possimus quasi, distinctio laudantium consequuntur. Facere, doloremque vitae. ",
    isUnderAppeal: 0,
    questions: [
      {
        id: 1,
        question: "Were you hired by this contractor?",
        questionAnswer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
      },
      {
        id: 2,
        question: "Were you paid onetime?",
        questionAnswer:
          "Ut vehicula risus a auctor lacinia. Proin vitae faucibus est, vitae tincidunt orci.",
      },
      {
        id: 3,
        question: "Did you hire this contractor?",
        questionAnswer:
          "Pellentesque nec purus felis. Vivamus condimentum sem vel nunc cursus, quis congue neque rutrum.",
      },
      {
        id: 4,
        question: "Did you pay them?",
        questionAnswer:
          "Mauris posuere ligula ut quam pharetra, at pulvinar libero posuere.",
      },
      {
        id: 5,
        question: "How did you meet this contractor?",
        questionAnswer:
          "Curabitur non eros non ante vestibulum euismod. Fusce et facilisis urna.",
      },
    ],
    response: {
      id: 5,
      date: "04/03/2023",
      responseText:
        "Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, dolores debitis! Repellat quasi sit placeat, assumenda distinctio laborum nihil quaerat veniam, dolore enim voluptatum. Sequi nihil libero animi illo ad?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ut vero facere laborum sequi ducimus ullam itaque culpa harum! Et iste consequatur doloribus repudiandae. Temporibus adipisci vel ipsa inventore saepe?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quod corrupti iusto. Enim sint hic molestias voluptates est vitae, blanditiis iure saepe possimus quasi, distinctio laudantium consequuntur. Facere, doloremque vitae.",
    },
  },
  {
    reviewer: {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      company: "John Company",
      city: "McKinney",
      state: "TX",
      profilePic:
        "http://0.0.0.0/images/avatars/e63Uf6DrgCqMTzQId2cCm5wF5vwtmBmOBvAPqrAC.jpg",
    },
    rating: 4.3,
    date: "03/03/2023",
    reviewText: "Lorem ipsum dolor sit amet consectetur...",
    isUnderAppeal: 1,
    questions: [
      {
        id: 1,
        question: "Were you hired by this contractor?",
        questionAnswer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
      },
      {
        id: 2,
        question: "Were you paid onetime?",
        questionAnswer:
          "Ut vehicula risus a auctor lacinia. Proin vitae faucibus est, vitae tincidunt orci.",
      },
      {
        id: 3,
        question: "Did you hire this contractor?",
        questionAnswer:
          "Pellentesque nec purus felis. Vivamus condimentum sem vel nunc cursus, quis congue neque rutrum.",
      },
      {
        id: 4,
        question: "Did you pay them?",
        questionAnswer:
          "Mauris posuere ligula ut quam pharetra, at pulvinar libero posuere.",
      },
      {
        id: 5,
        question: "How did you meet this contractor?",
        questionAnswer:
          "Curabitur non eros non ante vestibulum euismod. Fusce et facilisis urna.",
      },
    ],
  },
  {
    reviewer: {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      company: "John Company",
      city: "McKinney",
      state: "TX",
      profilePic:
        "http://0.0.0.0/images/avatars/I3UQW3tApC1DHTE8Onj9IT060vVGZZBWZEaEIRX2",
    },
    rating: 4.3,
    date: "03/03/2023",
    questions: [
      {
        id: 1,
        question: "Were you hired by this contractor?",
        questionAnswer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
      },
      {
        id: 2,
        question: "Were you paid onetime?",
        questionAnswer:
          "Ut vehicula risus a auctor lacinia. Proin vitae faucibus est, vitae tincidunt orci.",
      },
      {
        id: 3,
        question: "Did you hire this contractor?",
        questionAnswer:
          "Pellentesque nec purus felis. Vivamus condimentum sem vel nunc cursus, quis congue neque rutrum.",
      },
      {
        id: 4,
        question: "Did you pay them?",
        questionAnswer:
          "Mauris posuere ligula ut quam pharetra, at pulvinar libero posuere.",
      },
      {
        id: 5,
        question: "How did you meet this contractor?",
        questionAnswer:
          "Curabitur non eros non ante vestibulum euismod. Fusce et facilisis urna.",
      },
    ],
    reviewText:
      "Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, dolores debitis! Repellat quasi sit placeat, assumenda distinctio laborum nihil quaerat veniam, dolore enim voluptatum. Sequi nihil libero animi illo ad?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ut vero facere laborum sequi ducimus ullam itaque culpa harum! Et iste consequatur doloribus repudiandae. Temporibus adipisci vel ipsa inventore saepe?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quod corrupti iusto. Enim sint hic molestias voluptates est vitae, blanditiis iure saepe possimus quasi, distinctio laudantium consequuntur. Facere, doloremque vitae.",
    isUnderAppeal: 1,
  },

  // ... more reviews
];
const contractor = {
  id: 2,
  firstName: "John",
  lastName: "Doe",
  company: "Contractor Company",
  city: "McKinney",
  state: "MX",
  profilePic:
    "http://0.0.0.0/images/avatars/I3UQW3tApC1DHTE8Onj9IT060vVGZZBWZEaEIRX2.png",
};
</script>

<style scoped></style>
