<template>
    <main>
        <h1>Mettre à jour les informations du contrat</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="training_class" class="form-label">Classe de formation</label>
                <input type="text" class="form-control" id="training_class" v-model="contract.training_class">
            </div>
            <div class="mb-3">
                <label for="training_type" class="form-label">Type de formation</label>
                <input type="text" class="form-control" id="training_type" v-model="contract.training_type">
            </div>
            <div class="mb-3">
                <label for="hours_quantity" class="form-label">Quantité d'heures</label>
                <input type="number" class="form-control" id="hours_quantity" v-model.number="contract.hours_quantity">
            </div>
            <div class="mb-3">
                <label for="start_date" class="form-label">Date de début</label>
                <input type="date" class="form-control" id="start_date" v-model="contract.start_date">
            </div>
            <div class="mb-3">
                <label for="end_date" class="form-label">Date de fin</label>
                <input type="date" class="form-control" id="end_date" v-model="contract.end_date">
            </div>
            <div class="mb-3">
                <label for="hourly_rate" class="form-label">Taux horaire</label>
                <input type="number" step="0.01" class="form-control" id="hourly_rate" v-model.number="contract.hourly_rate">
            </div>
            <div class="mb-3">
                <label for="clientId" class="form-label">ID du client</label>
                <input type="number" class="form-control" id="clientId" v-model.number="contract.clientId">
            </div>
            <div class="mb-3">
                <label for="trainingId" class="form-label">ID de la formation</label>
                <input type="number" class="form-control" id="trainingId" v-model.number="contract.trainingId">
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useContract from '@/services/serviceContract';

const { getContractById, updateContract } = useContract();
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const contract = ref({
    training_class: null,
    training_type: null,
    hours_quantity: null,
    start_date: null,
    end_date: null,
    hourly_rate: null,
    clientId: null,
    trainingId: null
});

const submitForm = () => {
    updateContract(id, contract.value)
        .then(() => {
            console.log('Contrat mis à jour avec succès!');
            router.push('/');
        })
        .catch(err => console.error('Erreur lors de la mise à jour du contrat:', err));
};

onBeforeMount(() => {
    getContractById(id)
        .then(res => contract.value = res.data)
        .catch(() => { });
});
</script>
