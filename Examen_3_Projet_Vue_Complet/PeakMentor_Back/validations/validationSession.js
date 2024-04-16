import { body, check, param } from "express-validator";
    const timeRegex=/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; //temps (heure) au format hh:mm

const sessionRules = [
    body('session_date').isISO8601().withMessage("Validation message: session_date n'est pas une datecorrecte"),
    body('start_time').matches(timeRegex).withMessage("ValidationMessage: start_time doit être de type heure au format hh:mm"),
    body('end_time').matches(timeRegex).withMessage("ValidationMessage: end_time doit être de type heure au format hh:mm"),
    body('effective_start_time').matches(timeRegex).withMessage("ValidationMessage: effective_start_time doit être de type heure au format hh:mm"),
    body('effective_end_time').matches(timeRegex).withMessage("ValidationMessage: effective_end_time doit être de type heure au format hh:mm"),
    body('duration').isDecimal({min:1.00}).withMessage("Validation Mesage: la duree ninimale d'une seance est 1.00 heure"),
    body('effective_duration').isDecimal({min:1.00}).withMessage("Validation Mesage: la duree ninimale effective d'une seance  est 1.00 heure"),
    body('claimed_hours').isDecimal({min:1.00}).withMessage("Validation Mesage: la duree ninimale des heures reclamees est 1.00 heure"),



    
    body('contractId').isInt({ min: 1 }).withMessage("le contractId doit etre un entier positif"),
    body('tutorId').isInt({ min: 1 }).withMessage("le tutorId doit etre un entier positif"),
    param('id').optional().isInt({ min: 1 }).withMessage("l'id doit etre un entier positif")
]

export default sessionRules;