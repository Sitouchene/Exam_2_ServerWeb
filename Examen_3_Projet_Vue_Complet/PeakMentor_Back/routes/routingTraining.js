//Importer le router
import { Router } from "express";
import {getTrainings,addTraining,updateTraining,deleteTraining} from "../controllers/trainings.js"

//
import trainingRules from "../validations/validationTraining.js"

// Instance de router
const routerTraining =Router();

routerTraining
    .get("/", getTrainings)
    .post("/", trainingRules,addTraining)
    .put("/:id",trainingRules, updateTraining)
    .delete("/:id", deleteTraining)
   


export default routerTraining