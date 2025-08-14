<template>
  <div>
    <!-- Search Bar -->
    <div class="search-container">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Search contacts by name..."
        class="search-input"
      />
      <i class="fas fa-search search-icon"></i>
    </div>

    <h1>Contact List</h1>
    
    <!-- No contacts message -->
    <div v-if="contacts.length === 0" class="no-contacts">
      <i class="fas fa-users"></i>
      <p>No contacts yet. Add your first contact!</p>
    </div>

    <!-- No search results message -->
    <div v-else-if="filteredContacts.length === 0 && searchQuery" class="no-results">
      <i class="fas fa-search"></i>
      <p>No contacts found matching "{{ searchQuery }}"</p>
      <button @click="clearSearch" class="clear-search-btn">Clear Search</button>
    </div>

    <!-- Contact List -->
    <ul v-else class="contact-list">
      <li v-for="(contact, index) in filteredContacts" :key="index" class="contact-item">
        <router-link :to="'/contact/' + getOriginalIndex(contact)" class="contact-name">
          {{ contact.lastName }}, {{ contact.firstName }}
        </router-link>

        <span class="contact-email">
          <i class="fas fa-envelope"></i> {{ contact.email }}
        </span>
        <span class="contact-phone" v-if="contact.phone">
          <i class="fas fa-phone"></i> {{ contact.phone }}
        </span>
        <span class="contact-occupation" v-if="contact.occupation">
          <i class="fas fa-briefcase"></i> {{ contact.occupation }}
        </span>
      </li>
    </ul>

    <!-- Search results count -->
    <div v-if="searchQuery && filteredContacts.length > 0" class="search-results-count">
      Showing {{ filteredContacts.length }} of {{ contacts.length }} contacts
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'

  const contacts = ref([])
  const searchQuery = ref('')

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

  // Computed property for filtered contacts
  const filteredContacts = computed(() => {
    if (!searchQuery.value) {
      return contacts.value
    }
    
    const query = searchQuery.value.toLowerCase()
    return contacts.value.filter(contact => 
      (contact.firstName && contact.firstName.toLowerCase().includes(query)) ||
      (contact.lastName && contact.lastName.toLowerCase().includes(query)) ||
      (contact.email && contact.email.toLowerCase().includes(query))
    )
  })
    // Returns the index of the contact in the full contacts array
  const getOriginalIndex = (contact) => {
    return contacts.value.findIndex(c =>
      c.firstName === contact.firstName &&
      c.lastName === contact.lastName &&
      c.email === contact.email &&
      c.phone === contact.phone
    )
  }

  // Function to clear the search
  const clearSearch = () => {
    searchQuery.value = ''
  }

</script>

<style scoped>
  .home {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }
  /* Search bar style */

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 25px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  }

  .search-input:focus {
  outline: none;
  border-color: #4facfe;
  box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
 }

  .search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }
  /* Contact List Styles */
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
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.contact-name {
  color: #6366f1;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.1em;
}

.contact-name:hover {
  text-decoration: underline;
}

.contact-email,
.contact-phone {
  color: #666;
  font-size: 0.95em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-email i,
.contact-phone i {
  color: #6366f1;
  width: 16px;
}

/* Empty States */
.no-contacts,
.no-results {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.no-contacts i,
.no-results i {
  font-size: 3em;
  color: #ddd;
  margin-bottom: 15px;
  display: block;
}

.no-contacts p,
.no-results p {
  font-size: 1.1em;
  margin: 0 0 20px 0;
}

.clear-search-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.clear-search-btn:hover {
  background: #5856eb;
}

/* Search Results Count */
.search-results-count {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-style: italic;
  font-size: 0.9em;
}

.contact-occupation {
  color: #666;
  font-size: 0.95em;
  display: flex;
  align-items: center;
  gap: 8px;
}
.contact-occupation i {
  color: #6366f1;
  width: 16px;
}

  </style>
  