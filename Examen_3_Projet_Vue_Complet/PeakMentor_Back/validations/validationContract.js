import { body, check, param } from "express-validator";


const contractRules = [
    body('training_class').isIn(["group", "individual", "not yet defined"]).withMessage("Validation message :La classe de formation doit être 'group', 'individual' ou 'not yet defined'."),
    body('training_type').isIn(["on line", "on site", "hybrid"]).withMessage("Validation message:Le type de formation doit être 'on line', 'on site' ou 'hybrid''."),
    body('hours_quantitye').isDecimal({min:0.01}).withMessage("Validation message: La quantité d'heures doit être strictement positive"),
    body('hourly_rate').isDecimal({min:25.00}).withMessage("Validation message: Le taux horaire doit etre un montant (decimal) d'au moins 25.00"),
    body('start_date').isISO8601().withMessage("Validation message: start_date n'est pas une datecorrecte"),
    body('end_date').isISO8601().withMessage("Validation message: end_date n'est pas une datecorrecte"),
    body('status').isBoolean().withMessage("Validation message: status doit etre de type boolean"),
    
    body('trainingId').isInt({ min: 1 }).withMessage("le trainingId doit etre un entier positif"),
    body('clientId').isInt({ min: 1 }).withMessage("le clientId doit etre un entier positif"),
    param('id').optional().isInt({ min: 1 }).withMessage("l'id doit etre un entier positif")
]

export default contractRules;