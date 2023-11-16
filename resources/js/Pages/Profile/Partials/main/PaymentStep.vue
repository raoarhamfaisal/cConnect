<template>
  <div class="lg:p-5">
    <h1 class="text-3xl font-bold mb-6 sm:mb-8">Choose Your Pricing Plan</h1>
    <div
      v-if="loading"
      style="height: 500px"
      class="card flex max-sm:flex-col max-sm:gap-10 gap-2 lg:gap-10 w-full"
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
        class="border-b-2 border-0 focus:border-b-2 focus:border-black w-28 pt-0 focus:ring-0 pb-1"
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
      v-if="!loading"
      class="flex max-sm:flex-col mt-4 max-sm:gap-10 gap-2 lg:gap-10 w-full"
    >
      <PricingCard
        plan="MONTHLY"
        :monthlyPrice="
          pricingPlan.billed_monthly_price
            ? pricingPlan.billed_monthly_price
            : 0
        "
        :coupon="coupon"
        :couponDiscount="monthlyDiscount ? monthlyDiscount.toFixed(2) : 0.0"
        :salesTax="pricingPlan.sales_tax ? pricingPlan.sales_tax : 0"
        :total="monthlyTotal ? parseFloat(monthlyTotal).toFixed(2) : 0"
        @selectedPricing="selectedPricing"
      />

      <PricingCard
        plan="ANNUAL"
        :coupon="coupon"
        :couponDiscount="annualDiscount ? annualDiscount.toFixed(2) : 0.0"
        :monthlyPrice="
          pricingPlan.billed_annual_price ? pricingPlan.billed_annual_price : 0
        "
        :total="annualTotal ? parseFloat(annualTotal).toFixed(2) : 0"
        @selectedPricing="selectedPricing"
        :salesTax="pricingPlan.sales_tax ? pricingPlan.sales_tax : 0"
      />
    </div>
    <!-- :coupon="43.88" -->
    <!-- savings="You Save $19.5" -->
  </div>
</template>

<script setup>
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";
import PricingCard from "@/Pages/Profile/Partials/main/PricingCard.vue";

import { Inertia } from "@inertiajs/inertia";
import { computed, onMounted, reactive, ref, watch } from "vue";
const props = defineProps({
  region_id: {
    type: [Number, String],
  },
});
const loading = ref(false);
const pricingPlan = ref({});
const loadingCoupon = ref(false);
const couponApiError = ref("");
const couponApiSuccessMsg = ref("");
const coupon = ref({});

const form = reactive({
  coupon_code: "",
});

onMounted(() => {
  fetchPricingCardDetails();
});

// computed

const monthlyTotal = computed(() => {
  // Calculate the original monthly price with tax
  const originalMonthlyTotal = +pricingPlan.value.billed_monthly_price;

  // If there's a coupon
  if (coupon.value && coupon.value.percentage_off_regular_price) {
    // Calculate the discount for the monthly price
    const monthlyDiscount =
      (originalMonthlyTotal * coupon.value.percentage_off_regular_price) / 100;

    // Return the discounted monthly total
    return (
      originalMonthlyTotal -
      monthlyDiscount +
      +pricingPlan.value.sales_tax * +pricingPlan.value.billed_monthly_price
      // +(+pricingPlan.value.sales_tax * 0.01 * originalMonthlyTotal)
    );
  }

  // Return the original monthly total if there's no coupon.value
  return (
    originalMonthlyTotal +
    +pricingPlan.value.sales_tax * +pricingPlan.value.billed_monthly_price
  );

  // return (
  //   +pricingPlan.value.billed_monthly_price +
  //   +pricingPlan.value.sales_tax * +pricingPlan.value.billed_monthly_price
  // );
});

const annualTotal = computed(() => {
  // Calculate the original annual price with tax for 12 months
  const originalAnnualTotal = +pricingPlan.value.billed_annual_price;

  // If there's a coupon.value
  if (coupon.value && coupon.value.percentage_off_regular_price) {
    // Calculate the discount for the annual price
    const annualDiscount =
      coupon.value.months *
      ((+pricingPlan.value.billed_monthly_price *
        coupon.value.percentage_off_regular_price) /
        100);

    // Return the discounted annual total
    return (
      originalAnnualTotal -
      annualDiscount +
      +pricingPlan.value.sales_tax * +pricingPlan.value.billed_annual_price
    );
  }

  // Return the original annual total if there's no coupon
  return (
    originalAnnualTotal +
    +pricingPlan.value.sales_tax * +pricingPlan.value.billed_annual_price
  );

  // return (
  //   +pricingPlan.value.billed_annual_price +
  //   +pricingPlan.value.sales_tax * +pricingPlan.value.billed_annual_price
  // );
});

const annualDiscount = computed(() => {
  return (
    coupon.value.months *
    ((+pricingPlan.value.billed_monthly_price *
      coupon.value.percentage_off_regular_price) /
      100)
  );
});
const monthlyDiscount = computed(() => {
  const originalMonthlyTotal = +pricingPlan.value.billed_monthly_price;

  return (
    (originalMonthlyTotal * coupon.value.percentage_off_regular_price) / 100
  );
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
  localStorage.setItem("selectedPlan", plan);
  let couponData = coupon.value;
  localStorage.setItem("coupon", JSON.stringify(couponData));
  let totalData = {
    monthlyTotal: monthlyTotal.value,
    annualTotal: annualTotal.value,
  };

  // Serialize the object into a string and store it
  localStorage.setItem("total", JSON.stringify(totalData));
  Inertia.visit("/payment");
};

let saveTimeout = null;

const verifyCouponCode = () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Start a new timer
  saveTimeout = setTimeout(async () => {
    couponApiError.value = "";
    couponApiSuccessMsg.value = "";

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
