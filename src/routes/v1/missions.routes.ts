import { MissionsController } from "@controllers/v1/missions.controller";
import { Router } from "express";

export class MissionsRoutes {
  static get routes(): Router {
    const router = Router();
    const missionsController = new MissionsController();

    router.post('/add', missionsController.addMission);

    return router;
  }
}