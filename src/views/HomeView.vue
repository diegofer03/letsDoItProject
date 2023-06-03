<template>
  <div class="d-block vh-100 w-100 contenedor">
    <div class="col-lg">
      <NavbarComponent />
    </div>
    <div
      class="d-flex justify-content-around align-items-center fixSpace fixDirection"
    >
      <UserInfo />
      <UserList />
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/homeComponents/navigation/NavbarComponent.vue";
import UserInfo from "@/components/homeComponents/customer/UserInfo.vue";
import UserList from "@/components/homeComponents/customer/UsersList.vue";
import { mapMutations } from "vuex";

export default {
  components: { NavbarComponent, UserInfo, UserList },
  data: () => {
    return {};
  },
  methods: {
    ...mapMutations(["refreshPage"]),
  },
  mounted() {
    if (!this.refreshPage()) this.$router.replace("/");
  },
};
</script>
<style scoped>
.contenedor {
  background-color: #30353b;
  min-height: 100vh;
  background-image: url("../assets/Fondo_Web_Oficiosos.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 55%;
}
.fixSpace {
  padding-top: 125px;
}

@media only screen and (max-width: 650px) {
  .fixSpace {
    padding-top: 40px;
  }
  .fixDirection {
    flex-direction: column;
    background-color: #30353b;
  }
}

@media only screen and (max-width: 400px) {
  .fixDirection {
    flex-direction: column;
    background-color: #30353b;
  }
}
</style>
