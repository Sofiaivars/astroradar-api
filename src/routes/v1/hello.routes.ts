import { HelloController } from "@controllers/v1/hello.controller";
import { Router } from "express";

export class HelloRoutes {

  static get routes() : Router {
    const router = Router();
    const helloController = new HelloController();
    
    router.get('/', helloController.hello);

    return router;
  }
}