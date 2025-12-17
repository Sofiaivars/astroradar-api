import { prisma } from "@config/prisma";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { envs } from "@config/envs";

export class AuthController {

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
      if(!user) return res.status(404).json(`El email: ${email} no se encuentra registrado`);

      const isValid = bcrypt.compareSync(password, user.password);
      if(!isValid) return res.status(401).json("Contraseña fallida");
      
      const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, 
        envs.SECRET_JWT_KEY!,
        {
          expiresIn: '1h'
        }
      );

      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: envs.NODE_ENV === 'production',
          sameSite: "lax",
          maxAge: 1000 * 60 * 60,
        })
        .status(200)
        .json(
          {
            id: user.id,
            name: user.name,
            lastName: user.lastname,
            username: user.username,
            image: user.image,
            email: user.email,
            city: user.city,
            country: user.country,
            rol: user.rol,
            isActive: user.is_active,
            createdAt: user.createdAt,
          }
        );

    } catch (error) {
      
      console.error(`El email o la contraseña no coinciden`);

    }
  }

  public async signup(req: Request, res: Response) {
    const {
      name, 
      lastname, 
      username, 
      email, 
      password, 
      image,
      city,
      country,
    } = req.body;

    try {
      
      if(
        !name || 
        !lastname || 
        !username || 
        !email || 
        !password || 
        !image || 
        !city || 
        !country
      ) throw new Error("Faltan datos");

      const hashedPassword = bcrypt.hashSync(password, envs.SALT_ROUNDS);
      
      const newUser = {
        name: name,
        lastname: lastname,
        username: username,
        password: hashedPassword,
        image: image,
        email: email,
        city: city,
        country: country,
        rol: "user",
        is_active: false
      }
      
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { email: email }
          ]
        }
      });
      if(existingUser) return res.status(400).json("El nombre de usuario o email ya están registrados");

      await prisma.user.create({ data: newUser });
      res.status(200).json(`Usuario: ${username} creado con éxito!`);

    } catch (error) {
      
      console.error(error)

    }
      
  }

  public async profile(req: Request, res: Response){
    try {
      const userEmail = req.user?.email;
      if(!userEmail)throw new Error("Datos no disponibles");

      const userData = await prisma.user.findFirst({
        where:{
          email: userEmail
        }
      });
      if(!userData)throw new Error(`No se encontró al usuario con email: ${userEmail}`);

      return res.status(200).json({
        id: userData.id, 
        name: userData.name, 
        lastname: userData.lastname,
        username: userData.username,
        image: userData.image,
        email: userData.email,
        city: userData.city,
        country: userData.country,
        rol: userData.rol,
        isActive: userData.is_active,
        createdAt: userData.createdAt,
      });
    } catch (error) {
      
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });

    }
  }
}