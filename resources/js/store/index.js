import { createStore } from "vuex";
import ratings from "./modules/ratings/ratings"; // Assuming rating.js is in the same directory
import axios from "axios";
import { somethingWentWrong } from "@/helpers/utilities";
import { setToken } from "@/helpers/localStorageHelper";

export const store = createStore({
  modules: {
    ratings,
  },
  state: {
    screenWidth: window.innerWidth,
  },
  mutations: {
    setScreenWidth(state, width) {
      state.screenWidth = width;
    },
  },
  actions: {
    updateScreenWidth({ commit }) {
      commit("setScreenWidth", window.innerWidth);
    },
    async getToken() {
      try {
        const response = await axios.post(`/tokens/create`);
        if (response.data) {
          console.log("here to store");
          setToken(response.data.token);
        }
      } catch (err) {
        console.log("here to store2");

        somethingWentWrong("wrong intoken");
      } finally {
      }
    },
  },
  getters: {
    screenWidth: (state) => state.screenWidth,
  },
});
