<script setup>
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { useForm, usePage } from "@inertiajs/inertia-vue3";
import { ref } from "vue";

const user = usePage().props.value.auth.user;

const form = useForm({
  view_locale: null,
  view_territorial: null,
  view_regional: null,
  view_statewide: null,
  view_nationwide: null,
  view_following: null,
  view_groups: null,
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
  form[field] = !form[field];
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <div>
        <h2
          class="text-lg font-medium font-bold text-gray-900 dark:text-gray-100"
        >
          Views
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your Views Information.
        </p>
      </div>
    </header>

    <form @submit.prevent="form.patch(route('profile.update'))" class="mt-6">
      <div class="flex flex-col sm:flex-row sm:flex-wrap sm:-mx-2">
        <div
          v-for="(field, index) in switchFields"
          :key="field"
          class="flex items-center ml-3 mb-5"
        >
          <label :for="field" class="mr-4 w-36 font-bold">{{
            labels[index]
          }}</label>
          <div class="switch" @click="toggleSwitch(field)">
            <div :class="[form[field] ? 'switch-bg-on' : 'switch-bg-off']">
              <div
                :class="[form[field] ? 'switch-knob-on' : 'switch-knob-off']"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <PrimaryButton
          :disabled="form.processing"
          class="w-full flex justify-center"
          >Save</PrimaryButton
        >
        <Transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          class="transition ease-in-out"
        >
          <p
            v-if="form.recentlySuccessful"
            class="text-sm text-gray-600 dark:text-gray-400"
          >
            Saved.
          </p>
        </Transition>
      </div>
    </form>
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
