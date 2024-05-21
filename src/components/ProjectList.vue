<template>
  <div class="container">
    <h2>Proyectos</h2>
    <div>
      <label>Filtrar por:</label>
      <select v-model="filter" @change="setFilter">
        <option value="all">Todos</option>
        <option value="active">Activos</option>
        <option value="completed">completed</option>
      </select>
    </div>
    <!-- <search-bar @search="setSearch"></search-bar> -->
    <ul class="project-list">
      <li class="project-item" v-for="project in projects" :key="project.id">
        <div class="project-desc">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
        </div>
        <div class="project-actions">
          <button class="button" @click="openEditModal(project)">Editar</button>
          <button class="button" @click="deleteProject(project.id)">Eliminar</button>
        </div>
      </li>
    </ul>
    <div class="project-form">
      <!-- modal para editar proyecto -->
      <div v-if="showEditModal" class="modal">
        <form @submit.prevent="saveEditedProject" class="modal-content">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="editedProject.name" required>
        <label for="description">Description:</label>
        <textarea id="description" v-model="editedProject.description"></textarea>
        <div class="buttons">
          <button class="button" type="submit">Guardar</button>
          <button class="button" @click="closeEditModal">Cancelar</button>
        </div>
      </form>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  computed: {
    ...mapState('projects', ['projects']),
  },
  data() {
    return {
      showEditModal: false,
      editedProject: null
    }
  },
  methods: {
    ...mapActions('projects', ['fetchProjects', 'updateProject', 'deleProject']),
    openEditModal (project) {
      this.editedProject = {...project }
      this.showEditModal = true
    },
    closeEditModal() {
      this.showEditModal = false
    },
    saveEditedProject() {
      this.updateProject(this.editedProject)
      this.closeEditModal()
    },
    deleteProject(projectId) {
      this.$store.dispatch('projects/deleteProject', projectId)
    }
  },
  created() {
    this.fetchProjects()
  }
}
</script>

<style scoped>
.button {
  min-width: 120px;

  position: relative;
  cursor: pointer;

  padding: 12px 17px;
  border: 0;
  border-radius: 7px;

  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  background: radial-gradient(
    ellipse at bottom,
    rgba(71, 81, 92, 1) 0%,
    rgba(11, 21, 30, 1) 45%
  );

  color: rgb(255, 255, 255, 0.66);

  transition: all 1s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.button::before {
  content: "";
  width: 70%;
  height: 1px;

  position: absolute;
  bottom: 0;
  left: 15%;

  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.2;

  transition: all 1s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.button:hover {
  color: rgb(255, 255, 255, 1);
  transform: scale(1.1) translateY(-3px);
}

.button:hover::before {
  opacity: 1;
}

.buttons {
  display: flex;
  gap: 2em
}
.container {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 2rem;
}

.container h2 {
  text-align: center;
  margin-bottom: 1em;
}

form .buttons {
  display: flex;
  justify-content: space-between
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff; /* Light background for content */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Drop shadow */
  max-width: 600px; /* Limit modal width */
  margin: 0 auto; /* Center modal horizontally */
}

/* Form styling */
.modal-content label {
  color: hsla(160, 100%, 37%, 1);
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.modal-content input,
.modal-content textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-content {
    max-width: 90%; /* Adjust max width for smaller screens */
  }
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
}

.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3em;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.project-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  justify-content: flex-end;
  margin-top: 1rem;
}

.task-list, .task-form {
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
  }

  .filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .project-list {
    grid-template-columns: 1fr;
  }
}
</style>

