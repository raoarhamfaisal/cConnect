<template>
  <!-- :href="`/contractor/${user.user_id}`" -->
  <div
    @click="openContractorPageDiaglog"
    class="flex flex-row gap-2 justify-start items-center cursor-pointer"
  >
    <!-- Avatar -->
    <div class="cursor-pointer flex justify-start items-start flex-none w=16">
      <!-- <Link :href="route('user.show')" class="block "> -->
      <div class="block">
        <AvatarWithIcon
          icon="emojione-monotone:up-arrow"
          :style="{
            width: screenWidth >= 640 ? '4.5rem' : '3.7rem',
            height: screenWidth >= 640 ? '4.5rem' : '3.7rem',
          }"
          :imageSrc="user.user_avatar || user.company_logo"
          :iconRotate="!liked ? 2 : 0"
          :iconColorClass="liked ? 'text-[#16a34a]' : 'text-[#c40516]'"
        />
      </div>
    </div>

    <!-- User Info -->
    <div class="flex flex-col justify-center ml-1">
      <h2 class="font-bold text-lg sm:text-xl" style="line-height: 1.5rem">
        <!-- {{  user }} -->
        {{ user.first_name + " " + user.last_name }}
      </h2>
      <div class="">
        {{ user.company_name }}
      </div>
    </div>
  </div>
  <Teleport to="body">
    <DialogContractorPage
      ref="contractorPageDialogRef"
      :contractor_id="user.user_id"
      :region_name="getRegionName(user.region_id)"
      :profile="user"
    />
  </Teleport>
</template>

<script setup>
import AvatarWithIcon from "@/Components/PostFooter/AvatarWithIcon.vue";
// import DialogContractorPage from "@/Pages/Contractor/DialogContractorPage.vue";
import { defineAsyncComponent, ref, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  user: Object,
  liked: {
    default: false,
    type: Boolean,
  },
});

// Dynamically import DialogContractorPage
const DialogContractorPage = defineAsyncComponent(() =>
  import("@/Pages/Contractor/DialogContractorPage.vue")
);

const store = useStore();
const contractorPageDialogRef = ref();

const screenWidth = computed(() => store.getters.screenWidth);
const regions = computed(() => store.state.ratings.allRegions);

const openContractorPageDiaglog = () => {
  localStorage.setItem("showGoBack", "false");
  contractorPageDialogRef.value.openDialog();
};

const getRegionName = (regionId) => {
  return regions.value.find((item) => item.id === regionId).name;
};
</script>

<style></style>
