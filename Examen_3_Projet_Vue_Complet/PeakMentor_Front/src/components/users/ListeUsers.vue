<template>
    <main>
        <h1>Liste des utilisateurs</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date de naissance</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in userList" :key="user.id">
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.date_of_birth }}</td>
                    <td>{{ user.phone_number }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <button class="btn btn-primary" @click="update(user.id)">Modifier</button>
                        <button class="btn btn-danger" @click="deleteUser(user.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="addUser">Ajouter un utilisateur</button>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useUser from '../../services/serviceUser';
import { useRouter } from "vue-router";

const { getAllUsers } = useUser();
const userList = ref([]);
const router = useRouter();

const deleteUser = id => {
    deleteUser(id)
        .then(() => {
            console.log('Utilisateur supprimé avec succès');
            getAllUsers()
                .then((res) => userList.value = res.data)
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

const update = id => {
    router.push(`/update-user/${id}`);
};

onBeforeMount(() => {
    getAllUsers()
        .then((res) => userList.value = res.data)
        .catch(err => console.error(err));
});

const addUser = () => {
    router.push('/add-user');
};
</script>

<style scoped>
img {
    max-width: 100%;
    width: 10%;
}
</style>