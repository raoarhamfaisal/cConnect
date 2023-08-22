<template>
  <div class="flex space-x-2 justify-between">
    <div class="flex justify-center items-center space-x-2">
      <div>
        <Avatar :imageSrc="review.reviewer.profilePic" />
      </div>
      <div class="flex flex-col justify-center">
        <h2
          class="text-xl font-medium font-bold text-gray-900 dark:text-gray-100"
        >
          {{ review.reviewer.firstName }} {{ review.reviewer.lastName }}
        </h2>
        <div>{{ review.reviewer.company }}</div>
        <span v-if="review.reviewer.city || review.reviewer.state">{{
          `${review.reviewer.city} ${review.reviewer.state}`
        }}</span>
      </div>
    </div>
    <!-- edit dialog -->
    <CustomDialog
      submitText="Save Change"
      @submit="handleSubmit"
      ref="dialogRef"
      title="Edit Rating"
    >
      <form @submit.prevent="handleSubmit">
        <div class="text-md font-bold mb-3 text-gray-600">
          Select your Rating:
        </div>
        <StarRatingEditable
          :ratingGlobal="form.rating"
          @update:rating="handleRatingChange"
        />
        <!-- review reason -->
        <div class="mb-4">
          <div class="text-md font-bold text-gray-600 mt-3 mb-2">
            Review Text
          </div>
          <textarea
            id="rating_reason"
            type="text"
            :rows="5"
            class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
            required
            v-model="form.rating_reason"
            placeholder="Type reason for your rating"
          />
          <InputError class="mt-2" :message="form.errors.rating_reason" />
        </div>
        <!-- response -->
        <div v-if="form?.response_text" class="mb-4">
          <div class="text-md font-bold text-gray-600 mt-3 mb-2">
            Contractors Response
          </div>
          <textarea
            id="responseText"
            type="text"
            :rows="5"
            class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
            required
            v-model="form.response_text"
            placeholder="Type reason for your rating"
          />
          <InputError class="mt-2" :message="form.errors.response_text" />
        </div>
        <!-- Appeal Grant -->
        <Appeal
          v-if="review?.onAppeal && Object.keys(review?.onAppeal).length > 0"
          :noPadding="true"
          :appeal="review?.onAppeal"
          :showToogle="false"
          :showDetails="true"
          heading="Appeal Request from the Contractor"
        />
        <RadioGroup
          v-if="review?.onAppeal && Object.keys(review?.onAppeal).length > 0"
          :label-text="'Do you want to Accept the Appeal?'"
          :options="[
            { id: 'yes', value: 1, text: 'Yes' },
            { id: 'no', value: 0, text: 'No' },
          ]"
          v-model="form.onApealGranted"
        />
        <!-- turn off appeal -->
        <Appeal
          v-if="review?.offAppeal && Object.keys(review?.offAppeal).length > 0"
          :appeal="review?.offAppeal"
          :showToogle="false"
          :showDetails="true"
          :noPadding="true"
          heading="Appeal Turn Off Request from the Contractor"
        />
        <!-- Confirming Appeal-->

        <RadioGroup
          v-if="review?.offAppeal && Object.keys(review?.offAppeal).length > 0"
          :label-text="'Do you want to Accept the Turn off Appeal?'"
          :options="[
            { id: 'turn_off_yess', value: 1, text: 'Yes' },
            { id: 'turn_off_no', value: 0, text: 'No' },
          ]"
          v-model="form.offApealGranted"
        />
        <!-- Questions -->
        <div
          class="mb-4"
          v-for="(question, index) in form.questions"
          :key="index"
        >
          <div class="text-md font-bold text-gray-600 mt-3 mb-2">
            {{ question.question }}
          </div>
          <textarea
            :id="question.id"
            type="text"
            :rows="3"
            class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
            required
            v-model="question.questionAnswer"
            placeholder="Type reason for your rating"
          />
          <InputError
            class="mt-2"
            :message="form?.error?.question?.questionAnswer"
          />
        </div>
      </form>
    </CustomDialog>
    <!-- ConfirmDialog -->
    <!-- edit dialog -->
    <CustomDialog
      submitText="Save Change"
      @submit="handleSubmit"
      ref="submitRef"
      title="Are you sure? You want to change this Rating?"
    >
      <form @submit.prevent="handleSubmit">
        <!-- review reason -->
        <div class="mb-4">
          <div class="text-md font-bold text-gray-600 mt-3 mb-2">
            Reason for Editing the Rating
          </div>
          <textarea
            id="editing_reason"
            type="text"
            :rows="5"
            class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
            required
            v-model="form.editing_reason"
            placeholder="Type reason for Editing the rating"
          />
          <InputError class="mt-2" :message="form.errors.editing_reason" />
        </div>
      </form>
    </CustomDialog>
    <div class="flex flex-col justify-between">
      <div class="flex gap-3">
        <!-- edit -->
        <div
          class="bg-lime-700 inline-flex items-center px-3 py-2 text-sm font-bold leading-none uppercase text-white rounded-md cursor-pointer"
          @click="openEditDialog"
        >
          Edit
        </div>
        <!-- delete -->
        <div
          class="bg-red-500 inline-flex items-center px-3 py-2 text-sm font-bold leading-none uppercase text-white rounded-md cursor-pointer"
        >
          Delete
        </div>
      </div>
      <Badge class="bg-orange-500" v-if="review.isUnderAppeal === 1"
        >Under Appeal</Badge
      >
    </div>
  </div>
  <div>
    <div class="mt-3 mb-2 ml-1 flex items-center space-x-4">
      <StarRating :rating="review.rating" :isIndicatorActive="true" />
      <div class="font-bold flex justify-center items-center text-xl">
        {{ review.date }}
      </div>
    </div>
    <Badge
      v-for="(option, index) in options"
      :key="option.name"
      class="my-1 mx-1 space-x-1 flex"
      :style="{
        backgroundColor: index % 2 === 0 ? '#5f3dc4' : '#364fc7',
        fontSize: '13px',
      }"
      >{{ option.name }}</Badge
    >
    <div class="mt-1">
      <p class="p-2 text-lg">
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
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import Appeal from "@/Pages/Admin/Ratings/partials/SingleContractor/Appeal.vue";
import StarRating from "@/Components/Ratings/StarRating.vue";
import RadioGroup from "@/Components/Ratings/RadioGroup.vue";
import InputError from "@/Components/InputError.vue";

import Badge from "@/Components/Ratings/Badge.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { ref } from "vue";
import StarRatingEditable from "@/Components/Ratings/StarRatingEditable.vue";
import { useForm } from "@inertiajs/inertia-vue3";

const { review } = defineProps(["review", "contractor"]);
const options = [
  { id: "trade1", name: "Supplier & Advertiser (all trades)" },
  { id: "trade2", name: "Construction & Remodeling" },
  { id: "trade5", name: "Landscape" },
  { id: "trade6", name: "Earthworks, Drives & Parking Lots" },
];
const dialogRef = ref();
const submitRef = ref();
const openEditDialog = () => {
  dialogRef.value.openDialog();
};
const form = useForm({
  rating: review.rating,
  questions: review.questions,
  rating_reason: review.rating_reason,
  ...(review?.response?.response_text
    ? { response_text: review?.response?.response_text }
    : {}),
  onApealGranted: null,
  offAppealGranted: null,
  editing_reason: null,
});
const handleSubmit = () => {
  console.log("here", form);
  //   open edit confirmDialog
  submitRef.value.openDialog();
  // form.patch(route('profile.updateGeneralInfo'))
};
function handleRatingChange(value) {
  form.rating = value;
}
const showFullReview = ref(false);
</script>
