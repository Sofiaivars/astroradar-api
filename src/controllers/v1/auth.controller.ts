import { prisma } from "@/config/prisma";
import { Request, Response } from "express";

export class AuthController {

  public hi(req: Request, res: Response) {
    res.status(200).json({hello: 'world'});
  }

  public login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      
      res.status(200).json({email, password});
      console.log({email, password});

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
      
      const newUser = {
        name: name,
        lastname: lastName,
        username: username,
        password: password,
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