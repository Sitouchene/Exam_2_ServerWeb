<template>
    <main>
        <h1>Mettre à jour les informations de {{ user.lastname }} {{ user.firstname }}</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" v-model="user.firstname">
            </div>
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" v-model="user.lastname">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="user.email">
            </div>
            <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input type="tel" class="form-control" id="telephone" v-model="user.phone_number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Format: 123-456-7890">
            </div>
            <div class="mb-3">
                <label for="adresse" class="form-label">Adresse</label>
                <input type="text" class="form-control" id="adresse" v-model="user.address_avenue">
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUser from '@/services/serviceUser';

const { getUserById, updateUser } = useUser();
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const user = ref({
    lastname: null,
    firstname: null,
    email: null,
    phone_number: null,
    address_avenue: null
});

const submitForm = () => {
    updateUser(id, user.value)
        .then(() => {
            console.log('Utilisateur mis à jour avec succès!');
            router.push('/');
        })
        .catch(err => console.error('Erreur lors de la mise à jour de l\'utilisateur:', err));
};

onBeforeMount(() => {
    getUserById(id)
        .then(res => user.value = res.data)
        .catch(() => { });
});
</script>
