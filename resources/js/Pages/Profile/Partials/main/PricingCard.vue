<template>
  <div
    @mouseover="hover = true"
    @mouseout="hover = false"
    :class="hover ? 'hovered' : ''"
    class="pricing-card flex flex-col justify-between items-center w-full sm:w-1/2 p-6 sm:p-9 lg:p-6 xl:p-14 bg-white border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 relative"
  >
    <!-- <div
      v-if="coupon && coupon.percentage_off_regular_price"
      class="absolute translate-x-[10%] sm:translate-x-1/4 -translate-y-[30%] sm:-translate-y-1/4 top-0 right-0 bg-green-500 text-white rounded-full h-16 sm:h-20 w-16 text-xs sm:text-sm sm:w-20 font-bold flex-wrap flex flex-col items-center justify-center transform"
    >
      <div>-{{ coupon.percentage_off_regular_price }}%</div>
    </div> -->
    <h2 class="text-2xl font-bold mb-4">{{ plan }}</h2>
    <div
      class="price-tag bg-[#4169E1] text-white w-48 h-48 rounded-full flex items-center justify-center mb-6"
    >
      <span class="text-3xl">${{ total }}</span>
      <span class="text-xs ml-1">/{{ plan === "ANNUAL" ? "yr" : "mo" }}</span>
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
          <Icon icon="mdi-tag" class="w-5 h-5 mr-2" />
          <p><strong>Coupon</strong></p>
        </div>
        <div>- ${{  couponDiscount ? couponDiscount : "0.00" }}</div>
      </div>
      <div class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="mdi:cash-register" class="w-5 h-5 mr-2" />
          <p><strong>Sales Tax</strong></p>
        </div>
        <div>${{ salesTax }}</div>
      </div>
      <div class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="carbon:cost-total" class="w-5 h-5 mr-2" />
          <p><strong>Total</strong></p>
        </div>
        <div>${{ total }}</div>
      </div>
      <transition name="expand" @before-enter="beforeEnter" @enter="enter">
        <div class="sm:h-[80px]">
          <div
            v-if="savingValue"
            class="flex gap-2 mt-2 text-xl justify-center items-center font-bold"
          >
            You Save
            <p class="text-green-500 text-3xl">${{ parseFloat(savingValue).toFixed(2) }}.</p>
          </div>
          <div
            v-if="plan === `MONTHLY` && couponDiscount"
            class="flex gap-2 mt-2 text-indigo-600 text-base justify-center items-center font-bold"
          >
            {{ parseFloat(total - salesTax).toFixed(2) }} for the 1st {{ coupon.months }} months, then
            {{ monthlyPrice }}
          </div>

          <div
            v-else-if="plan !== `MONTHLY`"
            class="mt-2 text-lg text-center font-bold"
          >
            That's only
            <span class="text-indigo-600 month-price">{{
              anuualOnlyMonthValue
            }}</span>
            per Month!!
          </div>
          <!-- here we are -->
        </div>
      </transition>
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
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  plan: String,
  monthlyPrice: [Number, String],
  // coupon: [Number,String],
  salesTax: [Number, String],
  coupon: Object,
  couponDiscount: { type: [Number, String], default: "0.00" },
  total: [Number, String],
  savings: String,
  savingValue:[Number, String]
});

const hover = ref(false);
const emit = defineEmits(["selectedPricing"]);
const selectedPricing = () => {
  emit("selectedPricing", props.plan);
};

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el, done) => {
  el.style.height = el.scrollHeight + "px";
  el.addEventListener("transitionend", done);
};

const anuualOnlyMonthValue = computed(()=>{
  let result = ((+props.total - +props.couponDiscount - +props.salesTax) / 12).toFixed(2);
if (result === 0 || result === "0.00" || result === "-0.00") {
    return result = (+props.total / 12).toFixed(2);
}
return result;
})
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
.pricing-card.hovered .mdi,
.pricing-card.hovered .month-price {
  color: white;
}

.hovered .checkout-button {
  background-color: white;
  color: black;
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s ease;
  overflow: hidden;
}
.expand-leave-to {
  height: 0;
}
</style>
