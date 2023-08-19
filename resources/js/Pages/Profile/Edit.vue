<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm.vue";
import GeneralInfo from "./Partials/GeneralInfo.vue";
import { Head } from "@inertiajs/inertia-vue3";
import Tabs from "./components/Tabs.vue";
import CompanyInfo from "./Partials/CompanyInfo.vue";
import AddressInfo from "./Partials/AddressInfo.vue";
import Trades from "./Partials/Trades.vue";
import Views from "./Partials/Views.vue";
import { ref } from "vue";

defineProps({
  mustVerifyEmail: Boolean,
  status: Boolean,
  profile: Object,
});

const tabNames = ["General Info", "Update Password", "Trades", "views"];
const active = ref(0);

const handleTabChange = (newActiveTab) => {
  active.value = newActiveTab;
};
</script>

<template>
  <Head title="Profile" />

  <AuthenticatedLayout>
    <header class="bg-slate-30-rgba">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 class="font-bold text-xl text-blue-rgba leading-tight">Profile</h2>
      </div>
    </header>
    <div class="bg-slate-30-rgba">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <Tabs :tabs="tabNames" @tabChanged="handleTabChange">
          <template #default="{ activeTab }">
            <div v-if="activeTab === 0">
              <GeneralInfo
                :must-verify-email="mustVerifyEmail"
                :status="status"
                :profile="profile"
                class="flex flex-col justify-center m-auto"
              />
            </div>
            <div v-if="activeTab === 1">
              <UpdatePasswordForm />
            </div>
            <div v-if="activeTab === 2">
              <Trades :profile="profile" />
            </div>
            <div v-if="activeTab === 3">
              <Views :profile="profile" />
            </div>
            <!-- ... -->
          </template>
        </Tabs>
        <div
          v-if="active === 0"
          class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
        >
          <CompanyInfo :profile="profile" />
        </div>
        <div
          v-if="active === 0"
          class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
        >
          <AddressInfo :profile="profile" />
        </div>
        <div
          v-if="active === 0"
          class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
        >
          <DeleteUserForm class="max-w-xl" />
        </div>
      </div>
      <br />
      <br />
    </div>
  </AuthenticatedLayout>
</template>
