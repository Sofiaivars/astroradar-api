import { envs } from "@config/envs";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface JwtUserPayload {
  id: string;
  username: string;
  email: string;
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["access_token"];
  if(!token) return res.status(401).json({ message: "Acceso denegado" });

  try {
    
    const payload = jwt.verify(token, envs.SECRET_JWT_KEY!);
    req.user = payload as JwtUserPayload;
    next();

  } catch (error) {
    
    return res.status(403).json({ message: "Token inválido o expirado" });

  }

}