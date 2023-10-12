<template>
  <!-- Trades and Region  -->

  <div class="flex justify-between">
    <heading-card
      class="mb-2"
      :style="{
        marginBottom: '8px',
        fontWeight: 800,
        fontSize: screenWidth > 640 ? '24px' : '20px',
      }"
      :heading="`Trade Groups`"
    />
    <!-- User Posting and Edit Button -->
    <div @click="openPostDialog" class="flex gap-2 sm:gap-3">
      <!-- User Postings -->
      <v-tooltip text="See User Posts" location="left">
        <template v-slot:activator="{ props }">
          <div class="active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md">
            <button
              class="xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center"
            >
              <img
                src="/images/icons/post_b.png"
                v-bind="props"
                width="28"
                height="28"
              />
            </button>
          </div>
        </template>
      </v-tooltip>
      <!-- Edit -->
      <IconButton @click="openDialog" icon="nimbus:edit" color="#1864ab" />
    </div>
  </div>
  <!-- trades -->
  <div class="mb-3">
    <!-- <div class="pl-2 text-sm xs:text-md font-bold mt-2 mb-1">
        {{ profile.first_name + " " + profile.last_name }}
        {{ "'s Trades :" }}
      </div> -->
    <template v-for="(option, index) in options" :key="option.name">
      <Badge
        v-if="tradesPost[option.id] === 1"
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
  </div>
  <div
    v-if="region_name"
    class="flex items-center justify-between w-full gap-2 xs:gap-4 mt-2 sm:mt-0"
  >
    <div class="flex items-center">
      <v-tooltip text="Region" location="top">
        <template v-slot:activator="{ props }">
          <Icon
            v-bind="props"
            class="w-6 h-6 sm:w-8 sm:h-8"
            icon="mdi:location"
            color="#241e6d"
          />
        </template>
      </v-tooltip>
      <div class="font-bold text-sm xs:text-base sm:text-lg ml-1 xs:ml-2">
        Region :
      </div>
      <div class="text-xs xs:text-sm sm:text-base translate-y-[0px] ml-2">
        {{ region_name }}
      </div>
    </div>
  </div>
  <CustomDialog
    submitText="Save"
    @submit="handleSubmit"
    :loading="loadingDialog"
    :disabled="disabled"
    ref="dialogRef"
    title="Edit Your General Information"
  >
    <Loader :loading="loading" background="" height="60vh"></Loader>

    <div v-if="regions" class="mb-4 sm:mb-0">
      <InputLabel class="font-bold mb-1" value="Region" />
      <SelectProfile
        :options="referenceList"
        :modelValue="selectedReferal"
        @update:modelValue="changeReferal"
      />
      <InputError class="mt-2" :message="errors.region_id" />
    </div>
    <div class="mb-4 sm:mb-0 mt-4">
      <InputLabel class="font-bold mb-3" value="Trades" />
      <div class="flex items-center gap-4 mt-2 mb-5">
        <div class="switch-trades" @click="selectAllTrades">
          <div
            :class="[
              selectAll ? 'switch-bg-on-trades' : 'switch-bg-off-trades',
            ]"
          >
            <div
              :class="[
                selectAll ? 'switch-knob-on-trades' : 'switch-knob-off-trades',
              ]"
            ></div>
          </div>
        </div>
        <label for="select_all" class="mr-4 text-gray-800 font-bold"
          >Select All</label
        >
      </div>

      <div class="grid grid-cols-2 gap-x-14 gap-y-3">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="flex items-center justify-between"
        >
          <label :for="option.id" class="mr-2 text-xs font-bold">{{
            option.name
          }}</label>
          <div class="switch-post" @click="toggleSwitch(option.id)">
            <div
              :class="[
                tempTradesPost[option.id]
                  ? 'switch-bg-on-post'
                  : 'switch-bg-off-post',
              ]"
            >
              <div
                :class="[
                  tempTradesPost[option.id]
                    ? 'switch-knob-on-post'
                    : 'switch-knob-off-post',
                ]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CustomDialog>
  <DialogContractorPosts ref="postDialogRef" :contractorId="profile.user_id" />
</template>
<script setup>
import IconButton from "@/Components/IconButton.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import SelectProfile from "@/Components/SelectProfile.vue";
import Badge from "@/Components/Ratings/Badge.vue";
import InputError from "@/Components/InputError.vue";
import DialogContractorPosts from "@/Components/Postings/DialogContractorPosts.vue";
import InputLabel from "@/Components/InputLabel.vue";
import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { Icon } from "@iconify/vue";

import { options } from "@/helpers/selectListsHelpters.js";
import { Link } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";
import { computed, ref, watch, onMounted, reactive } from "vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
// State
const props = defineProps({
  profile: Object,
  region_name: String,

  screenWidth: Number,
});
const store = useStore();
const referenceList = ref([]);
const region_name = ref(props.region_name ?? "");
const selectedReferal = ref(region_name.value);
const dialogRef = ref();
const loadingDialog = ref(false);
const postDialogRef = ref();

const disabled = ref(false);

const errors = reactive({
  region_id: "",
});
const selectAll = ref(false);

const tradesPost = reactive({
  trade1: props.profile.trade1,
  trade2: props.profile.trade2,
  trade3: props.profile.trade3,
  trade4: props.profile.trade4,
  trade5: props.profile.trade5,
  trade6: props.profile.trade6,
  trade7: props.profile.trade7,
  trade8: props.profile.trade8,
  trade9: props.profile.trade9,
  trade10: props.profile.trade10,
  trade11: props.profile.trade11,
  trade12: props.profile.trade12,
  trade13: props.profile.trade13,
  trade14: props.profile.trade14,
  trade15: props.profile.trade15,
  trade16: props.profile.trade16,
  trade17: props.profile.trade17,
  trade18: props.profile.trade18,
  trade19: props.profile.trade19,
  trade20: props.profile.trade20,
  trade21: props.profile.trade21,
  trade22: props.profile.trade22,
  trade23: props.profile.trade23,
  // trade24: props.profile.trade24,
});
const tempTradesPost = reactive({
  trade1: props.profile.trade1,
  trade2: props.profile.trade2,
  trade3: props.profile.trade3,
  trade4: props.profile.trade4,
  trade5: props.profile.trade5,
  trade6: props.profile.trade6,
  trade7: props.profile.trade7,
  trade8: props.profile.trade8,
  trade9: props.profile.trade9,
  trade10: props.profile.trade10,
  trade11: props.profile.trade11,
  trade12: props.profile.trade12,
  trade13: props.profile.trade13,
  trade14: props.profile.trade14,
  trade15: props.profile.trade15,
  trade16: props.profile.trade16,
  trade17: props.profile.trade17,
  trade18: props.profile.trade18,
  trade19: props.profile.trade19,
  trade20: props.profile.trade20,
  trade21: props.profile.trade21,
  trade22: props.profile.trade22,
  trade23: props.profile.trade23,
  // trade24: props.profile.trade24,
});

// Computed

const loading = computed(() => store.state.ratings.loading);
const regions = computed(() => store.state.ratings.allRegions);

//Watch
watch(regions, (newVal) => {
  if (newVal.length > 0) {
    console.log(regions, "regions");
    referenceList.value = regions.value.map((item) => item.name);
  }
});

// Hooks

onMounted(() => {
  store.dispatch("ratings/getRegions");
  const allSelected = Object.values(tempTradesPost).every(
    (value) => value === 1
  );
  if (allSelected) {
    selectAll.value = true;
  }
});

//Methods
const toggleSwitch = (field) => {
  console.log(field, "refchanged");
  console.log(tradesPost[field] === 1 ? 1 : 0);
  tempTradesPost[field] = tempTradesPost[field] === 1 ? 0 : 1;
};
const openDialog = () => {
  dialogRef.value.openDialog();
};

const changeReferal = (value) => {
  selectedReferal.value = value;
  clearError("region_id");

  // regions.forEach((item) => {
  //   if (value === item.name) {
  //     this.form.region_id = item.id.toString();
  //   }
  // });
};

const clearError = (field) => {
  if (selectedReferal.value) {
    errors[field] = "";
  }
};

const handleSubmit = async () => {
  let region_id = null; // Initialize with a default value

  regions.value.forEach((r) => {
    if (r.name === selectedReferal.value) {
      region_id = r.id;
      console.log(
        selectedReferal.value,
        r.name === selectedReferal.value,
        r.id
      );
      console.log(region_id);
      return; // Exit the forEach loop once a match is found
    }
  });
  const resultArray = [];

  for (const key in tempTradesPost) {
    if (tempTradesPost[key] === 1) {
      // Extract the number from the key and add it to the result array
      const number = parseInt(key.replace("trade", ""));
      resultArray.push(number);
    }
  }
  if (!region_id) {
    errors.region_id = "Region is Required";
    return;
  }
  const payload = {
    region_id: region_id,
    trades: resultArray,
  };
  loadingDialog.value = true;
  disabled.value = true;
  try {
    const response = await axios.patch(
      `/api/contractor/region-trades`,
      payload,
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(
        response.data.message || "Region and Trades successfully saved"
      );
      for (const key in tempTradesPost) {
        tradesPost[key] = tempTradesPost[key];
      }
      region_name.value = selectedReferal.value;
      dialogRef.value.closeDialog();
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loadingDialog.value = false;
    disabled.value = false;
  }
};
const selectAllTrades = () => {
  if (selectAll.value) {
    // If selectAll is true, set all properties in form to 1
    for (let key in tempTradesPost) {
      tempTradesPost[key] = 0;
    }
  } else {
    // If selectAll is false, set all properties in tempTradesPost to 0
    for (let key in tempTradesPost) {
      tempTradesPost[key] = 1;
    }
  }
  // Toggle the value of selectAll
  selectAll.value = !selectAll.value;
};
const openPostDialog = () => {
  postDialogRef.value.openDialog();
};
</script>

<style scoped>
.switch-post {
  cursor: pointer;
  width: 30px;
  height: 15px;
  position: relative;
}
.switch-bg-on-post,
.switch-bg-off-post {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: background-color 0.2s;
}
.switch-bg-on-post {
  background-color: rgba(36, 30, 109, 1);
  width: 30px;
}
.switch-bg-off-post {
  background-color: #ccc;
  width: 29px;
}
.switch-knob-on-post,
.switch-knob-off-post {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 1px;
  transition: left 0.2s;
}
.switch-knob-on-post {
  left: 16px;
}
.switch-knob-off-post {
  left: 1px;
}

.switch-trades {
  cursor: pointer;
  width: 40px;
  height: 20px;
  position: relative;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
}
.switch-bg-on-trades,
.switch-bg-off-trades {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transition: background-color 0.2s;
}
.switch-bg-on-trades {
  /* background-color: rgba(36, 30, 109, 1); */
  background-color: rgba(10, 150, 10, 1);
  width: 40px;
}
.switch-bg-off-trades {
  background-color: #ccc;
  /* background-color: rgba(150, 10, 10, 1); */
  width: 39px;
}
.switch-knob-on-trades,
.switch-knob-off-trades {
  width: 19px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 1px;
  transition: left 0.2s;
}
.switch-knob-on-trades {
  left: 21px;
}
.switch-knob-off-trades {
  left: 1px;
}

.divider {
  height: 2px;
  background-color: #e5e5e5;
  margin: 20px 0; /* Vertical spacing */
}
</style>
