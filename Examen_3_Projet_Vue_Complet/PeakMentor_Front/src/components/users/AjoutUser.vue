<template>
    <main>
        <h1>Ajouter un utilisateur</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="lastname" class="form-label">Nom</label>
                <input type="text" class="form-control" id="lastname" v-model="user.lastname">
                <span v-if="errors.lastname" class="error-message">{{ errors.lastname }}</span>
            </div>
            <div class="mb-3">
                <label for="firstname" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="firstname" v-model="user.firstname">
                <span v-if="errors.firstname" class="error-message">{{ errors.firstname }}</span>
            </div>
            <div class="mb-3">
                <label for="date_of_birth" class="form-label">Date de naissance</label>
                <input type="date" class="form-control" id="date_of_birth" v-model="user.date_of_birth">
                <span v-if="errors.date_of_birth" class="error-message">{{ errors.date_of_birth }}</span>
            </div>
            <div class="mb-3">
                <label for="phone_number" class="form-label">Numéro de téléphone</label>
                <input type="text" class="form-control" id="phone_number" v-model="user.phone_number">
                <span v-if="errors.phone_number" class="error-message">{{ errors.phone_number }}</span>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="user.email">
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" v-model="user.password">
                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
            </div>
            <div class="mb-3">
                <label for="roleId" class="form-label">Rôle</label>
                <input type="number" class="form-control" id="roleId" v-model="user.roleId">
                <span v-if="errors.roleId" class="error-message">{{ errors.roleId }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useUser from '@/services/serviceUser';

const { addUser } = useUser();
const router = useRouter();

const user = ref({
    lastname: '',
    firstname: '',
    date_of_birth: '',
    phone_number: '',
    email: '',
    password: '',
    roleId: ''
});

const errors = ref({});

const submitForm = () => {
    errors.value = {};

    // Validez les données de l'utilisateur ici...
    validateForm();

    // Si aucune erreur, soumettre le formulaire
    if (Object.keys(errors.value).length === 0) {
        addUser(user.value)
            .then(() => {
                console.log("Utilisateur ajouté avec succès!");
                router.push('/');
            })
            .catch(err => console.error("Erreur lors de l'ajout de l'utilisateur:", err));
    }
};

// Fonctions de validation
const validateForm = () => {
    validateLastName();
    validateFirstName();
    validateDateOfBirth();
    validatePhoneNumber();
    validateEmail();
    validatePassword();
    validateRoleId();
    // Ajoutez d'autres fonctions de validation selon les besoins
};

const validateLastName = () => {
    if (!user.value.lastname || user.value.lastname.length < 4) {
        errors.value.lastname = "Le nom doit avoir au moins 4 caractères.";
    } else {
        delete errors.value.lastname;
    }
};

const validateFirstName = () => {
    if (!user.value.firstname || user.value.firstname.length < 4) {
        errors.value.firstname = "Le prénom doit avoir au moins 4 caractères.";
    } else {
        delete errors.value.firstname;
    }
};

const validateDateOfBirth = () => {
    // Logique de validation de la date de naissance
    // Vous pouvez utiliser la logique fournie dans le modèle de l'utilisateur
};

const validatePhoneNumber = () => {
    // Logique de validation du numéro de téléphone
    // Vous pouvez utiliser la logique fournie dans le modèle de l'utilisateur
};

const validateEmail = () => {
    // Logique de validation de l'email
    // Vous pouvez utiliser la logique fournie dans le modèle de l'utilisateur
};

const validatePassword = () => {
    if (!user.value.password || user.value.password.length < 8) {
        errors.value.password = "Le mot de passe doit avoir au moins 8 caractères.";
    } else {
        delete errors.value.password;
    }
};

const validateRoleId = () => {
    // Logique de validation du rôle
    // Vous pouvez ajouter votre propre logique de validation ici
};

</script>

<style scoped>
.error-message {
    color: red;
}
</style>
