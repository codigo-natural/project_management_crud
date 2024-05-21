import axios from "axios";


const state = {
  tasks: [],
};

// const getters = {
//   taskStats: (state) => (projectId) => {
//     const projectTasks = state.tasks.filter(
//       (task) => task.projectId === projectId
//     );
//     const stats = {
//       pending: 0,
//       inProgress: 0,
//       completed: 0,
//     };
//     projectTasks.forEach((task) => {
//       if (task.status === "pending") {
//         stats.pending++;
//       } else if (task.status === "inProgress") {
//         stats.inProgress++;
//       } else {
//         stats.completed++;
//       }
//     });
//     return stats;
//   },
// };

const actions = {
  async fetchTasks({ commit }) {
    const response = await axios.get("http://localhost:8000/tasks");
    commit("SET_TASKS", response.data);
  },
  async addTask({ commit }, task) {
    const response = await axios.post("http://localhost:8000/tasks", task);
    commit("ADD_TASK", response.data);
  },
  async updateTask({ commit }, task) {
    const response = await axios.put(`http://localhost:8000/tasks/${task.id}`, task);
    commit("UPDATE_TASK", response.data);
  },
  async deleteTask({ commit }, taskId) {
    await axios.delete(`http://localhost:8000/tasks/${taskId}`);
    commit("REMOVE_TASK", taskId);
  }
}

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },
  UPDATE_TASK(state, task) {
    const index = state.tasks.findIndex((t) => t.id === task.id);
    state.tasks.splice(index, 1, task);
  },
  REMOVE_TASK(state, taskId) {
    const index = state.tasks.findIndex((t) => t.id === taskId);
    state.tasks.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations,
};
