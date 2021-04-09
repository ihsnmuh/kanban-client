<template>
  <!-- BACKLOG LIST -->
  <div class="col-lg-3 col-md-6 col-12" id="backlog-list">
    <div :class="changeColor">
      <div class="row">
        <div class="col mt-3">
          <h4 class="text-center">{{ category }}</h4>
          <hr class="garis" />
          <!-- Task Card -->
          <div id="task-list">
            <TaskCard
              v-for="task in groupesTasks"
              :key="task.id"
              :task="task"
              @deleteTask="deleteTaskNew"
              @editTask="editTaskNew"
              @nextTask="nextTaskNew"
              @backTask="backTaskNew"
            ></TaskCard>
          </div>
          <!-- batas -->
        </div>
      </div>
      <div class="d-grid gap-2">
        <hr class="garis" />
        <button
          class="btn btn-light mb-3 shadow"
          data-bs-toggle="modal"
          data-bs-target="#AddTaskModal"
          type="button"
        >
          Add Task
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard";
export default {
  name: "Category",
  components: { TaskCard },
  props: ["category", "tasks"],
  computed: {
    groupesTasks() {
      return this.tasks.filter((task) => task.category == this.category);
    },
    changeColor() {
      let color = "";

      switch (this.category) {
        case "Backlog":
          color = this.styles[0];
          break;
        case "Todo":
          color = this.styles[1];
          break;
        case "Doing":
          color = this.styles[2];
          break;
        case "Done":
          color = this.styles[3];
          break;
        default:
          break;
      }

      return color;
    },
  },
  methods: {
    deleteTaskNew(id) {
      this.$emit("deleteTask", id);
    },
    editTaskNew(id) {
      this.$emit("editTask", id);
    },
    nextTaskNew(id) {
      this.$emit("nextTask", id);
    },
    backTaskNew(id) {
      this.$emit("backTask", id);
    },
  },
  data() {
    return {
      styles: [
        "container bg-danger shadow-lg border-radius",
        "container bg-warning shadow-lg border-radius",
        "container bg-primary shadow-lg border-radius",
        "container bg-success shadow-lg border-radius",
      ],
    };
  },
};
</script>

<style></style>
