<template>
  <Card
    :shadowLevel="1"
    :isInside="true"
    class="mt-3"
    bgColor="#f8f9fa"
    padding="20px"
  >
    <section>
      <div class="font-bold text-2xl mb-5">Contractor's Response</div>

      <header class="flex space-x-2 justify-between">
        <div class="flex justify-center items-center space-x-2">
          <div>
            <Avatar :imageSrc="contractor.profilePic" />
          </div>
          <div class="flex flex-col justify-center">
            <h2
              class="text-xl font-medium font-bold text-gray-900 dark:text-gray-100"
            >
              {{ contractor.firstName }} {{ contractor.lastName }}
            </h2>
            <div v-if="contractor.company">{{ contractor.company }}</div>
            <span v-if="contractor.city || contractor.state">{{
              contractor.city + " " + contractor.state
            }}</span>
          </div>
        </div>
      </header>
      <div>
        <div class="mt-2 ml-2 flex items-center space-x-4">
          <div class="font-bold flex justify-center items-center text-xl">
            {{ response.date }}
          </div>
        </div>
        <div class="">
          <p class="p-2 text-lg">
            {{
              showFullReview
                ? response.responseText
                : response.responseText.substring(0, 400) +
                  (response.responseText.length > 400 ? "..." : "")
            }}
            <span
              v-if="!showFullReview && response.responseText.length > 400"
              @click="showFullReview = true"
              class="cursor-pointer text-sky-700"
            >
              See more
            </span>
            <span
              v-if="showFullReview && response.responseText.length > 400"
              @click="showFullReview = false"
              class="cursor-pointer text-sky-700"
            >
              See less
            </span>
          </p>
        </div>
      </div>
    </section>
  </Card>
</template>

<script setup>
import Avatar from "../components/Avatar.vue";
import Card from "@/Components/Card.vue";
import { ref } from "vue";

defineProps(["response", "contractor"]);
const showFullReview = ref(false);
</script>

<style scoped></style>
