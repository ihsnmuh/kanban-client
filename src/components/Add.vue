<template>
  <!-- Add Card Modal-->
  <div
    class="modal fade border-radius"
    id="AddTaskModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-radius">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" v-model="title" required />
            <label for="floatingInput">Title Task</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              v-model="description"
              required
            />
            <label for="floatingPassword">Description</label>
          </div>
          <div class="form-floating mb-3">
            <select
              class="form-select"
              v-model="category"
              aria-label="Floating label select example"
              required
            >
              <option value="Backlog">Backlog</option>
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
            <label for="floatingSelect">Category</label>
          </div>
          <div class="form-floating mb-3">
            <select
              class="form-select"
              v-model="priority"
              aria-label="Floating label select example"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <label for="floatingSelect">Level Priority</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-primary"
            @click="addTask"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Add",
  data() {
    return {
      title: "",
      description: "",
      category: "",
      priority: "",
    };
  },
  methods: {
    addTask() {
      let { title, description, category, priority } = this;
      let data = { title, description, category, priority };
      this.$emit("addTask", data);

      //kosongin lagi
      this.title = "";
      this.description = "";
      this.category = "";
      this.priority = "";
    },
  },
};
</script>

<style></style>
