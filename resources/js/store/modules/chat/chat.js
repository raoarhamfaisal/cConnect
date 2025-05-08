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
  },
  mutations: {
    SET_PARTNER(state, p) {
      state.partner = p;
    },
    SET_THREADS(state, t) {
      state.threads = t;
    },
    SET_CURRENT(state, id) {
      state.currentId = id;
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
        } else {
          commit("/SET_PARTNER", {
            id: 0,
            first_name: "",
            last_name: "",
            avatar: "",
          });
          commit("SET_CURRENT", null);
        }

        commit("SET_THREADS", threads);

        // Only auto-select if there's no current selection
        if (threads.length && state.currentId === null) {
          const first = threads[0].conversation_id;
          commit("SET_CURRENT", first);
          if (first !== null) {
            await dispatch("fetchMessages", first);
          }
        }
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
    async fetchMessages({ commit }, conversationId) {
      if (!conversationId) return;

      commit("SET_MESSAGES_LOADING", true);
      try {
        const res = await axios.get(
          `/api/chat/threads/${conversationId}/messages`,
          getAxiosConfig()
        );
        commit("SET_MESSAGES", res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
        commit("SET_MESSAGES", []);
        return [];
      } finally {
        commit("SET_MESSAGES_LOADING", false);
      }
    },

    // 4) send a message
    async sendMessage({ commit, state, dispatch }, body) {
      if (!body.trim()) return;

      // Create conversation on first send
      if (
        state.currentId === null ||
        (typeof state.currentId === "string" &&
          state.currentId?.startsWith("chat"))
      ) {
        await dispatch("createConversation");
      }

      // Now send the message
      const res = await axios.post(
        `/api/chat/threads/${state.currentId}/messages`,
        { body },
        getAxiosConfig()
      );
      commit("ADD_MESSAGE", res.data);
    },
  },
};
