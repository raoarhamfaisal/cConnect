<template>
  <CustomDialog
    ref="dialogRef"
    :showFooter="false"
    dialogWidth="width-75"
    title="Contractor Ratings"
  >
    <Loader :loading="loading" background="white" height="70vh"></Loader>
    <ContractorRating
      v-if="
        !loading &&
        contractorDetails &&
        Object.keys(contractorDetails).length > 0
      "
      :contractorDetails="contractorDetails"
      :profileId="userId"
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
const { userId, contractorId } = defineProps({
  userId: [String, Number],
  contractorId: [String, Number],
});
const store = useStore();

const dialogRef = ref();
const loading = computed(() => store.state.ratings.loading);
const contractorDetails = computed(() => store.state.ratings.contractorDetails);

const openDialog = () => {
  console.log(userId, "userId", contractorId, "contractor");
  store.dispatch("ratings/getContractorInfo", contractorId);
  return dialogRef.value.openDialog();
};
defineExpose({ openDialog });
</script>

<style>
</style>