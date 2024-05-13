import { createStore } from "vuex";
import ratings from "./modules/ratings/ratings";
import profile from "./modules/profile/profile";
import contractor from "./modules/contractor/contractor";
import axios from "axios";
import { somethingWentWrong } from "@/helpers/utilities";
import { setToken } from "@/helpers/localStorageHelper";

export const store = createStore({
  modules: {
    ratings,
    profile,
    contractor,
  },
  state: {
    screenWidth: window.innerWidth,
    badWords: null,
  },
  getters: {
    screenWidth: (state) => state.screenWidth,
  },
  mutations: {
    setScreenWidth(state, width) {
      state.screenWidth = width;
    },
    setBadWords(state, words) {
      state.badWords = words;
    },
  },
  actions: {
    updateScreenWidth({ commit }) {
      commit("setScreenWidth", window.innerWidth);
    },
    async fetchBadWords({ commit, state }) {
      // Key to store and retrieve the bad words from local storage
      const localStorageKey = "badWords";

      // Try to get bad words from local storage
      const storedBadWords = localStorage.getItem(localStorageKey);
      if (storedBadWords) {
        // If found, parse and commit to the store
        commit("setBadWords", new Set(JSON.parse(storedBadWords)));
      } else if (state.badWords === null) {
        // If not found in local storage and not in Vuex state, fetch from API
        try {
          const response = await axios.get("/api/badwords");
          const badWordsSet = new Set(
            response.data.map((word) => word.toLowerCase())
          );
          commit("setBadWords", badWordsSet);
          // Store the bad words in local storage
          localStorage.setItem(
            localStorageKey,
            JSON.stringify([...badWordsSet])
          );
        } catch (error) {
          console.error("Error fetching bad words:", error);
        }
      }
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
});
