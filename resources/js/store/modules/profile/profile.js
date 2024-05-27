import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import axios from "axios";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { Inertia } from "@inertiajs/inertia";
import { removeToken } from "@/helpers/localStorageHelper";
export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      loadingProfile: false,
      loadingViewSettingsProfile: false,
      loadingImage: false,
      viewsSettingsProfile: {},
      contractorId: 0,
      status: "",
      profile: {},
      loadFirstPageWithNoPreserve: false,
      mustVerifyEmail: false,
      activeProfileTab: 0,
      commentId: 0,
      replyId: 0,
      reply: {},
      postComment: {},
      postReply: {},
      updatedPost: {},
      updatedPostId: 0,
      deletedPost: {},
    };
  },
  getters: {
    status: (state) => state.status,
    commentId: (state) => state.commentId,
    postComment: (state) => state.postComment,
    postReply: (state) => state.postReply,
    replyId: (state) => state.replyId,
    reply: (state) => state.reply,
    activeProfileTab: (state) => state.activeProfileTab,
    loadFirstPageWithNoPreserve: (state) => state.loadFirstPageWithNoPreserve,
    loading: (state) => state.loading,
    loadingProfile: (state) => state.loadingProfile,
    loadingViewSettingsProfile: (state) => state.loadingViewSettingsProfile,
    viewsSettingsProfile: (state) => state.viewsSettingsProfile,
    getProfile: (state) => state.profile,
    mustVerifyEmail: (state) => state.mustVerifyEmail,
    updatedPost: (state) => state.updatedPost,
    updatedPostId: (state) => state.updatedPostId,
    deletedPost: (state) => state.deletedPost,
  },
  mutations: {
    setStatus(state, payload) {
      state.status = payload;
    },
    setCommentId(state, payload) {
      state.commentId = payload;
    },
    setPostComment(state, payload) {
      state.postComment = payload;
    },
    setPostReply(state, payload) {
      state.postReply = payload;
    },
    setReplyId(state, payload) {
      state.replyId = payload;
    },
    setReply(state, payload) {
      state.reply = payload;
    },
    setContractorId(state, payload) {
      state.contractorId = payload;
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
    setLoadFirstPageWithNoPreserve(state, payload) {
      state.loadFirstPageWithNoPreserve = payload;
    },
    setLoadingProfile(state, payload) {
      state.loadingProfile = payload;
    },
    setLoadingImage(state, payload) {
      state.loadingImage = payload;
    },
    setLoadingViewSettingsProfile(state, payload) {
      state.loadingViewSettingsProfile = payload;
    },

    setViewsSettingsProfile(state, payload) {
      state.viewsSettingsProfile = payload;
    },
    setUpdatedPost(state, payload) {
      state.updatedPost = payload;
    },
    setDeletedPost(state, payload) {
      state.deletedPost = payload;
    },
    setUpdatedPostId(state, payload) {
      state.updatedPostId = state.updatedPostId + 1;
    },
  },
  actions: {
    async getViewSettingsProfile({ commit }) {
      commit("setLoadingViewSettingsProfile", true);
      try {
        const response = await axios.get(
          `/api/profile/trades-views-settings`,
          getAxiosConfig()
        );
        if (response.data) {
          commit("setViewsSettingsProfile", response.data.profile);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoadingViewSettingsProfile", false);
      }
    },

    async fetchProfile({ commit }, forLoadingImage = false) {
      commit("setLoading", true);

      try {
        const response = await axios.get(`/api/profile`, getAxiosConfig());
        if (response.data) {
          commit("setProfile", response.data.profile);
        }
      } catch (err) {
        removeToken();
        // somethingWentWrong();
      } finally {
        commit("setLoading", false);
        if (forLoadingImage) {
          commit("setLoadingImage", false);
        }
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

    async updateProfileSetupTrades({ commit }, form) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/profile/trades-profile-setup`,
          form,
          getAxiosConfig()
        );
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },
    async updateViewSettingsTrades({ commit }, form) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/profile/trades-views-settings`,
          form,
          getAxiosConfig()
        );
        if (response.data) {
          commit("setLoadFirstPageWithNoPreserve", true);
        }
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
    async updateProfileSetupViews({ commit }, form) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/profile/views-profile-setup`,
          form,
          getAxiosConfig()
        );
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },
    async updateViewSettingsViews({ commit }, form) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/profile/views-views-settings`,
          form,
          getAxiosConfig()
        );
        if (response.data) {
          commit("setLoadFirstPageWithNoPreserve", true);
        }
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
  },
};
