<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";

import { Head } from "@inertiajs/inertia-vue3";
import { Link } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";

import { computed, nextTick, reactive, ref } from "vue";
import SelectProfile from "@/Components/SelectProfile.vue";

import { contactUsDepartments } from "@/helpers/selectListsHelpters.js";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";

const props = defineProps({
  showit: Boolean,
});
const store = useStore();
const loadingSend = ref(false);
const textRef = ref(null);

const form = reactive({
  email: "",
  name: "",
  phone: "",
  department: "",
  message: "",
});
const errors = reactive({
  email: "",
  name: "",
  phone: "",
  department: "",
  message: "",
});

const translations = computed(() => store.getters.translations);
const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }

  // Validate Name
  if (!form.name.trim()) {
    errors.name = `${translations.value && translations.value.name} ${
      translations.value && translations.value.is_required
    }
    `;
    isValid = false;
  }
  if (!form.department.trim()) {
    errors.department = `${
      translations.value && translations.value.department
    } ${translations.value && translations.value.is_required}`;
    isValid = false;
  }
  // Validate Name
  if (!form.message.trim()) {
    errors.message = `${translations.value && translations.value.message}  ${
      translations.value && translations.value.is_required
    }`;
    isValid = false;
  }

  // Email Validation
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
  if (!form.phone?.trim()) {
    errors.phone =
      translations.value && translations.value.phone_number_is_required;
    isValid = false;
  }
  if (form.phone?.trim().length > 13) {
    errors.phone =
      translations.value &&
      translations.value.phone_number_must_not_be_greater_than_13_numbers;
    isValid = false;
  }

  return isValid;
};

const adjustHeight = () => {
  console.log("here");
  nextTick(() => {
    textRef.value.style.height = "auto"; // Reset height first to get the correct scrollHeight
    textRef.value.style.height = textRef.value.scrollHeight + "px";
  });
};

const insertTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Set the value to: text before caret + four spaces + text after caret
    form.message =
      form.message.substring(0, start) + "      " + form.message.substring(end);

    // Put caret at right position again
    nextTick(() => {
      event.target.selectionStart = event.target.selectionEnd = start + 6;
    });
  }
};
const clearError = (field) => {
  if (form[field].trim()) {
    errors[field] = "";
  }
};

const onSendContactUsInformation = async () => {
  console.log("form", form);
  loadingSend.value = true;
  if (validateForm()) {
    try {
      const response = await axios.post(`/api/contact`, form, getAxiosConfig());
      if (response.data) {
        changesSaved(translations.value && translations.value.sent_succssfully);
        form.value = {
          email: "",
          name: "",
          phone: "",
          departmentId: 0,
          message: "",
        };
      }
    } catch (err) {
      console.log(err);

      somethingWentWrong();
    } finally {
      loadingSend.value = false;
    }
  }
};
</script>

<template>
  <SignUpLayout>
    <Head :title="translations && translations.about_us" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />
    <div
      v-if="translations && Object.keys(translations).length > 0"
      class="container mx-auto p-1 sx:p-2 sm:p-4"
    >
      <!-- Back Button -->
      <div class="mb-3 sm:mb-6">
        <Link href="/" class="text-blue-500 hover:underline"
          >← {{ translations && translations.back_to_main_page }}</Link
        >
      </div>

      <!-- About Us Section -->
      <section id="aboutUs" class="mb-8">
        <h2 class="text-2xl font-bold mb-4">
          {{ translations && translations.about_us }}
        </h2>
        <p class="text-lg mb-4">
          {{ translations && translations.building_community }}
        </p>
        <p class="text-lg mb-4">
          {{ translations && translations.mission_empower_contractors }}
        </p>
        <p class="text-lg">
          {{ translations && translations.power_of_community }}
        </p>
      </section>

      <!-- Contact Us Section -->
      <section id="contactUs" class="mb-8">
        <h2 class="text-2xl font-bold mb-4">
          {{ translations && translations.contact_us }}
        </h2>
        <p class="text-lg mb-4">
          {{ translations && translations.always_here_to_help }}
        </p>
        <div
          class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
        >
          <div>
            <InputLabel
              class="font-bold"
              for="name"
              :value="
                translations &&
                translations.your + translations &&
                translations.name + '*'
              "
            />
            <TextInput
              class="mt-1 block w-full"
              id="name"
              type="text"
              v-model="form.name"
              required
              :placeholder="`${translations && translations.type_your} ${
                translations && translations.name
              }`"
              @input="clearError('name')"
              autocomplete="name"
            />
            <InputError class="mt-2" :message="errors.name" />
          </div>

          <div>
            <InputLabel class="font-bold" for="email" value="Email*" />
            <TextInput
              id="email"
              type="tel"
              class="mt-1 block w-full"
              v-model="form.email"
              @input="clearError('email')"
              :placeholder="translations && translations.type_your + ' Email'"
              required
              autocomplete="email"
            />
            <InputError class="mt-2" :message="errors.email" />
          </div>

          <div>
            <InputLabel
              class="font-bold"
              for="phone"
              :value="translations && translations.phone_cell + '*'"
            />
            <TextInput
              class="mt-1 block w-full"
              id="phone"
              type="tel"
              v-model="form.phone"
              required
              @input="clearError('phone')"
              autocomplete="phone"
              :placeholder="translations && translations.type_your_phone_number"
              v-mask="'###-###-#####'"
            />
            <!-- placeholder="###-###-####" -->
            <InputError class="mt-2" :message="errors.phone" />
          </div>
          <div>
            <InputLabel
              class="font-bold mb-1"
              for="department"
              :value="`${translations && translations.department}*`"
            />

            <!-- <SelectInput
              :options="contactUsDepartments"
              optionsPropForText="name"
              :modelValue="form.departmentId"
              @update:modelValue="
                (option) => {
                  form.departmentId = option;
                  clearError('department');
                }
              "
            /> -->
            <SelectProfile
              :options="contactUsDepartments"
              :modelValue="form.department"
              @update:modelValue="
                (option) => {
                  form.department = option;
                  clearError('department');
                }
              "
            />
            <InputError class="mt-2" :message="errors.department" />
          </div>
        </div>
        <div>
          <InputLabel
            class="font-bold mt-4 mb-1"
            for="message"
            :value="`${translations && translations.your}  ${
              translations && translations.message
            }*`"
          />

          <textarea
            id="rating_text"
            type="text"
            :rows="5"
            class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden"
            required
            v-model="form.message"
            ref="textRef"
            @keypress="clearError('message')"
            @keydown="insertTab"
            @input="adjustHeight"
            @paste="adjustHeight"
            :placeholder="`${translations && translations.type_your} ${
              translations && translations.message
            }`"
          />
          <InputError class="mt-2" :message="errors.message" />
        </div>
        <PrimaryButton
          @click="onSendContactUsInformation"
          :disabled="loadingSend"
          :style="{
            backgroundImage:
              'linear-gradient( 111.4deg,rgba(7, 7, 9, 1) 6.5%, rgba(27, 24, 113, 1) 93.2% )',
            opacity: loadingSend ? '0.4' : '1.0',
          }"
          class="mt-3 w-full flex justify-center"
        >
          <div v-show="!loadingSend" class="flex items-center justify-center">
            {{ translations && translations.send }}
          </div>
          <div v-show="loadingSend">
            {{ translations && translations.sending }}...
          </div>
        </PrimaryButton>
        <!-- <p class="text-lg">
          {{ translations && translations.reach_out_to_us }}
          <a href="mailto:cConnect@gmail.com" class="text-blue-500"
            >cConnect@gmail.com</a
          >, {{ translations && translations.get_back_to_you }}
        </p> -->
      </section>
    </div>
    <div
      v-else
      class="h-[100vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4"
    >
      <div class="text-center text-xl">Loading...</div>
      <v-progress-linear
        color="#241e6d"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </div>
  </SignUpLayout>
  <WelcomeFooter
    v-if="translations && Object.keys(translations).length > 0"
    :showit="showit"
  />
</template>
