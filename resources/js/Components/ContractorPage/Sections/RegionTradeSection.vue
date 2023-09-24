<template>
  <!-- Trades and Region  -->
  <Card
    :shadowLevel="2"
    bgColor="white"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
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
      <!-- User Posting and Edit Button -->
      <div class="flex gap-2 sm:gap-3">
        <!-- User Postings -->
        <v-tooltip text="See User Posts" location="left">
          <template v-slot:activator="{ props }">
            <Link
              class="active:scale-95 hover:bg-[#f8f9fa] rounded-full"
              :href="`/contractor/post/${profile.id}`"
            >
              <button
                class="xs:text-md shadow-lg w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold rounded-full border-2 flex items-center justify-center"
                :style="{
                  boxShadow:
                    '0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)',
                }"
              >
                <Icon
                  v-bind="props"
                  class="w-[16px] h-[16px] xs:w-[18px] xs:h-[18px] focus:outline-none"
                  icon="mdi:post"
                  color="#1864ab"
                />
              </button>
            </Link>
          </template>
        </v-tooltip>
        <!-- Edit -->
        <IconButton
          v-if="mode === 'edit'"
          @click="openDialog"
          icon="mdi:edit"
          color="#1864ab"
        />
      </div>
    </div>
    <!-- trades -->
    <div class="mb-3">
      <div class="pl-2 text-sm xs:text-md font-bold mt-2 mb-1">
        {{ profile.first_name + " " + profile.last_name }}
        {{ "'s Trades :" }}
      </div>
      <template v-for="(option, index) in options" :key="option.name">
        <Badge
          v-if="profile[option.id] === 1"
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
    <CustomDialog
      v-if="mode === 'edit'"
      submitText="Save"
      @submit="handleSubmit"
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
        <!-- <InputError class="mt-2" :message="$page.props.errors.region_id" /> -->
      </div>
      <div class="mb-4 sm:mb-0 mt-4">
        <InputLabel class="font-bold mb-3" value="Trades" />
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
                  tradesPost[option.id]
                    ? 'switch-bg-on-post'
                    : 'switch-bg-off-post',
                ]"
              >
                <div
                  :class="[
                    tradesPost[option.id]
                      ? 'switch-knob-on-post'
                      : 'switch-knob-off-post',
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <!-- <InputError class="mt-2" :message="$page.props.errors.trades" /> -->
      </div>
    </CustomDialog>
  </Card>
</template>
<script setup>
import IconButton from "@/Components/IconButton.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import SelectProfile from "@/Components/SelectProfile.vue";
import Badge from "@/Components/Ratings/Badge.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import Card from "@/Components/Card.vue";

import { Icon } from "@iconify/vue";

import { options } from "@/helpers/dataHelpters.js";
import { Link } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";
import { computed, ref, watch, onMounted } from "vue";
// State
const props = defineProps({
  profile: Object,
  region_name: String,

  screenWidth: Number,
  mode: {
    type: String,
    default: "",
  },
});
const store = useStore();
const referenceList = ref([]);
const selectedReferal = ref(props.region_name);
const dialogRef = ref();

const tradesPost = ref({
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
  trade24: props.profile.trade24,
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
});

//Methods
const toggleSwitch = (field) => {
  tradesPost.value[field] = !tradesPost.value[field];
};
const openDialog = () => {
  dialogRef.value.openDialog();
};

const changeReferal = (value) => {
  selectedReferal.value = value;
  console.log(value);
  // regions.forEach((item) => {
  //   if (value === item.name) {
  //     this.form.region_id = item.id.toString();
  //   }
  // });
};
const handleSubmit = () => {
  console.log(selectedReferal.value, tradesPost.value, "onsubmit");
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
</style>
