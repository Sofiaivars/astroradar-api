import { prisma } from "@/config/prisma";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { envs } from "@/config/envs";

export class AuthController {

  public hi(req: Request, res: Response) {
    res.status(200).json({hello: 'world'});
  }

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

      res.status(200).json(user);

    } catch (error) {
      
      console.error(`El email o la contraseña no coinciden`);

    }
  }

  public async signup(req: Request, res: Response) {
    const {
      name, 
      lastName, 
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
        !lastName || 
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
        lastname: lastName,
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

}