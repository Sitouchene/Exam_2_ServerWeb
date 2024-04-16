import { body, check, param } from "express-validator";

const phoneRegex=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const nasRegex=/^(\d{9}|\d{3}[-\s]?\d{3}[-\s]?\d{3})$/;

const tutorRules = [
    body('last_name').notEmpty().isLength({ min: 3 }).withMessage("lastname doit etre non vide et avoir au moins 3 caracteres"),
    body('first_name').notEmpty().isLength({ min: 3 }).withMessage("firstname doit etre non vide et avoir au moins 3 caracteres"),
    body('DOB').isISO8601().withMessage('la date est incorrecte'),
    body('NAS').matches(nasRegex).withMessage("NAS non conforme, serie de 9 chiffres!"),
    body('hiring_date').isISO8601().withMessage('la date est incorrecte'),
    body('ending_date').isISO8601().withMessage('la date est incorrecte'),
    body('effective_ending_date').isISO8601().withMessage('la date est incorrecte'),
    body('active_status').isBoolean().withMessage('active status doit etre boolean: false ou true'),   
    body('phone_number').matches(phoneRegex).withMessage("Le numero de telephone n'est pas conforme: 123 456 7890"),
    body('hourly_rate').isDecimal({min:16.00,max:100}).withMessage("le taux horaire doit etre un nombre decimal, compris entre 16 et 100"), 
    body('email').isEmail().withMessage("Email non valide, il doit etre sous la forme example@domaine.com"),
    body('userId').isInt({ min: 1 }).withMessage("le userId doit etre un entier positif"),
    param('id').optional().isInt({ min: 1 }).withMessage("l'id doit etre un entier positif")
]

export default tutorRules