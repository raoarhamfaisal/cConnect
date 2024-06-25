<script setup>
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

const form = reactive({
  view_locale: props.profile.view_locale,
  view_regional: props.profile.view_regional,
  view_statewide: props.profile.view_statewide,
  view_nationwide: props.profile.view_nationwide,
  view_following: props.profile.view_following,
});
const store = useStore();
const switchFields = [
  "view_locale",
  "view_regional",
  "view_statewide",
  "view_nationwide",
  "view_following",
];
const labels = [
  "View Locale",
  "View Regional",
  "View Statewide",
  "View Nationwide",
  "View Following",
];

const toggleSwitch = (field) => {
  form[field] = form[field] === 1 ? 0 : 1;
  if (props.apiChoice === "1") {
    store.dispatch("profile/updateViews", form);
  } else if (props.apiChoice === "2") {
    store.dispatch("profile/updateProfileSetupViews", form);
  } else if (props.apiChoice === "3") {
    store.dispatch("profile/updateViewSettingsViews", form);
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
          Views
        </h2>
        <p class="mt-1 text-sm text-gray-600">Update your Views Information.</p>
      </div>
    </header>
    <div class="grid mt-8 gap-3">
      <div
        v-for="(field, index) in switchFields"
        :key="field"
        class="flex items-center justify-between sm:w-96 ml-3 mb-5"
      >
        <label :for="field" class="mr-4 font-bold">{{ labels[index] }}</label>
        <div class="switch" @click="toggleSwitch(field)">
          <div :class="[form[field] === 1 ? 'switch-bg-on' : 'switch-bg-off']">
            <div
              :class="[
                form[field] === 1 ? 'switch-knob-on' : 'switch-knob-off',
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.switch {
  cursor: pointer;
  width: 60px;
  height: 30px;
  position: relative;
}
.switch-bg-on,
.switch-bg-off {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: background-color 0.2s;
}
.switch-bg-on {
  background-color: rgba(36, 30, 109, 1);
}
.switch-bg-off {
  background-color: #ccc;
}
.switch-knob-on,
.switch-knob-off {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 1px;
  transition: left 0.2s;
}
.switch-knob-on {
  left: 31px;
}
.switch-knob-off {
  left: 1px;
}
</style>
