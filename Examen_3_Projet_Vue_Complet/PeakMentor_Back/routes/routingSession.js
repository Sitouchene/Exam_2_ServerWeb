//Importer le router
import { Router } from "express";
import {getSessions, addSession,updateSession,deleteSession} from "../controllers/sessions.js"

// import des validations
import sessionRules from "../validations/validationSession.js";
// Instance de router
const routerSession =Router();

routerSession
    .get("/", getSessions)
    .post("/",sessionRules, addSession)
    .put("/:id",sessionRules, updateSession)
    .delete("/:id", deleteSession)
   


export default routerSession