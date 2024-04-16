<template>
  <main>
    <header>
      <h1>Peak Mentor</h1>
      <nav>
        <ul>
          <li><router-link to="/users">Users</router-link></li>
          <li><router-link to="/tutors">Tutors</router-link></li>
          <li><router-link to="/clients">Clients</router-link></li>          
          <li><router-link to="/students">Students</router-link></li>
          <li><router-link to="/groups">Groups</router-link></li>
          <li><router-link to="/contracts">Contracts</router-link></li>
          <li><router-link to="/trainings">Trainings</router-link></li>
          <li><router-link to="/sessions">Sessions</router-link></li>
        </ul>
      </nav>
    </header>
    <section>
      <!-- Contenu de la page -->
      <router-view>
       
      </router-view>
    </section>
  </main>
</template>

<script setup>
</script>

<style scoped>
  /* Styles pour le titre et la barre de navigation */
  header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
  }

  h1 {
    margin: 0;
  }

  nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  nav ul li {
    display: inline-block;
    margin-right: 10px;
  }

  nav ul li a {
    color: #fff;
    text-decoration: none;
  }

  nav ul li a:hover {
    text-decoration: underline;
  }
</style>
