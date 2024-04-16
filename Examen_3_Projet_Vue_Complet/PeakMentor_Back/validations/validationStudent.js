import { body, check, param } from "express-validator";




const studentRules = [
    body('first_name').notEmpty().isLength({ min: 3 }).withMessage("first_name doit etre non vide et avoir au moins 3 caracteres"),
    body('last_name').notEmpty().isLength({ min: 3 }).withMessage("last_name doit etre non vide et avoir au moins 3 caracteres"),
    body('job_title').notEmpty().isLength({ min: 4 }).withMessage("job_title doit etre non vide et avoir au moins 4 caracteres"),
    body('direction').notEmpty().isLength({ min: 2 }).withMessage("diretion doit etre non vide et avoir au moins 2 caracteres"),
    body('DOB').isISO8601().withMessage('la date est incorrecte'),
    body('email').isEmail().withMessage("email non valide, il doit etre sous la forme example@domaine.com"),
    body('userId').isInt({ min: 1 }).withMessage("le userId doit etre un entier positif"),
    body('clientId').isInt({ min: 1 }).withMessage("le clientId doit etre un entier positif"),
    param('id').optional().isInt({ min: 1 }).withMessage("l'id doit etre un entier positif")
]

export default studentRules;