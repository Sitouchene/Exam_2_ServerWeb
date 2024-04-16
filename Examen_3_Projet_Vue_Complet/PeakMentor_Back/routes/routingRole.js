//Importer le router
import { Router } from "express";
import { addRole, rolesList,updateRole, deleteRole, listUsersByRole } from "../controllers/roles.js";

//Instance de router
const routerRole = Router()

routerRole
    .get("/", rolesList)
    .post("/", addRole)
    .put("/:id", updateRole)
    .delete("/:id", deleteRole)
    .get("/:id/users",listUsersByRole)


export default routerRole