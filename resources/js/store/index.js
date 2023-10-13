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
    googleMapsScriptLoaded: false,
  },
  getters: {
    screenWidth: (state) => state.screenWidth,
  },
  mutations: {
    setScreenWidth(state, width) {
      state.screenWidth = width;
    },
    SET_GOOGLE_MAPS_SCRIPT_LOADED(state, value) {
      state.googleMapsScriptLoaded = value;
    },
  },
  actions: {
    updateScreenWidth({ commit }) {
      commit("setScreenWidth", window.innerWidth);
    },
    setGoogleMapsScriptLoaded({ commit }, value) {
      commit("SET_GOOGLE_MAPS_SCRIPT_LOADED", value);
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
