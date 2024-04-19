<script setup>
import AppSpinner from "@/Shared/AppSpinner.vue";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import StickyHeader from "@/Components/tCon/NewsFeed_StickyHeader.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import MainSideMenu from "@/Components/tCon/Menu_MainSideMenu.vue";
import Menu_Hamburger from "@/Components/tCon/Menu_HamburgerMenu.vue";
import PostDisplay from "@/Components/tCon/PostDisplay.vue";
import PostForm from "@/Components/tCon/PostForm.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { ref, onMounted, onUnmounted } from "vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import ScrollToLinkVue from "@/Components/tCon/ScrollToLink.vue";
import throttle from "lodash/throttle";
import { Inertia } from "@inertiajs/inertia";

let props = defineProps({
  posts: {
    type: Object,
    required: true,
  },

  profile: {
    type: Object,
    required: true,
  },

  showit: Boolean,
});



// (1) intially makes allPosts = to prop posts
let allPosts = props.posts.data;
// (2) sets the URL to the first url - for looks
//let initialUrl = $page.url;

let previousY = 0;
let previousRatio = 0;
let showSpinText = false;
let showingNavigationDropdown = ref(false);

const defaultPostFormObject = {
  title: null,
  image: null,
  body1: null,
  body2: null,
  is_body_bold: false,
  post_text_color_id: 0,
  likes: 0,
  repost: 0,
  shares: 0,
};

// used for PostForm
let playvideo = false;
let isFormOpen = false;
let isFormEdit = false;
let postFormObject = defaultPostFormObject;

// Body 1 color array
const body1Colors = [
  "text-gray-900",
  "text-slate-600",
  "text-gray-600",
  "text-zinc-600",
  "text-neutral-600",
  "text-stone-600",
  "text-red-600",
  "text-orange-600",
  "text-amber-600",
  "text-yellow-600",
  "text-lime-600",
  "text-green-600",
  "text-emerald-600",
  "text-teal-600",
  "text-cyan-600",
  "text-sky-600",
  "text-blue-600",
  "text-indigo-600",
  "text-violet-600",
  "text-purple-600",
  "text-fuchsia-600",
  "text-pink-600",
  "text-rose-600",
];

const loadMoreIntersect = ref(null);

onMounted(() => {
  // makes use of javascript IntersectionObserver
  // entries & entry defined by browser as object enters viewing area
  // 'IntersectionObserver' allows us to execute code when something
  // enters or leaves the browser viewport
  const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => entry.isIntersecting && loadMorePosts(), {
      rootMargin: "-200px 0px -500px 0px",
      threshold: 0,
    })
  );

  const loadMoreIntersect = document.getElementById("loadMoreIntersect");
  observer.observe(loadMoreIntersect);

  window.addEventListener("resize", throttle(ScreenNavigationDropdown, 1000));

  // Display position: sticky on headerSticky when scrolled to top
  // not used when in lg screen
  window.addEventListener("scroll", throttle(myStickyFunction, 1000));
});

onUnmounted(() => {
  window.removeEventListener("resize", ScreenNavigationDropdown);

  window.removeEventListener("scroll", myStickyFunction);
});

function loadMorePosts() {
  // Check to see if post proerty has a next page url
  // js function hasMore
  if (props.posts.hasMore === null) {
    return;
  }
  // next_page_url property returned from Laravel's pagination object.
  // if more pages, use the inertia class to lad url with page #
  // inertia is going to treat this as a data reload, not completely
  // switching component out
  Inertia.get(
    props.posts.next_page_url,
    {},
    {
      // these preserve state keeps our position in the scroll
      preserveState: true,
      preserveScroll: true,
      // 'only' makes sure that inertia only loads current post property
      // not the whole payload. Make sure lazy load is used in controller
      only: ["posts"],
      onSuccess: () => {
        // takes the object posts and appends it to allpost
        allPosts = [...allPosts, ...props.posts.data];
        // 'this.initialUrl' is set in script data
        window.history.replaceState({}, $page.title, initialUrl);
      },
    }
  );
}

function NavigationDropdown(showingNavigationDropdown) {
  showingNavigationDropdown = !showingNavigationDropdown;
}

function ScreenNavigationDropdown(showingNavigationDropdown) {
  showingNavigationDropdown = false;
}

function myStickyFunction(showingNavigationDropdown) {
  let headerSticky = document.getElementById("myHeader");
  let hamburgerSticky = document.getElementById("hamburgerwithsticky");
  let stickyPos = headerSticky.offsetTop;
  // console.log(headerSticky);
  // console.log('stickypos= ', stickyPos);

  if (window.pageYOffset > stickyPos + 120) {
    // console.log(window.pageYOffset);
    // console.log(this.showingNavigationDropdown);
    showingNavigationDropdown = false;
    headerSticky.classList.add("sticky");
    headerSticky.classList.remove("hidden");

    hamburgerSticky.classList.add("fixed");
    hamburgerSticky.classList.add("top-2");
    hamburgerSticky.classList.add("right-4");
    hamburgerSticky.classList.add("left-4");
  } else {
    headerSticky.classList.remove("sticky");
    headerSticky.classList.add("hidden");

    hamburgerSticky.classList.remove("fixed");
    hamburgerSticky.classList.remove("top-2");
    hamburgerSticky.classList.remove("right-4");
    hamburgerSticky.classList.remove("left-4");
  }
}

// DISPLAY POST INPUT/EDIT FORM
// no item # is create new
function openForm(item) {
  console.log("Post button clicked");
  isFormOpen = true;
  isFormEdit = !!item; // !! conversts a "truthy" or "falsey" to
  // boolean true or false
  // So if e=tiem is null or "0" then
  // make isFormEdit false or Create Mode
  // If a value there its "truthy" and make
  // isFormEdit true or edit mode.

  // The ternary operator is used assign data to the postFormObject
  // if item is "truthy" the assign postFormObject with the object
  // associated with item# else assign it the defaultPostFormObject
  // so if item # is available

  // btw, we need to explicitly make a copy of the item object when
  // we assign it to the postFormObject... do it by calling Object.assign()
  postFormObject = item ? Object.assign({}, item) : defaultPostFormObject;
  // And, reset error messages everytime we open the form
  $page.props.errors = {};
}

function saveItem(item) {
  // Same method for update & create
  // if we have an item id then update
  let url = "/posts";
  if (item.id) {
    url = "/posts/" + item.id;
    item._method = "PUT";
  }
  $inertia.post(url, item, {
    onError: () => {},
    onSuccess: () => {
      closeModal();
    },
  });
}

function closeModal() {
  isFormOpen = false;
}

function closeModalEditMode() {
  // edit was cancelled
  // this make sure any left over temp uploaded
  // file are deleted

  // ****** NOT COMPLETED - WORK ON LATER *******
  isFormOpen = false;
}

function deleteItem(item) {
  if (window.confirm("are you sure?")) {
    $inertia.post("/posts/" + item.id, {
      _method: "DELETE",
    });
  }
}

function image_path(image) {
  return "/" + image;
}

function isVideo(img) {
  let extension = img.split(".").pop();
  if ((extension == "mp4") | (extension == "mov")) {
    playVideo = true;
  } else {
    playVideo = false;
  }
  return playVideo;
}
</script>

<template>
  <Head title="News Feed" />

  <section class="bg-white">
    <!-- Section Container -->
    <div class="relative mx-auto mt-0 lg:mt-2 pt-10 lg:pt-0">
      <div class="flex lg:flex-row lg:justify-center lg:items-start lg:gap-x-5">
        <!-- MAIN SIDE MENU -->
        <!-- ******************************************************* -->
        <MainSideMenu
          :showit="showit"
          :profile="profile"
          :isOpen="isFormOpen"
          @postClicked="openForm"
        >
        </MainSideMenu>

        <!-- DISPLAY NEWS FEED -->
        <!-- ******************************************************* -->
        <div
          class="flex flex-col items-center justify-start mx-auto lg:mx-1 lg:mt-0"
        >
          <!-- SCROLLING TOP HEADER -->
          <!-- ONLY ON MOBILE       -->
          <header
            id="ScrollAreaHeader"
            class="lg:hidden absolute top-0 left-0 right-0 z-10 h-14 sm:h-16 bg-blue-30-rgba"
          >
            <nav class="container max-w-7xl px-1 py-1 pt-2 mx-auto md:px-12">
              <div class="flex items-center justify-between">
                <!-- LOGO -->
                <div class="flex items-center justify-start pl-1">
                  <Link
                    href="/"
                    class="text-2xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
                  >
                    <tContractorWord />
                  </Link>
                </div>

                <!-- Cross X Menu Options -->
                <div
                  class="flex items-center justify-end sm:space-x-4 space-x-2"
                >
                  <!-- refresh post icon only -->
                  <ButtonRefresh></ButtonRefresh>

                  <!-- New Post Button -->
                  <ButtonPost :isOpen="isFormOpen" @postClicked="openForm">
                  </ButtonPost>

                  <!-- Hamburger menu button -->
                  <!-- Hamburger -->
                  <div class="-mr-2 flex items-center">
                    <button
                      @click="NavigationDropdown"
                      class="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                    >
                      <svg
                        class="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          :class="{
                            hidden: showingNavigationDropdown,
                            'inline-flex': !showingNavigationDropdown,
                          }"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                          :class="{
                            hidden: !showingNavigationDropdown,
                            'inline-flex': showingNavigationDropdown,
                          }"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </header>

          <!-- Used in mobile mode -->
          <!-- called from both HEADER in DISPLAY NEWS FEED
                 and STICKY SCROLL HEADER MENU
                 NOTE method: myStickyFunction changes classes
                 when in STICKY SCROLL MODE -->
          <Menu_Hamburger
            :showit="showit"
            :profile="profile"
            :showingNavigationDropdown="showingNavigationDropdown"
            @NavigationDropdown="NavigationDropdown"
          >
          </Menu_Hamburger>

          <!-- POSTING CONTAINER -->
          <div
            class="container flex flex-col items-center justify-start mx-auto lg:mx-1 max-w-3xl mt-3 sm:mt-6 lg:mt-0 shadow-md sm:rounded-3xl"
          >
            <!-- FULL POST WRAPPER News Feed -->
            <div
              class="flex flex-col items-center justify-start px-2 bg-rose-600 lg:max-h-screen lg:overflow-y-auto"
            >
              <!-- STICKY SCROLL HEADER MENU -->
              <StickyHeader
                :showit="showit"
                :profile="profile"
                :showingNavigationDropdown="showingNavigationDropdown"
                @NavigationDropdown="NavigationDropdown"
                :isOpen="isFormOpen"
                @postClicked="openForm"
              >
              </StickyHeader>

              <!-- -------for="post in allPosts"------------- -->
              <!-- .slice only allows 400 iterations -->
              <!-- <div v-for="post in allPosts.slice(0, 400)" :key="post.id" -->
              <div
                v-for="post in allPosts"
                id="scrollPost"
                :key="post.id"
                class="relative mx-auto py-0"
              >
                <!-- INDIVIDUAL POST DISPLAY WITH MENUS -->
                <PostDisplay
                  :showit="showit"
                  :profile="profile"
                  :post="post"
                  :body1Colors="body1Colors"
                >
                </PostDisplay>
              </div>
              <!-- v-for="post in allPosts" -->
              <!-- ------------------------------------------- -->

              <AppSpinner
                v-show="posts.next_page_url"
                :showSpinText="true"
                class="text-blue-400"
              >
                LOADING MORE POSTS!
              </AppSpinner>

              <!-- Makes call to load more posts calling the script
                    observer.observe(this.$refs.loadMoreIntersect) -->
              <span ref="loadMoreIntersect" id="loadMoreIntersect" />

              <!-- 'next_page_url' is set to null in script -->
              <div v-if="posts.next_page_url === null" class="mt-12">
                You're all up to date! 🥳
              </div>

              <PostForm
                :isOpen="isFormOpen"
                :isEdit="isFormEdit"
                :form="postFormObject"
                @formsave="saveItem"
                @formclose="closeModal"
                @formEditClose="closeModalEditMode"
              >
              </PostForm>
            </div>
            <!-- GRID END: For News Feed -->
          </div>
          <!-- END POSTING CONTAINER -->
        </div>
        <!-- END: DISPLAY NEWS FEED -->
      </div>
    </div>
    <!-- Section Container -->
  </section>
</template>
