<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { usePage } from "@inertiajs/inertia-vue3";
import UserAvatar from "../components/UserAvatar.vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";

import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { ref, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  user_avatar: [String, Object],
  form: Object,
  mode: {
    type: String,
    default: "",
  },
  errors: Object,
});
const store = useStore();

const user = usePage().props.value.auth.user;
const user_avatar = ref(props.user_avatar);
const emit = defineEmits(["update:form", "clearErrors"]);

watch(
  props.form,
  (newForm) => {
    emit("update:form", newForm);
  },
  { deep: true }
);
// Upload User Avatar on image change
const handleImageUpdate = (file) => {
  const formData = new FormData();
  formData.append("user_avatar", file);
  formData.append("user_id", user.id);

  axios
    .post("/api/profile/user-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": usePage().props.value.csrf_token,
      },
    })
    .then((response) => {
      changesSaved("Avatar uploaded successfully");
      user_avatar.value = response.data.user_avatar; // Update the local state with the new avatar path
      store.dispatch("profile/fetchProfile");
    })
    .catch((error) => {
      somethingWentWrong("Error uploading avatar");
      // Handle the error appropriately here
    });
};

const clearError = (field) => {
  emit("clearErrors", field);
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <div>
        <h2 class="text-lg font-medium font-bold text-gray-900">
          General Information
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          {{
            mode === "profile"
              ? "Update your account's General Information."
              : "Provide your account's General Information to get started"
          }}
        </p>
      </div>
    </header>

    <div
      @submit.prevent="form.patch(route('profile.updateGeneralInfo'))"
      class="flex flex-col items-center"
    >
      <UserAvatar :imageSrc="user_avatar" @update-image="handleImageUpdate" />
      <div
        class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
      >
        <div>
          <InputLabel class="font-bold" for="first_name" value="First Name*" />
          <TextInput
            id="first_name"
            type="text"
            class="mt-1 block w-full"
            required
            v-model="form.first_name"
            placeholder="Type your first name"
            @input="clearError('first_name')"
            autocomplete="given-name"
          />
          <InputError class="mt-2" :message="errors.first_name" />
        </div>

        <div>
          <InputLabel class="font-bold" for="last_name" value="Last Name*" />
          <TextInput
            id="last_name"
            type="text"
            class="mt-1 block w-full"
            v-model="form.last_name"
            required
            placeholder="Type your last name"
            @input="clearError('last_name')"
            autocomplete="family-name"
          />
          <InputError class="mt-2" :message="errors.last_name" />
        </div>

        <div>
          <InputLabel class="font-bold" for="phone_cell" value="Phone Cell*" />
          <TextInput
            id="phone_cell"
            type="tel"
            class="mt-1 block w-full"
            v-model="form.phone_cell"
            required
            placeholder="Type your phone number"
            @input="clearError('phone_cell')"
            autocomplete="phone_cell"
          />
          <InputError class="mt-2" :message="errors.phone_cell" />
        </div>
      </div>
    </div>
  </section>
</template>
