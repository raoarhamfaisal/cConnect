import { somethingWentWrong } from "@/helpers/utilities";
import axios from "axios";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      status: "",
      mustVerifyEmail: false,
      activeProfileTab: 0,
    };
  },
  getters: {
    status: (state) => state.status,
    activeProfileTab: (state) => state.activeProfileTab,
    loading: (state) => state.loading,
    mustVerifyEmail: (state) => state.mustVerifyEmail,
  },
  mutations: {
    setStatus(state, payload) {
      state.status = payload;
    },
    setActiveTab(state, payload) {
      state.activeProfileTab = payload;
    },
    setMustVerifyEmail(state, payload) {
      state.mustVerifyEmail = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async getProfileInfo({ commit }) {
      commit("setLoading", true);
      try {
        const response = await axios.get(`/api/profileInfo`, getAxiosConfig());
        if (response.data) {
          commit("setStatus", response.data.status);
          commit("setMustVerifyEmail", response.data.mustVerifyEmail);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
