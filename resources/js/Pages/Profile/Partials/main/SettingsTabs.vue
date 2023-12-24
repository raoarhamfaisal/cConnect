<script setup>
// import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.vue";
import Tabs from "@/Pages/Profile/components/Tabs.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";

import { reactive, ref } from "vue";
import { useStore } from "vuex";
import BillingSettingsTab from "@/Pages/Profile/Partials/BillingSettingsTab.vue";
import BlockUsersList from "@/Pages/Profile/Partials/BlockUsersList.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import { Inertia } from "@inertiajs/inertia";
import { removeToken } from "@/helpers/localStorageHelper";

const props = defineProps({
  mustVerifyEmail: Boolean,
  status: String,
  profile: Object,
  regions: Array,
  showHeader: {
    default: true,
    type: Boolean,
  },
});
const store = useStore();

const tabNames = [
  "Update Email",
  "Change Password",
  "Billing",
  "Blocked Users",
];
const verifyDialogRef = ref();
const loading = ref(false);
const loadingVerifyCode = ref(false);
const form = reactive({
  email: props.profile.email,
  verifyCode: "",
});
const errors = reactive({
  email: "",
  verifyCode: "",
});

const clearErrors = (field) => {
  console.log("Clear errors", field);
  if (form[field].trim()) {
    errors[field] = "";
  }
};

const handleTabChange = (newActiveTab) => {
  store.commit("profile/setActiveTab", newActiveTab);
};
//Methods
const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email) ||
    !form.email.includes(".")
  ) {
    errors.email = "Invalid email format";
    isValid = false;
  }

  return isValid;
};

const submitDetails = async (openDialog = true) => {
  if (validateForm()) {
    const formData = {
      new_email: form.email,
    };

    loading.value = true;
    try {
      const response = await axios.post(
        `/api/settings/change-email`,
        formData,
        getAxiosConfig()
      );
      if (response.data && openDialog) {
        verifyDialogRef.value.openDialog();
      }
    } catch (err) {
      console.log(err.response);
      somethingWentWrong(err.response.data.message);
    } finally {
      loading.value = false;
    }
  }
};

const submitVerificationCode = async () => {
  const formData = {
    token: form.verifyCode,
  };

  loadingVerifyCode.value = true;
  try {
    const response = await axios.post(
      `/api/settings/verify-email`,
      formData,
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(
        "Your email addess has been successfully changed.Please login again",
        500,
        3000
      );
      setTimeout(() => {
        removeToken();

        Inertia.post("/logout");
      }, 2000);
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loadingVerifyCode.value = false;
  }
};
</script>

<template>
  <CustomDialog
    submitText="Okay"
    :showFooter="false"
    ref="verifyDialogRef"
    title="Verify Email"
  >
    <div class="mb-4 sm:mb-0">
      <div class="text-xl sm:text-2xl mb-2 font-semibold">
        Please enter the code sent to your email address to verify your email.
      </div>
      <div class="mt-3">
        <InputLabel class="font-bold" for="email" value="Enter Code" />
        <TextInput
          id="email"
          type="text"
          class="mt-1 block w-full md:"
          v-model="form.verifyCode"
          required
          autocomplete="email"
        />
      </div>
      <PrimaryButton
        @click="submitVerificationCode"
        :disabled="loadingSending"
        style="
          background-image: linear-gradient(
            111.4deg,
            rgba(7, 7, 9, 1) 6.5%,
            rgba(27, 24, 113, 1) 93.2%
          );
        "
        class="mt-3 w-full flex justify-center"
      >
        <div class="flex items-center justify-center">Send</div>
        <img
          v-show="loadingSending"
          src="/images/avatars/Spinner.gif"
          alt="spinner"
          width="30"
      /></PrimaryButton>
      <PrimaryButton
        @click="submitDetails"
        :disabled="loading"
        :style="{
          backgroundColor: '#099268',
          opacity: loading ? '0.4' : '1.0',
        }"
        class="w-full mt-1 flex justify-center"
      >
        <div v-show="!loading" class="flex items-center justify-center">
          Resend Verification Code
        </div>
        <div v-show="loading">Sending...</div></PrimaryButton
      >
    </div>
    <!-- </Card> -->
  </CustomDialog>
  <header v-if="showHeader" class="bg-gray-200">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 max-lg:pt-10">
      <h2 class="font-bold text-xl text-blue-rgba leading-tight">Settings</h2>
    </div>
  </header>
  <div class="bg-gray-200">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
      <Tabs :tabs="tabNames" @tabChanged="handleTabChange">
        <template #default="{ activeTab }">
          <div v-if="activeTab === 0">
            <div>
              <InputLabel class="font-bold" for="email" value="Email" />
              <TextInput
                id="email"
                type="tel"
                class="mt-1 block w-full"
                v-model="form.email"
                @input="clearErrors('email')"
                required
                autocomplete="email"
              />
              <InputError class="mt-2" :message="errors.email" />
            </div>

            <div class="flex items-center gap-4 mt-6 w-full">
              <PrimaryButton
                @click="submitDetails"
                :disabled="loading"
                style="
                  background-image: linear-gradient(
                    111.4deg,
                    rgba(7, 7, 9, 1) 6.5%,
                    rgba(27, 24, 113, 1) 93.2%
                  );
                "
                class="w-full flex justify-center"
              >
                <div class="flex items-center justify-center">Save</div>
                <img
                  v-show="loading"
                  src="/images/avatars/Spinner.gif"
                  alt="spinner"
                  width="30"
              /></PrimaryButton>
            </div>
          </div>
          <div v-if="activeTab === 1">
            <UpdatePasswordForm />
          </div>
          <div v-if="activeTab === 2">
            <BillingSettingsTab :user_id="profile.user_id" />
          </div>
          <div v-if="activeTab === 3">
            <BlockUsersList />
          </div>
          <!-- ... -->
        </template>
      </Tabs>
    </div>
    <br />
    <br />
  </div>
</template>
