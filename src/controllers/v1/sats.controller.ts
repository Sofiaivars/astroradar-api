import { Request, Response } from "express";
import { envs } from "@config/envs";

export class SatsController {

  public async above(req: Request, res: Response) {

    try {
      
      const { latitude, longitude } = req.body;
      if(!latitude || !longitude) throw new Error("Faltan datos requeridos");

      const url = `https://api.n2yo.com/rest/v1/satellite/above/${latitude}/${longitude}/700/70/0/&apiKey=${envs.N2YO_API_KEY}`;

      const response = await fetch(url);
      if(!response.ok){
        const text = await response.text();
        return res.status(response.status).json({
          message:"Error al consultar API externa",
          details: text
        });
      }

      const data = await response.json();
      return res.status(200).json(data);

    } catch (error) {
      
      console.error(`Error al solicitar satélites: ${error}`);
      return res.status(500).json({
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido"
      });

    }
    
  }

}