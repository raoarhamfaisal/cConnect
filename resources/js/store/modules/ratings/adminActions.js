import { somethingWentWrong, changesSaved } from "@/helpers/utilities";
import axios from "axios";

export const getAllContractors = async ({ commit }, payload) => {
  commit("setLoading", true);

  try {
    const response = await axios.get(
      `/api/admin/all-contractors?per_page=${payload.perPage}&page=${payload.page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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
export const deactivateReview = async ({ commit }, reviewId) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.put(
      `/api/admin/reviews/${reviewId}/deactivate`
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
export const activateReview = async ({ commit }, reviewId) => {
  commit("setLoading", true);
  commit("setDisabled", true);

  try {
    const response = await axios.put(`/api/admin/reviews/${reviewId}/activate`);
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
