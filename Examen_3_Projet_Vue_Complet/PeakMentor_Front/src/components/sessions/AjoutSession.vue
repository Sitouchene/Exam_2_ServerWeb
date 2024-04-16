<template>
    <main>
        <h1>Ajouter une session</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="session_date" class="form-label">Date de la session</label>
                <input type="date" class="form-control" id="session_date" v-model="session.session_date">
                <span v-if="errors.session_date" class="error-message">{{ errors.session_date }}</span>
            </div>
            <div class="mb-3">
                <label for="start_time" class="form-label">Heure de début</label>
                <input type="time" class="form-control" id="start_time" v-model="session.start_time">
                <span v-if="errors.start_time" class="error-message">{{ errors.start_time }}</span>
            </div>
            <div class="mb-3">
                <label for="end_time" class="form-label">Heure de fin</label>
                <input type="time" class="form-control" id="end_time" v-model="session.end_time">
                <span v-if="errors.end_time" class="error-message">{{ errors.end_time }}</span>
            </div>
            <div class="mb-3">
                <label for="duration" class="form-label">Durée (en heures)</label>
                <input type="number" class="form-control" id="duration" v-model="session.duration">
                <span v-if="errors.duration" class="error-message">{{ errors.duration }}</span>
            </div>
            <div class="mb-3">
                <label for="session_stage" class="form-label">État de la session</label>
                <select class="form-control" id="session_stage" v-model="session.session_stage">
                    <option value="created">Créée</option>
                    <option value="submitted">Soumise</option>
                    <option value="approved">Approuvée</option>
                    <option value="billed">Facturée</option>
                </select>
                <span v-if="errors.session_stage" class="error-message">{{ errors.session_stage }}</span>
            </div>
            <div class="mb-3">
                <label for="cancelled_status" class="form-label">Statut d'annulation</label>
                <input type="checkbox" class="form-check-input" id="cancelled_status" v-model="session.cancelled_status">
                <label class="form-check-label" for="cancelled_status">Annulée</label>
            </div>
            <div class="mb-3">
                <label for="billable_status" class="form-label">Statut de facturation</label>
                <input type="checkbox" class="form-check-input" id="billable_status" v-model="session.billable_status">
                <label class="form-check-label" for="billable_status">Facturable</label>
            </div>
            <!-- Ajoutez les autres champs du modèle Session ici -->
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useSession from '@/services/serviceSession';

const { addSession } = useSession();
const router = useRouter();

const session = ref({
    session_date: '',
    start_time: '',
    end_time: '',
    duration: '',
    session_stage: 'created',
    cancelled_status: false,
    billable_status: false
    // Ajoutez les autres champs du modèle Session ici
});

const errors = ref({});

const submitForm = () => {
    errors.value = {};

    // Validez les données de la session ici...
    validateForm();

    // Si aucune erreur, soumettre le formulaire
    if (Object.keys(errors.value).length === 0) {
        addSession(session.value)
            .then(() => {
                console.log("Session ajoutée avec succès!");
                router.push('/');
            })
            .catch(err => console.error("Erreur lors de l'ajout de la session:", err));
    }
};

// Fonctions de validation
const validateForm = () => {
    validateSessionDate();
    validateStartTime();
    validateEndTime();
    validateDuration();
    validateSessionStage();
    // Ajoutez d'autres fonctions de validation selon les besoins
};

const validateSessionDate = () => {
    if (!session.value.session_date) {
        errors.value.session_date = "Veuillez entrer une date de session.";
    } else {
        delete errors.value.session_date;
    }
};

const validateStartTime = () => {
    if (!session.value.start_time) {
        errors.value.start_time = "Veuillez entrer une heure de début.";
    } else {
        delete errors.value.start_time;
    }
};

const validateEndTime = () => {
    if (!session.value.end_time) {
        errors.value.end_time = "Veuillez entrer une heure de fin.";
    } else if (session.value.end_time <= session.value.start_time) {
        errors.value.end_time = "L'heure de fin doit être après l'heure de début.";
    } else {
        delete errors.value.end_time;
    }
};

const validateDuration = () => {
    if (!session.value.duration) {
        errors.value.duration = "Veuillez entrer une durée.";
    } else if (session.value.duration <= 0) {
        errors.value.duration = "La durée doit être supérieure à zéro.";
    } else {
        delete errors.value.duration;
    }
};

const validateSessionStage = () => {
    if (!session.value.session_stage) {
        errors.value.session_stage = "Veuillez sélectionner un état de session.";
    } else {
        delete errors.value.session_stage;
    }
};

// Ajoutez d'autres fonctions de validation selon les besoins

</script>

<style scoped>
.error-message {
    color: red;
}
</style>
