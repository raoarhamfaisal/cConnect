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
      selectedColorScheme: {},
      selectedTemplate: "",
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
    setSelectedTemplate(state, payload) {
      state.selectedTemplate = payload;
    },

    setDisabled(state, payload) {
      state.disabled = payload;
    },
  },
  actions: {
    async deleteReview({ commit }, reviewId) {
      commit("setLoadingSending", true);
      commit("setDisabledSending", true);

      try {
        const response = await axios.delete(
          `/api/reviews/${reviewId}`,
          getAxiosConfig()
        );
        if (response.data) {
          changesSaved(response.data.message || "Review Successfully Deleted");
          commit("setReviewId", reviewId);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoadingSending", false);
        commit("setDisabledSending", false);
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
