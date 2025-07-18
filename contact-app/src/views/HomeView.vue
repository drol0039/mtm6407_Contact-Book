<template>
    <div>
      <h1>Contact List</h1>
      <ul>
        <li v-for="(contact, index) in contacts" :key="index">
        <router-link :to="`/contact/${index}`">
          {{ contact.name }}
        </router-link>
        — {{ contact.email }} — {{ contact.phone }}
      </li>   
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const contacts = ref([])
  
  onMounted(() => {
    const stored = localStorage.getItem('contacts')
    contacts.value = stored ? JSON.parse(stored) : []
  })
  </script>
  
  