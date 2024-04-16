//Importer le router
import { Router } from "express";
import {getGroups,addGroup,updateGroup,deleteGroup} from "../controllers/groups.js"

//Import des validation
import groupRules from "../validations/validationGroup.js";
// Instance de router
const routerGroup =Router();

routerGroup
    .get("/", getGroups)
    .post("/", groupRules,addGroup)
    .put("/:id", groupRules,updateGroup)
    .delete("/:id", deleteGroup)
   


export default routerGroup