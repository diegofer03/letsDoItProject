import { urlApi } from "@/scrips/config/constant";
import { createStore } from "vuex";

export default createStore({
  state: {
    IP: urlApi.ip,
    user: {
      name: null,
      token: null,
    },
    classLoader: {
      loader: false,
      noLoader: false,
    },
  },
  getters: {},
  mutations: {
    saveUser(state) {
      state.user.name = localStorage.getItem("userName");
      state.user.token = localStorage.getItem("userToken");
    },
    clearUser(state) {
      state.user.name = null;
      state.user.token = null;
      localStorage.removeItem("userName");
      localStorage.removeItem("userToken");
    },
    Loader(state, accion) {
      if (accion == "show") {
        state.classLoader.loader = true;
      } else {
        state.classLoader.loader = false;
      }
    },
  },
  actions: {
    refreshPage() {
      if (
        localStorage.getItem("userToken") != null ||
        localStorage.getItem("userToken") != undefined
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  modules: {},
});
