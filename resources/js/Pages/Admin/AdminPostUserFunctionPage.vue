<template>
  <Head title="All Posts" />

  <Header
    v-if="isAdminUrl"
    :profile="profile"
    :post-search-filters="postSearchFilters"
    contentWidth="1500"
    :showit="showit"
    :show-post-buttons="false"
    color="rgb(229 231 235 / var(--tw-bg-opacity))"
  >
    <div class="bg-gray-200 mt-2 flex-col">
      <Card
        :shadowLevel="2"
        style="padding: 4px"
        bgColor="white"
        :padding="screenWidth < 640 ? '7px' : '20px'"
        class="mb-6"
      >
        <div class="flex justify-between">
          <PageTitle linkUrl="/admin" pageTitle="All Post" />
        </div>

        <div class="flex justify-between mt-4 mb-2 items-center">
          <div class="font-bold text-3xl text-black leading-tight"></div>
        </div>
        <div class="flex gap-4 items-center justify-between">
          <SearchInput
            class="mb-0 w-72"
            :barWidth="100"
            icon="iconamoon:search"
            placeholder="Search post..."
            @search-clicked="onSearch"
          />
        </div>
        <!-- if no usere -->

        <div class="flex flex-col mt-2">
          <v-table theme="light">
            <thead>
              <tr class="font-bold bg-black">
                <th
                  style="
                    text-align: left;
                    font-weight: bold;
                    color: white;
                    padding-left: 120px;
                    width: 300px;
                  "
                >
                  User
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Post Title
                </th>
                <th
                  style="
                    text-align: center;
                    font-weight: bold;
                    color: white;
                    width: 500px;
                  "
                >
                  Post Top Text
                </th>

                <th style="text-align: center; font-weight: bold; color: white">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(post, index) in posts"
                class="text-center"
                :key="post.id"
              >
                <td class="text-left">
                  <Link
                    :href="`/contractor/${post.user_id}`"
                    class="cursor-pointer flex justify-start items-start flex-none w=16 mt-[2px] p-2"
                  >
                    <div class="flex space-x-2 justify-between w-full">
                      <div class="flex justify-center items-center space-x-2">
                        <!-- <Link :href="route('user.show')" class="block "> -->
                        <div class="block">
                          <Avatar
                            :style="{
                              width: screenWidth >= 640 ? '3.8rem' : '3.2rem',
                              height: screenWidth >= 640 ? '3.8rem' : '3.2rem',
                            }"
                            :imageSrc="
                              post.user.profile.user_avatar ||
                              post.user.profile.company_logo
                            "
                          />
                        </div>

                        <div class="flex flex-col justify-center">
                          <h2
                            class="text-lg font-medium font-bold text-gray-900"
                          >
                            {{
                              post.user.profile.first_name +
                              " " +
                              post.user.profile.last_name
                            }}
                          </h2>
                          <div v-if="post.user.profile.company_name">
                            {{ post.user.profile.company_name }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </td>

                <td><div v-html="displayedBody1(post?.title)"></div></td>
                <td>
                  <div :class="`${post.body1 ? 'my-2' : ''}`">
                    <v-tooltip
                      max-width="300px"
                      :text="post.body1"
                      location="top"
                    >
                      <template v-slot:activator="{ props }">
                        <div v-bind="props">
                          <div
                            v-html="
                              displayedBody1(
                                post?.body1.substring(0, 300) + '...'
                              )
                            "
                          ></div>
                        </div>
                      </template>
                    </v-tooltip>
                  </div>
                </td>
                <td class="">
                  <button
                    @click.stop.prevent="togglePostStatus(post, index)"
                    :class="`bg-white px-4 h-10 py-1 uppercase text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-md border-[#1864ab] border-2 sm:border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95  self-center ${
                      loadingStatusChange ? 'opacity-80' : 'opacity-100'
                    } `"
                    :disabled="loadingStatusChange"
                  >
                    {{
                      loadingStatusChange &&
                      !post.active_post &&
                      loadingIndex > -1 &&
                      loadingIndex === index
                        ? "Deactivating"
                        : loadingStatusChange &&
                          post.active_post &&
                          loadingIndex > -1 &&
                          loadingIndex === index
                        ? "Activating"
                        : post.active_post
                        ? "Deactivate Post"
                        : "Activate Post"
                    }}
                  </button>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-skeleton-loader
            v-if="posts?.length === 0 && loading"
            type="table-tbody"
          >
          </v-skeleton-loader>
          <div class="w-full">
            <div
              v-if="posts?.length === 0 && !loading"
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No Posts Available
            </div>
          </div>
          <!-- <v-lazy
            :min-height="5"
            :options="{ threshold: 0 }"
            v-if="pagination && +currentPage !== +pagination?.last_page"
            @update:model-value="loadMorePosts"
            transition="fade-transition"
          ></v-lazy> -->
          <div
            v-if="+currentPage !== +pagination.last_page"
            ref="loadMoreIntersect"
            style="width: 5px; height: 5px"
          ></div>
          <div
            v-if="
              currentPage > 1 &&
              !loadingNextPage &&
              +currentPage === +pagination?.last_page
            "
            class="text-center font-bold mt-4"
          >
            No More Posts to Load
          </div>
          <v-skeleton-loader
            v-if="+currentPage !== +pagination?.last_page && loadingNextPage"
            type="table-tbody"
          >
          </v-skeleton-loader>
        </div>
      </Card>
    </div>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import axios from "axios";
import Avatar from "@/Components/Ratings/Avatar.vue";

import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import { Icon, loadIcons } from "@iconify/vue";

import Card from "@/Components/Card.vue";

import { ref, onMounted, computed, onBeforeMount } from "vue";
import SearchInput from "@/Components/Ratings/SearchInput.vue";

import { somethingWentWrong } from "@/helpers/utilities";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import PageTitle from "@/Components/PageTitle.vue";

// Province
const props = defineProps({
  profile: Object,
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});

const store = useStore();
const isAdminUrl = usePage().props.value.auth.user.posts_privileges;

const posts = ref([]);
const loading = ref(false);

const perPage = ref(15);
const searchTerm = ref("");
const pagination = ref(0);
const currentPage = ref(1);
const loadMoreIntersect = ref();
const loadingStatusChange = ref(false);
const loadingIndex = ref(-1);

const loadingNextPage = ref(false);

// Mounted
onMounted(async () => {
  loading.value = true;
  await fetchPosts();
  loading.value = false;
  if (posts.value.length > 0) {
    setTimeout(() => {
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("intersecting");
            loadMorePosts();
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
      });

      observer.observe(loadMoreIntersect.value);
    }, 100);
  }
});
onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});

// Computed

const screenWidth = computed(() => store.getters.screenWidth);
const displayedBody1 = (body1) => {
  let content = body1;
  if (content) {
    content = content.replace(/\/n/g, "<br>"); // Replace /n with <br>
  }
  return processUrls(content);
};
//Watch

//Methods

const loadMorePosts = async () => {
  loadingNextPage.value = true;
  let pageToLoad = currentPage.value + 1;
  await fetchPosts(perPage.value, pageToLoad);

  loadingNextPage.value = false;
  currentPage.value = pageToLoad;
};

// Fetch REviews
const fetchPosts = async (
  per_page = perPage.value,
  page = 1,
  append = true
) => {
  try {
    const response = await axios.get(
      `/api/admin/posts?search=${searchTerm.value}&per_page=${per_page}&page=${page}`,
      getAxiosConfig()
    );

    if (append) {
      posts.value = [...posts.value, ...response.data.posts];
    } else {
      posts.value = [...response.data.posts];
    }
    pagination.value = response.data?.pagination;
  } catch (err) {
    somethingWentWrong();
  }
};

const fetchPostWithLoading = async (append = true) => {
  loading.value = true;
  await fetchPosts(perPage.value, 1, append);
  loading.value = false;
};

const togglePostStatus = async (post, index) => {
  loadingIndex.value = index;
  loadingStatusChange.value = true;
  post.active_post = !post.active_post;
  try {
    const response = await axios.post(
      `/api/admin/posts/${post.id}`,
      post,
      getAxiosConfig()
    );
    if (response.data) {
    }
  } catch (err) {
    post.active_post = !post.active_post;
    somethingWentWrong(err.response.data.message, "inherit");
  } finally {
    loadingStatusChange.value = false;
  }
};

const onSearch = async (term) => {
  searchTerm.value = term;
  await fetchPostWithLoading(false);
};
const processUrls = (body) => {
  // Improved regex: capture URLs but stop if a '<' character (start of a potential HTML tag) is encountered
  const urlRegex = /(https?:\/\/[^<\s]+|www\.[^<\s]+)/g;
  return body?.replace(urlRegex, function (url) {
    let actualUrl = url.startsWith("http") ? url : "http://" + url;
    return `<a @click.self.stop="()=>{}" href="${actualUrl}" target="_blank">${url}</a>`;
  });
};
</script>

<style scoped>
button.selected {
  background-color: #3a357c;
  color: #fff;
}
button {
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}
.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > th,
.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
  padding: 0 8px;
}
</style>
