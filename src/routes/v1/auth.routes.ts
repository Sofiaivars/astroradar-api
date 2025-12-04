import { AuthController } from "@controllers/v1/auth.controller";
import { Router } from "express";

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();
    const authController = new AuthController();

    router.post('/login', authController.login);
    router.post('/signup', authController.signup);

    return router;
  }

}