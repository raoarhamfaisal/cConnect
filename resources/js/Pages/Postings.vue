<script>
// Why is script on top? BECAUSE I LIKE AIT HERE!
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { InertiaLink } from "@inertiajs/inertia-vue3";
import { Inertia } from '@inertiajs/inertia';

import AppSpinner from '@/Shared/AppSpinner.vue';
import tContractorWord from '@/Components/tCon/tContractorWord.vue';
import ButtonPost from '@/Components/tCon/tConSub/ButtonPost.vue';
import ButtonRefresh from '@/Components/tCon/tConSub/ButtonRefresh.vue';
import MainSideMenu from '@/Components/tCon/Menu_MainSideMenu.vue';
import Menu_Hamburger from '@/Components/tCon/Menu_HamburgerMenu.vue';
import PostDisplay from '@/Components/tCon/PostDisplay.vue';
import PostForm from '@/Components/tCon/PostForm.vue';
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import { ref } from 'vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import PostDisplayEnlarged from '@/Components/tCon/PostDisplayEnlarged.vue';


const defaultPostFormObject = {
    user_id: 0,
    title: null,
    image: null,
    body1: null,
    body2: null,
    body1Bold: false,
    body1ColorId: 0,
    likes: 0,
    repost: 0,
    shares: 0,
}


export default {

    components: {
        AuthenticatedLayout, InertiaLink, AppSpinner,
        tContractorWord, ResponsiveNavLink,
        ButtonPost, ButtonRefresh, MainSideMenu, Menu_Hamburger,
        PostDisplayEnlarged,
        PostDisplay, PostForm, Head, Link, ref
    },

    mounted() {

        // makes use of javascript IntersectionObserver
        // entries & entry defined by browser as object enters viewing area
        // 'IntersectionObserver' allows us to execute code when something
        // enters or leaves the browser viewport
        const observer = new IntersectionObserver(
            entries => entries.forEach(entry => entry.isIntersecting && this.loadMorePosts(), {
                rootMargin: "0px 0px 0px 0px",
                threshold: 0
            }));
            // rootMargin: "-500px 0px -500px 0px",   top right bottom left

        observer.observe(this.$refs.loadMoreIntersect);


    },

    // unmounted() {

    // },


    props: {
        posts: {
            type: Object,
            required: true
        },

        profile: {
            type: Object,
            required: true,
        },

        showit: Boolean,

        // get existing search filters on page
        // from PostController.php
        // this.postSearchFilters.postSearch = value or null
        postSearchFilters: {
            type: Object,
            default: () => ({
                    postSearch: '',
            }),
        },

    },

    data() {
        return {
            // (1) intially makes allPosts = to prop posts
            allPosts: this.posts.data,
            // (2) sets the URL to the first url - for looks
            initialUrl: this.$page.url,

            previousY: 0,
            previousRatio: 0,
            showSpinText: false,
            showingNavigationDropdown: ref(false),

            // SHow fullpage individual post
            postDisplayEnlarged: false,
            postToEnlarge: new Object(),

            // used for PostForm
            playvideo: false,
            isFormOpen: false,
            isFormEdit: false,
            postFormObject: defaultPostFormObject,
            userID: this.profile.user_id,

            form: defaultPostFormObject,

            // Load postSearch input with current search
            // Object postSearchFilters.postSearch = null or value of serch text
            postSearch: null,
            postSearch: ref(this.postSearchFilters.postSearch),

            // Body 1 color array
            body1Colors: [
                'text-gray-900',
                'text-slate-600',
                'text-gray-600',
                'text-zinc-600',
                'text-neutral-600',
                'text-stone-600',
                'text-red-600',
                'text-orange-600',
                'text-amber-600',
                'text-yellow-600',
                'text-lime-600',
                'text-green-600',
                'text-emerald-600',
                'text-teal-600',
                'text-cyan-600',
                'text-sky-600',
                'text-blue-600',
                'text-indigo-600',
                'text-violet-600',
                'text-purple-600',
                'text-fuchsia-600',
                'text-pink-600',
                'text-rose-600',
            ],

        }
    },

    methods: {

        loadMorePosts() {
            // Check to see if post proerty has a next page url
            // js function hasMore
            if (this.posts.hasMore === null) {
                return
            }


            // next_page_url property returned from Laravel's pagination object.
            // if more pages, use the inertia class to lad url with page #
            // inertia is going to treat this as a data reload, not completely
            // switching component out
            this.$inertia.get(this.posts.next_page_url, {}, {
                // these preserve state keeps our position in the scroll
                preserveState: true,
                preserveScroll: true,
                // 'only' makes sure that inertia only loads current post property
                // not the whole payload. Make sure lazy load is used in controller
                only: ['posts'],
                onSuccess: () => {
                    // takes the object posts and appends it to allpost
                    this.allPosts = [...this.allPosts, ...this.posts.data]
                    // 'this.initialUrl' is set in script data
                    window.history.replaceState({}, this.$page.title, this.initialUrl)
                }
            })
        },

        NavigationDropdown(showingNavigationDropdown) {
            this.showingNavigationDropdown = !this.showingNavigationDropdown;
        },


        // Input search from Menu_HamburgerMenu & Menu_MainSideMenu
        submitPostSearch() {
            console.log(('***** postSearch submitted: ' + this.postSearch));
            this.showingNavigationDropdown = false;
            Inertia.get('/post',
                // include the data to go along with get request
                // because we are using 'get' its going to the query string
                // postSearch=inoput data { preserveState: true }
                { postSearch: this.postSearch },

            );
        },

        RefreshPostings() {
            console.log(('Refreshed with search: ' + this.postSearch));
            Inertia.get('/post',
                { postSearch: this.postSearch },
            );
        },


        // DISPLAY POST INPUT/EDIT FORM
        // no item # is create new
        openForm(formData) {
            // console.log(('Post button clicked'))
            this.showingNavigationDropdown = false;
            this.isFormOpen = true;
            this.isFormEdit = !!formData;  // !! conversts a "truthy" or "falsey" to
            // boolean true or false
            // So if e=tiem is null or "0" then
            // make isFormEdit false or Create Mode
            // If a value there its "truthy" and make
            // isFormEdit true or edit mode.

            // if formData is "truthy" (has data) then assign postFormObject with the
            // object associated with form# else assign it the defaultPostFormObject
            // and set user_id to the current user

            // btw, we need to explicitly make a copy of the form object when
            // we assign it to the postFormObject... do it by calling Object.assign()

            if (this.isFormEdit) {
                // existing Post
                this.form = Object.assign({}, formData);
            } else {
                // New Post
                formData = defaultPostFormObject;
                this.postFormObject.user_id = this.userID;
            }

            // And, reset error messages everytime we open the form
            this.$page.props.errors = {};

        },

        saveItem(formData) {
            // Same method for update & create
            // if we have an item id then update

            let url = '/post';
            if (formData.id) {
                url = '/post/' + formData.id;
                formData._method = 'PUT';
            }

            console.log(('saveItem: ' + url))

            // see results - chrome: inpect/network/headers & payload
            // 1) goes to web.php router
            // 2) router listens for Route::post('/post')
            //    to PostController store method
            this.$inertia.post(url, formData, {
                onError: () => {
                },
                onSuccess: () => {
                    this.closeModal();
                }
            });
        },

        closeModal() {
            this.isFormOpen = false;
        },

        closeModalEditMode() {
            // edit was cancelled
            // this make sure any left over temp uploaded
            // file are deleted

            // ****** NOT COMPLETED - WORK ON LATER *******
            this.isFormOpen = false;
        },

        deleteItem(formData) {
            if (window.confirm('are you sure?')) {
                this.$inertia.post('/posts/' + formData.id, {
                    _method: 'DELETE'
                });
            }
        },

        EnlargePost(clickedPost) {
            // Toggles display of indiviual post
            // click event is in PostDisplayEnlarged.vue

            this.postToEnlarge = clickedPost;
            this.postDisplayEnlarged = true;


        },

        EnLargedPostClosed() {
            this.postToEnlarge = null;
            this.postDisplayEnlarged = false;

        },


    },
}

// this is script setup, here for reference only
// watch(postSearch, value => {
//     console.log(('changed ' + value));
//     // normal is inertia.get re-renders page
//     // we need to stop that by 3rd argument preserveState: true
//     Inertia.get('/post',
//         // include the data to go along with get request
//         // because we are using 'get' its going to the query string
//         // postSearch=inoput data
//         { postSearch: value },
//         { preserveState: true }
//     );
// });

</script>




<template>

    <Head title="News Feed" />


<section class="bg-gray-100


               ">
<!-- Section Container -->
<div class="relative
            mx-auto
            mt-0
            lg:mt-2
            pt-10
            lg:pt-0
            h-screen

    ">
    <div class="flex
                lg:flex-row
                lg:justify-center
                lg:items-start
                lg:gap-x-5
    ">

        <!-- MAIN SIDE MENU -->
        <!-- ******************************************************* -->

            <MainSideMenu
                v-model="postSearch"
                :showit="showit"
                :profile="profile"
                :isOpen="isFormOpen"
                @postClicked="openForm"
                @submitPostSearch="submitPostSearch"
            >
            </MainSideMenu>


        <!-- DISPLAY NEWS FEED -->
        <!-- ******************************************************* -->

        <div class="
                flex flex-col
                items-center
                justify-start
                mx-auto
                lg:mx-1
                lg:mt-0
                h-full
                overflow-x-hidden
                bg-gray-400
                "
            >



            <div id="NewsFeedScroll"
                 class=""
                 >


                <!-- FIXED TOP HEADER -->
                <!-- ONLY ON MOBILE       -->
                <header
                    class="lg:hidden
                            fixed top-0 left-0 right-0
                            z-10
                            h-14
                            sm:h-16
                            bg-gray-400">

                    <nav
                        class="container max-w-7xl
                                px-1
                                py-1
                                pt-2
                                mx-auto
                                md:px-12">

                        <div class="flex items-center justify-between ">

                            <!-- LOGO -->
                            <div
                                class="flex items-center
                                        justify-start
                                        pl-1
                                        space-x-2">

                                <Link href="/"
                                    class="xs:hidden
                                            md:flex
                                            w-12
                                        ">
                                    <img src="images/logo/icon_blue.png" width="45" height="45" />
                                </Link>



                                <Link href="/"
                                    class=" hidden
                                            xs:flex
                                            text-2xl
                                            sm:text-5xl
                                            md:text-5xl
                                            lg:text-6xl
                                            xl:text-7xl
                                            font-bold
                                            tracking-wide
                                            text-center
                                            ">
                                    <tContractorWord />
                                </Link>
                            </div>

                            <!-- Cross X Menu Options -->
                            <div class="flex items-center justify-end
                                sm:space-x-4
                                space-x-2">

                                <!-- refresh post icon only -->
                                <ButtonRefresh
                                    @RefreshPostings="RefreshPostings"
                                ></ButtonRefresh>

                                <!-- Contractor Page -->
                                <div class="hidden
                                            sx:flex flex-shrink-0
                                            items-center justify-center
                                            ">
                                    <Link href="#">
                                        <img src="images/icons/contractorpage_b.png" width="45" height="45" />
                                    </Link>
                                </div>


                                <!-- New Post Button -->
                                <ButtonPost
                                    :isOpen="isFormOpen"
                                    @postClicked="openForm">
                                </ButtonPost>


                                <!-- Hamburger menu button -->
                                <!-- Hamburger -->
                                <div class="-mr-2 flex items-center">
                                    <button
                                        @click="NavigationDropdown"
                                        class="inline-flex items-center justify-center
                                                p-2 rounded-md text-black
                                                dark:text-white hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                                        <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path :class="{ 'hidden': showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }"
                                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                            <path :class="{ 'hidden': !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </nav>
                </header>


                <Teleport to="body">
                    <Menu_Hamburger
                        v-model="postSearch"
                        :showit="showit"
                        :profile="profile"
                        :showingNavigationDropdown="showingNavigationDropdown"
                        @NavigationDropdown="NavigationDropdown"
                        @submitPostSearch="submitPostSearch"
                        >
                    </Menu_Hamburger>
                </Teleport>


                <!-- POSTING CONTAINER -->
                <div class="container
                            flex flex-col
                            items-center
                            justify-start
                            mx-auto
                            lg:mx-1
                            max-w-3xl
                            mt-3
                            sm:mt-6
                            lg:mt-0
                            shadow-md sm:rounded-3xl
                            ">


                    <!-- FULL POST WRAPPER News Feed -->
                    <div class="flex flex-col
                            items-center
                            justify-start

                            px-2

                            lg:max-h-screen
                            lg:overflow-y-auto
                            h-screen
                            ">


                        <!-- -------for="post in allPosts"------------- -->
                        <!-- .slice only allows 400 iterations -->
                        <!-- <div v-for="post in allPosts.slice(0, 400)" :key="post.id" -->
                        <div v-for="post in allPosts"
                                id="scrollPost"
                            :key="post.id"
                            class="relative
                                    mx-auto
                                    w-full
                                    py-0"
                                >

                                <!-- INDIVIDUAL POST DISPLAY WITH MENUS -->
                                <PostDisplay
                                    :showit="showit"
                                    :profile="profile"
                                    :post="post"
                                    :body1Colors="body1Colors"
                                    @enlarge-post="EnlargePost"
                                >
                                </PostDisplay>


                        </div>  <!-- v-for="post in allPosts" -->
                        <!-- ------------------------------------------- -->

                        <!-- Makes call to load more posts calling the script
                             observer.observe(this.$refs.loadMoreIntersect) -->
                            <span ref="loadMoreIntersect" />

                            <AppSpinner v-show="posts.next_page_url"
                                        :showSpinText="true"
                                        >
                                <div class="px-5 text-gray-300">
                                    LOADING MORE POSTS!
                                </div>

                            </AppSpinner>

                            <div class="h-5"></div>

                            <!-- 'next_page_url' is set to null in script -->
                            <div v-if="posts.next_page_url === null"
                                class="mt-12">
                                <div class="mx-auto
                                          text-gray-300
                                            w-60
                                            sm:w-72
                                            md:w-96
                                            "
                                            >
                                    You're all up to date! 🥳
                                </div>
                            </div>


                            <div v-if="postDisplayEnlarged">
                                <Teleport to="body">
                                    <PostDisplayEnlarged
                                        :profile="profile"
                                        :postToEnlarge="postToEnlarge"
                                        :body1Colors="body1Colors"
                                        @close-enlarged="EnLargedPostClosed"
                                    >
                                    </PostDisplayEnlarged>
                                </Teleport>
                            </div>

                            <Teleport to="body">
                                <PostForm
                                    :isOpen="isFormOpen"
                                    :isEdit="isFormEdit"
                                    :form="postFormObject"
                                    @formsave="saveItem"
                                    @formclose="closeModal"
                                    @formEditClose="closeModalEditMode">
                                </PostForm>
                            </Teleport>

                    </div> <!-- WRAPPER END: For News Feed -->

                </div> <!-- END POSTING CONTAINER -->
            </div>  <!-- nrewsfeed scroll -->

        </div> <!-- END: DISPLAY NEWS FEED -->





    </div>
</div> <!-- Section Container -->
</section>
</template>


