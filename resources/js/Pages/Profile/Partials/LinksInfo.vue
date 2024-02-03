<script setup>
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import InputIcon from "@/Components/InputIcon.vue";
import { useForm } from "@inertiajs/inertia-vue3";

const props = defineProps({
  profile: Object,
});

const form = useForm({
  website_url: props.profile.website_url,
  facebook: props.profile.facebook,
  twitter: props.profile.twitter,
  tiktok: props.profile.tiktok,
  instagram: props.profile.instagram,
});
</script>

<template>
  <section>
    <header class="flex space-x-2">
      <div>
        <h2 class="text-lg font-medium font-bold text-gray-900">
          Submit Your Links
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          Please enter the relevant links for the following platforms. This
          helps us to better understand and connect with your online presence.
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
            value="Personal / Company Website"
          />
          <input-icon
            id="website_url"
            type="url"
            icon="fluent-mdl2:website"
            color="#241e6d"
            v-model="form.website_url"
            placeholder="Type your Website URL"
          />
        </div>
        <div>
          <InputLabel class="font-bold" for="facebook" value="Facebook" />
          <input-icon
            id="facebook"
            type="url"
            icon="logos:facebook"
            v-model="form.facebook"
            placeholder="Type your Facebook link"
          />
        </div>

        <div>
          <InputLabel class="font-bold" for="twitter" value="Twitter" />
          <input-icon
            id="twitter"
            type="url"
            icon="devicon:twitter"
            class="mt-1 block w-full"
            v-model="form.twitter"
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
            v-model="form.tiktok"
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
            v-model="form.instagram"
            placeholder="Type your Instagram link"
          />
        </div>
      </div>

      <div class="flex items-center gap-4 mt-6 w-full">
        <PrimaryButton
          :disabled="form.processing"
          class="w-full flex justify-center"
          >Save</PrimaryButton
        >
        <Transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          class="transition ease-in-out"
        >
          <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">
            Saved.
          </p>
        </Transition>
      </div>
    </form>
  </section>
</template>
