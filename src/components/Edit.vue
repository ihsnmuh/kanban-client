<template>
  <!-- Edit Card Modal-->
  <div
    class="modal fade"
    id="EditTaskModal"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-radius">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">Edit Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              v-model="dataEdit.title"
              required
            />
            <label for="floatingInput">Title Task</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              v-model="dataEdit.description"
              required
            />
            <label for="floatingPassword">Description</label>
          </div>
          <div class="form-floating mb-3">
            <select
              class="form-select"
              v-model="dataEdit.category"
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
              v-model="dataEdit.priority"
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
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="updateTask"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
  props: ["dataEdit"],
  data() {
    return {};
  },
  methods: {
    updateTask() {
      let dataNew = {
        id: this.dataEdit.id,
        title: this.dataEdit.title,
        description: this.dataEdit.description,
        category: this.dataEdit.category,
        priority: this.dataEdit.priority,
        userId: this.dataEdit.userId,
      };

      console.log(dataNew);

      this.$emit("updateTask", dataNew);

      //kosongin lagi
      this.title = "";
      this.description = "";
      this.category = "";
      this.priority = "";
    },
  },
  // created() {
  //   if (this.dataEdit) {
  //     this.title = this.dataEdit.title;
  //     this.description = this.dataEdit.description;
  //     this.category = this.dataEdit.category;
  //     this.priority = this.dataEdit.priority;
  //   }
  // },
};
</script>

<style></style>
