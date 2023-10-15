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
let scriptLoaded = false;
let internalModelValue = ref(props.modelValue);

const setupAutocomplete = () => {
  const options = {
    //   bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components"],
    //   strictBounds: false,
  };
  if (autocompleteInput.value) {
    console.log("google");
    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.value,
      options
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      for (const component of place.address_components) {
        const componentType = component.types[0];

        if (componentType == "street_number") {
          internalModelValue.value = component.long_name + " ";
        }
        if (componentType == "route") {
          internalModelValue.value += component.long_name;
        }
      }

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
