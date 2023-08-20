<template>
  <section>
    <header class="flex space-x-2 justify-between">
      <div class="flex space-x-2">
        <div>
          <Avatar
            imageSrc="http://0.0.0.0/images/avatars/I3UQW3tApC1DHTE8Onj9IT060vVGZZBWZEaEIRX2"
          />
        </div>
        <div class="flex items-center flex-wrap justify-center">
          <h2
            class="text-xl font-medium font-bold text-gray-900 dark:text-gray-100"
          >
            John Doe
          </h2>
        </div>
      </div>
      <div>
        <Badge
          class="bg-orange-500"
          :style="{
            backgroundColor: '',
          }"
          >Under Appeal</Badge
        >
      </div>
    </header>
    <div>
      <div class="mt-2 flex items-center space-x-4">
        <StarRating :rating="4.5" :isIndicatorActive="true" />
        <div class="font-bold flex justify-center items-center text-xl">
          03/03/2023
        </div>
      </div>
      <div class="mt-2">
        <!-- <Badge
            v-for="(option, index) in options"
            :key="option.name"
            class="my-2 mx-2 space-x-2 flex"
            :style="{
              backgroundColor: index % 2 === 0 ? '#5f3dc4' : '#364fc7',
            }"
            >{{ option.name }}</Badge
          > -->
        <p class="p-2 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          iste perspiciatis doloribus enim tempora eaque sed omnis inventore,
          suscipit, eligendi et rem autem iure quibusdam incidunt maiores
          voluptates deserunt delectus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Repudiandae iste perspiciatis doloribus enim tempora
          eaque sed omnis inventore, suscipit, eligendi et rem autem iure
          quibusdam incidunt maiores voluptates deserunt delectus.
        </p>
        <Badge
          v-for="(option, index) in options"
          :key="option.name"
          class="my-2 mx-2 space-x-2 flex"
          :style="{
            backgroundColor: index % 2 === 0 ? '#5f3dc4' : '#364fc7',
          }"
          >{{ option.name }}</Badge
        >
      </div>
      <!-- <div class="font-bold text-2xl mt-5">Contractor's Response</div> -->
    </div>
  </section>
  <Response />
</template>

<script setup>
import Avatar from "../components/Avatar.vue";
import StarRating from "../components/StarRating.vue";
import Badge from "../components/Badge.vue";
import Response from "./Response.vue";

const options = [
  { id: "trade1", name: "Supplier & Advertiser (all trades)" },
  { id: "trade2", name: "Construction & Remodeling" },
  { id: "trade5", name: "Landscape" },
  { id: "trade6", name: "Earthworks, Drives & Parking Lots" },
  { id: "trade7", name: "Roofing & Solar" },
  { id: "trade8", name: "Gutters, Siding & Fencing" },
];
</script>

<style scoped></style>
