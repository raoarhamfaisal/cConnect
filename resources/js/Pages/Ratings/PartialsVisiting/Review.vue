<template>
  <div class="flex space-x-2 justify-between">
    <div class="flex justify-center items-center space-x-2">
      <div>
        <Avatar :imageSrc="review.reviewer.profilePic" />
      </div>
      <div class="flex flex-col justify-center">
        <h2
          class="text-md xs:text-xl font-medium font-bold text-gray-900 dark:text-gray-100"
        >
          {{ review.reviewer.firstName }} {{ review.reviewer.lastName }}
        </h2>
        <div class="text-sm xs:text-lg">{{ review.reviewer.company }}</div>
        <span
          class="text-xs xs:text-lg"
          v-if="review.reviewer.city || review.reviewer.state"
          >{{ `${review.reviewer.city} ${review.reviewer.state}` }}</span
        >
      </div>
      <div
        v-if="screenWidth >= 1260"
        class="flex flex-col self-start ml-12"
        :style="{
          marginLeft: '20px',
        }"
      >
        <StarRating :rating="review.rating" :isIndicatorActive="true" />
        <div
          class="font-bold flex items-center text-md"
          :style="{
            transform: 'translateY(2px)',
          }"
        >
          {{ review.date }}
        </div>
      </div>
    </div>

    <!-- Edit delete with under appeal -->
    <div class="flex flex-col justify-between items-end">
      <div
        class="flex gap-2"
        v-if="
          screenWidth >= 600 &&
          nonEditableReview === false &&
          contractor.id === review.reviewer.id
        "
      >
        <!-- edit -->
        <ButtonRatings
          bgColor="bg-lime-700"
          icon="material-symbols:edit-sharp"
          @click="openEditDialog"
          >Edit</ButtonRatings
        >

        <ButtonRatings
          bgColor="bg-red-500"
          icon="ic:baseline-delete"
          @click="openDeleteDialog"
          >Delete</ButtonRatings
        >
      </div>
      <Badge class="bg-orange-500" v-if="review.isUnderAppeal === 1"
        >Under Appeal</Badge
      >
    </div>
  </div>
  <!-- edit delate for mobile -->
  <div
    class="grid grid-cols-2 gap-4 mt-3"
    v-if="
      screenWidth < 600 &&
      nonEditableReview === false &&
      contractor.id === review.reviewer.id
    "
  >
    <!-- edit -->
    <ButtonRatings
      bgColor="bg-lime-700"
      icon="material-symbols:edit-sharp"
      @click="openEditDialog"
      >Edit</ButtonRatings
    >

    <ButtonRatings
      bgColor="bg-red-500"
      icon="ic:baseline-delete"
      @click="openDeleteDialog"
      >Delete</ButtonRatings
    >
  </div>
  <div class="mt-3">
    <!-- trades -->
    <div class="pl-2 text-sm xs:text-md font-bold">
      {{ review.reviewer.firstName }} {{ review.reviewer.lastName }}
      {{ "'s Trades :" }}
    </div>
    <Badge
      v-for="(option, index) in options"
      :key="option.name"
      class="my-1 mx-1 space-x-1 flex"
      :style="{
        backgroundColor: index % 2 === 0 ? '#5f3dc4' : '#364fc7',
        fontSize: '10px',
        paddingTop: '6px',
        paddingBottom: '6px',
      }"
      >{{ option.name }}</Badge
    >

    <div
      v-if="screenWidth < 1260"
      class="mt-3 mb-2 ml-1 flex items-center space-x-4"
    >
      <StarRating :rating="review.rating" :isIndicatorActive="true" />
      <div
        class="font-bold flex justify-center items-center text-md xs:text-xl"
      >
        {{ review.date }}
      </div>
    </div>
    <QualifyingQuestions
      v-if="
        review?.questionsSwitch?.length > 0 || review?.questionsText?.length > 0
      "
      :questionsSwitch="review.questionsSwitch"
      :questionsText="review.questionsText"
    />
    <div class="mt-1">
      <p class="p-2 text-sm xs:text-lg">
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
  <EditRatingModal ref="editRef" :review="review" />
  <DeleteRatingModal ref="deleteRef" />
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";
import Badge from "@/Components/Ratings/Badge.vue";
import EditRatingModal from "@/Pages/Ratings/Edit/EditRatingModal.vue";
import DeleteRatingModal from "@/Pages/Ratings/Edit/DeleteRatingModal.vue";
import ButtonRatings from "@/Components/Ratings/ButtonRatings.vue";

import QualifyingQuestions from "@/Pages/Ratings/PartialsPersonal/QualifyingQuestions.vue";
import { ref, onMounted, onUnmounted } from "vue";
defineProps(["review", "contractor", "nonEditableReview"]);
const options = [
  { id: "trade1", name: "Supplier & Advertiser (all trades)" },
  { id: "trade2", name: "Construction & Remodeling" },
  { id: "trade5", name: "Landscape" },
  { id: "trade6", name: "Earthworks, Drives & Parking Lots" },
];

const editRef = ref();
const deleteRef = ref();

const openEditDialog = () => {
  editRef.value.openDialogEdit();
};

const openDeleteDialog = () => {
  deleteRef.value.openDialogDelete();
};

const showFullReview = ref(false);
const screenWidth = ref(window.innerWidth);

// Update the screen width whenever the window is resized
const updateWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<style scoped>
@media (max-width: 1280px) {
  .hide {
    display: none;
  }
}
</style>
