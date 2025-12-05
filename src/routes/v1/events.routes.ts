import { EventsController } from "@controllers/v1/events.controller";
import { Router } from "express";

export class EventsRoutes {
  static get routes(): Router {
    
    const router = Router();
    const eventsController = new EventsController();

    router.get('/', eventsController.getEventsList);

    return router;
  }
}