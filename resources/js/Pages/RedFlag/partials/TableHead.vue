<template>
  <div class="font-bold header-container bg-black">
    <div
      style="text-align: center; font-weight: bold; color: white"
      :class="`w-[50px] header-cell`"
    >
      {{ translations && translations.view }}
    </div>
    <div
      :class="`w-full sm:w-[31%] header-cell`"
      style="text-align: left; font-weight: bold; color: white"
    >
      <div class="flex gap-2 justify-start items-center">
        <div>{{ translations && translations.customer_name }}</div>

        <div class="flex flex-col">
          <Icon
            icon="el:caret-up"
            class="inline-block cursor-pointer w-3 h-3"
            @click="emitSortEvent('name_of_the_contractor_or_customer', 'asc')"
          ></Icon>
          <Icon
            icon="el:caret-up"
            class="inline-block cursor-pointer w-3 h-3"
            :rotate="2"
            @click="emitSortEvent('name_of_the_contractor_or_customer', 'desc')"
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
      {{ translations && translations.complaint }}
    </div>
    <div
      :class="` w-[20%] header-cell`"
      v-if="screenWidth >= 640"
      style="text-align: center; font-weight: bold; color: white"
    >
      <div class="flex gap-2 justify-center items-center">
        <div>{{ translations && translations.region }}</div>

        <div class="flex flex-col">
          <Icon
            @click="emitSortEvent('region_id', 'asc')"
            icon="el:caret-up"
            class="inline-block cursor-pointer w-3 h-3"
          ></Icon>
          <Icon
            icon="el:caret-up"
            @click="emitSortEvent('region_id', 'desc')"
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
            @click="emitSortEvent('updated_at', 'asc')"
            class="inline-block cursor-pointer w-3 h-3"
          ></Icon>
          <Icon
            icon="el:caret-up"
            @click="emitSortEvent('updated_at', 'desc')"
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
const emit = defineEmits(["sortChanged"]);

//Computed
const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);

const emitSortEvent = (sortField, sortOrder) => {
  emit("sortChanged", { sortField, sortOrder });
};
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
.inline-block.cursor-pointer:hover {
  color: #d1d1d1; /* Light grey color on hover */
}

.inline-block.cursor-pointer:active {
  color: #a8a8a8; /* Darker grey color on click */
}
</style>
