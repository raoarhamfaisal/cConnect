<script>
import { Link } from "@inertiajs/inertia-vue3";
import tContractorWord from "@/Components/tCon/tContractorWord.vue";
import ButtonPost from "@/Components/tCon/tConSub/ButtonPost.vue";
import ButtonRefresh from "@/Components/tCon/tConSub/ButtonRefresh.vue";
import { ref } from "vue";

export default {
  components: {
    Link,
    tContractorWord,
    ButtonPost,
    ButtonRefresh,
    ref,
  },

  props: {
    showit: Boolean,

    showingNavigationDropdown: Boolean,

    isOpen: Boolean,
  },

  methods: {
    NavigationDropdown() {
      this.$emit("NavigationDropdown", this.showingNavigationDropdown);
    },

    postClicked() {
      isOpen: true, this.$emit("postClicked", this.isOpen);
    },
  },
};
</script>

<template>
  <header
    class="lg:hidden rounded-b-lg border-t-0 border-r border-l border-b-4 border-gray-4 shadow-xl shadow-slate-500 h-16 max-w-3xl z-30 bg-gray-200 transition ease-in-out duration-700"
    id="myHeader"
  >
    <div class="flex flex-row justify-around items-center h-16">
      <!-- LOGO -->
      <!-- XS screens just show the tcontractor icon -->
      <div class="flex items-center justify-start pl-1">
        <Link
          href="/"
          class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-center"
        >
          <div class="hidden sm:block">
            <tContractorWord />
          </div>
          <div class="sm:hidden pt-1">
            <img src="/images/logo/icon_blue.png" width="38" height="38" />
          </div>
        </Link>
      </div>

      <!-- VIEW SETTINGS -->
      <div class="pt-1">
        <Link
          href="#"
          class="font-medium text-xs sm:text-sm text-blue-800 dark:text-blue-400 hover:underline"
        >
          <img src="/images/icons/news_view.png" width="40" height="40" />
        </Link>
      </div>

      <!-- Contractor Page -->
      <div class="">
        <Link
          href="#"
          class="font-medium text-xs sm:text-sm hover:underline text-blue-800 dark:text-blue-400"
        >
          <img
            src="/images/icons/contractorpage_b.png"
            width="45"
            height="45"
          />
        </Link>
      </div>

      <!-- Re-Posted -->
      <div class="pt-1">
        <ButtonRefresh></ButtonRefresh>
      </div>

      <!-- POSTING -->
      <div class="pt-1">
        <ButtonPost :isOpen="isOpen" @postClicked="postClicked"> </ButtonPost>
      </div>

      <!-- Hamburger -->
      <div class="-mr-2 flex items-center">
        <button
          @click="NavigationDropdown"
          class="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
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
  </header>
</template>

<style>
.header {
  height: 64px;
  background: #555;
  color: #0e0b15;
  width: 100%;
  transition: 1000ms;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
