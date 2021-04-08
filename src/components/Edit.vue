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
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Title Task</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Description</label>
          </div>
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="floatingSelectCategory"
              aria-label="Floating label select example"
            >
              <option selected>Open this select category</option>
              <option value="backlog">Backlog</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <label for="floatingSelect">Category</label>
          </div>
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="floatingSelectPriority"
              aria-label="Floating label select example"
            >
              <option selected>Open this select Priority</option>
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
          <button type="button" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
};
</script>

<style></style>
