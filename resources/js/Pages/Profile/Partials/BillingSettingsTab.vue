<script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-vue3";
import { computed, ref } from "vue";

const props = defineProps({
  user_id: {
    type: String,
    default: 0,
  },
});
const cancelSubscriptionDialogRef = ref();
const loading = ref(false);
const planType = ref("monthly");
const pricingPlan = ref({
  billed_monthly_price: "30",
  sales_tax: "5",
});
const coupon = ref({});

const monthlyTotal = computed(() => {
  // Calculate the original monthly price with tax
  const originalMonthlyTotal =
    +pricingPlan.value.billed_monthly_price + +pricingPlan.value.sales_tax;

  // If there's a coupon
  if (coupon.value && coupon.value.percentage_off_regular_price) {
    // Calculate the discount for the monthly price
    const monthlyDiscount =
      (originalMonthlyTotal * coupon.value.percentage_off_regular_price) / 100;

    // Return the discounted monthly total
    return originalMonthlyTotal - monthlyDiscount;
  }

  // Return the original monthly total if there's no coupon.value
  return originalMonthlyTotal;
});

const annualTotal = computed(() => {
  // Calculate the original annual price with tax for 12 months
  const originalAnnualTotal =
    +pricingPlan.value.billed_annual_price + +pricingPlan.value.sales_tax * 12;

  // If there's a coupon.value
  if (coupon.value && coupon.value.percentage_off_regular_price) {
    // Calculate the discount for the annual price
    const annualDiscount =
      (originalAnnualTotal * coupon.value.percentage_off_regular_price) / 100;

    // Return the discounted annual total
    return originalAnnualTotal - annualDiscount;
  }

  // Return the original annual total if there's no coupon
  return originalAnnualTotal;
});

const openAssuringCancelSubDialog = () => {
  cancelSubscriptionDialogRef.value.openDialog();
};
const handleCancelSubscription = async () => {
  loading.value = true;

  try {
    const response = await axios.post(
      `/api/payment/cancel-subscription/${props.user_id}`,
      {},
      getAxiosConfig()
    );
    if (response.data) {
      console.log(response.data, "response");
      changesSaved("Your subscription is successfully cancelled");
      setTimeout(() => {
        Inertia.post("/logout");
      }, 2000);
    }
  } catch (err) {
    console.log(err);
    somethingWentWrong(err.response.data.message, "inherit");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section>
    <header class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Billing Details</h2>
        <p class="mt-1 text-sm text-gray-600">
          The next billing will be made with selected payment method below
        </p>
      </div>
      <div
        @click="openAssuringCancelSubDialog"
        class="border-2 border-blue-rgba text-blue-rgba font-bold py-2 px-4 rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95"
      >
        Cancel Subscription
      </div>
    </header>
    <div class="mb-4 mt-8">
      <div class="uppercase text-sm font-bold text-blue-rgba">Current plan</div>
      <!-- <div class="font-medium text-base">Monthly</div> -->
      <div
        :class="[
          'shadow-md w-1/2 border-2 cursor-pointer mt-2 relative  active:scale-100  p-5 rounded',
          planType === 'monthly'
            ? 'border-[#4169E1]'
            : 'border-black hover:scale-[1.02]',
        ]"
        @click="selectPlan('monthly')"
        style="transition: all 0.3s ease-in-out"
      >
        <div
          v-if="coupon && coupon.percentage_off_regular_price"
          class="absolute translate-x-[10%] sm:translate-x-1/4 -translate-y-[30%] sm:-translate-y-1/4 top-0 right-0 bg-green-500 text-white rounded-full h-16 sm:h-20 w-16 text-xs sm:text-sm sm:w-20 font-bold flex-wrap flex flex-col items-center justify-center transform"
        >
          <div>-{{ coupon.percentage_off_regular_price }}%</div>
        </div>

        <div class="flex flex-col items-center justify-center">
          <h2 class="text-xl sm:text-2xl font-bold mb-2">
            {{ planType === "monthly" ? "MONTHLY" : "ANNUAL" }}
          </h2>
          <div
            class="price-tag bg-white w-24 h-24 sm:w-32 sm:h-32 border-2 rounded-full flex items-center justify-center"
            :class="{
              'bg-[#4169E1] border-[#4169E1] text-white':
                planType === 'monthly',
              'bg-white border-black text-black': planType !== 'monthly',
            }"
          >
            <span class="text-lg sm:text-2xl"
              >${{ planType === "monthly" ? monthlyTotal : annualTotal }}</span
            >
            <span class="text-xs ml-1">/mo</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-2">
      <div class="uppercase text-sm font-bold text-blue-rgba">Next Billing</div>
      <div class="font-medium text-base">
        Nov 20, 2023 -
        {{ planType === "monthly" ? monthlyTotal : annualTotal }}$
      </div>
    </div>
    <div class="mt-8 flex text-sm">
      <div class="">For questions about billling ,</div>
      <Link
        href="mailto:tcontractor@gmail.com"
        class="font-bold ml-1 text-blue-rgba"
        >please contact us.</Link
      >
    </div>
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
        <p class="mb-2 text-xl">
          Are you sure you want to cancel your subscription with
          <span class="font-bold">tContractor</span>? Upon cancellation:
        </p>
        <ul class="list-disc pl-5 text-base">
          <li class="mb-1">
            You will lose access to all exclusive services and benefits
            immediately.
          </li>
          <li class="mb-1">
            Any unused time or services from your current subscription will not
            be refunded or prorated.
          </li>
          <li class="mb-1">
            Reactivating your subscription may be subject to prevailing rates
            and terms.
          </li>
        </ul>
        <p class="mt-2 font-semibold">
          Please consider carefully, as this action is
          <strong>irreversible </strong>.
        </p>
      </div>
    </div>
  </CustomDialog>
</template>
