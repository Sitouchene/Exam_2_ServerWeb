import { body, check, param } from "express-validator";



const trainingRules = [
    body('training_name').notEmpty().isLength({ min: 4 }).withMessage("training_name doit etre non vide et avoir au moins 4 caracteres"),
    param('id').optional().isInt({ min: 1 }).withMessage("l'id doit etre un entier positif"),
]

export default trainingRules;