<template>
  <!-- Body Card -->
  <div class="container-fluid p-3 rounded" id="body-card">
    <div class="row">
      <Category
        v-for="(cat, i) in categories"
        :key="i"
        :category="cat"
        :tasks="tasks"
      ></Category>
    </div>
  </div>
</template>

<script>
import Category from "../components/Category";
import axios from "../api/axios";
export default {
  name: "Home",
  data() {
    return {
      //kategori dari data
      categories: ["Backlog", "Todo", "Doing", "Done"],
    };
  },
  props: ["tasks"],
  components: { Category },
  methods: {
    fetchTasks() {
      this.$emit("fetchTasks");
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style></style>
