<script>
// SCRIPT UP TOP BECAUSE I LIKE IT HERE!
import { InertiaLink } from "@inertiajs/inertia-vue3";
import tContractorWord from '@/Components/tCon/tContractorWord.vue';
import ButtonPost from '@/Components/tCon/tConSub/ButtonPost.vue';
import ButtonRefresh from '@/Components/tCon/tConSub/ButtonRefresh.vue';
import PostingActionMenu from '@/Components/tCon/PostingActionMenu.vue';
import PostImageDisplay from '@/Components/tCon/PostImageDisplay.vue';
import throttle from 'lodash/throttle'

import { Link } from '@inertiajs/inertia-vue3';
import { ref } from 'vue';

export default {

    components: {
        InertiaLink,
        tContractorWord,
        ButtonPost, ButtonRefresh,
        PostingActionMenu,
        PostImageDisplay,
        Link, ref, throttle
    },

    mounted() {

        // Remove PostingActionMenu upon scroll
        // const scrollElement = document.querySelector('#scrollPost');
        // console.log((scrollElement));

        // scrollElement.addEventListener("scroll",
        //     throttle(this.ScreenPostingActionMenu, 1000));


        // Remove PostingActionMenu upon scroll
        // ERROR ONLY WORKS IN MOBILE BECAUSE LOOKING AT WINDOW
        window.addEventListener("scroll",
            throttle(this.HidePostingActionMenu, 500));

    },

    unmounted() {

        // scrollElement.removeEventListener("scroll",
        //     throttle(this.ScreenPostingActionMenu, 1000));

        window.removeEventListener("scroll",
            throttle(this.HidePostingActionMenu, 500));

    },


    props: {

        showit: Boolean,

        // profile of current logged in user (postings.vue)
        profile: {
            type: Object,
            required: true,
        },

        // Individual post from v-for posts (postings.vue)
        post: {
            type: Object,
            required: true,
        },

        // array of colors for top body text (postings.vue)
        body1Colors: {
            type: Array,
            required: true,
        },

    },

    data() {
        return {
            showingPostingActionMenu: ref(false),

        }
    },

    computed: {

        numberOfImages: {

            // Gets the number of images in post.image string
            // passed as prop to PostImageDisplay.vue
            get: function () {
                if (this.post.image.length > 0 ) {
                    return this.post.image.split('|').length;
                } else {
                    return 0;
                }
            },
        },

        // Places the post.image string into an array to be
        // passed as prop to PostImageDisplay.vue
        imageArray: {
            get: function () {
                if (this.post.image.length > 0) {

                    // split string into an array
                    let videoArray = [];

                    let newImageArray = this.post.image.split('|');
                    return newImageArray;

                } else {
                    return [];
                }
            },
        },

    },


    methods: {

        NavPostingActionMenu(showingPostingActionMenu) {
            this.showingPostingActionMenu = !this.showingPostingActionMenu;
        },

        HidePostingActionMenu(showingPostingActionMenu) {
            this.showingPostingActionMenu = false;
        },

    },

}

</script>

<template>

    <div
            v-if="post.view"
            class="z-48
                flex flex-col
                items-center justify-start
                my-2
                py-1 lg:py-1
                px-2
                bg-gray-200
                border-2
                border-gray-300
                rounded-lg drop-shadow-lg">

        <!-- INDIVIDUAL POST:


        TOP ROW MENUS
        POST ACTIONS MENU -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div class="flex flex-row
                    justify-between items-center
                    w-full
                    mb-2">

            <!-- User Avatar & User /// INDIVIDUAL POST: TOP POSTING ROW -->
            <div class="flex flex-row justify-start items-center">
                <!-- Avatar -->
                <div class="flex justify-start items-start
                            flex-none
                            mt-2
                            w=16">
                    <!-- <Link :href="route('post.show')" class="block "> -->
                    <Link href="#" class="block ">

                        <img class="object-cover
                                    w-14 h-14 mx-2
                                    rounded-full"
                        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                        alt="avatar">
                    </Link>
                </div>
                <!-- User Info -->
                <div class="flex flex-wrap ml-1">
                    <h2 class="font-bold
                                text-xl
                                xs:text-2xl
                                md:text-3xl"
                        @click="$emit('enlarge-post', post)"
                        >
                        {{ post.id }}: {{ post.title }}
                    </h2>
                </div>
            </div>

            <!-- Ratings / post action menu / posting date -->
            <div class="flex flex-row justify-end items-center
                                    flex-none
                                    w-28">

                <!-- User RATINGS /// INDIVIDUAL POST: TOP POSTING ROW -->
                <div class="flex flex-row
                                            flex-none
                                            justify-end items-center px-2">
                    <!-- Premium Marking -->
                    <div class="">
                        <img src="images/icons/pre-diamond.png" width="20" height="30" />
                    </div>
                    <!-- ratings & how many -->
                    <div class="flex flex-col justify-center items-center">
                        <div class="">
                            <img src="images/icons/Stars4_icon.png" width="40" height="40" />
                        </div>
                        <div class="">
                            <h2 class="font-light text-xs overflow-hidden
                                                        tracking-tighter">
                                5555
                            </h2>
                        </div>
                    </div>
                </div>

                <!-- RIGHT SIDE --- POST ACTION MENU
                                & time since posting -->
                <div class="flex flex-col
                            flex-initial
                            flex-nowrap
                            justify-center items-center
                            mr-3">
                    <!-- POST MENU -->
                    <!-- <div class="">
                        <h2 class="font-bold text-xl overflow-hidden
                                   tracking-tighter
                                   sm:tracking-wide">
                            ---
                        </h2>
                    </div> -->

                    <!-- Hamburger -->
                    <div class="-mr-2 flex items-center">
                        <button @click="NavPostingActionMenu"
                            class="inline-flex items-center justify-center
                                    p-2 rounded-md text-black
                                    dark:text-white hover:text-gray-500
                                    dark:hover:text-gray-400 hover:bg-gray-100
                                    dark:hover:bg-gray-900 focus:outline-none
                                    focus:bg-gray-100 dark:focus:bg-gray-900
                                    focus:text-gray-500 dark:focus:text-gray-400
                                    transition duration-150 ease-in-out">
                            <svg class="h-6 w-6"
                                 stroke="currentColor"
                                 fill="none" viewBox="0 0 24 24">
                                <path :class="{ 'hidden': showingPostingActionMenu,
                                                'inline-flex': !showingPostingActionMenu
                                              }"
                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path :class="{ 'hidden': !showingPostingActionMenu,
                                                'inline-flex': showingPostingActionMenu
                                              }"
                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>





                    <div class="">
                        <h2 class="flex flex-nowrap
                                    font-light text-xs
                                    tracking-tighter
                                    italic">
                            20 hrs
                        </h2>
                    </div>
                </div>
            </div> <!-- END Ratings / post action menu / posting date -->

        </div> <!-- End TOP POSTING ROW -->


        <!-- Text Body1 UPPER -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div v-show="post.body1"
             @click="$emit('enlarge-post', post)"
             class="flex flex-row justify-center items-center
                            w-full
                            px-2
                            text-lg
                            xs:text-xl
                            md:text-2xl
                            dark:text-gray-300"
            :class="[body1Colors[post.body1ColorId],
                    post.body1Bold ? 'font-bold' : 'font-normal']">
            {{ post.body1 }}
        </div>


        <!-- INDIVIDUAL POST: MAIN IMAGES  -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div class="flex flex-row
                    justify-center
                    w-full
                    mb-1">
                    <!-- justify-center  -->

            <div v-if="post.image"
                 @click="$emit('enlarge-post', post)">
                 <PostImageDisplay
                    :imageArray="imageArray"
                    :numberOfImages="numberOfImages"
                    >
                 </PostImageDisplay>
            </div>
        </div>


        <!-- Text Body2 LOWER -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div class="flex flex-row justify-center items-center
                            w-full
                            px-2
                            mt-0
                            mb-0
                            text-base
                            xs:text-lg
                            md:text-xl

                            font-normal
                            text-gray-900
                            dark:text-gray-300"
            @click="$emit('enlarge-post', post)"
            >
            {{ post.body2 }}
        </div>


        <!-- INDIVIDUAL POST: BOTTOM ROW MENU -->
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <div class="flex flex-row justify-between items-center
                            w-full
                            mb-2">

            <!-- Likes -->
            <div class="">
                <Link href="#" class="font-medium
                                                text-xs
                                                sm:text-sm
                                                text-blue-800 dark:text-blue-400
                                                hover:underline">
                <div class="flex flex-row justify-between items-center">
                    <div class="">
                        <img src="images/icons/like_green.png" width="25" height="25" />
                    </div>
                    <div class="pl-1">
                        {{ post.likes }}
                    </div>
                </div>
                </Link>
            </div>


            <!-- Comments -->
            <div class="">
                <Link href="#" class="font-medium
                                            text-xs
                                            sm:text-sm
                                        text-blue-800 dark:text-blue-400
                                            hover:underline">
                <div class="flex flex-row justify-between items-center">
                    <div class="">
                        <img src="images/icons/comment_icon.png" width="25" height="25" />
                    </div>
                    <div class="pl-1">
                        12,999
                    </div>
                </div>
                </Link>
            </div>

            <!-- Re-Posted -->
            <div class="">
                <Link href="#" class="font-medium
                                                text-xs
                                                sm:text-sm
                                                text-blue-800 dark:text-blue-400
                                                hover:underline">
                <div class="flex flex-row justify-between items-center">
                    <div class="">
                        <img src="images/icons/share_icon.png" width="25" height="25" />
                    </div>
                    <div class="pl-1">
                        {{ post.repost }}
                    </div>
                </div>
                </Link>
            </div>

            <!-- Shares -->
            <div class="">
                <Link href="#" class="font-medium
                                                text-xs
                                                sm:text-sm
                                                text-blue-800 dark:text-blue-400
                                                hover:underline">
                <div class="flex flex-row justify-between items-center">
                    <div class="">
                        <img src="images/icons/share_out_icon.png" width="20" height="17" />
                    </div>
                    <div class="pl-1">
                        {{ post.shares }}
                    </div>
                </div>
                </Link>
            </div>


        </div>

        <PostingActionMenu
            :showingPostingActionMenu="showingPostingActionMenu"
            :postID="post.id"
            :postUserId="post.user_id"
            :currentUserId="profile.user_id"
            @NavPostingActionMenu="NavPostingActionMenu"
            >
        </PostingActionMenu>


    </div>

</template>


