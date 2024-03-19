<template>
  <Head title="All Users" />

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
          <PageTitle linkUrl="/admin/regions/users" pageTitle="All Users" />
          <SearchInput
            class="mb-8 w-72"
            :barWidth="100"
            icon="iconamoon:search"
            placeholder="Search by name..."
            @search-clicked="onSearch"
          />
        </div>
        <!-- Region -->
        <heading-card
          class="mt-2"
          style="font-weight: 800; margin-bottom: 8px; font-size: 24px"
          :heading="`Region ${region_id} : ${region_name}`"
        />
        <!-- Filters -->
        <div class="border-gray-300 border-t-2 border-b-2">
          <heading-card class="mt-3" heading="Sort users by" />
          <div class="mb-4 mt-2">
            <div class="flex gap-3 flex-wrap">
              <Button
                :selected="sortBy === 'latest'"
                @onSelect="(selected) => handleFilterSelect(selected, 'latest')"
                >Latest</Button
              >

              <Button
                :selected="sortBy === 'oldest'"
                @onSelect="(selected) => handleFilterSelect(selected, 'oldest')"
                >Oldest</Button
              >
            </div>
          </div>
        </div>
        <div class="font-bold text-2xl text-blue-rgba leading-tight mt-6 mb-6">
          Users
        </div>
        <!-- if no usere -->

        <div class="flex flex-col">
          <v-table theme="light">
            <thead>
              <tr class="font-bold bg-black">
                <th style="text-align: center; font-weight: bold; color: white">
                  Region ID
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Active User
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  First Name
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Last Name
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Company Name
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Email
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Payment Verified
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Notes
                </th>
                <th style="text-align: center; font-weight: bold; color: white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" class="text-center" :key="user.id">
                <td>{{ user.profile?.region_id }}</td>
                <td>{{ user.profile?.active_user }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.profile?.company_name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.profile?.is_payment_verified }}</td>
                <td>
                  <Icon
                    icon="mdi:notes"
                    @click="
                      openNoteDialog(
                        user.profile?.notes_on_user,
                        user.profile?.user_id
                      )
                    "
                    class="mx-auto cursor-pointer hover:bg-gray-200 hover:rounded-md w-5 h-5"
                    color="241e6d"
                  />
                  <!-- {{ user.profile?.notes_on_user }} -->
                </td>
                <td class="flex gap-2 justify-center items-center">
                  <Icon
                    icon="mdi:edit"
                    color="#1864ab"
                    @click="openEditDialog(user)"
                    class="cursor-pointer hover:bg-gray-200 hover:rounded-md w-6 h-6"
                  />
                  <!-- <Icon
                    icon="mdi:delete"
                    color="#e03131"
                    class="cursor-pointer hover:bg-gray-200 hover:rounded-md w-6 h-6"
                  /> -->
                </td>
                <!-- <td>{{ user.appeals_privileges }}</td>
                <td>{{ user.payments_privileges }}</td>
                <td>{{ user.posts_privileges }}</td> -->
              </tr>
            </tbody>
          </v-table>
          <v-skeleton-loader
            v-if="users?.length === 0 && loading"
            type="table-tbody"
          >
          </v-skeleton-loader>
          <div class="w-full">
            <div
              v-if="users?.length === 0 && !loading"
              class="p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center"
            >
              No Users Available
            </div>
          </div>
          <v-lazy
            :min-height="5"
            :options="{ threshold: 0.5 }"
            v-if="+currentPage !== +pagination.last_page"
            @update:model-value="loadMoreUsers"
            transition="fade-transition"
          ></v-lazy>
          <div
            v-if="
              currentPage > 1 &&
              !loadingNextPage &&
              +currentPage === +pagination.last_page
            "
            class="text-center font-bold mt-4"
          >
            No More Users to Load
          </div>
          <v-skeleton-loader
            v-if="+currentPage !== +pagination.last_page && loadingNextPage"
            type="table-tbody"
          >
          </v-skeleton-loader>
        </div>
      </Card>
    </div>
    <CustomDialog
      dialogWidth="width780px"
      :showFooter="false"
      :disableOutSideClick="false"
      ref="notesDialogRef"
      @closed="onCloseNote"
      title="Notes"
    >
      <div class="flex gap-2 my-4 mx-2">
        <div class="w-full">
          <Card
            :shadowLevel="1"
            :isInside="true"
            :padding="'5px'"
            class="w-full self-stretch h-full"
            bgColor="#edfaff"
          >
            <p
              class="text-sm font-semibold py-1 px-3 text-grey-600"
              v-if="!editAdmitNoteText && note && !isTyping"
              style="height: 10.4rem"
            >
              {{ note }}
            </p>
            <textarea
              v-else
              v-model="note"
              @blur="stopTyping"
              ref="adminTextAreaRef"
              style="height: 10.4rem; border: 1px solid grey"
              @keydown="saveNotes"
              placeholder="Type your Notes"
              class="text-sm w-full py-1 px-3 focus:shadow-none focus:ring-gray-600 focus:rounded font-semibold text-grey-600 border-none resize-none bg-transparent rounded"
              :rows="numberOfRows"
            ></textarea>
          </Card>
        </div>
        <div class="flex gap-2 flex-col items-center self-start">
          <button
            class="rounded-md border-2 w-28 px-2 py-1 py-2 text-sm text-center"
            @click="focusTextarea"
          >
            Edit Notes
          </button>
        </div>
      </div>
    </CustomDialog>
    <CustomDialog
      dialogWidth="width780px"
      :disableOutSideClick="false"
      ref="editDialogRef"
      :loading="loadingEdit"
      @submit="handleEditSubmit"
      :disabled="disabled"
      @closed="onCloseUserEdit"
      title="Edit User"
    >
      <div class="py-2 p-4">
        <div
          class="mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4"
        >
          <div>
            <InputLabel class="font-bold" for="region_id" value="Region ID*" />
            <TextInput
              id="region_id"
              type="text"
              class="mt-1 block w-full"
              placeholder="Type your Region ID"
              @input="clearErrors('region_id')"
              v-model="userToEdit.profile.region_id"
              required
            />
            <InputError class="mt-2" :message="errors.region_id" />
          </div>

          <div>
            <InputLabel
              class="font-bold"
              for="first_name"
              value="First Name*"
            />
            <TextInput
              id="first_name"
              type="text"
              class="mt-1 block w-full"
              required
              v-model="userToEdit.first_name"
              placeholder="Type your first name"
              @input="clearErrors('first_name')"
              autocomplete="given-name"
            />
            <InputError class="mt-2" :message="errors.first_name" />
          </div>

          <div>
            <InputLabel class="font-bold" for="last_name" value="Last Name*" />
            <TextInput
              id="last_name"
              type="text"
              class="mt-1 block w-full"
              v-model="userToEdit.last_name"
              required
              placeholder="Type your last name"
              @input="clearErrors('last_name')"
              autocomplete="family-name"
            />
            <InputError class="mt-2" :message="errors.last_name" />
          </div>
          <div>
            <InputLabel
              class="font-bold"
              for="company_name"
              value="Company Name*"
            />
            <TextInput
              id="company_name"
              type="text"
              class="mt-1 block w-full"
              placeholder="Type your Company name"
              @input="clearErrors('company_name')"
              v-model="userToEdit.profile.company_name"
              required
              autocomplete="company_name"
            />
            <InputError class="mt-2" :message="errors.company_name" />
          </div>
          <div>
            <InputLabel class="font-bold" for="email" value="Email*" />
            <TextInput
              id="email"
              type="tel"
              class="mt-1 block w-full"
              v-model="userToEdit.email"
              @input="clearErrors('email')"
              required
              autocomplete="email"
            />
            <InputError class="mt-2" :message="errors.email" />
          </div>
        </div>
        <div class="flex gap-4 mt-2">
          <v-switch
            class="admin-user-fuction-switch"
            v-model="userToEdit.profile.active_user"
            hide-details
            :true-value="1"
            :false-value="0"
            label="Active User"
            color="success"
          ></v-switch>
          <InputError class="mt-2" :message="errors.active_user" />
        </div>
        <div class="flex gap-4">
          <v-switch
            class="admin-user-fuction-switch"
            v-model="userToEdit.profile.is_payment_verified"
            hide-details
            :true-value="1"
            :false-value="0"
            label="Payment Verified"
            color="success"
          ></v-switch>
          <InputError class="mt-2" :message="errors.is_payment_verified" />
        </div>
      </div>
    </CustomDialog>
  </Header>
</template>

<script setup>
import Header from "@/Layouts/Header.vue";
import { Head, usePage } from "@inertiajs/inertia-vue3";
import Button from "@/Components/Ratings/Button.vue";
import axios from "axios";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

import HeadingCard from "@/Components/Ratings/HeadingCard.vue";

import { Icon } from "@iconify/vue";

import Card from "@/Components/Card.vue";

import {
  ref,
  onMounted,
  computed,
  onBeforeMount,
  watch,
  reactive,
  nextTick,
} from "vue";
import SearchInput from "@/Components/Ratings/SearchInput.vue";

import {
  filterBadWordsWithoutValue,
  somethingWentWrong,
  changesSaved,
} from "@/helpers/utilities";
import { useStore } from "vuex";
import { Inertia } from "@inertiajs/inertia";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import PageTitle from "@/Components/PageTitle.vue";

// State
const props = defineProps({
  profile: Object,
  region_id: [String, Number],
  region_name: [String, Number],
  showit: Boolean,
  postSearchFilters: {
    type: Object,
    default: () => ({
      postSearch: "",
    }),
  },
});

const store = useStore();
const isAdminUrl = usePage().props.value.auth.user.appeals_privileges === 1;
const currentPage = ref(1);
const users = ref([]);
const loading = ref(false);
const sortBy = ref("latest");
const perPage = ref(15);
const searchTerm = ref("");
const pagination = ref(0);
const loadingNextPage = ref(false);
const notesDialogRef = ref();
const note = ref("");
const user_id = ref("");
const editAdmitNoteText = ref(false);
const adminTextAreaRef = ref();
const isTyping = ref(false);
const userToEdit = ref({});
const loadingEdit = ref(false);
const disabled = ref(false);
const editDialogRef = ref();
const errors = reactive({
  first_name: "",
  last_name: "",
  company_name: "",
  email: "",
  is_payment_verified: "",
  region_id: "",
  active_user: "",
});

// Mounted
onMounted(async () => {
  loading.value = true;
  await fetchUsers();
  loading.value = false;
});
onBeforeMount(() => {
  if (!isAdminUrl && window.location.pathname !== "/post") {
    Inertia.visit("/post");
  }
});

const validateForm = () => {
  let isValid = true;

  // Reset errors
  for (let field in errors) {
    errors[field] = "";
  }
  // Validate first_name
  if (!userToEdit.value.first_name.trim()) {
    errors.first_name = "First name is required";
    isValid = false;
  }
  if (!userToEdit.value.last_name.trim()) {
    errors.last_name = "Last name is required";
    isValid = false;
  }
  // Validate company_name
  if (!userToEdit.value.profile.company_name.trim()) {
    errors.company_name = "Company name is required";
    isValid = false;
  }

  // Validate region_id
  if (userToEdit.value.profile.region_id === "") {
    errors.region_id = "Region Id is required";
    isValid = false;
  }

  // Validate state
  if (userToEdit.value.profile.active_user === "") {
    errors.active_user = "Active User is required";
    isValid = false;
  }

  // Validate is_payment_verified
  if (userToEdit.value.profile.is_payment_verified === "") {
    errors.is_payment_verified = "Payment Verified is required";
    isValid = false;
  }
  if (!userToEdit.value.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
      userToEdit.value.email
    ) ||
    !userToEdit.value.email.includes(".")
  ) {
    errors.email = "Invalid email format";
    isValid = false;
  }
  return isValid;
};
const clearErrors = (field) => {
  console.log("Clear errors", field);
  if (
    userToEdit.value[field]?.trim() ||
    userToEdit.value.profile[field].trim()
  ) {
    errors[field] = "";
  }
};

//Computed

const numberOfRows = computed(() => {
  if (!note.value) return 1; // if there's no content, return a default row number
  const charsPerLine = 90;

  return Math.ceil(note.value.length / charsPerLine);
});

const screenWidth = computed(() => store.getters.screenWidth);

// Methods
const loadMoreUsers = async () => {
  loadingNextPage.value = true;
  let pageToLoad = currentPage.value + 1;
  await fetchUsers(perPage.value, pageToLoad);

  loadingNextPage.value = false;
  currentPage.value = pageToLoad;
};

const handleFilterSelect = async (selected, sortByRate) => {
  if (selected) {
    sortBy.value = sortByRate;
  }
  users.value = [];

  await fetchUsersWithLoading(false);
};

// Fetch REviews
const fetchUsers = async (
  per_page = perPage.value,
  page = 1,
  append = true
) => {
  let sortByDate = "";
  if (sortBy.value === "latest" || sortBy.value === "oldest") {
    sortByDate = sortBy.value;
  }
  try {
    const response = await axios.get(
      `/api/admin/users/${props.region_id}/all?search=${searchTerm.value}&per_page=${per_page}&page=${page}&sort_by_date=${sortByDate}`,
      getAxiosConfig()
    );
    console.log(response, "response");
    if (append) {
      users.value = [...users.value, ...response.data.users];
    } else {
      users.value = [...response.data.users];
    }
    pagination.value = response.data.pagination;
  } catch (err) {
    somethingWentWrong();
  }
};
const fetchUsersWithLoading = async (append = true) => {
  loading.value = true;
  await fetchUsers(perPage.value, 1, append);
  loading.value = false;
};

const onSearch = async (term) => {
  searchTerm.value = term;
  await fetchUsersWithLoading(false);
};
const openNoteDialog = (userNote, id) => {
  note.value = userNote;
  user_id.value = id;
  notesDialogRef.value.openDialog();
};

const openEditDialog = (user) => {
  userToEdit.value = JSON.parse(JSON.stringify(user));
  editDialogRef.value.openDialog();
};
const focusTextarea = async () => {
  editAdmitNoteText.value = true;
  await nextTick();
  adminTextAreaRef.value.focus();
};
const stopTyping = () => {
  isTyping.value = false;
  editAdmitNoteText.value = false;
};
let saveTimeout = null;

const saveNotes = () => {
  isTyping.value = true;
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Start a new timer
  saveTimeout = setTimeout(async () => {
    const notes = {
      notes_on_user: note.value
        ? filterBadWordsWithoutValue(note.value)
        : note.value,
    };
    console.log(notes, note.value, "selectedNote");
    try {
      const response = await axios.post(
        `/api/admin/users/${user_id.value}`,
        notes,
        getAxiosConfig()
      );
      console.log(response, "response");
      if (response.data) {
        users.value.forEach((user, index) => {
          if (user.profile.user_id === user_id.value) {
            users.value[index].profile.notes_on_user = note.value;
          }
        });
      }
    } catch (err) {
      somethingWentWrong(err.response.data.message, 450, 20000);
    }
  }, 1000);
};
const onCloseNote = () => {
  note.value = "";
  user_id.value = "";
};
const onCloseUserEdit = () => {
  userToEdit.value = {};
};
const handleEditSubmit = async () => {
  if (validateForm()) {
    console.log(userToEdit.value, "userToEdit.value");
    const updateUser = {
      region_id: +userToEdit.value.profile.region_id,
      active_user: +userToEdit.value.profile.active_user,
      is_payment_verified: +userToEdit.value.profile.is_payment_verified,
      company_name: userToEdit.value.profile.company_name,
      first_name: userToEdit.value.first_name,
      last_name: userToEdit.value.last_name,
      email: userToEdit.value.email,
    };
    loadingEdit.value = true;
    disabled.value = true;
    try {
      const response = await axios.post(
        `/api/admin/users/${userToEdit.value.profile.user_id}`,
        updateUser,
        getAxiosConfig()
      );
      console.log(response, "response");
      if (response.data) {
        users.value.forEach((user, index) => {
          if (user.profile.user_id === userToEdit.value.profile.user_id) {
            users.value[index].profile.region_id =
              userToEdit.value.profile.region_id;
            users.value[index].profile.active_user =
              userToEdit.value.profile.active_user;
            users.value[index].profile.is_payment_verified =
              userToEdit.value.profile.is_payment_verified;
            users.value[index].profile.company_name =
              userToEdit.value.profile.company_name;
            users.value[index].first_name = userToEdit.value.first_name;
            users.value[index].last_name = userToEdit.value.last_name;
            users.value[index].email = userToEdit.value.email;
          }
        });
        changesSaved(response.data.message);
        setTimeout(() => {
          editDialogRef.value.closeDialog();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      somethingWentWrong(err.response.data.message, "inherit");
    } finally {
      loadingEdit.value = false;
      disabled.value = false;
    }
  }
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
