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
  getRegions,
  activateResponse,
  sendAcceptRequest,
  sendRejectRequest,
} from "./adminActions";
import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      loadingSending: false,
      shouldFetchPostsOnClose: false,
      shouldLoadPosts: false,
      reviewId: null,
      responseId: null,
      disabledSending: false,
      index: 0,
      disabled: false,
      updatedReview: null,
      updatedResponse: null,
      isFetchReviews: false,
      isDeleted: false,
      isInactive: false,
      allContractors: [],
      pagination: {},
      allRegions: [],
      contractorDetails: {},
    };
  },
  getters: {
    shouldFetchPostsOnClose: (state) => state.shouldFetchPostsOnClose,
    shouldLoadPosts: (state) => state.shouldLoadPosts,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setReviewId(state, payload) {
      state.reviewId = payload;
    },
    setResponseId(state, payload) {
      state.responseId = payload;
    },
    setUpdatedReview(state, payload) {
      state.updatedReview = payload;
    },
    setUpdatedResponse(state, payload) {
      state.updatedResponse = payload;
    },

    setIndex(state, payload) {
      state.index = payload;
    },
    setShouldLoadPosts(state, payload) {
      state.shouldLoadPosts = payload;
    },
    setShouldFetchPostsOnClose(state, payload) {
      state.shouldFetchPostsOnClose = payload;
    },
    setAllRegions(state, payload) {
      state.allRegions = payload;
    },
    setDisabled(state, payload) {
      state.disabled = payload;
    },
    setLoadingSending(state, payload) {
      state.loadingSending = payload;
    },
    setDisabledSending(state, payload) {
      state.disabledSending = payload;
    },
    setIsFetchReviews(state, payload) {
      state.isFetchReviews = payload;
    },
    setContractorDetails(state, payload) {
      state.contractorDetails = payload;
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
    async getContractorInfo({ commit }, contractorId) {
      commit("setLoading", true);

      try {
        const response = await axios.get(
          `/api/contractor/${contractorId}`,
          getAxiosConfig()
        );
        if (response.data) {
          commit("setContractorDetails", response.data.contractor);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
      }
    },
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
    async createResponse({ commit }, responseData) {
      commit("setLoading", true);
      commit("setDisabled", true);

      try {
        const response = await axios.post(
          `/api/review-responses`,
          responseData,
          getAxiosConfig()
        );
        if (response.data) {
          changesSaved(
            response.data.message || "Review response added successfully!"
          );
          commit("setUpdatedResponse", response.data.review_response);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoading", false);
        commit("setDisabled", false);
      }
    },
    async updateReview({ commit }, payload) {
      commit("setLoadingSending", true);
      commit("setDisabledSending", true);

      try {
        const response = await axios.put(
          `/api/reviews/${payload.reviewId}`,
          payload.review,
          getAxiosConfig()
        );
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
    async updateResponse({ commit }, responseData) {
      commit("setLoadingSending", true);
      commit("setDisabledSending", true);

      try {
        const response = await axios.patch(
          `/api/review-responses`,
          responseData,
          getAxiosConfig()
        );
        if (response.data) {
          changesSaved(
            response.data.message || "Response Successfully Upadated"
          );
          commit("setUpdatedResponse", response.data.review_response);
        }
      } catch (err) {
        somethingWentWrong();
      } finally {
        commit("setLoadingSending", false);
        commit("setDisabledSending", false);
      }
    },
    async sendAppeal({ commit }, payload) {
      commit("setLoading", true);
      commit("setDisabled", true);

      try {
        const response = await axios.post(
          `/api/reviews/${payload.reviewId}/appeal`,
          { on_appeal_reason: payload.on_appeal_reason },
          getAxiosConfig()
        );
        if (response.data) {
          changesSaved(
            response.data.message || "Appeal is Successfully Submitted"
          );
          commit("setUpdatedReview", response.data.review);
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
          getAxiosConfig()
        );
        if (response.data) {
          changesSaved(
            response.data.message || "Turn off Appeal is Successfully Submitted"
          );
          commit("setUpdatedReview", response.data.review);
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
    getRegions,
    updateResponseAdmin,
    deleteResponseAdmin,
    sendAcceptRequest,
    sendRejectRequest,
  },
};
