<template>
  <div class="lg:p-5">
    <h1 class="text-3xl font-bold mb-10">Choose Your Pricing Plan</h1>
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
    <div
      v-if="!loading"
      class="flex max-sm:flex-col max-sm:gap-10 gap-2 lg:gap-10 w-full"
    >
      <PricingCard
        plan="MONTHLY"
        :monthlyPrice="pricingPlan.billed_monthly_price"
        :salesTax="pricingPlan.sales_tax"
        :total="monthlyTotal"
        @selectedPricing="selectedPricing"
      />

      <PricingCard
        plan="ANNUAL"
        :monthlyPrice="pricingPlan.billed_annual_price"
        :total="annualTotal"
        @selectedPricing="selectedPricing"
        :salesTax="pricingPlan.sales_tax * 12"
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
import { computed, onMounted, ref, watch } from "vue";
const props = defineProps({
  region_id: {
    type: [Number, String],
  },
});
const loading = ref(false);
const pricingPlan = ref({});

const selectedPricing = (plan) => {
  console.log(plan, "plan");
  localStorage.setItem("selectedPlan", plan);
  Inertia.visit("/payment");
};

onMounted(() => {
  fetchPricingCardDetails();
});

// computed

const monthlyTotal = computed(() => {
  return +pricingPlan.value.billed_monthly_price + +pricingPlan.value.sales_tax;
});

const annualTotal = computed(() => {
  return (
    +pricingPlan.value.billed_annual_price + +pricingPlan.value.sales_tax * 12
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
</script>
