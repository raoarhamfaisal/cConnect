<script setup>
// import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import GeneralInfo from "@/Pages/Profile/Partials/GeneralInfo.vue";
import CompanyInfo from "@/Pages/Profile/Partials/CompanyInfo.vue";
import AddressInfo from "@/Pages/Profile/Partials/AddressInfo.vue";
import Trades from "@/Pages/Profile/Partials/Trades.vue";
import Views from "@/Pages/Profile/Partials/Views.vue";
import LinksInfo from "@/Pages/Profile/Partials/LinksInfo.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

defineProps({
  mustVerifyEmail: Boolean,
  status: String,
  profile: Object,
  regions: Array,
  showHeader: {
    default: true,
    type: Boolean,
  },
});
const store = useStore();
const e1 = ref(1);
const steps = ref(4);
const stepTitles = ["General Info", "Trades", "Views", "Billing"];

const disable = computed(() => {
  return e1.value === 1
    ? "prev"
    : e1.value === steps.value
    ? "next"
    : undefined;
});
const screenWidth = computed(() => store.getters.screenWidth);
</script>

<template>
  <v-stepper alt-labels v-model="e1">
    <template v-slot:default="{ prev, next }">
      <v-stepper-header class="flex-col">
        <header v-if="showHeader" class="w-full">
          <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 max-lg:pt-10">
            <h2 class="font-bold text-2xl text-blue-rgba leading-tight">
              Profile Setup
            </h2>
            <p class="mt-0.5 text-sm text-gray-600">
              Set up your Profile to get started
            </p>
          </div>
        </header>
        <div
          class="flex justify-between items-center relative overflow-x-auto z-10 self-start w-full"
        >
          <template v-for="(n, index) in steps" :key="`${n}-step`">
            <v-stepper-item
              :complete="e1 > n"
              class="step"
              :step="`Step {{ n }}`"
              :value="n"
              :style="{
                color: e1 > n - 1 ? '#2b8a3e' : 'inherit',
                opacity: 1,
                padding: screenWidth > 700 ? '1.5rem' : '1.5rem 0rem',
              }"
              :editable="e1 > n ? true : false"
              >{{ stepTitles[index] }}</v-stepper-item
            >
            <v-divider
              v-if="n !== steps"
              :style="{
                opacity: 1,
                border: e1 > n ? '4px solid #2b8a3e' : '4px solid grey',
                margin:
                  screenWidth > 700
                    ? '35px -55px 0'
                    : screenWidth > 450
                    ? '35px -40px 0px'
                    : '35px -20px 0',
              }"
              :thickness="4"
              :key="n"
            ></v-divider>
          </template>
        </div>
      </v-stepper-header>

      <v-stepper-window>
        <div class="sm:p-[1rem] bg-white shadow sm:rounded-lg">
          <v-stepper-window-item :value="1">
            <GeneralInfo
              :must-verify-email="mustVerifyEmail"
              :status="status"
              :profile="profile"
              class="flex flex-col justify-center m-auto"
            />
            <CompanyInfo :profile="profile" class="mt-10" />

            <AddressInfo :profile="profile" class="mt-10" :regions="regions" />

            <LinksInfo :profile="profile" class="mt-10" />
          </v-stepper-window-item>
          <v-stepper-window-item :value="2">
            <Trades :profile="profile" />
          </v-stepper-window-item>
          <v-stepper-window-item :value="3">
            <Views :profile="profile" />
          </v-stepper-window-item>
          <v-stepper-window-item :value="4"> </v-stepper-window-item>
        </div>
      </v-stepper-window>

      <v-stepper-actions
        :disable="disable"
        @click:prev="prev"
        @click:next="next"
      ></v-stepper-actions>
    </template>
  </v-stepper>
</template>
<style>
.v-stepper-item--selected.step .v-stepper-item__avatar.v-avatar,
.v-stepper-item--complete .v-stepper-item__avatar.v-avatar {
  background: #2b8a3e;
}
@media (max-width: 700px) {
  .v-stepper--alt-labels .v-stepper-item {
    flex-basis: 130px;
  }
}
@media (max-width: 450px) {
  .v-stepper--alt-labels .v-stepper-item {
    flex-basis: 77px;
  }
}
</style>
