<script setup>
import Checkbox from "@/Components/Checkbox.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { useStore } from "vuex";

defineProps({
  canResetPassword: Boolean,
  status: String,

  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,
});

const store = useStore();

const form = useForm({
  email: "",
  password: "",
  remember: false,
});

const submit = () => {
  console.log("here");
  form.post(route("login"), {
    onSuccess: async () => {
      console.log("here2");
      await store.dispatch("getToken");
    },
    onFinish: () => form.reset("password"),
  });
};
</script>

<template>
  <Head title="Log in" />

  <!-- <div class="relative
                flex
                justify-center
                px-0.5
                py-2
                sm:py-6
                w-full
                sm:w-auto
                "> -->

  <!-- <div class="
                            flex
                            justify-center
                            px-2
                            py-2
                            bg-gray-100
                            
                            rounded-lg
                            "> -->

  <!-- <div class="
                                    sm:max-w-md
                                    sm:min-w-sm
                                    py-6
                                    px-10
                                    sm:px-12
                                    bg-white
                                    
                                    shadow-md
                                    overflow-hidden
                                    rounded-xl
                                    "> -->
  <!--
            Replaced with the top 2 divs
            <div class="min-h-screen
                    flex
                    sm:justify-center
                    items-center
                    pt-6
                    sm:pt-0
                    bg-gray-100
                    
                    ">
            <div class="w-full
                            sm:max-w-md
                            mt-6
                            px-6
                            py-4
                            bg-white
                            
                            shadow-md
                            overflow-hidden
                            sm:rounded-lg
                        "> -->

  <Link
    href="/"
    class="text-2xl sm:text-3xl md:text-3xl font-bold tracking-wide text-center"
  >
    <span class="text-green-500 italic font-serif">t</span>
    <span class="text-indigo-900 font-extrabold font-sans">C</span>
    <span class="text-indigo-900 font-bold font-sans">ontractor</span>
  </Link>

  <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
    {{ status }}
  </div>

  <form @submit.prevent="submit">
    <div>
      <InputLabel for="email" value="Email" />
      <TextInput
        id="email"
        type="email"
        class="mt-1 block w-full"
        v-model="form.email"
        required
        autofocus
      />
      <InputError class="mt-2" :message="form.errors.email" />
    </div>

    <div class="mt-4">
      <InputLabel for="password" value="Password" />
      <TextInput
        id="password"
        type="password"
        class="mt-1 block w-full"
        v-model="form.password"
        required
      />
      <InputError class="mt-2" :message="form.errors.password" />
    </div>

    <div class="block mt-4">
      <label class="flex items-center">
        <Checkbox name="remember" v-model:checked="form.remember" />
        <span class="ml-2 text-sm text-gray-600">Remember me</span>
      </label>
    </div>

    <div class="flex items-center justify-between mt-4">
      <div class="flex flex-col gap-1">
        <Link
          :href="route('password.request')"
          class="text-sm text-gray-600 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Forgot your password?
        </Link>
        <div class="flex items-center gap-1">
          <span class="text-sm text-gray-600">or</span>
          <Link
            :href="route('signup')"
            class="text-sm text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Join tContractor
          </Link>
        </div>
      </div>

      <PrimaryButton
        class="ml-4"
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
      >
        Log in
      </PrimaryButton>
    </div>
  </form>

  <!-- </div> -->
  <!-- </div> -->
  <!-- </div> -->
</template>
