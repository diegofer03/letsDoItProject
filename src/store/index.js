import { urlApi } from "@/scrips/config/constant";
import { createStore } from "vuex";

export default createStore({
  state: {
    IP: urlApi.ip,
    user: {
      name: null,
      token: null,
      role: null,
    },
    classLoader: {
      loader: false,
      noLoader: false,
    },
  },
  getters: {},
  mutations: {
    saveUser(state) {
      state.user.name = localStorage.getItem("userEmail");
      state.user.token = localStorage.getItem("userToken");
      state.user.role = localStorage.getItem("userRole");
    },
    clearUser(state) {
      state.user.name = null;
      state.user.token = null;
      state.user.role = null;
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
    },
    Loader(state, accion) {
      if (accion == "show") {
        state.classLoader.loader = true;
      } else {
        state.classLoader.loader = false;
      }
    },
    // refreshPage() {
    //   console.log(localStorage.getItem("userToken"));
    //   if (
    //     localStorage.getItem("userToken") != null ||
    //     localStorage.getItem("userToken") != undefined
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
  },
  actions: {},
  modules: {},
});
