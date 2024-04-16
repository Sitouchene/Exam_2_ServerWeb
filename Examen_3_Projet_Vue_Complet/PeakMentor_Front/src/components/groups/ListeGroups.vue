<template>
    <main>
        <h1>Liste des groupes</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nom du groupe</th>
                    <th>Description du groupe</th>
                    <th>ID du contrat</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="group in groupList" :key="group.id">
                    <td>{{ group.group_name }}</td>
                    <td>{{ group.group_description }}</td>
                    <td>{{ group.contractId }}</td>
                    <td>
                        <button class="btn btn-primary" @click="update(group.id)">Modifier</button>
                        <button class="btn btn-danger" @click="deleteGroup(group.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="addGroup">Ajouter un groupe</button>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useGroup from '../../services/serviceGroup';
import { useRouter } from "vue-router";

const { getAllGroups, deleteGroupById } = useGroup();
const groupList = ref([]);
const router = useRouter();

const deleteGroup = id => {
    deleteGroupById(id)
        .then(() => {
            console.log('Groupe supprimé avec succès');
            getAllGroups()
                .then((res) => groupList.value = res.data)
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

const update = id => {
    router.push(`/update-group/${id}`);
};

onBeforeMount(() => {
    getAllGroups()
        .then((res) => groupList.value = res.data)
        .catch(err => console.error(err));
});

const addGroup = () => {
    router.push('/add-group');
};
</script>

<style scoped>
img {
    max-width: 100%;
    width: 10%;
}
</style>
