<script setup>
import { computed, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { usePage } from "@inertiajs/inertia-vue3";

const props = defineProps({
  imageSrc: {
    type: String,
  },
  imageClass: {
    type: String,
    default: "",
  },
  showCustomerBadge: {
    type: Boolean,
    default: true,
  },
  isNotSelf: {
    type: Boolean,
    default: false,
  },
  isContractor: {
    type: Boolean,
    default: false,
  },
});
const imageFailed = ref(false);
const userProps = usePage().props.value;

const isContractorProfile = computed(() => {
  if (props.isNotSelf) {
    return props.isContractor;
  }
  const profile = userProps.auth.user.profile || userProps.profile;
  return profile && profile.is_contractor === 1;
});
const handleImageError = () => {
  imageFailed.value = true;
};
watch(
  () => props.imageSrc,
  (newVal) => {
    if (newVal) {
      imageFailed.value = false;
    }
  }
);
</script>

<template>
  <div
    :class="`relative flex justify-center items-center ${
      imageClass ? imageClass : 'w-14 h-14 sm:h-20 sm:w-20'
    } inline-block`"
  >
    <!-- Customer badge: use a user-icon instead of the letter -->
    <v-tooltip
      v-if="!isContractorProfile && showCustomerBadge"
      text="Customer"
      location="top"
      open-on-click
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <span
          v-bind="props"
          class="absolute top-0 right-0 bg-blue-500 text-white h-4 w-4 flex items-center justify-center rounded-full"
        >
          <Icon icon="mdi:account" width="10" height="10" />
        </span>
      </template>
    </v-tooltip>
    <img
      v-if="imageSrc && !imageFailed"
      :class="`object-contain w-full border-[1px] border-gray-400  h-full rounded-full`"
      :src="imageSrc"
      alt="avatar"
      @error="handleImageError"
    />
    <div
      v-else
      class="object-contain w-full h-full rounded-full flex items-center justify-center bg-gray-400"
    >
      <Icon icon="fluent-mdl2:contact" color="white" width="24" />
    </div>
  </div>
</template>

<style scoped>
.companyLogo {
  width: 7rem;
  height: 4rem;
}
</style>
