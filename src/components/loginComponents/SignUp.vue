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
          type="text"
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
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <input
          type="password"
          class="w-100 form-control mt-2"
          :class="classConfirmPassword"
          placeholder="Confirmar Clave"
          v-model="confirmPassword"
        />
      </div>
      <div class="col-sm-12 text-center">
        <span class="redMsg" v-show="banderaConfirmPassword">
          <b>El campo es requerido</b>
        </span>
      </div>
    </div>
    <div class="row" v-show="banderaVerifyPassword">
      <div class="col-sm-12 text-center">
        <span class="redMsg">
          <b>{{ msgVerifyPassword }}</b>
        </span>
      </div>
    </div>
    <div class="row" v-show="banderaError">
      <div class="alert alert-danger py-2 mb-0 mt-2" role="alert">
        <b> {{ msgError }} </b>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <button
          type="button"
          @click="() => signUp()"
          class="btn btn-secondary btn-block mt-2"
        >
          Registrarse
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
import { mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";

export default {
  data: () => {
    return {
      email: "",
      password: "",
      confirmPassword: "",
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
      classConfirmPassword: {
        active: true,
        campoRequerido: false,
      },
      banderaConfirmPassword: false,
      banderaVerifyPassword: false,
      msgVerifyPassword: "",
      msgError: "",
      banderaError: false,
    };
  },
  computed: {
    ...mapState(["IP", "user"]),
  },
  methods: {
    ...mapActions(["refreshPage"]),
    ...mapMutations(["saveUser", "Loader"]),
    signUp() {
      this.Loader("show");
      this.banderaError = false;
      this.classUserEmail.campoRequerido = false;
      this.banderaUserEmail = false;
      this.classPassword.campoRequerido = false;
      this.banderaPassword = false;
      this.classConfirmPassword.campoRequerido = false;
      this.banderaConfirmPassword = false;

      if (
        this.email == "" ||
        this.password == "" ||
        this.confirmPassword == ""
      ) {
        this.Loader("hide");
        if (this.email == "") {
          this.classUserEmail.campoRequerido = true;
          this.banderaUserEmail = true;
        }
        if (this.password == "") {
          this.classPassword.campoRequerido = true;
          this.banderaPassword = true;
        }
        if (this.confirmPassword == "") {
          this.classConfirmPassword.campoRequerido = true;
          this.banderaConfirmPassword = true;
        }
      } else if (this.password.length < 8) {
        this.Loader("hide");
        this.classPassword.campoRequerido = true;
        this.classConfirmPassword.campoRequerido = true;
        this.banderaVerifyPassword = true;
        this.msgVerifyPassword = "La clave debe tener mas de 8 digitos";
      } else if (this.password != this.confirmPassword) {
        this.Loader("hide");
        this.banderaVerifyPassword = true;
        this.msgVerifyPassword = "Las claves deben ser iguales";
      } else {
        this.classUserEmail.campoRequerido = false;
        this.banderaUserEmail = false;
        this.classPassword.campoRequerido = false;
        this.banderaPassword = false;
        console.log(this.email);
        console.log(this.password);
        console.log(this.IP);

        axios
          .post(`${this.IP}users`, {
            email: this.email,
            password: this.password,
            role: "customer",
          })
          .then((data) => {
            console.log(data);
            this.banderaError = false;
            // const request = data.data;
            localStorage.setItem("userCreated", 1);
            this.$router.go();
            this.Loader("hide");
          })
          .catch((error) => {
            console.log(error);
            this.Loader("hide");
            this.banderaError = true;
            this.msgError = error.response.data.message;
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
