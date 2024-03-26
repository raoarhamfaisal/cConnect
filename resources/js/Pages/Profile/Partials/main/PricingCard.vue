<template>
  <div
    @mouseover="hover = true"
    @mouseout="hover = false"
    :class="hover ? 'hovered' : ''"
    class="pricing-card flex flex-col justify-between items-center w-full sm:w-1/2 p-6 sm:p-10 lg:p-20 bg-white border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    <h2 class="text-2xl font-bold mb-4">{{ plan }}</h2>
    <div
      class="price-tag bg-[#4169E1] text-white w-40 h-40 rounded-full flex items-center justify-center mb-6"
    >
      <span class="text-3xl">${{ total }}</span>
      <span class="text-xs ml-1">/mo</span>
    </div>

    <div class="features w-full text-center mb-6">
      <div class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="mdi:calendar-month" class="w-5 h-5 mr-2" />
          <p>
            <strong>{{ plan === "MONTHLY" ? "Monthly" : "Anually" }}</strong>
          </p>
        </div>
        <div>${{ monthlyPrice }}</div>
      </div>
      <!-- <div class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="mdi:ticket-percent" class="w-5 h-5 mr-2" />
          <p><strong>Coupon</strong></p>
        </div>
        <div>${{ coupon }}</div>
      </div> -->
      <div class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="mdi:cash-register" class="w-5 h-5 mr-2" />
          <p><strong>Sales Tax</strong></p>
        </div>
        <div>${{ salesTax }}</div>
      </div>

      <p v-if="savings" class="text-green-500 font-semibold">
        {{ savings }}
      </p>
    </div>

    <button
      class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1]"
      @click="selectedPricing"
    >
      Continue
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  plan: String,
  monthlyPrice: [Number, String],
  // coupon: [Number,String],
  salesTax: [Number, String],
  total: [Number, String],
  savings: String,
});

const hover = ref(false);
const emit = defineEmits(["selectedPricing"]);
const selectedPricing = () => {
  emit("selectedPricing", props.plan);
};
</script>

<style scoped>
.pricing-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #4169e1;
  border: 2px solid #4169e1;
}

.pricing-card:hover h2,
.pricing-card:hover p,
.pricing-card:hover div {
  color: white;
}

.pricing-card.hovered .price-tag {
  background-color: white;
}
.pricing-card.hovered .price-tag span {
  color: black;
}
.pricing-card.hovered .mdi {
  color: white;
}

.hovered .checkout-button {
  background-color: white;
  color: black;
}
</style>
