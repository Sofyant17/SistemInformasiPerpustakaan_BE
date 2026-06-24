import type {Request, Response} From 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../index.js';
import { users } from '../index.js';
const secret_key = 'rahasia_negara';

interface jwtPayload{
    id: number;
    email: string;
}

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const { nama, email, password } = req.body;
        const hashedpassword = await bcrypt.hash(
            password,
            10
        );

        await db.insert(users).values({
            nama,
            email,
            password: hashedpassword
        });

        res.status(201).json({
            message: 'Register berhasil'
        });

    }   catch (error) {
        res.status(500).json({
            message: 'gagal register',
            error
        });
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password} = req.body;

        const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

        const user = result[0];

        if (!user){
            return res.status(401).json({
                message: 'Email tidak di temukan'
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'password salah'
            });
        }
        const payload: JwtPayload = {
            id: user.id,
            email: user.email
        };

        const token = jwt.sign(
            payload,
            secret_key,
            {
                expiresIn: '1h'
            }
        );
        res.json({
            message: 'Login berhasil',
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal login',
            error
        });
    }
};