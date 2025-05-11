<template>
  <aside class="w-64 bg-white border-r overflow-auto">
    <div class="flex p-3 gap-4 mb-2 items-center">
      <Link href="/post">
        <Icon class="w-7 h-7" icon="icomoon-free:arrow-left" color="black" />
      </Link>
      <div class="flex items-center gap-2">
        <Icon
          icon="material-symbols:chat"
          color="#3b82f6"
          width="30"
          height="30"
        />
        <div class="font-extrabold text-2xl text-[#021d91] leading-tight">
          Chats
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="px-3">
      <div
        v-for="i in 5"
        :key="i"
        class="animate-pulse flex items-center p-3 border-b border-gray-100"
      >
        <div class="rounded-full bg-gray-200 min-w-[40px] h-10 mr-3"></div>
        <div class="flex-1">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Content State -->
    <ul v-else>
      <li
        v-for="thread in threads"
        :key="thread.partner.id"
        @click="selectThread(thread.partner.id)"
        :class="[
          'flex items-center p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100 transition-colors duration-150 relative',
          thread.conversation_id === currentId
            ? 'bg-green-50 border-l-4 border-l-green-500'
            : '',
        ]"
      >
        <Avatar
          :image-src="thread.partner.avatar"
          image-class="min-w-[40px] h-10 mr-3"
          :is-not-self="true"
          :is-contractor="thread.partner.is_contractor"
        />
        <div class="flex-1 sm:w-[185px] pr-2">
          <div class="font-semibold truncate">
            {{ thread.partner.first_name }} {{ thread.partner.last_name }}
          </div>
          <div class="text-sm text-gray-500 truncate">
            {{ thread.last_message?.body || "" }}
          </div>
        </div>

        <!-- Unread message counter -->
        <div
          v-if="
            thread.conversation_id === currentId &&
            showBadge[thread.conversation_id]
          "
          class="absolute right-3 top-3 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold min-w-[20px] h-5 px-1"
        >
          {{ thread.unread_count }}
        </div>

        <div
          v-else-if="
            thread.conversation_id !== currentId && thread.unread_count > 0
          "
          class="absolute right-3 top-3 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold min-w-[20px] h-5 px-1"
        >
          {{ thread.unread_count }}
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import Avatar from "@/Components/Ratings/Avatar.vue";
import { Icon } from "@iconify/vue";
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  threads: Array,
  currentId: [String, Number, null],
});

const emit = defineEmits(["select"]);
const store = useStore();
const loading = computed(() => store.state.chat?.loading || false);

// reactive flags per conversation
const showBadge = reactive({});

// watch for unread_count increases on the current thread
watch(
  () =>
    props.threads.map((t) => ({
      id: t.conversation_id,
      count: t.unread_count,
    })),
  (newList, oldList = []) => {
    newList.forEach(({ id, count }) => {
      const prev = oldList.find((o) => o.id === id)?.count || 0;
      if (id === props.currentId && count > prev) {
        showBadge[id] = true;
        setTimeout(() => {
          showBadge[id] = false;
        }, 1000);
      }
    });
  },
  { deep: true }
);

function selectThread(partnerId) {
  emit("select", partnerId);
}
</script>
