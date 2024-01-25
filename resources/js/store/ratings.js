import { changesSaved, somethingWentWrong } from "@/helpers/utilities";
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      disabled: false,
      isFetchReviews: false,
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
  },
};
