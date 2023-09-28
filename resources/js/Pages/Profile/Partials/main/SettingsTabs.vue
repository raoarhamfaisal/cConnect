<script setup>
// import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.vue";
import Tabs from "@/Pages/Profile/components/Tabs.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";

import { reactive } from "vue";
import { useStore } from "vuex";
import { usePage } from "@inertiajs/inertia-vue3";

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
const user = usePage().props.value.auth.user;

const tabNames = ["Update Email", "Change Password", "Billing"];
const form = reactive({
  email: props.profile.email,
});
const errors = reactive({
  email: "",
});

const clearErrors = (field) => {
  console.log("Clear errors", field);
  //for phone_cell only
  if (field === "phone_cell" || field === "phone_office") {
    if (form[field].trim().length <= 13) {
      errors[field] = "";
    }
    return;
  }
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

const submitDetails = () => {
  if (validateForm()) {
    console.log("submit");
  }
};
</script>

<template>
  <header v-if="showHeader" class="bg-gray-200">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 max-lg:pt-10">
      <h2 class="font-bold text-xl text-blue-rgba leading-tight">Profile</h2>
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
                type="email"
                class="mt-1 block w-full"
                v-model="form.email"
                required
                autocomplete="email"
              />
              <InputError class="mt-2" :message="errors.email" />
            </div>

            <div
              v-if="props.mustVerifyEmail && user.email_verified_at === null"
            >
              <p class="text-sm mt-2 text-gray-800">
                Your email address is unverified.
                <Link
                  :href="route('verification.send')"
                  method="post"
                  as="button"
                  class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Click here to re-send the verification email.
                </Link>
              </p>
              <div
                v-show="props.status === 'verification-link-sent'"
                class="mt-2 font-medium text-sm text-green-600"
              >
                A new verification link has been sent to your email address.
              </div>
            </div>
            <div class="flex items-center gap-4 mt-6 w-full">
              <PrimaryButton
                @click="submitDetails"
                style="
                  background-image: linear-gradient(
                    111.4deg,
                    rgba(7, 7, 9, 1) 6.5%,
                    rgba(27, 24, 113, 1) 93.2%
                  );
                "
                class="w-full flex justify-center"
                >Save</PrimaryButton
              >
            </div>
          </div>
          <div v-if="activeTab === 1">
            <UpdatePasswordForm />
          </div>
          <div v-if="activeTab === 2">
            <div>Billing section</div>
          </div>
          <!-- ... -->
        </template>
      </Tabs>
      <!-- <div
          v-if="active === 0"
          class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
        >
          <DeleteUserForm class="max-w-xl" />
        </div> -->
    </div>
    <br />
    <br />
  </div>
</template>
