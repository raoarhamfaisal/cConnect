<template>
  <CustomDialog
    :showFooter="false"
    ref="dialogRef"
    style="z-index: 9999"
    :title="
      props.isUpdateAndSubscribe
        ? 'Update Payment Method and Subscribe'
        : 'Update Payment Method'
    "
  >
    <div class="mt-5 sm:mt-1 flex-col">
      <div class="" v-if="!loading && !loadingScript">
        <!-- payment type -->
        <div class="mt-4">
          <div class="font-bold text-2xl text-blue-rgba leading-tight">
            Choose Payment Method
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
                    {{
                      props.isUpdateAndSubscribe
                        ? "Update & Subscribe"
                        : "Update"
                    }}
                  </div>
                  <div v-show="loadingSubscribing">
                    {{
                      props.isUpdateAndSubscribe ? "Subscribing" : "Updating"
                    }}
                  </div>
                </button>
              </div>
              <!-- payment details -->
            </div>
          </div>
        </transition>
      </div>
      <Loader
        :loading="loading || loadingScript"
        background=""
        height="80vh"
      ></Loader>

      <CustomDialog
        submitText="Okay"
        :showCancel="false"
        dialogWidth="width-40"
        ref="paymentMethodUpdatedDialogRef"
        title="Payment Method Updated Successfully"
      >
        <div class="flex items-center justify-center flex-col">
          <div class="">
            Your payment details have been successfully updated and will be used
            for future payments. Thank you for keeping your account information
            current!
          </div>
        </div>
      </CustomDialog>
    </div>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import Button from "@/Components/Ratings/Button.vue";
import axios from "axios";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import SelectProfile from "@/Components/SelectProfile.vue";

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
// import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import { stateList } from "@/helpers/selectListsHelpters.js";
import InputIcon from "@/Components/InputIcon.vue";

import GoogleAddressAutocomplete from "@/Components/GoogleAddressAutoComplete.vue";

// State
const props = defineProps({
  profile: Object,
  isUpdateAndSubscribe: {
    type: Boolean,
    default: false,
  },
});
const dialogRef = ref();

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
const paymentMethodUpdatedDialogRef = ref();
const choosedVersion = ref("");

//onMounted

onMounted(async () => {
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
          paymentMethodUpdatedDialogRef.value.openDialog();
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

const openDialog = () => {
  return dialogRef.value.openDialog();
};
defineExpose({ openDialog });
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
