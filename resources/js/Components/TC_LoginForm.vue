<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';

defineProps({
    canResetPassword: Boolean,
    status: String,

    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,

});

const form = useForm({
    email: '',
    password: '',
    remember: false
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
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
                            dark:bg-gray-900
                            rounded-lg
                            "> -->


        <!-- <div class="
                                    sm:max-w-md
                                    sm:min-w-sm
                                    py-6
                                    px-10
                                    sm:px-12
                                    bg-white
                                    dark:bg-gray-800
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
                    dark:bg-gray-900
                    ">
            <div class="w-full
                            sm:max-w-md
                            mt-6
                            px-6
                            py-4
                            bg-white
                            dark:bg-gray-800
                            shadow-md
                            overflow-hidden
                            sm:rounded-lg
                        "> -->

                <Link href="/" class="text-2xl
                                      sm:text-3xl
                                      md:text-3xl
                                      font-bold
                                      tracking-wide
                                      text-center

                                    ">
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
                        <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus
                            autocomplete="username" />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="password" value="Password" />
                        <TextInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required
                            autocomplete="current-password" />
                        <InputError class="mt-2" :message="form.errors.password" />
                    </div>

                    <div class="block mt-4">
                        <label class="flex items-center">
                            <Checkbox name="remember" v-model:checked="form.remember" />
                            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                        </label>
                    </div>

                    <div class="flex items-center justify-end mt-4">

                        <!-- <Link v-if="canResetPassword" :href="route('password.request')" -->
                        <Link :href="route('password.request')"
                            class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                        Forgot your password?
                        </Link>

                        <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Log in
                        </PrimaryButton>
                    </div>
                </form>


            <!-- </div> -->
        <!-- </div> -->
    <!-- </div> -->
</template>
