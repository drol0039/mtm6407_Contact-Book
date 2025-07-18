<template>
    <div>
      <h1>Edit Contact</h1>
      <form @submit.prevent="updateContact">
        <input v-model="contact.name" placeholder="Name" required />
        <input v-model="contact.email" placeholder="Email" required />
        <input v-model="contact.phone" placeholder="Phone" required />
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const id = route.params.id
  
  const contact = ref({ name: '', email: '', phone: '' })
  
  onMounted(() => {
    const stored = localStorage.getItem('contacts')
    const contacts = stored ? JSON.parse(stored) : []
  
    if (contacts[id]) {
      contact.value = { ...contacts[id] }
    }
  })
  
  function updateContact() {
    const stored = localStorage.getItem('contacts')
    const contacts = stored ? JSON.parse(stored) : []
    contacts[id] = contact.value
    localStorage.setItem('contacts', JSON.stringify(contacts))
    router.push('/')
  }
  </script>
  
  