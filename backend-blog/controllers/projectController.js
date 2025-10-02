import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from "../models/projectModel.js";

export const addProject = async (req, res) => {
    const { title, description } = req.body;

    try {
        const project = await createProject(req.user.id, title, description);
        res.status(201).json({ project });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const listProjects = async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.json({ projects });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getProject = async (req, res) => {
    try {
        const project = await getProjectById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Proje bulunamadı' });

        }
        res.json({ project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const editProject = async (req, res) => {
    const { title, description } = req.body;

    try {
        const project = await updateProject(req.user.id, title, description);

        if (!project) {
            res.status(404).json({ message: 'Proje bulunamadı' });

        }
        res.json({ project });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeProject = async (req, res) => {
    try {
        await deleteProject(req.params.id);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};