<script>
import { mapGetters } from "vuex";
// import { InertiaLink } from "@inertiajs/inertia-vue3";
// import { Link, useForm } from '@inertiajs/inertia-vue3';

// components: { InertiaLink, Link, useForm }

export default {
  props: {
    isOpen: Boolean,
  },

  methods: {
    postClicked(isOpen) {
      isOpen: true, this.$emit("postClicked", this.isOpen);
    },
  },
  computed: {
    ...mapGetters(["translations"]),
  },
};
</script>

<template>
  <button
    @click="postClicked(isOpen)"
    class="flex flex-shrink-0 items-center justify-center mt-0 mx-auto px-2 py-1 font-bold text-sm x350:text-lg tracking-tight sm:tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
  >
    <img
      src="/images/icons/post_b.png"
      class="w-5 h-5 x350:w-[23px] x350:h-[23px]"
    />
    <span class="mx-1">{{ translations && translations.post }}</span>
  </button>
</template>
