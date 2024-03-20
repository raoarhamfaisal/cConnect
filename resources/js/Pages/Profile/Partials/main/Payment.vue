<template>
  <div class="lg:p-5">
    <h1 class="text-3xl font-bold mb-10">Choose Your Pricing Plan</h1>
    <div class="flex max-sm:flex-col max-sm:gap-10 gap-2 lg:gap-10 w-full">
      <PricingCard
        plan="MONTHLY"
        :monthlyPrice="21.11"
        :coupon="19.5"
        :salesTax="1.61"
        :total="39.0"
        savings="You Save $19.5"
        @selectedPricing="selectedPricing"
      />
      <PricingCard
        plan="ANNUAL"
        :monthlyPrice="351"
        :coupon="43.88"
        :salesTax="25.34"
        :total="332.46"
        savings="You Save $117"
        @selectedPricing="selectedPricing"
      />
    </div>
  </div>
</template>

<script setup>
import PricingCard from "@/Pages/Profile/Partials/main/PricingCard.vue";

const selectedPricing = (plan) => {
  console.log(plan);
};
</script>
