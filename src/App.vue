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
    <Add @addTask="addTask"></Add>
    <Edit @updateTask="updateTask" :dataEdit="dataEdit"></Edit>
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
        })
        .catch((err) => {
          console.log(err, "<<<<< ERROR ADD TASK");
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
        })
        .catch((err) => {
          console.log(err);
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
        })
        .catch((err) => {
          console.log(err);
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
