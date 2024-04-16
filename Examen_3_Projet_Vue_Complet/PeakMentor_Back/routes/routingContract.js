//Importer le router
import { Router } from "express";
import {getContracts,addContract,updateContract,deleteContract} from "../controllers/contracts.js"

//Importer les valdiation
import contractRules from "../validations/validationContract.js";

// Instance de router
const routerContract =Router();

routerContract
    .get("/", getContracts)
    .post("/",contractRules, addContract)
    .put("/:id", contractRules,updateContract)
    .delete("/:id", deleteContract)
   


export default routerContract