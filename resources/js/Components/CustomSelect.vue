<template>
  <div class="relative grid items-center">
    <label class="text-md font-bold text-gray-600 block mb-2">
      {{ label }}
    </label>
    <div
      ref="dropdownContainer"
      class="relative w-auto border border-gray-300 rounded-md cursor-pointer p-2 pr-8"
      @click="toggleDropdown"
    >
      {{ modelValue || "Select any option" }}
      <Icon
        icon="gridicons:dropdown"
        class="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500"
      ></Icon>
      <ul
        v-if="showDropdown"
        ref="dropdownMenu"
        :class="dropdownPositionClass"
        class="absolute left-0 w-full mt-2 border border-gray-300 rounded-md bg-white shadow-lg z-10 p-0"
      >
        <li
          v-for="option in options"
          :key="option"
          :class="[
            'p-2 cursor-pointer',
            option === modelValue ? 'bg-[#364fc7] text-white' : '',
            'hover:bg-[#364fc7] hover:text-white',
          ]"
          @click.stop="selectOption(option)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },

  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const showDropdown = ref(false);
const dropdownContainer = ref(null);
const dropdownMenu = ref(null);
const dropdownPositionClass = ref("");

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const selectOption = (option) => {
  emit("update:modelValue", option);
  showDropdown.value = false; // This should close the dropdown on selecting an option.
};

const handleOutsideClick = (event) => {
  if (
    dropdownContainer.value &&
    !(
      dropdownContainer.value === event.target ||
      dropdownContainer.value.contains(event.target)
    )
  ) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleOutsideClick);
});

watchEffect(() => {
  if (showDropdown.value && dropdownContainer.value && dropdownMenu.value) {
    const containerRect = dropdownContainer.value.getBoundingClientRect();
    const dropdownHeight = dropdownMenu.value.clientHeight;

    if (
      containerRect.bottom + dropdownHeight > window.innerHeight &&
      containerRect.top > dropdownHeight
    ) {
      dropdownPositionClass.value = "dropdown-above";
    } else {
      dropdownPositionClass.value = "dropdown-below";
    }
  }
});
</script>

<style scoped>
.dropdown-below {
  position: absolute;
  left: 0;
  border-radius: 5px;
  background-color: white;
  z-index: 10;
}

.dropdown-above {
  position: absolute;
  left: 0;
  bottom: 100%;
  border-radius: 5px;
  background-color: white;
  z-index: 10;
}
</style>
