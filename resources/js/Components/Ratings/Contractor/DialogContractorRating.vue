<template>
  <CustomDialog
    ref="dialogRef"
    :showFooter="false"
    dialogWidth="width-75 contractorDialog"
    :title="translations && translations.contractor_ratings"
  >
    <Loader :loading="loading" background="white" height="70vh"></Loader>
    <ContractorRating
      v-if="
        !loading &&
        contractorDetails &&
        Object.keys(contractorDetails).length > 0
      "
      :contractorDetails="contractorDetails"
      :profileId="loggedInUserId"
    />
  </CustomDialog>
</template>

<script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import ContractorRating from "@/Components/Ratings/Contractor/ContractorRating.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
// State
const { userId } = defineProps({
  userId: [String, Number],
  loggedInUserId: [String, Number],
});
const store = useStore();

const dialogRef = ref();
const loading = computed(() => store.state.ratings.loading);
const translations = computed(() => store.getters.translations);
const contractorDetails = computed(() => store.state.ratings.contractorDetails);

const openDialog = () => {
  console.log(userId, "userId");
  store.dispatch("ratings/getContractorInfo", userId);
  return dialogRef.value.openDialog();
};
defineExpose({ openDialog });
</script>

<style></style>
