<script setup>
import { somethingWentWrong } from "@/helpers/utilities";

import { options } from "@/helpers/selectListsHelpters.js";
import { reactive } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  profile: Object,
  apiChoice: {
    type: String,
    default: "1",
  },
});
// 1 => profile
// 2 => profile-setup
// 3 => model-view-settings
const store = useStore();
const form = reactive({
  trade1: props.profile.trade1,
  trade2: props.profile.trade2,
  trade3: props.profile.trade3,
  trade4: props.profile.trade4,
  trade5: props.profile.trade5,
  trade6: props.profile.trade6,
  trade7: props.profile.trade7,
  trade8: props.profile.trade8,
  trade9: props.profile.trade9,
  trade10: props.profile.trade10,
  trade11: props.profile.trade11,
  trade12: props.profile.trade12,
  trade13: props.profile.trade13,
  trade14: props.profile.trade14,
  trade15: props.profile.trade15,
  trade16: props.profile.trade16,
  trade17: props.profile.trade17,
  trade18: props.profile.trade18,
  trade19: props.profile.trade19,
  trade20: props.profile.trade20,
  trade21: props.profile.trade21,
  trade22: props.profile.trade22,
  trade23: props.profile.trade23,
  trade24: props.profile.trade24,
});

const toggleSwitch = async (field) => {
  form[field] = form[field] === 1 ? 0 : 1;
  if (props.apiChoice === "1") {
    await store.dispatch("profile/updateTrades", form);
  } else if (props.apiChoice === "2") {
    await store.dispatch("profile/updateProfileSetupTrades", form);
  } else if (props.apiChoice === "3") {
    await store.dispatch("profile/updateViewSettingsTrades", form);
  }
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <div>
        <h2
          :class="` font-medium font-bold ${
            apiChoice === '3'
              ? 'text-blue-rgba text-xl'
              : 'text-gray-900 text-lg'
          }`"
        >
          Trades
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          Update your Trades Information.
        </p>
      </div>
    </header>
    <div class="grid mt-8 gap-3">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="flex items-center justify-between sm:w-96 ml-3 mb-5"
      >
        <label :for="option.id" class="mr-4 font-bold">{{ option.name }}</label>
        <div class="switch" @click="toggleSwitch(option.id)">
          <div
            :class="[form[option.id] === 1 ? 'switch-bg-on' : 'switch-bg-off']"
          >
            <div
              :class="[
                form[option.id] === 1 ? 'switch-knob-on' : 'switch-knob-off',
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
@/helpers/selectListsHelpters.js
