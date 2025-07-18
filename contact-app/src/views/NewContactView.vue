<template>
    <div>
      <h1>Add Contact</h1>
      <form @submit.prevent="addContact">
        <div>
          <label for="name">Name:</label>
          <input v-model="name" id="name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="email" id="email" type="email" required />
        </div>
        <div>
          <label for="phone">Phone:</label>
          <input v-model="phone" id="phone" required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const name = ref('')
  const email = ref('')
  const phone = ref('')
  const router = useRouter()
  
  const addContact = () => {
    const newContact = { name: name.value, email: email.value, phone: phone.value }
  
    const stored = localStorage.getItem('contacts')
    const contacts = stored ? JSON.parse(stored) : []
  
    contacts.push(newContact)
    localStorage.setItem('contacts', JSON.stringify(contacts))
  
    router.push('/')
  }
  </script>
  
  