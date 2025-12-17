import { prisma } from '@config/prisma';
import { Request, Response } from 'express';

export class MissionsController {

  public async addMission(req: Request, res: Response){
    const { userId, eventId, state } = req.body;
    if(!userId || !eventId || !state){
      return res.status(400).json({message: "Missing data"});
    }

    try {
      
      await prisma.userMission.create({
        data: {
          user_id: userId,
          event_id: eventId,
          state,
        }
      });
      res.status(200).json({message: `Misión guardada con éxito`});

    } catch (error: any) {
      console.error(error);

      // Error de clave foránea (usuario o evento no existe)
      if (error.code === "P2003") {
        return res.status(404).json({
          message: "Recurso no encontrado",
          error: "El usuario o evento especificado no existe"
        });
      }

      // Error de registro duplicado
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Conflicto",
          error: "Esta misión ya existe para el usuario"
        });
      }

      // Error de validación de datos
      if (error.code === "P2000") {
        return res.status(400).json({
          message: "Datos inválidos",
          error: "Los datos proporcionados no cumplen con el formato requerido"
        });
      }

      // Error genérico del servidor
      return res.status(500).json({
        message: "Error interno del servidor",
        error: "No se pudo guardar la misión"
      });
      }
  }

}