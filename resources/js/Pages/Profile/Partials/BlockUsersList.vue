<template>
  <div class="mb-4">
    <h2 class="text-2xl font-bold text-gray-900">Blocked Users</h2>
  </div>
  <div
    class="flex flex-col"
    v-if="allBlockedUsers && !loading && allBlockedUsers.length > 0"
  >
    <Link
      :href="`/contractor/${blockUser.profile.user_id}`"
      class="cursor-pointer flex justify-start items-start flex-none w=16 mt-[2px] hover:bg-[#e5e7eb] hover:rounded p-2"
      v-for="(blockUser, index) in allBlockedUsers"
      :key="index"
    >
      <div class="flex space-x-2 justify-between w-full">
        <div class="flex justify-center items-center space-x-2">
          <!-- <Link :href="route('user.show')" class="block "> -->
          <div class="block">
            <Avatar
              :style="{
                width: screenWidth >= 640 ? '3.8rem' : '3.2rem',
                height: screenWidth >= 640 ? '3.8rem' : '3.2rem',
              }"
              :imageSrc="
                blockUser.profile.user_avatar || blockUser.profile.company_logo
              "
            />
          </div>

          <div class="flex flex-col justify-center">
            <h2 class="text-lg font-medium font-bold text-gray-900">
              {{
                blockUser.profile.first_name + " " + blockUser.profile.last_name
              }}
            </h2>
            <div v-if="blockUser.profile.company_name">
              {{ blockUser.profile.company_name }}
            </div>
          </div>
        </div>
        <button
          @click.stop.prevent="onUnblockUser(blockUser, index)"
          class="bg-white px-4 py-1 uppercase text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-md border-[#1864ab] border-2 sm:border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95 h-2/3 self-center"
        >
          {{
            loadingUnblocking && loadingIndex > -1 && loadingIndex === index
              ? "Unblocking"
              : "Unblock"
          }}
        </button>
      </div>
    </Link>
  </div>

  <div
    class="h-96 flex items-center justify-center font-semibold"
    v-if="allBlockedUsers && !loading && allBlockedUsers.length === 0"
  >
    No Blocked Users Available
  </div>

  <Loader :loading="loading" background="white" height="60vh"></Loader>
</template>

<script setup>
import Loader from "@/Components/Ratings/Loader.vue";
import Avatar from "@/Components/Ratings/Avatar.vue";

import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong } from "@/helpers/utilities";
// States
// const {  } = defineProps({

// });
const store = useStore();
const loading = ref(false);
const allBlockedUsers = ref([]);
const loadingUnblocking = ref(false);
const loadingIndex = ref(-1);

//Computed

const screenWidth = computed(() => store.getters.screenWidth);
//on Mounted
onMounted(async () => {
  localStorage.setItem("prevUrl", "/settings");

  await fetchBlockedUsers();
});

//Methods

const fetchBlockedUsers = async () => {
  loading.value = true;

  try {
    const response = await axios.get(`/api/user/blocked`, getAxiosConfig());
    if (response.data) {
      allBlockedUsers.value = [...response.data.blocked_users];
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loading.value = false;
  }
};
const onUnblockUser = async (userToUnblock, index) => {
  loadingIndex.value = index;
  loadingUnblocking.value = true;

  try {
    const response = await axios.post(
      `/api/user/${userToUnblock.profile.user_id}/unblock`,
      {},
      getAxiosConfig()
    );
    if (response.data) {
      fetchBlockedUsers();
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    loadingUnblocking.value = false;
  }
};
</script>

<style scoped>
button.selected {
  background-color: #3a357c;
  color: #fff;
}
button {
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}
</style>
