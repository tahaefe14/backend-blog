import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { creatteUser, getUserByEmail } from "../models/userModel.js";
dotenv.config();

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'Email zaten kullanılıyor' });

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await creatteUser(name, email, hashedPassword, role);
        res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Email bulunamadı' });

        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Parola yanlış' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};