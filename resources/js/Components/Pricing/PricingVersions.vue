<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import PricingFeature from "@/Components/Pricing/PricingFeature.vue";
import FAQS from "@/Components/Pricing/FAQS.vue";
import { useStore } from "vuex";

const props = defineProps({
  showRightVersionText: {
    type: Boolean,
    default: true,
  },
  settingTab: {
    type: Boolean,
    default: false,
  },
});

const freeVersion = ref({});
const goldVersion = ref({});
const platinumVersion = ref({});
const loading = ref(false);
const store = useStore();

const userVersion = computed(() => store.getters.userVersion);
const screenWidth = computed(() => store.getters.screenWidth);

const notFreeVersion = computed(
  () => userVersion.value !== 0 && userVersion.value !== 1
);

onMounted(() => {
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
    console.log("mounted");
    if (props.settingTab) {
      const newFeed = document.querySelector("#scrollable");
      newFeed.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }
  }
});

onUnmounted(() => {
  if (screenWidth.value < 768) {
    if (props.settingTab) {
      const newFeed = document.querySelector("#scrollable");
      newFeed.removeEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
  }
});
</script>
<template>
  <div
    :class="` xl:container bg-white md:mx-auto ${
      props.settingTab ? ' mt-4' : 'mt-4 px-2 sm:p-6 py-4'
    }   shadow-md rounded-lg`"
  >
    <div
      v-if="loading"
      class="h-full h-[30vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
    >
      <div class="text-center text-xl">Loading...</div>
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
          What Version is Right for You!
        </span>
      </div>
      <!-- tableHead  for Desktop-->
      <div
        class="flex gap-2"
        v-if="
          (props.settingTab && screenWidth > 768 && screenWidth < 1024) ||
          (props.settingTab && screenWidth > 1280) ||
          (!props.settingTab && screenWidth > 768)
        "
      >
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
          >
            Select
          </button>
        </div>
        <!-- Gold -->
        <div :style="{ width: notFreeVersion ? '22.5%' : '15%' }">
          <div class="flex flex-col justify-center items-center h-full">
            <div class="text-black text-xl font-bold">Gold Pakage</div>
            <div class="flex text-green-rgba font-extrabold mt-1">
              <div class="text-2xl self-center mt-[-30px]">$</div>
              <div class="text-[70px] leading-[0.9]">29</div>
            </div>
            <div class="text-lg font-semibold">Per Month</div>
            <button
              class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
            >
              Select
            </button>
          </div>
        </div>
        <!-- Platinium -->
        <div :style="{ width: notFreeVersion ? '22.5%' : '15%' }">
          <div class="flex flex-col justify-center items-center h-full">
            <div class="text-black text-xl font-bold">Platinum Pakage</div>
            <div class="flex text-blue-rgba font-extrabold mt-1">
              <div class="text-2xl self-center mt-[-30px]">$</div>
              <div class="text-[70px] t leading-[0.9]">39</div>
            </div>
            <div class="text-lg font-semibold">Per Month</div>
            <button
              class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
            >
              Select
            </button>
          </div>
        </div>
      </div>
      <!-- tableHead  for Mobile-->
      <div
        v-else
        class="grid grid-cols-3 gap-x-1 versions-head"
        ref="headerRef"
      >
        <!-- Free -->

        <div
          v-if="userVersion === 1 || userVersion === 0"
          class="flex flex-col justify-between"
        >
          <img class="mb-3 h-full object-contain" src="./assets/freebox.png" />
          <button
            v-if="userVersion === 0"
            class="mt-[2px] checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95"
          >
            Select
          </button>
        </div>
        <!-- Gold -->
        <div>
          <div class="flex flex-col justify-center items-center h-full">
            <div
              :class="`text-black text-lg font-bold ${
                screenWidth < 458 && 'h-[56px]'
              }`"
            >
              Gold Pakage
            </div>
            <div class="flex text-green-rgba font-extrabold mt-1">
              <div class="text-lg self-center mt-[-30px]">$</div>
              <div class="text-[50px] leading-[0.9]">29</div>
            </div>
            <div class="text-base font-semibold">Per Month</div>
            <button
              class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
            >
              Select
            </button>
          </div>
        </div>
        <!-- Platinium -->
        <div>
          <div class="flex flex-col justify-center items-center h-full">
            <div class="text-black text-lg font-bold">Platinum Pakage</div>
            <div class="flex text-blue-rgba font-extrabold mt-1">
              <div class="text-lg self-center mt-[-30px]">$</div>
              <div class="text-[50px] t leading-[0.9]">39</div>
            </div>
            <div class="text-base font-semibold">Per Month</div>
            <button
              class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
            >
              Select
            </button>
          </div>
        </div>
      </div>
      <div class="features pb-4">
        <!-- News Feed -->
        <div class="w-full mb-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            News Feed:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="View All Postings & Shared Information, Conversations, Available Jobs, Looking For Select Work or Subs, Questions & Answers,Opportunities and More:"
            :freeText="1"
            :goldText="1"
            :platinumText="1"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="View All Postings by Trade or Geographical
    Location Like Local, Region, Statewide:"
            :freeText="1"
            :goldText="1"
            :platinumText="1"
          />
        </div>
        <!-- News Feed Postings-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            News Feed Postings:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Postings Per Month:"
            :freeText="freeVersion.nf_ppm"
            :goldText="goldVersion.nf_ppm"
            :platinumText="platinumVersion.nf_ppm"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Images Inside Posting:"
            :freeText="freeVersion.nf_ipp"
            :goldText="goldVersion.nf_ipp"
            :platinumText="platinumVersion.nf_ipp"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Improve Post Visibilty By Adding Title Text:"
            :freeText="freeVersion.nf_title"
            :goldText="goldVersion.nf_title"
            :platinumText="platinumVersion.nf_title"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Improve Post Visibilty By Adding Closing
Text:"
            :freeText="freeVersion.nf_bottom"
            :goldText="goldVersion.nf_bottom"
            :platinumText="platinumVersion.nf_bottom"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Make Comments on Postings:"
            :freeText="freeVersion.nf_comments"
            :goldText="goldVersion.nf_comments"
            :platinumText="platinumVersion.nf_comments"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Repost Posting:"
            :freeText="freeVersion.nf_repost"
            :goldText="goldVersion.nf_repost"
            :platinumText="platinumVersion.nf_repost"
          />
        </div>
        <!-- Sub Finder-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            Sub Finder:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Searches For Contractors & Sub-Contractors:"
            :freeText="1"
            :goldText="1"
            :platinumText="1"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="No of Contractor Searches Per Month:"
            :freeText="freeVersion.sf_search"
            :goldText="goldVersion.sf_search"
            :platinumText="platinumVersion.sf_search"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Track Contractors & Sub-Contractors:"
            :freeText="freeVersion.sf_tracking"
            :goldText="goldVersion.sf_tracking"
            :platinumText="platinumVersion.sf_tracking"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Create Personal Notes On Contractors,Full Info On Subs:"
            :freeText="freeVersion.sf_notes"
            :goldText="goldVersion.sf_notes"
            :platinumText="platinumVersion.sf_notes"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Access to Contractor Info Pages:"
            :freeText="freeVersion.sf_info"
            :goldText="goldVersion.sf_info"
            :platinumText="platinumVersion.sf_info"
          />
        </div>
        <!-- Trade Groups-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            Trade Groups:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Membership in No of Trade Groups:"
            :freeText="freeVersion.tg_members"
            :goldText="goldVersion.tg_members"
            :platinumText="platinumVersion.tg_members"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Post in Member Trade Groups:"
            :freeText="freeVersion.tg_post"
            :goldText="goldVersion.tg_post"
            :platinumText="platinumVersion.tg_post"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="View All Trade Group's Postings:"
            :freeText="freeVersion.tg_view_all"
            :goldText="goldVersion.tg_view_all"
            :platinumText="platinumVersion.tg_view_all"
          />
        </div>
        <!-- View Red Flags-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            View Red Flags:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Search Red Flags:"
            :freeText="freeVersion.rf_access"
            :goldText="goldVersion.rf_access"
            :platinumText="platinumVersion.rf_access"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Flagged Customers:"
            :freeText="freeVersion.rf_customers"
            :goldText="goldVersion.rf_customers"
            :platinumText="platinumVersion.rf_customers"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Flagged Sales Reps:"
            :freeText="freeVersion.rf_sales"
            :goldText="goldVersion.rf_sales"
            :platinumText="platinumVersion.rf_sales"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Flagged Contractors:"
            :freeText="freeVersion.rf_contractor"
            :goldText="goldVersion.rf_contractor"
            :platinumText="platinumVersion.rf_contractor"
          />
        </div>
        <!-- Real Contractor Reviews-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            Real Contractor Reviews:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Give a Review:"
            :freeText="freeVersion.re_reviews"
            :goldText="goldVersion.re_reviews"
            :platinumText="platinumVersion.re_reviews"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Provide Feedback on Review:"
            :freeText="freeVersion.re_feedback"
            :goldText="goldVersion.re_feedback"
            :platinumText="platinumVersion.re_feedback"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Appeal Review:"
            :freeText="freeVersion.re_appeal"
            :goldText="goldVersion.re_appeal"
            :platinumText="platinumVersion.re_appeal"
          />
        </div>
        <!-- Contractor Page-->
        <div class="w-full my-2">
          <span class="text-2xl font-extrabold text-blue-rgba">
            Contractor Page:
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="No of Free Page Templates:"
            :freeText="freeVersion.cp_template?.toString()"
            :goldText="goldVersion.cp_template?.toString()"
            :platinumText="platinumVersion.cp_template?.toString()"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="No of Color Schemes:"
            :freeText="freeVersion.cp_color?.toString()"
            :goldText="goldVersion.cp_color?.toString()"
            :platinumText="platinumVersion.cp_color?.toString()"
          />
          <PricingFeature
            :settingTab="props.settingTab"
            bgColor="#f4f8ff"
            featureText="Share Your Contractor Page With Others:"
            :freeText="freeVersion.cp_share"
            :goldText="goldVersion.cp_share"
            :platinumText="platinumVersion.cp_share"
          />
        </div>
      </div>
    </section>
  </div>
  <div class="faqs" ref="faqsRef">
    <FAQS />
  </div>

  <!-- for Sticky Behavoir in Mobile -->
  <div
    v-if="isSticky && screenWidth < 768"
    :style="{
      top:
        props.settingTab && screenWidth >= 640
          ? '64px'
          : props.settingTab && screenWidth < 640
          ? '56px'
          : '0',
    }"
    class="grid grid-cols-3 gap-x-1 versions-head sticky"
  >
    <!-- Free -->

    <div
      v-if="userVersion === 1 || userVersion === 0"
      class="flex flex-col justify-between"
    >
      <img class="mb-3 h-full object-contain" src="./assets/freebox.png" />
      <button
        v-if="userVersion === 0"
        class="mt-[2px] checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95"
      >
        Select
      </button>
    </div>
    <!-- Gold -->
    <div>
      <div class="flex flex-col justify-center items-center h-full">
        <div
          :class="`text-black text-lg font-bold ${
            screenWidth < 458 && 'h-[56px]'
          }`"
        >
          Gold Pakage
        </div>
        <div class="flex text-green-rgba font-extrabold mt-1">
          <div class="text-lg self-center mt-[-30px]">$</div>
          <div class="text-[50px] leading-[0.9]">29</div>
        </div>
        <div class="text-base font-semibold">Per Month</div>
        <button
          class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
        >
          Select
        </button>
      </div>
    </div>
    <!-- Platinium -->
    <div>
      <div class="flex flex-col justify-center items-center h-full">
        <div class="text-black text-lg font-bold">Platinum Pakage</div>
        <div class="flex text-blue-rgba font-extrabold mt-1">
          <div class="text-lg self-center mt-[-30px]">$</div>
          <div class="text-[50px] t leading-[0.9]">39</div>
        </div>
        <div class="text-base font-semibold">Per Month</div>
        <button
          class="checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto"
        >
          Select
        </button>
      </div>
    </div>
  </div>
</template>
