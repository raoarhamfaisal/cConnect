<template>
  <!-- Social Links -->

  <Card
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
        :heading="translations && translations.social_links"
      />
      <IconButton @click="openDialog" icon="nimbus:edit" color="#1864ab" />
    </div>
    <div
      class="flex flex-col sm:flex-row flex-wrap gap-y-3 mt-2 sm:mt-4 ml-1 mb-1 sm:mb-0 sm:ml-0"
    >
      <InfoWithIcon
        v-if="website_url"
        icon="fluent-mdl2:website"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Website"
        :text="website_url"
      />
      <InfoWithIcon
        v-if="facebook"
        icon="logos:facebook"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Facebook"
        :text="facebook"
      />
      <InfoWithIcon
        v-if="twitter"
        icon="fa6-brands:square-x-twitter"
        iconColor="black"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Twitter"
        :text="twitter"
      />
      <InfoWithIcon
        v-if="tiktok"
        icon="logos:tiktok-icon"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="TikTok"
        :text="tiktok"
      />
      <InfoWithIcon
        v-if="instagram"
        icon="skill-icons:instagram"
        iconClasses="w-6 h-6"
        textClasses="text-md"
        tooltipText="Instagram"
        :text="instagram"
      />
      <div
        :class="`flex justify-center gap-2 w-full ${
          website_url || facebook || twitter || tiktok || instagram
            ? 'mt-3'
            : ''
        }`"
      >
        <Icon
          v-if="!website_url"
          icon="fluent-mdl2:website"
          :class="`w-8 h-8`"
        />
        <Icon v-if="!facebook" icon="logos:facebook" :class="`w-8 h-8`" />
        <Icon
          v-if="!twitter"
          icon="fa6-brands:square-x-twitter"
          :class="`w-8 h-8`"
        />
        <Icon v-if="!tiktok" icon="logos:tiktok-icon" :class="`w-8 h-8`" />
        <Icon
          v-if="!instagram"
          icon="skill-icons:instagram"
          :class="`w-8 h-8`"
        />
      </div>
    </div>
  </Card>
  <CustomDialog
    :submitText="translations && translations.save"
    @submit="handleSubmit"
    :loading="loading"
    :disabled="disabled"
    ref="dialogRef"
    :title="`${
      !website_url && !facebook && !twitter && !tiktok && !instagram
        ? translations && translations.add
        : translations && translations.edit
    } ${translations && translations.your} ${
      translations && translations.social_links
    } `"
  >
    <div
      class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
    >
      <div>
        <InputLabel
          class="font-bold"
          for="website_url"
          :value="translations && translations.personal_company_website"
        />
        <input-icon
          id="website_url"
          type="url"
          icon="fluent-mdl2:website"
          color="#241e6d"
          @input="clearError('website_url')"
          v-model="tempSocialProfiles.website_url"
          :placeholder="translations && translations.type_your_website_url"
        />
        <InputError class="mt-2" :message="errors.website_url" />
      </div>
      <div>
        <InputLabel class="font-bold" for="facebook" value="Facebook" />
        <input-icon
          id="facebook"
          type="url"
          icon="logos:facebook"
          @input="clearError('facebook')"
          v-model="tempSocialProfiles.facebook"
          placeholder="Type your Facebook link"
        />
        <InputError class="mt-2" :message="errors.facebook" />
      </div>

      <div>
        <InputLabel class="font-bold" for="twitter" value="Twitter" />
        <input-icon
          id="twitter"
          color="black"
          type="url"
          icon="fa6-brands:square-x-twitter"
          class="mt-1 block w-full"
          v-model="tempSocialProfiles.twitter"
          @input="clearError('twitter')"
          placeholder="Type your Twitter link"
        />
        <InputError class="mt-2" :message="errors.twitter" />
      </div>

      <div>
        <InputLabel class="font-bold" for="tiktok" value="TikTok" />
        <input-icon
          id="tiktok"
          type="url"
          class="mt-1 block w-full"
          icon="logos:tiktok-icon"
          v-model="tempSocialProfiles.tiktok"
          @input="clearError('tiktok')"
          placeholder="Type your TikTok link"
        />
        <InputError class="mt-2" :message="errors.tiktok" />
      </div>

      <div>
        <InputLabel class="font-bold" for="instagram" value="Instagram" />
        <input-icon
          id="instagram"
          type="url"
          icon="skill-icons:instagram"
          class="mt-1 block w-full"
          @input="clearError('instagram')"
          v-model="tempSocialProfiles.instagram"
          placeholder="Type your Instagram link"
        />
        <InputError class="mt-2" :message="errors.instagram" />
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
import { Icon } from "@iconify/vue";

import Card from "@/Components/Card.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";
import { computed, reactive, ref } from "vue";

import { changesSaved, somethingWentWrong } from "@/helpers/utilities";

import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { useStore } from "vuex";

const propertiesToProcess = [
  "website_url",
  "facebook",
  "twitter",
  "tiktok",
  "instagram",
];
// Province
const props = defineProps({
  profile: Object,
  screenWidth: Number,
});
const dialogRef = ref();

const website_url = ref(props.profile.website_url);
const facebook = ref(props.profile.facebook);
const twitter = ref(props.profile.twitter);
const tiktok = ref(props.profile.tiktok);
const instagram = ref(props.profile.instagram);
const loading = ref(false);
const disabled = ref(false);
const errors = reactive({
  website_url: "",
  facebook: "",
  twitter: "",
  tiktok: "",
  instagram: "",
});

const tempSocialProfiles = reactive({
  website_url: website_url.value ?? "",
  facebook: facebook.value ?? "",
  twitter: twitter.value ?? "",
  tiktok: tiktok.value ?? "",
  instagram: instagram.value ?? "",
});
const store = useStore();

const translations = computed(() => store.getters.translations);

//Methods
const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }

  // Validate website_url
  if (
    tempSocialProfiles.website_url &&
    !isValidUrl(tempSocialProfiles.website_url)
  ) {
    errors.website_url = "Invalid website URL";
    isValid = false;
  }

  // Validate facebook
  if (tempSocialProfiles.facebook && !isValidUrl(tempSocialProfiles.facebook)) {
    errors.facebook = "Invalid Facebook URL";
    isValid = false;
  }

  // Validate twitter
  if (tempSocialProfiles.twitter && !isValidUrl(tempSocialProfiles.twitter)) {
    errors.twitter = "Invalid Twitter URL";
    isValid = false;
  }

  // Validate tiktok
  if (tempSocialProfiles.tiktok && !isValidUrl(tempSocialProfiles.tiktok)) {
    errors.tiktok = "Invalid TikTok URL";
    isValid = false;
  }

  // Validate instagram
  if (
    tempSocialProfiles.instagram &&
    !isValidUrl(tempSocialProfiles.instagram)
  ) {
    errors.instagram = "Invalid Instagram URL";
    isValid = false;
  }

  return isValid;
};

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,6}|" + // validate domain name and tld
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(urlString);
};
const clearError = (field) => {
  if (tempSocialProfiles[field].trim()) {
    errors[field] = "";
  }
};

// Creating the handleSocialSubmit function
const handleSubmit = async () => {
  if (validateForm()) {
    propertiesToProcess.forEach((prop) => {
      if (
        tempSocialProfiles[prop] &&
        typeof tempSocialProfiles[prop] === "string"
      ) {
        tempSocialProfiles[prop] = tempSocialProfiles[prop].replace(
          /^https?:\/\//,
          ""
        );
      }
    });
    loading.value = true;
    disabled.value = true;

    try {
      const response = await axios.patch(
        `/api/contractor/social-links`, // Replace with your endpoint
        tempSocialProfiles,
        getAxiosConfig()
      );

      if (response.data) {
        changesSaved(
          response.data.message || "Social profiles successfully saved"
        );

        // Updating the refs with the new values
        website_url.value = tempSocialProfiles.website_url;
        facebook.value = tempSocialProfiles.facebook;
        twitter.value = tempSocialProfiles.twitter;
        tiktok.value = tempSocialProfiles.tiktok;
        instagram.value = tempSocialProfiles.instagram;

        dialogRef.value.closeDialog();
      }
    } catch (err) {
      somethingWentWrong();
    } finally {
      loading.value = false;
      disabled.value = false;
    }
  }
};
const openDialog = () => {
  dialogRef.value.openDialog();
};
</script>
