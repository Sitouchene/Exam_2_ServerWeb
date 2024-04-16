<template>
    <main>
        <h1>Liste des clients</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nom de l'entreprise</th>
                    <th>Nom du contact</th>
                    <th>Email du contact</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in listeClient" :key="client.id">
                    <td>{{ client.company_name }}</td>
                    <td>{{ client.contact_name }}</td>
                    <td>{{ client.contact_email }}</td>
                    <td>{{ client.telephone }}</td>
                    <td>{{ client.address_avenue }}, {{ client.city }}, {{ client.province }}, {{ client.country }}</td>
                    <td>
                        <button class="btn btn-primary" @click="update(client.id)">Modifier</button>
                        <button class="btn btn-danger" @click="supprimer(client.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="ajouterClient">Ajouter un client</button>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useClient from '../../services/serviceClient';
import { useRouter } from "vue-router";

const { getAllClients, deleteClient } = useClient();
const listeClient = ref([]);
const router = useRouter();

const supprimer = id => {
    deleteClient(id)
        .then((res) => {
            console.log('Suppression:', res);
            getAllClients()
                .then((res) => listeClient.value = res.data)
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

const update = id => {
    router.push(`/update-client/${id}`);
};

onBeforeMount(() => {
    getAllClients()
        .then((res) => listeClient.value = res.data)
        .catch(err => console.log(err));
});

const ajouterClient = () => {
    router.push('/add-client');
};
</script>

<style scoped>
img {
    max-width: 100%;
    width: 10%;
}
</style>
