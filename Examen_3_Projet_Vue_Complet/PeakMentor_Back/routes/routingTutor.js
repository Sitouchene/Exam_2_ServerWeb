//Importer le router
import { Router } from "express";
import {getTutors,addTutor,updateTutor,deleteTutor} from "../controllers/tutors.js"

// Instance de router
const routerTutor =Router();
//Importer les regles de validations
import tutorRules from "../validations/validationTutor.js";

routerTutor
    .get("/", getTutors)
    .post("/", tutorRules,addTutor)
    .put("/:id", tutorRules, updateTutor)
    .delete("/:id", deleteTutor)
   


export default routerTutor