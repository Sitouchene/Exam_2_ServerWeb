import { body, check, param } from "express-validator";
const emailRegex= /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const mdpRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
const phoneRegex=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const userRules = [
    body('lastname').notEmpty().isLength({ min: 3 }).withMessage("lastname doit etre non vide et avoir au moins 3 caracteres"),
    body('firstname').notEmpty().isLength({ min: 3 }).withMessage("firstname doit etre non vide et avoir au moins 3 caracteres"),
    body('date_of_birth').isISO8601().withMessage('la date est incorrecte'),
    body('phone_number').matches(phoneRegex).withMessage("Le numero de telephone n'est pas conforme: 123 456 7890"),
    body('email').matches(emailRegex).withMessage("Email non valide, il doit etre sous la forme example@domaine.com"),
    body('password').matches(mdpRegex).withMessage("Le mot de passe est invalide. Il doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial. A refaire"),
    param('id').optional().isInt({ min: 1 }).withMessage("l'id doit etre un entier positif")
]

export default userRules