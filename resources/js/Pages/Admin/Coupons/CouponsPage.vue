<template>
  <Head title="Discount Coupons" />

  <Header
    v-if="isAdminUrl"
    :profile="profile"
    :post-search-filters="postSearchFilters"
    contentWidth="1500"
    :showit="showit"
    :show-post-buttons="false"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div class="bg-gray-200 mt-2 flex-col">
      <Card
        :shadowLevel="2"
        style="padding: 4px"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        class="mb-6"
      >
        <div class="flex justify-between">
          <PageTitle linkUrl="/admin" pageTitle="Discount Coupons" />
        </div>

        <!-- Filters -->
        <div class="border-gray-300 border-b-2">
          <heading-card class="mt-3" heading="Sort by" />
          <div class="mb-4 mt-2">
            <div class="flex gap-3 flex-wrap">
              <Button
                :selected="sortBy === 'latest'"
                @onSelect="(selected) => handleFilterSelect(selected, 'latest')"
                >Latest</Button
              >

              <Button
                :selected="sortBy === 'oldest'"
                @onSelect="(selected) => handleFilterSelect(selected, 'oldest')"
                >Oldest</Button
              >
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-4 mb-2 items-center">
          <div class="font-bold text-3xl text-black leading-tight">
            Discount Coupons
          </div>
        </div>
        <div class="flex gap-4 items-center justify-between">
          <SearchInput
            class="mb-0 w-72"
            :barWidth="100"
            icon="iconamoon:search"
            placeholder="Search by coupon code..."
            @search-clicked="onSearch"
          />
          <div class="flex gap-4">
            <v-menu>
              <template v-slot:activator="{ props }">
                <button
                  class="px-4 py-2 rounded bg-blue-600 text-white flex items-center"
                  v-bind="props"
                >
                  Region: {{ selectedRegion }}
                  <Icon class="ml-2 w-6 h-6" icon="gridicons:dropdown"></Icon>
                </button>
              </template>
              <v-list>
                <v-list-item @click="changeRegion('All', 0)">
                  <v-list-item-title>All</v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-for="(item, index) in regions"
                  :key="index"
                  @click="changeRegion(item.name, item.id)"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <button
              @click="openCreateDialog"
              class="text-base py-2 px-4 bg-teal-600 text-white font-bold rounded"
            >
              Create Discount Coupon
            </button>
          </div>
        </div>
        <!-- if no usere -->

        <div class="flex flex-col mt-2">
          <v-table theme="light">
            <thead>
              <tr class="font-bold bg-black">
                <th style="text-align: center; font-weight: bold; color: white">
                  Region
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Coupon Code
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Is Valid
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Discount (%)
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Duration (Months)
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Start Date
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  End Date
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    width: 250px;
                    color: white;
                  "
                >
                  Notes
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="coupon in coupons"
                class="text-center"
                :key="coupon.id"
              >
                <td>{{ getRegionName(coupon.region_id) }}</td>
                <td>{{ coupon.coupon_code }}</td>
                <td>{{ coupon.is_valid ? "Yes" : "No" }}</td>
                <td>{{ coupon["percentage_off_regular_price"] }}%</td>
                <td>{{ coupon.months }}</td>
                <td>{{ coupon.start_date }}</td>
                <td>{{ coupon.end_date }}</td>
                <td>
                  <div :class="`${coupon.notes ? 'my-2' : ''}`">
                    <v-tooltip
                      max-width="300px"
                      :text="coupon.notes"
                      location="top"
                    >
                      <template v-slot:activator="{ props }">
                        <div v-bind="props">
                          {{
                            coupon &&
                            coupon.notes &&
                            coupon?.notes?.substring(0, 60) + "..."
                          }}
                        </div>
                      </template>
                    </v-tooltip>
                    <Icon
                      icon="mdi:notes"
                      @click="openNoteDialog(coupon.notes, coupon.id)"
                      class="mx-auto cursor-pointer hover:bg-gray-200 hover:rounded-md w-5 h-5"
                      color="241e6d"
                    />
                  </div>
                </td>
                <td class="">
                  <div class="flex gap-2 justify-center items-center">
                    <Icon
                      icon="mdi:edit"
                      color="#1864ab"
                      @click="openEditDialog(coupon)"
                      class="cursor-pointer hover:bg-gray-200 hover:rounded-md w-6 h-6"
                    />
                    <Icon
                      icon="mdi:delete"
                      @click="openDeleteDialog(coupon)"
                      color="#e03131"
                      class="cursor-pointer hover:bg-gray-200 hover:rounded-md w-6 h-6"
                    />
                  </div>
                </td>
                <!-- <td>{{ coupon.appeals_privileges }}</td>
                    <td>{{ coupon.payments_privileges }}</td>
                    <td>{{ coupon.posts_privileges }}</td> -->
              </tr>
            </tbody>
          </v-table>
          <v-skeleton-loader
            v-if="coupons?.length === 0 && loading"
            type="table-tbody"
          >
          </v-skeleton-loader>
          <div class="w-full">
            <div
              v-if="coupons?.length === 0 && !loading"
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No Coupons Available
            </div>
          </div>
          <v-lazy
            :min-height="5"
            :options="{ threshold: 0.5 }"
            v-if="pagination && +currentPage !== +pagination?.last_page"
            @update:model-value="loadMoreCoupons"
            transition="fade-transition"
          ></v-lazy>
          <div
            v-if="
              currentPage > 1 &&
              !loadingNextPage &&
              +currentPage === +pagination?.last_page
            "
            class="text-center font-bold mt-4"
          >
            No More Coupons to Load
          </div>
          <v-skeleton-loader
            v-if="+currentPage !== +pagination?.last_page && loadingNextPage"
            type="table-tbody"
          >
          </v-skeleton-loader>
        </div>
      </Card>
    </div>
    <!-- for edit -->
    <CustomDialog
      dialogWidth="width780px"
      :disableOutSideClick="true"
      ref="editDialogRef"
      :loading="loadingEdit"
      @submit="
        () => {
          if (mode === 'edit') {
            handleEditSubmit();
          } else {
            handleCreateSubmit();
          }
        }
      "
      :disabled="disabled"
      @closed="onClosePriceEdit"
      :title="
        mode === 'edit' ? `Edit Discount Coupon` : 'Create your Discount Coupon'
      "
    >
      <div class="py-2 p-4">
        <div
          class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
        >
          <div>
            <InputLabel
              class="font-bold mb-1"
              :value="translations && translations.region + '*'"
            />
            <SelectProfile
              :options="referenceList"
              :modelValue="selectedReferal"
              @update:modelValue="changeReferal"
            />
            <InputError class="mt-2" :message="errors.region_id" />
          </div>

          <div>
            <InputLabel
              class="font-bold"
              for="coupon_code"
              value="Coupon Code*"
            />
            <TextInput
              id="coupon_code"
              type="text"
              class="mt-1 block w-full"
              required
              v-model.trim="singleCoupon.coupon_code"
              placeholder="Type your Coupon Code"
              @input="clearErrors('coupon_code')"
            />
            <InputError class="mt-2" :message="errors.coupon_code" />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="off_price"
              value="Discount (%)*"
            />
            <TextInput
              id="off_price"
              type="number"
              min="0"
              max="100"
              class="mt-1 block w-full"
              required
              v-model.trim="singleCoupon['percentage_off_regular_price']"
              placeholder="Type your Discount (%)"
              @input="clearErrors('off_price')"
            />
            <InputError class="mt-2" :message="errors.off_price" />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="months"
              value="Duration (Months)*"
            />
            <TextInput
              id="months"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singleCoupon.months"
              placeholder="Type your coupon Duration (Months)"
              @input="clearErrors('months')"
            />
            <InputError class="mt-2" :message="errors.months" />
          </div>
          <div
            v-click-outside="{
              handler: handleOutsideClick,
              closeConditional: onCloseConditional,
            }"
          >
            <InputLabel
              class="font-bold"
              for="months"
              value="Select Coupon Start and End date*"
            />

            <input-icon
              icon="mdi:calendar"
              color="#241e6d"
              placeholder="MM/DD/YYYY - MM/DD/YYYY"
              :cursor="true"
              readonly
              onfocus="this.removeAttribute('readonly');"
              v-model="displayDateRange"
              @input="clearErrors('start_end_date')"
              inputClasses="border-gray-300 focus:ring-indigo-500 py-2 px-3 border-2"
              @click="toggleDatePicker"
              class="mt-1 block w-full cursor-pointer"
            />
            <div class="relative">
              <DatePicker
                v-if="isDatePickerShown"
                v-model.range="range"
                :mode="dateMode"
                style="width: 100%; position: absolute; z-index: 9999"
                :rules="rules"
                @update:modelValue="updateDateRange"
              />
            </div>
            <InputError class="mt-2" :message="errors.start_end_date" />
          </div>
        </div>
        <div class="flex gap-4 self-start">
          <v-switch
            class="admin-user-fuction-switch text-base"
            v-model="singleCoupon.is_valid"
            hide-details
            :true-value="1"
            :false-value="0"
            label="Is Valid"
            color="success"
          ></v-switch>
        </div>
        <div class="w-full mt-0">
          <InputLabel class="font-bold" for="notes" value="Notes" />
          <textarea
            id="notes"
            v-model="singleCoupon.notes"
            style="height: 10.4rem; border: 1px solid grey"
            :placeholder="translations && translations.type_your_notes"
            class="text-sm w-full py-1 px-3 focus:shadow-none focus:ring-gray-600 focus:rounded font-semibold text-grey-600 border-none resize-none bg-transparent rounded"
          ></textarea>
        </div>
      </div>
    </CustomDialog>

    <!-- for delete -->
    <CustomDialog
      submitText="Delete"
      :disableOutSideClick="true"
      @submit="handleSubmitDelete"
      ref="deleteDialogRef"
      :loading="loadingDelete"
      :disabled="disabled"
      errorIcon
      dialogWidth="max-h-[70vh] width50"
      title="Are you sure? "
    >
      <div class="mb-4">
        <div
          class="section_text-lg font-bold pl-6 section_text-gray-800 mt-3 mb-2"
        >
          Do you want to Delete this Discount Coupon?
        </div>
      </div>
    </CustomDialog>

    <CustomDialog
      dialogWidth="width780px"
      :showFooter="false"
      :disableOutSideClick="false"
      ref="notesDialogRef"
      @closed="onCloseNote"
      title="Notes"
    >
      <div class="flex gap-2 my-4 mx-2">
        <div class="w-full">
          <Card
            :shadowLevel="1"
            :isInside="true"
            :padding="'5px'"
            class="w-full self-stretch h-full"
            bgColor="#edfaff"
          >
            <p
              class="text-sm font-semibold py-1 px-3 text-grey-600"
              v-if="!editAdmitNoteText && note && !isTyping"
              style="height: 10.4rem"
            >
              {{ note }}
            </p>
            <textarea
              v-else
              v-model="note"
              @blur="stopTyping"
              ref="adminTextAreaRef"
              style="height: 10.4rem; border: 1px solid grey"
              @keydown="saveNotes"
              :placeholder="translations && translations.type_your_notes"
              class="text-sm w-full py-1 px-3 focus:shadow-none focus:ring-gray-600 focus:rounded text-grey-600 border-none resize-none bg-transparent rounded"
              :rows="numberOfRows"
            ></textarea>
          </Card>
        </div>
        <div class="flex gap-2 flex-col items-center self-start">
          <button
            class="rounded-md border-2 w-28 px-2 py-1 py-2 text-sm text-center"
            @click="focusTextarea"
          >
            Edit Notes
          </button>
        </div>
      </div>
    </CustomDialog>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import Button from "@/Components/Ratings/Button.vue";
import axios from "axios";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import SelectProfile from "@/Components/SelectProfile.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import InputIcon from "@/Components/InputIcon.vue";

import { Icon } from "@iconify/vue";

import Card from "@/Components/Card.vue";

import {
  ref,
  onMounted,
  computed,
  onBeforeMount,
  watch,
  reactive,
  nextTick,
} from "vue";
import SearchInput from "@/Components/Ratings/SearchInput.vue";

import {
  filterBadWordsWithoutValue,
  somethingWentWrong,
  changesSaved,
  formatDateToDashDate,
  convertDashDateToDateObjectFormat,
} from "@/helpers/utilities";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import PageTitle from "@/Components/PageTitle.vue";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";

// State
const props = defineProps({
  profile: Object,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});

const store = useStore();
const isAdminUrl = usePage().props.value.auth.user.payments_privileges;

const coupons = ref([]);
const loading = ref(false);
const referenceList = ref([]);
const selectedRegion = ref("All");
const mode = ref("");
const selectedReferal = ref("");
const regionId = ref(0);
const singleCoupon = ref({});
const loadingEdit = ref(false);
const loadingDelete = ref(false);
const disabled = ref(false);
const editDialogRef = ref();
const deleteDialogRef = ref();
const errors = reactive({
  region_id: "",
  coupon_code: "",
  off_price: "",
  months: "",
  start_end_date: "",
});
const sortBy = ref("latest");
const perPage = ref(15);
const searchTerm = ref("");
const pagination = ref(0);
const currentPage = ref(1);

const loadingNextPage = ref(false);
const notesDialogRef = ref();
const note = ref("");
const coupon_id = ref("");
const isDatePickerShown = ref(false);
const editAdmitNoteText = ref(false);
const adminTextAreaRef = ref();
const isTyping = ref(false);

// const range = ref({
//   start: new Date(2023, 10, 6),
//   end: new Date(2023, 11, 10),
// });

// range picker
const range = ref({});
const dateMode = ref("date");
const rules = ref([
  {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  },
  {
    hours: 23,
    minutes: 59,
    seconds: 59,
    milliseconds: 999,
  },
]);
const onCloseConditional = (e) => {
  return isDatePickerShown.value;
};
const toggleDatePicker = () => {
  isDatePickerShown.value = !isDatePickerShown.value;
};

const displayDateRange = computed(() => {
  if (!range.value || !range.value.start || !range.value.end) {
    return "";
  }
  return `${range.value.start.toLocaleDateString()} - ${range.value.end.toLocaleDateString()}`;
});

const updateDateRange = () => {
  toggleDatePicker();
};
const handleOutsideClick = () => {
  if (isDatePickerShown.value) {
    toggleDatePicker();
  }
};

// Mounted
onMounted(async () => {
  store.dispatch("ratings/getRegions");

  loading.value = true;
  await fetchDiscountCoupons();
  loading.value = false;
});
onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});

// Computed
const regions = computed(() => store.state.ratings.allRegions);
const loadingRegions = computed(() => store.state.ratings.loading);
const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);
const numberOfRows = computed(() => {
  if (!note.value) return 1; // if there's no content, return a default row number
  const charsPerLine = 90;

  return Math.ceil(note.value.length / charsPerLine);
});

//Watch
watch(regions, (newVal) => {
  if (newVal.length > 0) {
    referenceList.value = regions.value.map((item) => item.name);
  }
});
watch(range, () => {
  if (range.value.start) {
    errors.start_end_date = "";
  }
});
//Methods

const loadMoreCoupons = async () => {
  loadingNextPage.value = true;
  let pageToLoad = currentPage.value + 1;
  await fetchDiscountCoupons(perPage.value, pageToLoad);

  loadingNextPage.value = false;
  currentPage.value = pageToLoad;
};

const handleFilterSelect = async (selected, sortByRate) => {
  if (selected) {
    sortBy.value = sortByRate;
  }
  coupons.value = [];

  await fetchDiscountCouponsWithLoading(false);
};

const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }

  if (!selectedReferal.value) {
    errors.region_id = "Region is Required";
    isValid = false; // Set to false if validation fails
  }
  if (!singleCoupon.value.coupon_code) {
    errors.coupon_code = "Coupon Code is Required";
    isValid = false;
  }
  if (
    !singleCoupon.value["percentage_off_regular_price"] ||
    isNaN(singleCoupon.value["percentage_off_regular_price"])
  ) {
    errors.off_price = "Discount Percentage is Required";
    isValid = false;
  }
  if (
    +singleCoupon.value["percentage_off_regular_price"] < 0 ||
    +singleCoupon.value["percentage_off_regular_price"] > 100
  ) {
    errors.off_price = "Please enter a value between 0 and 100.";
  }
  if (!singleCoupon.value.months || isNaN(singleCoupon.value.months)) {
    errors.months = "Months is Required ";
    isValid = false;
  }
  if (!range.value?.start || !range.value?.end) {
    errors.start_end_date = "Start and End Coupon Date are Required";
    isValid = false;
  } else if (range.value?.start > range.value?.end) {
    errors.start_end_date = "Start Date should be before End Date";
    isValid = false;
  }

  return isValid; // Return the overall validation status
};
const clearErrors = (field) => {
  if (field === "region_id") {
    errors[field] = "";
    return;
  }

  if (singleCoupon.value[field]?.trim()) {
    errors[field] = "";
  }
  if (field === "off_price" || field === "start_end_date") {
    errors[field] = "";
  }
};

const changeReferal = (value) => {
  selectedReferal.value = value;
  clearErrors("region_id");
};

const getRegionName = (regionId) => {
  return regions.value.find((item) => item.id === regionId).name;
};

// Fetch REviews
const fetchDiscountCoupons = async (
  per_page = perPage.value,
  page = 1,
  append = true
) => {
  let sortByDate = "";
  if (sortBy.value === "latest" || sortBy.value === "oldest") {
    sortByDate = sortBy.value;
  }
  try {
    const response = await axios.get(
      `/api/admin/discount-coupon/${regionId.value}/all?search=${searchTerm.value}&per_page=${per_page}&page=${page}&sort_by_date=${sortByDate}`,
      getAxiosConfig()
    );

    if (append) {
      coupons.value = [...coupons.value, ...response.data.couponCodes];
    } else {
      coupons.value = [...response.data.couponCodes];
    }
    pagination.value = response.data?.pagination;
  } catch (err) {
    somethingWentWrong();
  }
};

const fetchDiscountCouponsWithLoading = async (append = true) => {
  loading.value = true;
  await fetchDiscountCoupons(perPage.value, 1, append);
  loading.value = false;
};
const changeRegion = (regionName, region_id) => {
  selectedRegion.value = regionName;
  regionId.value = region_id;
  fetchDiscountCouponsWithLoading(false);
};

const onSearch = async (term) => {
  searchTerm.value = term;
  await fetchDiscountCouponsWithLoading(false);
};
const openNoteDialog = (couponNote, id) => {
  note.value = couponNote;
  coupon_id.value = id;
  notesDialogRef.value.openDialog();
};

const focusTextarea = async () => {
  editAdmitNoteText.value = true;
  await nextTick();
  adminTextAreaRef.value.focus();
};
const stopTyping = () => {
  isTyping.value = false;
  editAdmitNoteText.value = false;
};
let saveTimeout = null;

const saveNotes = () => {
  isTyping.value = true;
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Start a new timer
  saveTimeout = setTimeout(async () => {
    const notes = {
      notes: note.value ? filterBadWordsWithoutValue(note.value) : note.value,
    };

    try {
      const response = await axios.put(
        `/api/admin/discount-coupon/${coupon_id.value}`,
        notes,
        getAxiosConfig()
      );

      if (response.data) {
        coupons.value.forEach((coupon, index) => {
          if (coupon.id === coupon_id.value) {
            coupons.value[index].notes = note.value;
          }
        });
      }
    } catch (err) {
      somethingWentWrong(err.response.data.message, 450, 20000);
    }
  }, 1000);
};
const onCloseNote = () => {
  note.value = "";
  coupon_id.value = "";
};

const openEditDialog = (coupon) => {
  for (let key in errors) {
    errors[key] = "";
  }
  mode.value = "edit";
  selectedReferal.value = getRegionName(coupon.region_id);
  singleCoupon.value = JSON.parse(JSON.stringify(coupon));
  range.value.start = convertDashDateToDateObjectFormat(coupon.start_date);
  range.value.end = convertDashDateToDateObjectFormat(coupon.end_date);

  editDialogRef.value.openDialog();
};
const openCreateDialog = () => {
  for (let key in errors) {
    errors[key] = "";
  }
  mode.value = "create";
  selectedReferal.value = "";
  singleCoupon.value = { is_valid: 1 };
  range.value = {};
  editDialogRef.value.openDialog();
};
const openDeleteDialog = (coupon) => {
  singleCoupon.value = JSON.parse(JSON.stringify(coupon));
  deleteDialogRef.value.openDialog();
};

const onClosePriceEdit = () => {
  singleCoupon.value = {};
};
const handleEditSubmit = async () => {
  if (validateForm()) {
    let region_id = null; // Initialize with a default value
    regions.value.forEach((r) => {
      if (r.name === selectedReferal.value) {
        region_id = r.id;
        return; // Exit the forEach loop once a match is found
      }
    });

    const couponToUpdate = {
      region_id: region_id,
      is_valid: singleCoupon.value.is_valid,

      percentage_off_regular_price:
        +singleCoupon.value["percentage_off_regular_price"],
      months: +singleCoupon.value.months,
      coupon_code: singleCoupon.value.coupon_code,
      start_date: formatDateToDashDate(range.value.start),
      end_date: formatDateToDashDate(range.value.end),
      notes: singleCoupon.value.notes,
    };

    loadingEdit.value = true;
    disabled.value = true;
    try {
      const response = await axios.put(
        `/api/admin/discount-coupon/${singleCoupon.value.id}`,
        couponToUpdate,
        getAxiosConfig()
      );

      if (response.data) {
        const index = coupons.value.findIndex((plan, index) => {
          return plan.id === response.data.data.id;
        });

        coupons.value[index] = response.data.data;
        changesSaved(response.data.message);
        setTimeout(() => {
          editDialogRef.value.closeDialog();
        }, 2000);
      }
    } catch (err) {
      somethingWentWrong(err.response.data.message, "inherit");
    } finally {
      loadingEdit.value = false;
      disabled.value = false;
    }
  }
};
const handleSubmitDelete = async () => {
  loadingDelete.value = true;
  disabled.value = true;
  try {
    const response = await axios.delete(
      `/api/admin/discount-coupon/${singleCoupon.value.id}`
    );
    if (response.data) {
      changesSaved(
        response.data.message || "Discount Coupon successfully deleted"
      );
      const index = coupons.value.findIndex((plan, index) => {
        return plan.id === singleCoupon.value.id;
      });

      if (index !== -1) {
        coupons.value.splice(index, 1);
      }
    }
  } catch (err) {
    somethingWentWrong(err.response.data.message, "inherit");
  }
  loadingDelete.value = false;
  disabled.value = false;
  deleteDialogRef.value.closeDialog();
};
const handleCreateSubmit = async () => {
  if (validateForm()) {
    let region_id = null; // Initialize with a default value
    regions.value.forEach((r) => {
      if (r.name === selectedReferal.value) {
        region_id = r.id;
        return; // Exit the forEach loop once a match is found
      }
    });

    const couponToCreate = {
      region_id: region_id,
      is_valid: singleCoupon.value.is_valid,

      percentage_off_regular_price:
        +singleCoupon.value["percentage_off_regular_price"],
      months: +singleCoupon.value.months,
      coupon_code: singleCoupon.value.coupon_code,
      start_date: formatDateToDashDate(range.value.start),
      end_date: formatDateToDashDate(range.value.end),
      notes: filterBadWordsWithoutValue(singleCoupon.value.notes),
    };

    loadingEdit.value = true;
    disabled.value = true;
    try {
      const response = await axios.post(
        `/api/admin/discount-coupon`,
        couponToCreate,
        getAxiosConfig()
      );

      if (response.data) {
        coupons.value.push(response.data.data);
        changesSaved(response.data.message);
        setTimeout(() => {
          editDialogRef.value.closeDialog();
        }, 2000);
      }
    } catch (err) {
      somethingWentWrong(err.response.data.message, "inherit");
    } finally {
      loadingEdit.value = false;
      disabled.value = false;
    }
  }
};
</script>

<style scoped>
button.selected {
  background-color: #3a357c;
  color: #fff;
}
button {
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}
.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > th,
.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
  padding: 0 8px;
}
</style>
