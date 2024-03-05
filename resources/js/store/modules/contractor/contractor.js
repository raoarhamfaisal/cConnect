import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import axios from "axios";
import {
  getAxiosConfig,
  getAxiosConfigFormData,
} from "@/helpers/axiosConfigHelpers";
export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      disabled: false,
      selectedColorScheme: 0,
      selectedTemplate: 0,
      colorSchemeList: [],
    };
  },
  getters: {
    loading: (state) => state.loading,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setSelectedColorScheme(state, payload) {
      state.selectedColorScheme = payload;
    },
    setColorSchemeList(state, payload) {
      state.colorSchemeList = payload;
    },
    setSelectedTemplate(state, payload) {
      state.selectedTemplate = payload;
    },

    setDisabled(state, payload) {
      state.disabled = payload;
    },
  },
  actions: {
    async updatedSelctedTemplate({ commit }, templateId) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/contractor/update-template`,
          {
            template_id: +templateId,
          },
          getAxiosConfig()
        );
        if (response.data) {
          commit("setSelectedTemplate", templateId);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", true);
      }
    },
    async updatedSelectedColorScheme({ commit }, colorSchemeId) {
      commit("setLoading", true);

      try {
        const response = await axios.patch(
          `/api/contractor/update-color-scheme`,
          {
            color_scheme_id: +colorSchemeId,
          },
          getAxiosConfig()
        );
        if (response.data) {
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", true);
      }
    },
    async deleteResponse({ commit }, responseId) {
      commit("setLoadingSending", true);
      commit("setDisabledSending", true);

      try {
        const response = await axios.delete(
          `/api/review-responses/${responseId}`,
          getAxiosConfig()
        );
        if (response.data) {
          changesSaved(
            response.data.message || "Review response deleted successfully!"
          );
          commit("setResponseId", responseId);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoadingSending", false);
        commit("setDisabledSending", false);
      }
    },
    async createResponse({ commit }, payload) {
      commit("setLoading", true);
      commit("setDisabled", true);

      console.log("payload.responseData", payload.responseData);

      try {
        const response = await axios.post(
          `/api/review-responses`,
          payload.responseData,
          getAxiosConfig()
        );
        if (response.data) {
          commit("setUpdatedResponse", response.data.review_response);
          if (!payload.dontShowSuccessSnack) {
            changesSaved(
              response.data.message || "Review response added successfully!"
            );
          }
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
        commit("setDisabled", false);
      }
    },
    async update({ commit }, payload) {
      commit("setLoadingSending", true);
      commit("setDisabledSending", true);

      try {
        let response = null;
        if (!payload.fromAdmin) {
          response = await axios.put(
            `/api/reviews/${payload.reviewId}`,
            payload.review,
            getAxiosConfig()
          );
        } else {
          response = await axios.put(
            `/api/admin/reviews/${payload.reviewId}`,
            payload.review,
            getAxiosConfig()
          );
        }
        if (response.data) {
          if (!payload.dontShowSuccessSnack) {
            changesSaved(
              response.data.message || "Review Successfully Upadated"
            );
          }

          commit("setUpdatedReview", response.data.review);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoadingSending", false);
        commit("setDisabledSending", false);
      }
    },
  },
};
