<template>
  <Head title="Cancel Subscription Requests" />

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
          <PageTitle
            linkUrl="/admin"
            pageTitle="Cancel Subscription Requests"
          />
        </div>

        <div class="font-bold text-3xl text-black leading-tight mt-2 mb-2">
          All Cancel Subscription Requests
        </div>

        <!-- if no usere -->

        <div class="flex flex-col mt-2">
          <v-table theme="light">
            <thead>
              <tr class="font-bold bg-black">
                <th style="text-align: center; font-weight: bold; color: white">
                  User Id
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Subscription Plan
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Billing Start Date
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Billing End Date
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Plan Amount
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Discount Amount
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Discount End Date
                </th>
                <!-- <th style="text-align: center; font-weight: bold; color: white">
                  Sales Tax(%)
                </th> -->
                <th style="text-align: center; font-weight: bold; color: white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="request in cancelRequests"
                class="text-center"
                :key="request.id"
              >
                <td>{{ request?.user_id }}</td>
                <td>{{ request?.subscription_plan }}</td>

                <td>{{ formatDateTime(request?.started_at) }}</td>
                <td>{{ formatDateTime(request?.ends_at) }}</td>
                <td>{{ request?.original_amount }}$</td>
                <td>
                  {{
                    request?.discount_amount > 0
                      ? request?.discount_amount + "$"
                      : "No Discount"
                  }}
                </td>
                <td>
                  {{
                    request?.discount_end_date
                      ? formatDateTime(request?.discount_end_date)
                      : "No Discount"
                  }}
                </td>
                <!-- <td>{{ request?.sales_tax }}$</td> -->

                <td class="flex gap-2 justify-center items-center">
                  <button
                    @click="onAccept(request?.user_id)"
                    :class="[
                      'w-20  py-2 border-2 font-medium text-sm sm:text-lg rounded transition transform duration-300 hover:shadow-lg active:scale-95 bg-teal-600 text-white',
                    ]"
                  >
                    Accept
                  </button>
                  <button
                    @click="onReject(request?.user_id)"
                    :class="[
                      'w-20  py-2 border-2 font-medium text-sm sm:text-lg rounded transition transform duration-300 hover:shadow-lg active:scale-95 bg-red-600 text-white',
                    ]"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-skeleton-loader
            v-if="cancelRequests?.length === 0 && loading"
            type="table-tbody"
          >
          </v-skeleton-loader>
          <div class="w-full">
            <div
              v-if="cancelRequests?.length === 0 && !loading"
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No Cancel Requests Available
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- for delete -->
    <CustomDialog
      submitText="Accept"
      :disableOutSideClick="true"
      @submit="onSubmitAccept"
      ref="acceptDialogRef"
      :loading="loadingAccept"
      :disabled="loadingAccept"
      dialogWidth="max-h-[70vh] width50"
      title="Are you sure? "
    >
      <div class="mb-4">
        <div
          class="section_text-lg font-bold pl-6 section_text-gray-800 mt-3 mb-2"
        >
          Do you want to Cancel the subscription for this user ?
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
  reactive,
  nextTick,
} from "vue";
import SearchInput from "@/Components/Ratings/SearchInput.vue";

import {
  somethingWentWrong,
  formatDateTime,
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

const cancelRequests = ref([]);
const loading = ref(false);
const userId = ref(null);

const loadingAccept = ref(false);
const editDialogRef = ref();
const acceptDialogRef = ref();

// Mounted
onMounted(async () => {
  loading.value = true;
  await fetchCancelRequests();
  loading.value = false;
});
onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});

// Computed
const screenWidth = computed(() => store.getters.screenWidth);

//Watch

//Methods

const fetchCancelRequests = async () => {
  try {
    const response = await axios.get(
      `/api/admin/cancellation-requests`,
      getAxiosConfig()
    );
    console.log(response, "response");
    if (response.data) {
      cancelRequests.value = [...response.data];
    }
  } catch (err) {
    somethingWentWrong();
  }
};

const onAccept = (user_id) => {
  userId.value = user_id;
  acceptDialogRef.value.openDialog();
};

const onSubmitAccept = async () => {
  loadingAccept.value = true;

  try {
    const response = await axios.post(
      `/api/admin/accept-cancellation/${userId.value}`,
      {},
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(
        response.data.message || "Cancel request successfully accepted"
      );
      //   const index = cancelRequests.value.findIndex((plan, index) => {
      //     return plan.id === singlePlan.value.id;
      //   });

      //   if (index !== -1) {
      //     cancelRequests.value.splice(index, 1);
      //   }
      setTimeout(() => {
        fetchCancelRequests();
      }, 2000);
    }
  } catch (err) {
    console.log(err);
    somethingWentWrong(err.response.data.message, "inherit");
  }
  loadingAccept.value = false;
  acceptDialogRef.value.closeDialog();
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
