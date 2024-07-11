<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import PricingFeature from "@/Components/Pricing/PricingFeature.vue";
import FAQS from "@/Components/Pricing/FAQS.vue";
import { useStore } from "vuex";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { Inertia } from "@inertiajs/inertia";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { usePage } from "@inertiajs/inertia-vue3";

const props = defineProps({
  showRightVersionText: {
    type: Boolean,
    default: true,
  },
  pageName: {
    type: String,
    default: "pricing",
  },
  currentStep: {
    type: Number,
    default: 1,
  },
  showGoldSelect: {
    type: Boolean,
    default: true,
  },
});

const freeVersion = ref({});
const goldVersion = ref({});
const platinumVersion = ref({});
const loading = ref(false);
const loadingFree = ref(false);
const store = useStore();
const pricingPlan = ref({});
const freeConfirmDialog = ref();
const freeActivatedDialog = ref();

const emit = defineEmits(["platinumSelected"]);

const userVersion = computed(() => store.getters.userVersion);
const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);

const notPricingPageAndDesktop = computed(
  () =>
    props.pageName !== "pricing" &&
    screenWidth.value > 768 &&
    screenWidth.value < 1200
);

const notFreeVersion = computed(
  () => userVersion.value !== 0 && userVersion.value !== 1
);

onMounted(() => {
  store.dispatch("fetchUserVersion");
  fetchPricingCardDetails();
  fetchDefaultVersionValues();
});

const fetchDefaultVersionValues = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`api/all-versions`);
    if (response.data) {
      console.log(response.data);
      response.data.forEach((item) => {
        if (item.id === 1) {
          freeVersion.value = item;
        } else if (item.id === 2) {
          goldVersion.value = item;
        } else if (item.id === 3) {
          platinumVersion.value = item;
        }
      });
    }
    scrollToFAQs();
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
  }
};

const isSticky = ref(false);
const headerRef = ref(null);
const faqsRef = ref(null);

// Fetch your version values and define other component logic here...

const handleScroll = () => {
  console.log("in scroll mode");
  const headerElement = headerRef.value;
  const faqsElement = faqsRef.value;

  console.log(
    headerElement.getBoundingClientRect().top,

    faqsElement.getBoundingClientRect().top,
    "top"
  );
  if (headerElement && faqsElement) {
    const headerTop = headerElement.getBoundingClientRect().top;
    const faqsTop = faqsElement.getBoundingClientRect().top;

    if (headerTop <= 0 && faqsTop >= 400) {
      // The header is at the top of the viewport and the FAQs are not at the top yet.
      isSticky.value = true;
    } else if (faqsTop < 400 || headerTop > 0) {
      // The header is no longer at the top or the FAQs are at the top of the viewport.
      isSticky.value = false;
    }
  }
};

onMounted(() => {
  if (screenWidth.value < 768) {
    if (props.pageName !== "pricing") {
      const newFeed = document.querySelector("#scrollable");
      newFeed.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }
  }
});
onUnmounted(() => {
  if (screenWidth.value < 768) {
    if (props.pageName !== "pricing") {
      const newFeed = document.querySelector("#scrollable");
      newFeed.removeEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
  }
});

const fetchPricingCardDetails = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `/api/payment-info-of-a-region/1`,
      getAxiosConfig()
    );
    console.log(response, "response");
    if (response.data) {
      pricingPlan.value = { ...response.data.paymentInfo };
    }
    scrollToFAQs();
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price) => {
  const num = parseFloat(price);
  if (Math.floor(num) === num) {
    return Math.floor(num).toString();
  }
  return num.toString();
};

const onFreeSelect = () => {
  if (props.pageName === "pricing") {
    Inertia.visit("/signup");
  } else if (props.pageName === "profile-setup") {
    freeConfirmDialog.value.openDialog();
  }
};

const onFreeSubmit = async () => {
  loadingFree.value = true;
  try {
    const response = await axios.post(
      `/api/profile/complete-profile-and-start-free-subscription`,
      {},
      getAxiosConfig()
    );
    console.log(response, "response");
    if (response.data) {
      freeActivatedDialog.value.openDialog();
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loadingFree.value = false;
  }
};
const configurePrevUrlPricingPlan = () => {
  if (props.pageName === "profile-setup") {
    localStorage.setItem("prevUrlPricingPlan", "/profile-setup");
  } else if (props.pageName === "pricing") {
    localStorage.setItem("prevUrlPricingPlan", "/pricing");
  } else if (props.pageName === "settings") {
    localStorage.setItem("prevUrlPricingPlan", "/settings");
  }
};
const configureUrlToVisit = () => {
  if (
    props.pageName === "profile-setup" ||
    (props.pageName === "settings" && userVersion.value === 1)
  ) {
    console.log("in pricing plan");
    Inertia.visit("/pricing-plan");
  } else if (props.pageName === "settings" && userVersion.value === 2) {
    emit("platinumSelected", {});
  } else if (props.pageName === "pricing" && userVersion.value === 0) {
    Inertia.visit("/signup");
  } else if (props.pageName === "pricing" && userVersion.value !== 0) {
    localStorage.setItem("activeTab", 2);
    Inertia.visit("/settings");
  }
};
const onGoldSelect = () => {
  configurePrevUrlPricingPlan();
  localStorage.setItem("choosedVersion", "gold");
  configureUrlToVisit();
};
const onPlatinumSelect = () => {
  configurePrevUrlPricingPlan();
  localStorage.setItem("choosedVersion", "platinum");
  configureUrlToVisit();
};

const scrollToFAQs = () => {
  if (usePage().url.value.includes("#faqs")) {
    faqsRef.value.scrollIntoView({ behavior: "auto", block: "start" });
  }
};
</script>
<template>
  <CustomDialog
    @submit="onFreeSubmit"
    :loading="loadingFree"
    :disabled="loadingFree"
    :submitText="translations && translations.confirm"
    dialogWidth="width-40"
    ref="freeConfirmDialog"
    title="Are you sure you want to choose the Free Package?"
  >
    <div class="flex items-center justify-center flex-col">
      <div class="w-full sm:text-lg sm:font-semibold">
        <div>{{ translations && translations.with_this_option_you_get }}</div>
        <ul>
          <li>
            {{ translations && translations.access_to_news_feed }}
          </li>
          <li>
            {{ translations && translations.post_up_to_8_times_per_month }}
          </li>
          <li>
            {{ translations && translations.conduct_5_searches_per_month }}
          </li>
          <li>
            {{ translations && translations.join_3_trade_groups }}
          </li>
          <li>
            {{
              translations &&
              translations.ability_to_view_all_trade_group_postings
            }}
          </li>
        </ul>
        <div>
          {{ translations && translations.this_package_is_great_to_start }}
        </div>

        <div>
          {{ translations && translations.click }}
          <strong>"{{ translations && translations.confirm }}"</strong>
          {{ translations && translations.to_proceed_or }}
          <strong>"{{ translations && translations.cancel }}"</strong>
          {{ translations && translations.to_review_other_options }}
        </div>
      </div>
    </div>
  </CustomDialog>
  <CustomDialog
    :dontAllowCancel="true"
    :submitText="translations && translations.okay"
    :showFooter="false"
    dialogWidth="width-40"
    ref="freeActivatedDialog"
    :title="translations && translations.free_version_has_started"
  >
    <div class="flex items-center justify-center flex-col">
      <div class="text-2xl font-bold self-start mb-1">
        {{ translations && translations.welcome_to_tcontractor }}
      </div>
      <div class="w-full sm:text-lg sm:semi-bold">
        <div>
          {{ translations && translations.you_now_have_access
          }}<strong>tContractor</strong>
          {{ translations && translations.is_your_source_to }}
        </div>
        <ul>
          <li>
            {{ translations && translations.keep_up_to_date_on_whats_going_on }}
          </li>
          <li>
            {{ translations && translations.find_out_what_jobs_are_available }}
          </li>
          <li>
            {{ translations && translations.you_can_always }}
            <strong>{{
              translations && translations.upgrade_to_gold_or_platinum_version
            }}</strong>
            {{ translations && translations.by_going_to_settings }}
          </li>
          <li>
            {{
              translations && translations.press_continue_to_enter_the_news_feed
            }}
          </li>
        </ul>
      </div>

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
  <div
    :class="` xl:container bg-white md:mx-auto ${
      props.pageName !== 'pricing' ? ' mt-4' : 'mt-4 px-2 sm:p-6 py-4'
    }   shadow-md rounded-lg`"
  >
    <div
      v-if="loading"
      class="h-[30vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
    >
      <div class="text-center text-xl">
        {{ translations && translations.loading }}
      </div>
      <v-progress-linear
        color="#241e6d"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </div>
    <!-- Pricing Versions Desktop -->
    <section v-if="!loading" id="pricing" class="">
      <div
        v-if="props.showRightVersionText"
        class="flex justify-center"
        ref="whatVersionAreYourRef"
      >
        <span class="text-3xl font-extrabold mb-4 text-center text-blue-rgba">
          {{ translations && translations.what_version_is_right_for_you }}
        </span>
      </div>
      <!-- tableHead  for Desktop-->
      <div class="flex gap-2" v-if="screenWidth > 768">
        <div class="w-[55%]"></div>
        <!-- Free -->

        <div
          v-if="userVersion === 1 || userVersion === 0"
          class="w-[15%] flex flex-col justify-between"
        >
          <img class="mb-3 h-full object-contain" src="./assets/freebox.png" />
          <button
            v-if="userVersion === 0"
            class="mt-[2px] checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95"
            @click="onFreeSelect"
          >
            {{ translations && translations.select }}
          </button>
        </div>
        <!-- Gold -->
        <div :style="{ width: notFreeVersion ? '22.5%' : '15%' }">
          <div class="flex flex-col items-center h-full">
            <div
              :style="{
                fontSize: notPricingPageAndDesktop ? '1rem' : '',
                lineHeight: notPricingPageAndDesktop ? '1.05' : '',
              }"
              class="text-black text-xl font-bold"
            >
              {{ translations && translations.gold_package }}
            </div>
            <div class="flex text-green-rgba font-extrabold mt-1">
              <div
                :style="{
                  fontSize: notPricingPageAndDesktop ? '1.2rem' : '',
                  lineHeight: notPricingPageAndDesktop ? '1.05' : '',
                }"
                class="text-2xl self-center mt-[-30px]"
              >
                $
              </div>
              <div
                :style="{
                  fontSize: notPricingPageAndDesktop ? '50px' : '',
                }"
                class="text-[70px] leading-[0.9]"
              >
                {{ formatPrice(pricingPlan.gold_advertised_price) }}
              </div>
            </div>
            <div
              :style="{
                fontSize: notPricingPageAndDesktop ? '0.9rem' : '',
                lineHeight: notPricingPageAndDesktop ? '1.05' : '',
              }"
              class="text-lg font-semibold capitalize"
            >
              {{ translations && translations.per_month }}
            </div>

            <button
              v-if="showGoldSelect && userVersion !== 2 && userVersion !== 3"
              @click="onGoldSelect"
              class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
            >
              {{ translations && translations.select }}
            </button>
          </div>
        </div>
        <!-- Platinium -->
        <div :style="{ width: notFreeVersion ? '22.5%' : '15%' }">
          <div class="flex flex-col justify-center items-center h-full">
            <div
              :style="{
                fontSize: notPricingPageAndDesktop ? '1rem' : '',
                lineHeight: notPricingPageAndDesktop ? '1.05' : '',
              }"
              class="text-black text-xl font-bold"
            >
              {{ translations && translations.platinum_package }}
            </div>
            <div class="flex text-blue-rgba font-extrabold mt-1">
              <div
                :style="{
                  fontSize: notPricingPageAndDesktop ? '1.2rem' : '',
                  lineHeight: notPricingPageAndDesktop ? '1.05' : '',
                }"
                class="text-2xl self-center mt-[-30px]"
              >
                $
              </div>
              <div
                :style="{
                  fontSize: notPricingPageAndDesktop ? '50px' : '',
                }"
                class="text-[70px] t leading-[0.9]"
              >
                {{ formatPrice(pricingPlan.platinum_advertised_price) }}
              </div>
            </div>
            <div
              :style="{
                fontSize: notPricingPageAndDesktop ? '0.9rem' : '',
                lineHeight: notPricingPageAndDesktop ? '1.05' : '',
              }"
              class="text-lg font-semibold capitalize"
            >
              {{ translations && translations.per_month }}
            </div>
            <button
              @click="onPlatinumSelect"
              class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
            >
              {{ translations && translations.select }}
            </button>
          </div>
        </div>
      </div>
      <!-- tableHead  for Mobile-->
      <div
        v-else
        class="grid gap-x-1 versions-head"
        :class="userVersion !== 1 ? 'grid-cols-2' : 'grid-cols-3'"
        ref="headerRef"
      >
        <!-- Free -->

        <div
          v-if="userVersion === 1 || userVersion === 0"
          class="flex flex-col justify-between"
        >
          <img class="mb-3 h-full object-contain" src="./assets/freebox.png" />
          <button
            @click="onFreeSelect"
            v-if="userVersion === 0"
            class="mt-[2px] checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95"
          >
            {{ translations && translations.select }}
          </button>
        </div>
        <!-- Gold -->
        <div>
          <div class="flex flex-col justify-start items-center h-full">
            <div :class="`text-black text-lg font-bold `">
              {{ translations && translations.gold }}
            </div>
            <div class="flex text-green-rgba font-extrabold mt-1">
              <div class="text-lg self-center mt-[-30px]">$</div>
              <div class="text-[50px] leading-[0.9]">
                {{ formatPrice(pricingPlan.gold_advertised_price) }}
              </div>
            </div>
            <div class="text-base font-semibold capitalize">
              {{ translations && translations.per_month }}
            </div>
            <button
              @click="onGoldSelect"
              v-if="showGoldSelect && userVersion !== 2 && userVersion !== 3"
              class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
            >
              {{ translations && translations.select }}
            </button>
          </div>
        </div>
        <!-- Platinium -->
        <div>
          <div class="flex flex-col justify-center items-center h-full">
            <div class="text-black text-lg font-bold">
              {{ translations && translations.platinum }}
            </div>
            <div class="flex text-blue-rgba font-extrabold mt-1">
              <div class="text-lg self-center mt-[-30px]">$</div>

              <div class="text-[50px] t leading-[0.9]">
                {{ formatPrice(pricingPlan.platinum_advertised_price) }}
              </div>
            </div>
            <div class="text-base font-semibold capitalize">
              {{ translations && translations.per_month }}
            </div>
            <button
              @click="onPlatinumSelect"
              class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
            >
              {{ translations && translations.select }}
            </button>
          </div>
        </div>
      </div>

      <div class="features pb-4">
        <!-- News Feed -->
        <div class="w-full mb-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            {{ translations && translations.news_feed }}:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations &&
              translations.view_all_postings_and_shared_information
            "
            :freeText="1"
            :goldText="1"
            :platinumText="1"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations &&
              translations.view_all_postings_by_trade_or_location
            "
            :freeText="1"
            :goldText="1"
            :platinumText="1"
          />
        </div>
        <!-- News Feed Postings-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            {{ translations && translations.news_feed_postings }}
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.postings_per_month"
            :freeText="freeVersion.nf_ppm"
            :goldText="goldVersion.nf_ppm"
            :platinumText="platinumVersion.nf_ppm"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.images_inside_posting"
            :freeText="freeVersion.nf_ipp"
            :goldText="goldVersion.nf_ipp"
            :platinumText="platinumVersion.nf_ipp"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations &&
              translations.improve_post_visibility_by_adding_title
            "
            :freeText="freeVersion.nf_title"
            :goldText="goldVersion.nf_title"
            :platinumText="platinumVersion.nf_title"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations &&
              translations.improve_post_visibility_by_adding_closing_text
            "
            :freeText="freeVersion.nf_bottom"
            :goldText="goldVersion.nf_bottom"
            :platinumText="platinumVersion.nf_bottom"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.make_comments_on_postings
            "
            :freeText="freeVersion.nf_comments"
            :goldText="goldVersion.nf_comments"
            :platinumText="platinumVersion.nf_comments"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.repost_posting"
            :freeText="freeVersion.nf_repost"
            :goldText="goldVersion.nf_repost"
            :platinumText="platinumVersion.nf_repost"
          />
        </div>
        <!-- Sub Finder-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            {{ translations && translations.sub_finder }}:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations &&
              translations.searches_for_contractors_and_subcontractors
            "
            :freeText="1"
            :goldText="1"
            :platinumText="1"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.no_of_contractor_searches_per_month
            "
            :freeText="freeVersion.sf_search"
            :goldText="goldVersion.sf_search"
            :platinumText="platinumVersion.sf_search"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.track_contractors_and_subcontractors
            "
            :freeText="freeVersion.sf_tracking"
            :goldText="goldVersion.sf_tracking"
            :platinumText="platinumVersion.sf_tracking"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.create_personal_notes_on_contractors
            "
            :freeText="freeVersion.sf_notes"
            :goldText="goldVersion.sf_notes"
            :platinumText="platinumVersion.sf_notes"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.access_to_contractor_info_pages
            "
            :freeText="freeVersion.sf_info"
            :goldText="goldVersion.sf_info"
            :platinumText="platinumVersion.sf_info"
          />
        </div>
        <!-- Trade Groups-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            {{ translations && translations.trade_groups }}:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.membership_in_trade_groups
            "
            :freeText="freeVersion.tg_members"
            :goldText="goldVersion.tg_members"
            :platinumText="platinumVersion.tg_members"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.post_in_member_trade_groups
            "
            :freeText="freeVersion.tg_post"
            :goldText="goldVersion.tg_post"
            :platinumText="platinumVersion.tg_post"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.view_all_trade_group_postings
            "
            :freeText="freeVersion.tg_view_all"
            :goldText="goldVersion.tg_view_all"
            :platinumText="platinumVersion.tg_view_all"
          />
        </div>
        <!-- View Red Flags-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            {{ translations && translations.view_red_flags }}:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.search_red_flags"
            :freeText="freeVersion.rf_access"
            :goldText="goldVersion.rf_access"
            :platinumText="platinumVersion.rf_access"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.flagged_customers"
            :freeText="freeVersion.rf_customers"
            :goldText="goldVersion.rf_customers"
            :platinumText="platinumVersion.rf_customers"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.flagged_sales_reps"
            :freeText="freeVersion.rf_sales"
            :goldText="goldVersion.rf_sales"
            :platinumText="platinumVersion.rf_sales"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.flagged_contractors"
            :freeText="freeVersion.rf_contractor"
            :goldText="goldVersion.rf_contractor"
            :platinumText="platinumVersion.rf_contractor"
          />
        </div>
        <!-- Real Contractor Reviews-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            {{ translations && translations.real_contractor_reviews }}:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.give_a_review"
            :freeText="freeVersion.re_reviews"
            :goldText="goldVersion.re_reviews"
            :platinumText="platinumVersion.re_reviews"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.provide_feedback_on_review
            "
            :freeText="freeVersion.re_feedback"
            :goldText="goldVersion.re_feedback"
            :platinumText="platinumVersion.re_feedback"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.appeal_review"
            :freeText="freeVersion.re_appeal"
            :goldText="goldVersion.re_appeal"
            :platinumText="platinumVersion.re_appeal"
          />
        </div>
        <!-- Contractor Page-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            {{ translations && translations.contractor_page }}:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations && translations.no_of_free_page_templates
            "
            :freeText="freeVersion.cp_template?.toString()"
            :goldText="goldVersion.cp_template?.toString()"
            :platinumText="platinumVersion.cp_template?.toString()"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="translations && translations.no_of_color_schemes"
            :freeText="freeVersion.cp_color?.toString()"
            :goldText="goldVersion.cp_color?.toString()"
            :platinumText="platinumVersion.cp_color?.toString()"
          />
          <PricingFeature
            :pageName="props.pageName"
            bgColor="#f4f8ff"
            :featureText="
              translations &&
              translations.share_your_contractor_page_with_others
            "
            :freeText="freeVersion.cp_share"
            :goldText="goldVersion.cp_share"
            :platinumText="platinumVersion.cp_share"
          />
        </div>
      </div>
    </section>
  </div>
  <div loadingclass="faqs" ref="faqsRef">
    <FAQS />
  </div>

  <!-- for Sticky Behavoir in Mobile -->
  <div
    v-if="isSticky && screenWidth < 768"
    :style="{
      top:
        props.pageName !== 'pricing' && screenWidth >= 640
          ? '64px'
          : props.pageName !== 'pricing' && screenWidth < 640
          ? '56px'
          : '0',
    }"
    class="grid gap-x-1 versions-head sticky"
    :class="userVersion !== 1 ? 'grid-cols-2' : 'grid-cols-3'"
  >
    <!-- Free -->

    <div
      v-if="userVersion === 1 || userVersion === 0"
      class="flex flex-col justify-between"
    >
      <img class="mb-3 h-full object-contain" src="./assets/freebox.png" />
      <button
        v-if="userVersion === 0"
        @click="onFreeSelect"
        class="mt-[2px] checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95"
      >
        {{ translations && translations.select }}
      </button>
    </div>
    <!-- Gold -->
    <div>
      <div class="flex flex-col justify-start items-center h-full">
        <div :class="`text-black text-lg font-bold `">
          {{ translations && translations.gold }}
        </div>
        <div class="flex text-green-rgba font-extrabold mt-1">
          <div class="text-lg self-center mt-[-30px]">$</div>
          <div class="text-[50px] leading-[0.9]">
            {{ formatPrice(pricingPlan.gold_advertised_price) }}
          </div>
        </div>
        <div class="text-base font-semibold capitalize">
          {{ translations && translations.per_month }}
        </div>
        <button
          v-if="showGoldSelect && userVersion !== 2 && userVersion !== 3"
          @click="onGoldSelect"
          class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
        >
          {{ translations && translations.select }}
        </button>
      </div>
    </div>
    <!-- Platinium -->
    <div>
      <div class="flex flex-col justify-center items-center h-full">
        <div class="text-black text-lg font-bold">
          {{ translations && translations.platinum }}
        </div>
        <div class="flex text-blue-rgba font-extrabold mt-1">
          <div class="text-lg self-center mt-[-30px]">$</div>

          <div class="text-[50px] t leading-[0.9]">
            {{ formatPrice(pricingPlan.platinum_advertised_price) }}
          </div>
        </div>
        <div class="text-base font-semibold capitalize">
          {{ translations && translations.per_month }}
        </div>
        <button
          @click="onPlatinumSelect"
          class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
        >
          {{ translations && translations.select }}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
ul {
  list-style-type: disc;
  padding-left: 20px;
}
</style>
