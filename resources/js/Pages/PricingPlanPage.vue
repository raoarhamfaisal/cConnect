<script setup>
import Header from "@/Layouts/Header.vue";
import { Head } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";


import PaymentStep from "@/Pages/Profile/Partials/main/PaymentStep.vue";
import { onMounted } from "vue";


const props = defineProps({
  profile: Object,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});
onMounted(()=>{
  localStorage.setItem("prevUrl", "/pricing-plan");
})

</script>

<template>
  <Head title="Pricing Plan" />

  <Header
    :profile="profile"
    :show-post-buttons="false"
    :post-search-filters="postSearchFilters"
    :showit="showit"
    color="#f9fafb"
  >
  <div class="mt-10 ml-2 sm:mt-0 p-2 sm:p-3 md:p-0">
  <PaymentStep :region_id="profile.region_id" />
</div>
  </Header>
</template>

<style scoped>

</style>
