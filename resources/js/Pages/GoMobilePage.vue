<script setup>
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { Link } from "@inertiajs/inertia-vue3";
import { Icon } from "@iconify/vue";

import MoveToTop from "@/Components/MoveToTop.vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";

import { useStore } from "vuex";
import { computed } from "vue";

const props = defineProps({
  showit: Boolean,
});

const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
</script>

<template>
  <Head :title="translations && translations.go_mobile" />
  <div
    v-if="translations && Object.keys(translations).length > 0"
    :class="`pt-20 sm:pt-28 pb-2  flex sm:justify-center items-center bg-white   bg-gray-100 `"
  >
    <div
      class="container max-w-7xl max-sm:px-1 sm:px-6 py-2 mx-auto overflow-hidden sm:rounded-lg"
    >
      <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
      <template v-if="translations && Object.keys(translations).length > 0">
        <!-- Back Button -->
        <div class="mb-2 sm:mb-2">
          <Link href="/" class="text-blue-500 hover:underline"
            >← {{ translations && translations.back_to_main_page }}</Link
          >
        </div>
        <div
          class="xl:container bg-white md:mx-auto px-2 py-4 sm:p-6 border-gray-700 border-[1px] rounded-lg"
        >
          <!-- Mobile Device Header -->
          <section>
            <div class="flex justify-center">
              <span
                class="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-rgba border-b-2 border-black"
              >
                <span
                  class="text-green-rgba font-extrabold italic font-serif normal-case"
                  >t</span
                >
                <span
                  class="text-blue-rgba text-3xl font-extrabold font-sans uppercase"
                  >C</span
                >
                <span class="text-blue-rgba font-bold font-sans uppercase"
                  >ontractor</span
                >
                ON
                <span
                  class="text-blue-rgba text-3xl font-extrabold font-sans uppercase"
                  >M</span
                >OBILE
                <span
                  class="text-blue-rgba text-3xl font-extrabold font-sans uppercase"
                  >D</span
                >EVICE
              </span>
            </div>
            <div class="text-lg">
              {{
                translations &&
                translations.whether_in_the_office_or_on_the_go_you_can_quickly_access_and_log_in_to
              }}
              <tContractorWord></tContractorWord>
              {{
                translations &&
                translations.on_both_apple_and_android_mobile_devices_and_tablets_we_recommend_you_save
              }}
              <tContractorWord></tContractorWord>
              {{
                translations &&
                translations.to_your_home_screen_by_following_the_instructions_below_for_your_specific_device
              }}
            </div>
          </section>
          <!-- Apple Devices -->
          <section class="mt-8 lg:mt-10">
            <h2 class="text-2xl font-bold mb-4">Apple Devices</h2>
            <ol class="p-[revert] m-auto list-decimal text-lg">
              <li>
                {{ translations && translations.on_your }} Apple device,
                {{ translations && translations.open_the }}
                <strong>Safari app</strong>
                {{ translations && translations.and_navigate_to }}
                <a
                  href="https://tcontractor.com"
                  class="text-sky-700 hover:underline font-bold"
                  >https://tcontractor.com
                </a>
              </li>
              <li>
                {{ translations && translations.tap_the }}
                <strong>share </strong>
                <Icon
                  icon="ion:share-outline"
                  width="2rem"
                  height="2rem"
                  class="inline mt-[-8px]"
                ></Icon>
                {{
                  translations &&
                  translations.icon_located_at_the_center_bottom_of_iphone_or_upper_right_of_ipad
                }}
              </li>
              <li>
                {{ translations && translations.scroll_down_list_and_select }}
                '<strong>Add to Home Screen</strong>'.
              </li>
              <li>
                {{ translations && translations.tap_the }}
                <strong>Add</strong>
                {{ translations && translations.button_in_upper_right_corner }}.
              </li>
              <li>
                {{ translations && translations.open_the_new }}
                <tContractorWord></tContractorWord>
                {{ translations && translations.app_on_your_home_screen }}
              </li>
              <li>
                {{ translations && translations.sign_in_to }}
                <tContractorWord></tContractorWord>
                {{ translations && translations.to_complete_the_process }}
              </li>
            </ol>
          </section>
          <!-- Android Devices -->
          <section class="mt-8 lg:mt-10">
            <h2 class="text-2xl font-bold mb-4">Android Devices</h2>
            <ol class="p-[revert] m-auto list-decimal text-lg">
              <li>
                {{ translations && translations.on_your }} Android device,
                {{ translations && translations.open_the }}
                <strong>Chrome app</strong>
                {{ translations && translations.and_navigate_to }}
                <a
                  href="https://tcontractor.com"
                  class="text-sky-700 hover:underline font-bold"
                  >https://tcontractor.com
                </a>
              </li>
              <li>
                {{ translations && translations.tap_the }}
                <strong>More </strong>
                <Icon
                  icon="ri:more-2-fill"
                  width="1.75rem"
                  height="1.75rem"
                  class="inline mt-[-8px]"
                ></Icon>
                {{ translations && translations.icon_located_at_center_bottom }}
              </li>
              <li>
                {{ translations && translations.enter_the_name }}
                <tContractorWord></tContractorWord>
                {{ translations && translations.and_tap_the }}
                {{ translations && translations.scroll_down_list_and_select }}
                '<strong>Add to Home Screen</strong>'
                {{ translations && translations.or_select }} '<strong
                  >Install app</strong
                >'
              </li>
              <li>
                <strong>Add</strong> {{ translations && translations.button }}.
              </li>
              <li>
                {{ translations && translations.open_the_new }}
                <tContractorWord></tContractorWord>
                {{ translations && translations.app_on_your_home_screen }}
              </li>
              <li>
                {{ translations && translations.sign_in_to }}
                <tContractorWord></tContractorWord>
                {{ translations && translations.to_complete_the_process }}
              </li>
            </ol>
          </section>
        </div>
      </template>
      <div
        v-else
        class="h-[100vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
      >
        <div class="text-center text-xl">Loading...</div>
        <v-progress-linear
          color="#241e6d"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </div>
    </div>
  </div>

  <WelcomeFooter
    :showit="showit"
    v-if="translations && Object.keys(translations).length > 0"
  />
  <MoveToTop scrollableContainer="app" />
</template>
