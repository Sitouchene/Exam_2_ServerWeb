<template>
    <main>
        <h1>Ajouter un contrat</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="training_class" class="form-label">Classe de formation</label>
                <input type="text" class="form-control" id="training_class" v-model="contract.training_class">
                <span v-if="errors.training_class" class="error-message">{{ errors.training_class }}</span>
            </div>
            <div class="mb-3">
                <label for="training_type" class="form-label">Type de formation</label>
                <input type="text" class="form-control" id="training_type" v-model="contract.training_type">
                <span v-if="errors.training_type" class="error-message">{{ errors.training_type }}</span>
            </div>
            <div class="mb-3">
                <label for="hours_quantity" class="form-label">Quantité d'heures</label>
                <input type="text" class="form-control" id="hours_quantity" v-model="contract.hours_quantity">
                <span v-if="errors.hours_quantity" class="error-message">{{ errors.hours_quantity }}</span>
            </div>
            <!-- Ajoutez les autres champs du formulaire ici -->
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useContract from '@/services/serviceContract';

const { addContract } = useContract();
const router = useRouter();

const contract = ref({
    training_class: '',
    training_type: '',
    hours_quantity: '',
    start_date: '', // Vous pouvez ajouter une valeur par défaut pour la date de début si nécessaire
    end_date: '', // Vous pouvez ajouter une valeur par défaut pour la date de fin si nécessaire
    hourly_rate: '', // Vous pouvez ajouter une valeur par défaut pour le taux horaire si nécessaire
    clientId: '', // Vous pouvez ajouter une valeur par défaut pour l'ID du client si nécessaire
    trainingId: '' // Vous pouvez ajouter une valeur par défaut pour l'ID de la formation si nécessaire
});

const errors = ref({});

const submitForm = () => {
    errors.value = {};

    // Validez les données du contrat ici...
    validateForm();

    // Si aucune erreur, soumettre le formulaire
    if (Object.keys(errors.value).length === 0) {
        addContract(contract.value)
            .then(() => {
                console.log("Contrat ajouté avec succès!");
                router.push('/');
            })
            .catch(err => console.error("Erreur lors de l'ajout du contrat:", err));
    }
};

// Fonctions de validation
const validateForm = () => {
    validateTrainingClass();
    validateTrainingType();
    validateHoursQuantity();
    // Ajoutez d'autres fonctions de validation selon les besoins
};

const validateTrainingClass = () => {
    if (!contract.value.training_class || contract.value.training_class.length < 4) {
        errors.value.training_class = "La classe de formation doit avoir au moins 4 caractères.";
    } else {
        delete errors.value.training_class;
    }
};

const validateTrainingType = () => {
    if (!contract.value.training_type || contract.value.training_type.length < 4) {
        errors.value.training_type = "Le type de formation doit avoir au moins 4 caractères.";
    } else {
        delete errors.value.training_type;
    }
};

const validateHoursQuantity = () => {
    if (!contract.value.hours_quantity || isNaN(contract.value.hours_quantity)) {
        errors.value.hours_quantity = "La quantité d'heures doit être un nombre valide.";
    } else {
        delete errors.value.hours_quantity;
    }
};

// Ajoutez d'autres fonctions de validation selon les champs du contrat

</script>

<style scoped>
.error-message {
    color: red;
}
</style>
