<template>
  <router-view />
  <div :class="classLoader"></div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => {
    return {};
  },
  computed: {
    ...mapState(["classLoader"]),
  },
  methods: {
    ...mapMutations(["refreshPage", "saveUser"]),
  },
  beforeMount() {
    if (this.refreshPage()) {
      this.saveUser();
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

.loader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: url("./assets/loader.gif") 50% 50% no-repeat rgb(255, 253, 253);
  opacity: 0.8;
}
.noLoader {
  left: 0%;
}
</style>
