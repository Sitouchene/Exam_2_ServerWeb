<template>
    <main>
        <h1>Mettre à jour les informations de {{ client.company_name }}</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="prenom" class="form-label">Nom du contact</label>
                <input type="text" class="form-control" id="prenom" v-model="client.contact_name">
            </div>
            <div class="mb-3">
                <label for="nom" class="form-label">Nom de l'entreprise</label>
                <input type="text" class="form-control" id="nom" v-model="client.company_name">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email du contact</label>
                <input type="email" class="form-control" id="email" v-model="client.contact_email">
            </div>
            <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input type="tel" class="form-control" id="telephone" v-model="client.telephone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Format: 123-456-7890">
            </div>
            <div class="mb-3">
                <label for="adresse" class="form-label">Adresse</label>
                <input type="text" class="form-control" id="adresse" v-model="client.address_avenue">
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useClient from '@/services/serviceClient';

const { getClientById, updateClient } = useClient();
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const client = ref({
    company_name: null,
    contact_name: null,
    contact_email: null,
    telephone: null,
    address_avenue: null
});

const submitForm = () => {
    updateClient(id, client.value)
        .then(() => {
            console.log('Client mis à jour avec succès!');
            router.push('/');
        })
        .catch(err => console.error('Erreur lors de la mise à jour du client:', err));
};

onBeforeMount(() => {
    getClientById(id)
        .then(res => client.value = res.data)
        .catch(() => { });
});
</script>
