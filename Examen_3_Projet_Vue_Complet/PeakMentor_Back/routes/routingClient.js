//Importer le router
import { Router } from "express";
import {getClients,addClient,updateClient,deleteClient} from "../controllers/clients.js"

// Instance de router
const routerClient =Router();
//Importer les regles de validations
import tutorRules from "../validations/validationClient.js";
import clientRules from "../validations/validationClient.js";

routerClient
    .get("/", getClients)
    .post("/",clientRules, addClient)
    .put("/:id",clientRules, updateClient)
    .delete("/:id", deleteClient)
   


export default routerClient