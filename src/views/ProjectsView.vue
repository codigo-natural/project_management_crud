<script setup>
import ProjectForm from '@/components/ProjectForm.vue';
import ProjectList from '@/components/ProjectList.vue';
</script>

<template>
  <main>
    <h1>Projects Management</h1>
    <ProjectList />
    <ProjectForm />
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