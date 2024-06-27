<template>
  <Head title="Pricing Plans" />

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
          <PageTitle linkUrl="/admin" pageTitle="Pricing Plans" />
        </div>

        <div class="font-bold text-3xl text-black leading-tight mt-2 mb-2">
          Pricing Info
        </div>
        <div class="flex justify-end">
          <button
            @click="openCreateDialog"
            class="text-sm py-2 px-4 bg-teal-600 text-white font-bold rounded"
          >
            Create Pricing Plan
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
                  Gold Monthly Price
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Gold Annual Price
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Gold Advertised Price
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Platinum Monthly Price
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Platinum Annual Price
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Platinum Advertised Price
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Sales Tax(%)
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="plan in pricingPlans"
                class="text-center"
                :key="plan.id"
              >
                <td>{{ getRegionName(plan.region_id) }}</td>
                <td>${{ plan?.gold_billed_monthly_price }}</td>
                <td>${{ plan?.gold_billed_annual_price }}</td>
                <td>${{ plan?.gold_advertised_price }}</td>
                <td>${{ plan?.platinum_billed_monthly_price }}</td>
                <td>${{ plan?.platinum_billed_annual_price }}</td>
                <td>${{ plan?.platinum_advertised_price }}</td>
                <td>{{ plan?.sales_tax }}%</td>
                <td class="flex gap-2 justify-center items-center">
                  <Icon
                    icon="mdi:edit"
                    color="#1864ab"
                    @click="openEditDialog(plan)"
                    class="cursor-pointer hover:bg-gray-200 hover:rounded-md w-6 h-6"
                  />
                  <Icon
                    icon="mdi:delete"
                    @click="openDeleteDialog(plan)"
                    color="#e03131"
                    class="cursor-pointer hover:bg-gray-200 hover:rounded-md w-6 h-6"
                  />
                </td>
                <!-- <td>{{ user.appeals_privileges }}</td>
                  <td>{{ user.payments_privileges }}</td>
                  <td>{{ user.posts_privileges }}</td> -->
              </tr>
            </tbody>
          </v-table>
          <v-skeleton-loader
            v-if="pricingPlans?.length === 0 && loading && loadingRegions"
            type="table-tbody"
          >
          </v-skeleton-loader>
          <div class="w-full">
            <div
              v-if="pricingPlans?.length === 0 && !loading"
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No Pricing Details Available
            </div>
          </div>
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
            <InputLabel
              class="font-bold mb-1"
              :value="translations && translations.region"
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
              for="gold_billed_monthly_price"
              value="Gold Monthly Price*"
            />
            <TextInput
              id="gold_billed_monthly_price"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singlePlan.gold_billed_monthly_price"
              placeholder="Type your Monthly Price"
              @input="clearErrors('gold_billed_monthly_price')"
            />
            <InputError
              class="mt-2"
              :message="errors.gold_billed_monthly_price"
            />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="gold_billed_annual_price"
              value="Gold Annual Price*"
            />
            <TextInput
              id="gold_billed_annual_price"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singlePlan.gold_billed_annual_price"
              placeholder="Type your Annual Price"
              @input="clearErrors('gold_billed_annual_price')"
            />
            <InputError
              class="mt-2"
              :message="errors.gold_billed_annual_price"
            />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="gold_advertised_price"
              value="Gold Advertised Price*"
            />
            <TextInput
              id="gold_advertised_price"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singlePlan.gold_advertised_price"
              placeholder="Type your Advertised Price"
              @input="clearErrors('gold_advertised_price')"
            />
            <InputError class="mt-2" :message="errors.gold_advertised_price" />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="platinum_billed_monthly_price"
              value="Platinum Monthly Price*"
            />
            <TextInput
              id="platinum_billed_monthly_price"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singlePlan.platinum_billed_monthly_price"
              placeholder="Type your Monthly Price"
              @input="clearErrors('platinum_billed_monthly_price')"
            />
            <InputError
              class="mt-2"
              :message="errors.platinum_billed_monthly_price"
            />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="platinum_billed_annual_price"
              value="Platinum Annual Price*"
            />
            <TextInput
              id="platinum_billed_annual_price"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singlePlan.platinum_billed_annual_price"
              placeholder="Type your Annual Price"
              @input="clearErrors('platinum_billed_annual_price')"
            />
            <InputError
              class="mt-2"
              :message="errors.platinum_billed_annual_price"
            />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="platinum_advertised_price"
              value="Platinum Advertised Price*"
            />
            <TextInput
              id="platinum_advertised_price"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singlePlan.platinum_advertised_price"
              placeholder="Type your Advertised Price"
              @input="clearErrors('platinum_advertised_price')"
            />
            <InputError
              class="mt-2"
              :message="errors.platinum_advertised_price"
            />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="sales_tax"
              value="Sales Tax(%)*"
            />
            <TextInput
              id="sales_tax"
              type="number"
              class="mt-1 block w-full"
              required
              v-model.trim="singlePlan.sales_tax"
              placeholder="Type your Sales Tax(%)"
              @input="clearErrors('sales_tax')"
            />
            <InputError class="mt-2" :message="errors.sales_tax" />
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
          Do you want to Delete this Pricing Plan?
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
const isAdminUrl = usePage().props.value.auth.user.payments_privileges;

const pricingPlans = ref([]);
const loading = ref(false);
const referenceList = ref([]);
const mode = ref("");
const selectedReferal = ref("");

const singlePlan = ref({});
const loadingEdit = ref(false);
const loadingDelete = ref(false);
const disabled = ref(false);
const editDialogRef = ref();
const deleteDialogRef = ref();
const errors = reactive({
  region_id: "",
  gold_billed_monthly_price: "",
  gold_billed_annual_price: "",
  gold_advertised_price: "",
  platinum_billed_annual_price: "",
  platinum_billed_monthly_price: "",
  platinum_advertised_price: "",
  sales_tax: "",
});

// Mounted
onMounted(async () => {
  store.dispatch("ratings/getRegions");

  loading.value = true;
  await fetchPricingPlans();
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

//Watch
watch(regions, (newVal) => {
  if (newVal.length > 0) {
    console.log(regions, "regions");
    referenceList.value = regions.value.map((item) => item.name);
  }
});
//Methods

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
  if (!singlePlan.value.gold_billed_monthly_price) {
    errors.gold_billed_monthly_price = "Gold Monthly Price is Required";
    isValid = false;
  }
  if (!singlePlan.value.gold_billed_annual_price) {
    errors.gold_billed_annual_price = "Gold Annual Price is Required";
    isValid = false;
  }
  if (!singlePlan.value.gold_advertised_price) {
    errors.gold_advertised_price = "Gold Advertised Price is Required";
    isValid = false;
  }
  if (!singlePlan.value.platinum_billed_monthly_price) {
    errors.platinum_billed_monthly_price = "Platinum Monthly Price is Required";
    isValid = false;
  }
  if (!singlePlan.value.platinum_billed_annual_price) {
    errors.platinum_billed_annual_price = "Platinum Annual Price is Required";
    isValid = false;
  }
  if (!singlePlan.value.platinum_advertised_price) {
    errors.platinum_advertised_price = "Platinum Advertised Price is Required";
    isValid = false;
  }
  if (!singlePlan.value.sales_tax) {
    errors.sales_tax = "Sales Tax is Required";
    isValid = false;
  } else if (+singlePlan.value.sales_tax > 1) {
    errors.sales_tax = "Sales Tax cannot be greater than 1";
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
  if (singlePlan.value[field]?.trim()) {
    errors[field] = "";
  }
};

const changeReferal = (value) => {
  selectedReferal.value = value;
  clearErrors("region_id");
};

const fetchPricingPlans = async () => {
  try {
    const response = await axios.get(
      `/api/admin/payment-info`,
      getAxiosConfig()
    );
    console.log(response, "response");
    if (response.data) {
      pricingPlans.value = [...response.data];
    }
  } catch (err) {
    console.log("hrere ");
    somethingWentWrong(err.response.data.message, "inherit");
  }
};
const getRegionName = (regionId) => {
  return regions.value.find((item) => item.id === regionId).name;
};

const openEditDialog = (plan) => {
  for (let key in errors) {
    errors[key] = "";
  }
  console.log(errors, "errors");
  mode.value = "edit";
  selectedReferal.value = getRegionName(plan.region_id);
  singlePlan.value = JSON.parse(JSON.stringify(plan));
  editDialogRef.value.openDialog();
};
const openCreateDialog = () => {
  for (let key in errors) {
    errors[key] = "";
  }
  console.log(errors, "errors");
  mode.value = "create";
  selectedReferal.value = "";
  singlePlan.value = {};
  editDialogRef.value.openDialog();
};
const openDeleteDialog = (plan) => {
  singlePlan.value = JSON.parse(JSON.stringify(plan));
  deleteDialogRef.value.openDialog();
};

const onClosePriceEdit = () => {
  singlePlan.value = {};
};
const handleEditSubmit = async () => {
  if (validateForm()) {
    console.log(singlePlan.value, "singlePlan.value");
    let region_id = null; // Initialize with a default value
    regions.value.forEach((r) => {
      if (r.name === selectedReferal.value) {
        region_id = r.id;
        return; // Exit the forEach loop once a match is found
      }
    });
    const isRegionUsed = pricingPlans.value.some((plan) => {
      return plan.region_id === region_id && plan.id !== singlePlan.value.id;
    });
    if (isRegionUsed) {
      // Handle the error here. You might want to show an error message to the user.
      somethingWentWrong(
        "This region already has a pricing plan.",
        "inherit",
        3000
      );
      return; // Exit the function early
    }

    const updatedPlan = {
      region_id: region_id,
      sales_tax: +singlePlan.value.sales_tax,
      gold_billed_annual_price: +singlePlan.value.gold_billed_annual_price,
      gold_billed_monthly_price: +singlePlan.value.gold_billed_monthly_price,
      gold_advertised_price: +singlePlan.value.gold_advertised_price,
      platinum_billed_annual_price:
        +singlePlan.value.platinum_billed_annual_price,
      platinum_billed_monthly_price:
        +singlePlan.value.platinum_billed_monthly_price,
      platinum_advertised_price: +singlePlan.value.platinum_advertised_price,
    };
    loadingEdit.value = true;
    disabled.value = true;
    try {
      const response = await axios.put(
        `/api/admin/payment-info/${singlePlan.value.id}`,
        updatedPlan,
        getAxiosConfig()
      );
      console.log(response, "response");
      if (response.data) {
        const index = pricingPlans.value.findIndex((plan, index) => {
          return plan.id === response.data.data.id;
        });
        console.log(pricingPlans.value, "selected", response.data.data);
        pricingPlans.value[index] = response.data.data;
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
      `/api/admin/payment-info/${singlePlan.value.id}`
    );
    if (response.data) {
      changesSaved(
        response.data.message || "Pricing Plan successfully deleted"
      );
      const index = pricingPlans.value.findIndex((plan, index) => {
        return plan.id === singlePlan.value.id;
      });

      if (index !== -1) {
        pricingPlans.value.splice(index, 1);
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
    console.log(singlePlan.value, "singlePlan.value");
    let region_id = null; // Initialize with a default value
    regions.value.forEach((r) => {
      if (r.name === selectedReferal.value) {
        region_id = r.id;
        return; // Exit the forEach loop once a match is found
      }
    });
    const isRegionUsed = pricingPlans.value.some((plan) => {
      return plan.region_id === region_id && plan.id !== singlePlan.value.id;
    });
    if (isRegionUsed) {
      // Handle the error here. You might want to show an error message to the user.
      somethingWentWrong(
        "This region already has a pricing plan.",
        "inherit",
        3000
      );
      return; // Exit the function early
    }

    const planToCreate = {
      region_id: region_id,
      sales_tax: +singlePlan.value.sales_tax,
      gold_billed_annual_price: +singlePlan.value.gold_billed_annual_price,
      gold_billed_monthly_price: +singlePlan.value.gold_billed_monthly_price,
      gold_advertised_price: +singlePlan.value.gold_advertised_price,
      platinum_billed_annual_price:
        +singlePlan.value.platinum_billed_annual_price,
      platinum_billed_monthly_price:
        +singlePlan.value.platinum_billed_monthly_price,
      platinum_advertised_price: +singlePlan.value.platinum_advertised_price,
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
        pricingPlans.value.push(response.data.data);
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
