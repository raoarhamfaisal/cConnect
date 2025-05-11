<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { usePage } from "@inertiajs/inertia-vue3";
import UserAvatar from "../components/UserAvatar.vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import axios from "axios";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  user_avatar: [String, Object],
  form: Object,
  email: String,
  mode: {
    type: String,
    default: "",
  },
  errors: Object,
});
const store = useStore();
const loadingImage = ref(false);

const user = usePage().props.value.auth.user;
const userAvatarError = ref("");
const user_avatar = ref(props.user_avatar);
const emit = defineEmits(["update:form", "clearErrors"]);

//Computed

const translations = computed(() => store.getters.translations);

watch(
  props.form,
  (newForm) => {
    emit("update:form", newForm);
  },
  { deep: true }
);
// Upload User Avatar on image change
const handleImageUpdate = (file) => {
  store.commit("profile/setLoadingImage", true);
  loadingImage.value = true;

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
      // changesSaved("Avatar uploaded successfully");
      userAvatarError.value = "";

      user_avatar.value = response.data.user_avatar; // Update the local state with the new avatar path
      loadingImage.value = false;
      store.dispatch("profile/fetchProfile", true);
    })
    .catch((error) => {
      userAvatarError.value = error.response.data.message;

      loadingImage.value = false;
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
          {{ translations && translations.general_information }}
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          {{
            mode === "profile"
              ? translations &&
                translations.update_your_accounts_general_information
              : translations &&
                translations.provide_your_accounts_general_information_to_get_started
          }}
        </p>
      </div>
    </header>

    <div
      @submit.prevent="form.patch(route('profile.updateGeneralInfo'))"
      class="flex flex-col items-center"
    >
      <v-skeleton-loader
        v-if="loadingImage"
        style="border-radius: 9999px"
        class="overflow-hidden w-36 h-36"
        type="image"
      >
      </v-skeleton-loader>
      <UserAvatar
        v-if="!loadingImage"
        :cover="true"
        :imageSrc="user_avatar"
        @update-image="handleImageUpdate"
      />
      <InputError class="mt-2" :message="userAvatarError" />

      <div
        class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
      >
        <div>
          <InputLabel class="font-bold" for="email" value="Email" />
          <input
            id="email"
            type="tel"
            class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm disabled:bg-gray-100"
            :value="email"
            :disabled="true"
            required
            autocomplete="email"
          />
        </div>
        <div></div>
        <div>
          <InputLabel
            class="font-bold"
            for="first_name"
            :value="translations && translations.first_name + '*'"
          />
          <TextInput
            id="first_name"
            type="text"
            class="mt-1 block w-full"
            required
            v-model="form.first_name"
            :placeholder="translations && translations.type_your_first_name"
            @input="clearError('first_name')"
            autocomplete="given-name"
          />
          <InputError class="mt-2" :message="errors.first_name" />
        </div>

        <div>
          <InputLabel
            class="font-bold"
            for="last_name"
            :value="translations && translations.last_name + '*'"
          />
          <TextInput
            class="mt-1 block w-full"
            id="last_name"
            type="text"
            v-model="form.last_name"
            required
            :placeholder="translations && translations.type_your_last_name"
            @input="clearError('last_name')"
            autocomplete="family-name"
          />
          <InputError class="mt-2" :message="errors.last_name" />
        </div>

        <div>
          <InputLabel
            class="font-bold"
            for="phone_cell"
            :value="translations && translations.phone_cell + '*'"
          />
          <TextInput
            class="mt-1 block w-full"
            id="phone_cell"
            type="tel"
            v-model="form.phone_cell"
            required
            @input="clearError('phone_cell')"
            autocomplete="phone_cell"
            :placeholder="translations && translations.type_your_phone_number"
            v-mask="'####-#######'"
          />
          <!-- placeholder="###-###-####" -->
          <InputError class="mt-2" :message="errors.phone_cell" />
        </div>
      </div>
    </div>
  </section>
</template>
