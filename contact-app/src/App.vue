<template>
  <div id="app">
    <!-- Header/Cover Section -->
    <header class="app-header">
      <h1><i class="fas fa-address-book"></i> Contact Book</h1>
      <p>Manage your contacts!</p>
    </header>

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
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header-Cover Styling */
.app-header {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  text-align: center;
  padding: 40px 20px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);
}

.app-header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.app-header p {
  font-size: 1.2em;
  opacity: 0.9;
  margin: 0;
}

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
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

nav a.router-link-active {
  font-weight: bold;
  background: #646cff;
  color: white;
}

nav a:hover {
  background: #535bf2;
  color: white;
  text-decoration: none;
}

hr {
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, #ddd, transparent);
  margin: 20px 0;
}
</style>