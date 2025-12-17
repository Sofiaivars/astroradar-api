import { SatsController } from "@controllers/v1/sats.controller";
import { Router } from "express";

export class SatsRoutes {

  static get routes(): Router {
    const router = Router();
    const satsController = new SatsController();

    router.post('/above', satsController.above);
    router.post('/iss', satsController.iss);

    return router;
  }

}