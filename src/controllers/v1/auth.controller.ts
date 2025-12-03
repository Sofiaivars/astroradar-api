import { Request, Response } from "express";

export class AuthController {

  public hi(req: Request, res: Response) {
    res.status(200).json({hello: 'world'});
  }

}