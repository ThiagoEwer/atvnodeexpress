import { Router } from "express";
import StudentController from '../controller/StudentController.js'

const router = Router();

router.get('/students', StudentController.findAllStudents);
router.post('/students', StudentController.saveStudent);

router.get('/students/:id', StudentController.findStudentById);
router.post('/students/:id', StudentController.updateStudent);
router.delete('/students/:id', StudentController.deleteStudent);

export default router;