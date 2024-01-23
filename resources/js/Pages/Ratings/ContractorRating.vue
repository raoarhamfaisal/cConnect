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
        <ContractorInfo :contractor="contractor" />
        <heading-card heading="Average Ratings" class="mb-12" />
        <AverageRating class="mb-12" />
        <!-- Filters -->
        <div class="border-t-2 border-gray-300">
          <heading-card class="mt-6" heading="Order Reviews By" />
          <div class="xs:mb-12 mb-6">
            <div class="flex gap-3">
              <Button @onSelect="handleSelect">Latest</Button>
              <Button @onSelect="handleSelect">Oldest</Button>
            </div>
          </div>
        </div>
        <!-- RAting -->
        <div class="xs:mb-12 mb-6 xs:mt-12 mt-7 border-t-2 border-gray-300">
          <heading-card heading="Ratings" class="mt-6" />
          <div class="flex gap-3">
            <div class="flex gap-3">
              <Button @onSelect="handleSelect">Highest rated</Button>
              <Button @onSelect="handleSelect">Middle Rated</Button>
              <Button @onSelect="handleSelect">Low Rated</Button>
            </div>
          </div>
        </div>
        <div class="xs:mb-12 mb-6 xs:mt-12 mt-7 border-t-2 border-gray-300">
          <heading-card heading="Top Reviews" class="mt-6 mb-12" />
          <!-- <Loader :loading="true" background="white" height="50vh"></Loader> -->

          <div v-if="reviews.length > 0" class="flex gap-8 flex-col">
            <ReviewResponse
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
        <div class="py-4 border-t-2 border-b-2 border-gray-300">
          <Button
            ref="cardRef"
            @onSelect="handleSelect"
            :style="{
              boxShadow:
                '0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
            }"
            class="w-full text-2xl text-left rounded-lg"
            >Write a review</Button
          >
          <transition name="accordion">
            <Card
              v-if="showCard"
              :shadowLevel="1"
              bgColor="white"
              padding="10px"
              class="mt-8"
            >
              <transition name="accordion">
                <GiveRating />
              </transition>
            </Card>
          </transition>
        </div>
      </Card>
    </div>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import ReviewResponse from "./PartialsVisiting/ReviewResponse.vue";
import { Head } from "@inertiajs/inertia-vue3";
import AverageRating from "./PartialsVisiting/AverageRating.vue";
import Button from "@/Components/Ratings/Button.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Card from "@/Components/Card.vue";
// import Loader from "./components/Loader.vue";
import ContractorInfo from "./PartialsVisiting/ContractorInfo.vue";
import GiveRating from "./PartialsVisiting/GiveRating.vue";

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
import { ref, nextTick } from "vue";

// State
const showCard = ref(false);
const cardRef = ref(null);

// Methods
const handleSelect = async () => {
  showCard.value = !showCard.value;

  if (showCard.value) {
    // Wait for the DOM update
    await nextTick();

    setTimeout(() => {
      if (
        cardRef.value &&
        cardRef.value.$el &&
        cardRef.value.$el.scrollIntoView
      ) {
        console.log("here2");
        const elementToScroll = cardRef.value.$el || cardRef.value;
        elementToScroll.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      } else {
        console.error("Unexpected issue with the ref");
      }
    }, 250);
  }
};
const reviews = [
  {
    reviewId: 1,
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
    onAppeal: {
      reason:
        "Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ips lorem. Lorem Ipsum",
      date: "03/03/2023",
    },
    offAppeal: {
      reason:
        "Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ips lorem. Lorem Ipsum",
      date: "03/03/2023",
    },
    rating_reason:
      "Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, dolores debitis! Repellat quasi sit placeat, assumenda distinctio laborum nihil quaerat veniam, dolore enim voluptatum. Sequi nihil libero animi illo ad?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ut vero facere laborum sequi ducimus ullam itaque culpa harum! Et iste consequatur doloribus repudiandae. Temporibus adipisci vel ipsa inventore saepe?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quod corrupti iusto. Enim sint hic molestias voluptates est vitae, blanditiis iure saepe possimus quasi, distinctio laudantium consequuntur. Facere, doloremque vitae. ",
    isUnderAppeal: 0,
    questionsSwitch: [
      {
        id: 1,
        question: "I Hired Contractor",
        questionAnswer: 1,
      },
      {
        id: 2,
        question: "Contractor hired me",
        questionAnswer: 0,
      },
      {
        id: 3,
        question: "Paid on time",
        questionAnswer: 1,
      },
      {
        id: 4,
        question: "Give full  payment",
        questionAnswer: 1,
      },
    ],
    selectedReferal: ["Friend Referral"],
  },
  {
    reviewId: 2,
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
    rating_reason: "Lorem ipsum dolor sit amet consectetur...",
    isUnderAppeal: 1,
    onAppeal: {
      reason:
        "Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ips lorem. Lorem Ipsum",
      date: "03/03/2023",
    },
    questionsSwitch: [
      {
        id: 1,
        question: "Were you hired by this contractor?",
        questionAnswer: 1,
      },
      {
        id: 2,
        question: "Were you paid onetime?",
        questionAnswer: 0,
      },
      {
        id: 3,
        question: "Did you hire this contractor?",
        questionAnswer: 1,
      },
      {
        id: 4,
        question: "Did you give full  payment",
        questionAnswer: 1,
      },
    ],
    selectedReferal: ["Friend R"],
  },
  {
    reviewId: 3,
    reviewer: {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      company: "John Company",
      city: "McKinney",
      state: "TX",
      profilePic:
        "http://0.0.0.0/images/avatars/I3UQW3tApC1DHTE8Onj9IT060vVGZZBWZEaEIRX2.jpg",
    },
    rating: 4.3,
    date: "03/03/2023",
    rating_reason:
      "Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, dolores debitis! Repellat quasi sit placeat, assumenda distinctio laborum nihil quaerat veniam, dolore enim voluptatum. Sequi nihil libero animi illo ad?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ut vero facere laborum sequi ducimus ullam itaque culpa harum! Et iste consequatur doloribus repudiandae. Temporibus adipisci vel ipsa inventore saepe?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quod corrupti iusto. Enim sint hic molestias voluptates est vitae, blanditiis iure saepe possimus quasi, distinctio laudantium consequuntur. Facere, doloremque vitae.",
    isUnderAppeal: 1,
    response: {
      id: 1,
      date: "04/03/2023",
      response_text:
        "Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, dolores debitis! Repellat quasi sit placeat, assumenda distinctio laborum nihil quaerat veniam, dolore enim voluptatum. Sequi nihil libero animi illo ad?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis ut vero facere laborum sequi ducimus ullam itaque culpa harum! Et iste consequatur doloribus repudiandae. Temporibus adipisci vel ipsa inventore saepe?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quod corrupti iusto. Enim sint hic molestias voluptates est vitae, blanditiis iure saepe possimus quasi, distinctio laudantium consequuntur. Facere, doloremque vitae.",
    },
    questionsSwitch: [
      {
        id: 1,
        question: "Were you hired by this contractor?",
        questionAnswer: 1,
      },
      {
        id: 2,
        question: "Were you paid onetime?",
        questionAnswer: 0,
      },
      {
        id: 3,
        question: "Did you hire this contractor?",
        questionAnswer: 1,
      },
      {
        id: 4,
        question: "Did you give full  payment",
        questionAnswer: 1,
      },
    ],
    selectedReferal: ["Friend Referral"],
  },

  // ... more reviews
];
const contractor = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  company: "Contractor Company",
  city: "McKinney",
  state: "MX",
  profilePic:
    "http://0.0.0.0/images/avatars/I3UQW3tApC1DHTE8Onj9IT060vVGZZBWZEaEIRX2.png",
};
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.accordion-enter-from, .accordion-leave-to /* .accordion-leave-active in <2.1.8 */ {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 300px; /* This value might need to be adjusted depending on the expected max height of your content */
  opacity: 1;
}
</style>
