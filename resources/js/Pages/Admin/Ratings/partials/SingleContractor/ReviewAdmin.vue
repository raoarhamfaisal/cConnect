<template>
  <Card :shadowLevel="0" bgColor="#f0fafc" :isInside="true" :padding="'5px'">
    <div class="flex space-x-2 justify-between">
      <div class="flex justify-center items-center space-x-2">
        <div>
          <Avatar :imageSrc="`/${review.reviewer.user_avatar}`" />
        </div>
        <div class="flex flex-col justify-center">
          <Tooltip
            :text="`${review.id} : ${review.reviewer.first_name} ${review.reviewer.last_name}`"
            :applyTooltipLength="640"
            :textLengthToShow="20"
            textClass="text-md xs:text-xl font-medium font-bold text-gray-900 "
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

          <div v-if="showContactDetails" class="flex gap-2 xs:gap-4">
            <Icon icon="ic:baseline-phone" color="#241e6d" />
            <div class="text-sm">
              {{ review.reviewer.phone_cell }}
            </div>
          </div>
          <div v-if="showContactDetails" class="flex gap-2 xs:gap-4">
            <Icon icon="clarity:email-solid" color="#241e6d" />
            <div class="text-sm">
              {{ review.reviewer.email }}
            </div>
          </div>
        </div>
        <!-- star and date -->
      </div>

      <!-- show text and under appeal-->
      <div
        class="flex flex-col justify-start items-center"
        style="--tw-space-x-reverse: inherit"
      >
        <div
          class="font-bold flex items-center text-md"
          :style="{
            transform: 'translateY(2px)',
          }"
        >
          {{ convertDateFormat(review.rating_date) }}
        </div>
        <StarRating
          :rating="Number(parseFloat(review.rating).toFixed(1))"
          :isIndicatorActive="true"
        />
        <div
          class="flex grow flex-col items-center justify-between translate-y-1"
        >
          <!-- <Badge class="bg-orange-500" v-if="review.is_under_appeal === 1"
            >Under Appeal</Badge
          > -->
          <Badge class="bg-orange-500 w-36" v-if="appealStatus"
            >{{
              appealStatus === "on_hold" ? "On Hold" : appealStatus
            }}
            Appeal</Badge
          >
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
        </div>
      </div>
    </div>
    <!-- trades -->
    <div class="mt-2 pl-2 text-xs">
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
    <!-- qulifying questions + review Text-->

    <Card :shadowLevel="0" bgColor="#eaf3fa" :isInside="true" :padding="'1px'">
      <!-- qulifying questions -->

      <QualifyingQuestionsAdmin
        v-if="
          questionsSwitch.length && review?.how_did_you_meet_this_contractor
        "
        :questionsSwitch="questionsSwitch"
        questionsBgColor="#eaf3fa"
        :selectedReferal="review.how_did_you_meet_this_contractor"
      />

      <!-- review -->
      <div class="text-sm ml-4 text-[#3c3d41] font-bold">Review Text:</div>

      <div class="flex gap-2">
        <Card
          :shadowLevel="0"
          bgColor="#deeee1"
          :isInside="true"
          :padding="'5px'"
          class="ml-5 w-full"
        >
          <p
            class="text-sm font-semibold py-1 px-3 text-grey-600"
            v-if="!editRatingText && rating_text && !isTyping"
          >
            {{
              showFullReview
                ? rating_text
                : rating_text.substring(0, 400) +
                  (rating_text.length > 400 ? "..." : "")
            }}
            <span
              v-if="!showFullReview && rating_text.length > 400"
              @click="showFullReview = true"
              class="cursor-pointer text-sky-700"
            >
              See more
            </span>
            <span
              v-if="showFullReview && rating_text.length > 400"
              @click="showFullReview = false"
              class="cursor-pointer text-sky-700"
            >
              See less
            </span>
          </p>
          <textarea
            v-else
            v-model="rating_text"
            @blur="stopTyping"
            ref="ratingTextarea"
            @keydown="saveInput"
            class="text-sm w-full py-1 px-3 focus:shadow-none focus:ring-gray-600 focus:rounded font-semibold text-grey-600 border-none resize-none bg-transparent"
            :rows="numberOfRows"
          ></textarea>
          <div class="text-xs text-red-600" v-if="!rating_text">
            Review Text must not be empty
          </div>
        </Card>
        <ButtonRatings
          v-if="hasPostPrevillages"
          bgColor="bg-lime-700"
          icon="material-symbols:edit-sharp"
          @click="focusTextarea"
          class="self-start"
          >Edit</ButtonRatings
        >
      </div>
    </Card>
  </Card>
  <!-- Contractor details -->
  <div v-if="showContactDetails">
    <div class="px-2 flex justify-between mt-2">
      <div class="flex flex-col">
        <div class="font-bold text-md xs:text-lg sm:text-2xl mb-2">
          Appealing Contractor
        </div>
        <div class="flex items-center space-x-2">
          <div>
            <Avatar :imageSrc="`/${review.contractor.user_avatar}`" />
          </div>
          <div class="flex flex-col justify-center">
            <Tooltip
              :text="`${review.contractor.first_name} ${review.contractor.last_name}`"
              :applyTooltipLength="640"
              :textLengthToShow="20"
              textClass="text-md xs:text-xl font-medium font-bold text-gray-900 "
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
        <div
          class="pl-2 mt-1 ml-20 flex gap-2 sm:gap-8 flex-col xs:flex-row"
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
      <div
        class="flex flex-col translate-y-2 self-start items-center justify-center gap-2"
      >
        <div class="font-bold text-sm">
          Appeal Date : {{ convertDateFormat(review.appeal.on_appeal_reason_date) }}
        </div>
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
  </div>
  <!-- Response -->
  <div
    v-if="
      review.review_response && Object.keys(review.review_response).length > 1
    "
  >
    <ResponseAdmin
      :response="review.review_response"
      :contractorId="contractorId"
      :profileId="profileId"
    />
  </div>

  <!-- turn on appeal -->
  <div class="mb-4 mt-3" v-if="review.appeal.on_appeal_reason">
    <Appeal
      :appeal="{
        reason: review.appeal.on_appeal_reason,
        date: review.appeal.on_appeal_reason_date,
      }"
      heading="Contractor Appeal"
    />
  </div>
  <div class="mb-4 mt-3" v-if="review.appeal.on_appeal_reason">
    <DecisionNotes
      @changeStatus="changeStatus"
      :appeal_status="review.appeal.appeal_status"
      :appeal_judge_notes="review.appeal.appeal_judge_notes"
      :reviewId="review.id"
    />
  </div>
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import Appeal from "@/Pages/Admin/Ratings/partials/SingleContractor/Appeal.vue";
import DecisionNotes from "@/Pages/Admin/Ratings/partials/SingleContractor/DecisionNotes.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";
import ButtonRatings from "@/Components/Ratings/ButtonRatings.vue";
import Badge from "@/Components/Ratings/Badge.vue";
import QualifyingQuestionsAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/QualifyingQuestionsAdmin.vue";
import Tooltip from "@/Components/Ratings/Tooltip.vue";
import Card from "@/Components/Card.vue";
import { convertDateFormat, filterBadWords } from "@/helpers/utilities";
import ResponseAdmin from "@/Pages/Admin/Ratings/partials/SingleContractor/ResponseAdmin.vue";

import { ref, computed, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import { Link, usePage } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";

//State

const { review, contractorId } = defineProps({
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
const hasPostPrevillages = usePage().props.value.auth.user.posts_privileges;

const editRatingText = ref(false);
const ratingTextarea = ref();
const appealStatus = ref(review.appeal_status);
const rating_text = ref(review.rating_text);
const isTyping = ref(false);

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

const questionsSwitch = questionsMapping.map((mapping) => ({
  id: mapping.id,
  question: mapping.question,
  questionAnswer: review[mapping.field],
}));

//computed

const numberOfRows = computed(() => {
  if (!rating_text.value) return 1; // if there's no content, return a default row number
  const charsPerLine = 97;

  return Math.ceil(rating_text.value.length / charsPerLine);
});
//Methods
const focusTextarea = async () => {
  editRatingText.value = true;
  await nextTick();
  ratingTextarea.value.focus();
  autoResize();
};
const stopTyping = () => {
  isTyping.value = false;
  editRatingText.value = false;
};

let saveTimeout = null;

const saveInput = () => {
  isTyping.value = true;
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Start a new timer
  saveTimeout = setTimeout(async () => {
    if (!rating_text.value) {
      return;
    }
    const updatedReview = {
      rating_text: filterBadWords(rating_text),
      reviewer_id: review.reviewer_id,
      contractor_id: contractorId,
    };
    await store.dispatch("ratings/updateReview", {
      reviewId: review.id,
      review: updatedReview,
      dontShowSuccessSnack: true,
    });
  }, 1000); // 1 second delay
};

const changeStatus = (appealFilter) => {
  appealStatus.value = appealFilter;
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
textarea {
  overflow-y: hidden; /* Hide vertical scrollbar */
  resize: none; /* Disable textarea resizing */
}
</style>
