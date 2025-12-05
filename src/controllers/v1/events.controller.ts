import { prisma } from "@/config/prisma";
import { Request, Response } from "express";

export class EventsController {

  public async getEventsList(req: Request, res: Response) {

    try {
      
      const eventsList = await prisma.event.findMany();
      if(eventsList.length === 0) return res.status(404).json({ message: "Sin eventos" });

      res.status(200).json(eventsList);

    } catch (error) {
      
      console.error(`Error: ${error}`);

    }
  
  }
}