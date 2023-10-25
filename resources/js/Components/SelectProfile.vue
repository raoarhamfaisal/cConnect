<template>
  <div class="relative grid items-center">
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
        :class="['dropdown-menu', dropdownPositionClass]"
        class="absolute left-0 w-full mt-2 border border-gray-300 rounded-md bg-white shadow-lg z-10"
      >
        <li
          v-for="option in options"
          ref="optionRefs"
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
import { ref, onMounted, onUnmounted, watchEffect, nextTick } from "vue";
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
});
const emit = defineEmits(["update:modelValue"]);

const showDropdown = ref(false);
const dropdownContainer = ref(null);
const dropdownMenu = ref(null);
const dropdownPositionClass = ref("");

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
const optionRefs = ref([]);

watchEffect(() => {
  optionRefs.value = optionRefs.value.slice(0, props.options.length);
});

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    nextTick(() => {
      const selectedIndex = props.options.indexOf(props.modelValue);
      const selectedEl = optionRefs.value[selectedIndex];

      if (selectedEl && dropdownMenu.value) {
        dropdownMenu.value.scrollTop = selectedEl.offsetTop;
      }
    });
  }
};
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
.dropdown-menu {
  max-height: 200px; /* Limit height to 5 items */
  overflow-y: auto; /* Enable vertical scrolling */
}
</style>
