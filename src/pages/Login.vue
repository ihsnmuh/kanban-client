<template>
  <!-- Login -->
  <div id="form-login">
    <div class="container mt-5 md-5">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card bg-light border-radius shadow-lg">
            <div class="card-body">
              <form @submit.prevent="login" id="login">
                <center>
                  <h3 class="mb-3" style="font-weight: bold; color: #0d6efd">
                    Login
                  </h3>
                  <hr style="border: 1px solid black" />
                </center>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address:</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                    required
                  />
                </div>
                <div class="row">
                  <div class="col text-end">
                    <button type="submit" class="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <div class="col">
                <button
                  v-google-signin-button="clientId"
                  class="google-signin-button"
                >
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let { email, password } = this;
      let data = { email, password };
      axios
        .post("/login", data)
        .then(({ data }) => {
          // data hasil dari distraksi data.data dari Axios
          // console.log(data);
          localStorage.setItem("access_token", data.access_token);

          //(<nama event>, <payload>)
          //
          this.$emit("changePage", "homePage");
          this.$emit("setLogin", true);
        })
        .catch((err) => {
          console.log(err, ">>>>>> ERROR LOGIN");
        });
    },
  },
};
</script>

<style></style>
