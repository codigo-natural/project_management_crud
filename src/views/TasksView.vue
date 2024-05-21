<script setup>
import TaskList from '../components/TaskList.vue'
import TaskForm from '../components/TaskForm.vue'
</script>

<template>
<main>
  <h1>Tasks Management</h1>
  <TaskList />
  <TaskForm />
</main>
</template>

<style scoped>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>