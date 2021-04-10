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
                  <div class="col d-grid gap-2">
                    <button type="submit" class="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <hr />
              <div class="row mt-2">
                <div class="col-3">
                  <p>Or with :</p>
                </div>
                <div class="col-9">
                  <GoogleLogin
                    :params="params"
                    :renderParams="renderParams"
                    :onSuccess="onSuccess"
                  ></GoogleLogin>
                </div>
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
import GoogleLogin from "vue-google-login";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          "1001635670265-4nip5usjum1d7n51sspf6ogmi0sb92v4.apps.googleusercontent.com",
      },
      renderParams: {
        width: 200,
        height: 40,
        longtitle: true,
      },
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
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Login in successfully",
          });
        })
        .catch((err) => {
          console.log(err, ">>>>>> ERROR LOGIN");
          if (err.response.status === 400) {
            Swal.fire({
              title: "Invalid Email / Password!",
              text: "Enter the correct Email / Password",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
    },
    onSuccess(googleUser) {
      // console.log(googleUser);
      console.log(googleUser.getBasicProfile());
      let id_token = googleUser.getAuthResponse().id_token;
      console.log({ id_token }, " <<<<<<<<<<<< Ini Token dari gugel");

      axios
        .post(`/googleLogin`, { id_token })
        .then((response) => {
          console.log(response);
          localStorage.setItem("access_token", response.data.access_token);
          this.$emit("changePage", "homePage");
          this.$emit("setLogin", true);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Login in successfully",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  components: {
    GoogleLogin,
  },
};
</script>

<style></style>
