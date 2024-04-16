<template>
    <main>
        <h1>Ajouter un tuteur</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="last_name" class="form-label">Nom</label>
                <input type="text" class="form-control" id="last_name" v-model="tutor.last_name">
                <span v-if="errors.last_name" class="error-message">{{ errors.last_name }}</span>
            </div>
            <div class="mb-3">
                <label for="first_name" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="first_name" v-model="tutor.first_name">
                <span v-if="errors.first_name" class="error-message">{{ errors.first_name }}</span>
            </div>
            <div class="mb-3">
                <label for="dob" class="form-label">Date de naissance</label>
                <input type="date" class="form-control" id="dob" v-model="tutor.DOB">
                <span v-if="errors.DOB" class="error-message">{{ errors.DOB }}</span>
            </div>
            <div class="mb-3">
                <label for="nas" class="form-label">Numéro d'assurance sociale (NAS)</label>
                <input type="text" class="form-control" id="nas" v-model="tutor.NAS">
                <span v-if="errors.NAS" class="error-message">{{ errors.NAS }}</span>
            </div>
            <div class="mb-3">
                <label for="contract_category" class="form-label">Catégorie de contrat</label>
                <select class="form-select" id="contract_category" v-model="tutor.contract_category">
                    <option value="permanent">Permanent</option>
                    <option value="at term">À terme</option>
                    <option value="hourly">À l'heure</option>
                </select>
                <span v-if="errors.contract_category" class="error-message">{{ errors.contract_category }}</span>
            </div>
            <div class="mb-3">
                <label for="hiring_date" class="form-label">Date d'embauche</label>
                <input type="date" class="form-control" id="hiring_date" v-model="tutor.hiring_date">
                <span v-if="errors.hiring_date" class="error-message">{{ errors.hiring_date }}</span>
            </div>
            <div class="mb-3">
                <label for="ending_date" class="form-label">Date de fin</label>
                <input type="date" class="form-control" id="ending_date" v-model="tutor.ending_date">
                <span v-if="errors.ending_date" class="error-message">{{ errors.ending_date }}</span>
            </div>
            <div class="mb-3">
                <label for="active_status" class="form-label">Statut actif</label>
                <input type="checkbox" class="form-check-input" id="active_status" v-model="tutor.active_status">
                <span v-if="errors.active_status" class="error-message">{{ errors.active_status }}</span>
            </div>
            <div class="mb-3">
                <label for="effective_ending_date" class="form-label">Date de fin effective</label>
                <input type="date" class="form-control" id="effective_ending_date" v-model="tutor.effective_ending_date">
                <span v-if="errors.effective_ending_date" class="error-message">{{ errors.effective_ending_date }}</span>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="tutor.email">
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            <div class="mb-3">
                <label for="phone_number" class="form-label">Numéro de téléphone</label>
                <input type="text" class="form-control" id="phone_number" v-model="tutor.phone_number">
                <span v-if="errors.phone_number" class="error-message">{{ errors.phone_number }}</span>
            </div>
            <div class="mb-3">
                <label for="resume_details" class="form-label">Détails du CV</label>
                <textarea class="form-control" id="resume_details" v-model="tutor.resume_details"></textarea>
                <span v-if="errors.resume_details" class="error-message">{{ errors.resume_details }}</span>
            </div>
            <div class="mb-3">
                <label for="hourly_rate" class="form-label">Taux horaire</label>
                <input type="number" class="form-control" id="hourly_rate" v-model="tutor.hourly_rate">
                <span v-if="errors.hourly_rate" class="error-message">{{ errors.hourly_rate }}</span>
            </div>
            <div class="mb-3">
                <label for="userId" class="form-label">ID Utilisateur</label>
                <input type="number" class="form-control" id="userId" v-model="tutor.userId">
                <span v-if="errors.userId" class="error-message">{{ errors.userId }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useTutor from '@/services/serviceTutor';

const { addTutor } = useTutor();
const router = useRouter();

const tutor = ref({
    last_name: '',
    first_name: '',
    DOB: '',
    NAS: '',
    contract_category: '',
    hiring_date: '',
    ending_date: '',
    active_status: false,
    effective_ending_date: '',
    email: '',
    phone_number: '',
    resume_details: '',
    hourly_rate: '',
    userId: ''
});

const errors = ref({});

const submitForm = () => {
    errors.value = {};

    // Validez les données du tuteur ici...
    validateForm();

    // Si aucune erreur, soumettre le formulaire
    if (Object.keys(errors.value).length === 0) {
        addTutor(tutor.value)
            .then(() => {
                console.log("Tuteur ajouté avec succès!");
                router.push('/');
            })
            .catch(err => console.error("Erreur lors de l'ajout du tuteur:", err));
    }
};

// Fonctions de validation
const validateForm = () => {
    validateLastName();
    validateFirstName();
    validateDateOfBirth();
    validatePhoneNumber();
    validateEmail();
    // Ajoutez d'autres fonctions de validation selon les besoins
};

const validateLastName = () => {
    if (!tutor.value.last_name || tutor.value.last_name.length < 4) {
        errors.value.last_name = "Le nom doit avoir au moins 4 caractères.";
    } else {
        delete errors.value.last_name;
    }
};

const validateFirstName = () => {
    if (!tutor.value.first_name || tutor.value.first_name.length < 4) {
        errors.value.first_name = "Le prénom doit avoir au moins 4 caractères.";
    } else {
        delete errors.value.first_name;
    }
};

const validateDateOfBirth = () => {
    // Logique de validation de la date de naissance
    // Vous pouvez utiliser la logique fournie dans le modèle de tutor
};

const validatePhoneNumber = () => {
    // Logique de validation du numéro de téléphone
    // Vous pouvez utiliser la logique fournie dans le modèle de tutor
};

const validateEmail = () => {
    // Logique de validation de l'email
    // Vous pouvez utiliser la logique fournie dans le modèle de tutor
};

</script>

<style scoped>
.error-message {
    color: red;
}
</style>
