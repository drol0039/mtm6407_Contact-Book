<template>
    <div>
      <h1>Add Contact</h1>
      <form @submit.prevent="addContact">
        <div class="form-group">
        <label for="firstName">First Name:</label>
        <input v-model="firstName" id="firstName" required />
        </div>
        <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input v-model="lastName" id="lastName" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" id="email" type="email" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input v-model="phone" id="phone" required />
        </div>
        <div class="form-group">
          <label for="occupation">Occupation:</label>
          <input v-model="occupation" type="text" 
          placeholder="e.g., Designer, Engineer..."  required />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const phone = ref('')
  const occupation= ref('')
  const router = useRouter()
    
  const addContact = () => {
    const newContact = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),    
    occupation: occupation.value.trim()
  }
  
    const stored = localStorage.getItem('contacts')
    const contacts = stored ? JSON.parse(stored) : []
  
    contacts.push(newContact)
    localStorage.setItem('contacts', JSON.stringify(contacts))
  
    router.push('/')
}
  </script>

  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: auto;
  }
  .form-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  width: 100px;
  font-weight: 300;
  white-space: nowrap;
}

  input {
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #535bf2;
}
</style>
   