<template>
  <div class="xl:p-5">
    <h1 class="text-3xl font-bold mb-6 sm:mb-8">
      Choose Your Pricing Plan :
      <span class="text-blue-rgba">{{
        props.choosedVersion === "gold" ? "Gold Version" : "Platinum Version"
      }}</span>
    </h1>

    <div
      v-if="loading"
      style="height: 500px"
      class="card flex max-sm:flex-col max-sm:gap-10 gap-2 w-full"
    >
      <v-skeleton-loader class="w-full h-full" type="image">
      </v-skeleton-loader>
      <v-skeleton-loader class="w-full h-full" type="image">
      </v-skeleton-loader>
    </div>
    <div class="flex gap-2 mb-2 sm:mb-2 justify-center items-center">
      <div class="font-bold text-xl">Coupon Code</div>
      <input
        type="text"
        class="border-b-2 border-0 focus:border-b-2 focus:border-black w-36 text-center pt-0 focus:ring-0 pb-1"
        @input="verifyCouponCode"
        v-model="form.coupon_code"
      />
    </div>

    <div class="flex justify-center items-center">
      <p
        :class="`text-sm ${couponApiError ? 'text-red-600' : 'text-teal-600'}`"
      >
        {{ couponApiError || couponApiSuccessMsg }}
      </p>
    </div>
    <!-- <div class="flex justify-center items-center">
      <p class="text-sm text-teal-600">
        {{ couponApiSuccessMsg }}
      </p>
    </div> -->
    <div
      v-if="props.subscribedPlan === 'monthly'"
      class="sm:p-4 p-3 bg-blue-100 border border-blue-200 rounded-lg mb-2"
    >
      <h3 class="text-lg font-semibold">Note:</h3>
      <p class="mt-1 sm:mt-2 text-blue-700">
        Upgrading to Platinum will forfeit any remaining time on your current
        Gold subscription without a refund. Ready for Platinum perks? Proceed
        with your upgrade understanding this condition.
      </p>
    </div>
    <div
      v-else
      class="sm:p-4 p-3 bg-blue-100 border border-blue-200 rounded-lg mb-2"
    >
      <h3 class="text-lg font-semibold">Note:</h3>
      <p class="mt-1 sm:mt-2 text-blue-700">
        As you upgrade to Platinum, your remaining Gold subscription months will
        now be billed at the Platinum rate. No retroactive charges for past
        months. Enjoy your new Platinum benefits!
      </p>
    </div>

    <div
      v-if="!loading"
      class="flex max-sm:flex-col mt-4 max-sm:gap-10 gap-2 w-full justify-center"
    >
      <PricingCard
        v-if="subscribedPlan === 'monthly'"
        plan="MONTHLY"
        :monthlyPrice="monthlyPrice"
        :coupon="coupon"
        :couponDiscount="monthlyDiscount ? monthlyDiscount.toFixed(2) : 0.0"
        :salesTax="pricingPlan.sales_tax ? monthlyTaxPrice : 0"
        :savingValue="monthlyDiscount"
        :total="monthlyTotal ? parseFloat(monthlyTotal).toFixed(2) : 0"
        @selectedPricing="selectedPricing"
      />

      <PricingCard
        v-if="subscribedPlan === 'monthly'"
        plan="ANNUAL"
        :coupon="coupon"
        :couponDiscount="
          coupon && coupon.percentage_off_regular_price
            ? annualDiscount.toFixed(2)
            : 0.0
        "
        :savingValue="annualDiscountBesideCoupon.toFixed(2)"
        :monthlyPrice="annualPrice"
        :total="annualTotal ? parseFloat(annualTotal).toFixed(2) : 0"
        @selectedPricing="selectedPricing"
        :salesTax="pricingPlan.sales_tax ? annualTaxPrice : 0"
      />
      <PricingCardForAnnualGold
        v-if="subscribedPlan === 'annual'"
        plan="ANNUAL"
        :billing_start_date="billing_start_date"
        :annualPaid="annualPaid"
        :coupon="coupon"
        :couponDiscount="
          coupon && coupon.percentage_off_regular_price
            ? annualDiscount.toFixed(2)
            : 0.0
        "
        :savingValue="annualDiscountBesideCoupon.toFixed(2)"
        :monthlyPrice="annualPrice"
        :total="annualTotal ? parseFloat(annualTotal).toFixed(2) : 0"
        @selectedPricing="selectedPricing"
        @priceToBePaid="onPriceToBePaid"
        :salesTax="pricingPlan.sales_tax ? annualTaxPrice : 0"
      />
    </div>
  </div>
  <CustomDialog
    :disableOutSideClick="false"
    @submit="handleCancelSubscription"
    ref="confirmPaymentMethodDialogRef"
    :showFooter="false"
    dialogWidth="max-h-[70vh] width50"
    title="Confirm Payment Method"
  >
    <div class="mb-4">
      <div class="pl-6 section_text-gray-700 mt-3 mb-2">
        <div class="mb-2 text-xl font-bold">
          Update Your Payment Details or Continue with Existing?
        </div>

        <p class="text-base">
          Would you like to use your existing payment method for this
          transaction, or do you need to update your payment details? Please
          choose your preferred option to proceed.
        </p>
        <div class="text-base mt-4">
          <strong>Total Amount to be charged : </strong>
          ${{
            selectedPlan === "monthdiff"
              ? priceToBePaid
              : selectedPlan === "MONTHLY"
              ? monthlyTotal
                ? parseFloat(monthlyTotal).toFixed(2)
                : 0
              : annualTotal
              ? parseFloat(annualTotal).toFixed(2)
              : 0
          }}
        </div>
      </div>
    </div>
    <div :class="`flex  justify-between `">
      <button
        type="button"
        @click="emit('onUpdatePaymentMethod')"
        class="px-4 py-2 rounded text-white bg-[#364fc7]"
      >
        Update Payment Details
      </button>
      <button
        @click="onSubscribe"
        :disabled="loadingConfirmPayment"
        type="button"
        class="px-4 py-2 flex tems-center gap-2 rounded bg-[#5f3dc4] text-white"
        :style="{
          opacity: loadingConfirmPayment ? '0.2' : '1',
        }"
      >
        <div class="flex items-center justify-center">Subscribe</div>
        <img
          v-show="loadingConfirmPayment"
          src="/images/avatars/Spinner.gif"
          alt="spinner"
          width="25"
        />
      </button>
    </div>
  </CustomDialog>
</template>

<script setup>
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";
import PricingCard from "@/Pages/Profile/Partials/main/PricingCard.vue";
import PricingCardForAnnualGold from "@/Pages/Profile/Partials/main/PricingCardForAnnualGold.vue";

import { Inertia } from "@inertiajs/inertia";
import { computed, onMounted, reactive, ref, watch } from "vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

const props = defineProps({
  region_id: {
    type: [Number, String],
  },
  choosedVersion: {
    type: String,
    default: "",
  },
  subscribedPlan: {
    type: String,
    default: "",
  },
  annualPaid: {
    type: [Number, String],
    default: 0,
  },
  billing_start_date: {
    type: [Number, String],
    default: 0,
  },
});

const emit = defineEmits(["onUpdatePaymentMethod"]);
const loading = ref(false);
const pricingPlan = ref({});
const loadingCoupon = ref(false);
const couponApiError = ref("");
const couponApiSuccessMsg = ref("");
const coupon = ref({});
const loadingConfirmPayment = ref(false);
const selectedPlan = ref("");
const priceToBePaid = ref(0);
const confirmPaymentMethodDialogRef = ref(null);

const form = reactive({
  coupon_code: "",
});

onMounted(() => {
  fetchPricingCardDetails();
});

// computed
const monthlyPrice = computed(() => {
  const originalMonthlyTotal =
    props.choosedVersion === "gold"
      ? +pricingPlan.value.gold_billed_monthly_price
      : +pricingPlan.value.platinum_billed_monthly_price;
  return originalMonthlyTotal ? originalMonthlyTotal : 0;
});
const annualPrice = computed(() => {
  const originalAnnualTotal =
    props.choosedVersion === "gold"
      ? +pricingPlan.value.gold_billed_annual_price
      : +pricingPlan.value.platinum_billed_annual_price;
  return originalAnnualTotal ? originalAnnualTotal : 0;
});
const monthlyTotal = computed(() => {
  // Calculate the original monthly price with tax
  const originalMonthlyTotal =
    props.choosedVersion === "gold"
      ? +pricingPlan.value.gold_billed_monthly_price
      : +pricingPlan.value.platinum_billed_monthly_price;

  // If there's a coupon
  if (coupon.value && coupon.value.percentage_off_regular_price) {
    // Calculate the discount for the monthly price

    // Return the discounted monthly total
    return (
      originalMonthlyTotal - monthlyDiscount.value + +monthlyTaxPrice.value
      // +(+pricingPlan.value.sales_tax * 0.01 * originalMonthlyTotal)
    );
  }

  // Return the original monthly total if there's no coupon.value
  return originalMonthlyTotal + +monthlyTaxPrice.value;
});

const annualTotal = computed(() => {
  // Calculate the original annual price with tax for 12 months
  const originalAnnualTotal =
    props.choosedVersion === "gold"
      ? +pricingPlan.value.gold_billed_annual_price
      : +pricingPlan.value.platinum_billed_annual_price;

  // If there's a coupon.value
  if (coupon.value && coupon.value.percentage_off_regular_price) {
    // Calculate the discount for the annual price

    // Return the discounted annual total
    const subtractedTotal = originalAnnualTotal - annualDiscount.value;
    return subtractedTotal + +annualTaxPrice.value;
  }

  // Return the original annual total if there's no coupon
  return originalAnnualTotal + +annualTaxPrice.value;
});

const annualDiscount = computed(() => {
  const percentage_off_regular_price = coupon.value.percentage_off_regular_price
    ? coupon.value.percentage_off_regular_price
    : 0.0;
  const originalAnnualTotal =
    props.choosedVersion === "gold"
      ? +pricingPlan.value.gold_billed_annual_price
      : +pricingPlan.value.platinum_billed_annual_price;

  const couponMonths = coupon.value.months ? coupon.value.months : 0;
  const annualPriceDiscount = (originalAnnualTotal / 12) * couponMonths;

  return (annualPriceDiscount * percentage_off_regular_price) / 100;
});

const annualDiscountBesideCoupon = computed(() => {
  const originalMonthlyTotal =
    props.choosedVersion === "gold"
      ? +pricingPlan.value.gold_billed_monthly_price
      : +pricingPlan.value.platinum_billed_monthly_price;

  const annualTotalwithRespectToMonth =
    (originalMonthlyTotal + +monthlyTaxPrice.value) * 12;

  return annualTotalwithRespectToMonth - annualTotal.value;
});
const monthlyDiscount = computed(() => {
  const originalMonthlyTotal =
    props.choosedVersion === "gold"
      ? +pricingPlan.value.gold_billed_monthly_price
      : +pricingPlan.value.platinum_billed_monthly_price;
  const percentage_off_regular_price = coupon.value.percentage_off_regular_price
    ? coupon.value.percentage_off_regular_price
    : 0.0;
  return (originalMonthlyTotal * percentage_off_regular_price) / 100;
});
const monthlyTaxPrice = computed(() => {
  const discount = monthlyDiscount.value;
  const originalMonthlyTotal =
    props.choosedVersion === "gold"
      ? +pricingPlan.value.gold_billed_monthly_price
      : +pricingPlan.value.platinum_billed_monthly_price;
  let price = (
    +pricingPlan.value.sales_tax *
    (originalMonthlyTotal - discount)
  ).toFixed(2);
  return price === "0.00" ? "0.01" : price;
});

const annualTaxPrice = computed(() => {
  const discount = annualDiscount.value;
  const originalAnnualTotal =
    props.choosedVersion === "gold"
      ? +pricingPlan.value.gold_billed_annual_price
      : +pricingPlan.value.platinum_billed_annual_price;
  let price = (
    +pricingPlan.value.sales_tax *
    (originalAnnualTotal - discount)
  ).toFixed(2);
  return price === "0.00" ? "0.01" : price;
});

//watch
watch(
  () => props.region_id,
  (newVal, oldVal) => {
    console.log(props.region_id, oldVal, newVal, "region_id changed");
    if (newVal !== oldVal) {
      fetchPricingCardDetails();
    }
  }
);

const onPriceToBePaid = (paidPrice) => {
  priceToBePaid.value = paidPrice;
};

const fetchPricingCardDetails = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `/api/payment-info-of-a-region/${props.region_id}`,
      getAxiosConfig()
    );
    console.log(response, "response");
    if (response.data) {
      pricingPlan.value = { ...response.data.paymentInfo };
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
  }
};

const selectedPricing = (plan) => {
  console.log(plan, "plan");
  selectedPlan.value = plan;
  localStorage.setItem("selectedPlan", plan);
  let couponData = coupon.value;
  localStorage.setItem("coupon", JSON.stringify(couponData));
  let totalData = {
    monthlyTotal: monthlyTotal.value,
    annualTotal: annualTotal.value,
  };

  // Serialize the object into a string and store it
  localStorage.setItem("total", JSON.stringify(totalData));
  localStorage.setItem("choosedVersion", props.choosedVersion);

  confirmPaymentMethodDialogRef.value.openDialog();
  // Inertia.visit("/payment");
};

let saveTimeout = null;

const verifyCouponCode = () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  couponApiError.value = "";
  couponApiSuccessMsg.value = "";
  // Start a new timer
  if (!form.coupon_code) {
    coupon.value = {};
    return;
  }
  saveTimeout = setTimeout(async () => {
    loadingCoupon.value = true;
    try {
      const response = await axios.post(
        `/api/discount-coupon/verify`,
        { coupon_code: form.coupon_code },
        getAxiosConfig()
      );
      if (response.data) {
        // console.log(response.data, "response");
        // changesSaved(response.data.message);
        couponApiSuccessMsg.value = response.data.message;
        coupon.value = response.data.coupon;
      }
    } catch (err) {
      couponApiError.value = err.response.data.message;
    } finally {
      loadingCoupon.value = false;
    }
  }, 1500);
};
</script>
