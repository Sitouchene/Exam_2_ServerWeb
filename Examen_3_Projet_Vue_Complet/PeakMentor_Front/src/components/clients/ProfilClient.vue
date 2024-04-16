<template>
    <main>
        <h1>
            Informations sur {{ client.company_name }} 
        </h1>
        <div class="card">
            <div class="card-body">
                <p class="card-text">Nom: {{ client.nom }}</p>
                <p class="card-text">Prénom: {{ client.prenom }}</p>
                <p class="card-text">Email: {{ client.contact_email }}</p>
                <p class="card-text">Téléphone: {{ client.telephone }}</p>
                <p class="card-text">Adresse: {{ client.address_avenue }}, {{ client.city }}, {{ client.province }}, {{ client.country }}</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import useClient from "@/services/serviceClient";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const { id } = route.params

const client = ref({})

const { getClientById } = useClient()
onBeforeMount(() => {
    getClientById(id).then(res => {
        client.value = res.data
    })
})

</script>

<style scoped>
.card-img-top {
    max-width: 100%;
    width: 250px;
    height: 250px;
}
</style>
