<template>
    <main>
        <h1>Ajouter une session</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="training_name" class="form-label">Nom de la formation</label>
                <input type="text" class="form-control" id="training_name" v-model="training.training_name">
                <span v-if="errors.training_name" class="error-message">{{ errors.training_name }}</span>
            </div>
            <div class="mb-3">
                <label for="training_description" class="form-label">Description de la formation</label>
                <textarea class="form-control" id="training_description" v-model="training.training_description"></textarea>
                <span v-if="errors.training_description" class="error-message">{{ errors.training_description }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useTraining from '@/services/serviceTraining';

const { addTraining } = useTraining();
const router = useRouter();

const training = ref({
    training_name: '',
    training_description: ''
});

const errors = ref({});

const submitForm = () => {
    errors.value = {};

    // Validez les données de la session ici...
    validateForm();

    // Si aucune erreur, soumettre le formulaire
    if (Object.keys(errors.value).length === 0) {
        addTraining(training.value)
            .then(() => {
                console.log("Formation ajoutée avec succès!");
                router.push('/');
            })
            .catch(err => console.error("Erreur lors de l'ajout de la formation:", err));
    }
};

// Fonctions de validation
const validateForm = () => {
    validateTrainingName();
    validateTrainingDescription();
    // Ajoutez d'autres fonctions de validation selon les besoins
};

const validateTrainingName = () => {
    if (!training.value.training_name) {
        errors.value.training_name = "Veuillez entrer un nom de formation.";
    } else if (training.value.training_name.length < 4 || training.value.training_name.length > 255) {
        errors.value.training_name = "Ce champ doit contenir entre 4 et 255 caractères.";
    } else {
        delete errors.value.training_name;
    }
};

const validateTrainingDescription = () => {
    // Validation de la description de la formation (optionnel)
    // Ici, vous pouvez ajouter des règles de validation selon vos besoins
};

</script>

<style scoped>
.error-message {
    color: red;
}
</style>
