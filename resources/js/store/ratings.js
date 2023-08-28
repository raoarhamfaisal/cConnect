import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      disabled: false,
      isFetchReviews: false,
      isDeleted: false,
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
  },
};
