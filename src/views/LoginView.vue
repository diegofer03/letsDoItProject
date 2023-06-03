<template>
  <div id="contenedor">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4"></div>
        <div class="col-sm-12 col-md-4 mt-5">
          <div class="card">
            <div class="card-body" v-if="userCreated">
              <div class="row">
                <div
                  class="col-sm-12 alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <label>Usuario creado con exito</label>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="card-body">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-check form-switch">
                    <p class="">aber</p>
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value=""
                      id="check"
                    />
                    <p class="">aber</p>
                  </div>
                </div>
              </div>
            </div> -->
            <LogIn v-if="!switchLog" />
            <SignUp v-if="switchLog" />
            <div class="card-body">
              <div class="row">
                <div class="col-sm-12">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="() => (switchLog = !switchLog)"
                  >
                    <label v-if="!switchLog">Registrarse</label>
                    <label v-if="switchLog">Iniciar sesion</label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import LogIn from "../components/loginComponents/LogIn.vue";
import SignUp from "../components/loginComponents/SignUp.vue";
import { mapMutations } from "vuex";
// import axios from "axios";

export default {
  components: { LogIn, SignUp },
  name: "loginComponent",
  data: () => {
    return {
      switchLog: false,
      userCreated: false,
    };
  },
  computed: {
    ...mapMutations(["refreshPage"]),
  },
  methods: {
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
  mounted() {
    if (
      localStorage.getItem("userCreated") != null ||
      localStorage.getItem("userCreated") != undefined
    ) {
      this.userCreated = true;
      localStorage.removeItem("userCreated");
      setTimeout(() => {
        this.userCreated = false;
      }, 3000);
    }

    if (this.refreshPage()) this.$router.replace("/home");
  },
};
</script>

<style scoped>
#contenedor {
  background-color: #30353b;
  min-height: 100vh;
  background-image: url("../assets/Fondo_Web_Oficiosos.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 55%;
}

.toggle.ios,
.toggle-on.ios,
.toggle-off.ios {
  border-radius: 20px;
}
.toggle.ios .toggle-handle {
  border-radius: 20px;
}
</style>
