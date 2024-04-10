<template>
  <Head title="Payment" />

  <Header
    :profile="profile"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    :show-post-buttons="false"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div class="bg-gray-200 mt-5 sm:mt-1 flex-col">
      <Card
        :shadowLevel="2"
        style="padding: 4px"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        class="mb-6"
      >
        <div class="flex justify-between">
          <PageTitle linkUrl="/profile-setup" pageTitle="Payment" />
        </div>

        <div class="" v-if="!loading && !loadingScript && pricingPlan">
          <!-- selected card -->
          <div class="flex gap-4 lg:gap-10 w-full">
            <div
              :class="[
                'shadow-md w-1/2 border-2 cursor-pointer relative  active:scale-100  p-5 rounded',
                planType === 'MONTHLY'
                  ? 'border-[#4169E1]'
                  : 'border-black hover:scale-[1.02]',
              ]"
              @click="selectPlan('MONTHLY')"
              style="transition: all 0.3s ease-in-out"
            >
              <div
                v-if="coupon && coupon.percentage_off_regular_price"
                class="absolute translate-x-[10%] sm:translate-x-1/4 -translate-y-[30%] sm:-translate-y-1/4 top-0 right-0 bg-green-500 text-white rounded-full h-16 sm:h-20 w-16 text-xs sm:text-sm sm:w-20 font-bold flex-wrap flex flex-col items-center justify-center transform"
              >
                <div>-{{ coupon.percentage_off_regular_price }}%</div>
              </div>
              <div
                class="h-4 w-4 border-2 rounded-full mx-auto mb-2"
                :style="{
                  background: planType === 'MONTHLY' ? '#4169E1' : 'white',
                  borderColor: planType === 'MONTHLY' ? '#4169E1' : 'black',
                }"
              ></div>
              <div class="flex flex-col items-center justify-center">
                <h2 class="text-xl sm:text-2xl font-bold mb-2">MONTHLY</h2>
                <div
                  class="price-tag bg-white w-28 h-28 sm:w-40 sm:h-40 border-2 rounded-full flex items-center justify-center"
                  :class="{
                    'bg-[#4169E1] border-[#4169E1] text-white':
                      planType === 'MONTHLY',
                    'bg-white border-black text-black': planType !== 'MONTHLY',
                  }"
                >
                  <span class="text-lg sm:text-2xl"
                    >${{ parseFloat(monthlyTotal).toFixed(2) }}</span
                  >
                  <span class="text-xs ml-1">/mo</span>
                </div>
              </div>
            </div>
            <div
              :class="[
                'shadow-md w-1/2 border-2 cursor-pointer transition-all duration-300 active:scale-100 p-5 relative rounded',
                planType === 'ANNUAL'
                  ? 'border-[#4169E1]'
                  : 'border-black hover:scale-[1.02]',
              ]"
              @click="selectPlan('ANNUAL')"
            >
              <div
                v-if="coupon && coupon.percentage_off_regular_price"
                class="absolute translate-x-[10%] sm:translate-x-1/4 -translate-y-[30%] sm:-translate-y-1/4 top-0 right-0 bg-green-500 text-white rounded-full h-16 sm:h-20 w-16 text-xs sm:text-sm sm:w-20 font-bold flex-wrap flex flex-col items-center justify-center transform"
              >
                <div>-{{ coupon.percentage_off_regular_price }}%</div>
              </div>
              <div
                class="h-4 w-4 rounded-full border-2 mx-auto mb-2"
                :style="{
                  background: planType === 'ANNUAL' ? '#4169E1' : 'white',
                  borderColor: planType === 'ANNUAL' ? '#4169E1' : 'black',
                }"
              ></div>
              <div class="flex flex-col items-center justify-center">
                <h2 class="text-xl sm:text-2xl font-bold mb-2">ANNUAL</h2>
                <div
                  class="price-tag bg-white w-28 h-28 sm:w-40 sm:h-40 border-2 rounded-full flex items-center justify-center"
                  :class="{
                    'bg-[#4169E1] border-[#4169E1] text-white':
                      planType === 'ANNUAL',
                    'bg-white border-black text-black': planType !== 'ANNUAL',
                  }"
                >
                  <span class="text-lg sm:text-2xl"
                    >${{ parseFloat(annualTotal).toFixed(2) }}</span
                  >
                  <span class="text-xs ml-1">/yr</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="font-bold flex mt-6 flex-wrap justify-center items-center text-base"
          >
            Have a coupon code?
            <div
              @click="openCouponDialog"
              class="text-sm ml-1 text-green-600 hover:underline cursor-pointer"
            >
              Click here to enter your code
            </div>
          </div>
          <!-- payment type -->
          <div class="mt-4">
            <div class="font-bold text-2xl text-blue-rgba leading-tight">
              Choose Payment Method
            </div>
            <div class="flex gap-4 gap-1 sx:gap-2 lg:gap-10 w-full mt-4">
              <div
                :class="[
                  'shadow-md flex justify-center items-center gap-2 border-2 cursor-pointer  active:scale-100 p-2  sm:p-5 rounded',
                  paymentMethod === 'AUTHORIZE.NET'
                    ? 'border-[#4169E1] border-[2px]'
                    : 'border-black hover:scale-[1.02]',
                ]"
                ref="paymentDetailsRef"
                @click="selectPayment('AUTHORIZE.NET')"
                style="transition: all 0.3s ease-in-out"
              >
                <div
                  class="h-3 sm:h-4 w-3 sm:w-4 border-2 rounded-full mx-auto"
                  :style="{
                    background:
                      paymentMethod === 'AUTHORIZE.NET' ? '#4169E1' : 'white',
                    borderColor:
                      paymentMethod === 'AUTHORIZE.NET' ? '#4169E1' : 'black',
                  }"
                ></div>
                <div
                  class="flex max-xl:flex-col max-xl:gap-0 items-center justify-center"
                >
                  <div
                    class="font-bold mr-1 translate-y-[0px] text-sm sm:text-lg"
                  >
                    Credit/Debit
                  </div>
                  <img
                    src="/images/icons/debit-visa-card.png"
                    alt="Authorize.net Logo"
                    class="w-48"
                  />
                </div>
              </div>

              <div
                :class="[
                  'shadow-md flex gap-4 justify-center items-center  border-2 cursor-pointer transition-all duration-300 active:scale-100 p-2 sm:p-5 rounded',
                  paymentMethod === 'ACH'
                    ? 'border-[#4169E1] border-[2px]'
                    : 'border-black hover:scale-[1.02] border-[2px]',
                ]"
                @click="selectPayment('ACH')"
              >
                <div
                  class="h-3 sm:h-4 border-2 w-3 sm:w-4 rounded-full mx-auto"
                  :style="{
                    background: paymentMethod === 'ACH' ? '#4169E1' : 'white',
                    borderColor: paymentMethod === 'ACH' ? '#4169E1' : 'black',
                  }"
                ></div>
                <div
                  class="flex max-xl:flex-col max-xl:gap-0 items-center justify-center"
                >
                  <div
                    class="font-bold mr-1 translate-y-[0px] text-sm sm:text-lg"
                  >
                    Bank Transfer
                  </div>
                  <img
                    src="/images/icons/ach.png"
                    alt="Authorize.net Logo"
                    class="w-48"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- payment details -->
          <transition name="accordion">
            <div class="mt-4" v-if="paymentMethod">
              <div class="font-bold text-2xl text-blue-rgba leading-tight">
                Payment Details
              </div>
              <!--  -->
              <div class="mt-0">
                <!-- Same as profile -->
                <div class="flex gap-4 items-center translate-x-[-10px]">
                  <v-checkbox
                    v-model="sameAsProfile"
                    color="primary"
                    id="sameAsProfile"
                    :value="true"
                    class="w-10"
                    hide-details
                  >
                  </v-checkbox>
                  <div
                    for="sameAsProfile"
                    @click="sameAsProfile = !sameAsProfile"
                    class="w-full cursor-pointer text-sm sm:text-base translate-y-[0px]"
                  >
                    Would you prefer to use the same billing details as you've
                    previously set up in your profile?
                  </div>
                </div>
                <!-- v-if="paymentMethod === 'AUTHORIZE.NET'" -->
                <div class="">
                  <div
                    class="sm:mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
                  >
                    <div>
                      <InputLabel
                        class="font-bold"
                        for="first_name"
                        value="First Name*"
                      />
                      <TextInput
                        id="first_name"
                        type="text"
                        class="mt-1 block w-full"
                        required
                        v-model="form.first_name"
                        placeholder="Type your first name"
                        @input="clearError('first_name')"
                        autocomplete="given-name"
                      />
                      <InputError class="mt-2" :message="errors.first_name" />
                    </div>

                    <div>
                      <InputLabel
                        class="font-bold"
                        for="last_name"
                        value="Last Name*"
                      />
                      <TextInput
                        class="mt-1 block w-full"
                        id="last_name"
                        type="text"
                        v-model="form.last_name"
                        required
                        placeholder="Type your last name"
                        @input="clearError('last_name')"
                        autocomplete="family-name"
                      />
                      <InputError class="mt-2" :message="errors.last_name" />
                    </div>
                    <div class="mb-4 sm:mb-0">
                      <InputLabel
                        class="font-bold"
                        for="card_number"
                        value="Card Number*"
                      />
                      <TextInput
                        id="card_number"
                        type="tel"
                        class="mt-1 block w-full"
                        v-model="form.card_number"
                        @input="clearError('card_number')"
                        v-mask="'####-####-####-#############'"
                        placeholder="Type your card number"
                      />
                      <InputError class="mt-2" :message="errors.card_number" />
                    </div>
                    <div
                      class="mb-4 sm:mb-0 flex max-sm:flex-col sm:gap-6 justify-between"
                    >
                      <div>
                        <InputLabel for="cvv" class="font-bold" value="CVV*" />
                        <input-icon
                          :icon="isCvvShown ? 'mdi:hide' : 'mdi:show'"
                          color="#241e6d"
                          :cursor="true"
                          placeholder="CVV Number"
                          id="cvv"
                          :type="isCvvShown ? 'text' : 'password'"
                          class="mt-1 block w-full cursor-pointer"
                          @iconClick="toggleCVVVisibility"
                          inputClasses="border-gray-300 focus:ring-indigo-500 py-2 px-3 border-2"
                          mask="####"
                          readonly
                          onfocus="this.removeAttribute('readonly');"
                          autocomplete="off"
                          v-model="form.cvv"
                          @input="clearError('cvv')"
                          required
                        />
                        <InputError class="mt-2" :message="errors.cvv" />
                      </div>
                      <div class="mt-4 sm:mt-0">
                        <InputLabel
                          class="font-bold"
                          for="expiration_date"
                          value="Expiration Date*"
                        />
                        <TextInput
                          id="expiration_date"
                          type="tel"
                          class="mt-1 block w-full"
                          v-model="form.expiration_date"
                          @input="clearError('expiration_date')"
                          v-mask="'##/##'"
                          placeholder="MM/YY"
                        />
                        <InputError
                          class="mt-2"
                          :message="errors.expiration_date"
                        />
                      </div>
                    </div>
                    <div class="mb-4 sm:mb-0">
                      <InputLabel
                        class="font-bold"
                        for="address"
                        value="Address*"
                      />
                      <GoogleAddressAutocomplete
                        id="address"
                        v-model="form.address"
                        @input="clearError('address')"
                        @callback="callbackFunction"
                        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        placeholder="Type your address"
                      />

                      <InputError class="mt-2" :message="errors.address" />
                    </div>
                    <div class="mb-4 sm:mb-0">
                      <InputLabel class="font-bold" for="city" value="City*" />
                      <TextInput
                        id="city"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.city"
                        @input="clearError('city')"
                        placeholder="Type your city"
                      />
                      <InputError class="mt-2" :message="errors.city" />
                    </div>
                    <div class="mb-4 sm:mb-0">
                      <InputLabel class="font-bold mb-1" value="State*" />
                      <SelectProfile
                        :options="stateList"
                        :modelValue="form.state"
                        @update:modelValue="
                          (value) => {
                            form.state = value;
                            clearError('state');
                          }
                        "
                      />
                      <InputError class="mt-2" :message="errors.state" />
                    </div>

                    <div class="mb-4 sm:mb-0">
                      <InputLabel
                        class="font-bold"
                        for="zipcode"
                        value="Zip Code*"
                      />
                      <TextInput
                        id="zipcode"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.zipcode"
                        @input="clearError('zipcode')"
                        placeholder="Type your zip code"
                      />
                      <InputError class="mt-2" :message="errors.zipcode" />
                    </div>

                    <!-- <div class="mb-4 sm:mb-0">
                      <InputLabel
                        class="font-bold"
                        for="county"
                        value="County*"
                      />
                      <TextInput
                        id="county"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.county"
                        @input="clearError('county')"
                        placeholder="Type your county"
                      />
                      <InputError class="mt-2" :message="errors.county" />
                    </div> -->
                    <div class="mb-4 sm:mb-0">
                      <InputLabel
                        class="font-bold"
                        for="country"
                        value="Country*"
                      />
                      <TextInput
                        id="country"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.country"
                        @input="clearError('country')"
                        placeholder="Type your country"
                      />
                      <InputError class="mt-2" :message="errors.country" />
                    </div>
                  </div>
                  <InputError class="mt-2" :message="subscriptionApiError" />

                  <PrimaryButton
                    @click.stop="startSubscription"
                    type="button"
                    :disabled="loadingSubscribing"
                    :style="{
                      background: '#099268',
                      opacity: loadingSubscribing ? '0.4' : '1.0',
                    }"
                    class="w-full mt-4 flex justify-center"
                  >
                    <div
                      v-show="!loadingSubscribing"
                      class="flex items-center justify-center"
                    >
                      Subscribe now
                    </div>
                    <div v-show="loadingSubscribing">Subscribing...</div>
                  </PrimaryButton>
                </div>
                <!-- payment details -->
              </div>
            </div>
          </transition>
        </div>
        <Loader
          :loading="loading || loadingScript || !pricingPlan"
          background=""
          height="80vh"
        ></Loader>

        <CustomDialog
          submitText="Okay"
          :showFooter="false"
          dialogWidth="width-40"
          ref="verifyCouponDialogRef"
          title="Verify Coupon"
        >
          <div class="mb-4 sm:mb-0">
            <div class="mt-3">
              <InputLabel
                class="font-bold"
                for="Coupon_code"
                value="Enter Coupon Code"
              />
              <TextInput
                id="Coupon_code"
                type="text"
                class="mt-1 block w-full md:"
                v-model="form.coupon_code"
                required
              />
              <InputError class="mt-2" :message="errors.coupon_code" />
            </div>
            <InputError class="mt-2" :message="couponApiError" />
            <PrimaryButton
              @click="verifyCouponCode"
              :disabled="loading"
              :style="{
                backgroundColor: '#099268',
                opacity: loadingCoupon ? '0.4' : '1.0',
              }"
              class="w-full mt-3 flex justify-center"
            >
              <div
                v-show="!loadingCoupon"
                class="flex items-center justify-center"
              >
                Verify Coupon Code
              </div>
              <div v-show="loadingCoupon">Verifying...</div></PrimaryButton
            >
          </div>
          <!-- </Card> -->
        </CustomDialog>

        <CustomDialog
          :dontAllowCancel="true"
          submitText="Okay"
          :showFooter="false"
          dialogWidth="width-40"
          ref="confirmPaymentDialogRef"
          title="Welcome to tContractor"
        >
          <div class="flex items-center justify-center flex-col">
            <div class="">
              <div>
                You now have access to the most powerful tool in your
                toolbox.<strong>tContractor</strong> is your source to:
              </div>
              <ul>
                <li>Keep up to date on whats going on in your industry</li>
                <li>Find out what jobs are available.</li>
                <!-- <ul> -->

                <!-- </ul> -->
                <li>
                  Press continue to enter the News Feed! This is where the
                  action starts!
                </li>
              </ul>
            </div>

            <!-- Your payment has been processed successfully. We truly appreciate
              your trust in <strong>tContractor</strong>. With your subscription
              now active, you have unlocked a world of exclusive services and
              benefits. Dive into our news feed to stay updated and make the
              most of what we have to offer. Welcome to the
              <strong>tContractor</strong> community! -->
            <Link
              class="group flex items-center self-start justify-between rounded-xl border border-teal-500 bg-[#16a34a] px-5 py-3 mt-4 hover:bg-[#16a34a] focus:outline-none focus:ring transition transform duration-300 hover:shadow-lg active:scale-95"
              href="/post"
            >
              <span class="text-lg font-bold text-white uppercase transition">
                Continue
              </span>

              <!-- Arrow -->
              <span
                class="ml-4 flex-shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </CustomDialog>
      </Card>
    </div>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head, Link } from "@inertiajs/inertia-vue3";
import Button from "@/Components/Ratings/Button.vue";
import axios from "axios";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import SelectProfile from "@/Components/SelectProfile.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

import Loader from "@/Components/Ratings/Loader.vue";

import { Icon } from "@iconify/vue";

import Card from "@/Components/Card.vue";

import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import PageTitle from "@/Components/PageTitle.vue";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import { stateList } from "@/helpers/selectListsHelpters.js";
import InputIcon from "@/Components/InputIcon.vue";

import GoogleAddressAutocomplete from "@/Components/GoogleAddressAutoComplete.vue";

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
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const store = useStore();
const loading = ref(false);
const pricingPlan = ref({});
const planType = ref("MONTHLY");
const paymentMethod = ref("");
const sameAsProfile = ref(false);
const isCvvShown = ref(false);

const loadingScript = ref(true);
const form = reactive({
  first_name: "",
  last_name: "",
  card_number: "",
  cvv: "",
  expiration_date: "",
  address: "",
  city: "",
  duration: "",
  state: "",
  zipcode: "",
  // county: "",
  country: "",
  coupon_code: "",
});

const errors = reactive({
  first_name: "",
  last_name: "",
  card_number: "",
  cvv: "",
  expiration_date: "",
  address: "",
  city: "",
  state: "",
  zipcode: "",
  // county: "",
  country: "",
  coupon_code: "",
});
const loadingSubscribing = ref(false);
const loadingCoupon = ref(false);
const verifyCouponDialogRef = ref();
const couponApiError = ref("");
const subscriptionApiError = ref("");
const coupon = ref({});
const paymentDetailsRef = ref();
const confirmPaymentDialogRef = ref();

//onMounted

onMounted(async () => {
  const selectedPlan = localStorage.getItem("selectedPlan");
  if (selectedPlan) {
    planType.value = selectedPlan;
  }
  localStorage.removeItem("selectedPlan");
  fetchPricingCardDetails();
  try {
    loadingScript.value = true;
    await loadGoogleMapsScript();
    loadingScript.value = false;
  } catch (error) {
    console.error("Failed to load Google Maps API", error);
  }
});

//Computed
const screenWidth = computed(() => store.getters.screenWidth);
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
  const originalAnnualTotal = +pricingPlan.value.billed_annual_price;

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

watch(
  () => sameAsProfile.value,
  () => {
    if (sameAsProfile.value) {
      form.first_name = props.profile.first_name;
      form.last_name = props.profile.last_name;

      form.address = props.profile.address_1;
      form.city = props.profile.city;
      form.state = props.profile.state;
      form.zipcode = props.profile.zipcode;
      // form.county = props.profile.county;
      form.country = "US";
    } else {
      form.first_name = "";
      form.last_name = "";

      form.address = "";
      form.city = "";
      form.state = "";
      form.zipcode = "";
      // form.county = "";
      form.country = "";
    }
  }
);

//Methods
const fetchPricingCardDetails = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `/api/payment-info-of-a-region/${props.profile.region_id}`,
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
const selectPlan = (type) => {
  planType.value = type;
};
const selectPayment = async (method) => {
  paymentMethod.value = method;

  if (paymentMethod.value) {
    // Wait for the DOM update
    await nextTick();
    console.log(paymentDetailsRef.value.$el);
    setTimeout(() => {
      if (paymentDetailsRef.value) {
        const elementToScroll =
          paymentDetailsRef.value.$el || paymentDetailsRef.value;
        elementToScroll.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      } else {
        console.error("Unexpected issue with the ref");
      }
    }, 250);
  }
};

const clearError = (field) => {
  if (form[field]?.trim()) {
    errors[field] = "";
  }
};

const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
    } else {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;

      window.initMap = () => {
        resolve();
      };

      googleMapsScript.onerror = (error) => {
        reject(error);
      };

      document.head.appendChild(googleMapsScript);
    }
  });
};
onBeforeUnmount(() => {
  delete window.initMap;
});
const callbackFunction = (place) => {
  console.log(place, "place");
  for (const component of place.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    if (componentType == "locality") {
      form.city = component.long_name;
    }
    // if (componentType == "administrative_area_level_2") {
    //   form.county = component.long_name;
    // }
    if (componentType == "administrative_area_level_1") {
      form.state = component.long_name;
    }
    if (componentType == "country") {
      form.country = component.short_name;
    }
    if (componentType == "postal_code") {
      form.zipcode = component.long_name;
    }
  }
};
const toggleCVVVisibility = () => {
  isCvvShown.value = !isCvvShown.value;
};
const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }

  // Validate first_name
  if (!form.first_name?.trim()) {
    errors.first_name = "First name is required";
    isValid = false;
  }
  if (!form.last_name?.trim()) {
    errors.last_name = "Last name is required";
    isValid = false;
  }

  if (!form.address?.trim()) {
    errors.address = "Address is required";
    isValid = false;
  }

  // Validate city
  if (!form.city?.trim()) {
    errors.city = "City is required";
    isValid = false;
  }

  // Validate state
  if (!form.state?.trim()) {
    errors.state = "State is required";
    isValid = false;
  }

  // Validate zipcode
  if (form.zipcode?.trim().length < 5) {
    errors.zipcode = "ZipCode  cannot be less than 5 characters";
    isValid = false;
  }
  if (!form.zipcode?.trim()) {
    errors.zipcode = "Zipcode is required";
    isValid = false;
  }

  // Validate county
  // if (!form.county?.trim()) {
  //   errors.county = "County is required";
  //   isValid = false;
  // }
  if (!form.country?.trim()) {
    errors.country = "Country is required";
    isValid = false;
  }
  if (!form.card_number?.trim()) {
    errors.card_number = "Card number is required";
    isValid = false;
  } else if (!/^(\d{4}-){2,3}\d{4,13}$/.test(form.card_number.trim())) {
    errors.card_number = "Invalid card number format";
    isValid = false;
  }

  // Validate expiration date
  if (!form.expiration_date?.trim()) {
    errors.expiration_date = "Expiration date is required";
    isValid = false;
  } else {
    let [month, year] = form.expiration_date.split("/");
    let currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    let currentMonth = new Date().getMonth() + 1; // +1 because months are 0-indexed
    year = parseInt(year, 10);
    month = parseInt(month, 10);

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.expiration_date = "Expiration date should be in the future";
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiration_date)) {
      errors.expiration_date =
        "Invalid expiration date format. Should be MM/YY";
      isValid = false;
    }
  }

  // Validate CVV
  if (!form.cvv?.trim()) {
    errors.cvv = "CVV is required";
    isValid = false;
  } else if (!/^\d{3,4}$/.test(form.cvv)) {
    // This regex checks for a 3 or 4 digit CVV.
    errors.cvv = "Invalid CVV format";
    isValid = false;
  }

  return isValid;
};

const openCouponDialog = () => {
  verifyCouponDialogRef.value.openDialog();
};
const verifyCouponCode = async () => {
  couponApiError.value = "";
  if (!form.coupon_code?.trim()) {
    errors.coupon_code = "Coupon code  is Required";
    return;
  }
  loadingCoupon.value = true;
  try {
    const response = await axios.post(
      `/api/discount-coupon/verify`,
      { coupon_code: form.coupon_code },
      getAxiosConfig()
    );
    if (response.data) {
      console.log(response.data, "response");
      changesSaved(response.data.message);
      coupon.value = response.data.coupon;
    }
  } catch (err) {
    couponApiError.value = err.response.data.message;
  } finally {
    loadingCoupon.value = false;
    verifyCouponDialogRef.value.closeDialog();
  }
};
const startSubscription = async () => {
  if (validateForm()) {
    console.log("form", form);
    subscriptionApiError.value = "";

    loadingSubscribing.value = true;
    if (coupon.value && coupon.value.coupon_code) {
      form.coupon_code = coupon.value.coupon_code;
    } else {
      delete form.coupon_code;
    }
    const processedForm = { ...form };

    // Remove '-' from card_number
    processedForm.card_number = form.card_number.replace(/-/g, "");

    // Replace '/' with '-' in expiration_date
    processedForm.expiration_date = form.expiration_date.replace(/\//g, "-");
    processedForm.duration =
      planType.value === "MONTHLY" ? "monthly" : "annual";
    try {
      const response = await axios.post(
        `/api/payment/start-subscription`,
        processedForm,
        getAxiosConfig()
      );
      if (response.data) {
        console.log(response.data, "response");
        if (response.data?.messages?.resultCode === "Error") {
          subscriptionApiError.value = response.data?.messages?.message[0].text;
        } else {
          confirmPaymentDialogRef.value.openDialog();
        }
      }
    } catch (err) {
      console.log(err);
      subscriptionApiError.value = err.response.data.message;
    } finally {
      loadingSubscribing.value = false;
    }
  }
};
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
}
.accordion-enter-from, .accordion-leave-to /* .accordion-leave-active in <2.6 */ {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to, .accordion-leave-from /* .accordion-enter-active in <2.6 */ {
  max-height: 100em; /* large enough for content to fit */
  opacity: 1;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}
</style>
