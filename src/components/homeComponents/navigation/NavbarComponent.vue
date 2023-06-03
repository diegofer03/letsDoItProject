<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link title="Home" to="/home" class="nav-link" href="#"
            ><i class="bi bi-house-door"></i
          ></router-link>
        </li>
      </ul>
      <a class="navbar-brand mb-0 h1">Home</a>
      <a
        title="Salir"
        class="nav-link nav-item text-dark form-inline ml-auto"
        type="button"
        @click="() => logOut()"
      >
        <i class="bi bi-box-arrow-in-left"></i
      ></a>
    </div>
  </nav>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["IP", "usuario"]),
  },
  methods: {
    ...mapMutations(["clearUser"]),
    logOut() {
      this.clearUser();
      this.$router.replace("/");
    },
  },
};
</script>
<style scoped>
.container-fluid {
  padding: 0;
}
</style>
