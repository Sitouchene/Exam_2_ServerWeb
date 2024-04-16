<template>
    <main>
        <h1>Liste des tuteurs</h1>
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
                <tr v-for="tutor in tutorList" :key="tutor.id">
                    <td>{{ tutor.last_name }}</td>
                    <td>{{ tutor.first_name }}</td>
                    <td>{{ tutor.DOB }}</td>
                    <td>{{ tutor.phone_number }}</td>
                    <td>{{ tutor.email }}</td>
                    <td>
                        <button class="btn btn-primary" @click="update(tutor.id)">Modifier</button>
                        <button class="btn btn-danger" @click="deleteTutor(tutor.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="addTutor">Ajouter un tuteur</button>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useTutor from '../../services/serviceTutor';
import { useRouter } from "vue-router";

const { getAllTutors } = useTutor();
const tutorList = ref([]);
const router = useRouter();

const deleteTutor = id => {
    deleteTutor(id)
        .then(() => {
            console.log('Tuteur supprimé avec succès');
            getAllTutors()
                .then((res) => tutorList.value = res.data)
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

const update = id => {
    router.push(`/update-tutor/${id}`);
};

onBeforeMount(() => {
    getAllTutors()
        .then((res) => tutorList.value = res.data)
        .catch(err => console.error(err));
});

const addTutor = () => {
    router.push('/add-tutor');
};
</script>

<style scoped>
img {
    max-width: 100%;
    width: 10%;
}
</style>
