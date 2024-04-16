<template>
    <main>
        <h1>Ajouter un groupe</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="group_name" class="form-label">Nom du groupe</label>
                <input type="text" class="form-control" id="group_name" v-model="group.group_name">
                <span v-if="errors.group_name" class="error-message">{{ errors.group_name }}</span>
            </div>
            <div class="mb-3">
                <label for="group_description" class="form-label">Description du groupe</label>
                <textarea class="form-control" id="group_description" v-model="group.group_description"></textarea>
                <span v-if="errors.group_description" class="error-message">{{ errors.group_description }}</span>
            </div>
            <div class="mb-3">
                <label for="contractId" class="form-label">ID du contrat</label>
                <input type="number" class="form-control" id="contractId" v-model.number="group.contractId">
                <span v-if="errors.contractId" class="error-message">{{ errors.contractId }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useGroup from '@/services/serviceGroup';

const { addGroup } = useGroup();
const router = useRouter();

const group = ref({
    group_name: '',
    group_description: '',
    contractId: null
});

const errors = ref({});

const submitForm = () => {
    errors.value = {};

    // Validez les données du groupe ici...
    validateForm();

    // Si aucune erreur, soumettre le formulaire
    if (Object.keys(errors.value).length === 0) {
        addGroup(group.value)
            .then(() => {
                console.log("Groupe ajouté avec succès!");
                router.push('/');
            })
            .catch(err => console.error("Erreur lors de l'ajout du groupe:", err));
    }
};

// Fonctions de validation
const validateForm = () => {
    validateGroupName();
    validateGroupDescription();
    validateContractId();
    // Ajoutez d'autres fonctions de validation selon les besoins
};

const validateGroupName = () => {
    if (!group.value.group_name || group.value.group_name.length < 4) {
        errors.value.group_name = "Le nom du groupe doit avoir au moins 4 caractères.";
    } else {
        delete errors.value.group_name;
    }
};

const validateGroupDescription = () => {
    // Logique de validation de la description du groupe
};

const validateContractId = () => {
    if (!group.value.contractId) {
        errors.value.contractId = "Veuillez sélectionner un contrat.";
    } else {
        delete errors.value.contractId;
    }
};

</script>

<style scoped>
.error-message {
    color: red;
}
</style>
