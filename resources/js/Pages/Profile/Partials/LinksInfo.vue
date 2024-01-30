<script setup>
import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import InputIcon from "@/Components/InputIcon.vue";
import { computed, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  form: Object,
  errors: Object,
});
const store = useStore();
const translations = computed(() => store.getters.translations);

//Emits
const emit = defineEmits(["update:form", "clearErrors"]);

//Watch
watch(
  props.form,
  (newForm) => {
    emit("update:form", newForm);
  },
  { deep: true }
);

//Methods
const clearError = (field) => {
  emit("clearErrors", field);
};
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <div>
        <h2 class="text-lg font-medium font-bold text-gray-900">
          {{ translations && translations.submit_your_links }}
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          {{ translations && translations.please_enter_the_relevant_links }}
        </p>
      </div>
    </header>

    <form
      @submit.prevent="form.patch(route('profile.updateLinks'))"
      class="flex flex-col items-center"
    >
      <div
        class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6"
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
            v-model="form.website_url"
            @input="clearError('website_url')"
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
            v-model="form.facebook"
            @input="clearError('facebook')"
            :placeholder="translations && translations.type_your_facebook_link"
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
            v-model="form.twitter"
            @input="clearError('twitter')"
            :placeholder="translations && translations.type_your_twitter_link"
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
            v-model="form.tiktok"
            @input="clearError('tiktok')"
            :placeholder="translations && translations.type_your_tiktok_link"
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
            v-model="form.instagram"
            @input="clearError('instagram')"
            :placeholder="translations && translations.type_your_instagram_link"
          />
          <InputError class="mt-2" :message="errors.instagram" />
        </div>
      </div>
    </form>
  </section>
</template>
