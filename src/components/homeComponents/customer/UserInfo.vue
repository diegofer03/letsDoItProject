<template>
  <div class="card p-3">
    <div class="card-body">
      <div class="row">
        <div class="col-sm-12">
          <img src="@/assets/logo.png" class="" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <label>{{ user.name }}</label>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <label>{{ user.role }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {},
};
</script>
