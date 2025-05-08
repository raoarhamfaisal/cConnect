<template>
  <Teleport to="body">
    <CustomDialog
      :submitText="$store.getters.translations?.update || 'Update'"
      @submit="handleSubmit"
      ref="dialogRef"
      @opened="onOpened"
      :loading="loading"
      :disabled="messageText.trim() === ''"
      title="Edit Message"
    >
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <textarea
            id="messageText"
            type="text"
            :rows="1"
            class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden"
            required
            v-model="messageText"
            ref="textRef"
            @keydown="insertTab"
            @input="adjustHeight"
            @paste="adjustHeight"
            placeholder="Type your message"
          />
          <InputError
            v-if="errorMessage"
            class="mt-2"
            :message="errorMessage"
          />
        </div>
      </form>
    </CustomDialog>
  </Teleport>
  <v-dialog
    v-if="showDialog"
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
      <div class="text-white">Updating message...</div>
      <v-progress-linear
        indeterminate
        color="#fff"
        class="mb-0"
      ></v-progress-linear>
    </Card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useStore } from "vuex";
import InputError from "@/Components/InputError.vue";
import Card from "@/Components/Card.vue";
import CustomDialog from "@/Components/Ratings/CustomDialog.vue";

const store = useStore();
const dialogRef = ref(null);
const textRef = ref(null);
const messageText = ref("");
const errorMessage = ref("");
const loading = ref(false);
const showDialog = ref(false);

const screenWidth = computed(() => store.getters.screenWidth);
const message = computed(() => store.getters["chat/editingMessage"]);

watch(
  () => message.value,
  (newVal) => {
    if (newVal) {
      messageText.value = newVal.body || "";
    }
  }
);

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
};

const handleSubmit = async () => {
  if (messageText.value.trim() === "") {
    errorMessage.value = "Message cannot be empty";
    return;
  }

  loading.value = true;
  try {
    await store.dispatch("chat/editMessage", {
      messageId: message.value.id,
      body: messageText.value.trim(),
    });
    dialogRef.value.closeDialog();
  } catch (error) {
    errorMessage.value = "Failed to update message. Please try again.";
    console.error("Error updating message:", error);
  } finally {
    loading.value = false;
  }
};

const adjustHeight = () => {
  nextTick(() => {
    if (textRef.value) {
      textRef.value.style.height = "auto";
      textRef.value.style.height = textRef.value.scrollHeight + "px";
    }
  });
};

const insertTab = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    messageText.value =
      messageText.value.substring(0, start) +
      "      " +
      messageText.value.substring(end);

    nextTick(() => {
      event.target.selectionStart = event.target.selectionEnd = start + 6;
    });
  }
};

const onOpened = () => {
  showDialog.value = true;
  adjustHeight();
};

defineExpose({ openDialog });
</script>
