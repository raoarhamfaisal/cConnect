<script setup>
import PrimaryButton from "@/Components/PrimaryButton.vue";

import { useForm } from "@inertiajs/inertia-vue3";

import { defineProps } from "vue";
const props = defineProps({
  profile: Object,
});
const form = useForm({
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

const options = [
  { id: "trade1", name: "Supplier & Advertiser (all trades)" },
  { id: "trade2", name: "Construction & Remodeling" },
  { id: "trade3", name: "Tile Works, Kitchen & Bathrooms" },
  { id: "trade4", name: "Concrete, Masonry & Foundations" },
  { id: "trade5", name: "Landscape" },
  { id: "trade6", name: "Earthworks, Drives & Parking Lots" },
  { id: "trade7", name: "Roofing & Solar" },
  { id: "trade8", name: "Gutters, Siding & Fencing" },
  { id: "trade9", name: "Water/Fire & Mold Remediation" },
  { id: "trade10", name: "Electrical & Low Voltage" },
  { id: "trade11", name: "Plumbing (all Facets)" },
  { id: "trade12", name: "HVAC" },
  { id: "trade13", name: "Carpentry & Finish Carpentry" },
  { id: "trade14", name: "Cabinets, Countertops & Furniture" },
  { id: "trade15", name: "Decks, Pergolas & Gazzebo" },
  { id: "trade16", name: "Flooring - All Types" },
  { id: "trade17", name: "Painting & Staining" },
  { id: "trade18", name: "Drywall Install & Repair Mud Texture" },
  { id: "trade19", name: "Garage & Garage Doors" },
  { id: "trade20", name: "Cleaning Services & Junk Haul Off" },
  { id: "trade21", name: "Glass, Mirrors, Windows & Doors" },
  { id: "trade22", name: "Metal Fab, Fireplaces" },
  { id: "trade23", name: "Handyman Services" },
  { id: "trade24", name: "Architectural, Engineering & Law" },
];
const toggleSwitch = (field) => {
  form[field] = form[field] === 1 ? 0 : 1;
  console.log(form);
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <div>
        <h2
          class="text-lg font-medium font-bold text-gray-900 dark:text-gray-100"
        >
          Trades
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your Trades Information.
        </p>
      </div>
    </header>
    <form @submit.prevent="form.patch(route('profile.updateTrades'))">
      <div class="grid mt-8 gap-3">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="flex items-center justify-between sm:w-96 ml-3 mb-5"
        >
          <label :for="option.id" class="mr-4 font-bold">{{
            option.name
          }}</label>
          <div class="switch" @click="toggleSwitch(option.id)">
            <div
              :class="[
                form[option.id] === 1 ? 'switch-bg-on' : 'switch-bg-off',
              ]"
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

      <div class="flex items-center gap-4 mt-10">
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
