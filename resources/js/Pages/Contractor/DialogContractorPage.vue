<template>
  <CustomContractorPageDialog
    ref="dialogRef"
    :showFooter="false"
    dialogWidth="width-75"
    :title="translations && translations.contractor_page"
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
import { computed, ref } from "vue";
import { useStore } from "vuex";

// Province
const { profile } = defineProps({
  profile: Object,
  contractor_id: [String, Number],

  region_name: String,
});
const dialogRef = ref();
const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);
// Expose
const openDialog = () => {
  dialogRef.value.openDialog();
};
defineExpose({ openDialog });
</script>
