<template>
  <CustomContractorPageDialog
    ref="dialogRef"
    :showFooter="false"
    dialogWidth="width-75"
    title="Contractor Page"
    contentClasses="bg-gray-200 "
  >
    <ContractorPage
      :profile="profile"
      :contractor_id="contractor_id"
      :region_name="region_name"
    />
  </CustomContractorPageDialog>
</template>

<script setup>
import CustomContractorPageDialog from "@/Pages/Contractor/CustomContractorPageDialog.vue";
import ContractorPage from "@/Pages/Contractor/ContractorPage.vue";
import { ref } from "vue";

// State
const { profile } = defineProps({
  profile: Object,
  contractor_id: [String, Number],

  region_name: String,
});
const dialogRef = ref();
// Expose
const openDialog = () => {
  dialogRef.value.openDialog();
};
defineExpose({ openDialog });
</script>
