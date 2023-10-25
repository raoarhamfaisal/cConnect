<template>
  <!-- Company ,contact address  -->
  <div
    :style="{
      color: selectedColorScheme[2],
    }"
    class="flex flex-col justify-center text-center mb-4"
  >
    <!-- Company Logo -->
    <div v-if="profile.user_avatar" class="flex justify-center mb-3">
      <Avatar :imageSrc="`/${profile.user_avatar}`" />
    </div>
    <h2
      class="text-xl sm:text-2xl font-medium font-extrabold"
      v-if="company_name"
    >
      {{ company_name }}
    </h2>
    <div
      class="text-lg sm:text-xl font-medium font-bold"
      v-if="address_1 || address_2"
    >
      {{ address_1 || address_2 }}
    </div>
    <span
      class="text-base sm:text-lg font-semibold"
      v-if="city || state || zipcode"
      >{{ city + ", " + state + " " + zipcode }}</span
    >
  </div>
</template>
<script setup>
import InfoWithIcon from "@/Components/ContractorPage/InfoWithIcon.vue";
import { Icon } from "@iconify/vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";
import { computed, ref } from "vue";
import { template1Default } from "@/helpers/templateDefaults";

import { useStore } from "vuex";

// State
const props = defineProps({
  profile: Object,

  screenWidth: Number,
});

const iconColor = ref("#241e6d");
const store = useStore();
const company_name = ref(props.profile.company_name);
const company_logo = ref(props.profile.company_logo);
const phone_cell = ref(props.profile.phone_cell);
const phone_office = ref(props.profile.phone_office);
const address_1 = ref(props.profile.address_1);
const address_2 = ref(props.profile.address_2);
const city = ref(props.profile.city);
const state = ref(props.profile.state);
const county = ref(props.profile.county);
const zipcode = ref(props.profile.zipcode);

//Computed
const selectedColorScheme = computed(
  () => store.state.contractor.selectedColorScheme || template1Default
);
const absoluteUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  } else {
    // Here you can decide on a default protocol. Assuming "http://" for simplicity
    return `http://${url}`;
  }
};
</script>
<style scoped>
a {
  display: flex;
  gap: 8px;
  align-items: center;
}
a:hover {
  text-decoration: underline;
}
.emailPhoneSection > div:not(:last-child) {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
