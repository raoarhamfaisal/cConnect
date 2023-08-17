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

defineProps({
  mustVerifyEmail: Boolean,
  status: Boolean,
});

const tabNames = [
  "General Info",
  "Company Info",
  "Update Password",
  "Address Info",
  "Trades",
  "views",
];
</script>

<template>
  <Head title="Profile" />

  <AuthenticatedLayout>
    <header class="bg-slate-30-rgba">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2
          class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
        >
          Profile
        </h2>
      </div>
    </header>
    <div class="bg-slate-30-rgba">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <Tabs :tabs="tabNames">
          <template #default="{ activeTab }">
            <div v-if="activeTab === 0">
              <GeneralInfo
                :must-verify-email="mustVerifyEmail"
                :status="status"
                class="flex flex-col justify-center m-auto"
              />
            </div>
            <div v-if="activeTab === 1">
              <CompanyInfo />
            </div>
            <div v-if="activeTab === 2">
              <UpdatePasswordForm />
            </div>
            <div v-if="activeTab === 3">
              <AddressInfo />
            </div>
            <div v-if="activeTab === 4">
              <Trades />
            </div>
            <div v-if="activeTab === 5">
              <Views />
            </div>
            <!-- ... -->
          </template>
        </Tabs>

        <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <DeleteUserForm class="max-w-xl" />
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
