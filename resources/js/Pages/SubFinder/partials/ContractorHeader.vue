<template>
  <Card
    :shadowLevel="1"
    bgColor="#f9fafb"
    :isInside="true"
    :padding="screenWidth < 640 ? '0px' : '20px'"
  >
    <div class="flex space-x-2 justify-between">
      <Link :href="`/contractor/${contractor.user_id}`" class="">
        <div class="flex justify-center items-center space-x-2">
          <div class="self-center">
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
              textClass="text-md max-sm:translate-y-[4px]  xs:text-lg font-medium font-bold text-gray-900 "
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
            <div class="max-sm:text-xs">{{ contractor.phone_cell }}</div>
          </div>
        </div>
      </Link>
      <div class="flex items-center gap-1">
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
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import StarRounded from "@/Components/Ratings/StarRounded.vue";
import DialogContractorRating from "@/Components/Ratings/Contractor/DialogContractorRating.vue";

import { computed, ref } from "vue";
import { useStore } from "vuex";
import Card from "@/Components/Card.vue";
import Tooltip from "@/Components/Ratings/Tooltip.vue";
import { usePage } from "@inertiajs/inertia-vue3";

const props = defineProps(["contractor"]);
const ratingDialogRef = ref();
console.log("contractor", props.contractor);
const store = useStore();

let usePageDeatails = usePage().props.value;
const loggedInUserId = usePageDeatails?.profile?.id;

const total_reviews = ref(0);
const averageRating = ref(4);

//Computed

const screenWidth = computed(() => store.getters.screenWidth);

const openContractorRatingDialog = () => {
  ratingDialogRef.value.openDialog();
};
</script>

<style setup>
.text-small {
  font-size: 14px;
  transform: translateY(2px);
  /* "postcss": "^8.4.18", */
}
</style>
