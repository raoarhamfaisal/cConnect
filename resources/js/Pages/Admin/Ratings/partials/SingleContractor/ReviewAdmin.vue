<template>
  <div class="flex space-x-2 justify-between">
    <div class="flex justify-center items-center space-x-2">
      <div>
        <Avatar :imageSrc="review.reviewer.user_avatar" />
      </div>
      <div class="flex flex-col justify-center">
        <Tooltip
          :text="`${review.reviewer.first_name} ${review.reviewer.last_name}`"
          :applyTooltipLength="640"
          :textLengthToShow="20"
          textClass="text-md xs:text-xl font-medium font-bold text-gray-900 dark:text-gray-100"
        />
        <Tooltip
          :text="review.reviewer.company_name"
          :applyTooltipLength="640"
          :textLengthToShow="23"
          textClass="text-sm xs:text-lg"
        />
        <Tooltip
          v-if="review.reviewer.city || review.reviewer.state"
          :text="`${review.reviewer.city} ${review.reviewer.state}`"
          :applyTooltipLength="640"
          :textLengthToShow="23"
          textClass="text-xs xs:text-lg"
        />
      </div>
      <!-- star and date -->
      <div
        v-if="screenWidth >= 1260"
        class="flex flex-col self-start ml-12"
        :style="{
          marginLeft: '25px',
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

    <!-- Edit delete with under appeal desktop-->
    <div
      class="flex flex-col justify-between items-end"
      :class="{
        'xl:flex-col-reverse': review.is_under_appeal === 1,
      }"
    >
      <div class="flex gap-2 flex-col md:flex-row">
        <Link
          v-if="showContactDetails"
          :href="`/admin/ratings/contractor/${review.reviewer_id}/history`"
        >
          <Badge
            class="bg-white text-blue-500 padding border-2 cursor-pointer hover:shadow-lg active:scale-95"
            :style="{
              '--tw-border-opacity': 1,

              borderColor: 'rgb(59 130 246 / var(--tw-text-opacity))',
            }"
            >Show History</Badge
          >
        </Link>

        <Badge class="bg-orange-500" v-if="review.is_under_appeal === 1"
          >Under Appeal</Badge
        >
      </div>
      <!-- Deleted At -->
      <div
        v-if="screenWidth >= 768 && review.deleted_at"
        class="font-bold inline-block"
      >
        Deleted At
        <div class="font-normal inline-block text-sm">
          : {{ formatUTCToDateTime(review.deleted_at) }}
        </div>
      </div>

      <!-- Edit buttons -->
      <div
        v-if="screenWidth >= 768 && !review.deleted_at"
        class="grid grid-cols-3 gap-2"
      >
        <!-- edit -->
        <ButtonRatings
          bgColor="bg-lime-700"
          icon="material-symbols:edit-sharp"
          @click="openEditDialog"
          >Edit</ButtonRatings
        >
        <!-- Hide -->
        <ButtonRatings
          bgColor="bg-[#f08c00]"
          :icon="review.is_review_active === 1 ? 'mdi:hide' : 'mdi:show'"
          @click="openInActiveDialog"
          >{{
            review.is_review_active === 1 ? "Inactive" : "Active"
          }}</ButtonRatings
        >
        <!-- delete -->
        <ButtonRatings
          bgColor="bg-red-500"
          icon="ic:baseline-delete"
          @click="openDeleteDialog"
          >Delete</ButtonRatings
        >
      </div>
    </div>
  </div>
  <!-- Delted At for Mobile -->
  <div
    v-if="screenWidth < 768 && review.deleted_at"
    class="pl-2 mt-2 font-bold inline-block"
  >
    Deleted At
    <div class="font-normal inline-block text-sm">
      : {{ formatUTCToDateTime(review.deleted_at) }}
    </div>
  </div>
  <!-- contact details -->
  <div
    class="pl-2 mt-3 flex gap-2 sm:gap-8 flex-col xs:flex-row"
    v-if="showContactDetails"
  >
    <div class="flex gap-2 xs:gap-4">
      <Icon icon="ic:baseline-phone" color="#241e6d" />
      <div class="text-sm">
        {{ review.reviewer.phone_cell }}
      </div>
    </div>
    <div class="flex gap-2 xs:gap-4">
      <Icon icon="clarity:email-solid" color="#241e6d" />
      <div class="text-sm">
        {{ review.reviewer.email }}
      </div>
    </div>
  </div>
  <!-- for mobile view icons edit inactive delete-->
  <div
    v-if="screenWidth < 768 && !review.deleted_at"
    class="grid grid-cols-3 gap-2 mt-3"
  >
    <ButtonRatings
      bgColor="bg-lime-700"
      icon="material-symbols:edit-sharp"
      @click="openEditDialog"
      >Edit</ButtonRatings
    >
    <!-- Hide -->
    <ButtonRatings
      bgColor="bg-[#f08c00]"
      :icon="review.is_review_active === 1 ? 'mdi:hide' : 'mdi:show'"
      @click="openInActiveDialog"
      >{{
        review.is_review_active === 1 ? "Inactive" : "Active"
      }}</ButtonRatings
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
    <!-- mobile veiw stars -->
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
    <!-- qulifying questions -->
    <QualifyingQuestions
      v-if="questionsSwitch.length && review?.how_did_you_meet_this_contractor"
      :questionsSwitch="questionsSwitch"
      :selectedReferal="review.how_did_you_meet_this_contractor"
    />

    <!-- review -->
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
    <!-- Contractor details -->
    <div v-if="showContactDetails">
      <div class="font-bold text-md xs:text-lg sm:text-2xl mb-2">
        Appealing Contractor
      </div>
      <div class="flex justify-between">
        <div class="flex items-center space-x-2">
          <div>
            <Avatar :imageSrc="review.contractor.user_avatar" />
          </div>
          <div class="flex flex-col justify-center">
            <Tooltip
              :text="`${review.contractor.first_name} ${review.contractor.last_name}`"
              :applyTooltipLength="640"
              :textLengthToShow="20"
              textClass="text-md xs:text-xl font-medium font-bold text-gray-900 dark:text-gray-100"
            />

            <Tooltip
              :text="review.contractor.company_name"
              :applyTooltipLength="640"
              :textLengthToShow="23"
              textClass="text-sm xs:text-lg"
            />
            <Tooltip
              v-if="review.contractor.city || review.contractor.state"
              :text="`${review.contractor.city} ${review.contractor.state}`"
              :applyTooltipLength="640"
              :textLengthToShow="23"
              textClass="text-xs xs:text-lg"
            />
          </div>
        </div>
        <div>
          <Link
            :href="`/admin/ratings/contractor/${review.contractor.id}/history`"
          >
            <Badge
              class="bg-white text-blue-500 padding border-2 cursor-pointer hover:shadow-lg active:scale-95"
              :style="{
                '--tw-border-opacity': 1,

                borderColor: 'rgb(59 130 246 / var(--tw-text-opacity))',
              }"
              >Show History</Badge
            >
          </Link>
        </div>
      </div>
      <div
        class="pl-2 mt-3 flex gap-2 sm:gap-8 flex-col xs:flex-row"
        v-if="showContactDetails"
      >
        <div class="flex gap-2 xs:gap-4">
          <Icon icon="ic:baseline-phone" color="#241e6d" />
          <div class="text-sm">
            {{ review.contractor.phone_cell }}
          </div>
        </div>
        <div class="flex gap-2 xs:gap-4">
          <Icon icon="clarity:email-solid" color="#241e6d" />
          <div class="text-sm">
            {{ review.contractor.email }}
          </div>
        </div>
      </div>
    </div>
    <!-- turn on appeal -->
    <div class="mb-4" v-if="review.on_appeal_reason">
      <div>
        <Appeal
          :appeal="{
            reason: review.on_appeal_reason,
            date: review.on_appeal_reason_date,
          }"
          heading="Appeal Request from the Contractor"
        />
        <div v-if="!review.deleted_at" class="flex justify-end">
          <div class="flex gap-6">
            <!-- accept -->
            <ButtonRatings
              bgColor="bg-[#364fc7]"
              @click="sendAcceptRequest('acceptOnAppeal')"
              class="flex gap-2"
              :disabled="disabled"
            >
              <div class="flex items-center justify-center">Accept</div>
              <img
                class="ml-2"
                v-show="loading && loadingSpecific === 'acceptOnAppeal'"
                src="/images/avatars/Spinner.gif"
                alt="spinner"
                width="20"
            /></ButtonRatings>

            <!-- reject -->
            <ButtonRatings
              bgColor="bg-[#e03131]"
              @click="sendRejectRequest('rejectOnAppeal')"
              class="flex gap-2"
              :disabled="disabled"
            >
              <div class="flex items-center justify-center">Reject</div>
              <img
                class="ml-2"
                v-show="loading && loadingSpecific === 'rejectOnAppeal'"
                src="/images/avatars/Spinner.gif"
                alt="spinner"
                width="20"
            /></ButtonRatings>
          </div>
        </div>
      </div>

      <!-- trun off appeal -->
      <div v-if="review.off_appeal_reason">
        <Appeal
          :appeal="{
            reason: review.off_appeal_reason,
            date: review.off_appeal_reason_date,
          }"
          heading="Appeal Turn Off Request from the Contractor"
        />
        <div v-if="!review.deleted_at" class="flex justify-end">
          <div class="flex gap-6">
            <!-- accept -->
            <ButtonRatings
              bgColor="bg-[#364fc7]"
              @click="sendAcceptRequest('acceptOffAppeal')"
              class="flex gap-2"
              :disabled="disabled"
            >
              <div class="flex items-center justify-center">Accept</div>
              <img
                class="ml-2"
                v-show="loading && loadingSpecific === 'acceptOffAppeal'"
                src="/images/avatars/Spinner.gif"
                alt="spinner"
                width="20"
            /></ButtonRatings>

            <!-- reject -->
            <ButtonRatings
              bgColor="bg-[#e03131]"
              @click="sendRejectRequest('rejectOffAppeal')"
              class="flex gap-2"
              :disabled="disabled"
            >
              <div class="flex items-center justify-center">Reject</div>
              <img
                class="ml-2"
                v-show="loading && loadingSpecific === 'rejectOffAppeal'"
                src="/images/avatars/Spinner.gif"
                alt="spinner"
                width="20"
            /></ButtonRatings>
          </div>
        </div>
      </div>
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
  <InActiveRatingModal
    ref="inActiveRef"
    :isActive="review.is_review_active === 1"
    :reviewId="review.id"
  />
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import Appeal from "@/Pages/Admin/Ratings/partials/SingleContractor/Appeal.vue";
import InActiveRatingModal from "@/Pages/Admin/Ratings/partials/SingleContractor/Edit/InActiveRatingModal.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";
import ButtonRatings from "@/Components/Ratings/ButtonRatings.vue";
import EditRatingModal from "@/Pages/Admin/Ratings/partials/SingleContractor/Edit/EditRatingModal.vue";
import DeleteRatingModal from "@/Pages/Admin/Ratings/partials/SingleContractor/Edit/DeleteRatingModal.vue";
import Badge from "@/Components/Ratings/Badge.vue";
import QualifyingQuestions from "@/Pages/Ratings/PartialsPersonal/QualifyingQuestions.vue";
import { convertDateFormat, formatUTCToDateTime } from "@/helpers/utilities";
import Tooltip from "@/Components/Ratings/Tooltip.vue";

import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { Link } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";

//State

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
  showContactDetails: {
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
const deleteRef = ref();
const showFullReview = ref(false);
const inActiveRef = ref();
const loadingSpecific = ref("");
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

//computed
const loading = computed(() => store.state.ratings.loading);
const screenWidth = computed(() => store.getters.screenWidth);
const disabled = computed(() => store.state.ratings.disabled);

//Methods

const sendAcceptRequest = async (value) => {
  loadingSpecific.value = value;
  const payload = {
    reviewId: review.id,
  };
  await store.dispatch("ratings/sendAcceptRequest", payload);
  loadingSpecific.value = "";
};
const sendRejectRequest = async (value) => {
  loadingSpecific.value = value;

  const payload = {
    reviewId: review.id,
  };
  await store.dispatch("ratings/sendRejectRequest", payload);
  loadingSpecific.value = "";
};
const openEditDialog = () => {
  editRef.value.openDialogEdit();
};

const openDeleteDialog = () => {
  deleteRef.value.openDialogDelete();
};
const openInActiveDialog = () => {
  inActiveRef.value.openDialogInActivate();
};
</script>

<style scoped>
.padding {
  padding: 2px 6px;
}

@media (min-width: 640px) {
  .padding {
    padding: 6px 10px;
  }
}
</style>
