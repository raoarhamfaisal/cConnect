import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import axios from "axios";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { Inertia } from "@inertiajs/inertia";
export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      status: "",
      profile: {},

      mustVerifyEmail: false,
      activeProfileTab: 0,
    };
  },
  getters: {
    status: (state) => state.status,
    activeProfileTab: (state) => state.activeProfileTab,
    loading: (state) => state.loading,
    getProfile: (state) => state.profile,
    mustVerifyEmail: (state) => state.mustVerifyEmail,
  },
  mutations: {
    setStatus(state, payload) {
      state.status = payload;
    },
    setProfile(state, payload) {
      state.profile = payload;
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
    async fetchProfile({ commit }) {
      commit("setLoading", true);

      try {
        const response = await axios.get(`/api/profile`, getAxiosConfig());
        if (response.data) {
          commit("setProfile", response.data.profile);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },
    async updateTrades({ commit }, form) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/profile/trades`,
          form,
          getAxiosConfig()
        );
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },
    async updateViews({ commit }, form) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/profile/views`,
          form,
          getAxiosConfig()
        );
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },
    async updateProfileGeneralInfo({ commit }, payload) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/profile/all-basic-info`,
          payload.form,
          getAxiosConfig()
        );
        if (response.data && payload.showSuccess) {
          changesSaved("Changes Successfully Saved");
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },


    
    async updateProfileGeneralInfoForProfileSetup({ commit }, payload) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/profile/all-basic-info-for-profile-setup`,
          payload.form,
          getAxiosConfig()
        );
        if (response.data && payload.showSuccess) {
          changesSaved("Changes Successfully Saved");
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },


    async verifyPayment({ commit }) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/profile/verify-payment`,
          {},
          getAxiosConfig()
        );
        if (response.data) {
          Inertia.visit("/post");
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
