<template>
  <CustomDialog
    ref="dialogRef"
    :showFooter="false"
    dialogWidth="width-75"
    title="Views Setting"
    contentClasses="bg-gray-200 pt-6"
  >
    <Loader :loading="loading" background="white" height="70vh"></Loader>
    <div
      v-if="!loading"
      class="border-8 p-2 border-white rounded-t-lg sm:p-8 bg-white shadow sm:rounded-lg"
    >
    {{ viewsSettingsProfile }}
      <Views :profile="viewsSettingsProfile" apiChoice="3" />
      <Trades :profile="viewsSettingsProfile" apiChoice="3" class="mt-3" />
    </div>
  </CustomDialog>
</template>

<script setup>
import Trades from "@/Pages/Profile/Partials/Trades.vue";
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
const loading = computed(() => store.getters["profile/loadingViewSettingsProfile"]);
const viewsSettingsProfile = computed(() => store.getters["profile/viewsSettingsProfile"]);

//Exposed
const openDialog = () => {
  // store.dispatch("profile/getProfileInfo");
  store.dispatch("profile/getViewSettingsProfile")
  return dialogRef.value.openDialog();
};
defineExpose({ openDialog });
</script>

<style></style>
