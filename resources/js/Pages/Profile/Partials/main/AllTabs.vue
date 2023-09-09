<script setup>
// import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.vue";
import GeneralInfo from "@/Pages/Profile/Partials/GeneralInfo.vue";
import Tabs from "@/Pages/Profile/components/Tabs.vue";
import CompanyInfo from "@/Pages/Profile/Partials/CompanyInfo.vue";
import AddressInfo from "@/Pages/Profile/Partials/AddressInfo.vue";
import Trades from "@/Pages/Profile/Partials/Trades.vue";
import Views from "@/Pages/Profile/Partials/Views.vue";
import LinksInfo from "@/Pages/Profile/Partials/LinksInfo.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

defineProps({
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

const tabNames = ["General Info", "Update Password", "Trades", "views"];

//Computed
const active = computed(() => store.getters["profile/activeProfileTab"]);

const handleTabChange = (newActiveTab) => {
  store.commit("profile/setActiveTab", newActiveTab);
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
      <div v-if="active === 0" class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <CompanyInfo :profile="profile" />
      </div>
      <div v-if="active === 0" class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <AddressInfo :profile="profile" :regions="regions" />
      </div>
      <div v-if="active === 0" class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <LinksInfo :profile="profile" />
      </div>
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
