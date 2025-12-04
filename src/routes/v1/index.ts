import { Router } from "express";
import { AuthRoutes } from "@routes/v1/auth.routes";
import { HelloRoutes } from "@routes/v1/hello.routes";

export class AppRoutes {

  static get routes(): Router {
    
    const router = Router();

    router.use('/api/v1/hello', HelloRoutes.routes);
    router.use('/api/v1/auth', AuthRoutes.routes);

    return router;
  }

}