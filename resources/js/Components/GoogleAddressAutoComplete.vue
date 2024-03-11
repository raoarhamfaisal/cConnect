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
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  apiKey: {
    type: String,
    required: true,
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

const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
    } else {
      if (!scriptLoaded) {
        scriptLoaded = true;
        const googleMapsScript = document.createElement("script");
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=places&callback=initMap`;

        window.initMap = () => {
          resolve();
        };

        googleMapsScript.onerror = (error) => {
          reject(error);
        };

        document.head.appendChild(googleMapsScript);
      }
    }
  });
};

const setupAutocomplete = () => {
  const options = {
    //   bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components", "formatted_address"],
    //   strictBounds: false,
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
    await loadGoogleMapsScript();
    await nextTick();
    setupAutocomplete();
  } catch (error) {
    console.error("Failed to load Google Maps API", error);
  }
});

onBeforeUnmount(() => {
  delete window.initMap;
});
</script>
