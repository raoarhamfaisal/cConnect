<script setup>
import { somethingWentWrong } from "@/helpers/utilities";

import { options } from "@/helpers/selectListsHelpters.js";
import { onMounted, reactive, ref } from "vue";
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
const selectAll = ref(false);

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
});

onMounted(() => {
  const allSelected = Object.values(form).every((value) => value === 1);
  if (allSelected) {
    selectAll.value = true;
  }
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
const selectAllTrades = async () => {
  if (selectAll.value) {
    // If selectAll is true, set all properties in form to 1
    for (let key in form) {
      form[key] = 0;
    }
  } else {
    // If selectAll is false, set all properties in form to 0
    for (let key in form) {
      form[key] = 1;
    }
  }
  if (props.apiChoice === "1") {
    await store.dispatch("profile/updateTrades", form);
  } else if (props.apiChoice === "2") {
    await store.dispatch("profile/updateProfileSetupTrades", form);
  } else if (props.apiChoice === "3") {
    await store.dispatch("profile/updateViewSettingsTrades", form);
  }
  // Toggle the value of selectAll
  selectAll.value = !selectAll.value;
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
    <div class="flex items-center gap-4 mt-6 mb-5">
      <div class="switch-trades" @click="selectAllTrades">
        <div
          :class="[selectAll ? 'switch-bg-on-trades' : 'switch-bg-off-trades']"
        >
          <div
            :class="[
              selectAll ? 'switch-knob-on-trades' : 'switch-knob-off-trades',
            ]"
          ></div>
        </div>
      </div>
      <label for="select_all" class="mr-4 text-gray-800 font-bold"
        >Select All</label
      >
    </div>
    <!-- <div class="divider"></div> -->
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
<style scoped>
.switch-trades {
  cursor: pointer;
  width: 40px;
  height: 20px;
  position: relative;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
}
.switch-bg-on-trades,
.switch-bg-off-trades {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transition: background-color 0.2s;
}
.switch-bg-on-trades {
  /* background-color: rgba(36, 30, 109, 1); */
  background-color: rgba(10, 150, 10, 1);
  width: 40px;
}
.switch-bg-off-trades {
  background-color: #ccc;
  /* background-color: rgba(150, 10, 10, 1); */
  width: 39px;
}
.switch-knob-on-trades,
.switch-knob-off-trades {
  width: 19px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 1px;
  transition: left 0.2s;
}
.switch-knob-on-trades {
  left: 21px;
}
.switch-knob-off-trades {
  left: 1px;
}

.divider {
  height: 2px;
  background-color: #e5e5e5;
  margin: 20px 0; /* Vertical spacing */
}
</style>
