<script setup>
import { somethingWentWrong } from "@/helpers/utilities";
import { useForm } from "@inertiajs/inertia-vue3";
const props = defineProps({
  profile: Object,
  byApi: {
    type: Boolean,
    default: false,
  },
});

const form = useForm({
  view_locale: props.profile.view_locale,
  view_territorial: props.profile.view_territorial,
  view_regional: props.profile.view_regional,
  view_statewide: props.profile.view_statewide,
  view_nationwide: props.profile.view_nationwide,
  view_following: props.profile.view_following,
  view_groups: props.profile.view_groups,
});

const switchFields = [
  "view_locale",
  "view_territorial",
  "view_regional",
  "view_statewide",
  "view_nationwide",
  "view_following",
  "view_groups",
];
const labels = [
  "View Locale",
  "View Territorial",
  "View Regional",
  "View Statewide",
  "View Nationwide",
  "View Following",
  "View Groups",
];

const toggleSwitch = (field) => {
  form[field] = form[field] === 1 ? 0 : 1;
  if (props.byApi) {
    form.patch(route("profile.updateViewsApi"), {
      preserveScroll: true,
      // onSuccess: () => form.reset("password"),
      onError: () => {
        somethingWentWrong();
      },
    });
  } else {
    form.patch(route("profile.updateViews"), {
      preserveScroll: true,
      // onSuccess: () => form.reset("password"),
      onError: () => {
        somethingWentWrong();
      },
    });
  }
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <div>
        <h2 class="text-lg font-medium font-bold text-gray-900">Views</h2>
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
