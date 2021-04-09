<template>
  <div class="card mb-3 shadow">
    <div class="card-header">{{ task.title }}</div>
    <div class="card-body">
      <p class="card-subtitle mb-2 text-muted">
        {{ task.User.username }}
      </p>
      <p class="card-text">
        {{ task.description }}
      </p>
      <p class="card-text">Priority: {{ task.priority }}</p>
      <button
        v-if="task.category !== 'Backlog'"
        class="btn btn-outline-warning btn-sm"
        @click.prevent="backTask(task.id)"
      >
        ←
      </button>
      <button
        class="btn btn-primary btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#EditTaskModal"
        @click.prevent="editTask(task.id)"
      >
        Edit
      </button>
      <button
        class="btn btn-danger btn-sm"
        @click.prevent="deleteTask(task.id)"
      >
        Delete
      </button>
      <button
        v-if="task.category !== 'Done'"
        class="btn btn-outline-success btn-sm"
        @click.prevent="nextTask(task.id)"
      >
        →
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["task"],
  methods: {
    deleteTask(id) {
      console.log(">>>>> Button Delete", id);
      this.$emit("deleteTask", id);
    },
    editTask(id) {
      console.log(">>>>> Button Edit", id);
      this.$emit("editTask", id);
    },
    nextTask(id) {
      console.log(this.task.category);
      const payload = { id, category: this.task.category };
      console.log(">>>>> Button Next", payload);
      this.$emit("nextTask", payload);
    },
    backTask(id) {
      console.log(this.task.category);
      const payload = { id, category: this.task.category };
      console.log(">>>>> Button Back", payload);
      this.$emit("backTask", payload);
    },
  },
};
</script>

<style></style>
