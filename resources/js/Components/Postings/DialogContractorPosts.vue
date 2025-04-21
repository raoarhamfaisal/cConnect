<template>
  <CustomDialog
    ref="dialogRef"
    :showFooter="false"
    dialogWidth="width780px"
    title="Contractor Posts"
  >
    <Loader :loading="loading" background="white" height="70vh"></Loader>
    <ContractorPosts
      v-if="!loading && posts && profile && showit"
      :contractorPosts="posts"
      :contractorId="contractorId"
      :profile="profile"
      :showit="showit"
    />
  </CustomDialog>
</template>

<script setup>
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import Loader from "@/Components/Ratings/Loader.vue";
import ContractorPosts from "@/Components/Postings/ContractorPosts.vue";
import { ref } from "vue";
import { somethingWentWrong } from "@/helpers/utilities";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
// Province
const { contractorId } = defineProps({
  contractorId: [String, Number],
});

const dialogRef = ref();
const loading = ref(false);
const posts = ref({});
const profile = ref({});
const showit = ref(false);

const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `/api/contractor/post/${contractorId}`,
      getAxiosConfig()
    );
    if (response.data) {
      const data = response.data;
      posts.value = data.posts;
      profile.value = data.profile;
      showit.value = data.showit;
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
  }
};
const openPostDialog = () => {
  fetchPosts();
  dialogRef.value.openDialog();
};
defineExpose({ openPostDialog });
</script>

<style></style>
