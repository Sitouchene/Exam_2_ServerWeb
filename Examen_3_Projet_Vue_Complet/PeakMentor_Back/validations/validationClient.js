import { body, check, param } from "express-validator";

const phoneRegex=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const postalCodeRegex=/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;

const clientRules = [
    body('company_name').notEmpty().isLength({ min: 4 }).withMessage("company_name doit etre non vide et avoir au moins 4 caracteres"),
    body('contact_name').notEmpty().isLength({ min: 4 }).withMessage("contact_name doit etre non vide et avoir au moins 4 caracteres"),
    body('postal_code').isIn(['AB','BC', 'MB', 'NB','NL', 'NS','NT','NU','ON', 'PE','QC','SK','YT']).withMessage("La province doit être un indicatif postal valide du Canada.Hein!"),
    body('contact_email').isEmail().withMessage("contact_email non valide, il doit etre sous la forme example@domaine.com"),
    body('phone_number').matches(phoneRegex).withMessage("Le numero de telephone n'est pas conforme: 123 456 7890"),
    body('userId').isInt({ min: 1 }).withMessage("le userId doit etre un entier positif"),
    param('id').optional().isInt({ min: 1 }).withMessage("l'id doit etre un entier positif")
]

export default clientRules;