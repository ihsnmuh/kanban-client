import axios from "axios";

export default axios.create({
  baseURL: "https://kanban-mu.herokuapp.com/",
});
