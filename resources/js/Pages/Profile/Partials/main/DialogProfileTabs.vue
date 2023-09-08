<template>
  <CustomDialog
    @submit="handleSubmit"
    ref="dialogRef"
    :showFooter="false"
    dialogWidth="width-75"
    title="Profile"
    contentClasses="bg-gray-200 pt-6"
  >
    <Loader :loading="loading" background="white" height="70vh"></Loader>
    <AllTabs
      v-if="!loading"
      :status="status"
      :showHeader="false"
      :mustVerifyEmail="mustVerifyEmail"
      :profile="profile"
    />
  </CustomDialog>
</template>
  
  <script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import AllTabs from "@/Pages/Profile/Partials/main/AllTabs.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
// State
defineProps({
  profile: Object,
});
const store = useStore();

const dialogRef = ref();
const loading = computed(() => store.getters["profile/loading"]);
const status = computed(() => store.getters["profile/status"]);
const mustVerifyEmail = computed(
  () => store.getters["profile/mustVerifyEmail"]
);

const openDialog = () => {
  store.dispatch("profile/getProfileInfo");
  return dialogRef.value.openDialog();
};
defineExpose({ openDialog });
</script>
  
  <style>
</style>