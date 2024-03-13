<script setup>
import SignUpLayout from "@/Layouts/SignUpLayout.vue";
import WelcomeHeader from "@/Components/Welcome/WelcomeHeader.vue";
import WelcomeFooter from "@/Components/Welcome/WelcomeFooter.vue";

import { Head } from "@inertiajs/inertia-vue3";

const props = defineProps({
  showit: Boolean,
});
</script>

<template>
  <SignUpLayout>
    <Head title="Careers" />
    <WelcomeHeader :showNewsFeed="true" :showit="showit" :showSignUp="true" />

    <div class="bg-gray-100 min-h-screen p-5">
      <h1 class="text-4xl font-bold mb-6">Join Our Network of Contractors</h1>
      <p class="text-lg mb-6">
        At tcontractor.com, we're building a community where contractors help
        each other succeed. Whether you're looking to hire, seek guidance, or
        find new opportunities, you’re in the right place.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card 1 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">Hire Talented Contractors</h2>
          <p class="text-gray-700">
            Find skilled professionals and grow your projects. Navigate through
            our vast network of contractors to hire experienced individuals in
            various fields.
          </p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">Find Work Opportunities</h2>
          <p class="text-gray-700">
            Explore new work opportunities and collaborate on exciting projects.
            Our platform connects you with contractors looking for your
            expertise.
          </p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">Offer and Receive Help</h2>
          <p class="text-gray-700">
            Engage in a give-and-take of valuable industry insights. Support
            other contractors and find assistance when you need it.
          </p>
        </div>

        <!-- Card 4 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">Mentor and Be Mentored</h2>
          <p class="text-gray-700">
            Invest in mutual growth by participating in our mentoring services.
            Share your knowledge and gain new perspectives from seasoned
            professionals.
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">Spot Red Flag Customers</h2>
          <p class="text-gray-700">
            Easily identify difficult customers through our red flag system.
            Learn from others' experiences to ensure a smooth workflow and avoid
            potential pitfalls.
          </p>
        </div>

        <!-- Card 6 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-3">
            Stay Updated with News Feed
          </h2>
          <p class="text-gray-700">
            Keep yourself informed about the latest opportunities, trends, and
            community updates. Be the first to know and stay ahead of the
            competition.
          </p>
        </div>
      </div>
      <div v-if="!showit" class="flex justify-center space-x-3">
        <Link
          class="group flex items-center justify-between rounded-xl border border-red-500 bg-red-500 px-5 py-3 mt-8 transition-colors hover:bg-red-800 focus:outline-none focus:ring"
          :href="route('signup')"
        >
          <span
            class="text-lg font-bold text-white uppercase transition-colors group-hover:font-extrabold group-active:text-indigo-500"
          >
            Get Started
          </span>
          <!-- Arrow -->
          <span
            class="ml-4 flex-shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </Link>
      </div>
      <!-- <div class="mt-10">
        <a
          href="#"
          class="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600"
        >
          Get Started
        </a>
      </div> -->
    </div>
  </SignUpLayout>
  <WelcomeFooter :showit="showit" />
</template>
