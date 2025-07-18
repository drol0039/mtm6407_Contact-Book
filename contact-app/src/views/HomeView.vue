<template>
  <div>
    <h1>Contact List</h1>
    <ul class="contact-list">
      <li v-for="(contact, index) in contacts" :key="index" class="contact-item">
        <router-link :to="'/contact/' + index" class="contact-name">
        {{ contact.lastName }}, {{ contact.firstName }}
        </router-link>

        <span class="contact-email">{{ contact.email }}</span>
        <span class="contact-phone">{{ contact.phone }}</span>

      </li>
    </ul>
  </div>
</template>


<script setup>
  import { ref, onMounted } from 'vue'

  const contacts = ref([])

  onMounted(() => {
    const stored = localStorage.getItem('contacts')
    contacts.value = stored
      ? JSON.parse(stored).sort((a, b) => {
          const aName = a.lastName || a.name?.split(' ')[1] || ''
          const bName = b.lastName || b.name?.split(' ')[1] || ''
          return aName.localeCompare(bName)
        })
      : []
  })

  const addContact = () => {
  const newContact = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
  }

  const stored = localStorage.getItem('contacts')
  const existing = stored ? JSON.parse(stored) : []
  existing.push(newContact)
  localStorage.setItem('contacts', JSON.stringify(existing))

  router.push('/') // Make sure this is working
}

</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-name {
  color: #6366f1;
  font-weight: bold;
  text-decoration: none;
}
.contact-name:hover {
  text-decoration: underline;
}

.contact-email,
.contact-phone {
  color: #333;
}
</style>
