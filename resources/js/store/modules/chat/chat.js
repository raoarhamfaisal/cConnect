import axios from "axios";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";

export default {
  namespaced: true,
  state: () => ({
    threads: [],
    partner: null,
    currentId: null,
    messages: [],
    loading: false,
    messagesLoading: false,
    editingMessage: null,
    onlineUsers: [],
  }),
  getters: {
    threads: (s) => s.threads,
    partner: (s) => s.partner,
    currentId: (s) => s.currentId,
    currentThread: (s) =>
      s.threads.find((t) => t.conversation_id === s.currentId),
    messages: (s) => s.messages,
    loading: (s) => s.loading,
    messagesLoading: (s) => s.messagesLoading,
    editingMessage: (s) => s.editingMessage,
    totalUnreadCount: (s) => {
      return s.threads.reduce((total, thread) => {
        return total + (thread.unread_count || 0);
      }, 0);
    },
  },
  mutations: {
    SET_ONLINE_USERS(state, ids) {
      state.onlineUsers = ids;
    },
    ADD_ONLINE_USER(state, id) {
      if (!state.onlineUsers.includes(id)) {
        state.onlineUsers.push(id);
      }
    },
    REMOVE_ONLINE_USER(state, id) {
      state.onlineUsers = state.onlineUsers.filter((x) => x !== id);
    },
    SET_PARTNER(state, p) {
      state.partner = p;
    },
    SET_THREADS(state, t) {
      state.threads = t;
    },
    SET_CURRENT(state, id) {
      state.currentId = id;

      // DO NOT automatically set unread count to 0 here
      // This will be handled explicitly through user interaction
    },
    SET_MESSAGES(state, m) {
      state.messages = m;
    },
    ADD_MESSAGE(state, m) {
      state.messages.push(m);

      // Update the last_message in threads
      const threadIndex = state.threads.findIndex(
        (t) => t.conversation_id === state.currentId
      );
      if (threadIndex !== -1) {
        state.threads[threadIndex].last_message = m;

        // Move this conversation to the top of the list
        if (threadIndex > 0) {
          const thread = state.threads.splice(threadIndex, 1)[0];
          state.threads.unshift(thread);
        }
      }
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_MESSAGES_LOADING(state, status) {
      state.messagesLoading = status;
    },
    SET_EDITING_MESSAGE(state, message) {
      state.editingMessage = message;
    },
    UPDATE_MESSAGE(state, updatedMessage) {
      const index = state.messages.findIndex((m) => m.id === updatedMessage.id);
      if (index !== -1) {
        state.messages[index] = updatedMessage;
      }

      // Also update in threads if it's the last message
      const threadIndex = state.threads.findIndex(
        (t) => t.conversation_id === state.currentId
      );
      if (
        threadIndex !== -1 &&
        state.threads[threadIndex].last_message &&
        state.threads[threadIndex].last_message.id === updatedMessage.id
      ) {
        state.threads[threadIndex].last_message = updatedMessage;
      }
    },
    DELETE_MESSAGE(state, messageId) {
      const index = state.messages.findIndex((m) => m.id === messageId);
      if (index !== -1) {
        // For soft delete - mark as deleted but keep in array
        state.messages[index].deleted = true;
        state.messages[index].body = null;

        // For hard delete - remove from array
        // state.messages.splice(index, 1);
      }

      // Update in threads if it's the last message
      const threadIndex = state.threads.findIndex(
        (t) => t.conversation_id === state.currentId
      );
      if (
        threadIndex !== -1 &&
        state.threads[threadIndex].last_message &&
        state.threads[threadIndex].last_message.id === messageId
      ) {
        state.threads[threadIndex].last_message.deleted = true;
        state.threads[threadIndex].last_message.body = null;
      }
    },
    UPDATE_THREAD_UNREAD_COUNT(state, { conversationId, count }) {
      const threadIndex = state.threads.findIndex(
        (t) => t.conversation_id === conversationId
      );
      if (threadIndex !== -1) {
        state.threads[threadIndex].unread_count = count;
      }
    },
    UPDATE_THREAD_LAST_MESSAGE(state, { conversationId, message }) {
      const threadIndex = state.threads.findIndex(
        (t) => t.conversation_id === conversationId
      );

      if (threadIndex !== -1) {
        state.threads[threadIndex].last_message = message;

        // Move this conversation to the top of the list
        if (threadIndex > 0) {
          const thread = state.threads.splice(threadIndex, 1)[0];
          state.threads.unshift(thread);
        }
      }
    },
    INCREMENT_THREAD_UNREAD_COUNT(state, conversationId) {
      const threadIndex = state.threads.findIndex(
        (t) => t.conversation_id === conversationId
      );

      if (threadIndex !== -1) {
        state.threads[threadIndex].unread_count =
          (state.threads[threadIndex].unread_count || 0) + 1;
      }
    },
    UPDATE_THREAD_LAST_MESSAGE_ON_EDIT_DELETE(
      state,
      { conversationId, messageId, isDeleted }
    ) {
      const threadIndex = state.threads.findIndex(
        (t) => t.conversation_id === conversationId
      );

      if (
        threadIndex !== -1 &&
        state.threads[threadIndex].last_message &&
        state.threads[threadIndex].last_message.id === messageId
      ) {
        if (isDeleted) {
          // For deleted messages, mark as deleted and remove body
          state.threads[threadIndex].last_message.deleted = true;
          state.threads[threadIndex].last_message.body = null;
        } else {
          // For edited messages, update with modified text from the messages array
          const editedMessage = state.messages.find((m) => m.id === messageId);
          if (editedMessage) {
            state.threads[threadIndex].last_message.body = editedMessage.body;
            state.threads[threadIndex].last_message.edited = true;
          }
        }
      }
    },
  },
  actions: {
    initPartner({ commit }, p) {
      commit("SET_PARTNER", p);
    },

    // 1) fetch existing threads, inject new partner if missing
    async fetchThreads({ state, commit, dispatch }) {
      commit("SET_LOADING", true);
      try {
        const res = await axios.get("/api/chat/threads", getAxiosConfig());
        let threads = res.data;
        if (
          state.partner &&
          state.partner.id !== 0 &&
          !threads.some((t) => t.partner.id === state.partner.id)
        ) {
          threads.unshift({
            conversation_id: `chat_${state.partner.id}_${new Date().getTime()}`,
            partner: state.partner,
            last_message: null,
          });
          commit("SET_CURRENT", threads[0].conversation_id);
        } else if (
          state.partner &&
          threads.some((t) => t.partner.id === state.partner.id)
        ) {
          const thread = threads.find((t) => t.partner.id === state.partner.id);
          commit("SET_CURRENT", thread.conversation_id);
          await dispatch("fetchMessages", thread.conversation_id);
        } else {
          commit("/SET_PARTNER", {
            id: 0,
            first_name: "",
            last_name: "",
            avatar: "",
          });
          commit("SET_CURRENT", null);
        }

        console.log("Fetched threads:", threads, state.currentId);
        commit("SET_THREADS", threads);

        // Only auto-select if there's no current selection
        if (threads.length && state.currentId === null) {
          const first = threads[0].conversation_id;
          commit("SET_CURRENT", first);
          if (first !== null) {
            await dispatch("fetchMessages", first);
          }
        }
        dispatch("markMessagesAsRead", false);
      } catch (error) {
        console.error("Error fetching threads:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    // 2) new‐conversation creation
    async createConversation({ state, commit, dispatch }) {
      const res = await axios.post(
        "/api/chat/threads",
        { user_id: state.partner.id },
        getAxiosConfig()
      );
      const conv = res.data;

      // update threads list
      commit(
        "SET_THREADS",
        state.threads.map((t) =>
          t.partner.id === state.partner.id
            ? {
                conversation_id: conv.id,
                partner: t.partner,
                last_message: conv.messages.slice(-1)[0] || null,
              }
            : t
        )
      );

      commit("SET_CURRENT", conv.id);
      commit("SET_MESSAGES", conv.messages);
    },

    // 3) load messages for existing thread
    async fetchMessages({ commit, state }, conversationId) {
      if (!conversationId) return;

      commit("SET_MESSAGES_LOADING", true);
      try {
        const res = await axios.get(
          `/api/chat/threads/${conversationId}/messages`,
          getAxiosConfig()
        );
        commit("SET_MESSAGES", res.data);

        // Do NOT mark messages as read automatically here
        // Only get them for display

        return res.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
        commit("SET_MESSAGES", []);
        return [];
      } finally {
        commit("SET_MESSAGES_LOADING", false);
      }
    },

    // Explicitly mark messages as read (useful when user views but doesn't send a message)
    async markMessagesAsRead({ commit, state }, updateUnreadCount = true) {
      if (!state.currentId) return;

      try {
        await axios.post(
          `/api/chat/threads/${state.currentId}/mark-read`,
          {},
          getAxiosConfig()
        );

        // Also update the unread count in the store to zero
        if (updateUnreadCount) {
          commit("UPDATE_THREAD_UNREAD_COUNT", {
            conversationId: state.currentId,
            count: 0,
          });
        }
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    },

    // 4) send a message
    async sendMessage({ commit, state, dispatch }, payload) {
      // Handle string or object payload
      const messageData =
        typeof payload === "string"
          ? { body: payload.trim() }
          : {
              body: payload.text.trim(),
              attachments: payload.attachments || [],
              reply_to: payload.reply_to,
            };

      if (
        !messageData.body &&
        (!messageData.attachments || messageData.attachments.length === 0)
      )
        return;

      // Create conversation on first send
      if (
        state.currentId === null ||
        (typeof state.currentId === "string" &&
          state.currentId?.startsWith("chat"))
      ) {
        await dispatch("createConversation");
      }

      // Now send the message
      const formData = new FormData();
      if (messageData.body) {
        formData.append("body", messageData.body);
      }

      // Add reply_to if present
      if (messageData.reply_to) {
        formData.append("reply_to", messageData.reply_to);
      }

      // Add attachments if any
      if (messageData.attachments && messageData.attachments.length > 0) {
        messageData.attachments.forEach((path, index) => {
          formData.append(`attachmentPaths[${index}]`, path);
        });
      }

      const config = getAxiosConfig();
      config.headers["Content-Type"] = "multipart/form-data";

      try {
        const res = await axios.post(
          `/api/chat/threads/${state.currentId}/messages`,
          formData,
          config
        );

        // Store original message reference for the reply before adding to state
        let messageToAdd = { ...res.data };

        // If this message is a reply but replyTo wasn't loaded from the backend
        if (messageToAdd.reply_to && !messageToAdd.replyTo) {
          // Find the original message directly from our messages array
          const originalMessage = state.messages.find(
            (m) => m.id === messageToAdd.reply_to
          );
          if (originalMessage) {
            // Create a proper replyTo reference with full sender information
            messageToAdd.replyTo = originalMessage;
          }
        }

        commit("ADD_MESSAGE", messageToAdd);
        return messageToAdd;
      } catch (error) {
        console.error("Error sending message:", error);
        throw error;
      }
    },

    // Edit a message
    async editMessage({ commit }, { messageId, body }) {
      try {
        const res = await axios.put(
          `/api/chat/messages/${messageId}`,
          { body },
          getAxiosConfig()
        );
        commit("UPDATE_MESSAGE", res.data);
        return res.data;
      } catch (error) {
        console.error("Error editing message:", error);
        throw error;
      }
    },

    // Delete a message
    async deleteMessage({ commit }, messageId) {
      try {
        await axios.delete(`/api/chat/messages/${messageId}`, getAxiosConfig());
        commit("DELETE_MESSAGE", messageId);
      } catch (error) {
        console.error("Error deleting message:", error);
        throw error;
      }
    },
  },
};
