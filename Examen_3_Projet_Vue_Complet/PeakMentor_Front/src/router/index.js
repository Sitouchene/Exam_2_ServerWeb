import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

import ListeClients from '@/components/clients/ListeClients.vue'
import ProfilClient from '@/components/clients/ProfilClient.vue'
import AjoutClient from '@/components/clients/AjoutClient.vue'
import MajClient from '@/components/clients/MajClient.vue'
import ListeUsers from '@/components/users/ListeUsers.vue'
import AjoutUser from '@/components/users/AjoutUser.vue'
import MajUser from '@/components/users/MajUser.vue'
// Imports pour l'entité Tutor
import ListeTutors from '@/components/tutors/ListeTutors.vue'
import AjoutTutor from '@/components/tutors/AjoutTutor.vue'
import MajTutor from '@/components/tutors/MajTutor.vue'

// Imports pour l'entité Student
import ListeStudents from '@/components/students/ListeStudents.vue'
import AjoutStudent from '@/components/students/AjoutStudent.vue'
import MajStudent from '@/components/students/MajStudent.vue'
// Imports pour l'entité Contract
import ListeContracts from '@/components/contracts/ListeContracts.vue'
import AjoutContract from '@/components/contracts/AjoutContract.vue'
import MajContract from '@/components/contracts/MajContract.vue'

// Imports pour l'entité Group
import ListeGroups from '@/components/groups/ListeGroups.vue'
import AjoutGroup from '@/components/groups/AjoutGroup.vue'
import MajGroup from '@/components/groups/MajGroup.vue'

// Imports pour l'entité Session
import ListeSessions from '@/components/sessions/ListeSessions.vue'
import AjoutSession from '@/components/sessions/AjoutSession.vue'
import MajSession from '@/components/sessions/MajSession.vue'

// Imports pour l'entité Training
import ListeTrainings from '@/components/trainings/ListeTrainings.vue'
import AjoutTraining from '@/components/trainings/AjoutTraining.vue'
import MajTraining from '@/components/trainings/MajTraining.vue'






import Login from '@/components/auth/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
      
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    // ***** LOGIN
    {
      path: '/login',
      name: 'login',
      component: Login
    },


    // ***************CLIENTS
    {
      path: '/Clients/',
      name: 'clients',
      component: ListeClients
    },
    {
      path: '/profil/:id',
      name: 'profil',
      component: ProfilClient
    },
    {
      path: '/add-client',
      name: 'add-client',
      component: AjoutClient
    },
    
    {
      path: '/update-client/:id',
      name: 'update-client',
      component: MajClient
    },
    //***  user*/
    {
      path: '/users/',
      name: 'users',
      component: ListeUsers
    },
    
    {
      path: '/add-user',
      name: 'add-user',
      component: AjoutUser
    },
    {
      path: '/upadate-user',
      name: 'update-user',
      component: MajUser
    },
    // Routes pour l'entité Tutor
{
  path: '/tutors/',
  name: 'tutors',
  component: ListeTutors
},
{
  path: '/add-tutor',
  name: 'add-tutor',
  component: AjoutTutor
},
{
  path: '/update-tutor/:id',
  name: 'update-tutor',
  component: MajTutor
},
// Routes pour l'entité Student
{
  path: '/students/',
  name: 'students',
  component: ListeStudents
},
{
  path: '/add-student',
  name: 'add-student',
  component: AjoutStudent
},
{
  path: '/update-student/:id',
  name: 'update-student',
  component: MajStudent
},

// Routes pour l'entité Contract
{
  path: '/contracts/',
  name: 'contracts',
  component: ListeContracts
},
{
  path: '/add-contract',
  name: 'add-contract',
  component: AjoutContract
},
{
  path: '/update-contract/:id',
  name: 'update-contract',
  component: MajContract
},

// Routes pour l'entité Group
{
  path: '/groups/',
  name: 'groups',
  component: ListeGroups
},
{
  path: '/add-group',
  name: 'add-group',
  component: AjoutGroup
},
{
  path: '/update-group/:id',
  name: 'update-group',
  component: MajGroup
},

// Routes pour l'entité Session
{
  path: '/sessions/',
  name: 'sessions',
  component: ListeSessions
},
{
  path: '/add-session',
  name: 'add-session',
  component: AjoutSession
},
{
  path: '/update-session/:id',
  name: 'update-session',
  component: MajSession
},

// Routes pour l'entité Training
{
  path: '/trainings/',
  name: 'trainings',
  component: ListeTrainings
},
{
  path: '/add-training',
  name: 'add-training',
  component: AjoutTraining
},
{
  path: '/update-training/:id',
  name: 'update-training',
  component: MajTraining
}
  
    
  ]
})


// Liste des routes non protegees
import useAuthStore from '@/stores/auth/authStore'
const routeOuvertes = [
  'login','about','home',
  'clients','add-client','update-client','profil',
  'users','add-user','update-user',
  'tutors','add-tutor','update-tutor',
  'students','add-student','update-student',
  'contracts','add-contract','update-contract',
  'groups','add-group','update-group',
  'sessions','add-session','update-session',
  'trainings','add-training','update-training'

]

router.beforeEach((to, from, next) => {
  const { currentToken: token } = useAuthStore()
  if (routeOuvertes.includes(to.name.toLowerCase()) && token) next({ name: 'home' })
  if (!routeOuvertes.includes(to.name.toLowerCase()) && !token) next({ name: 'login' })
  else next()
})

export default router
