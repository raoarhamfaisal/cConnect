import { createStore } from "vuex";
import ratings from "./modules/ratings/ratings"; // Assuming rating.js is in the same directory

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
  },
  getters: {
    screenWidth: (state) => state.screenWidth,
  },
});
