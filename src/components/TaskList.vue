<template>
  <div class="container">
    <!-- <h3>Tasks</h3> -->
    <ul class="task-list">
      <li v-for="task in projectTasks" :key="task.id">
        <div>
          <h4>{{ task.title }}</h4>
          <p>{{ task.description }}</p>
          <p>Status: {{ task.status }}</p>
        </div>
        <div class="task-actions">
          <button class="button" @click="openEditModal(task)">Edit</button>
          <button class="button" @click="deleteTask(task.id)">Delete</button>
        </div>
      </li>
  </ul>
  <div class="task-form">
    <div v-if="showEditModal" class="modal">
      <form @submit.prevent="saveEditedTask" class="modal-content">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="editedTask.title" required>
        <label for="description">Description:</label>
        <textarea id="description" v-model="editedTask.description"></textarea>
        <div>
        <label for="status">Status</label>
        <select name="" id="status" v-model="editedTask.status" required>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
        <div class="buttons">
          <button class="button" type="submit">Guardar</button>
          <button class="button" click="closeEditModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    props: {
      projectid: {
        type: Number,
        required: true
      }
    },
    computed: {
      ...mapState('tasks', ['tasks']),
      projectTasks() {
        return this.tasks.filter(task => task.projectId === this.projectId)
      }
    },
    data() {
      return {
        showEditModal: false,
        editedProject: null
      }
    },
    methods: {
      ...mapActions('tasks', ['fetchTasks', 'updateTask', 'deleteTask']), 
      openEditModal (task) {
        this.editedTask = {...task}
        this.showEditModal = true
    },
    closeEditModal() {
      this.showEditModal = false
    },
    saveEditedTask() {
      this.updateTask(this.editedTask)
      this.closeEditModal()
    },
    deleProject(taskId) {
      this.$store.dispatch('tasks/deleteTask', taskId)
    }
  },
  created() {
    this.fetchTasks()
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
  gap: 1em;
}
.completed {
  text-decoration: line-throught
}

.container {
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
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100; /* Ensure modal is on top */
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

.task-list {
  display: flex;
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

.task-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
}

.task-item {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-actions {
  display: flex;
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

  .task-list {
    grid-template-columns: 1fr;
  }
}
</style>