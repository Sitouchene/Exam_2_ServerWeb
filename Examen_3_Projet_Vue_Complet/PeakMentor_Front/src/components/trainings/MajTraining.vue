<template>
    <main>
        <h1>Mettre à jour les informations de la formation</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="trainingName" class="form-label">Nom de la formation</label>
                <input type="text" class="form-control" id="trainingName" v-model="training.training_name">
            </div>
            <div class="mb-3">
                <label for="trainingDescription" class="form-label">Description de la formation</label>
                <textarea class="form-control" id="trainingDescription" v-model="training.training_description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useTraining from '@/services/serviceTraining';

const { getTrainingById, updateTraining } = useTraining();
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const training = ref({
    training_name: null,
    training_description: null
});

const submitForm = () => {
    updateTraining(id, training.value)
        .then(() => {
            console.log('Formation mise à jour avec succès!');
            router.push('/');
        })
        .catch(err => console.error('Erreur lors de la mise à jour de la formation:', err));
};

onBeforeMount(() => {
    getTrainingById(id)
        .then(res => training.value = res.data)
        .catch(() => { });
});
</script>
