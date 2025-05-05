<template>
  <Head :title="translations && translations.payment" />

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
          <PageTitle
            :linkUrl="goBack"
            :pageTitle="translations && translations.payment"
          />
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
                <h2 class="text-xl sm:text-2xl font-bold mb-2 uppercase">
                  {{ translations && translations.monthly }}
                </h2>
                <div
                  class="price-tag w-28 h-28 sm:w-40 sm:h-40 border-2 rounded-full flex items-center justify-center"
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
                <h2 class="text-xl sm:text-2xl font-bold mb-2 uppercase">
                  {{ translations && translations.annual_cap }}
                </h2>
                <div
                  class="price-tag w-28 h-28 sm:w-40 sm:h-40 border-2 rounded-full flex items-center justify-center"
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
          <!-- <div
            class="font-bold flex mt-6 flex-wrap justify-center items-center text-base"
          >
            Have a coupon code?
            <div
              @click="openCouponDialog"
              class="text-sm ml-1 text-green-600 hover:underline cursor-pointer"
            >
              Click here to enter your code
            </div>
          </div> -->
          <!-- payment type -->
          <div class="mt-4">
            <div class="font-bold text-2xl text-blue-rgba leading-tight">
              {{ translations && translations.choose_payment_method }}
            </div>
            <!-- (c) 2005, 2023. Authorize.Net is a registered trademark of CyberSource Corporation  -->
            <!-- <div class="AuthorizeNetSeal"> <script type="text/javascript" language="javascript">var ANS_customer_id="c5098736-0049-4d71-84e8-37f0778a3208";</script> <script type="text/javascript" language="javascript" src="//verify.authorize.net:6001/anetseal/seal.js" ></script> </div> -->
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
            </div>
          </div>

          <!-- payment details -->
          <transition name="accordion">
            <div class="mt-4" v-if="paymentMethod">
              <div class="font-bold text-2xl text-blue-rgba leading-tight">
                {{ translations && translations.payment_details }}
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
                    {{
                      translations &&
                      translations.would_you_prefer_to_use_the_same_billing_details
                    }}
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
                        :value="translations && translations.first_name + '*'"
                      />
                      <TextInput
                        id="first_name"
                        type="text"
                        class="mt-1 block w-full"
                        required
                        v-model="form.first_name"
                        :placeholder="
                          translations && translations.type_your_first_name
                        "
                        @input="clearError('first_name')"
                        autocomplete="given-name"
                      />
                      <InputError class="mt-2" :message="errors.first_name" />
                    </div>

                    <div>
                      <InputLabel
                        class="font-bold"
                        for="last_name"
                        :value="translations && translations.last_name + '*'"
                      />
                      <TextInput
                        class="mt-1 block w-full"
                        id="last_name"
                        type="text"
                        v-model="form.last_name"
                        required
                        :placeholder="
                          translations && translations.type_your_last_name
                        "
                        @input="clearError('last_name')"
                        autocomplete="family-name"
                      />
                      <InputError class="mt-2" :message="errors.last_name" />
                    </div>
                    <div class="mb-4 sm:mb-0">
                      <InputLabel
                        class="font-bold"
                        for="card_number"
                        :value="translations && translations.card_number + '*'"
                      />
                      <TextInput
                        id="card_number"
                        type="tel"
                        class="mt-1 block w-full"
                        v-model="form.card_number"
                        @input="clearError('card_number')"
                        v-mask="'####-####-####-#############'"
                        :placeholder="
                          translations && translations.type_your_card_number
                        "
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
                          :placeholder="translations && translations.cvv_number"
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
                          :value="
                            translations && translations.expiration_date + '*'
                          "
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
                        :value="`${translations && translations.address}*`"
                      />
                      <GoogleAddressAutocomplete
                        id="address"
                        v-model="form.address"
                        @input="clearError('address')"
                        @callback="callbackFunction"
                        class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        :placeholder="
                          translations && translations.type_your_address
                        "
                      />

                      <InputError class="mt-2" :message="errors.address" />
                    </div>
                    <div class="mb-4 sm:mb-0">
                      <InputLabel
                        class="font-bold"
                        for="city"
                        :value="translations && translations.city + '*'"
                      />
                      <TextInput
                        id="city"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.city"
                        @input="clearError('city')"
                        :placeholder="
                          translations && translations.type_your_city
                        "
                      />
                      <InputError class="mt-2" :message="errors.city" />
                    </div>
                    <div class="mb-4 sm:mb-0">
                      <InputLabel
                        class="font-bold mb-1"
                        :value="translations && translations.state + '*'"
                      />
                      <SelectProfile
                        :options="provincesList"
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
                        :value="'Postal Code*'"
                      />
                      <TextInput
                        id="zipcode"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.zipcode"
                        @input="clearError('zipcode')"
                        placeholder="Type your Postal Code"
                      />
                      <InputError class="mt-2" :message="errors.zipcode" />
                    </div>
                  </div>
                  <InputError class="mt-2" :message="subscriptionApiError" />

                  <button
                    @click="startSubscription"
                    type="button"
                    :disabled="loadingSubscribing"
                    :style="{
                      background: '#099268',
                      opacity: loadingSubscribing ? '0.4' : '1.0',
                    }"
                    class="w-full mt-4 flex justify-center inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-md text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                  >
                    <div
                      v-show="!loadingSubscribing"
                      class="flex items-center justify-center"
                    >
                      {{ translations && translations.subscribe_now }}
                    </div>
                    <div v-show="loadingSubscribing">
                      {{ translations && translations.subscribing }}...
                    </div>
                  </button>
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
          :dontAllowCancel="true"
          :submitText="translations && translations.okay"
          :showFooter="false"
          dialogWidth="width-40"
          ref="confirmPaymentDialogRef"
          :title="translations && translations.welcome_to_cConnect"
        >
          <div class="flex items-center justify-center flex-col">
            <div class="">
              <div>
                {{ translations && translations.you_now_have_access
                }}<strong>cConnect</strong>
                {{ translations && translations.is_your_source_to }}
              </div>
              <ul>
                <li>
                  {{
                    translations &&
                    translations.keep_up_to_date_on_whats_going_on
                  }}
                </li>
                <li>
                  {{
                    translations &&
                    translations.find_out_what_jobs_are_available
                  }}
                </li>
                <!-- <ul> -->

                <!-- </ul> -->
                <li>
                  {{
                    translations &&
                    translations.press_continue_to_enter_the_news_feed
                  }}
                </li>
              </ul>
            </div>

            <!-- Your payment has been processed successfully. We truly appreciate
              your trust in <strong>cConnect</strong>. With your subscription
              now active, you have unlocked a world of exclusive services and
              benefits. Dive into our news feed to stay updated and make the
              most of what we have to offer. Welcome to the
              <strong>cConnect</strong> community! -->
            <Link
              class="group flex items-center self-start justify-between rounded-xl border border-teal-500 bg-[#16a34a] px-5 py-3 mt-4 hover:bg-[#16a34a] focus:outline-none focus:ring transition transform duration-300 hover:shadow-lg active:scale-95"
              href="/post"
            >
              <span class="text-lg font-bold text-white uppercase transition">
                {{ translations && translations.continue }}
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

import Loader from "@/Components/Ratings/Loader.vue";

import Card from "@/Components/Card.vue";

import { useStore } from "vuex";

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
import { provincesList } from "@/helpers/selectListsHelpters.js";
import InputIcon from "@/Components/InputIcon.vue";

import GoogleAddressAutocomplete from "@/Components/GoogleAddressAutoComplete.vue";

// Province
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
  country: "US",
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
const subscriptionApiError = ref("");
const coupon = ref({});
const paymentDetailsRef = ref();
const confirmPaymentDialogRef = ref();
const monthlyTotal = ref(0.0);
const annualTotal = ref(0.0);
const choosedVersion = ref("");

//onMounted

onMounted(async () => {
  const selectedPlan = localStorage.getItem("selectedPlan");
  coupon.value = JSON.parse(localStorage.getItem("coupon"));
  const total = JSON.parse(localStorage.getItem("total"));
  choosedVersion.value = localStorage.getItem("choosedVersion");
  localStorage.removeItem("choosedVersion");
  if (total && Object.keys(total).length > 0) {
    monthlyTotal.value = total.monthlyTotal;
    annualTotal.value = total.annualTotal;
  }

  if (selectedPlan) {
    planType.value = selectedPlan;
  }

  localStorage.removeItem("selectedPlan");
  localStorage.removeItem("coupon");
  localStorage.removeItem("total");

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
const translations = computed(() => store.getters.translations);

const goBack = computed(() => {
  // Check if the history is
  return "/pricing-plan";
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
    if (response.data) {
      pricingPlan.value = { ...response.data.paymentInfo };

      if (!monthlyTotal.value) {
        const salesTax = +pricingPlan.value.sales_tax * 0.01;
        monthlyTotal.value =
          +pricingPlan.value.gold_billed_monthly_price +
          +pricingPlan.value.gold_billed_monthly_price * salesTax;
        annualTotal.value =
          +pricingPlan.value.gold_billed_annual_price +
          +pricingPlan.value.gold_billed_annual_price * salesTax;
      }
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
    errors.first_name =
      translations.value && translations.value.first_name_is_required;
    isValid = false;
  }
  if (!form.last_name?.trim()) {
    errors.last_name =
      translations.value && translations.value.last_name_is_required;
    isValid = false;
  }

  if (!form.address?.trim()) {
    errors.address =
      translations.value && translations.value.address_is_required;
    isValid = false;
  }

  // Validate city
  if (!form.city?.trim()) {
    errors.city = translations.value && translations.value.city_is_required;
    isValid = false;
  }

  // Validate state
  if (!form.state?.trim()) {
    errors.state = translations.value && translations.value.state_is_required;
    isValid = false;
  }

  // Validate zipcode
  if (form.zipcode?.trim().length < 5) {
    errors.zipcode =
      translations.value &&
      translations.value.zipcode_cannot_be_less_than_5_characters;
    isValid = false;
  }
  if (!form.zipcode?.trim()) {
    errors.zipcode =
      translations.value && translations.value.zipcode_is_required;
    isValid = false;
  }

  // Validate county
  // if (!form.county?.trim()) {
  //   errors.county = "District is required";
  //   isValid = false;
  // }
  if (!form.country?.trim()) {
    errors.country =
      translations.value && translations.value.country_is_required;
    isValid = false;
  }
  if (!form.card_number?.trim()) {
    errors.card_number =
      translations.value && translations.value.card_number_is_required;
    isValid = false;
  } else if (!/^(\d{4}-){2,3}\d{4,13}$/.test(form.card_number.trim())) {
    errors.card_number =
      translations.value && translations.value.invalid_card_number_format;
    isValid = false;
  }

  // Validate expiration date
  if (!form.expiration_date?.trim()) {
    errors.expiration_date =
      translations.value && translations.value.expiration_date_is_required;
    isValid = false;
  } else {
    let [month, year] = form.expiration_date.split("/");
    let currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    let currentMonth = new Date().getMonth() + 1; // +1 because months are 0-indexed
    year = parseInt(year, 10);
    month = parseInt(month, 10);

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.expiration_date =
        translations.value &&
        translations.value.expiration_date_should_be_in_the_future;
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiration_date)) {
      errors.expiration_date =
        translations.value && translations.value.invalid_expiration_date_format;
      isValid = false;
    }
  }

  // Validate CVV
  if (!form.cvv?.trim()) {
    errors.cvv = translations.value && translations.value.cvv_is_required;
    isValid = false;
  } else if (!/^\d{3,4}$/.test(form.cvv)) {
    // This regex checks for a 3 or 4 digit CVV.
    errors.cvv = translations.value && translations.value.invalid_cvv_format;
    isValid = false;
  }

  return isValid;
};

const startSubscription = async () => {
  if (validateForm()) {
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
    processedForm.version = choosedVersion.value === "gold" ? 2 : 3;
    try {
      const response = await axios.post(
        `/api/payment/start-subscription`,
        processedForm,
        getAxiosConfig()
      );
      if (response.data) {
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
