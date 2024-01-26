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
          Contractor's Response
        </div>
        <div v-if="screenWidth >= 600" class="flex flex-col justify-between">
          <div class="flex gap-2">
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
              icon="mdi:hide"
              @click="openInActiveDialog"
              >Inactive</ButtonRatings
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
      <!-- for mobile view   edit inactive delete -->
      <div v-if="screenWidth < 700" class="justify-between">
        <div class="grid grid-cols-3 gap-3">
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
            icon="mdi:hide"
            @click="openInActiveDialog"
            >Inactive</ButtonRatings
          >

          <ButtonRatings
            bgColor="bg-red-500"
            icon="ic:baseline-delete"
            @click="openDeleteDialog"
            >Delete</ButtonRatings
          >
        </div>
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
          <p class="p-2 text-sm xs:text-sm xs:text-lg">
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
              See more
            </span>
            <span
              v-if="showFullReview && response.response_text.length > 400"
              @click="showFullReview = false"
              class="cursor-pointer text-sky-700"
            >
              See less
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
  <InActiveResponseModal ref="inActiveRef" />
</template>

<script setup>
import Card from "@/Components/Card.vue";
import ButtonRatings from "@/Components/Ratings/ButtonRatings.vue";
import EditResponseModal from "@/Pages/Admin/Ratings/partials/SingleContractor/Edit/EditResponseModal.vue";
import DeleteResponseModal from "@/Pages/Admin/Ratings/partials/SingleContractor/Edit/DeleteResponseModal.vue";
import InActiveResponseModal from "@/Pages/Admin/Ratings/partials/SingleContractor/Edit/InActiveResponseModal.vue";
import { convertDateFormat } from "@/helpers/utilities";

import { onMounted, onUnmounted, ref } from "vue";

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
});
const showFullReview = ref(false);
const editRef = ref();
const deleteRef = ref();
const inActiveRef = ref();

const openEditDialog = () => {
  editRef.value.openDialogEdit();
};

const openDeleteDialog = () => {
  deleteRef.value.openDialogDelete();
};
const openInActiveDialog = () => {
  inActiveRef.value.openDialogInActivate();
};
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

<style scoped></style>
