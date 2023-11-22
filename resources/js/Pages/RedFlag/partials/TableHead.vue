<template>
  <div class="font-bold header-container bg-black">
    <div
      style="text-align: center; font-weight: bold; color: white"
      :class="`w-[50px] header-cell`"
    >
      View
    </div>
    <div
      :class="`w-full sm:w-[31%] header-cell`"
      style="text-align: left; font-weight: bold; color: white"
    >
      <div class="flex gap-2 justify-start items-center">
        <div>Customer Name</div>

        <div class="flex flex-col">
          <Icon
            icon="el:caret-up"
            class="inline-block cursor-pointer w-3 h-3"
          ></Icon>
          <Icon
            icon="el:caret-up"
            class="inline-block cursor-pointer w-3 h-3"
            :rotate="2"
          ></Icon>
        </div>
      </div>
    </div>
    <div
      v-if="screenWidth >= 640"
      :class="` w-[34%] header-cell`"
      style="
        text-align: left;
        font-weight: bold;
        color: white;
        padding-left: 20px;
      "
    >
      Complaint
    </div>
    <div
      :class="` w-[20%] header-cell`"
      v-if="screenWidth >= 640"
      style="text-align: center; font-weight: bold; color: white"
    >
      <div class="flex gap-2 justify-center items-center">
        <div>Region</div>

        <div class="flex flex-col">
          <Icon
            icon="el:caret-up"
            class="inline-block cursor-pointer w-3 h-3"
          ></Icon>
          <Icon
            icon="el:caret-up"
            class="inline-block cursor-pointer w-3 h-3"
            :rotate="2"
          ></Icon>
        </div>
      </div>
    </div>
    <div
      :class="`w-[20%] sm:w-[15%] header-cell`"
      style="text-align: center; font-weight: bold; color: white"
    >
      <div class="flex gap-2 justify-center items-center">
        <div>Date</div>

        <div class="flex flex-col">
          <Icon
            icon="el:caret-up"
            class="inline-block cursor-pointer w-3 h-3"
          ></Icon>
          <Icon
            icon="el:caret-up"
            class="inline-block cursor-pointer w-3 h-3"
            :rotate="2"
          ></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

//Computed
const screenWidth = computed(() => store.getters.screenWidth);
</script>

<style scoped>
div {
  /* padding: 8px 12px;
  font-weight: 600; */
}
.header-container > .header-cell {
  padding: 0 6px;
}
.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
}
</style>
