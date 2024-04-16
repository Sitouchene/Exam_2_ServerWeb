<template>
    <main>
        <h1>Mettre à jour les informations de {{ student.last_name }} {{ student.first_name }}</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" v-model="student.first_name">
            </div>
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" v-model="student.last_name">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="student.email">
            </div>
            <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input type="tel" class="form-control" id="telephone" v-model="student.phone_number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Format: 123-456-7890">
            </div>
            <div class="mb-3">
                <label for="adresse" class="form-label">Adresse</label>
                <input type="text" class="form-control" id="adresse" v-model="student.address_avenue">
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useStudent from '@/services/serviceStudent';

const { getStudentById, updateStudent } = useStudent();
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const student = ref({
    last_name: null,
    first_name: null,
    email: null,
    phone_number: null,
    address_avenue: null
});

const submitForm = () => {
    updateStudent(id, student.value)
        .then(() => {
            console.log('Étudiant mis à jour avec succès!');
            router.push('/');
        })
        .catch(err => console.error('Erreur lors de la mise à jour de l\'étudiant:', err));
};

onBeforeMount(() => {
    getStudentById(id)
        .then(res => student.value = res.data)
        .catch(() => { });
});
</script>
