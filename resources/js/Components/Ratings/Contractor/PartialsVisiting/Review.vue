<template>
  <div class="flex space-x-2 justify-between">
    <div
      class="flex justify-center items-center space-x-2"
      :style="{
        flexGrow: screenWidth > 900 ? 0 : 1,
      }"
    >
      <div>
        <Avatar :imageSrc="`/${review.reviewer.user_avatar}`" />
      </div>
      <div class="flex flex-col justify-center">
        <!-- <h2
          class="text-md xs:text-xl font-medium font-bold text-gray-900 "
        >
          {{ review.reviewer.first_name }} {{ review.reviewer.last_name }}
        </h2> -->
        <Tooltip
          :text="`${review.reviewer.first_name} ${review.reviewer.last_name}`"
          :applyTooltipLength="1260"
          :textLengthToShow="screenWidth < 380 ? 18 : 20"
          textClass="text-md xs:text-xl font-medium font-bold text-gray-900 "
        />
        <Tooltip
          :text="review.reviewer.company_name"
          :applyTooltipLength="1260"
          :textLengthToShow="screenWidth < 380 ? 20 : 23"
          textClass="text-sm xs:text-lg"
        />
        <Tooltip
          v-if="review.reviewer.city || review.reviewer.state"
          :text="`${review.reviewer.city} ${review.reviewer.state}`"
          :applyTooltipLength="1260"
          :textLengthToShow="screenWidth < 380 ? 20 : 23"
          textClass="text-xs xs:text-lg"
        />
        <!-- <div class="text-sm xs:text-lg">{{ review.reviewer.company_name }}</div>
        <span
          class="text-xs xs:text-lg"
          v-if="review.reviewer.city || review.reviewer.state"
          >{{ `${review.reviewer.city} ${review.reviewer.state}` }}</span
        > -->
      </div>
      <div
        class="flex flex-col self-start"
        :style="{
          marginLeft: screenWidth > 1260 ? '20px' : '8px',
          flexGrow: screenWidth > 900 ? 0 : 1,
        }"
      >
        <div class="flex flex-col">
          <StarRating
            :rating="Number(parseFloat(review.rating).toFixed(1))"
            :isIndicatorActive="true"
            :starWidth="screenWidth > 500 ? 24 : screenWidth > 390 ? 18 : 14"
            :indicator-classes="screenWidth < 460 && 'text-small'"
            :style="{
              transform:
                screenWidth > 460
                  ? 'translateY(0px)'
                  : screenWidth > 390
                  ? 'translateY(2px)'
                  : 'translateY(4px)',
              height: screenWidth <= 390 ? '27px' : 'initial',
            }"
          />
          <div
            class="font-bold flex items-center text-xs xs:text-sm sm:text-md"
            :style="{
              transform:
                screenWidth > 460 ? 'translateY(4px)' : 'translateY(0px)',
            }"
          >
            {{ convertDateFormat(review.rating_date) }}
          </div>
        </div>
        <Badge
          class="bg-orange-500 self-end"
          v-if="review.is_under_appeal && screenWidth < 900"
          :style="{
            transform:
              screenWidth < 640 && screenWidth > 460
                ? 'translateY(9px)'
                : 'translateY(0px)',
          }"
          >Under Appeal</Badge
        >
      </div>
    </div>

    <!-- Edit delete with under appeal -->
    <div
      v-if="screenWidth > 900"
      class="flex flex-col justify-between items-end"
    >
      <div
        class="flex gap-2"
        v-if="
          screenWidth >= 1260 &&
          nonEditableReview === false &&
          profileId === review.reviewer_id
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
      <Badge class="bg-orange-500" v-if="review.is_under_appeal"
        >Under Appeal</Badge
      >
      <!-- Submit appeal -->
      <div
        class="text-right"
        v-if="
          !review.is_under_appeal &&
          !review.is_appeal_already_accepted_or_rejected &&
          showAppeal
        "
      >
        <Button
          @onSelect="handleAppeal"
          tooltipText="Submit your appeal"
          :style="{
            boxShadow:
              '0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
            padding: '5px 10px',
          }"
          class="text-lg text-gray-600 font-semibold rounded-lg"
          ><Icon icon="mdi:hand"
        /></Button>
      </div>
    </div>
  </div>
  <!--write appeal  -->
  <transition name="accordion">
    <div v-if="showAppealArea && !review.is_under_appeal">
      <div class="mb-4 mt-3">
        <textarea
          id="appealReason"
          type="text"
          :rows="3"
          class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
          required
          v-model="appealReason"
          placeholder="Type your reason for your appeal"
        />

        <InputError
          v-if="appealReasonError"
          class="mt-2 text-left"
          :message="appealReasonError"
        />

        <div class="flex items-center gap-4 mt-6 w-full">
          <PrimaryButton
            :style="{
              height: '42px',
            }"
            @click="openDialog"
            :disabled="disabled"
            class="w-full flex justify-center gap-2"
          >
            <div>Send</div>
            <img
              v-show="loading"
              src="/images/avatars/Spinner.gif"
              alt="spinner"
              width="30"
          /></PrimaryButton>
        </div>
      </div>
    </div>
  </transition>
  <CustomDialog
    submitText="Send"
    @submit="handleAppealSubmit"
    ref="confirmDialogRef"
    :loading="loading"
    :disabled="disabled"
    errorIcon
    dialogWidth="max-h-[70vh] width50"
    title="Are you sure? "
  >
    <div v-if="!review.is_under_appeal" class="mt-3 block">
      Send any supporting document to
      <a
        class="underline text-sky-600"
        href="mailto:appeal@tContractor.com"
        target="_blank"
      >
        appeal@tContractor.com
      </a>
    </div>
  </CustomDialog>
  <!-- edit delate for mobile -->
  <div
    class="grid grid-cols-2 gap-4 mt-3"
    v-if="
      screenWidth < 1260 &&
      nonEditableReview === false &&
      profileId === review.reviewer_id
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
      {{ review.reviewer.first_name }} {{ review.reviewer.last_name }}
      {{ "'s Trades :" }}
    </div>
    <template v-for="(option, index) in options" :key="option.name">
      <Badge
        v-if="review.reviewer[option.id] === 1"
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
    :profileId="profileId"
    :questionsSwitch="questionsSwitch"
    :contractorId="contractorId"
  />
  <DeleteRatingModal ref="deleteRef" :reviewId="review.id" />
</template>

<script setup>
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Button from "@/Components/Ratings/Button.vue";
import InputError from "@/Components/InputError.vue";
import Tooltip from "@/Components/Ratings/Tooltip.vue";

import Avatar from "@/Components/Ratings/Avatar.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import Badge from "@/Components/Ratings/Badge.vue";
import EditRatingModal from "@/Pages/Ratings/Edit/EditRatingModal.vue";
import DeleteRatingModal from "@/Pages/Ratings/Edit/DeleteRatingModal.vue";
import ButtonRatings from "@/Components/Ratings/ButtonRatings.vue";

import QualifyingQuestions from "@/Pages/Ratings/PartialsPersonal/QualifyingQuestions.vue";
import { convertDateFormat, filterBadWords } from "@/helpers/utilities";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";

import { ref, onMounted, watch, computed, onUnmounted } from "vue";
const { review } = defineProps({
  review: {
    type: Object,
  },
  profileId: {
    type: Number,
  },
  contractorId: {
    type: Number,
  },
  nonEditableReview: {
    type: Boolean,
  },
  showAppeal: {
    type: Boolean,
    default: false,
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
const store = useStore();
const editRef = ref();
const showAppealArea = ref(false);
const confirmDialogRef = ref();
const deleteRef = ref();
const appealReason = ref("");
const appealReasonError = ref("");

//computed

const loading = computed(() => store.state.ratings.loading);
const screenWidth = computed(() => store.getters.screenWidth);
const disabled = computed(() => store.state.ratings.disabled);
//watch

watch(
  () => appealReason.value,
  () => {
    appealReasonError.value = "";
  }
);

//Methods

const validateAppealReason = () => {
  let isValid = true;
  // Reset the error messages before validating
  appealReasonError.value = "";

  // Validate rating_text
  if (!appealReason.value || appealReason.value.trim() === "") {
    appealReasonError.value = "Appeal Reason should not be empty.";
    isValid = false;
  }

  return isValid;
};

const openDialog = () => {
  if (validateAppealReason()) {
    return confirmDialogRef.value.openDialog();
  }
};
const handleAppealSubmit = async () => {
  if (!review.is_under_appeal) {
    const appealData = {
      on_appeal_reason: filterBadWords(appealReason),
      reviewId: review.id,
    };
    await store.dispatch("ratings/sendAppeal", appealData);
    return confirmDialogRef.value.closeDialog();
  }
};
const handleAppeal = () => {
  showAppealArea.value = !showAppealArea.value;
};

const openEditDialog = () => {
  editRef.value.openDialogEdit();
};

const openDeleteDialog = () => {
  deleteRef.value.openDialogDelete();
};

const showFullReview = ref(false);

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

const questionsSwitch = computed(() => {
  return questionsMapping.map((mapping) => {
    return {
      id: mapping.id,
      question: mapping.question,
      questionAnswer:
        review[mapping.field] === true ? 1 : review[mapping.field],
    };
  });
});
</script>

<style scoped>
@media (max-width: 1280px) {
  .hide {
    display: none;
  }
}
</style>
