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
          <SearchInput
            class="mb-0 w-72"
            :barWidth="100"
            icon="iconamoon:search"
            placeholder="Search by coupon code..."
            @search-clicked="onSearch"
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="openCreateDialog"
            class="text-sm py-2 px-4 bg-teal-600 text-white font-bold rounded"
          >
            Create Discount Coupon
          </button>
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
                <th style="text-align: center; font-weight: bold; color: white">
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
                <td>{{ coupon["%_off_regular_price"] }}%</td>
                <td>{{ coupon.months }}</td>
                <td>{{ coupon.start_date }}</td>
                <td>{{ coupon.end_date }}</td>
                <td>
                  <Icon
                    icon="mdi:notes"
                    @click="openNoteDialog(coupon.notes, coupon.id)"
                    class="mx-auto cursor-pointer hover:bg-gray-200 hover:rounded-md w-5 h-5"
                    color="241e6d"
                  />
                </td>
                <td class="flex gap-2 justify-center items-center">
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
        mode === 'edit' ? `Edit Pricing Plan` : 'Create your Pricing Plan'
      "
    >
      <div class="py-2 p-4">
        <div
          class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
        >
          <div>
            <InputLabel class="font-bold mb-1" value="Region" />
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
              for="billed_monthly_price"
              value="Monthly Price*"
            />
            <TextInput
              id="billed_monthly_price"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singleCoupon.billed_monthly_price"
              placeholder="Type your Monthly Price"
              @input="clearErrors('billed_monthly_price')"
            />
            <InputError class="mt-2" :message="errors.billed_monthly_price" />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="billed_annual_price"
              value="Annual Price*"
            />
            <TextInput
              id="billed_annual_price"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singleCoupon.billed_annual_price"
              placeholder="Type your Annual Price"
              @input="clearErrors('billed_annual_price')"
            />
            <InputError class="mt-2" :message="errors.billed_annual_price" />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="advertised_price"
              value="Advertised Tax*"
            />
            <TextInput
              id="advertised_price"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singleCoupon.advertised_price"
              placeholder="Type your Advertised Price"
              @input="clearErrors('advertised_price')"
            />
            <InputError class="mt-2" :message="errors.advertised_price" />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="sales_tax"
              value="Sales Price*"
            />
            <TextInput
              id="sales_tax"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singleCoupon.sales_tax"
              placeholder="Type your Sales Tax"
              @input="clearErrors('sales_tax')"
            />
            <InputError class="mt-2" :message="errors.sales_tax" />
          </div>
          <div class="flex gap-4 mt-2">
            <v-switch
              class="admin-user-fuction-switch"
              v-model="userToEdit.profile.active_user"
              hide-details
              :true-value="true"
              :false-value="false"
              label="Is Valid"
              color="success"
            ></v-switch>
            <InputError class="mt-2" :message="errors.active_user" />
          </div>
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
} from "@/helpers/utilities";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import PageTitle from "@/Components/PageTitle.vue";

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
const isAdminUrl = usePage().props.value.auth.user.appeals_privileges === 1;

const coupons = ref([]);
const loading = ref(false);
const referenceList = ref([]);
const mode = ref("");
const selectedReferal = ref("");

const singleCoupon = ref({});
const loadingEdit = ref(false);
const loadingDelete = ref(false);
const disabled = ref(false);
const editDialogRef = ref();
const deleteDialogRef = ref();
const errors = reactive({
  region_id: "",
  billed_monthly_price: "",
  billed_annual_price: "",
  advertised_price: "",
  sales_tax: "",
});
const sortBy = ref("latest");
const perPage = ref(15);
const searchTerm = ref("");
const pagination = ref(0);
const currentPage = ref(1);

const loadingNextPage = ref(false);
const notesDialogRef = ref();
const note = ref("");
const user_id = ref("");
const editAdmitNoteText = ref(false);
const adminTextAreaRef = ref();
const isTyping = ref(false);

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

const numberOfRows = computed(() => {
  if (!note.value) return 1; // if there's no content, return a default row number
  const charsPerLine = 90;

  return Math.ceil(note.value.length / charsPerLine);
});

//Watch
watch(regions, (newVal) => {
  if (newVal.length > 0) {
    console.log(regions, "regions");
    referenceList.value = regions.value.map((item) => item.name);
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
  users.value = [];

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
  if (!singleCoupon.value.billed_monthly_price) {
    errors.billed_monthly_price = "Monthly Price is Required";
    isValid = false;
  }
  if (!singleCoupon.value.billed_annual_price) {
    errors.billed_annual_price = "Annual Price is Required";
    isValid = false;
  }
  if (!singleCoupon.value.advertised_price) {
    errors.advertised_price = "Advertised Price is Required";
    isValid = false;
  }
  if (!singleCoupon.value.sales_tax) {
    errors.sales_tax = "Sales Tax is Required";
    isValid = false;
  }

  return isValid; // Return the overall validation status
};
const clearErrors = (field) => {
  console.log("Clear errors", field);
  if (field === "region_id") {
    errors[field] = "";
    return;
  }
  if (singleCoupon.value[field]?.trim()) {
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
      `/api/admin/discount-coupon?search=${searchTerm.value}&per_page=${per_page}&page=${page}&sort_by_date=${sortByDate}`,
      getAxiosConfig()
    );
    console.log(response.data, "response");
    if (append) {
      coupons.value = [...coupons.value, ...response.data];
    } else {
      coupons.value = [...response.data];
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

const onSearch = async (term) => {
  searchTerm.value = term;
  await fetchDiscountCouponsWithLoading(false);
};
const openNoteDialog = (userNote, id) => {
  note.value = userNote;
  user_id.value = id;
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
      notes_on_user: note.value
        ? filterBadWordsWithoutValue(note.value)
        : note.value,
    };
    console.log(notes, note.value, "selectedNote");
    try {
      const response = await axios.post(
        `/api/admin/users/${user_id.value}`,
        notes,
        getAxiosConfig()
      );
      console.log(response, "response");
      if (response.data) {
        users.value.forEach((coupon, index) => {
          if (coupon.profile.user_id === user_id.value) {
            users.value[index].profile.notes_on_user = note.value;
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
  user_id.value = "";
};

const openEditDialog = (plan) => {
  for (let key in errors) {
    errors[key] = "";
  }
  console.log(errors, "errors");
  mode.value = "edit";
  selectedReferal.value = getRegionName(plan.region_id);
  singleCoupon.value = JSON.parse(JSON.stringify(plan));
  editDialogRef.value.openDialog();
};
const openCreateDialog = () => {
  for (let key in errors) {
    errors[key] = "";
  }
  console.log(errors, "errors");
  mode.value = "create";
  selectedReferal.value = "";
  singleCoupon.value = {};
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
    console.log(singleCoupon.value, "singleCoupon.value");
    let region_id = null; // Initialize with a default value
    regions.value.forEach((r) => {
      if (r.name === selectedReferal.value) {
        region_id = r.id;
        return; // Exit the forEach loop once a match is found
      }
    });
    const isRegionUsed = coupons.value.some((plan) => {
      return plan.region_id === region_id && plan.id !== singleCoupon.value.id;
    });
    if (isRegionUsed) {
      // Handle the error here. You might want to show an error message to the coupon.
      somethingWentWrong(
        "This region already has a pricing plan.",
        "inherit",
        3000
      );
      return; // Exit the function early
    }

    const updatedPlan = {
      region_id: region_id,
      sales_tax: +singleCoupon.value.sales_tax,
      billed_annual_price: +singleCoupon.value.billed_annual_price,
      billed_monthly_price: +singleCoupon.value.billed_monthly_price,
      advertised_price: +singleCoupon.value.advertised_price,
    };
    loadingEdit.value = true;
    disabled.value = true;
    try {
      const response = await axios.put(
        `/api/admin/payment-info/${singleCoupon.value.id}`,
        updatedPlan,
        getAxiosConfig()
      );
      console.log(response, "response");
      if (response.data) {
        const index = coupons.value.findIndex((plan, index) => {
          return plan.id === response.data.data.id;
        });
        console.log(coupons.value, "selected", response.data.data);
        coupons.value[index] = response.data.data;
        changesSaved(response.data.message);
        setTimeout(() => {
          editDialogRef.value.closeDialog();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
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
        response.data.message || "Pricing Plan successfully deleted"
      );
      const index = coupons.value.findIndex((plan, index) => {
        return plan.id === singleCoupon.value.id;
      });

      if (index !== -1) {
        coupons.value.splice(index, 1);
      }
    }
  } catch (err) {
    console.log(err);
    somethingWentWrong(err.response.data.message, "inherit");
  }
  loadingDelete.value = false;
  disabled.value = false;
  deleteDialogRef.value.closeDialog();
};
const handleCreateSubmit = async () => {
  if (validateForm()) {
    console.log(singleCoupon.value, "singleCoupon.value");
    let region_id = null; // Initialize with a default value
    regions.value.forEach((r) => {
      if (r.name === selectedReferal.value) {
        region_id = r.id;
        return; // Exit the forEach loop once a match is found
      }
    });
    const isRegionUsed = coupons.value.some((plan) => {
      return plan.region_id === region_id && plan.id !== singleCoupon.value.id;
    });
    if (isRegionUsed) {
      // Handle the error here. You might want to show an error message to the coupon.
      somethingWentWrong(
        "This region already has a pricing plan.",
        "inherit",
        3000
      );
      return; // Exit the function early
    }

    const planToCreate = {
      region_id: region_id,
      sales_tax: +singleCoupon.value.sales_tax,
      billed_annual_price: +singleCoupon.value.billed_annual_price,
      billed_monthly_price: +singleCoupon.value.billed_monthly_price,
      advertised_price: +singleCoupon.value.advertised_price,
    };
    loadingEdit.value = true;
    disabled.value = true;
    try {
      const response = await axios.post(
        `/api/admin/payment-info    `,
        planToCreate,
        getAxiosConfig()
      );
      console.log(response, "response");
      if (response.data) {
        coupons.value.push(response.data.data);
        changesSaved(response.data.message);
        setTimeout(() => {
          editDialogRef.value.closeDialog();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
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
