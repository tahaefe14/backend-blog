import { pool } from "../config/db.js";

export const createUser = async (name, email, password, role = 'user') => {
    const result = await pool.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, password, role]);
    return result.rows[0];
};

export const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

export const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};