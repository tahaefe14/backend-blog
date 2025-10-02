import { pool } from "../config/db.js";



export const createProject = async (user_id, title, description) => {
    const result = await pool.query('INSERT INTO projects (user_id, title, description) VALUES ($1, $2, $3) RETURNING *', [user_id, title, description]);
    return result.rows[0];
};

export const getAllProjects = async () => {
    const result = await pool.query('SELECT * FROM projects');
    return result.rows;
};

export const getProjectById = async (id) => {
    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
    return result.rows[0];
};

export const updateProject = async (id, title, description) => {
    const result = await pool.query('UPDATE projects SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);
    return result.rows[0];
};

export const deleteProject = async (id) => {
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
};