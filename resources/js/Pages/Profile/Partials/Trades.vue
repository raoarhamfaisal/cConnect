<script setup>
import { Icon } from "@iconify/vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

import { useForm, usePage } from "@inertiajs/inertia-vue3";

import { ref, defineEmits, onUnmounted, onMounted, withDefaults } from "vue";
const user = usePage().props.value.auth.user;

const form = useForm({
  trades: null,
});
withDefaults(defineProps(), {
  name: "Trades",
});
const options = [
  "Supplier & Advertiser (all trades)",
  "Construction & Remodeling",
  "Tile Works, Kitchen & Bathrooms",
  "Concrete, Masonry & Foundations",
  "Landscape",
  "Earthworks, Drives & Parking Lots",
  "Roofing & Solar",
  "Gutters, Siding & Fencing",
  "Water/Fire & Mold Remediation",
  "Electrical & Low Voltage",
  "Plumbing (all Facets)",
  "HVAC",
  "Carpentry & Finish Carpentry",
  "Cabinets, Countertops & Furniture",
  "Decks, Pergolas & Gazzebo",
  "Flooring - All Types",
  "Painting & Staining",
  "Drywall Install & Repair Mud Texture",
  "Garage & Garage Doors",
  "Cleaning Services & Junk Haul Off",
  "Glass, Mirrors, Windows & Doors",
  "Metal Fab, Fireplaces",
  "Handyman Services",
  "Architectural, Engineering & Law",
  "open",
  "open",
  "open",
  "open",
  "open",
  "open",
];

const selectedItems = ref([]);
const isOpen = ref(false);

const emit = defineEmits();

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const toggleSelection = (item) => {
  if (selectedItems.value.includes(item)) {
    selectedItems.value = selectedItems.value.filter((i) => i !== item);
  } else {
    selectedItems.value.push(item);
  }
  const selectedString = selectedItems.value.join(", ");
  emit("update:modelValue", selectedString);
  form.trades = selectedString;
};
const isSelected = (item) => {
  return selectedItems.value.includes(item);
};

const closeOnOutsideClick = (event) => {
  const isClickInside = event.target.closest(".select-container");
  if (!isClickInside) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", closeOnOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener("click", closeOnOutsideClick);
});
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
    <form @submit.prevent="form.patch(route('profile.update'))">
      <div
        class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
      >
        <div class="relative select-container">
          <input
            type="text"
            readonly
            :value="selectedItems.join(', ')"
            @click="toggleDropdown"
            class="border p-2 w-full"
            placeholder="Select Trades"
          />
          <span
            class="absolute top-2.5 right-2.5 text-gray-600 cursor-pointer"
            @click="toggleDropdown"
          >
            <Icon
              v-if="!isOpen"
              icon="gridicons:dropdown"
              width="20"
              height="20"
            />
            <Icon
              v-else
              icon="gridicons:dropdown"
              :verticalFlip="true"
              width="20"
              height="20"
            />
          </span>
          <div
            v-if="isOpen"
            class="options-container absolute z-10 border p-2 w-full bg-white"
          >
            <div
              v-for="item in options"
              :key="item"
              @click="toggleSelection(item)"
              class="cursor-pointer p-1"
              :class="isSelected(item) ? 'bg-blue-200' : 'hover:bg-gray-100'"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 mt-6">
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
.options-container {
  max-height: 200px;
  overflow-y: auto;
}
</style>
