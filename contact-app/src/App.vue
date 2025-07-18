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
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

nav a {
  margin: 0 0.5rem;
  color: #646cff;
  text-decoration: none;
  font-weight: 500;
}
nav a.router-link-active {
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}


</style>
