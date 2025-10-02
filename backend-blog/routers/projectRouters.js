import express from 'express';
import { addProject,listProjects,getProject,editProject,removeProject } from '../controllers/projectController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/role.js';

const router=express.Router();

router.use(authenticateToken);

router.post('/',addProject);
router.get('/',listProjects);
router.get('/:id',getProject);
router.put('/:id',editProject);
router.delete('/:id',authorizeRoles('admin'),removeProject);

export default router;