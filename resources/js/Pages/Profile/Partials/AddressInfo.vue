<script setup>
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/inertia-vue3";

const props = defineProps({
  profile: Object,
});
const form = useForm({
  address_1: props.profile.address_1,
  address_2: props.profile.address_2,
  city: props.profile.city,
  state: props.profile.state,
  zipcode: props.profile.zipcode,
  county: props.profile.county,
  counrty: props.profile.counrty,
});
console.log("profile: " + props.profile.address_1, form.address_1);
const inputFields = [
  {
    id: "address_1",
    model: "address_1",
    label: "Address 1",
    placeholder: "Type your address 1",
  },
  {
    id: "address_2",
    model: "address_2",
    label: "Address 2",
    placeholder: "Type your address 2",
  },
  { id: "city", model: "city", label: "City", placeholder: "Type your city" },
  {
    id: "state",
    model: "state",
    label: "State",
    placeholder: "Type your state",
  },
  {
    id: "zipcode",
    model: "zipcode",
    label: "Zip Code",
    placeholder: "Type your zip code",
  },
  {
    id: "county",
    model: "county",
    label: "County",
    placeholder: "Type your county",
  },
  {
    id: "country",
    model: "counrty",
    label: "Country",
    placeholder: "Type your country",
  },
];
</script>

<template>
  <section>
    <header>
      <h2
        class="text-lg font-medium font-bold text-gray-900 dark:text-gray-100"
      >
        Address Information
      </h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Update your Address Information
      </p>
    </header>

    <form @submit.prevent="form.patch(route('profile.updateAddressInfo'))">
      <div>
        <div
          class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
        >
          <div
            v-for="(field, index) in inputFields"
            :key="index"
            class="mb-4 sm:mb-0"
          >
            <InputLabel
              class="font-bold"
              :for="field.id"
              :value="field.label"
            />
            <TextInput
              :id="field.id"
              type="text"
              class="mt-1 block w-full"
              v-model="form[field.model]"
              :placeholder="field.placeholder"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center mt-6 gap-4">
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
