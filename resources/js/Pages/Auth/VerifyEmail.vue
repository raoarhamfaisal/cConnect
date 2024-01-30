<script setup>
import { computed, ref, reactive } from "vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";
import TextInput from "@/Components/TextInput.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import { removeToken } from "@/helpers/localStorageHelper";
import { Inertia } from "@inertiajs/inertia";
import { useStore } from "vuex";

const props = defineProps({
  status: String,
  showit: Boolean,
  user: Object,
});
const loading = ref(false);
const loadingVerifyCode = ref(false);
const verificationCodeSent = ref(false);
const form = reactive({
  verifyCode: "",
});
const errors = reactive({
  verifyCode: "",
});

const store = useStore();
const translations = computed(() => store.getters.translations);

const submit = () => {
  form.post(route("verification.send"));
};

const resendVerificationCode = async (openDialog = true) => {
  const formData = {
    email: props.user.email,
  };

  loading.value = true;
  try {
    const response = await axios.post(
      `/api/user/resend-code`,
      formData,
      getAxiosConfig()
    );
    if (response.data) {
      verificationCodeSent.value = true;
    }
  } catch (err) {
    console.log(err.response);
    somethingWentWrong(err.response.data.message);
  } finally {
    loading.value = false;
  }
};

const submitVerificationCode = async () => {
  if (form.verifyCode?.trim().length < 6) {
    errors.verifyCode =
      translations.value &&
      translations.value.the_token_must_be_of_6_characters;
    return;
  }
  const formData = {
    token: form.verifyCode,
  };

  loadingVerifyCode.value = true;
  try {
    const response = await axios.post(
      `/api/user/verify-email`,
      formData,
      getAxiosConfig()
    );
    if (response.data) {
      Inertia.visit("/profile-setup");
    }
  } catch (err) {
    errors.verifyCode = err.response.data.message;
  } finally {
    loadingVerifyCode.value = false;
  }
};
</script>

<template>
  <GuestLayout verifyEmailPage>
    <Head :title="translations && translations.email_verification" />
    <WelcomeHeader :showit="showit" :showSignUp="false" />

    <div class="mb-4 text-sm text-gray-600">
      {{ translations && translations.please_enter_the_one_time_password }}
      <a
        :href="route('signup')"
        style="color: rgb(36 30 109); font-weight: bold"
        >{{ user.email }}</a
      >,
      {{
        translations && translations.please_check_your_email_junk_spam_folders
      }}
    </div>
    <div class="mt-3">
      <InputLabel
        class="font-bold"
        for="email"
        :value="translations && translations.enter_code"
      />
      <TextInput
        id="email"
        type="text"
        class="mt-1 block w-full md:"
        maxLength="6"
        v-model="form.verifyCode"
        required
        autocomplete="email"
      />
      <InputError class="mt-2" :message="errors.verifyCode" />
    </div>

    <div
      class="mt-2 font-medium text-base text-green-600"
      v-if="verificationCodeSent"
    >
      {{ translations && translations.a_new_verification_code_has_been_sent }}
    </div>
    <PrimaryButton
      @click="submitVerificationCode"
      :disabled="loadingVerifyCode"
      :style="{
        backgroundImage:
          'linear-gradient( 111.4deg,rgba(7, 7, 9, 1) 6.5%, rgba(27, 24, 113, 1) 93.2% )',
        opacity: loadingVerifyCode ? '0.4' : '1.0',
      }"
      class="mt-3 w-full flex justify-center"
    >
      <div v-show="!loadingVerifyCode" class="flex items-center justify-center">
        {{ translations && translations.send }}
      </div>
      <div v-show="loadingVerifyCode">
        {{ translations && translations.sending }}...
      </div>
    </PrimaryButton>
    <PrimaryButton
      @click="resendVerificationCode"
      :disabled="loading"
      :style="{
        backgroundColor: '#099268',
        opacity: loading ? '0.4' : '1.0',
      }"
      class="w-full mt-2 flex justify-center"
    >
      <div v-show="!loading" class="flex items-center justify-center">
        {{ translations && translations.resend_verification_code }}
      </div>
      <div v-show="loading">
        {{ translations && translations.sending }}...
      </div></PrimaryButton
    >
    <a
      :href="route('signup')"
      class="border-2 border-blue-rgba w-full mt-2 flex justify-center items-center text-blue-rgba font-bold py-2 uppercase px-4 rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95"
    >
      {{ translations && translations.change_email }}
    </a>
  </GuestLayout>
  <WelcomeFooter :showit="showit" />
</template>
