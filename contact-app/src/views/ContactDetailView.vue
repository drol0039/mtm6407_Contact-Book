<template>
  <div v-if="contact" class="contact-detail">
    <div class="contact-header">
      <h1>{{ contact.lastName }}, {{ contact.firstName }}</h1>
    </div>

    <div class="contact-info">
      <div class="info-item">
        <i class="fas fa-envelope"></i>
        <div class="info-content">
          <label>Email:</label>
          <span>{{ contact.email }}</span>
        </div>
      </div>

      <div class="info-item" v-if="contact.phone">
        <i class="fas fa-phone"></i>
        <div class="info-content">
          <label>Phone:</label>
          <span>{{ contact.phone }}</span>
        </div>
      </div>

      <div class="info-item" v-if="contact.occupation">
        <i class="fas fa-briefcase"></i>
        <div class="info-content">
          <label>Occupation:</label>
          <span>{{ contact.occupation }}</span>
        </div>
      </div>
    </div>

    <div class="button-container">
      <router-link :to="`/edit/${route.params.id}`" class="btn edit-btn">
        <i class="fas fa-edit"></i> Edit
      </router-link>
      <button @click="deleteContact" class="btn delete-btn">
        <i class="fas fa-trash"></i> Delete
      </button>
    </div>
  </div>

  <div v-else class="not-found">
    <i class="fas fa-exclamation-triangle"></i>
    <h2>Contact not found</h2>
    <p>The contact you're looking for doesn't exist.</p>
    <router-link to="/" class="btn btn-primary">
      <i class="fas fa-arrow-left"></i> Back to Contacts
    </router-link>
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
  if (confirm('Are you sure you want to delete this contact?')) {
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
}
</script>

<style scoped>
.contact-detail {
  max-width: 600px;
  margin: 2rem auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  overflow: hidden;
}

.contact-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.contact-header h1 {
  font-size: 2.2em;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.contact-info {
  padding: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item i {
  font-size: 1.2em;
  color: #667eea;
  width: 30px;
  margin-right: 15px;
}

.info-content {
  flex: 1;
}

.info-content label {
  display: block;
  font-weight: 600;
  color: #34495e;
  font-size: 0.9em;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-content span {
  font-size: 1.1em;
  color: #2c3e50;
}

.button-container {
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 2rem;
  background: #f8f9fa;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-align: center;
  transition: all 0.3s ease;
  min-width: 120px;
  justify-content: center;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.edit-btn {
  background: linear-gradient(135deg, #6b70d6 0%, #6c7a9d 100%);
  color: white;
}

.edit-btn:hover {
  background:  rgba(19, 199, 181, 0.3);
}

.delete-btn {
  background: linear-gradient(135deg, #3fbbfd 0%, #7ac7c3 100%);
  color: white;
}

.delete-btn:hover {
  background: rgba(238, 16, 179, 0.245);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.not-found {
  text-align: center;
  padding: 3rem 2rem;
  max-width: 500px;
  margin: 2rem auto;
}

.not-found i {
  font-size: 4em;
  color: #e74c3c;
  margin-bottom: 1rem;
}

.not-found h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.not-found p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .contact-detail {
    margin: 1rem;
  }
  
  .contact-header {
    padding: 1.5rem;
  }
  
  .contact-header h1 {
    font-size: 1.8em;
  }
  
  .contact-info {
    padding: 1.5rem;
  }
  
  .button-container {
    flex-direction: column;
    gap: 10px;
    padding: 1.5rem;
  }
  
  .btn {
    width: 100%;
  }
}
</style>