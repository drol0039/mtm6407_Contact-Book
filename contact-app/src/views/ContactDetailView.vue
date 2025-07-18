<template>
    <div v-if="contact">
    <h1>{{ contact.name }}</h1>
    <p>Email: {{ contact.email }}</p>
    <p>Phone: {{ contact.phone }}</p>

    <router-link :to="`/edit/${route.params.id}`">Edit</router-link>
    <button @click="deleteContact">Delete</button>

  </div>
  <div v-else>
    <p>Contact not found.</p>
  </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const router = useRouter()
  const contact = ref(null)
  
  onMounted(() => {
  const stored = localStorage.getItem('contacts')
  const contacts = stored ? JSON.parse(stored) : []
  contact.value = contacts[route.params.id] || null
})

const deleteContact = () => {
  const stored = localStorage.getItem('contacts')
  const contacts = stored ? JSON.parse(stored) : []

  contacts.splice(route.params.id, 1)
  localStorage.setItem('contacts', JSON.stringify(contacts))

  router.push('/') // go back to home after deletion
}

  </script>
  
  