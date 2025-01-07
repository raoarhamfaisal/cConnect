<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { Icon } from "@iconify/vue";
import TextInput from "@/Components/TextInput.vue";
import InputIcon from "@/Components/InputIcon.vue";

import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { somethingWentWrong } from "@/helpers/utilities";
import { setToken } from "@/helpers/localStorageHelper";
import CustomSelect from "../../Components/CustomSelect.vue";

const { user, profile } = defineProps({
  showit: Boolean,
  user: Object,
  profile: Object,
});
const form = useForm({
  first_name: user?.first_name ?? "",
  last_name: user?.last_name ?? "",
  email: user?.email ?? "",
  company_name: profile?.company_name ?? "",
  password: "",
  password_confirmation: "",
  id: user?.id ?? "",
  is_contractor: user?.is_contractor ?? "",
});
const isPasswordConfirmationShown = ref(false);
const store = useStore();
const isPasswordShown = ref(false);
const selectedRole = ref("Contractor");
const errors = reactive({
  first_name: "",
  last_name: "",
  company_name: "",
  email: "",
  password: "",
  passwordValidationMessage: "",
  password_confirmation: "",
  is_contractor: "",
});

const translations = computed(() => store.getters.translations);
//Methods
const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }
  if (!selectedRole.value) {
    errors.is_contractor = "Role is required";

    // errors.is_contractor =
    //   translations.value && translations.value.role_is_required;
    isValid = false;
  }

  // Set is_contractor based on role
  form.is_contractor = selectedRole.value === "Contractor" ? 1 : 0;
  // Validate first_name
  if (!form.first_name.trim()) {
    errors.first_name =
      translations.value && translations.value.first_name_is_required;
    isValid = false;
  }
  if (!form.last_name.trim()) {
    errors.last_name =
      translations.value && translations.value.last_name_is_required;
    isValid = false;
  }

  // Validate company_name
  if (!form.company_name.trim()) {
    errors.company_name =
      translations.value && translations.value.company_name_is_required;
    isValid = false;
  }
  // Add validations for other fields similarly, for example:
  if (!form.email.trim()) {
    errors.email = translations.value && translations.value.email_is_required;
    isValid = false;
  } else if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email) ||
    !form.email.includes(".")
  ) {
    errors.email =
      translations.value && translations.value.invalid_email_format;
    isValid = false;
  }

  if (!form.password.trim()) {
    errors.password =
      translations.value && translations.value.password_is_required;
    isValid = false;
  } else {
    if (form.password.trim().length < 8) {
      errors.password =
        translations.value &&
        translations.value.password_must_be_at_least_8_characters;
      isValid = false;
    }
    if (!/[A-Z]/.test(form.password)) {
      errors.password =
        translations.value && translations.value.passwords_dont_match;
      isValid = false;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(form.password)) {
      errors.password =
        translations.value &&
        translations.value.password_must_contain_special_character;
      isValid = false;
    }
  }

  if (form.password.trim() !== form.password_confirmation.trim()) {
    errors.password_confirmation =
      translations.value && translations.value.last_name_is_required;
    isValid = false;
  }

  return isValid;
};

const clearError = (field) => {
  if (form[field].trim()) {
    errors[field] = "";
  }
};
const clearPasswordValidation = (field) => {
  errors[field] = "";
};
const submit = () => {
  if (validateForm()) {
    if (!form.id) {
      delete form.id;
    }
    form.post(route("signup"), {
      onSuccess: async () => {
        try {
          const response = await axios.post(`/tokens/create`);
          if (response.data) {
            console.log("here to store");
            localStorage.setItem("token", response.data.token);
            form.reset("password", "password_confirmation");
          }
        } catch (err) {
          console.log("here to store2");

          somethingWentWrong("wrong intoken");
        }
      },
    });
  }
};

const changeRole = (role) => {
  selectedRole.value = role; // Update selected role
};
const togglePasswordVisibility = () => {
  isPasswordShown.value = !isPasswordShown.value;
};

const togglePasswordConfirmationVisibility = () => {
  isPasswordConfirmationShown.value = !isPasswordConfirmationShown.value;
};

const validatePassword = () => {
  // Reset password validation message
  errors.passwordValidationMessage = "";

  if (form.password.trim().length < 8) {
    errors.passwordValidationMessage =
      translations.value &&
      translations.value.password_must_be_at_least_8_characters;
  } else if (!/[A-Z]/.test(form.password)) {
    errors.passwordValidationMessage =
      translations.value &&
      translations.value.password_must_contain_uppercase_letter;
  } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(form.password)) {
    errors.passwordValidationMessage =
      translations.value &&
      translations.value.password_must_contain_special_character;
  }
};
</script>

<template>
  <SignUpLayout>
    <Head :title="translations && translations.sign_up" />
    <WelcomeHeader :showit="showit" :showSignUp="false" />
    <div class="text-3xl font-bold mb-6">
      {{ translations && translations.create_your_account }}
    </div>

    <form
      @submit.prevent="submit"
      autocomplete="off"
      class="mt-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
    >
      <div class="mt-4">
        <CustomSelect
          class=""
          :options="['Contractor', 'Customer']"
          :modelValue="selectedRole"
          @update:modelValue="changeRole"
          label="What you are?"
        />
        <InputError class="mt-1" :message="errors.is_contractor" />
      </div>
      <div></div>
      <div>
        <InputLabel
          for="name"
          class="font-bold"
          :value="translations && translations.first_name + '*'"
        />
        <TextInput
          id="name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.first_name"
          required
          autofocus
          @input="clearError('first_name')"
          autocomplete="first_name"
        />
        <InputError class="mt-1" :message="errors.first_name" />
      </div>
      <div class="mt-4">
        <InputLabel
          for="last_name"
          class="font-bold"
          :value="translations && translations.last_name + '*'"
        />
        <TextInput
          id="last_name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.last_name"
          @input="clearError('last_name')"
          required
          name="lastName"
        />
        <InputError class="mt-1" :message="errors.last_name" />
      </div>
      <div class="mt-4">
        <InputLabel
          for="company_name"
          class="font-bold"
          :value="translations && translations.company_name + '*'"
        />
        <TextInput
          id="company_name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.company_name"
          @input="clearError('company_name')"
          required
          autocomplete="organization"
          name="organization"
        />
        <InputError class="mt-1" :message="errors.company_name" />
      </div>

      <div class="mt-4">
        <InputLabel for="email" class="font-bold" value="Email*" />
        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          @input="clearError('email')"
          required
          readonly
          onfocus="this.removeAttribute('readonly');"
          autocomplete="off"
        />
        <InputError class="mt-1" :message="errors.email" />
        <InputError class="mt-1" :message="form.errors.email" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" class="font-bold" value="Password*" />
        <input-icon
          :icon="isPasswordShown ? 'mdi:hide' : 'mdi:show'"
          color="#241e6d"
          :cursor="true"
          id="password"
          :type="isPasswordShown ? 'text' : 'password'"
          @iconClick="togglePasswordVisibility"
          class="mt-1 block w-full"
          readonly
          onfocus="this.removeAttribute('readonly');"
          autocomplete="off"
          v-model="form.password"
          @input="clearError('password')"
          @keyup="clearPasswordValidation('passwordValidationMessage')"
          @blur="validatePassword"
          required
        />
        <div
          class="text-red-500 text-sm mt-1"
          v-if="errors.passwordValidationMessage"
        >
          {{ errors.passwordValidationMessage }}
        </div>
        <InputError class="mt-1" :message="errors.password" />
        <div class="text-xs text-gray-500 mt-1">
          {{ translations && translations.password_requirements }}
        </div>
        <!-- <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          @input="clearError('password')"
          required
          autocomplete="new-password"
        /> -->
      </div>

      <div class="mt-4">
        <InputLabel
          for="password_confirmation"
          class="font-bold"
          :value="translations && translations.confirm_password + '*'"
        />
        <input-icon
          :icon="isPasswordConfirmationShown ? 'mdi:hide' : 'mdi:show'"
          :cursor="true"
          color="#241e6d"
          id="password_confirmation"
          :type="isPasswordConfirmationShown ? 'text' : 'password'"
          @iconClick="togglePasswordConfirmationVisibility"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          @input="clearError('password_confirmation')"
          required
          autocomplete="new-password"
        />

        <!-- <TextInput
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          @input="clearError('password_confirmation')"
          required
          autocomplete="new-password"
        /> -->
        <!-- Display Matched/Unmatched message with icon -->
        <div v-if="form.password_confirmation.length >= 1">
          <span
            v-if="form.password_confirmation === form.password"
            class="text-green-500"
          >
            <i class="mdi mdi-check-circle-outline"></i>
            {{ translations && translations.matched }}
          </span>
          <span v-else class="text-red-500">
            <i class="mdi mdi-close-circle-outline"></i>
            {{ translations && translations.unmatched }}
          </span>
        </div>
        <InputError class="mt-2" :message="errors.password_confirmation" />
      </div>
    </form>
    <div class="flex items-center justify-end mt-4">
      <Link
        :href="route('login')"
        class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ translations && translations.already_a_user }}
      </Link>

      <PrimaryButton
        class="ml-4"
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        style="
          background-image: linear-gradient(
            111.4deg,
            rgba(27, 24, 113, 1) 6.5%,
            rgba(7, 7, 9, 0.5) 97.2%
          );
        "
        @click.prevent="submit"
      >
        <div class="flex items-center justify-center">
          {{ translations && translations.signup }}
        </div>
        <img
          v-show="form.processing"
          src="/images/avatars/Spinner.gif"
          alt="spinner"
          width="30"
        />
      </PrimaryButton>
    </div>
    <div class="flex items-center justify-end">
      <InputError class="mt-1" :message="form.errors.general" />
    </div>
  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>
