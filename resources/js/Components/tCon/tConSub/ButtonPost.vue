<script>
import { mapGetters } from "vuex";
import DialogUpgradeToPlatinum from "@/Components/DialogUpgradeToPlatinum.vue";

export default {
  components: {
    DialogUpgradeToPlatinum,
  },
  props: {
    isOpen: Boolean,
  },

  methods: {
    postClicked() {
      console.log(this.userDetails.nf_ppm, this.userVersion, "userVersio");
      if (this.userDetails.nf_ppm === 0) {
        if (this.userVersion === 1) {
          this.$store.commit("setIsUpgradeToGoldPlatinumDialogOpen", true);
          return;
        } else if (this.userVersion === 2) {
          this.$refs.upgradeToPlatinumDialogRef.openDialog();
          return;
        }
      }
      this.$emit("postClicked", true);
    },
  },
  computed: {
    ...mapGetters(["translations", "userDetails", "userVersion"]),
  },
};
</script>

<template>
  <DialogUpgradeToPlatinum ref="upgradeToPlatinumDialogRef" />

  <button
    @click="postClicked(isOpen)"
    class="flex flex-shrink-0 items-center justify-center mt-0 mx-auto px-2 py-1 font-bold text-sm x350:text-lg tracking-tight sm:tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
  >
    <img
      src="/images/icons/post_b.png"
      class="w-[16px] h-[16px] x350:w-5 x350:h-5 xs:w-[23px] xs:h-[23px]"
    />
    <span class="mx-[2px] x350:mx-1 text-sm x350:text-base xs:text-lg">{{
      translations && translations.post
    }}</span>
    <div
      v-if="
        userDetails.nf_ppm !== 99 &&
        userVersion !== 3 &&
        userDetails &&
        Object.keys(userDetails).length > 0
      "
      class="flex justify-center xs:ml-[2px] items-center px-2 py-[5px] text-[9px] xs:text-[11px] rounded-full bg-gray-600 text-white leading-[1]"
    >
      {{ userDetails.nf_ppm }}
    </div>
  </button>
</template>
