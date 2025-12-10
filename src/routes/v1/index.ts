import { Router } from "express";
import { HelloRoutes } from "@routes/v1/hello.routes";
import { AuthRoutes } from "@routes/v1/auth.routes";
import { EventsRoutes } from "@routes/v1/events.routes";
import { SatsRoutes } from "@routes/v1/sats.routes";

export class AppRoutes {

  static get routes(): Router {
    
    const router = Router();

    router.use('/api/v1/hello', HelloRoutes.routes);
    router.use('/api/v1/auth', AuthRoutes.routes);
    router.use('/api/v1/events', EventsRoutes.routes);
    router.use('/api/v1/sats', SatsRoutes.routes);

    return router;
  }

}