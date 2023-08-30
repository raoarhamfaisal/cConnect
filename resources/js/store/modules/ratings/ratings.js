import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import axios from "axios";
import {
  getAllContractors,
  activateReview,
  deactivateReview,
  updateReviewAdmin,
  updateResponseAdmin,
  deactivateResponse,
  deleteReviewAdmin,
  deleteResponseAdmin,
  activateResponse,
} from "./adminActions";
export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      disabled: false,
      isFetchReviews: false,
      isDeleted: false,
      isInactive: false,
      allContractors: [],
      pagination: {},
    };
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setDisabled(state, payload) {
      state.disabled = payload;
    },
    setIsFetchReviews(state, payload) {
      state.isFetchReviews = payload;
    },
    setIsDeleted(state, payload) {
      state.isDeleted = payload;
    },
    setIsInactive(state, payload) {
      state.isInactive = payload;
    },
    setAllContractors(state, payload) {
      state.allContractors = payload;
    },
    setPagination(state, payload) {
      state.pagination = payload;
    },
    // ... other mutations ...
  },
  actions: {
    async deleteReview({ commit }, reviewId) {
      commit("setLoading", true);
      commit("setDisabled", true);

      try {
        const response = await axios.delete(`/api/reviews/${reviewId}`);
        if (response.data) {
          changesSaved(response.message || "Review Successfully Deleted");
          setTimeout(() => {
            commit("setIsDeleted", true);
          }, 2000);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
        commit("setDisabled", false);
      }
    },
    async deleteResponse({ commit }, responseId) {
      commit("setLoading", true);
      commit("setDisabled", true);

      try {
        const response = await axios.delete(
          `/api/review-responses/${responseId}`
        );
        if (response.data) {
          changesSaved(
            response.message || "Review response deleted successfully!"
          );
          setTimeout(() => {
            commit("setIsDeleted", true);
          }, 2000);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
        commit("setDisabled", false);
      }
    },
    async createResponse({ commit }, responseData) {
      commit("setLoading", true);
      commit("setDisabled", true);

      try {
        const response = await axios.post(
          `/api/review-responses`,
          responseData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          changesSaved(
            response.message || "Review response deleted successfully!"
          );
          setTimeout(() => {
            commit("setIsDeleted", true);
          }, 2000);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
        commit("setDisabled", false);
      }
    },
    async updateReview({ commit }, payload) {
      commit("setLoading", true);
      commit("setDisabled", true);

      try {
        const response = await axios.put(
          `/api/reviews/${payload.reviewId}`,
          payload.review,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          changesSaved(response.message || "Review Successfully Upadated");
          setTimeout(() => {
            commit("setIsFetchReviews", true);
          }, 2000);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
        commit("setDisabled", false);
      }
    },
    async updateResponse({ commit }, responseData) {
      commit("setLoading", true);
      commit("setDisabled", true);

      try {
        const response = await axios.patch(
          `/api/review-responses`,
          responseData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          changesSaved(response.message || "Response Successfully Upadated");
          setTimeout(() => {
            commit("setIsFetchReviews", true);
          }, 2000);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
        commit("setDisabled", false);
      }
    },
    async sendAppeal({ commit }, payload) {
      commit("setLoading", true);
      commit("setDisabled", true);

      try {
        const response = await axios.post(
          `/api/reviews/${payload.reviewId}/appeal`,
          { on_appeal_reason: payload.on_appeal_reason },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          changesSaved(response.message || "Appeal is Successfully Submitted");
          setTimeout(() => {
            commit("setIsFetchReviews", true);
          }, 2000);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
        commit("setDisabled", false);
      }
    },
    async sendTurnOffApeal({ commit }, payload) {
      commit("setLoading", true);
      commit("setDisabled", true);

      try {
        const response = await axios.post(
          `/api/reviews/${payload.reviewId}/off-appeal`,
          { off_appeal_reason: payload.off_appeal_reason },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          changesSaved(
            response.message || "Turn off Appeal is Successfully Submitted"
          );
          setTimeout(() => {
            commit("setIsFetchReviews", true);
          }, 2000);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
        commit("setDisabled", false);
      }
    },
    getAllContractors,
    deactivateReview,
    activateReview,
    deactivateResponse,
    activateResponse,
    deleteReviewAdmin,
    updateReviewAdmin,
    updateResponseAdmin,
    deleteResponseAdmin,
  },
};
