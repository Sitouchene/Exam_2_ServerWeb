<template>
    <main>
        <h1>Liste des étudiants</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date de naissance</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in studentList" :key="student.id">
                    <td>{{ student.last_name }}</td>
                    <td>{{ student.first_name }}</td>
                    <td>{{ student.DOB }}</td>
                    <td>{{ student.phone_number }}</td>
                    <td>{{ student.email }}</td>
                    <td>
                        <button class="btn btn-primary" @click="updateStudent(student.id)">Modifier</button>
                        <button class="btn btn-danger" @click="deleteStudent(student.id)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="addStudent">Ajouter un étudiant</button>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useStudent from '../../services/serviceStudent';
import { useRouter } from "vue-router";

const { getAllStudents} = useStudent();
const studentList = ref([]);
const router = useRouter();

const updateStudent = id => {
    router.push(`/update-student/${id}`);
};

const deleteStudent = id => {
    deleteStudent(id)
        .then(() => {
            console.log('Étudiant supprimé avec succès');
            getAllStudents()
                .then((res) => studentList.value = res.data)
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

const addStudent = () => {
    router.push('/add-student');
};

onBeforeMount(() => {
    getAllStudents()
        .then((res) => studentList.value = res.data)
        .catch(err => console.error(err));
});
</script>

<style scoped>
img {
    max-width: 100%;
    width: 10%;
}
</style>
