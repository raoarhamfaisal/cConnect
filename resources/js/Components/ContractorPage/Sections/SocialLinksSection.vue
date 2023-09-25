<template>
  <!-- Social Links -->
  <Card
    v-if="
      profile.website_url ||
      profile.facebook ||
      profile.twitter ||
      profile.tiktok ||
      profile.instagram
    "
    :shadowLevel="2"
    bgColor="white"
    :padding="screenWidth < 640 ? '7px' : '20px'"
  >
    <div class="flex justify-between">
      <heading-card
        class="mb-2"
        :style="{
          fontWeight: 800,
          marginBottom: '8px',
          fontSize: screenWidth > 640 ? '24px' : '20px',
        }"
        :heading="`Social Links`"
      />
      <IconButton
        v-if="mode === 'edit'"
        @click="openDialog"
        icon="mdi:edit"
        color="#1864ab"
      />
    </div>
    <div
      class="flex flex-col sm:flex-row flex-wrap gap-y-3 mt-2 sm:mt-4 ml-1 mb-1 sm:mb-0 sm:ml-0"
    >
      <InfoWithIcon
        v-if="profile.website_url"
        icon="fluent-mdl2:website"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Website"
        :text="profile.website_url"
      />
      <InfoWithIcon
        v-if="profile.facebook"
        icon="logos:facebook"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Facebook"
        :text="profile.facebook"
      />
      <InfoWithIcon
        v-if="profile.twitter"
        icon="fa6-brands:square-x-twitter"
        iconColor="black"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Twitter"
        :text="profile.twitter"
      />
      <InfoWithIcon
        v-if="profile.tiktok"
        icon="logos:tiktok-icon"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="TikTok"
        :text="profile.tiktok"
      />
      <InfoWithIcon
        v-if="profile.instagram"
        icon="skill-icons:instagram"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Instagram"
        :text="profile.instagram"
      />
    </div>
  </Card>
  <CustomDialog
    v-if="mode === 'edit'"
    submitText="Save"
    @submit="handleSubmit"
    ref="dialogRef"
    title="Edit Your Social Links"
  >
    <div
      class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <InputLabel
          class="font-bold"
          for="website_url"
          value="Personal / Company Website"
        />
        <input-icon
          id="website_url"
          type="url"
          icon="fluent-mdl2:website"
          color="#241e6d"
          v-model="website_url"
          placeholder="Type your Website URL"
        />
      </div>
      <div>
        <InputLabel class="font-bold" for="facebook" value="Facebook" />
        <input-icon
          id="facebook"
          type="url"
          icon="logos:facebook"
          v-model="facebook"
          placeholder="Type your Facebook link"
        />
      </div>

      <div>
        <InputLabel class="font-bold" for="twitter" value="Twitter" />
        <input-icon
          id="twitter"
          color="black"
          type="url"
          icon="fa6-brands:square-x-twitter"
          class="mt-1 block w-full"
          v-model="twitter"
          placeholder="Type your Twitter link"
        />
      </div>

      <div>
        <InputLabel class="font-bold" for="tiktok" value="TikTok" />
        <input-icon
          id="tiktok"
          type="url"
          class="mt-1 block w-full"
          icon="logos:tiktok-icon"
          v-model="tiktok"
          placeholder="Type your TikTok link"
        />
      </div>

      <div>
        <InputLabel class="font-bold" for="instagram" value="Instagram" />
        <input-icon
          id="instagram"
          type="url"
          icon="skill-icons:instagram"
          class="mt-1 block w-full"
          v-model="instagram"
          placeholder="Type your Instagram link"
        />
      </div>
    </div>
  </CustomDialog>
</template>
<script setup>
import IconButton from "@/Components/IconButton.vue";
import InfoWithIcon from "@/Components/ContractorPage/InfoWithIcon.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";
import InputIcon from "@/Components/InputIcon.vue";

import Card from "@/Components/Card.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import { ref } from "vue";

// State
const props = defineProps({
  profile: Object,
  screenWidth: Number,
  mode: {
    type: String,
    default: "",
  },
});
const dialogRef = ref();

const website_url = ref(props.profile.website_url);
const facebook = ref(props.profile.facebook);
const twitter = ref(props.profile.twitter);
const tiktok = ref(props.profile.tiktok);
const instagram = ref(props.profile.instagram);

//Methods

const openDialog = () => {
  dialogRef.value.openDialog();
};

const handleSubmit = () => {};
</script>
