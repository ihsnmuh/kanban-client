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
        class="btn btn-info btn-sm"
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
      <button class="btn btn-success btn-sm" @click.prevent="nextTask(task.id)">
        Next
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
      console.log(">>>>> Button Next", id);
    },
  },
};
</script>

<style></style>
