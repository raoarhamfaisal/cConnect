<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";

const store = useStore();

const screenWidth = computed(() => store.getters.screenWidth);

const qaList = [
  {
    question: "What is the News Feed?",
    answer: `<div>The News Feed is the heart of tContractor. This is the focal point of all the action going on in and around your geographical area. </div>
    Use the News Feed Community to help you run your business smarter & more profitably with fewer headaches! For best results, Scan the News Feed posts daily to get ideas, educate yourself, find people/contractors you can trust to hire or work for, Look for availability of jobs and so much more! <br><br> Post often to: 
        <ul class="list-disc pl-8">
          <li>Advertise your services! Let other Contractors know what you specialize in!</li>
          <li>Put your ‘Brag’ out there often. Show pictures of your work before & after. Build your Brand. The bottom line is the more people who see you, the more money you make!</li>
          <li>Post new jobs coming up that you may need help with?</li>
          <li>Got a question? Post it on the News Feed!</li>
          <li>Ran into a situation? Not sure of the best option? Post It!</li>
        </ul>`,
  },
  {
    question: "Why tContractor? We have Facebook, Instagram or Twitter!",
    answer: `True, these other Social Media platforms offer the community. But that community is diverse, with retail customers intermixed with contractors & sub-contractors. It’s hard to have a detailed conversation when the retail customer, and maybe yours, gets to read along with you! Plus, most of these communities are spread out over the entire world. What works in Texas may not work in California or New York! Or how hard is it to find a good quality contractor / sub-contractor that you have good reason to trust on one of these sites?<br> <br><div> <strong class="inline">tContractor</strong> is the answer to these issues. We are in the process of building a nationwide community of contractors that you can have access to, but we focus on local areas. See posts that only pertain to your trade, or see everything. It's your choice. Look for contractors for specific trades locally. And, more importantly, choose a contractor you can trust that has been truly reviewed by your peers!</div>`,
  },
  {
    question: "How much does it cost to advertise my company on tContractor?",
    answer: `<div>Member Contractor advertises their business for free via News Feed postings. We offer a FREE service with limited postings per month, but if you want/need more, subscribe and gain all the advantages of <strong class="inline">tContractor</strong>.</div>`,
  },
  {
    question: "What is Sub-Finder?",
    answer: `Sub-Finder allows you to find the right contractor/sub-contractor that fits your needs and cost! Use Sub-Finder to search for subs by city, region, state, name, trade, and more. If you upgrade from the FREE version, you can even save personal notes about that contractor and rate them as a Preferred contractor, Backup contractor, Possible, or reject them. <br><br> <strong class="inline">SIMPLE BUT POWERFUL!<strong class="inline">`,
  },
  {
    question: "What are Red Flag Customers?",
    answer: `Have you ever had a customer, sales rep, or another contractor you wouldn’t wish on your worst enemy?<br><br> Well, they are out there! If you’ve been in business long enough, you know that not all customers/jobs are good for you! <br><br> Would you like to know some of the experiences others had with a customer before you decide to do business with them? Check the Red Flag before you sign a contract with them. Could save you money and headaches! <br><br>As a contractor, you are always under review; here’s your chance to review those underhanded players! Keep them accountable!`,
  },
  {
    question: "More Business, More Profit, Less Headaches – What?",
    answer: `Sounds Great… How Do I Do This?<br><br><div> With <strong class="inline">tContractor</strong>, it easy!</div> <br>Here’s a simple example: You’re a Painter or a Carpenter, or a member of any Trade. You are on a job, and you have a good rapport with your customers; they mention that they are interested in a new cement patio or flooring. <br><br> Most contractors would refuse the opportunity or not take it seriously because they do not have the time, experience, how to bid, and so on.<br><div> With <strong class="inline">tContractor</strong>, you can now have the tools to do the job! Easily find the sub you can trust to represent you through Sub-Finder. Use the News Feed to answer your questions & and become more proficient with that trade; easily get the ins & outs!</div> <br> OR Here’s another… <br><br>You’re a Roofer or General Contractor. You have a customer 50 miles away, and your normal Painter doesn’t want to travel so far. What do you do? Go hire someone off the internet, social media, a friend of a friend, or even a painter you met at a gas station – No. <br><br><div>Use tContractor’s Sub-Finder to find a Painter in that city or close by. A painter that has good reviews in <strong class="inline">tContractor</strong>. Someone you can reasonably trust to represent your name. Less Headaches: The customer is happy with your quick turnaround, and you look good! You are Happy! NEXT!</div>`,
  },
  {
    question: "What are Trades?",
    answer: `Trades are what you do… If you are a landscaper, you would be a member of the Landscaping Trade Group. If you are a Painter, you would be a member of the Painting & Staining Group. Same if you did Concrete, you would be a member of the Concrete, Masonry & Foundations Group. <br><br><div> <strong class="inline">tContractor</strong> has 26+ trade groups. <strong class="inline">tContractor</strong> allows you to view only your trade group post or all the trade groups. Search only your trade group or others. Search locally, Regionally, Statewide, or nationally.</div>`,
  },
  {
    question: "What are Regions?",
    answer: `Regions are major metropolitan areas like Dallas/Ft.Worth and surrounding city & suburbs or Phoenix ane all its surrounding cities & suburbs. <br><br> <div><strong class="inline">tContractor</strong> lets you limit your searches & post views to regions as well as statewide & national.</div>`,
  },
];
</script>
<template>
  <div class="mt-4" id="faqs">
    <div class="flex justify-center" ref="whatVersionAreYourRef">
      <span class="text-5xl font-extrabold mb-4 text-center text-blue-rgba">
        FAQs
      </span>
    </div>
    <v-expansion-panels multiple class="">
      <v-expansion-panel
        class="rounded-lg-imp"
        v-for="(item, index) in qaList"
        :key="index"
      >
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          class="text-3xl-imp"
        >
          {{ item.question }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900"
          v-html="item.answer"
        >
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style scoped>
.text-3xl-imp {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
  font-weight: 600 !important;
  padding: 20px;
}

@media (max-width: 768px) {
  .text-3xl-imp {
    font-size: 1.25rem !important;
    line-height: 1.75rem !important;
    padding: 12px;
  }
}
</style>
