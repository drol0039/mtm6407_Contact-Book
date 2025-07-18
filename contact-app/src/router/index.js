import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewContactView from '../views/NewContactView.vue'
import ContactDetailView from '../views/ContactDetailView.vue'
import EditContactView from '../views/EditContactView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/new', name: 'NewContact', component: NewContactView },
  { path: '/contact/:id', name: 'ContactDetail', component: ContactDetailView },
  { path: '/edit/:id', name: 'EditContact', component: EditContactView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
