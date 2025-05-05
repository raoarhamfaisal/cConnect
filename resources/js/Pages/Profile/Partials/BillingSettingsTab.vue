<script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import Card from "@/Components/Card.vue";

import SettingPricingPlans from "@/Pages/Profile/Partials/main/SettingPricingPlans.vue";

import {
  changesSaved,
  somethingWentWrong,
  formatDateTime,
} from "@/helpers/utilities";
import { Icon } from "@iconify/vue";
import PricingVersions from "@/Components/Pricing/PricingVersions.vue";
import DialogUpdatePaymentMethod from "@/Components/Pricing/DialogUpdatePaymentMethod.vue";
import { VWindowItem, VWindow } from "vuetify/components";

import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-vue3";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  user_id: {
    type: [String, Number],
    default: 0,
  },
  profile: Object,
});
const cancelSubscriptionDialogRef = ref();
const loading = ref(true);
const planType = ref("monthly");
const pricingPlan = ref({
  original_amount: "30",
  sales_tax: "0",
});
const coupon = ref({});
const store = useStore();
const step = ref(1);
const updatePaymentMethodDialogRef = ref(null);
const isUpdateAndSubscribe = ref(false);
const paymentHistoryDialogRef = ref(null);
const paymentHistoryArray = ref([]);
const loadingPaymentHistoryDetails = ref(false);
//onMounted

onMounted(() => {
  store.dispatch("fetchUserVersion");
  fetchActiveSubscriptionDetails();
});
const userVersion = computed(() => store.getters.userVersion);
const translations = computed(() => store.getters.translations);
const screenWidth = computed(() => store.getters.screenWidth);
const userVersionText = computed(() =>
  userVersion.value === 1
    ? "FREE"
    : userVersion.value === 2
    ? "GOLD"
    : userVersion.value === 3
    ? "PLATINUM"
    : "No Pricing Plan Found"
);

//Computed
const monthlyTotal = computed(() => {
  // Calculate the original monthly price with tax
  const originalMonthlyTotal = +pricingPlan.value.original_amount;

  // If there's a coupon
  if (coupon.value && coupon.value.percentage_off_regular_price) {
    // Calculate the discount for the monthly price
    const monthlyDiscount =
      (originalMonthlyTotal * coupon.value.percentage_off_regular_price) / 100;

    // Return the discounted monthly total
    return (
      originalMonthlyTotal -
      monthlyDiscount +
      +(+pricingPlan.value.sales_tax * 0.01 * originalMonthlyTotal)
    );
  }

  // Return the original monthly total if there's no coupon.value
  return (
    originalMonthlyTotal +
    +(+pricingPlan.value.sales_tax * 0.01 * originalMonthlyTotal)
  );
});

const annualTotal = computed(() => {
  // Calculate the original annual price with tax for 12 months
  const originalAnnualTotal = +pricingPlan.value.original_amount;

  // If there's a coupon.value
  if (coupon.value && coupon.value.percentage_off_regular_price) {
    // Calculate the discount for the annual price
    const annualDiscount =
      (originalAnnualTotal * coupon.value.percentage_off_regular_price) / 100;

    // Return the discounted annual total
    return (
      originalAnnualTotal -
      annualDiscount +
      +pricingPlan.value.sales_tax * 0.01 * originalAnnualTotal
    );
  }

  // Return the original annual total if there's no coupon
  return (
    originalAnnualTotal +
    +pricingPlan.value.sales_tax * 0.01 * originalAnnualTotal
  );
});

//Methods

const fetchActiveSubscriptionDetails = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `/api/payment/subscription-details/${props.user_id}`,
      getAxiosConfig()
    );

    if (response.data) {
      const data = response.data.data;
      planType.value = data.subscription_plan.includes("Annual")
        ? "annual"
        : "monthly";
      pricingPlan.value = { ...pricingPlan.value, ...data };

      pricingPlan.value.sales_tax = response.data.paymentInfo.sales_tax;
    }
  } catch (err) {
    // somethingWentWrong();
  } finally {
    loading.value = false;
  }
};

const openAssuringCancelSubDialog = () => {
  cancelSubscriptionDialogRef.value.openDialog();
};
const handleCancelSubscription = async () => {
  loading.value = true;

  try {
    const response = await axios.post(
      `/api/subscription/request-cancellation/${props.user_id}`,
      {},
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(
        translations.value && translations.value.cancellation_request_received
      );
      cancelSubscriptionDialogRef.value.closeDialog();
    }
  } catch (err) {
    console.log(err);
    somethingWentWrong(err.response.data.message, "inherit");
  } finally {
    loading.value = false;
  }
};

const onUpdatePaymentMethod = () => {
  isUpdateAndSubscribe.value = false;
  updatePaymentMethodDialogRef.value.openDialog();
};

const updatePaymentMethodAndSubscribe = () => {
  isUpdateAndSubscribe.value = true;

  updatePaymentMethodDialogRef.value.openDialog();
};

const openPaymnetHistoryDialog = () => {
  fetchPaymentHistoryDetails();
  paymentHistoryDialogRef.value.openDialog();
};

const fetchPaymentHistoryDetails = async () => {
  loadingPaymentHistoryDetails.value = true;

  try {
    const response = await axios.get(
      `/api/user/${props.user_id}/payment-history`,
      getAxiosConfig()
    );
    if (response.data) {
      paymentHistoryArray.value = response.data.reverse();
    }
  } catch (err) {
    somethingWentWrong(err.response.data.message, "inherit");
  } finally {
    loadingPaymentHistoryDetails.value = false;
  }
};
</script>

<template>
  <DialogUpdatePaymentMethod
    ref="updatePaymentMethodDialogRef"
    :profile="profile"
    :isUpdateAndSubscribe="isUpdateAndSubscribe"
  />
  <div
    v-if="step > 1"
    @click="step--"
    class="cursor-pointer flex gap-2 mb-1 items-center"
  >
    <Icon class="w-6 h-6" icon="ion:arrow-back" color="#241e6d" />
    <div class="font-bold text-xl text-blue-rgba leading-tight">
      <div>{{ translations && translations.back }}</div>
    </div>
  </div>
  <section>
    <header
      class="flex max-sm:flex-col max-sm:gap-4 sm:justify-between sm;items-center"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">
          {{ translations && translations.billing_version }}
        </h2>
        <!-- <p class="mt-1 text-sm text-gray-600">
          The next billing will be made with selected payment method below
        </p> -->
      </div>

      <div
        class="inline-flex items-center justify-center px-2 py-2 sm:px-3 sm:py-2 py-1 bg-teal-600 sm:text-xs font-bold leading-none uppercase text-white rounded-full self-start"
        v-if="
          Object.keys(pricingPlan).length > 2 &&
          pricingPlan.is_cancellation_requested
        "
      >
        {{ translations && translations.under_cancellation }}
      </div>

      <div
        class="uppercase text-xl font-semibold text-blue-rgba"
        v-if="step !== 3"
      >
        {{ translations && translations.current_plan }} :
        <span class="font-extrabold">{{ userVersionText }}</span>
      </div>
    </header>
    <PricingVersions
      v-if="userVersion === 1"
      :showRightVersionText="false"
      pageName="settings"
    />

    <div
      class="h-96 flex items-center justify-center font-semibold"
      v-if="
        Object.keys(pricingPlan).length === 2 && !loading && userVersion > 1
      "
    >
      No Billing or Subscription Details available for you
    </div>

    <v-window
      v-model="step"
      v-if="
        !loading && Object.keys(pricingPlan).length > 2 && userVersion !== 1
      "
    >
      <v-window-item :value="1">
        <div>
          <div class="flex justify-center gap-2 max-sm:flex-col w-full">
            <div
              class="w-full sm:w-1/2 text-center flex flex-col gap-3 mt-2 sm:mt-8 items-center"
            >
              <button
                v-if="userVersion === 2"
                class="inline-block tex-center text-white py-2 w-full sm:w-2/3 font-bold uppercase px-4 rounded-lg hover:bg-teal-600 bg-teal-green transition transform duration-300 hover:shadow-lg active:scale-95 border-2"
                @click="step = 2"
              >
                {{ translations && translations.upgrade }}
              </button>
              <button
                class="inline-block tex-center py-2 w-full sm:w-2/3 font-bold uppercase px-4 rounded-lg hover:bg-gray-200 border-2 border-gray-500 transition transform duration-300 hover:shadow-lg active:scale-95"
                @click="onUpdatePaymentMethod"
              >
                {{ translations && translations.update_payment_method }}
              </button>
              <button
                class="inline-block tex-center py-2 w-full sm:w-2/4 font-bold uppercase px-4 rounded-lg hover:bg-gray-200 border-2 border-gray-500 transition transform duration-300 hover:shadow-lg active:scale-95"
                @click="openPaymnetHistoryDialog"
              >
                {{ translations && translations.payment_history }}
              </button>
            </div>
            <!-- pricing plan side -->
            <div class="w-full sm:w-1/2">
              <div class="mb-4 mt-8">
                <!-- <div class="font-medium text-base">Monthly</div> -->
                <div
                  :class="[
                    'shadow-md border-2 cursor-pointer mt-2 relative  active:scale-100  p-5 rounded',
                    planType
                      ? 'border-[#4169E1]'
                      : 'border-black hover:scale-[1.02]',
                  ]"
                  @click="selectPlan('monthly')"
                  style="transition: all 0.3s ease-in-out"
                >
                  <div class="flex flex-col items-center justify-center">
                    <h2 class="text-xl sm:text-2xl font-bold mb-2">
                      {{
                        planType === "monthly"
                          ? "MONTHLY"
                          : translations && translations.annual_cap
                      }}
                    </h2>
                    <div
                      class="price-tag w-40 h-40 sm:w-40 sm:h-40 border-2 rounded-full flex items-center justify-center"
                      :class="{
                        'bg-[#4169E1] border-[#4169E1] text-white': planType,
                        'bg-white border-black text-black': !planType,
                      }"
                    >
                      <span class="text-lg sm:text-2xl"
                        >${{
                          parseFloat(pricingPlan.final_amount).toFixed(2)
                        }}</span
                      >
                      <span class="text-xs ml-1"
                        >/{{ planType === "monthly" ? "mo" : "yr" }}</span
                      >
                    </div>
                    <div class="features w-full text-center mb-6">
                      <div class="flex justify-between">
                        <div class="flex items-center justify-center mb-2">
                          <Icon
                            icon="mdi:calendar-month"
                            class="w-5 h-5 mr-2"
                          />
                          <p>
                            <strong>
                              {{
                                planType === "monthly"
                                  ? "Monthly"
                                  : translations && translations.annually
                              }}</strong
                            >
                          </p>
                        </div>
                        <div>${{ pricingPlan.original_amount }}</div>
                      </div>

                      <div class="flex justify-between">
                        <div class="flex items-center justify-center mb-2">
                          <Icon icon="mdi:cash-register" class="w-5 h-5 mr-2" />
                          <p>
                            <strong>{{
                              translations && translations.sales_tax
                            }}</strong>
                          </p>
                        </div>
                        <div>
                          {{ (pricingPlan.sales_tax * 100).toFixed(2) }}%
                        </div>
                      </div>
                      <div
                        class="flex justify-between"
                        v-if="pricingPlan.discount_amount > 0"
                      >
                        <div class="flex items-center justify-center mb-2">
                          <Icon icon="mdi-tag" class="w-5 h-5 mr-2" />
                          <p>
                            <strong>{{
                              translations && translations.discount
                            }}</strong>
                          </p>
                        </div>
                        <div>${{ pricingPlan.discount_amount }}</div>
                      </div>
                      <div class="flex justify-between">
                        <div class="flex items-center justify-center mb-2">
                          <Icon icon="carbon:cost-total" class="w-5 h-5 mr-2" />
                          <p>
                            <strong>{{
                              translations && translations.final_amount
                            }}</strong>
                          </p>
                        </div>
                        <div>
                          ${{ parseFloat(pricingPlan.final_amount).toFixed(2) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <div class="uppercase text-sm font-bold text-blue-rgba">
                  {{ translations && translations.billing_start_date }}
                </div>
                <div class="font-medium text-base">
                  {{ formatDateTime(pricingPlan.started_at) }}
                </div>
              </div>
              <div class="mb-2">
                <div class="uppercase text-sm font-bold text-blue-rgba">
                  {{ translations && translations.next_billing_date }}
                </div>
                <div class="font-medium text-base">
                  {{ formatDateTime(pricingPlan.ends_at) }}
                </div>
              </div>
              <div class="mb-2" v-if="pricingPlan.discount_end_date">
                <div class="uppercase text-sm font-bold text-blue-rgba">
                  {{ translations && translations.discount_end_date }}
                </div>
                <div class="font-medium text-base">
                  {{ pricingPlan.discount_end_date.replace(/-/g, "/") }}
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 flex max-sm:flex-col text-sm">
            <div
              v-if="
                Object.keys(pricingPlan).length > 2 &&
                !pricingPlan.is_cancellation_requested
              "
              class="flex"
            >
              <div class="">
                {{
                  translations && translations.for_cancelling_your_subscription
                }}
                ,
              </div>
              <div
                @click="openAssuringCancelSubDialog"
                class="font-bold ml-1 text-blue-rgba cursor-pointer"
              >
                {{ translations && translations.click_here }}.
              </div>
            </div>
            <div class="flex">
              <div class="sm:ml-1">
                {{ translations && translations.for_billing_inquiries }} ,
              </div>
              <a
                href="mailto:cConnect@gmail.com"
                class="font-bold ml-1 text-blue-rgba"
                >{{ translations && translations.please_contact_us }}.</a
              >
            </div>
          </div>
        </div>
        <div
          v-if="loading && Object.keys(pricingPlan).length === 2"
          class="h-full h-[80vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
        >
          <div class="text-center text-xl">
            {{ translations && translations.loading }}
          </div>
          <v-progress-linear
            color="#241e6d"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear></div
      ></v-window-item>

      <v-window-item :value="2">
        <PricingVersions
          @platinumSelected="
            () => {
              console.log('platinumSelected');
              step++;
            }
          "
          :showRightVersionText="false"
          pageName="settings"
      /></v-window-item>
      <v-window-item :value="3">
        <SettingPricingPlans
          :subscribedPlan="planType"
          :annualPaid="
            planType !== 'monthly' ? parseFloat(annualTotal).toFixed(2) : 0
          "
          :region_id="props.profile.region_id"
          choosedVersion="platinum"
          :profile="profile"
          :billing_start_date="pricingPlan.started_at"
          @onUpdatePaymentMethod="updatePaymentMethodAndSubscribe"
        />
      </v-window-item>
    </v-window>
  </section>
  <CustomDialog
    submitText="Cancel Subscription"
    :disableOutSideClick="false"
    @submit="handleCancelSubscription"
    ref="cancelSubscriptionDialogRef"
    :loading="loading"
    :disabled="loading"
    cancelText="Keep My Subscription"
    errorIcon
    dialogWidth="max-h-[70vh] width50"
    title="Cancel Subscription "
  >
    <div class="mb-4">
      <div class="pl-6 section_text-gray-700 mt-3 mb-2">
        <div class="mb-2 text-xl">
          {{
            translations &&
            translations.are_you_sure_you_want_to_cancel_your_subscription_with
          }}
          <span class="font-bold">cConnect</span>?

          <p class="text-lg font-semibold">
            {{ translations && translations.upon_cancellation }}:
          </p>
        </div>
        <ul class="list-disc pl-5 text-base">
          <li class="mb-1">
            {{
              translations &&
              translations.you_will_lose_access_to_all_exclusive_services_and_benefits
            }}
          </li>
          <li class="mb-1">
            {{
              translations &&
              translations.any_unused_time_or_services_from_your_current_subscription_will_not_be_refunded
            }}
          </li>
          <li class="mb-1">
            {{
              translations &&
              translations.reactivating_your_subscription_may_be_subject_to_prevailing_rates_and_terms
            }}
          </li>
        </ul>
        <p class="mt-2 font-semibold">
          {{
            translations &&
            translations.please_consider_carefully_as_this_action_is
          }}
          <strong>irreversible </strong>.
        </p>
        <p class="text-base">
          {{
            translations && translations.upon_receiving_your_request_to_cancel
          }}
          <strong>{{ translations && translations.email_address }}</strong
          >.
          {{
            translations &&
            translations.we_understand_the_importance_of_your_decision
          }}
        </p>
      </div>
    </div>
  </CustomDialog>
  <!-- Payment History Dialog  -->
  <CustomDialog
    :showFooter="false"
    ref="paymentHistoryDialogRef"
    :title="translations && translations.payment_history"
  >
    <div class="mb-4">
      <div
        v-if="loadingPaymentHistoryDetails"
        class="h-full h-[40vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
      >
        <div class="text-center text-xl">
          {{ translations && translations.loading }}
        </div>
        <v-progress-linear
          color="#241e6d"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </div>

      <div class="flex flex-col gap-2 sm:gap-3" v-else>
        <Card
          v-for="(payhistory, index) in paymentHistoryArray"
          :key="index"
          :shadowLevel="2"
          cardInnerClasses="h-full"
          bgColor="#edecea"
          :isInside="true"
          :padding="screenWidth < 640 ? '7px' : '20px'"
        >
          <div
            class="uppercase text-2xl font-semibold text-blue-rgba font-bold mb-4"
          >
            {{ translations && translations.pricing_plan }} :
            <span class="font-extrabold">{{
              payhistory.version == 1
                ? "FREE"
                : payhistory.version == 2
                ? "GOLD"
                : payhistory.version == 3
                ? "PLATINUM"
                : "No Pricing Plan Found"
            }}</span>
          </div>
          <div class="mb-2">
            <div class="uppercase text-sm font-bold text-blue-rgba">
              {{ translations && translations.subscription_plan }}
            </div>
            <div class="font-medium text-base">
              {{ payhistory.subscription_plan }}
            </div>
          </div>
          <div class="mb-2">
            <div class="uppercase text-sm font-bold text-blue-rgba">
              {{ translations && translations.amount_paid }}
            </div>
            <div class="font-medium text-base">
              {{ parseFloat(payhistory.amount_paid).toFixed(2) }}
            </div>
          </div>
          <div class="mb-2">
            <div class="uppercase text-sm font-bold text-blue-rgba">
              {{ translations && translations.charged_date }}
            </div>
            <div class="font-medium text-base">
              {{ formatDateTime(payhistory.charged_date) }}
            </div>
          </div>
        </Card>
      </div>
    </div>
  </CustomDialog>
</template>
<style scoped></style>
