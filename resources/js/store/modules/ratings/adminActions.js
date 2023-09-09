import { getAxiosConfig } from "@/helpers/axiosConfigHelpers";
import { somethingWentWrong, changesSaved } from "@/helpers/utilities";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getAllContractors = async ({ commit }, payload) => {
  commit("setLoading", true);

  try {
    const response = await axios.get(
      `/api/admin/${payload.region_id}/search-contractor?search=${payload.searchTerm}&per_page=${payload.perPage}&page=${payload.page}`,
      getAxiosConfig()
    );
    if (response.data) {
      commit("setAllContractors", response.data.profiles);
      commit("setPagination", response.data.pagination);
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    commit("setLoading", false);
  }
};
export const getRegions = async ({ commit }) => {
  commit("setLoading", true);

  try {
    const response = await axios.get(`/api/regions`, getAxiosConfig());
    if (response.data) {
      commit("setAllRegions", response.data.regions);
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    commit("setLoading", false);
  }
};
export const deleteReviewAdmin = async ({ commit }, payload) => {
  commit("setLoading", true);
  commit("setDisabled", true);
  console.log(payload);
  try {
    const response = await axios.request({
      method: "delete",
      url: `/api/admin/reviews/${payload.reviewId}`,
      data: { reason: payload.reason },
      ...getAxiosConfig(),
    });
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
};
export const deleteResponseAdmin = async ({ commit }, payload) => {
  commit("setLoading", true);
  commit("setDisabled", true);
  console.log(payload);
  try {
    const response = await axios.request({
      method: "delete",
      url: `/api/admin/review-responses/${payload.responseId}`,
      data: { reason: payload.reason },
      ...getAxiosConfig(),
    });
    if (response.data) {
      changesSaved(response.message || "Response Successfully Deleted");
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
};
export const deactivateReview = async ({ commit }, { reason, reviewId }) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.put(
      `/api/admin/reviews/${reviewId}/deactivate`,
      {
        reason: reason,
      },
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(response.message || "Review deactivated successfully");
      console.log(response.data);
      setTimeout(() => {
        commit("setIsInactive", true);
      }, 2000);
    }
  } catch (err) {
    console.log(err, "error");

    somethingWentWrong();
  } finally {
    commit("setLoading", false);
    commit("setDisabled", false);
  }
};
export const activateReview = async ({ commit }, { reviewId, reason }) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.put(
      `/api/admin/reviews/${reviewId}/activate`,
      {
        reason: reason,
      },
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(response.message || "Review activated successfully");
      setTimeout(() => {
        commit("setIsInactive", true);
      }, 2000);
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    commit("setLoading", false);
    commit("setDisabled", false);
  }
};
export const deactivateResponse = async (
  { commit },
  { responseId, reason }
) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.put(
      `/api/admin/review-responses/${responseId}/deactivate`,
      {
        reason: reason,
      },
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(response.message || "Response deactivated successfully");
      console.log(response.data);
      setTimeout(() => {
        commit("setIsInactive", true);
      }, 2000);
    }
  } catch (err) {
    console.log(err, "error");

    somethingWentWrong();
  } finally {
    commit("setLoading", false);
    commit("setDisabled", false);
  }
};
export const activateResponse = async ({ commit }, { reason, responseId }) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.put(
      `/api/admin/review-responses/${responseId}/activate`,
      {
        reason: reason,
      },
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(response.message || "Response activated successfully");
      setTimeout(() => {
        commit("setIsInactive", true);
      }, 2000);
    }
  } catch (err) {
    somethingWentWrong();
  } finally {
    commit("setLoading", false);
    commit("setDisabled", false);
  }
};

export const updateReviewAdmin = async ({ commit }, payload) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.put(
      `/api/admin/reviews/${payload.reviewId}`,
      payload.review,
      getAxiosConfig()
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
};
export const updateResponseAdmin = async ({ commit }, responseData) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.patch(
      `/api/admin/review-responses`,
      responseData,
      getAxiosConfig()
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
};

export const sendAcceptRequest = async ({ commit }, payload) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.put(
      `/api/admin/reviews/${payload.reviewId}/accept`,
      {},
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(response.message || "Appeal is successfully accepted!");
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
};
export const sendRejectRequest = async ({ commit }, payload) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.put(
      `/api/admin/reviews/${payload.reviewId}/reject`,
      {},
      getAxiosConfig()
    );
    if (response.data) {
      changesSaved(response.message || "Appeal is successfully rejected!");
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
};
