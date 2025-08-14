<template>
  <div>
    <div class="form-container">
      <h1>Edit Contact</h1>

      <form @submit.prevent="updateContact">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="contact.firstName" required />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="contact.lastName" required />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="contact.email" id="email" type="email" required />
        </div>

        <div class="form-group">
          <label for="phone">Phone:</label>
          <input v-model="contact.phone" id="phone" type="tel" />
        </div>

        <div class="form-group">
          <label for="occupation">Occupation:</label>
          <input v-model="contact.occupation" id="occupation" type="text" />
        </div>

        <div class="form-buttons">
          <button type="submit" class="btn btn-primary">Update Contact</button>
          <router-link to="/" class="btn btn-secondary">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const contact = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  occupation: ''
})

onMounted(() => {
  const stored = localStorage.getItem('contacts')
  const contacts = stored ? JSON.parse(stored).sort((a, b) => {
    const aName = a.lastName || a.name?.split(' ')[1] || ''
    const bName = b.lastName || b.name?.split(' ')[1] || ''
    return aName.localeCompare(bName)
  }) : []
  
  const contactToEdit = contacts[route.params.id]
  if (contactToEdit) {
    contact.value = { ...contactToEdit }
  } else {
    router.push('/')
  }
})

const updateContact = () => {
  const stored = localStorage.getItem('contacts')
  const contacts = stored ? JSON.parse(stored).sort((a, b) => {
    const aName = a.lastName || a.name?.split(' ')[1] || ''
    const bName = b.lastName || b.name?.split(' ')[1] || ''
    return aName.localeCompare(bName)
  }) : []

  // Update the contact at the correct index
  if (contacts[route.params.id]) {
    contacts[route.params.id] = contact.value
    localStorage.setItem('contacts', JSON.stringify(contacts))
    router.push(`/contact/${route.params.id}`)
  }
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.form-container h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-size: 2em;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
  font-size: 1.1em;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: all 0.3s ease;
  min-width: 120px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(149, 165, 166, 0.3);
}

@media (max-width: 768px) {
  .form-container {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .form-buttons {
    flex-direction: column;
    gap: 10px;
  }
  
  .btn {
    width: 100%;
  }
}
</style>