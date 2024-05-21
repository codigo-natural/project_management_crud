<script setup>
import logoLinktic from '../assets/logo-linktic.svg'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div>
          <img class="logo" :src="logoLinktic" />
        </div>
        <div>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/tasks">Tasks</RouterLink>
          <RouterLink to="/projects">Projects</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

nav {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  text-align: center;
  /* margin-top: 2rem; */
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .logo {
    width: 55%;
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
  }
}
</style>
