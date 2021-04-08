<template>
  <div>
    <!-- Mewariskan pake V bind -->
    <Navbar :isLoginChild="isLogin" @changePage="changePage"></Navbar>
    <Home
      v-if="activePage === 'homePage'"
      :tasks="tasks"
      @fetchTasks="fetchTasks"
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
    <Edit></Edit>
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
        .get("./tasks", {
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
