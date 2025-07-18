<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/new">Add Contact</router-link>
    </nav>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
nav {
  padding: 1rem;
}
router-link {
  margin-right: 1rem;
  text-decoration: none;
  color: #42b983;
}
router-link.router-link-active {
  font-weight: bold;
}
</style>
