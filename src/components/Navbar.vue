<template>
  <!-- NAVBAR -->
  <nav
    class="navbar sticky-top navbar-expand-lg navbar-light ms-md-auto"
    style="background-color: #e3f2fd"
  >
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <div class="col-2">
          <a class="navbar-brand" href="#" style="font-weight: bold">
            <img
              src="/asset//kanban-icon.svg"
              alt=""
              width="30"
              height="30"
              class="d-inline-block align-text-top"
            />
            Kanban'Mu
          </a>
        </div>
        <div class="col-2"></div>
        <div class="col-8 text-end">
          <!-- Ada Penanda -->
          <div v-if="isLoginChild">
            <button
              class="btn btn-outline-dark btn-sm rounded"
              data-bs-toggle="modal"
              data-bs-target="#AddTaskModal"
            >
              Add Task
            </button>
            <button
              @click.prevent="logout"
              class="btn btn-danger btn-sm rounded"
              type="button"
            >
              Logout
            </button>
          </div>
          <div v-else>
            <button
              class="btn btn-dark btn-sm rounded"
              @click.prevent="changePage('loginPage')"
            >
              Login
            </button>
            <button
              class="btn btn-outline-dark btn-sm rounded"
              @click.prevent="changePage('registerPage')"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  //warisan yang dikirimkan dari App dalam bentuk Array
  props: ["isLoginChild"],
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    logout() {
      this.$emit("changePage", "loginPage");
      this.$emit("setLogin", false);
      localStorage.clear();
      const auth2 = gapi.auth2.getAuthInstance(); // menghilngkan akses google
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
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
        title: "Logout in successfully",
      });
    },
  },
};
</script>

<style></style>
