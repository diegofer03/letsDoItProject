<template>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-12">
        <img src="@/assets/logo.png" class="" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <input
          type="email"
          class="w-100 form-control mt-2"
          :class="classUserEmail"
          placeholder="Usuario"
          v-model="email"
        />
      </div>
      <div class="col-sm-12 text-center">
        <span class="redMsg" v-show="banderaUserEmail">
          <b>El campo es requerido</b>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <input
          type="password"
          class="w-100 form-control mt-2"
          :class="classPassword"
          placeholder="Clave"
          v-model="password"
        />
      </div>
      <div class="col-sm-12 text-center">
        <span class="redMsg" v-show="banderaPassword">
          <b>El campo es requerido</b>
        </span>
        <div
          class="alert alert-danger py-2 mb-0 mt-2"
          v-if="banderaError"
          role="alert"
        >
          <b> {{ msgError }} </b>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <button
          type="button"
          @click="() => logIn()"
          class="btn btn-secondary btn-block mt-2"
        >
          Iniciar sesion
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 text-center mt-2">
        <!-- <modalOlvidarClave /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import modalOlvidarClave from "../components/LoginComponents/modalOlvidarClave";
import { mapMutations, mapState } from "vuex";
import axios from "axios";

export default {
  data: () => {
    return {
      email: "",
      password: "",
      classUserEmail: {
        active: true,
        campoRequerido: false,
      },
      banderaUserEmail: false,
      classPassword: {
        active: true,
        campoRequerido: false,
      },
      banderaPassword: false,
      msgError: "",
      banderaError: false,
    };
  },
  computed: {
    ...mapState(["IP", "user"]),
  },
  methods: {
    ...mapMutations(["saveUser", "Loader"]),
    logIn() {
      this.Loader("show");
      this.banderaError = false;
      this.classUserEmail.campoRequerido = false;
      this.banderaUserEmail = false;
      this.classPassword.campoRequerido = false;
      this.banderaPassword = false;

      if (this.email == "" || this.password == "") {
        this.Loader("hide");
        if (this.email == "") {
          this.classUserEmail.campoRequerido = true;
          this.banderaUserEmail = true;
        }
        if (this.password == "") {
          this.classPassword.campoRequerido = true;
          this.banderaPassword = true;
        }
      } else {
        this.classUserEmail.campoRequerido = false;
        this.banderaUserEmail = false;
        this.classPassword.campoRequerido = false;
        this.banderaPassword = false;

        axios
          .post(`${this.IP}auth/login`, {
            email: this.email,
            password: this.password,
          })
          .then((data) => {
            this.banderaError = false;
            const request = data.data;
            localStorage.setItem("userEmail", request.user.email);
            localStorage.setItem("userRole", request.user.role);
            localStorage.setItem("userToken", request.token);
            this.saveUser();
            this.$router.push("/home");
            this.Loader("hide");
          })
          .catch((error) => {
            this.Loader("hide");
            this.banderaError = true;
            if (error.response.status === 401)
              this.msgError = "Usuario invalido";
            else this.msgError = "Error al iniciar sesion";
          });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.campoRequerido {
  border: red 1px solid !important;
}
.redMsg {
  color: red !important;
}
</style>
