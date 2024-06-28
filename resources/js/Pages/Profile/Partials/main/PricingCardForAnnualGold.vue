<template>
  <div
    @mouseover="hover = true"
    @mouseout="hover = false"
    :class="hover ? 'hovered' : ''"
    class="pricing-card flex flex-col justify-between items-center w-full sm:w-1/2 p-6 sm:p-9 lg:p-6 xl:p-14 bg-white border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 relative"
  >
    <h2 class="text-2xl font-bold mb-4">
      {{
        plan === "MONTHLY"
          ? translations && translations.monthly
          : translations && translations.annual_cap
      }}
    </h2>
    <div
      class="price-tag bg-[#4169E1] text-white w-48 h-48 rounded-full flex items-center justify-center mb-6"
    >
      <span class="text-3xl">${{ amountToBePaid }}</span>
      <span class="text-xs ml-1"
        >/{{
          plan === translations && translations.annual_cap ? "yr" : "mo"
        }}</span
      >
    </div>

    <div class="features w-full text-center mb-6">
      <div class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="mdi:calendar-month" class="w-5 h-5 mr-2" />
          <p>
            <strong class="capitalize">{{
              plan === "MONTHLY"
                ? translations && translations.monthly
                : translations && translations.annual_cap
            }}</strong>
          </p>
        </div>
        <div>${{ monthlyPrice }}</div>
      </div>

      <div class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="mdi-tag" class="w-5 h-5 mr-2" />
          <p>
            <strong>{{ translations && translations.coupon }}</strong>
          </p>
        </div>
        <div>- ${{ couponDiscount ? couponDiscount : "0.00" }}</div>
      </div>
      <div class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="mdi:cash-register" class="w-5 h-5 mr-2" />
          <p>
            <strong>{{ translations && translations.sales_tax }}</strong>
          </p>
        </div>
        <div>${{ salesTax }}</div>
      </div>
      <div class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="carbon:cost-total" class="w-5 h-5 mr-2" />
          <p>
            <strong>{{ translations && translations.total_annual }}</strong>
          </p>
        </div>
        <div>${{ total }}</div>
      </div>
      <div v-if="annualPaid !== 0" class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="flat-color-icons:paid" class="w-5 h-5 mr-2" />
          <p>
            <strong>{{ translations && translations.paid_amount }}</strong>
          </p>
        </div>
        <div>- ${{ annualPaid }}</div>
      </div>
      <div v-if="annualPaid !== 0" class="flex justify-between">
        <div class="flex items-center justify-center mb-2">
          <Icon icon="material-symbols:paid" class="w-5 h-5 mr-2" />
          <p>
            <strong>{{
              translations && translations.amount_to_be_paid
            }}</strong>
          </p>
        </div>
        <div>${{ amountToBePaid }}</div>
      </div>
      <transition name="expand" @before-enter="beforeEnter" @enter="enter">
        <div class="sm:h-[80px]">
          <div
            v-if="savingValue"
            class="flex gap-2 mt-2 text-xl justify-center items-center font-bold"
          >
            {{ translations && translations.you_save }}
            <p class="text-green-500 text-3xl">
              ${{ parseFloat(savingValue).toFixed(2) }}.
            </p>
          </div>
          <div
            v-if="plan === `MONTHLY` && couponDiscount"
            class="flex gap-2 mt-2 text-indigo-600 text-base justify-center items-center font-bold"
          >
            {{ parseFloat(total - salesTax).toFixed(2) }}
            {{ translations && translations.for_the_1st }}
            {{ coupon.months }} {{ translations && translations.months_then }}
            {{ monthlyPrice }}
          </div>

          <div
            v-else-if="plan !== `MONTHLY`"
            class="mt-2 text-lg text-center font-bold"
          >
            {{ translations && translations.thats_only }}
            <span class="text-indigo-600 month-price">{{
              anuualOnlyMonthValue
            }}</span>
            {{ translations && translations.per_month }}!!
          </div>
          <!-- here we are -->
        </div>
      </transition>
    </div>

    <button
      class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1]"
      @click="selectedPricing"
    >
      {{ translations && translations.continue }}
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";

const props = defineProps({
  plan: String,
  monthlyPrice: [Number, String],
  // coupon: [Number,String],
  salesTax: [Number, String],
  coupon: Object,
  couponDiscount: { type: [Number, String], default: "0.00" },
  total: [Number, String],
  savings: String,
  savingValue: [Number, String],
  annualPaid: {
    type: [Number, String],
    default: 0,
  },
  billing_start_date: {
    type: [Number, String],
    default: 0,
  },
});

const hover = ref(false);
const emit = defineEmits(["selectedPricing", "priceToBePaid"]);
const selectedPricing = () => {
  emit("priceToBePaid", amountToBePaid.value);
  emit("selectedPricing", "monthdiff");
};

const monthDifferenceFromBilling = ref(null);
const store = useStore();
const translations = computed(() => store.getters.translations);

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el, done) => {
  el.style.height = el.scrollHeight + "px";
  el.addEventListener("transitionend", done);
};

const anuualOnlyMonthValue = computed(() => {
  // let result = (
  //   (+props.total - +props.couponDiscount - +props.salesTax) /
  //   12
  // ).toFixed(2);
  let result = ((+props.monthlyPrice - +props.couponDiscount) / 12).toFixed(2);

  if (result === 0 || result === "0.00" || result === "-0.00") {
    return (result = (+props.total / 12).toFixed(2));
  }
  return result;
});
const amountToBePaid = computed(() => {
  let priceToBePaid;

  const eachMonthPlatinumAdditionalCharge =
    (props.total - props.annualPaid) / 12;
  priceToBePaid = parseFloat(
    eachMonthPlatinumAdditionalCharge * monthDifferenceFromBilling.value
  ).toFixed(2);

  if (priceToBePaid < 0) {
    return 0;
  }
  return priceToBePaid;
});
onMounted(() => {
  monthDifferenceFromBilling.value =
    12 - monthsDifference(props.billing_start_date);
  // monthDifferenceFromBilling.value =
  //   12 - monthsDifference("2023-08-23 14:53:22");
});

function monthsDifference(billingStartDate) {
  // Convert the billing start date string into a Date object
  const startDate = new Date(billingStartDate);

  // Get the current date
  const currentDate = new Date();

  // Calculate the year and month difference
  const yearsDifference = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDifference = currentDate.getMonth() - startDate.getMonth();

  // Total difference in months
  return yearsDifference * 12 + monthsDifference;
}
</script>

<style scoped>
.pricing-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #4169e1;
  border: 2px solid #4169e1;
  z-index: 10;
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
