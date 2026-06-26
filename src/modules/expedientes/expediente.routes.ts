import { asyncHandler } from "@src/middlewares/asyncHandler";
import { NextFunction, Request, Response, Router } from "express";
import * as service from "./expediente.service";
const router = Router();

const MODULO = "expedientes";

router.post(
  "/",
  asyncHandler(MODULO, async (req: Request, res: Response) => {
    const params: FiltrosPersonaExpediente = req.body;
    return await service.getByFiltros(params);
  })
);

router.post(
  "/personas",
  asyncHandler(MODULO, async (req: Request, res: Response) => {
    const params: FiltrosPersonaExpediente = req.body;
    return await service.getPersonas(params);
  })
);

router.post(
  "/save",
  asyncHandler(MODULO, async (req: Request, res: Response) => {
    const params: InputExpediente = req.body;
    return await service.save(params);
  })
);

router.post(
  "/delete",
  asyncHandler(
    MODULO,
    async (req: Request, res: Response, next: NextFunction) => {
      const params: any = req.body;
      return await service.remove(params);
    }
  )
);

router.post(
  "/estadisticas",
  asyncHandler(
    MODULO,
    async (req: Request, res: Response, next: NextFunction) => {
      return await service.getDataAnioCiudadFuero();
    }
  )
);
 
module.exports = router;
