import { somethingWentWrong } from "@/helpers/utilities";
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
