<template>
  <div class="fixTable rounded">
    <p class="h3 fixP">Lista de usuarios activos</p>
    <table class="table table-light">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in usersList" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  data: () => {
    return {
      usersList: [],
    };
  },
  computed: {
    ...mapState(["user", "IP"]),
  },
  methods: {
    ...mapMutations(["Loader", "refreshPage"]),
    getListUsers() {
      this.Loader("show");
      axios
        .get(`${this.IP}users`)
        .then((data) => {
          this.usersList = data.data;
          this.Loader("hide");
        })
        .catch((error) => {
          console.log(error);
          this.Loader("hide");
        });
    },
  },
  mounted() {
    if (this.refreshPage()) this.getListUsers();
  },
};
</script>
<style scoped>
.fixP {
  background-color: white;
  border-radius: 100px;
  margin: 10px 100px;
}
.fixTable {
  width: 50%;
}

@media only screen and (max-width: 650px) {
  .fixP {
    border-radius: 10px;
    margin: 10px 10px;
  }
  .fixTable {
    width: auto;
  }
}

@media only screen and (max-width: 400px) {
  .fixP {
    border-radius: 10px;
    margin: 10px 10px;
  }
  .fixTable {
    width: auto;
  }
}
</style>
