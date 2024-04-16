//Importer le router
import { Router } from "express";
import {getGroupsStudents,addGroupStudent,updateGroupStudent,deleteGroupStudent} from "../controllers/groupsstudents.js"


// Instance de router
const routerGroupStudent =Router();

routerGroupStudent
    .get("/", getGroupsStudents)
    .post("/", addGroupStudent)
    .put("/:id", updateGroupStudent)
    .delete("/:id", deleteGroupStudent)
   


export default routerGroupStudent