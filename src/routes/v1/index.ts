import { Router } from "express";
import { TestRoutes } from "./test.routes";

export class AppRoutes {

  static get routes(): Router {
    
    const router = Router();

    router.use('/api/v1/test', TestRoutes.routes);

    return router;
  }

}