<template>
    <main>
        <h1>Liste des formations</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nom de la formation</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="training in trainingList" :key="training.id">
                    <td>{{ training.training_name }}</td>
                    <td>{{ training.training_description }}</td>
                    <td>
                        <button class="btn btn-primary" @click="update(training.id)">Modifier</button>
                        <button class="btn btn-danger" @click="deleteTraining(training.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="addTraining">Ajouter une formation</button>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import useTraining from '../../services/serviceTraining';
import { useRouter } from 'vue-router';

const { getAllTrainings } = useTraining();
const trainingList = ref([]);
const router = useRouter();

const update = id => {
    router.push(`/update-training/${id}`);
};

const deleteTraining = id => {
    deleteTraining(id)
        .then(() => {
            console.log('Formation supprimée avec succès');
            getAllTrainings()
                .then((res) => trainingList.value = res.data)
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

const addTraining = () => {
    router.push('/add-training');
};

onBeforeMount(() => {
    getAllTrainings()
        .then((res) => trainingList.value = res.data)
        .catch(err => console.error(err));
});
</script>

<style scoped>
img {
    max-width: 100%;
    width: 10%;
}
</style>
