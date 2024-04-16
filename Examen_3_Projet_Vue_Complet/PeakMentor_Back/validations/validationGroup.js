import { body, check, param } from "express-validator";


const groupRules = [
    
    body('group_name').notEmpty().isLength({ min: 4 }).withMessage("ValidationMessage: group_name doit etre non vide et avoir au moins 4 caracteres"),
    
   
    body('contractId').isInt({ min: 1 }).withMessage("le contractId doit etre un entier positif"),
    param('id').optional().isInt({ min: 1 }).withMessage("l'id doit etre un entier positif")
]

export default groupRules;