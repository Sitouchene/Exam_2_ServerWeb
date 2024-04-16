//Importer le router
import { Router } from "express";
import { addUser, updateUser, usersList,deleteUser } from "../controllers/users.js";

//Importer les regles de validations
import userRules from "../validations/validationUser.js";
import {verifierToken} from "../authentification/verifierToken.js"

//Instance de router
const routerUser = Router()


routerUser
    .get("/", verifierToken, usersList)
    .post("/", userRules,addUser)
    .put("/:id", userRules,updateUser)
    .delete("/:id", deleteUser)
   


export default routerUser