import { Router } from 'express';
import {
  createStudent,
  getApiInfo,
  getStudentById,
  getStudents,
  updateStudent,
  deleteStudent

} from '../controllers/studentController.js';

const router = Router();

router.get('/', getApiInfo);
router.get('/students', getStudents);
router.get('/students/:id', getStudentById);
router.post('/students', createStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
export default router;