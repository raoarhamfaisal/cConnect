import { createStore } from "vuex";
import ratings from "./ratings"; // Assuming rating.js is in the same directory

export const store = createStore({
  modules: {
    ratings,
  },
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});
