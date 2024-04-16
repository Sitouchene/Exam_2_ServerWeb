<script setup>
import { RouterLink, RouterView } from 'vue-router'
import useAuthStore from './stores/auth/authStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const store = useAuthStore()
const { logout } = store

//Pour la reactivite des getters, on utilise storeToRefs
const { currentUser: loggedInUser } = storeToRefs(store)
const router = useRouter()
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/home"><img src="/public/logo0.png" alt="Logo PeakMentor" width="100"> </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
          aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/home">Home</RouterLink>
            </li>
            <li class="nav-item" v-if="loggedInUser?.id">
              <RouterLink class="nav-link" :to="`/profile/${loggedInUser?.id}`">Profile</RouterLink>
            </li>
            <li class="nav-item dropdown">
              <RouterLink class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false"> Menus
              </RouterLink>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <RouterLink class="dropdown-item" to="/tutors">Tutors</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/students">Students</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/clients">Clients</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/contracts">Contrats</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/trainings">Trainings</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/Groups">Groups</RouterLink>
                </li>
                
                <li>
                  <RouterLink class="dropdown-item" to="/Sessions">Sessions</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/about">A propos</RouterLink>
                </li>



              </ul>
            </li>
          </ul>
          <div class="d-flex align-items-center gx-20">
            <div class="p-2" v-if="loggedInUser?.id">Bienvenu {{ loggedInUser.prenom + ' ' + loggedInUser.nom }}</div>
            <button v-else @click="router.push('/login')" class="btn btn-outline-success">Login</button>
            <button v-if="loggedInUser?.id" @click="logout" class="btn btn-danger ml-2">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  /* max-height: 100vh; */
}


nav {
  width: 100%;
  font-size: 12px;
  /* text-align: center; */
  margin-bottom: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
