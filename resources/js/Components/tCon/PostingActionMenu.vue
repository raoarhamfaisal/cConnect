<script>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { InertiaLink } from "@inertiajs/inertia-vue3";
import tContractorWord from '@/Components/tCon/tContractorWord.vue';
import ButtonPost from '@/Components/tCon/tConSub/ButtonPost.vue';
import ButtonRefresh from '@/Components/tCon/tConSub/ButtonRefresh.vue';

import { Link } from '@inertiajs/inertia-vue3';
import { ref } from 'vue';

export default {

    components: {
        AuthenticatedLayout, InertiaLink,
        tContractorWord,
        ButtonPost, ButtonRefresh,
        Link, ref
    },

    props: {
        showingPostingActionMenu: Boolean,
        // menu in reference to this post.id
        postID: Number,  // the posting number
        postUserId: Number,
        currentUserId: Number
    },

    data() {
        return {
            //
        }
    },



}

</script>



<template>

    <div    id=""
            class="
                    z-50
                    fixed
                    top-4
                    right-2
                    left-4
                    ">
        <div
                :class="{
                        // if true class = block if not, class = hidden
                        'block': showingPostingActionMenu,
                        'hidden': !showingPostingActionMenu
                }"
                class="
                        absolute
                        flex
                        top-8
                        right-0
                        sm:right-0
                        px-3
                        text-left
                        border-b border-gray-400
                        rounded-xl
                        bg-gray-100
                        dark:border-gray-700
                    ">

                <div class="">

                    <!-- HAMBURGER MENU OPTIONS -->
                    <div    :id="'postID' + postID"
                            class="PostActionMenu
                                pt-1 pb-3 space-y-2">

<!-- EDIT & DELETE POST -->
<div
    v-if="currentUserId == postUserId">
            <!-- EDIT Posting Action Menu -->
            <button
                    class="flex items-center px-4 py-1
                            text-gray-600 transition-colors duration-300
                            transform rounded-lg dark:text-gray-400
                            hover:bg-gray-300 dark:hover:bg-gray-800
                            dark:hover:text-gray-200 hover:text-gray-700">
                    <img src="images/icons/edit.png" width="20" height="20" />
                    <span class="mx-4 font-medium">Edit Post</span>
            </button>

            <!-- DELETE Posting Action Menu -->
            <button
                    class="flex items-center px-4 py-1
                            text-gray-600 transition-colors duration-300
                            transform rounded-lg dark:text-gray-400
                            hover:bg-gray-300 dark:hover:bg-gray-800
                            dark:hover:text-gray-200 hover:text-gray-700">
                    <img src="images/icons/delete.png" width="20" height="20" />
                    <span class="mx-4 font-medium">DELETE Post</span>
            </button>
</div>
<div
    v-else>
    <!-- Posting Action Menu: Report Post -->
    <Link :href="route('post')"
            class="flex items-center px-4 py-1
                    text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-300
                    dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
            <img src="images/icons/Icon-report.png" width="20" height="20" />
            <span class="mx-4 font-medium">Report Post</span>
    </Link>

    <!-- DropDown: BLOCK THIS CONTACT -->
    <Link :href="route('post')"
        class="flex items-center px-4 py-1
            text-gray-600 transition-colors
            duration-300 transform rounded-lg
            dark:text-gray-400 hover:bg-gray-300
            dark:hover:bg-gray-800 dark:hover:text-gray-200
            hover:text-gray-700">
    <img src="images/icons/Icon-blocked-red.png"
            width="20" height="20" />
    <span class="mx-4 font-medium">Block This Contact</span>
    </Link>


    <!-- DropDown: FOLLOW CONTACT -->
    <Link :href="route('post')"
            class="flex items-center px-4 py-1
                text-gray-600 transition-colors
                duration-300 transform rounded-lg
                dark:text-gray-400 hover:bg-gray-300
                dark:hover:bg-gray-800 dark:hover:text-gray-200
                hover:text-gray-700">
            <img src="images/icons/Icon-person-blue.png"
                    width="20" height="20" />
            <span class="mx-4 font-medium">Follow Contact</span>
    </Link>


    <!-- DropDown: UN-FOLLOW -->
    <Link :href="route('post')"
            class="flex items-center px-4 py-1
                    text-gray-600 transition-colors
                    duration-300 transform rounded-lg
                    dark:text-gray-400 hover:bg-gray-300
                    dark:hover:bg-gray-800 dark:hover:text-gray-200
                    hover:text-gray-700">
    <img src="images/icons/Icon-unfollow.png" width="20" height="20" />
    <span class="mx-4 font-medium">Un-Follow Contact</span>
    </Link>


    <!-- DropDown: SAVE POST -->
    <!-- <Link :href="route('post')"
            class="flex items-center px-4 py-1
                text-gray-600 transition-colors
                duration-300 transform rounded-lg
                dark:text-gray-400 hover:bg-gray-300
                dark:hover:bg-gray-800 dark:hover:text-gray-200
                hover:text-gray-700">
            <img src="images/icons/save.png" width="20" height="20" />
            <span class="mx-4 font-medium">Save Post</span>
    </Link> -->

</div>

                    </div>

                </div>


        </div> <!-- END: HAMBURGER Navigation Menu -->
    </div>
</template>


