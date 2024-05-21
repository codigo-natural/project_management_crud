import { createStore } from "vuex";
import projects from "./modules/projects";
import tasks from "./modules/tasks";

export const store = createStore({
  modules: {
    projects,
    tasks,
  },
});
