import axios from 'axios'
const DB = import.meta.env.VITE_DB_URL

const state = {
  projects: [],
  // filter: "all",
  // searchTerm: "",
};


const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = projects;
  },
  ADD_PROJECT(state, project) {
    state.projects.push(project);
  },
  UPDATE_PROJECT(state, project) {
    const index = state.projects.findIndex((p) => p.id === project.id);
    state.projects[index] = project;
  },
  DELETE_PROJECT(state, projectId) {
    const index = state.projects.findIndex((p) => p.id !== projectId);
    state.projects.splice(index, 1);
  }
  // SET_FILTER(state, filter) {
  //   state.filter = filter;
  // },
  // SET_SEARCH(state, searchTerm) {
  //   state.searchTerm = searchTerm;
  // },
}

// const getters = {
//   filteredProjects: (state) => {
//     let projects = state.projects;
//     if (state.filter === "active") {
//       projects = projects.filter((project) => !project.completed);
//     } else if (state.filter === "completed") {
//       projects = projects.filter((project) => project.completed);
//     }
//     if (state.searchTerm) {
//       projects = projects.filter((project) =>
//         project.name.toLowerCase().includes(state.searchTerm.toLowerCase())
//       );
//     }
//     return projects;
//   },
// };

const actions = {
  async fetchProjects({ commit }) {
    const response = await axios.get(`${DB}/projects`)
    commit('SET_PROJECTS', response.data)
  },
  async addProject({ commit }, project) {
    const response = await axios.post('http://localhost:8000/projects', project)
    commit('ADD_PROJECT', response.data)
  },
  async updateProject({ commit }, project) {
    const response = await axios.put(`${DB}/projects/${project.id}`, project)
    commit('UPDATE_PROJECT', response.data)
  },
  async deleteProject({ commit }, projectId) {
    await axios.delete(`${DB}/projects/${projectId}`)
    commit('DELETE_PROJECT', projectId)
  },
  async setFilter({ commit }, filter) {
    commit('SET_FILTER', filter)
  },
  async setSearch({ commit }, searchTerm) {
    commit('SET_SEARCH', searchTerm)
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations,
};