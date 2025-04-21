<template>
  <Card
    :shadowLevel="1"
    :isInside="true"
    class="mt-3"
    bgColor="#f8f9fa"
    :padding="screenWidth > 460 ? '20px' : '10px'"
  >
    <section>
      <div class="flex justify-between">
        <div class="font-bold text-md xs:text-lg sm:text-2xl text-2xl mb-2">
          {{ isContractor ? "Contractor's Response" : "Customer's Response" }}
        </div>
        <div
          v-if="screenWidth >= 600 && contractorId === profileId"
          class="flex flex-col justify-between"
        >
          <div class="flex gap-2">
            <!-- edit -->
            <ButtonRatings
              bgColor="bg-lime-700"
              icon="material-symbols:edit-sharp"
              @click="openEditDialog"
              >{{ translations && translations.edit }}</ButtonRatings
            >

            <ButtonRatings
              bgColor="bg-red-500"
              icon="ic:baseline-delete"
              @click="openDeleteDialog"
              >{{ translations && translations.delete }}</ButtonRatings
            >
          </div>
        </div>
      </div>
      <div
        v-if="screenWidth < 600 && contractorId === profileId"
        class="grid grid-cols-2 gap-4"
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
          >{{ translations && translations.delete }}</ButtonRatings
        >
      </div>
      <div>
        <div class="mt-2 ml-2 flex items-center space-x-4">
          <div
            class="font-bold flex justify-center items-center text-sm xs:text-md sm:text-xl"
          >
            {{ convertDateFormat(response.response_date) }}
          </div>
        </div>
        <div class="">
          <p
            class="p-2 text-sm xs:text-sm xs:text-lg"
            style="white-space: pre-wrap"
          >
            {{
              showFullReview
                ? response.response_text
                : response.response_text.substring(0, 400) +
                  (response.response_text.length > 400 ? "..." : "")
            }}
            <span
              v-if="!showFullReview && response.response_text.length > 400"
              @click="showFullReview = true"
              class="cursor-pointer text-sky-700"
            >
              {{ translations && translations.see_more }}
            </span>
            <span
              v-if="showFullReview && response.response_text.length > 400"
              @click="showFullReview = false"
              class="cursor-pointer text-sky-700"
            >
              {{ translations && translations.see_less }}
            </span>
          </p>
        </div>
      </div>
    </section>
  </Card>
  <EditResponseModal
    ref="editRef"
    :responseText="response?.response_text"
    :responseId="response.id"
  />
  <DeleteResponseModal ref="deleteRef" :responseId="response.id" />
</template>

<script setup>
import Card from "@/Components/Card.vue";
import EditResponseModal from "@/Pages/Ratings/Edit/EditResponseModal.vue";
import DeleteResponseModal from "@/Pages/Ratings/Edit/DeleteResponseModal.vue";
import { computed, ref } from "vue";
import { convertDateFormat } from "@/helpers/utilities";

import ButtonRatings from "@/Components/Ratings/ButtonRatings.vue";
import { useStore } from "vuex";

defineProps({
  response: {
    type: Object,
  },
  profileId: {
    type: Number,
  },
  contractorId: {
    type: Number,
  },
  isContractor: {
    type: Boolean,
    default: false,
  },
});
const showFullReview = ref(false);
const editRef = ref();
const deleteRef = ref();
const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
const screenWidth = computed(() => store.getters.screenWidth);

const openEditDialog = () => {
  editRef.value.openDialogEdit();
};

const openDeleteDialog = () => {
  deleteRef.value.openDialogDelete();
};
</script>

<style scoped></style>
