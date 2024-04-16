<template>
    <main>
        <h1>Ajouter un client</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="company_name" class="form-label">Nom de l'entreprise</label>
                <input type="text" class="form-control" id="company_name" v-model="client.company_name">
                <span v-if="errors.company_name" class="error-message">{{ errors.company_name }}</span>
            </div>
            <div class="mb-3">
                <label for="contact_name" class="form-label">Nom du contact</label>
                <input type="text" class="form-control" id="contact_name" v-model="client.contact_name">
                <span v-if="errors.contact_name" class="error-message">{{ errors.contact_name }}</span>
            </div>
            <div class="mb-3">
                <label for="contact_email" class="form-label">Email du contact</label>
                <input type="email" class="form-control" id="contact_email" v-model="client.contact_email">
                <span v-if="errors.contact_email" class="error-message">{{ errors.contact_email }}</span>
            </div>
            <div class="mb-3">
                <label for="address_unit" class="form-label">Unité</label>
                <input type="text" class="form-control" id="address_unit" v-model="client.address_unit">
            </div>
            <div class="mb-3">
                <label for="address_number" class="form-label">Numéro de l'adresse</label>
                <input type="text" class="form-control" id="address_number" v-model="client.address_number">
            </div>
            <div class="mb-3">
                <label for="address_avenue" class="form-label">Avenue</label>
                <input type="text" class="form-control" id="address_avenue" v-model="client.address_avenue">
            </div>
            <div class="mb-3">
                <label for="city" class="form-label">Ville</label>
                <input type="text" class="form-control" id="city" v-model="client.city">
            </div>
            <div class="mb-3">
                <label for="postal_code" class="form-label">Code postal</label>
                <input type="text" class="form-control" id="postal_code" v-model="client.postal_code" placeholder="Format: A1A 1A1">
                <span v-if="errors.postal_code" class="error-message">{{ errors.postal_code }}</span>
            </div>
            <div class="mb-3">
                <label for="province" class="form-label">Province</label>
                <input type="text" class="form-control" id="province" v-model="client.province">
                <span v-if="errors.province" class="error-message">{{ errors.province }}</span>
            </div>
            <div class="mb-3">
                <label for="country" class="form-label">Pays</label>
                <input type="text" class="form-control" id="country" v-model="client.country">
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useClient from '@/services/serviceClient';

const { addClient } = useClient();
const router = useRouter();

const client = ref({
    company_name: '',
    contact_name: '',
    contact_email: '',
    address_unit: null,
    address_number: null,
    address_avenue: '',
    city: '',
    postal_code: '',
    province: '',
    country: 'Canada'
});

const errors = ref({});

const submitForm = () => {
    errors.value = {};

    if (!client.value.company_name || client.value.company_name.length < 4) {
        errors.value.company_name = "Le nom de l'entreprise doit avoir au moins 4 caractères.";
    }

    if (!client.value.contact_name || client.value.contact_name.length < 4) {
        errors.value.contact_name = "Le nom du contact doit avoir au moins 4 caractères.";
    }

    if (!client.value.contact_email || !validateEmail(client.value.contact_email)) {
        errors.value.contact_email = "Veuillez saisir une adresse email valide.";
    }

    if (client.value.postal_code && !validatePostalCode(client.value.postal_code)) {
        errors.value.postal_code = "Le code postal doit être au format A1A 1A1.";
    }

    if (!client.value.province || !validateProvince(client.value.province)) {
        errors.value.province = "La province doit être un indicatif postal valide du Canada.";
    }

    // Si aucune erreur, soumettre le formulaire
    if (Object.keys(errors.value).length === 0) {
        // Appeler la méthode pour ajouter dans la table client
        addClient(client.value)
            .then(() => {
                console.log("Client ajouté avec succès!");
                router.push('/');
            })
            .catch(err => console.error("Erreur lors de l'ajout du client:", err));
    }
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePostalCode = (postalCode) => {
    const re = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    return re.test(postalCode);
};

const validateProvince = (province) => {
    const canadianProvinces = [
        'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'
    ];
    return canadianProvinces.includes(province.toUpperCase());
};

</script>
