<template>
  <input
    ref="autocompleteInput"
    v-model="internalModelValue"
    type="text"
    autocomplete="off"
    :placeholder="placeholder"
  />
</template>
<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "callback"]);
const autocompleteInput = ref(null);
let internalModelValue = ref(props.modelValue);

const setupAutocomplete = () => {
  const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "formatted_address"],
  };

  if (autocompleteInput.value) {
    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.value,
      options
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      internalModelValue.value = place.formatted_address;

      emit("update:modelValue", internalModelValue.value);
      emit("callback", place);
    });
  }
};

watch(
  () => props.modelValue,
  (newVal) => {
    internalModelValue.value = newVal;
  }
);

watch(internalModelValue, (newVal) => {
  if (newVal !== props.modelValue) {
    emit("update:modelValue", newVal);
  }
});

onMounted(async () => {
  try {
    setupAutocomplete();
  } catch (error) {
    console.error("Failed to load Google Maps API", error);
  }
});
</script>
