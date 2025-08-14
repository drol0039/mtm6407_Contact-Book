<template>
  <div v-if="contact">
    <h1>{{ contact.lastName }}, {{ contact.firstName }}</h1>
    <p>Email: {{ contact.email }}</p>
    <p>Phone: {{ contact.phone }}</p>

    <div class="button-container">
      <router-link :to="`/edit/${route.params.id}`" class="btn edit-btn">Edit</router-link>
      <button @click="deleteContact" class="btn delete-btn">Delete</button>
    </div>
  </div>

  <div v-else>
    <p>Contact not found.</p>
  </div>
</template>
  
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const contact = ref(null)

onMounted(() => {
  const stored = localStorage.getItem('contacts')
  const contacts = stored ? JSON.parse(stored).sort((a, b) => {
    const aName = a.lastName || a.name?.split(' ')[1] || ''
    const bName = b.lastName || b.name?.split(' ')[1] || ''
    return aName.localeCompare(bName)
  }) : []
  
  contact.value = contacts[route.params.id] || null
})

const deleteContact = () => {
  const stored = localStorage.getItem('contacts')
  const contacts = stored ? JSON.parse(stored).sort((a, b) => {
    const aName = a.lastName || a.name?.split(' ')[1] || ''
    const bName = b.lastName || b.name?.split(' ')[1] || ''
    return aName.localeCompare(bName)
  }) : []

  // Delete from the SORTED array (same as display)
  contacts.splice(parseInt(route.params.id), 1)
  localStorage.setItem('contacts', JSON.stringify(contacts))

  router.push('/')
}
</script>

<style scoped>
.button-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.edit-btn {
  background: #4ca2af;
  color: white;
}

.edit-btn:hover {
  background: #535bf2;
  color:white
}

.delete-btn {
  background: #289ae1;
  color: white;
}

.delete-btn:hover {
  background: #f99f99;
}

@media (max-width: 768px) {
  .button-container {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  .btn {
    .btn {
    display: block;
    margin: 10px 0; /* Stack buttons vertically on mobile */
    width: 100%;
  }
  }
}
</style>