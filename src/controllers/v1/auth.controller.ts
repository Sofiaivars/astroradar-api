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
      
      res.status(200).json({username, email, city, country});
      console.log({name, lastName, username, email, password, image, city, country});

    } catch (error) {
      
      console.error(error)

    }
      
  }

}