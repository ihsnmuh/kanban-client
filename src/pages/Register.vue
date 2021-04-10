<template>
  <!-- Register -->
  <div id="form-register">
    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card bg-light border-radius shadow-lg">
            <div class="card-body">
              <form @submit.prevent="register" id="register">
                <center>
                  <h3 class="mb-3" style="font-weight: bold; color: #0d6efd">
                    Register
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
                  <label for="username" class="form-label">Username:</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="username"
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
                <div class="col d-grid gap-2">
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
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
  name: "Register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    register() {
      let { email, username, password } = this;

      let payload = { email, username, password };

      axios
        .post("/register", payload)
        .then(({ data }) => {
          this.$emit("changePage", "loginPage");
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
            title: "Register in successfully",
          });
        })
        .catch((err) => {
          console.log(err, ">>>>>> ERROR LOGIN");
          if (err.response.status === 400) {
            Swal.fire({
              title: "Email / Username already exists!",
              text: "Enter the correct Email / Username",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .then(() => {
          (this.email = ""), (this.username = ""), (this.password = "");
        });
    },
  },
};
</script>

<style></style>
