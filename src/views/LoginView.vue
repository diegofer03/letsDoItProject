<template>
  <div id="contenedor">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4"></div>
        <div class="col-sm-12 col-md-4 mt-5">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-12">
                  <img src="@/assets/logo.png" class="w-100 border" />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <input
                    type="text"
                    class="w-100 form-control mt-2"
                    :class="classUsername"
                    placeholder="Usuario"
                    v-model="user_name"
                  />
                </div>
                <div class="col-sm-12 text-center">
                  <span class="letrasRojas" v-show="banderaUsername">
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
                  <span class="letrasRojas" v-show="banderaPassword">
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
                    @click="() => iniciarSesion()"
                    class="btn btn-secondary btn-block mt-2"
                  >
                    Ingresar
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 text-center mt-2">
                  <!-- <modalOlvidarClave /> -->
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
// import modalOlvidarClave from "../components/LoginComponents/modalOlvidarClave";
import { mapActions, mapMutations, mapState } from "vuex";
// import axios from "axios";

export default {
  components: {},
  name: "loginComponent",
  data: () => {
    return {
      user_name: "",
      password: "",
      classUsername: {
        active: true,
        campoRequerido: false,
      },
      banderaUsername: false,
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
    ...mapActions(["refreshPage"]),
    ...mapMutations(["saveUser", "Loader"]),
    iniciarSesion() {
      this.Loader("show");
      this.banderaError = false;
      this.classUsername.campoRequerido = false;
      this.banderaUsername = false;
      this.classPassword.campoRequerido = false;
      this.banderaPassword = false;

      if (this.user_name == "" || this.password == "") {
        this.Loader("hide");
        if (this.user_name == "") {
          this.classUsername.campoRequerido = true;
          this.banderaUsername = true;
        }
        if (this.password == "") {
          this.classPassword.campoRequerido = true;
          this.banderaPassword = true;
        }
      } else {
        this.classUsername.campoRequerido = false;
        this.banderaUsername = false;
        this.classPassword.campoRequerido = false;
        this.banderaPassword = false;
        console.log(this.user_name);
        console.log(this.password);
        setTimeout(() => {
          this.Loader("hide");
        }, 2000);

        // axios
        //   .post(`${this.IP}users/login`, {
        //     email: this.user_name,
        //     password: this.password,
        //   })
        //   .then((data) => {
        //     console.log(data);
        //     this.banderaError = false;
        //     const request = data.data.data;
        //     localStorage.setItem("nombreUsuario", request.user.name);
        //     localStorage.setItem("rolDeUsuario", request.user.user_type);
        //     localStorage.setItem("tokenDeUsuario", request.token.token);
        //     localStorage.setItem("tokenRefresh", request.token.refresh_token);
        //     this.guardarDataUsuario();
        //     this.$router.push("/inicio");
        //     this.Loader("hide");
        //   })
        //   .catch((error) => {
        //     this.Loader("hide");
        //     switch (error.response.data.message) {
        //       case "Account doesn't exist":
        //         this.msgError = "El usuario no existe";
        //         break;
        //       case "Wrong credentials":
        //         this.msgError = "La contraseña no es correcta";
        //         break;
        //       case "Account is banned":
        //         this.msgError = "El usuario se encuentra baneado";
        //         break;
        //       case "Account Unauthorized":
        //         this.msgError =
        //           "El usuario no está autorizado para ingresar a esta instancia";
        //         break;
        //       default:
        //         this.msgError = "ha ocurrido un error al logear el usuario";
        //         break;
        //     }
        //     this.banderaError = true;
        //   });
      }
    },
  },
  mounted() {},
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
.campoRequerido {
  border: red 1px solid !important;
}
.letrasRojas {
  color: red !important;
}
</style>
