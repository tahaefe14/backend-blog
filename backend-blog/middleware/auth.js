import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserById } from '../models/userModel.js';
dotenv.config();

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token yok' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token geçersiz' });
    }
};