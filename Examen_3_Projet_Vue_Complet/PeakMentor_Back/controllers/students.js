import Student from "../models/Student.js";

// Obtenir tous les tuteurs
export const getStudents = async (req, res) => {
    try {
      const students = await Student.findAll();
      res.json(students);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Ajouter un tuteur
  export const addStudent = async (req, res) => {
    try {
      const student = await Student.create(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  // Mettre à jour un tuteur
  export const updateStudent = async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await Student.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updatedStudent = await Student.findOne({ where: { id: id } });
        res.status(200).json(updatedStudent);
      } else {
        res.status(404).send("Etudiant non trouvé.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Supprimer un tuteur
  export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Student.destroy({
        where: { id: id }
      });
      if (deleted) {
        res.status(204).send("Etudiant supprimé.");
      } else {
        res.status(404).send("Etudiant non trouvé.");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };