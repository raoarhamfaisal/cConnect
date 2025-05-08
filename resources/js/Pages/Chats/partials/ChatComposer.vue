<template>
  <!-- Dialog Footer -->
  <div
    class="flex justify-end p-2 pb-0 sm:p-3 shadow-lg overflow-hidden border-t-[1px] border-gray-400 min-h-[60px] sm:min-h-[70px]"
    ref="container"
  >
    <div class="flex gap-2 w-full items-start overflow-auto max-h-[165px]">
      <textarea
        v-model="message"
        @paste="adjustHeight"
        ref="messageAreaRef"
        @input="adjustHeight"
        :rows="1"
        placeholder="Type a message…"
        class="text-xl w-full py-1 min-h-[40px] overflow-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-400 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600"
        @keyup.enter="sendMessage"
      ></textarea>
      <Icon
        type="button"
        :disabled="loading"
        @click="sendMessage"
        :class="`w-8 h-8 sx:w-10 sx:h-10 cursor-pointer text-gray-500 apply-stroke ${
          loading ? 'opacity-40' : 'opacity-100'
        }`"
        icon="carbon:send-filled"
      />
    </div>
  </div>
  <v-dialog
    class="dialog-modal"
    v-model="loading"
    scrim="transparent"
    persistent
    width="auto"
  >
    <Card
      :shadowLevel="2"
      bgColor="#364fc7"
      :padding="screenWidth < 640 ? '7px' : '10px'"
    >
      <div class="text-white">Sending Message...</div>
      <v-progress-linear
        indeterminate
        color="#fff"
        class="mb-0"
      ></v-progress-linear>
    </Card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import Card from "@/Components/Card.vue";

const emit = defineEmits(["send"]);
const message = ref("");
const loading = ref(false);
const store = useStore();
const messageAreaRef = ref();
const container = ref();
const minHeight = ref(70);
const paddingHeight = ref(25);

const screenWidth = computed(() => store.getters.screenWidth);

onMounted(() => {
  if (screenWidth.value > 640) {
    minHeight.value = 70;
    paddingHeight.value = 25;
  } else {
    minHeight.value = 60;
    paddingHeight.value = 17;
  }
});

watch(
  () => screenWidth.value,
  (newVal) => {
    if (newVal > 640) {
      minHeight.value = 70;
      paddingHeight.value = 25;
    } else {
      minHeight.value = 60;
      paddingHeight.value = 17;
    }
  }
);

const adjustHeight = () => {
  nextTick(() => {
    messageAreaRef.value.style.height = "auto"; // Reset height first to get the correct scrollHeight

    messageAreaRef.value.style.height =
      messageAreaRef.value.scrollHeight + "px";
    if (
      messageAreaRef.value.scrollHeight < 165 &&
      messageAreaRef.value.scrollHeight + paddingHeight.value > minHeight.value
    ) {
      container.value.style.minHeight =
        messageAreaRef.value.scrollHeight + paddingHeight.value + "px";
    } else if (
      messageAreaRef.value.scrollHeight + paddingHeight.value <
      minHeight.value
    ) {
      container.value.style.minHeight = minHeight.value + "px";
    }
  });
};

async function sendMessage() {
  if (!message.value.trim()) return;

  loading.value = true;
  try {
    await emit("send", message.value);
    message.value = "";
    adjustHeight();
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.apply-stroke path {
  stroke-width: 2px;
}
</style>
