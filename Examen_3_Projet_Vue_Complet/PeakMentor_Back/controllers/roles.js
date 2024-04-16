import { Role, User } from "../models/relations.js";

//Lecture de la liste des roles
export const rolesList = async (req, res) => {
    try {
        const tousLesRoles = await Role.findAll()
        res.status(200).json({ data: tousLesRoles })
    } catch (error) {
        res.status(500).json({ message:"Erreur de la recuperation des roles" + error.message })
    }

}

//Creation d'un role
export const addRole = async (req, res) => {
    //Recuperation de l'information
    const role = req.body
    

    try {
        await Role.create(role)
        res.status(201).json({ message: "Role crée avec succes!" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Mise a jour d'un role
export const updateRole = async (req, res) => {
    
    const { id } = req.params

    //Nouvelle valeur
    const nouveauRole = req.body

    if (!parseInt(id)) return res.status(404).json({ message: "Ce role n'existe pas" })
    // Recuperation de la valeur courante

    try {
        const roleCourant = await Role.findByPk(id)
        //Mise a jour
        await roleCourant.update(nouveauRole)
        
        

        res.status(201).json({ message: `Le role ${id} est mis ajour` })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}


//Suppression d'un role
export const deleteRole = async (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ message: "Le role indiqué n'existe pas." });
    }

    try {
        const deleted = await Role.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ message: "Role supprimé avec succès." });
        } else {
            return res.status(404).json({ message: "Le role indiqué n'existe pas." });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Liste des users par role
export const listUsersByRole = async (req,res) =>{
    try{
        const {id}=req.params
        const roleWithUsers= await Role.findByPk(id,{
            include:[{
                model:User,
                as:'users'
            }

            ]
        })
        if(!roleWithUsers){
            return res.status(404).send({message:"Role non trouvé!"})}
        res.status(200).json(roleWithUsers);

    } catch{
        res.status(500).send({ message: error.message || "Une erreur est survenue lors de la récupération des users de ce role." });

    }


}