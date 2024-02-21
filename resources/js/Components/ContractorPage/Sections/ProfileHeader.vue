<template>
  <!-- Header -->
  <Card
    :shadowLevel="2"
    bgColor="white"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <div class="flex space-x-2 justify-between">
      <div class="flex justify-center items-center space-x-2">
        <div>
          <Avatar :imageSrc="`/${profile.user_avatar}`" />
        </div>
        <div class="flex flex-col justify-center">
          <!-- <h2
                class="text-md xs:text-xl font-medium font-bold text-gray-900"
              >
                {{ profile.first_name + " " + profile.last_name }}
              </h2> -->
          <div>
            <v-tooltip
              :open-on-click="true"
              :open-on-focus="true"
              :text="fullName"
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <h2
                  class="text-md xs:text-xl font-medium font-bold text-gray-900"
                  v-bind="props"
                >
                  {{ truncatedName }}
                </h2>
              </template>
            </v-tooltip>
          </div>
          <div class="text-sm xs:text-lg" v-if="profile.company_name">
            {{ profile.company_name }}
          </div>
          <span
            class="text-xs xs:text-lg"
            v-if="profile.city || profile.state"
            >{{ profile.city + " " + profile.state }}</span
          >
        </div>
      </div>
      <!-- See Live view and edit -->
      <div
        v-if="mode === 'edit'"
        class="self-start flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
      >
        <Link class="rounded-full" :href="`/contractor/${profile.id}`">
          <button
            class="bg-white px-4 py-1 uppercase text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-2 sm:border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95"
          >
            See Live View
          </button>
        </Link>
        <IconButton
          class="self-end sm:self-center"
          @click="openDialog"
          icon="mdi:edit"
          color="#1864ab"
        />
      </div>
    </div>
  </Card>
  <CustomDialog
    v-if="mode === 'edit'"
    submitText="Save"
    @submit="handleSubmit"
    ref="dialogRef"
    title="Edit Your General Information"
  >
    <div class="flex justify-center">
      <UserAvatar
        :imageSrc="profile.user_avatar"
        @update-image="handleImageUpdate"
      />
    </div>
    <div
      class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <InputLabel class="font-bold" for="first_name" value="First Name" />
        <TextInput
          id="first_name"
          type="text"
          class="mt-1 block w-full"
          required
          v-model="first_name"
          placeholder="Type your first name"
          autocomplete="given-name"
        />
        <!-- <InputError class="mt-2" :message="form.errors.first_name" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="last_name" value="Last Name" />
        <TextInput
          id="last_name"
          type="text"
          class="mt-1 block w-full"
          v-model="last_name"
          required
          placeholder="Type your last name"
          autocomplete="family-name"
        />
        <!-- <InputError class="mt-2" :message="form.errors.last_name" /> -->
      </div>
      <div>
        <InputLabel class="font-bold" for="company_name" value="Company Name" />
        <TextInput
          id="company_name"
          type="text"
          class="mt-1 block w-full"
          placeholder="Type your Company name"
          v-model="company_name"
          required
          autocomplete="company_name"
        />
        <!-- <InputError class="mt-2" :message="form.errors.email" /> -->
      </div>

      <div>
        <InputLabel class="font-bold" for="city" value="City" />
        <TextInput
          id="city"
          type="text"
          class="mt-1 block w-full"
          v-model="city"
          placeholder="Type your city"
          autocomplete="city"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
      <div>
        <InputLabel class="font-bold" for="state" value="State" />
        <TextInput
          id="state"
          type="text"
          class="mt-1 block w-full"
          v-model="state"
          placeholder="Type your State"
          autocomplete="state"
        />
        <!-- <InputError class="mt-2" :message="form.errors.phone_cell" /> -->
      </div>
    </div>
  </CustomDialog>
</template>

<script setup>
import IconButton from "@/Components/IconButton.vue";
import UserAvatar from "@/Pages/Profile/components/UserAvatar.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import Card from "@/Components/Card.vue";

import Avatar from "@/Components/Ratings/Avatar.vue";

import { computed, ref } from "vue";
import { Link } from "@inertiajs/inertia-vue3";
// State
const props = defineProps({
  profile: Object,
  screenWidth: Number,
  mode: {
    type: String,
    default: "",
  },
});

const first_name = ref(props.profile.first_name);
const last_name = ref(props.profile.last_name);
const company_name = ref(props.profile.company_name);
const city = ref(props.profile.city);
const state = ref(props.profile.state);

const dialogRef = ref();

//Computed
const fullName = computed(
  () => props.profile.first_name + " " + props.profile.last_name
);
const truncatedName = computed(() => {
  console.log("here in teh trunctated", props.screenWidth);
  if (props.screenWidth < 600) {
    const length = props.screenWidth < 400 ? 18 : 24;
    return fullName.value.length > length
      ? fullName.value.substring(0, length) + "..."
      : fullName.value;
  } else {
    return props.profile.first_name + " " + props.profile.last_name;
  }
});

//Methods

const openDialog = () => {
  dialogRef.value.openDialog();
};

const handleSubmit = () => {};

// Upload User Avatar on image change
const handleImageUpdate = (file) => {
  // const formData = new FormData();
  // formData.append("user_avatar", file);
  // formData.append("user_id", user.id);
  // axios
  //   .post("/api/profile/user-avatar", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       "X-CSRF-TOKEN": usePage().props.value.csrf_token,
  //     },
  //   })
  //   .then((response) => {
  //     changesSaved("Avatar uploaded successfully");
  //     form.file = response.data.user_avatar; // Update the local state with the new avatar path
  //     Inertia.visit(route("profile.edit"), { only: ["profile"] });
  //   })
  //   .catch((error) => {
  //     somethingWentWrong("Error uploading avatar");
  //     // Handle the error appropriately here
  //   });
};
</script>
