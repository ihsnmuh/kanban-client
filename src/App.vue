<template>
  <div>
    <!-- Mewariskan pake V bind -->
    <Navbar
      :isLoginChild="isLogin"
      @changePage="changePage"
      @setLogin="setLogin"
    ></Navbar>
    <Home
      v-if="activePage === 'homePage'"
      :tasks="tasks"
      @fetchTasks="fetchTasks"
      @deleteTask="deleteTask"
      @editTask="getTaskById"
      @nextTask="patchTask"
      @backTask="patchBackTask"
    ></Home>
    <Login
      v-else-if="activePage === 'loginPage'"
      @changePage="changePage"
      @setLogin="setLogin"
    ></Login>
    <Register
      v-else-if="activePage === 'registerPage'"
      @changePage="changePage"
    ></Register>
    <!-- Edit masih muncul pas Unauthorized tapi ngga bisa diklick juga kok -->
    <Edit @updateTask="updateTask" :dataEdit="dataEdit"></Edit>
    <Add @addTask="addTask"></Add>
  </div>
</template>

<script>
// Daftar komponen yang akan digunakan
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Navbar from "./components/Navbar";
import axios from "./api/axios";

export default {
  name: "App",
  data() {
    return {
      message: "Hello world",
      activePage: "loginPage",
      isLogin: false,
      tasks: [],
      dataEdit: {},
    };
  },
  components: { Home, Login, Register, Add, Edit, Navbar },
  //setiap ada perubahan yang menggati adalah Parent baru diwariskan ke anak anaknya
  methods: {
    changePage(pageName) {
      this.activePage = pageName;
    },
    setLogin(val) {
      this.isLogin = val;
    },
    fetchTasks() {
      axios
        .get("/tasks", {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then(({ data }) => {
          console.log(data, "<<<<<< DIDATA");
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err, "<<<<< INI ERROR FATCHTASKS");
        });
    },
    addTask(data) {
      axios
        .post("/tasks", data, {
          headers: { access_token: localStorage.access_token },
        })
        .then(({ data }) => {
          this.tasks.push(data);
          this.changePage("homePage");
          this.fetchTasks();
          // notif
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
            title: "Add Task is successfully",
          });
        })
        .catch((err) => {
          console.log(err, "<<<<< ERROR ADD TASK");
          Swal.fire({
            icon: "error",
            title: "Please input correctly",
            text: `${err.response.data.message}`,
          });
        });
    },
    deleteTask(id) {
      axios
        .delete(`/tasks/${id}`, {
          headers: { access_token: localStorage.access_token },
        })
        .then((response) => {
          //   console.log(response);
          console.log("Success to delete");
          this.fetchTasks();
          // notif
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
            title: "Delete is successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You cannot delete this Task !",
          });
        });
    },
    getTaskById(id) {
      axios
        .get(`/tasks/${id}`, {
          headers: { access_token: localStorage.access_token },
        })
        .then(({ data }) => {
          console.log(data, "<<<<<< DIDATA");
          this.dataEdit = data;
        })
        .catch((err) => {
          console.log(err, "<<<<< INI ERROR Get ID");
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You cannot access this Task !",
          });
        });
    },
    updateTask(payload) {
      let { id, title, description, category, priority } = payload;
      axios
        .put(
          `/tasks/${id}`,
          { title, description, category, priority },
          {
            headers: { access_token: localStorage.access_token },
          }
        )
        .then((response) => {
          //   console.log(response);
          console.log("Success to Update");
          this.fetchTasks();
          // notif
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
            title: "Update is successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Please input correctly",
            text: `${err.response.data.message}`,
          });
        });
    },
    patchTask(payload) {
      let { id, category } = payload;
      console.log(id, "INI DATA YANG DIAMBIL");
      //   console.log("masuk di APP", id);

      switch (category) {
        case "Backlog":
          category = "Todo";
          break;
        case "Todo":
          category = "Doing";
          break;
        case "Doing":
          category = "Done";
          break;
        default:
          break;
      }

      axios
        .patch(
          `/tasks/${id}`,
          { category },
          {
            headers: { access_token: localStorage.access_token },
          }
        )
        .then((response) => {
          //   console.log(response);
          console.log("Success to Patch Next");
          this.fetchTasks();
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
            title: "Category has been changed",
          });
        })
        .catch((err) => {
          console.log(err);
          // swal(`${JSON.stringify(err.response.data.message)}`);
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: `You dont have access!`,
          });
        });
    },

    patchBackTask(payload) {
      let { id, category } = payload;
      console.log(id, "INI DATA YANG DIAMBIL");
      //   console.log("masuk di APP", id);

      switch (category) {
        case "Done":
          category = "Doing";
          break;
        case "Doing":
          category = "Todo";
          break;
        case "Todo":
          category = "Backlog";
          break;
        default:
          break;
      }

      axios
        .patch(
          `/tasks/${id}`,
          { category },
          {
            headers: { access_token: localStorage.access_token },
          }
        )
        .then((response) => {
          //   console.log(response);
          console.log("Success to Patch Back");
          this.fetchTasks();
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
            title: "Category has been changed",
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: `You dont have access!`,
          });
        });
    },
  },
  created() {
    if (localStorage.access_token) {
      this.setLogin(true);
      this.changePage("homePage");
    } else {
      this.changePage("loginPage");
    }
  },
};
</script>

<style scoped></style>
