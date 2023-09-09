<template>
  <CustomDialog
    @submit="handleSubmit"
    ref="dialogRef"
    :showFooter="false"
    dialogWidth="width-75"
    title="Views Setting"
    contentClasses="bg-gray-200 pt-6"
  >
    <Loader :loading="loading" background="white" height="70vh"></Loader>
    <div
      class="border-8 p-2 border-white rounded-t-lg sm:p-8 bg-white shadow sm:rounded-lg"
    >
      <Views :profile="profile" :byApi="true" />
    </div>
  </CustomDialog>
</template>
  
  <script setup>
import Views from "@/Pages/Profile/Partials/Views.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import Loader from "@/Components/Ratings/Loader.vue";
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