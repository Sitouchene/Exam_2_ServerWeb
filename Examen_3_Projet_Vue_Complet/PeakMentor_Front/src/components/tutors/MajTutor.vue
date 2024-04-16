<template>
    <main>
        <h1>Mettre à jour les informations de {{ tutor.last_name }} {{ tutor.first_name }}</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" v-model="tutor.first_name">
            </div>
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" v-model="tutor.last_name">
            </div>
            <div class="mb-3">
                <label for="NAS" class="form-label">NAS</label>
                <input type="text" class="form-control" id="NAS" v-model="tutor.NAS">
            </div>
            <div class="mb-3">
                <label for="dateOfBirth" class="form-label">Date de naissance</label>
                <input type="date" class="form-control" id="dateOfBirth" v-model="tutor.DOB">
            </div>
            <div class="mb-3">
                <label for="contractCategory" class="form-label">Catégorie de contrat</label>
                <input type="text" class="form-control" id="contractCategory" v-model="tutor.contract_category">
            </div>
            <div class="mb-3">
                <label for="hiringDate" class="form-label">Date d'embauche</label>
                <input type="date" class="form-control" id="hiringDate" v-model="tutor.hiring_date">
            </div>
            <div class="mb-3">
                <label for="endingDate" class="form-label">Date de fin</label>
                <input type="date" class="form-control" id="endingDate" v-model="tutor.ending_date">
            </div>
            <div class="mb-3">
                <label for="activeStatus" class="form-label">Statut actif</label>
                <input type="checkbox" class="form-check-input" id="activeStatus" v-model="tutor.active_status">
            </div>
            <div class="mb-3">
                <label for="effectiveEndingDate" class="form-label">Date de fin effective</label>
                <input type="date" class="form-control" id="effectiveEndingDate" v-model="tutor.effective_ending_date">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="tutor.email">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Téléphone</label>
                <input type="tel" class="form-control" id="phone" v-model="tutor.phone_number">
            </div>
            <div class="mb-3">
                <label for="resumeDetails" class="form-label">Détails du CV</label>
                <textarea class="form-control" id="resumeDetails" v-model="tutor.resume_details"></textarea>
            </div>
            <div class="mb-3">
                <label for="hourlyRate" class="form-label">Taux horaire</label>
                <input type="number" class="form-control" id="hourlyRate" v-model="tutor.hourly_rate">
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useTutor from '@/services/serviceTutor';

const { getTutorById, updateTutor } = useTutor();
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const tutor = ref({
    last_name: null,
    first_name: null,
    NAS: null,
    DOB: null,
    contract_category: null,
    hiring_date: null,
    ending_date: null,
    active_status: null,
    effective_ending_date: null,
    email: null,
    phone_number: null,
    resume_details: null,
    hourly_rate: null
});

const submitForm = () => {
    updateTutor(id, tutor.value)
        .then(() => {
            console.log('Tuteur mis à jour avec succès!');
            router.push('/');
        })
        .catch(err => console.error('Erreur lors de la mise à jour du tuteur:', err));
};

onBeforeMount(() => {
    getTutorById(id)
        .then(res => tutor.value = res.data)
        .catch(() => { });
});
</script>
