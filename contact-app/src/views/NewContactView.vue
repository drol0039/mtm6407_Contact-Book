<template>
  <div>
    <div class="form-container">
      <h1>Add Contact</h1>

      <form @submit.prevent="addContact">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" required  />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" required />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" id="email" type="email" required />
        </div>

        <div class="form-group">
          <label for="phone">Phone:</label>
          <input v-model="phone" id="phone" required />
        </div>

        <div class="form-button">
          <button type="submit">Save</button>
        </div>
     
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const router = useRouter()

const addContact = () => {
  const newContact = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value
  }

  const stored = localStorage.getItem('contacts')
  const contacts = stored ? JSON.parse(stored) : []

  contacts.push(newContact)
  localStorage.setItem('contacts', JSON.stringify(contacts))

  router.push('/')
}
</script>


  
  