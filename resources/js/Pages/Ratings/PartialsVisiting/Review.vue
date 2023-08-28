<template>
  <div class="flex space-x-2 justify-between">
    <div class="flex justify-center items-center space-x-2">
      <div>
        <Avatar :imageSrc="review.profile.user_avatar" />
      </div>
      <div class="flex flex-col justify-center">
        <h2
          class="text-md xs:text-xl font-medium font-bold text-gray-900 dark:text-gray-100"
        >
          {{ review.profile.first_name }} {{ review.profile.last_name }}
        </h2>
        <div class="text-sm xs:text-lg">{{ review.profile.company_name }}</div>
        <span
          class="text-xs xs:text-lg"
          v-if="review.profile.city || review.profile.state"
          >{{ `${review.profile.city} ${review.profile.state}` }}</span
        >
      </div>
      <div
        v-if="screenWidth >= 1260"
        class="flex flex-col self-start ml-12"
        :style="{
          marginLeft: '20px',
        }"
      >
        <StarRating
          :rating="Number(parseFloat(review.rating).toFixed(1))"
          :isIndicatorActive="true"
        />
        <div
          class="font-bold flex items-center text-md"
          :style="{
            transform: 'translateY(2px)',
          }"
        >
          {{ convertDateFormat(review.rating_date) }}
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
          profileId === review.profile_id
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
      <Badge class="bg-orange-500" v-if="review.is_under_appeal === 1"
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
      profileId === review.profile_id
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
      {{ review.profile.first_name }} {{ review.profile.last_name }}
      {{ "'s Trades :" }}
    </div>
    <template v-for="(option, index) in options" :key="option.name">
      <Badge
        v-if="review.profile[option.id] === 1"
        class="my-1 mx-1 space-x-1 flex"
        :style="{
          backgroundColor: index % 2 === 0 ? '#5f3dc4' : '#364fc7',
          fontSize: '10px',
          paddingTop: '6px',
          paddingBottom: '6px',
        }"
        >{{ option.name }}</Badge
      >
    </template>

    <div
      v-if="screenWidth < 1260"
      class="mt-3 mb-2 ml-1 flex items-center space-x-4"
    >
      <StarRating
        :rating="Number(parseFloat(review.rating).toFixed(1))"
        :isIndicatorActive="true"
      />
      <div
        class="font-bold flex justify-center items-center text-md xs:text-xl"
      >
        {{ convertDateFormat(review.rating_date) }}
      </div>
    </div>
    <QualifyingQuestions
      v-if="questionsSwitch.length && review?.how_did_you_meet_this_contractor"
      :questionsSwitch="questionsSwitch"
      :selectedReferal="review.how_did_you_meet_this_contractor"
    />
    <div class="mt-1">
      <p class="p-2 text-sm xs:text-lg">
        {{
          showFullReview
            ? review.rating_text
            : review.rating_text.substring(0, 400) +
              (review.rating_text.length > 400 ? "..." : "")
        }}
        <span
          v-if="!showFullReview && review.rating_text.length > 400"
          @click="showFullReview = true"
          class="cursor-pointer text-sky-700"
        >
          See more
        </span>
        <span
          v-if="showFullReview && review.rating_text.length > 400"
          @click="showFullReview = false"
          class="cursor-pointer text-sky-700"
        >
          See less
        </span>
      </p>
    </div>
  </div>
  <EditRatingModal
    ref="editRef"
    :review="review"
    :questionsSwitch="questionsSwitch"
  />
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
import { convertDateFormat } from "@/helpers/utilities";
import { ref, onMounted, onUnmounted } from "vue";
const { review } = defineProps({
  review: {
    type: Object,
  },
  contractor: {
    type: Object,
  },
  profileId: {
    type: Number,
  },
  nonEditableReview: {
    type: Boolean,
  },
});
const options = [
  { id: "trade1", name: "Supplier & Advertiser (all trades)" },
  { id: "trade2", name: "Construction & Remodeling" },
  { id: "trade3", name: "Tile Works, Kitchen & Bathrooms" },
  { id: "trade4", name: "Concrete, Masonry & Foundations" },
  { id: "trade5", name: "Landscape" },
  { id: "trade6", name: "Earthworks, Drives & Parking Lots" },
  { id: "trade7", name: "Roofing & Solar" },
  { id: "trade8", name: "Gutters, Siding & Fencing" },
  { id: "trade9", name: "Water/Fire & Mold Remediation" },
  { id: "trade10", name: "Electrical & Low Voltage" },
  { id: "trade11", name: "Plumbing (all Facets)" },
  { id: "trade12", name: "HVAC" },
  { id: "trade13", name: "Carpentry & Finish Carpentry" },
  { id: "trade14", name: "Cabinets, Countertops & Furniture" },
  { id: "trade15", name: "Decks, Pergolas & Gazzebo" },
  { id: "trade16", name: "Flooring - All Types" },
  { id: "trade17", name: "Painting & Staining" },
  { id: "trade18", name: "Drywall Install & Repair Mud Texture" },
  { id: "trade19", name: "Garage & Garage Doors" },
  { id: "trade20", name: "Cleaning Services & Junk Haul Off" },
  { id: "trade21", name: "Glass, Mirrors, Windows & Doors" },
  { id: "trade22", name: "Metal Fab, Fireplaces" },
  { id: "trade23", name: "Handyman Services" },
  { id: "trade24", name: "Architectural, Engineering & Law" },
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
//  for quesitonSwitch
const questionsMapping = [
  {
    field: "hired_by_contractor",
    question: "I Hired Contractor",
    id: 1,
  },
  {
    field: "hired_contractor",
    question: "Contractor hired me",
    id: 2,
  },
  {
    field: "paid_on_time",
    question: "Paid on time",
    id: 3,
  },
  {
    field: "give_full_payment",
    question: "Give full payment",
    id: 4,
  },
];

const questionsSwitch = questionsMapping.map((mapping) => ({
  id: mapping.id,
  question: mapping.question,
  questionAnswer: review[mapping.field],
}));
</script>

<style scoped>
@media (max-width: 1280px) {
  .hide {
    display: none;
  }
}
</style>
