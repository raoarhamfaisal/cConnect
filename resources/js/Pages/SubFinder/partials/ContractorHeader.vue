<template>
  <Card
    :shadowLevel="1"
    bgColor="#f9fafb"
    :isInside="true"
    :padding="screenWidth < 640 ? '0px' : '20px'"
  >
    <div class="flex space-x-2 justify-between">
      <span class="cursor-pointer" @click="openContractorPageDiaglog">
        <div class="flex justify-center items-center space-x-2">
          <div class="self-start">
            <Avatar
              imageClass="w-16 h-16 sm:h-24 sm:w-24"
              :imageSrc="`/${
                contractor.user_avatar || contractor.company_logo
              }`"
            />
          </div>
          <div class="flex flex-col justify-center">
            <Tooltip
              :text="`${contractor.first_name} ${contractor.last_name}`"
              :applyTooltipLength="1260"
              :textLengthToShow="screenWidth < 380 ? 18 : 20"
              textClass="text-md max-sm:translate-y-[0px]  xs:text-lg font-medium font-bold text-gray-900 "
            />
            <Tooltip
              :text="contractor.company_name"
              :applyTooltipLength="1260"
              :textLengthToShow="screenWidth < 380 ? 20 : 23"
              textClass="leading-4 text-sm  xs:text-base "
            />
            <Tooltip
              v-if="contractor.city || contractor.state"
              :text="`${contractor.city} ${contractor.state}`"
              :applyTooltipLength="1260"
              :textLengthToShow="screenWidth < 380 ? 20 : 23"
              textClass="leading-4 text-xs  xs:text-base "
            />
            <div class="max-sm:text-xs">{{ contractor.phone_cell || contractor.phone_office }}</div>
            <div class="max-sm:text-xs">{{ contractor.email }}</div>
          </div>
        </div>
      </span>
      <div class="flex items-start mt-1 max-sm:mt-2 gap-1">
        <div class="flex flex-col md:mt-2 justify-center items-center">
          <!-- @click="openContractorRatingDialog" -->
          <StarRounded
            @click="openContractorRatingDialog"
            :innerStarRadius="screenWidth > 768 ? 17 : 13"
            :starWidth="screenWidth > 768 ? 24 : 15"
            :class="`h-4 md:h-6 cursor-pointer`"
            :indicatorClasses="`text-small h-4 md:h-6 `"
            :starHeight="screenWidth > 768 ? 24 : 15"
            :rating="
              Number(parseFloat(averageRating ? averageRating : 0.0).toFixed(1))
            "
            :isIndicatorActive="false"
          />

          <div class="md:mt-2">
            <h2
              class="font-light text-xs md:text-sm overflow-hidden tracking-tighter"
            >
              {{ total_reviews }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </Card>
  <DialogContractorRating
    ref="ratingDialogRef"
    :loggedInUserId="loggedInUserId"
    :userId="contractor?.user_id"
  />
  <DialogContractorPage
    ref="contractorPageDialogRef"
    :contractor_id="contractor.user_id"
    :region_name="region_name"
    :profile="profile"
  />
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import StarRounded from "@/Components/Ratings/StarRounded.vue";
import DialogContractorRating from "@/Components/Ratings/Contractor/DialogContractorRating.vue";
import DialogContractorPage from "@/Pages/Contractor/DialogContractorPage.vue";

import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import Card from "@/Components/Card.vue";
import Tooltip from "@/Components/Ratings/Tooltip.vue";
import { usePage } from "@inertiajs/inertia-vue3";

const props = defineProps(["contractor", "region_name"]);
const ratingDialogRef = ref();
console.log("contractor", props.contractor);
const store = useStore();


let usePageDeatails = usePage().props.value;
const loggedInUserId = usePageDeatails?.profile?.id;
const profile = usePageDeatails?.profile;
console.log(usePageDeatails.profile,'profile');
const total_reviews = ref(props.contractor.total_reviews ?? 0);
const averageRating = ref(props.contractor.average_rating);
const contractorPageDialogRef = ref();

//Computed

const screenWidth = computed(() => store.getters.screenWidth);
const shouldLoadPosts = computed(() => store.state.ratings.shouldLoadPosts);
const averageRatingFromDialog = computed(
  () => store.state.ratings.averageRating
);
const lengthFromDialog = computed(() => store.state.ratings.length);

//Watch
watch(shouldLoadPosts, (newValue) => {
  if (newValue) {
    console.log(
      "shoouldLoad Post",
      averageRatingFromDialog.value !== -1,
      lengthFromDialog.value !== -1
    );
    if (averageRatingFromDialog.value !== -1) {
      console.log("shoouldLoad Post2");

      averageRating.value = averageRatingFromDialog.value;
    }
    if (lengthFromDialog.value !== -1) {
      console.log("shoouldLoad Post3");

      total_reviews.value = lengthFromDialog.value;
    }
    store.commit("ratings/setShouldLoadPosts", false);
  }
});

const openContractorRatingDialog = () => {
  ratingDialogRef.value.openDialog();
};
const openContractorPageDiaglog = () => {
  localStorage.setItem("showGoBack", "false");
  contractorPageDialogRef.value.openDialog();
};
</script>

<style setup>
.text-small {
  font-size: 14px;
  transform: translateY(2px);
  /* "postcss": "^8.4.18", */
}
</style>
