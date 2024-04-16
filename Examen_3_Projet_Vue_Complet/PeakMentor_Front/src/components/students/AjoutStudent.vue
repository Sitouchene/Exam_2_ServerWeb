<template>
    <main>
        <h1>Ajouter un étudiant</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="lastname" class="form-label">Nom</label>
                <input type="text" class="form-control" id="lastname" v-model="student.last_name">
                <span v-if="errors.last_name" class="error-message">{{ errors.last_name }}</span>
            </div>
            <div class="mb-3">
                <label for="firstname" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="firstname" v-model="student.first_name">
                <span v-if="errors.first_name" class="error-message">{{ errors.first_name }}</span>
            </div>
            <div class="mb-3">
                <label for="job_title" class="form-label">Titre de poste</label>
                <input type="text" class="form-control" id="job_title" v-model="student.job_title">
                <span v-if="errors.job_title" class="error-message">{{ errors.job_title }}</span>
            </div>
            <div class="mb-3">
                <label for="direction" class="form-label">Direction</label>
                <input type="text" class="form-control" id="direction" v-model="student.direction">
                <span v-if="errors.direction" class="error-message">{{ errors.direction }}</span>
            </div>
            <div class="mb-3">
                <label for="date_of_birth" class="form-label">Date de naissance</label>
                <input type="date" class="form-control" id="date_of_birth" v-model="student.DOB">
                <span v-if="errors.DOB" class="error-message">{{ errors.DOB }}</span>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="student.email">
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            <div class="mb-3">
                <label for="phone_number" class="form-label">Numéro de téléphone</label>
                <input type="text" class="form-control" id="phone_number" v-model="student.phone_number">
                <span v-if="errors.phone_number" class="error-message">{{ errors.phone_number }}</span>
            </div>
            <div class="mb-3">
                <label for="userId" class="form-label">Identifiant de l'utilisateur</label>
                <input type="number" class="form-control" id="userId" v-model="student.userId">
                <span v-if="errors.userId" class="error-message">{{ errors.userId }}</span>
            </div>
            <div class="mb-3">
                <label for="clientId" class="form-label">Identifiant du client</label>
                <input type="number" class="form-control" id="clientId" v-model="student.clientId">
                <span v-if="errors.clientId" class="error-message">{{ errors.clientId }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useStudent from '@/services/serviceStudent';

const { addStudent } = useStudent();
const router = useRouter();

const student = ref({
    last_name: '',
    first_name: '',
    job_title: '',
    direction: '',
    DOB: '',
    email: '',
    phone_number: '',
    userId: null,
    clientId: null
});

const errors = ref({});

const submitForm = () => {
    errors.value = {};

    // Validez les données de l'étudiant ici...
    validateForm();

    // Si aucune erreur, soumettre le formulaire
    if (Object.keys(errors.value).length === 0) {
        addStudent(student.value)
            .then(() => {
                console.log("Étudiant ajouté avec succès!");
                router.push('/');
            })
            .catch(err => console.error("Erreur lors de l'ajout de l'étudiant:", err));
    }
};

// Fonctions de validation
const validateForm = () => {
    validateLastName();
    validateFirstName();
    validateJobTitle();
    validateDirection();
    validateDateOfBirth();
    validateEmail();
    validatePhoneNumber();
    validateUserId();
    validateClientId();
    // Ajoutez d'autres fonctions de validation selon les besoins
};

const validateLastName = () => {
    if (!student.value.last_name || student.value.last_name.length < 4) {
        errors.value.last_name = "Le nom doit avoir au moins 4 caractères.";
    } else {
        delete errors.value.last_name;
    }
};

const validateFirstName = () => {
    if (!student.value.first_name || student.value.first_name.length < 4) {
        errors.value.first_name = "Le prénom doit avoir au moins 4 caractères.";
    } else {
        delete errors.value.first_name;
    }
};

const validateJobTitle = () => {
    if (!student.value.job_title || student.value.job_title.trim() === '') {
        errors.value.job_title = "Le titre de poste est requis.";
    } else {
        delete errors.value.job_title;
    }
};

const validateDirection = () => {
    if (!student.value.direction || student.value.direction.trim() === '') {
        errors.value.direction = "La direction est requise.";
    } else {
        delete errors.value.direction;
    }
};

const validateDateOfBirth = () => {
    // Logique de validation de la date de naissance
    // Vous pouvez utiliser la logique fournie dans le modèle de l'étudiant
};

const validateEmail = () => {
    // Logique de validation de l'email
    // Vous pouvez utiliser la logique fournie dans le modèle de l'étudiant
};

const validatePhoneNumber = () => {
    // Logique de validation du numéro de téléphone
    // Vous pouvez utiliser la logique fournie dans le modèle de l'étudiant
};

const validateUserId = () => {
    if (!student.value.userId || isNaN(student.value.userId)) {
        errors.value.userId = "L'identifiant de l'utilisateur est requis.";
    } else {
        delete errors.value.userId;
    }
};

const validateClientId = () => {
    if (!student.value.clientId || isNaN(student.value.clientId)) {
        errors.value.clientId = "L'identifiant du client est requis.";
    } else {
        delete errors.value.clientId;
    }
};
</script>

<style scoped>
.error-message {
    color: red;
}
</style>
