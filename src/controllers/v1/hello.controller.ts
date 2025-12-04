import { Request, Response } from "express";

export class HelloController {
  public hello (req: Request, res: Response) {
    res.status(200).json({ hello: "world" });
  }
}