import { Request, Response } from "express";

export class TestController {

  public hi(req: Request, res: Response) {
    res.status(200).json({hello: 'world'});
  }

}