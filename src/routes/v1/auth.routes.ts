import { AuthController } from "@controllers/v1/auth.controller";
import { Router } from "express";

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();
    const authController = new AuthController();

    router.get('/hi', authController.hi);
    router.get('/login', authController.hi);
    router.get('/signup', authController.hi);

    return router;
  }

}