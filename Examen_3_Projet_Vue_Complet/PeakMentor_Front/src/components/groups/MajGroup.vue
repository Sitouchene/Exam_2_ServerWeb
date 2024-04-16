<template>
    <main>
        <h1>Mettre à jour les informations du groupe {{ group.group_name }}</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="group_name" class="form-label">Nom du groupe</label>
                <input type="text" class="form-control" id="group_name" v-model="group.group_name">
            </div>
            <div class="mb-3">
                <label for="group_description" class="form-label">Description du groupe</label>
                <input type="text" class="form-control" id="group_description" v-model="group.group_description">
            </div>
            <div class="mb-3">
                <label for="contractId" class="form-label">ID du contrat</label>
                <input type="number" class="form-control" id="contractId" v-model="group.contractId">
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useGroup from '@/services/serviceGroup';

const { getGroupById, updateGroup } = useGroup();
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const group = ref({
    group_name: null,
    group_description: null,
    contractId: null
});

const submitForm = () => {
    updateGroup(id, group.value)
        .then(() => {
            console.log('Groupe mis à jour avec succès!');
            router.push('/');
        })
        .catch(err => console.error('Erreur lors de la mise à jour du groupe:', err));
};

onBeforeMount(() => {
    getGroupById(id)
        .then(res => group.value = res.data)
        .catch(() => { });
});
</script>
