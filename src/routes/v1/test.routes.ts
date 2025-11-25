import { TestController } from "@/src/controllers/v1/test.controller";
import { Router } from "express";

export class TestRoutes {

  static get routes(): Router {

    const router = Router();
    const testController = new TestController();

    router.get('/', testController.hi);

    return router;
  }

}