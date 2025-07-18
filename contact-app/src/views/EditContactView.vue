<template>
  <div v-if="contactExists">
    <h1>Edit Contact</h1>
    <form @submit.prevent="updateContact">
      <div>
        <label for="firstName">First Name:</label>
        <input v-model="firstName" id="firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input v-model="lastName" id="lastName" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input v-model="phone" id="phone" required />
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
  <div v-else>
    <p>Contact not found.</p>
  </div>
</template>

  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()

  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const phone = ref('')
  const contactExists = ref(false)

  onMounted(() => {
    const stored = localStorage.getItem('contacts')
    const contacts = stored ? JSON.parse(stored) : []
    const index = parseInt(route.params.id)
  
    if (contacts[index]) {
    firstName.value = contacts[index].firstName
    lastName.value = contacts[index].lastName
    email.value = contacts[index].email
    phone.value = contacts[index].phone
    contactExists.value = true
  }
  })

  const updateContact = () => {
  const stored = localStorage.getItem('contacts')
  const contacts = stored ? JSON.parse(stored) : []
  const index = parseInt(route.params.id)

  if (contacts[index]) {
    contacts[index] = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value
    }

    localStorage.setItem('contacts', JSON.stringify(contacts))
    router.push(`/contact/${index}`)
  }
}
  </script>
  
  