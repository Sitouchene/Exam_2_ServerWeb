//Importer le router
import { Router } from "express";
import {getStudents,addStudent,updateStudent,deleteStudent} from "../controllers/students.js"

//Importer les regles de validations
import studentRules from "../validations/validationStudent.js";
// Instance de router
const routerStudent =Router();


routerStudent
    .get("/", getStudents)
    .post("/", studentRules,addStudent)
    .put("/:id", studentRules,updateStudent)
    .delete("/:id", deleteStudent)
   


export default routerStudent