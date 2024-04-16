<template>
    <main>
        <h1>Mettre à jour les informations de la session</h1>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="sessionDate" class="form-label">Date de la session</label>
                <input type="date" class="form-control" id="sessionDate" v-model="session.session_date">
            </div>
            <div class="mb-3">
                <label for="startTime" class="form-label">Heure de début</label>
                <input type="time" class="form-control" id="startTime" v-model="session.start_time">
            </div>
            <div class="mb-3">
                <label for="endTime" class="form-label">Heure de fin</label>
                <input type="time" class="form-control" id="endTime" v-model="session.end_time">
            </div>
            <div class="mb-3">
                <label for="duration" class="form-label">Durée</label>
                <input type="number" class="form-control" id="duration" v-model="session.duration">
            </div>
            <div class="mb-3">
                <label for="sessionStage" class="form-label">État de la session</label>
                <select class="form-select" id="sessionStage" v-model="session.session_stage">
                    <option value="created">Créée</option>
                    <option value="submitted">Soumise</option>
                    <option value="approved">Approuvée</option>
                    <option value="billed">Facturée</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useSession from '@/services/serviceSession';

const { getSessionById, updateSession } = useSession();
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const session = ref({
    session_date: null,
    start_time: null,
    end_time: null,
    duration: null,
    session_stage: null
});

const submitForm = () => {
    updateSession(id, session.value)
        .then(() => {
            console.log('Session mise à jour avec succès!');
            router.push('/');
        })
        .catch(err => console.error('Erreur lors de la mise à jour de la session:', err));
};

onBeforeMount(() => {
    getSessionById(id)
        .then(res => session.value = res.data)
        .catch(() => { });
});
</script>
