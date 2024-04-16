<template>
    <main>
        <h1>Liste des sessions</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Date de la session</th>
                    <th>Heure de début</th>
                    <th>Heure de fin</th>
                    <th>Durée</th>
                    <th>État de la session</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="session in sessionList" :key="session.id">
                    <td>{{ session.session_date }}</td>
                    <td>{{ session.start_time }}</td>
                    <td>{{ session.end_time }}</td>
                    <td>{{ session.duration }}</td>
                    <td>{{ session.session_stage }}</td>
                    <td>
                        <button class="btn btn-primary" @click="update(session.id)">Modifier</button>
                        <button class="btn btn-danger" @click="deleteSession(session.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="addSession">Ajouter une session</button>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useSession from '../../services/serviceSession';
import { useRouter } from "vue-router";

const { getAllSessions, deleteSession } = useSession();
const sessionList = ref([]);
const router = useRouter();

const update = id => {
    router.push(`/update-session/${id}`);
};

const deleteUser = id => {
    deleteSession(id)
        .then(() => {
            console.log('Session supprimée avec succès');
            getAllSessions()
                .then((res) => sessionList.value = res.data)
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

const addSession = () => {
    router.push('/add-session');
};

onBeforeMount(() => {
    getAllSessions()
        .then((res) => sessionList.value = res.data)
        .catch(err => console.error(err));
});
</script>

<style scoped>
img {
    max-width: 100%;
    width: 10%;
}
</style>
