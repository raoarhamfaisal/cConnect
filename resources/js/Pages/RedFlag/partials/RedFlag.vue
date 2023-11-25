<template>
  <div
    :class="`${
      index % 2 === 0 ? 'bg-[#e8f2fb]' : 'bg-[#f8f9fb]'
    }  overflow-hidden`"
  >
    <!-- Accordion header -->
    <div
      class="redFlag-item flex justify-start items-center cursor-pointer"
      @click="toggleAccordion"
      v-show="!isAccordionOpen"
    >
      <div class="w-[65px] sm:w-[50px]">
        <Icon
          :icon="'clarity:eye-show-line'"
          class="w-7 h-7 transition-transform duration-500 mx-auto"
        />
      </div>
      <!-- customer name -->
      <div class="w-full sm:w-[31%]">
        <v-tooltip
          max-width="300px"
          :text="redFlag.customerName"
          location="top"
        >
          <template v-slot:activator="{ props }">
            <div v-bind="props" class="text-sm font-medium">
              {{
                redFlag.customerName && redFlag.customerName.length > 25
                  ? redFlag.customerName?.substring(0, 25) + "..."
                  : redFlag.customerName
              }}
            </div>
          </template>
        </v-tooltip>
        <!-- for mobile complaint -->
        <div v-if="screenWidth <= 640">
          <v-tooltip max-width="300px" :text="redFlag.complaint" location="top">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="text-sm">
                {{
                  redFlag.complaint && redFlag.complaint.length > 30
                    ? redFlag.complaint.substring(0, 30) + "..."
                    : redFlag.complaint
                }}
              </div>
            </template>
          </v-tooltip>
        </div>
      </div>
      <div v-if="screenWidth >= 640" class="sm:w-[34%] text-sm">
        <v-tooltip max-width="300px" :text="redFlag.complaint" location="top">
          <template v-slot:activator="{ props }">
            <div v-bind="props" class="text-sm">
              {{
                redFlag.complaint && redFlag.complaint.length > 30
                  ? redFlag.complaint.substring(0, 30) + "..."
                  : redFlag.complaint
              }}
            </div>
          </template>
        </v-tooltip>
      </div>
      <div v-if="screenWidth >= 640" class="sm:w-[20%] text-center text-sm">
        {{ redFlag.region }}
      </div>
      <div class="w-[20%] sm:w-[15%] text-sm text-center">
        {{ redFlag.dateReported }}
      </div>
    </div>
    <!-- Accordion content with manual style binding -->
    <div
      class="transition-all duration-500 ease-in-out"
      v-show="isAccordionOpen"
    >
      <!-- :style="contentStyle" -->
      <!-- ref="content" -->

      <div
        class="max-h-[300px] overflow-y-auto border-black border-l-4 border-r-4"
        :class="{ 'border-b-4 ': shouldShowBorder, 'border-t-4': index !== 0 }"
      >
        <!-- accordion header -->
        <div class="redFlag-item flex justify-start items-center">
          <div class="w-[46px]">
            <Icon
              @click="toggleAccordion"
              :icon="'emojione-monotone:cross-mark'"
              color="#e80000"
              class="w-7 h-7 transition-transform duration-500 mx-auto cursor-pointer"
            />
          </div>
          <div class="w-[65%] text-sm">
            {{ redFlag.customerName }}
            <div v-if="screenWidth < 640">
              {{ redFlag.region }}
            </div>
          </div>
          <!-- for desktop -->
          <div v-if="screenWidth >= 640" class="sm:w-[20%] text-center text-sm">
            {{ redFlag.region }}
          </div>
          <div
            v-if="screenWidth >= 640"
            class="w-[20%] sm:w-[15%] text-sm text-center"
          >
            {{ redFlag.dateReported }}
          </div>
        </div>

        <!-- acoordion body -->

        <!-- only for mobile  -->
        <div
          v-if="screenWidth < 640"
          class="m-2 mb-0 flex text-sm flex-col justify-start items-start"
        >
          <div>
            <div class="flex gap-1">
              <div>
                {{ redFlag.flagAddedBy.name }}
              </div>
              <div>
                {{ redFlag.flagAddedBy.city }}, {{ redFlag.flagAddedBy.state }}
              </div>
            </div>
          </div>
          <div>
            {{ redFlag.dateReported }}
          </div>
        </div>
        <div class="redFlag-item flex justify-start items-start">
          <!-- empty left space and user desktop -->
          <div v-if="screenWidth >= 640" class="w-[46px] sm:w-[50px]"></div>
          <!-- user -->
          <div v-if="screenWidth >= 640" class="w-[31%] text-sm">
            <div class="flex sm:flex-col">
              <div>
                {{ redFlag.flagAddedBy.name }}
              </div>
              <div>
                {{ redFlag.flagAddedBy.city }}, {{ redFlag.flagAddedBy.state }}
              </div>
            </div>
          </div>
          <!-- complaint text -->
          <div class="w-[80%] sm:w-[54%] text-center text-sm">
            <textarea
              id="notes"
              ref="redFlagComplaintTextRef"
              :disabled="!editRedFlagComplaintText"
              v-model="redFlagComplaintText"
              @paste="adjustHeight"
              @blur="stopTyping"
              @input="saveRedFlagComplaint"
              placeholder="Type your Notes"
              class="text-sm w-full py-1 min-h-[100px] overflow-y-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-200 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600"
            ></textarea>
          </div>
          <!-- complaint buttons -->
          <div class="w-[20%] sm:w-[15%] text-sm text-center">
            <div class="flex flex-col justify-start items-center">
              <Icon
                @click="focusTextarea"
                icon="nimbus:edit"
                class="inline-block cursor-pointer w-7 h-7"
              ></Icon>
              <Icon
                @click="onOpenDeleteComplaintModalDialog"
                icon="mdi:delete-circle"
                color="#e03131"
                class="inline-block cursor-pointer w-8 h-8"
              ></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CustomDialog
    submitText="Delete"
    :disableOutSideClick="true"
    @submit="onSubmitDeleteComplaint"
    ref="deleteDialogRef"
    errorIcon
    :loading="loadingAccept"
    :disabled="loadingAccept"
    dialogWidth="max-h-[70vh] width50"
    title="Are you sure? "
  >
    <div class="mb-4">
      <div
        class="section_text-lg font-bold pl-6 section_text-gray-800 mt-3 mb-2"
      >
        Do you want to remove this red flag ?
      </div>
    </div>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import { ref, watch, computed, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { filterBadWordsWithoutValue } from "@/helpers/utilities";

const props = defineProps({
  redFlag: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
  },
  shouldShowBorder: {
    type: Boolean,
  },
});
const store = useStore();
const emit = defineEmits(["accordion-toggled"]);

const isAccordionOpen = ref(false);

const content = ref(null);
const contentStyle = computed(() => ({
  height: isAccordionOpen.value ? `${content.value.scrollHeight}px` : "0",
  margin: isAccordionOpen.value ? `8px` : "0",
}));

//Computed
const screenWidth = computed(() => store.getters.screenWidth);

// Ensure the accordion recalculates its height when window resizes
watch(
  () => content.value?.scrollHeight,
  () => {
    if (isAccordionOpen.value) {
      contentStyle.value = { height: `${content.value.scrollHeight}px` };
    }
  }
);

// function toggleAccordion() {
//   isAccordionOpen.value = !isAccordionOpen.value;
// }

// When you toggle an accordion, emit an event to the parent
function toggleAccordion() {
  isAccordionOpen.value = !isAccordionOpen.value;
  // Emit an event to the parent to indicate that this accordion has been toggled
  // You'll need to pass the index or some identifier of this accordion
  if (isAccordionOpen.value) {
    adjustHeight();
  }
  emit("accordion-toggled", {
    index: props.index,
    isOpen: isAccordionOpen.value,
  });
}
const redFlagComplaintText = ref(props.redFlag.complaint);

const isTyping = ref(false);
const editRedFlagComplaintText = ref(false);
const redFlagComplaintTextRef = ref();

const focusTextarea = async () => {
  editRedFlagComplaintText.value = true;
  await nextTick();
  redFlagComplaintTextRef.value.focus();
};
const stopTyping = () => {
  isTyping.value = false;
  editRedFlagComplaintText.value = false;
};
let saveTimeout = null;

const saveRedFlagComplaint = () => {
  adjustHeight();
  isTyping.value = true;
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Start a new timer
  saveTimeout = setTimeout(async () => {
    const notes = {
      notes: redFlagComplaintText.value
        ? filterBadWordsWithoutValue(redFlagComplaintText.value)
        : redFlagComplaintText.value,
    };
    console.log(notes, redFlagComplaintText.value, "selectedNote");
    // try {
    //   const response = await axios.post(
    //     `/api/sub-finder/${props.contractor.id}/preference-and-notes`,
    //     notes,
    //     getAxiosConfig()
    //   );
    //   console.log(response, "response");
    //   if (response.data) {
    //   }
    // } catch (err) {
    //   // somethingWentWrong(err.response.data.message, "inherit");
    // }
  }, 1000);
};
const adjustHeight = () => {
  nextTick(() => {
    redFlagComplaintTextRef.value.style.height = "auto"; // Reset height first to get the correct scrollHeight
    redFlagComplaintTextRef.value.style.height =
      redFlagComplaintTextRef.value.scrollHeight + "px";
  });
};

const deleteDialogRef = ref();
const loadingAccept = ref(false);

const onOpenDeleteComplaintModalDialog = () => {
  deleteDialogRef.value.openDialog();
};
const onSubmitDeleteComplaint = async () => {
  loadingAccept.value = true;

  // try {
  //   const response = await axios.post(
  //     `/api/admin/accept-cancellation/${userId.value}`,
  //     {},
  //     getAxiosConfig()
  //   );
  //   if (response.data) {
  //     changesSaved(
  //       response.data.message || "Cancel request successfully accepted"
  //     );
  //     //   const index = cancelRequests.value.findIndex((plan, index) => {
  //     //     return plan.id === singlePlan.value.id;
  //     //   });

  //     //   if (index !== -1) {
  //     //     cancelRequests.value.splice(index, 1);
  //     //   }
  //     setTimeout(() => {
  //       fetchCancelRequests();
  //     }, 2000);
  //   }
  // } catch (err) {
  //   console.log(err);
  //   somethingWentWrong(err.response.data.message, "inherit");
  // }
  loadingAccept.value = false;
  deleteDialogRef.value.closeDialog();
};
</script>

<style scoped>
.redFlag-item > div {
  padding: 4px 6px;
}
.redFlag-item-expanded {
  /* box-shadow: inset 0 0 0 4px #000; */
}
</style>
