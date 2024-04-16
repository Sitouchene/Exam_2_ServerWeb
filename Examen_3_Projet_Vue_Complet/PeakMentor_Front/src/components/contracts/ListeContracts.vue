<template>
    <main>
        <h1>Liste des contrats</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Classe de formation</th>
                    <th>Type de formation</th>
                    <th>Quantité d'heures</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Taux horaire</th>
                    <th>ID du client</th>
                    <th>ID de la formation</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contract in contractList" :key="contract.id">
                    <td>{{ contract.training_class }}</td>
                    <td>{{ contract.training_type }}</td>
                    <td>{{ contract.hours_quantity }}</td>
                    <td>{{ contract.start_date }}</td>
                    <td>{{ contract.end_date }}</td>
                    <td>{{ contract.hourly_rate }}</td>
                    <td>{{ contract.clientId }}</td>
                    <td>{{ contract.trainingId }}</td>
                    <td>
                        <button class="btn btn-primary" @click="update(contract.id)">Modifier</button>
                        <button class="btn btn-danger" @click="deleteContract(contract.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="addContract">Ajouter un contrat</button>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useContract from '../../services/serviceContract';
import { useRouter } from "vue-router";

const { getAllContracts } = useContract();
const contractList = ref([]);
const router = useRouter();

const deleteContract = id => {
    deleteContract(id)
        .then(() => {
            console.log('Contrat supprimé avec succès');
            getAllContracts()
                .then((res) => contractList.value = res.data)
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

const update = id => {
    router.push(`/update-contract/${id}`);
};

onBeforeMount(() => {
    getAllContracts()
        .then((res) => contractList.value = res.data)
        .catch(err => console.error(err));
});

const addContract = () => {
    router.push('/add-contract');
};
</script>

<style scoped>
img {
    max-width: 100%;
    width: 10%;
}
</style>
