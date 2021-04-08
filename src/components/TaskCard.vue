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
      >
        Edit
      </button>
      <button class="btn btn-danger btn-sm">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["task"],
};
</script>

<style></style>
